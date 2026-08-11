#!/usr/bin/env node
/**
 * bla5k IndexNow Submitter — v1.0
 * -------------------------------
 * Sends EVERY URL on the site to the IndexNow API for instant indexing
 * by Bing, Yandex, Seznam and Naver (all share the protocol). Bing feeds
 * ChatGPT Search and Perplexity, so this also accelerates AI-search
 * visibility.
 *
 * Reads URLs from the built sitemap (dist/sitemap-0.xml) so it always
 * reflects the exact live set of pages. Safe to run after every build.
 *
 * Usage:
 *   node scripts/indexnow.mjs                — read key file + dist sitemap
 *   node scripts/indexnow.mjs --dry-run      — print what WOULD be sent
 * Env:
 *   INDEXNOW_KEY=<hex>                       — override key (default: auto-detect
 *                                              32-char hex *.txt in public/)
 *   INDEXNOW_SITEMAP=<path>                  — override sitemap (default dist/sitemap-0.xml)
 *   INDEXNOW_HOST=<domain>                   — override host (default bla5k.com)
 *   INDEXNOW_URL=<api endpoint>              — override API (default api.indexnow.org)
 *
 * Exit code: 0 = accepted, 2 = verification pending (retry later),
 *            1 = hard failure (check output).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes('--dry-run');
const SITEMAP_PATH = process.env.INDEXNOW_SITEMAP || join(ROOT, 'dist/sitemap-0.xml');
const HOST = process.env.INDEXNOW_HOST || 'bla5k.com';
const API = process.env.INDEXNOW_URL || 'https://api.indexnow.org/indexnow';
const PUBLIC_DIR = join(ROOT, 'public');

// ── auto-detect the IndexNow key file (32-hex .txt in public/) ──
function detectKey() {
  if (!existsSync(PUBLIC_DIR)) return null;
  for (const f of readdirSync(PUBLIC_DIR)) {
    if (/^[0-9a-f]{32}\.txt$/i.test(f)) {
      const raw = readFileSync(join(PUBLIC_DIR, f), 'utf8').trim();
      if (/^[0-9a-f]{32}$/i.test(raw)) return raw;
    }
  }
  return null;
}

const KEY = process.env.INDEXNOW_KEY || detectKey();

// ── load URLs: prefer built sitemap, fall back to source-derived routes ──
function deriveFromSource() {
  // Mirrors link-check.mjs: tools = file names, guides = slug override,
  // categories = slugs from categories.ts, + static pages.
  const SITES = join(ROOT, 'src/content/sites');
  const GUIDES = join(ROOT, 'src/content/guides');
  const CATS = join(ROOT, 'src/data/categories.ts');
  const norm = (p) => (p === '/' ? '/' : p.replace(/\/$/, ''));
  const out = new Set(['/']);

  if (existsSync(SITES)) {
    for (const f of readdirSync(SITES).filter((x) => x.endsWith('.md'))) {
      out.add(norm(`/tools/${f.replace(/\.md$/, '')}/`));
    }
  }
  if (existsSync(GUIDES)) {
    for (const f of readdirSync(GUIDES).filter((x) => x.endsWith('.md'))) {
      const raw = readFileSync(join(GUIDES, f), 'utf8');
      // Parse slug strictly from the frontmatter block (like link-check.mjs)
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
      const m = fm ? fm[1].match(/^slug:\s*["']?([^"'\r\n]+)["']?/m) : null;
      out.add(norm(`/guides/${m ? m[1] : f.replace(/\.md$/, '')}/`));
    }
  }
  if (existsSync(CATS)) {
    const src = readFileSync(CATS, 'utf8');
    for (const m of src.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) out.add(norm(`/category/${m[1]}/`));
  }
  const statics = ['about', 'advertise', 'contact', 'cookie-policy', 'disclosure', 'dmca', 'faq', 'privacy', 'terms', 'acceptable-use', 'guides', 'ai-control-pro'];
  for (const p of statics) out.add(norm(`/${p}/`));

  return [...out]
    .sort()
    .map((p) => `https://${HOST}${p === '/' ? '/' : p + '/'}`);
}

function loadUrls() {
  if (existsSync(SITEMAP_PATH)) {
    const xml = readFileSync(SITEMAP_PATH, 'utf8');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (urls.length) return urls;
  }
  // No dist (e.g. CI before build) — derive from source. Slight differences
  // are fine: IndexNow treats unknown-but-live URLs as no-ops.
  const urls = deriveFromSource();
  if (!urls.length) {
    console.error('❌ No URLs found (sitemap missing and nothing derivable from source).');
    process.exit(1);
  }
  return urls;
}

// ── main ──
console.log('# 🚀 تقرير الإرسال للفهرسة الفورية — bla5k IndexNow v1');
console.log('');
console.log('## 📋 الطلب');

if (!KEY) {
  console.error('❌ لم يُعثر على مفتاح IndexNow.\n   ضع ملف public/<32-hex>.txt (أنشئه من خلال أول إرسال يدوي) أو اضبط INDEXNOW_KEY.');
  process.exit(1);
}

const urls = loadUrls();
const src = existsSync(SITEMAP_PATH) ? 'dist/sitemap-0.xml' : 'من المصدر (src/)';
console.log(`- المضيف: **${HOST}**`);
console.log(`- المفتاح: \`${KEY.slice(0, 8)}…${KEY.slice(-4)}\``);
console.log(`- الروابط: **${urls.length}** ← ${src}`);

if (DRY_RUN) {
  console.log('\n## 🧪 وضع التجربة (dry-run) — لم يُرسل شيء');
  console.log(`أول 5 روابط:\n${urls.slice(0, 5).map((u) => `  - ${u}`).join('\n')}`);
  console.log('…');
  process.exit(0);
}

// ── send (single request, URL list limit is 10,000 — well above our count) ──
const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
});

const timeoutMs = Number(process.env.INDEXNOW_TIMEOUT || 90000);
const ctrl = new AbortController();
const timer = setTimeout(() => ctrl.abort(), timeoutMs);

try {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: payload,
    signal: ctrl.signal,
  });
  clearTimeout(timer);

  if (res.status === 200) {
    console.log('\n## ✅ النتيجة');
    console.log(`- **200 — تم قبول الإرسال.** أُرسلت ${urls.length} رابطًا للفهرسة الفورية (Bing/Yandex/Seznam/Naver).`);
    console.log('- الزحف المتوقع: خلال 24-72 ساعة.');
    process.exit(0);
  }

  // read error body for a helpful message
  let errText = '';
  try { errText = await res.text(); } catch { /* noop */ }
  const isVerification = res.status === 403 && /SiteVerificationNotCompleted/i.test(errText);

  if (isVerification) {
    console.log('\n## ⏳ النتيجة — التحقق قيد الانتظار');
    console.log(`- **403**: التحقق من الموقع لم يكتمل بعد لدى IndexNow.`);
    console.log(`- تأكد أن المفتاح حي: https://${HOST}/${KEY}.txt ثم أعد المحاولة بعد 5-15 دقيقة.`);
    console.log(`- الاستجابة: ${errText.slice(0, 200)}`);
    process.exit(2);
  }

  console.log('\n## ❌ النتيجة — فشل الإرسال');
  console.log(`- HTTP **${res.status}**: ${errText.slice(0, 300) || 'بدون تفاصيل'}`);
  console.log(`- أعد المحاولة لاحقًا أو تحقق من صحة المفتاح.`);
  process.exit(1);
} catch (e) {
  clearTimeout(timer);
  const msg = String(e.cause ?? e);
  console.log('\n## ❌ النتيجة — فشل الاتصال');
  console.log(`- ${msg}`);
  console.log('- تحقق من اتصال الشبكة وأعد المحاولة.');
  process.exit(1);
}
