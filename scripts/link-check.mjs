#!/usr/bin/env node
/**
 * bla5k Link Checker — v1.0
 * -------------------------
 * Checks EVERY link on the site before publishing:
 *   • Internal links (/tools/x/, /guides/y/, /category/z/, static pages)
 *     resolve against the REAL built routes — including guide `slug`
 *     overrides (a guide file deepseek.md may live at /guides/deepseek-ai-chatbot-guide/).
 *   • External links (https://…) — markdown links AND bare URLs that the
 *     build auto-linkifies — are checked live over HTTP.
 *   • Anchors (/#directory) and www/non-www domain variants handled.
 *
 * Read-only: prints a report, never edits. Exit code 1 only when an
 * INTERNAL link is broken (blocks publish). Dead external links (404/410/DNS)
 * and soft timeouts (anti-bot 403, TLS failures) are reported but do NOT
 * fail the build — external sites die often and shouldn't block deploys.
 *
 * Usage:
 *   node scripts/link-check.mjs            — internal + external live check
 *   node scripts/link-check.mjs --internal — internal only (fast, no HTTP)
 * Env:
 *   LINK_TIMEOUT=8000      — per-URL timeout in ms (default 8000).
 *   LINK_CONCURRENCY=8     — parallel checks (default 8).
 * Note: bare URLs inside `git clone` code blocks are checked too, even
 * though the build only linkifies URLs outside code — conservative.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SITES = join(ROOT, 'src/content/sites');
const GUIDES = join(ROOT, 'src/content/guides');
const PAGES = join(ROOT, 'src/pages');
const SKIP_LIVE = process.argv.includes('--internal');
const TIMEOUT = Number(process.env.LINK_TIMEOUT || 8000);
const CONC = Number(process.env.LINK_CONCURRENCY || 8);
const SITE = 'https://bla5k.com';

// ── known-dead allowlist ──
// External links that are intentionally dead or archive-only must NOT fail
// the QA gate. Loaded from scripts/known-dead-links.txt (one URL per line,
// '#' comments allowed) so editors can maintain it without touching code.
// Wayback snapshots are also exempted: they are archival by nature and can
// hard-fail under the archive's rate limiting — a snapshot gone means a
// manual check, not a blocked publish.
const KNOWN_DEAD_FILE = join(ROOT, 'scripts', 'known-dead-links.txt');
const knownDead = new Set();
try {
  for (const line of readFileSync(KNOWN_DEAD_FILE, 'utf8').split(/\r?\n/)) {
    const u = line.replace(/#.*$/, '').trim();
    if (u) knownDead.add(u);
  }
} catch {}
const KNOWN_PATTERNS = [/^https?:\/\/web\.archive\.org\//];
function isKnownDead(url) {
  if (knownDead.has(url)) return true;
  return KNOWN_PATTERNS.some((rx) => rx.test(url));
}

// ── helpers ──
function listMd(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md'));
}
function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: raw };
}
function fmValue(fm, key) {
  const m = fm.match(new RegExp('^' + key + ':\\s*(.+)$', 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

// ── build the set of REAL valid internal routes (normalized: no trailing slash) ──
function norm(p) { return p === '/' ? '/' : p.replace(/\/$/, ''); }
const valid = new Set(['/']); // homepage
const staticPages = ['404', 'about', 'acceptable-use', 'advertise', 'contact', 'cookie-policy', 'disclosure', 'dmca', 'faq', 'privacy', 'terms', 'index'];
for (const p of staticPages) valid.add(norm(p === 'index' ? '/' : `/${p}/`));

// standalone root-level .astro pages (ai-control-pro, best-ai-tools-2026, …)
// — auto-discovered so new landing pages never trip the checker again.
for (const f of readdirSync(PAGES)) {
  if (!f.endsWith('.astro')) continue;
  if (f.startsWith('[') || f.startsWith('_')) continue; // dynamic/index-only
  const slug = f.replace(/\.astro$/, '');
  if (slug === 'index') continue; // maps to /, already added
  valid.add(norm(`/${slug}/`));
}

// tools: /tools/<filename>/
for (const f of listMd(SITES)) valid.add(norm(`/tools/${f.replace(/\.md$/, '')}/`));

// guides: /guides/<slug-override-or-filename>/
for (const f of listMd(GUIDES)) {
  const raw = readFileSync(join(GUIDES, f), 'utf8');
  const { fm } = splitFrontmatter(raw);
  const slug = fmValue(fm, 'slug') || f.replace(/\.md$/, '');
  valid.add(norm(`/guides/${slug}/`));
}

// categories + subcategories from categories.ts
try {
  const cats = readFileSync(join(ROOT, 'src/data/categories.ts'), 'utf8');
  for (const m of cats.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) valid.add(norm(`/category/${m[1]}/`));
} catch {}

// guide index page
valid.add('/guides');

// ── collect links from content ──
const internal = new Map(); // route -> Set(file)
const external = new Map(); // url   -> Set(file)

function scanFile(path, fileLabel) {
  const raw = readFileSync(path, 'utf8');
  const { body } = splitFrontmatter(raw);

  // markdown internal/external links: ](href)
  for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    const href = m[1].split('#')[0];
    if (!href) continue;
    if (href.startsWith('/')) {
      add(internal, href, fileLabel);
    } else if (/^https?:\/\//i.test(href)) {
      add(external, href, fileLabel);
    }
  }
  // bare URLs auto-linkified at build (rehypeLinkifyBareUrls): skip ones
  // already captured as markdown links by not re-matching inside ](...).
  // Also strip trailing code backticks (`` `https://x` `` inside inline code)
  // so the captured URL is clean.
  const stripped = body.replace(/\]\([^)]+\)/g, '');
  for (const m of stripped.matchAll(/(^|[\s(`])(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"])/g)) {
    const url = m[2];
    if (/^https?:\/\//i.test(url)) add(external, url.replace(/[`'"]+$/, ''), fileLabel);
  }
}
function add(map, key, label) {
  const k = key.replace(/\/$/, '') || '/';
  if (!map.has(k)) map.set(k, new Set());
  map.get(k).add(label);
}
function display(p) { return p === '/' ? '/' : p + '/'; }

for (const f of listMd(SITES)) scanFile(join(SITES, f), `tools/${f}`);
for (const f of listMd(GUIDES)) scanFile(join(GUIDES, f), `guides/${f}`);

// static .astro pages (footer, hero, advertise, legal…): check internal
// hrefs only — cheap, catches broken links in templates.
function walkAstro(dir) {
  const out = [];
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) out.push(...walkAstro(p));
    else if (f.name.endsWith('.astro')) out.push(p);
  }
  return out;
}
for (const f of walkAstro(PAGES)) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/href="(\/[^"#]+)/g)) {
    const route = m[1];
    if (!route.startsWith('/')) continue;
    add(internal, route, f.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, ''));
  }
}

// ── internal check ──
const report = [];
let brokenInternal = 0, brokenExternal = 0, softIssues = 0;
for (const [route, files] of [...internal.entries()].sort()) {
  if (!valid.has(route)) {
    brokenInternal++;
    report.push(`❌ INTERNAL: \`${display(route)}\` (رابط مكسور) ← ${[...files].slice(0, 3).join(', ')}`);
  }
}

// ── external live check ──
async function checkUrl(url) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT);
    const r = await fetch(url, {
      method: 'GET', redirect: 'follow', signal: ctrl.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; bla5k-link-check/1.0)' },
    });
    clearTimeout(t);
    if (r.status === 404 || r.status === 410) return { dead: true, code: r.status };
    if (r.status >= 500) return { soft: true, code: r.status }; // server hiccup, not dead
    return { ok: true, code: r.status };
  } catch (e) {
    // Node's fetch wraps the real reason in e.cause (undici).
    const msg = String(e.cause ?? e);
    const dns = /ENOTFOUND|getaddrinfo|ECONNREFUSED/.test(msg);
    if (dns) return { dead: true, code: 'DNS' };
    // TLS handshake failures (525 etc.) and timeouts are usually temporary
    return { soft: true, code: /abort/i.test(msg) ? 'timeout' : 'TLS' };
  }
}

if (!SKIP_LIVE) {
  const urls = [...external.keys()];
  // Retry failed URLs once (github & CDNs rate-limit parallel bursts).
  const dead = new Map(); // url -> result
  const soft = new Map();
  for (let i = 0; i < urls.length; i += CONC) {
    const batch = urls.slice(i, i + CONC);
    const res = await Promise.all(batch.map(checkUrl));
    batch.forEach((url, j) => {
      const r = res[j];
      if (r.dead) dead.set(url, r);
      else if (r.soft) soft.set(url, r);
    });
    if (process.stderr.isTTY || process.env.GITHUB_ACTIONS) {
      process.stderr.write(`  links checked: ${Math.min(i + CONC, urls.length)}/${urls.length}\n`);
    }
  }
  // Second pass: retry anything dead or soft (once).
  const retry = [...dead.keys(), ...soft.keys()];
  for (let i = 0; i < retry.length; i += CONC) {
    const batch = retry.slice(i, i + CONC);
    const res = await Promise.all(batch.map(checkUrl));
    batch.forEach((url, j) => {
      const r = res[j];
      if (dead.has(url)) {
        if (r.ok) dead.delete(url);
        else if (r.soft) { dead.delete(url); soft.set(url, r); } // downgrade
      } else if (soft.has(url)) {
        if (r.ok) soft.delete(url);
        else if (r.dead) { soft.delete(url); dead.set(url, r); } // upgrade
      }
    });
  }
  let knownDeadCount = 0;
  for (const [url, r] of dead) {
    if (isKnownDead(url)) {
      knownDeadCount++;
      report.push(`ℹ️ KNOWN-DEAD (${r.code}, مسموح): \`${url}\` ← ${[...external.get(url)].slice(0, 3).join(', ')}`);
      continue;
    }
    brokenExternal++;
    report.push(`❌ EXTERNAL (${r.code}): \`${url}\` ← ${[...external.get(url)].slice(0, 3).join(', ')}`);
  }
  if (knownDeadCount) {
    console.log(`- ℹ️ ميتة معروفة/مقصودة (لا تمنع النشر): **${knownDeadCount}**`);
  }
  for (const [url, r] of soft) {
    softIssues++;
    report.push(`🟡 SOFT (${r.code}): \`${url}\` (مؤقت/anti-bot — تحقق يدوي) ← ${[...external.get(url)].slice(0, 2).join(', ')}`);
  }
}

// ── output ──
const totalInternal = internal.size;
const totalExternal = external.size;
console.log('# 🔗 تقرير فحص الروابط — bla5k Link Check v1');
console.log('');
console.log('## 📊 الملخص');
console.log(`- 🔗 داخلية: **${totalInternal}** · 🌐 خارجية: **${totalExternal}**${SKIP_LIVE ? ' (بدون فحص حي)' : ''}`);
console.log(`- ❌ داخلية مكسورة: **${brokenInternal}** · ❌ خارجية ميتة: **${brokenExternal}** · 🟡 مؤقتة: **${softIssues}**`);
console.log(brokenInternal + brokenExternal === 0
  ? '- ✅ **لا روابط مكسورة — آمن للنشر.**'
  : '- ❌ **روابط مكسورة — أصلحها قبل النشر.**');
if (report.length) console.log('\n## 📋 التفاصيل\n' + report.join('\n'));

process.exit(brokenInternal > 0 ? 1 : 0);
