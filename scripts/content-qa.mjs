#!/usr/bin/env node
/**
 * bla5k Content QA Bot
 * --------------------
 * Runs automatically on every content change (GitHub Action) and produces a
 * report of everything it checked, flagged, and considers safe — no AI key,
 * no cost, fully deterministic. It catches the common mistakes so the site
 * stays clean for Google + AdSense even when you publish on your own.
 *
 * Checks: banned/piracy content, duplicate tools, broken/malformed links,
 * SEO essentials (title/description length, tagline, FAQs, word count),
 * valid category, and formatting issues.
 *
 * Exit code 1 if any CRITICAL issue is found (shows a red ✗ on the commit).
 */
import { readFileSync, readdirSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SITES_DIR = join(ROOT, 'src/content/sites');
const GUIDES_DIR = join(ROOT, 'src/content/guides');
const CATS_FILE = join(ROOT, 'src/data/categories.ts');

// ── piracy / banned-content signals (AdSense + Google safety) ──
const BANNED = [
  /\btorrents?\b/i, /\bcrack(ed|s|ing)?\b/i, /\bnulled\b/i, /\bwarez\b/i,
  /\bkeygens?\b/i, /\bpirat(e|ed|ing|es)?\b/i, /\bmod[\s-]?apk\b/i, /\bmodded\b/i,
  /free\s+(movies|streaming|premium|netflix|spotify)/i, /premium\s+(for\s+)?free/i,
  /\bserial\s+keys?\b/i, /\bactivation\s+keys?\b/i, /\bfree\s+download\s+(paid|cracked|full)/i,
];

// ── helpers ──
function listMd(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => join(dir, f));
}
function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fmText: '', body: raw };
  return { fmText: m[1], body: m[2] };
}
function fmValue(fmText, key) {
  const m = fmText.match(new RegExp('^' + key + ':\\s*(.*)$', 'm'));
  if (!m) return null;
  return m[1].replace(/^["']|["']$/g, '').trim();
}
function wordCount(text) {
  return (text.replace(/[#>*_`\-\[\]()!]/g, ' ').match(/\S+/g) || []).length;
}
function validSubcats() {
  try {
    const src = readFileSync(CATS_FILE, 'utf8');
    return new Set([...src.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]));
  } catch { return null; }
}

// ── report accumulator ──
const report = [];
let critical = 0, warnings = 0, filesChecked = 0;
const seenNames = new Map(), seenUrls = new Map(), seenSlugs = new Map();

function line(s) { report.push(s); }

function checkFile(path, kind) {
  filesChecked++;
  const raw = readFileSync(path, 'utf8');
  const { fmText, body } = splitFrontmatter(raw);
  const slug = path.split(/[\\/]/).pop().replace(/\.md$/, '');
  const name = fmValue(fmText, kind === 'site' ? 'name' : 'title') || slug;
  const findings = [];

  // 1) banned / piracy content
  const haystack = (name + ' ' + fmText + ' ' + body).slice(0, 20000);
  const bannedHit = BANNED.find((re) => re.test(haystack));
  if (bannedHit) { findings.push(`🚫 **راجع يدوياً**: كلمة قد تدل على قرصنة/محتوى محظور — النمط \`${bannedHit.source}\`. تأكد إن الأداة شرعية 100% قبل النشر (قد يكون تطابق بريء).`); warnings++; }

  // 2) duplicates
  const url = fmValue(fmText, 'url');
  if (seenNames.has(name.toLowerCase())) { findings.push(`⚠️ اسم مكرر: "${name}" موجود أيضاً في ${seenNames.get(name.toLowerCase())}`); warnings++; }
  else seenNames.set(name.toLowerCase(), slug);
  if (url) {
    const uk = url.toLowerCase().replace(/\/$/, '');
    if (seenUrls.has(uk)) { findings.push(`⚠️ رابط مكرر: ${url} مستخدم أيضاً في ${seenUrls.get(uk)}`); warnings++; }
    else seenUrls.set(uk, slug);
  }
  if (seenSlugs.has(slug)) { findings.push(`❌ CRITICAL: ملف مكرر بنفس الاسم: ${slug}`); critical++; }
  else seenSlugs.set(slug, path);

  // 3) required fields
  if (kind === 'site') {
    if (!fmValue(fmText, 'name')) { findings.push('❌ CRITICAL: حقل name مفقود'); critical++; }
    if (!url) { findings.push('❌ CRITICAL: حقل url مفقود'); critical++; }
    else if (!/^https?:\/\/.+/i.test(url)) { findings.push(`❌ CRITICAL: url غير صحيح (لازم يبدأ https://): ${url}`); critical++; }
    if (!fmValue(fmText, 'subcategory')) { findings.push('❌ CRITICAL: حقل subcategory مفقود'); critical++; }
    if (!fmValue(fmText, 'tagline')) { findings.push('⚠️ tagline مفقود (يظهر تحت الاسم)'); warnings++; }
  } else {
    if (!fmValue(fmText, 'title')) { findings.push('❌ CRITICAL: حقل title مفقود'); critical++; }
    if (!fmValue(fmText, 'description')) { findings.push('⚠️ description (meta) مفقود'); warnings++; }
    if (!fmValue(fmText, 'published')) { findings.push('⚠️ تاريخ published مفقود'); warnings++; }
  }

  // 4) valid subcategory
  const subs = validSubcats();
  if (kind === 'site' && subs) {
    const sub = fmValue(fmText, 'subcategory');
    if (sub && !subs.has(sub)) { findings.push(`❌ CRITICAL: subcategory غير موجودة: "${sub}"`); critical++; }
  }

  // 5) links: malformed / concatenated URLs (a common ChatGPT copy artifact)
  const concat = body.match(/https?:\/\/\S*https?:\/\//g);
  if (concat) { findings.push(`⚠️ رابط ملتصق/مشوّه (${concat.length}) — نظّفه: مثال \`${concat[0].slice(0, 60)}…\``); warnings++; }
  const mdLinks = (body.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || []).length;
  const bareLinks = (body.match(/(^|\s)https?:\/\/[^\s)]+/g) || []).length;

  // 6) SEO essentials
  const metaTitle = fmValue(fmText, 'metaTitle');
  if (metaTitle && metaTitle.length > 65) { findings.push(`⚠️ SEO title طويل (${metaTitle.length} حرف، الأفضل ≤ 60)`); warnings++; }
  const metaDesc = fmValue(fmText, 'metaDescription') || fmValue(fmText, 'description');
  if (metaDesc && (metaDesc.length < 70 || metaDesc.length > 170)) { findings.push(`⚠️ الوصف (${metaDesc.length} حرف) — الأفضل 120–160`); warnings++; }
  const faqCount = (fmText.match(/^\s*-\s*q:/gm) || []).length;
  if (faqCount === 0) { findings.push('⚠️ لا يوجد FAQ — أضف 3–6 أسئلة (مهم للسيو/Position Zero)'); warnings++; }

  // 7) content depth
  const words = wordCount(body);
  const minWords = kind === 'guide' ? 1500 : 600;
  if (words < minWords) { findings.push(`⚠️ محتوى قصير (${words} كلمة، الأفضل ≥ ${minWords})`); warnings++; }

  // 8) formatting note (build already auto-fixes duplicate H1)
  if (/^#\s+/m.test(body)) { findings.push('ℹ️ المقال يبدأ بعنوان `#` — النظام يحوّله تلقائياً لـ H2 (لا تقلق)'); }
  if (mdLinks === 0 && bareLinks === 0) { findings.push('⚠️ لا يوجد أي رابط في المقال — أضف روابط رسمية للمصدر وروابط داخلية'); warnings++; }

  // emit
  const status = findings.some((f) => f.includes('CRITICAL')) ? '❌' : findings.length ? '⚠️' : '✅';
  line(`\n### ${status} ${name}  \n\`${path.replace(ROOT, '').replace(/\\/g, '/')}\` — ${words} كلمة · ${mdLinks + bareLinks} رابط · ${faqCount} FAQ`);
  if (findings.length === 0) line('- ✅ سليم تماماً — جاهز للنشر.');
  else for (const f of findings) line(`- ${f}`);
}

// ── run ──
line('# 🤖 تقرير فحص المحتوى — bla5k Content QA\n');
line(`فُحص عند: ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC\n`);

for (const f of listMd(SITES_DIR)) checkFile(f, 'site');
for (const f of listMd(GUIDES_DIR)) checkFile(f, 'guide');

const summary = [
  '## 📊 الملخص',
  `- الملفات المفحوصة: **${filesChecked}**`,
  `- 🔴 مشاكل حرجة: **${critical}**`,
  `- 🟡 تنبيهات: **${warnings}**`,
  critical === 0 ? '- ✅ **لا مشاكل حرجة — الموقع آمن للنشر.**' : '- ❌ **يوجد مشاكل حرجة — راجعها قبل الاعتماد.**',
  '',
];
const out = summary.join('\n') + '\n' + report.join('\n') + '\n';

// print to console + GitHub Step Summary
console.log(out);
if (process.env.GITHUB_STEP_SUMMARY) {
  try { appendFileSync(process.env.GITHUB_STEP_SUMMARY, out); } catch {}
}

process.exit(critical > 0 ? 1 : 0);
