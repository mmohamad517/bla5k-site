#!/usr/bin/env node
/**
 * bla5k Content QA Bot — v3.0
 * ---------------------------
 * Runs automatically on every content change (GitHub Action). It ONLY reads
 * your content and prints a report — it never edits or deletes anything.
 * 100% deterministic (no AI) → it cannot hallucinate.
 *
 * v3.0 — automatic AdSense policy gate:
 * - Categorized policy checker: gambling, drugs, piracy, medical claims
 *   (Google health policy: unsubstantiated cures, guaranteed results).
 * - sev:'block' rules → CRITICAL → exit code 1 → CI blocks the publish.
 * - sev:'review' rules → warning → human must verify (many are innocent
 *   matches like "treats data" or legal streaming pages mentioning "free
 *   movies").
 *
 * Checks:
 *   • Policy gate (gambling / drugs / piracy / medical claims / adult)
 *   • Duplicate tools (name / url / slug) + duplicate meta titles/descriptions
 *   • Near-duplicate article bodies (copied content) via shingle similarity
 *   • Broken / dead links (live HTTP check of the tool URL + body links)
 *   • Orphan pages (no internal links pointing to them)
 *   • Keyword stuffing, readability (Flesch), content depth
 *   • SEO essentials (title/description length, tagline, FAQs)
 *   • Stale content (not updated in 6+ months)
 *   • A 0–100 health score per entry and for the whole site
 *
 * Env: QA_SKIP_LINKS=1 skips the live link check (faster local runs).
 * Exit code 1 on CRITICAL issues — structural build-breakers AND
 * unambiguous AdSense policy violations (policy gate).
 */
import { readFileSync, readdirSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SITES_DIR = join(ROOT, 'src/content/sites');
const GUIDES_DIR = join(ROOT, 'src/content/guides');
const CATS_FILE = join(ROOT, 'src/data/categories.ts');
const SKIP_LINKS = process.env.QA_SKIP_LINKS === '1';

// ── policy patterns (piracy + AdSense prohibited content) ──
// Each rule: { cat, sev, re, why }
//   sev 'block'  → unambiguous AdSense violation (gambling, drugs, adult…)
//   sev 'review' → possible innocent match, needs a human look
// Medical claims match Google/AdSense health policy: unsubstantiated
// cures, guaranteed results, disease treatment claims.
const POLICY = [
  // ── Gambling ──
  { cat: 'قمار', sev: 'block', re: /\b(online\s+casino|casino\s+(bonus|real\s+money|games?))\b/i, why: 'ترويج قمار بأموال حقيقية' },
  { cat: 'قمار', sev: 'block', re: /\bsports\s+betting\b/i, why: 'ترويج رهانات رياضية' },
  { cat: 'قمار', sev: 'block', re: /\bbetting\s+(site|platform|app|tips|strategies)\b/i, why: 'ترويج مراهنات' },
  { cat: 'قمار', sev: 'block', re: /\b(real-money\s+betting|bet\s+real\s+money)\b/i, why: 'ترويج قمار بأموال حقيقية' },
  { cat: 'قمار', sev: 'block', re: /\bpoker\s+(for\s+)?(real\s+money|cash\s+games?)\b/i, why: 'ترويج بوكر بأموال حقيقية' },
  { cat: 'قمار', sev: 'block', re: /\b(online\s+slot|slot\s+machines?|jackpot\s+win)/i, why: 'ترويج سلوتس' },
  { cat: 'قمار', sev: 'block', re: /\b(blackjack|roulette)\s+(strateg|system|win)/i, why: 'ترويج ألعاب كازينو' },
  { cat: 'قمار', sev: 'review', re: /\b(casino|gambling|betting|lottery)\b/i, why: 'ذكر قمار/يانصيب (قد يكون بريئاً)' },

  // ── Drugs ──
  { cat: 'مخدرات', sev: 'block', re: /\b(buy|cost|order|cheap)\s+(cocaine|heroin|meth|fentanyl|lsd|mdma|marijuana|cannabis|weed|pills?\s+online)\b/i, why: 'بيع مخدرات' },
  { cat: 'مخدرات', sev: 'block', re: /\b(no\s+prescription|without\s+prescription)\s*(needed|required)?\b/i, why: 'صيدلية بدون وصفة (مخدرات)' },
  { cat: 'مخدرات', sev: 'block', re: /\b(steroids?|anabolic)\s+for\s+sale\b/i, why: 'بيع ستيرويدات' },
  { cat: 'مخدرات', sev: 'block', re: /\b(dark\s+web|darknet)\s*(drug|market)/i, why: 'أسواق مخدرات' },
  { cat: 'مخدرات', sev: 'block', re: /\b(adderall|oxycodone|vicodin|xanax)\s*(online|for\s+sale|cheap)\b/i, why: 'بيع أدوية مقيّدة' },
  { cat: 'مخدرات', sev: 'review', re: /\b(cocaine|heroin|meth|marijuana|cannabis|drugs)\b/i, why: 'ذكر مخدرات (قد يكون بريئاً)' },

  // ── Piracy / copyright ──
  { cat: 'قرصنة', sev: 'block', re: /\b(torrents?|crack(ed|s|ing)?|nulled|warez|keygens?|serial\s+keys?|activation\s+keys?)\b/i, why: 'قرصنة برامج' },
  { cat: 'قرصنة', sev: 'block', re: /\b(mod[\s-]?apk|modded|apk\s+premium)\b/i, why: 'تطبيقات مقرصنة' },
  { cat: 'قرصنة', sev: 'block', re: /\b(premium|paid)\s+(accounts?|apps?|software)\s+(for\s+)?free\b/i, why: 'محتوى مدفوع مجاناً (قرصنة)' },
  { cat: 'قرصنة', sev: 'review', re: /\b(pirat(e|ed|ing|es)?|free\s+(movies|streaming|netflix|spotify))\b/i, why: 'ذكر قرصنة/أفلام مجانية (قد يكون تطابق بريء — خدمة قانونية)' },

  // ── Medical claims (Google health policy) ──
  { cat: 'ادعاءات طبية', sev: 'block', re: /\b(cure[sd]?|treat[s]?|heal[s]?)\s+(cancer|diabetes|aids|hiv|tumou?r|autism|depression|anxiety|arthritis|alzheimers?)\b/i, why: 'ادعاء علاج مرض' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\bmiracle\s+(cure|treatment|remedy)\b/i, why: 'علاج معجزة (مضلل)' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\b(clinically|scientifically|medically)\s+proven\b/i, why: 'ادعاء إثبات طبي بلا دليل' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\bweight\s+loss\s+(guaranteed|pill|supplement|cure)\b/i, why: 'ادعاء تنحيف مضمون' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\b(lose|burn)\s+(\d+\s*(kg|lbs?|pounds))\s*(in|per)\s*\d+\s*(days?|weeks?)\b/i, why: 'وعد فقدان وزن سريع' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\bdetox\s+(tea|cleanse|diet|supplement|program)\b/i, why: 'ادعاء تطهير الجسم (مضلل)' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\bboost(s|es|ing)?\s+(your\s+)?immune\s+system\b/i, why: 'ادعاء تقوية مناعة' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\bno\s+side\s+effects\b/i, why: 'ادعاء بلا آثار جانبية' },
  { cat: 'ادعاءات طبية', sev: 'block', re: /\b(herbal|natural)\s+(cure|remedy)\s+for\s+(cancer|diabetes)\b/i, why: 'علاج عشبي لمرض' },
  { cat: 'ادعاءات طبية', sev: 'review', re: /\b(cure[sd]?|heal(ing|s)?|treat(ment|s)?|therap(y|ies)|clinical|diagnos(e|is|tic)|symptom|patient)\b/i, why: 'مصطلح طبي (تحقق أنه ليس ادعاء علاج)' },
];

const STOP = new Set('the a an and or of to in for on with is are be it as at by from that this you your we our their they can will not no do does how what which when who why more most into over under out up down about'.split(' '));

// ── helpers ──
function listMd(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => join(dir, f));
}
function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fmText: m[1], body: m[2] } : { fmText: '', body: raw };
}
function fmValue(fmText, key) {
  // Match key: and capture the value line + any indented continuation lines
  const re = new RegExp('^' + key + ':\\s*(.*)$', 'm');
  const m = fmText.match(re);
  if (!m) return null;
  let val = m[1].trim();

  // If value is multiline (indented YAML), collect continuation lines
  const lines = fmText.split('\n');
  let capturing = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(new RegExp('^' + key + ':'))) {
      capturing = true;
      val = lines[i].split(':').slice(1).join(':').trim();
      continue;
    }
    if (capturing) {
      if (lines[i].match(/^\s*[a-z]+:/)) break; // next key
      if (lines[i].trim() && lines[i].startsWith('  ')) {
        val += ' ' + lines[i].trim();
      } else if (lines[i].trim()) {
        break;
      }
    }
  }

  // Clean up: remove quotes, handle YAML folded/literal markers
  val = val.replace(/^["']|["']$/g, '').replace(/^[|>]\s*/, '').trim();
  return val || null;
}
function plainWords(text) {
  return (text.toLowerCase().replace(/`[^`]*`/g, ' ').replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ').match(/[a-z0-9]+/g) || []);
}
function countSyllables(w) {
  w = w.toLowerCase().replace(/[^a-z]/g, ''); if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g); return m ? m.length : 1;
}
function fleschScore(body) {
  const sentences = Math.max(1, (body.match(/[.!?]+(\s|$)/g) || []).length);
  const words = plainWords(body); if (words.length < 30) return null;
  const syl = words.reduce((s, w) => s + countSyllables(w), 0);
  return Math.round(206.835 - 1.015 * (words.length / sentences) - 84.6 * (syl / words.length));
}
function shingles(body, k = 8) {
  const w = plainWords(body); const s = new Set();
  for (let i = 0; i + k <= w.length; i += 2) s.add(w.slice(i, i + k).join(' '));
  return s;
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0; let inter = 0;
  const [sm, lg] = a.size < b.size ? [a, b] : [b, a];
  for (const x of sm) if (lg.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}
function validSubcats() {
  try { return new Set([...readFileSync(CATS_FILE, 'utf8').matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1])); }
  catch { return null; }
}
async function checkUrl(url) {
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 9000);
    const r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; bla5k-qa/1.0)' } });
    clearTimeout(t);
    if (r.status === 404 || r.status === 410) return { ok: false, code: r.status };
    return { ok: true, code: r.status };
  } catch (e) {
    const dns = /ENOTFOUND|getaddrinfo|ECONNREFUSED/.test(String(e));
    return { ok: !dns, code: dns ? 'DNS' : 'timeout', soft: !dns };
  }
}

// ── load all entries ──
const subs = validSubcats();
const entries = [];
for (const [dir, kind] of [[SITES_DIR, 'site'], [GUIDES_DIR, 'guide']]) {
  for (const path of listMd(dir)) {
    const raw = readFileSync(path, 'utf8');
    const { fmText, body } = splitFrontmatter(raw);
    const slug = path.split(/[\\/]/).pop().replace(/\.md$/, '');
    entries.push({
      path, kind, slug, fmText, body,
      name: fmValue(fmText, kind === 'site' ? 'name' : 'title') || slug,
      url: fmValue(fmText, 'url'),
      metaTitle: fmValue(fmText, 'metaTitle'),
      metaDesc: fmValue(fmText, 'metaDescription') || fmValue(fmText, 'description'),
      updated: fmValue(fmText, 'updated') || fmValue(fmText, 'published'),
      faqCount: (fmText.match(/^\s*-\s*q:/gm) || []).length,
      words: plainWords(body).length,
      internalOut: [...body.matchAll(/\]\((\/(?:tools|category|guides)\/[a-z0-9-]+)\/?\)/g)].map((m) => m[1]),
      _sh: shingles(body),
    });
  }
}

// ── cross-file maps ──
const byName = {}, byUrl = {}, bySlug = {}, byTitle = {}, byDesc = {}, incoming = {};
for (const e of entries) {
  (byName[e.name.toLowerCase()] ||= []).push(e.slug);
  if (e.url) (byUrl[e.url.toLowerCase().replace(/\/$/, '')] ||= []).push(e.slug);
  (bySlug[e.slug] ||= []).push(e.slug);
  if (e.metaTitle) (byTitle[e.metaTitle.toLowerCase()] ||= []).push(e.slug);
  if (e.metaDesc) (byDesc[e.metaDesc.toLowerCase()] ||= []).push(e.slug);
  for (const link of e.internalOut) { const s = link.split('/').pop(); (incoming[s] ||= new Set()).add(e.slug); }
}

// ── live link check (dedup) ──
const urlStatus = {};
if (!SKIP_LINKS) {
  const urls = new Set();
  for (const e of entries) {
    if (e.url) urls.add(e.url);
    for (const m of e.body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) urls.add(m[1]);
  }
  const list = [...urls].slice(0, 120);
  const CONC = 8;
  for (let i = 0; i < list.length; i += CONC) {
    const batch = list.slice(i, i + CONC);
    const res = await Promise.all(batch.map((u) => checkUrl(u)));
    batch.forEach((u, j) => { urlStatus[u] = res[j]; });
  }
}

// ── evaluate ──
const report = []; const L = (s) => report.push(s);
let critical = 0, warnings = 0; const scores = [];

for (const e of entries) {
  const F = []; let score = 100;
  const sub = (t) => { score -= t; };

  // policy (gambling / drugs / piracy / medical claims)
  const policyText = (e.name + ' ' + e.fmText + ' ' + e.body).slice(0, 25000);
  const policyHits = POLICY.filter((p) => p.re.test(policyText));
  const blockedCats = new Set(policyHits.filter((p) => p.sev === 'block').map((p) => p.cat));
  for (const p of policyHits.filter((x) => x.sev === 'block')) {
    F.push(`🚫 **سياسة (${p.cat})**: ${p.why} — نمط \`${p.re.source}\``); critical++; sub(25);
  }
  // Review-only in categories where no block fired (avoids duplicate noise).
  for (const p of policyHits.filter((x) => x.sev === 'review' && !blockedCats.has(x.cat))) {
    F.push(`🟡 **مراجعة (${p.cat})**: ${p.why} — نمط \`${p.re.source}\`. تأكد أنه ليس مخالفة (قد يكون تطابق بريء).`); warnings++; sub(8);
  }

  // duplicates
  if (byName[e.name.toLowerCase()].length > 1) { F.push(`⚠️ اسم مكرر مع: ${byName[e.name.toLowerCase()].filter(s=>s!==e.slug).join(', ')}`); warnings++; sub(6); }
  if (e.url && byUrl[e.url.toLowerCase().replace(/\/$/,'')].length > 1) { F.push(`⚠️ رابط مكرر مع: ${byUrl[e.url.toLowerCase().replace(/\/$/,'')].filter(s=>s!==e.slug).join(', ')}`); warnings++; sub(6); }
  if (e.metaTitle && byTitle[e.metaTitle.toLowerCase()].length > 1) { F.push('⚠️ metaTitle مكرر مع صفحة أخرى — اجعله فريداً'); warnings++; sub(5); }
  if (e.metaDesc && byDesc[e.metaDesc.toLowerCase()].length > 1) { F.push('⚠️ metaDescription مكرر مع صفحة أخرى'); warnings++; sub(4); }

  // near-duplicate body
  let sim = 0, simWith = '';
  for (const o of entries) { if (o === e) continue; const j = jaccard(e._sh, o._sh); if (j > sim) { sim = j; simWith = o.slug; } }
  if (sim > 0.4) { F.push(`❌ **تشابه عالٍ (${Math.round(sim*100)}%)** مع ${simWith} — محتوى مكرر، أعد صياغته (خطر عقوبة Google)`); warnings++; sub(20); }

  // required fields (also break the build)
  if (e.kind === 'site') {
    if (!fmValue(e.fmText, 'name')) { F.push('❌ CRITICAL: name مفقود'); critical++; sub(40); }
    if (!e.url) { F.push('❌ CRITICAL: url مفقود'); critical++; sub(40); }
    else if (!/^https?:\/\/.+/i.test(e.url)) { F.push(`❌ CRITICAL: url غير صحيح: ${e.url}`); critical++; sub(40); }
    if (!fmValue(e.fmText, 'subcategory')) { F.push('❌ CRITICAL: subcategory مفقود'); critical++; sub(40); }
    else if (subs && !subs.has(fmValue(e.fmText, 'subcategory'))) { F.push(`❌ CRITICAL: subcategory غير موجودة: "${fmValue(e.fmText,'subcategory')}"`); critical++; sub(40); }
    if (!fmValue(e.fmText, 'tagline')) { F.push('⚠️ tagline مفقود'); warnings++; sub(4); }
  } else if (!fmValue(e.fmText, 'title')) { F.push('❌ CRITICAL: title مفقود'); critical++; sub(40); }

  // dead / broken links
  if (!SKIP_LINKS) {
    if (e.url && urlStatus[e.url] && !urlStatus[e.url].ok) { F.push(`❌ **الموقع الرسمي لا يستجيب** (${urlStatus[e.url].code}) — قد تكون الأداة ميتة/مباعة`); warnings++; sub(15); }
    const dead = e.internalOut.length ? [] : [];
    const bodyUrls = [...e.body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    const broken = bodyUrls.filter((u) => urlStatus[u] && !urlStatus[u].ok && !urlStatus[u].soft);
    if (broken.length) { F.push(`❌ روابط مكسورة (${broken.length}): ${broken.slice(0,3).join(' , ')}`); warnings++; sub(8); }
  }

  // orphan: not linked AND not mentioned by name anywhere (a name mention becomes an auto-link at build)
  const inc = incoming[e.slug];
  const nameRe = new RegExp('\\b' + e.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
  const mentioned = entries.some((o) => o.slug !== e.slug && nameRe.test(o.body));
  if (e.kind === 'site' && (!inc || inc.size === 0) && !mentioned) { F.push('⚠️ صفحة يتيمة — لا رابط ولا ذكر لها في أي مقال. اذكر اسمها في مقال ذي صلة → يتحوّل رابطاً تلقائياً.'); warnings++; sub(5); }

  // keyword stuffing
  const w = plainWords(e.body); const freq = {};
  for (const x of w) if (!STOP.has(x) && x.length > 3) freq[x] = (freq[x] || 0) + 1;
  const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
  if (top && w.length > 200 && top[1] / w.length > 0.035) { F.push(`⚠️ حشو كلمات محتمل: "${top[0]}" مكررة ${top[1]} مرة (${(top[1]/w.length*100).toFixed(1)}%)`); warnings++; sub(6); }

  // readability
  const fl = fleschScore(e.body);
  if (fl !== null && fl < 35) { F.push(`⚠️ صعب القراءة (Flesch ${fl}، الأفضل > 50) — بسّط الجمل`); warnings++; sub(4); }

  // SEO lengths
  if (e.metaTitle && e.metaTitle.length > 65) { F.push(`⚠️ SEO title طويل (${e.metaTitle.length}، ≤ 60)`); warnings++; sub(3); }
  if (!e.metaDesc) { F.push('⚠️ بدون metaDescription — أضف وصفاً بين 120–160 حرفاً'); warnings++; sub(5); }
  else if (e.metaDesc.length < 70 || e.metaDesc.length > 170) { F.push(`⚠️ الوصف (${e.metaDesc.length} حرف) — الأفضل 120–160`); warnings++; sub(3); }
  if (e.faqCount === 0) { F.push('⚠️ لا FAQ — أضف 3–6 أسئلة'); warnings++; sub(5); }

  // depth
  const minW = e.kind === 'guide' ? 1500 : 600;
  if (e.words < minW) { F.push(`⚠️ محتوى قصير (${e.words}، ≥ ${minW})`); warnings++; sub(8); }
  const links = (e.body.match(/\]\(https?:\/\//g) || []).length + (e.body.match(/(^|\s)https?:\/\//g) || []).length;
  if (links === 0) { F.push('⚠️ لا روابط بالمقال — أضف روابط مصدر رسمية وداخلية'); warnings++; sub(6); }

  // stale
  if (e.updated) { const age = (Date.now() - Date.parse(e.updated)) / 8.64e7;
    if (age > 183) { F.push(`⚠️ محتوى قديم (آخر تحديث قبل ${Math.round(age)} يوم) — يُنصح بالتحديث`); warnings++; sub(3); } }

  score = Math.max(0, Math.min(100, score));
  scores.push(score);
  const st = F.some((f) => f.includes('CRITICAL')) ? '❌' : F.length ? '⚠️' : '✅';
  const bar = '█'.repeat(Math.round(score / 10)) + '░'.repeat(10 - Math.round(score / 10));
  // one-click link straight to this entry's edit form in the Pages CMS panel
  const coll = e.kind === 'site' ? 'sites' : 'guides';
  const relPath = e.path.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '');
  const branch = process.env.QA_CMS_BRANCH || 'main';
  const editUrl = `https://app.pagescms.org/mmohamad517/bla5k-site/${branch}/collection/${coll}/edit/${encodeURIComponent(relPath)}`;
  L(`\n### ${st} ${e.name} — صحة ${score}/100 \`${bar}\``);
  L(`${e.words} كلمة · ${links} رابط · ${e.faqCount} FAQ — ${F.length ? `[✏️ عدّل في اللوحة](${editUrl})` : `\`${relPath}\``}`);
  if (!F.length) L('- ✅ سليم تماماً — جاهز للنشر.');
  else for (const f of F) L(`- ${f}`);
}

const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 100;
const grade = avg >= 90 ? 'A ممتاز' : avg >= 80 ? 'B جيد جداً' : avg >= 70 ? 'C جيد' : avg >= 60 ? 'D مقبول' : 'F يحتاج عمل';

// policy summary counts — distinct entries per category (block+review)
const policyCounts = {};
for (const e of entries) {
  const text = (e.name + ' ' + e.fmText + ' ' + e.body).slice(0, 25000);
  const cats = new Set(POLICY.filter((p) => p.re.test(text)).map((p) => p.cat));
  for (const c of cats) policyCounts[c] = (policyCounts[c] || 0) + 1;
}
const policyLine = Object.keys(policyCounts).length
  ? Object.entries(policyCounts).map(([c, n]) => `${c}: ${n}`).join(' · ')
  : 'لا شيء';

const head = [
  '# 🤖 تقرير فحص المحتوى — bla5k Content QA v3\n',
  `فُحص: ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC${SKIP_LINKS ? ' (بدون فحص روابط)' : ''}\n`,
  '## 📊 الملخص',
  `- 🏆 **درجة صحة الموقع: ${avg}/100 — ${grade}**`,
  `- الملفات: **${entries.length}** · 🔴 حرجة: **${critical}** · 🟡 تنبيهات: **${warnings}**`,
  `- 🚨 **فحص السياسات** (قمار/مخدرات/قرصنة/ادعاءات طبية): ${policyLine}`,
  critical === 0 ? '- ✅ **لا مشاكل حرجة — آمن للنشر.**' : '- ❌ **مشاكل حرجة — راجعها قبل النشر.**',
  '',
].join('\n');

const out = head + report.join('\n') + '\n';
console.log(out);
if (process.env.GITHUB_STEP_SUMMARY) { try { appendFileSync(process.env.GITHUB_STEP_SUMMARY, out); } catch {} }
process.exit(critical > 0 ? 1 : 0);
