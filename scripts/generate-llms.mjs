/**
 * Generates public/llms.txt from the actual content collections
 * (src/content/sites/*.md + src/content/guides/*.md) so it never drifts
 * out of sync with the directory.
 *
 * Usage: node scripts/generate-llms.mjs
 * (llms.txt is the plain-text site summary AI engines read first.)
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITES = 'src/content/sites';
const GUIDES = 'src/content/guides';
const OUT = 'public/llms.txt';

function frontmatter(file) {
  const raw = readFileSync(join(file), 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (!m) return fm;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    val = val.replace(/^["']|["']$/g, '');
    fm[kv[1]] = val;
  }
  return fm;
}

// ── Tools: featured first, then curated high-value picks to reach 30 ──
const tools = readdirSync(SITES)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...frontmatter(join(SITES, f)) }))
  .filter((t) => t.name);

const featured = tools.filter((t) => t.featured === 'true');
const curated = [
  'deepseek', 'qwen-chat', 'meta-ai', 'microsoft-copilot', 'perplexity',
  'claude-code', 'suno-ai', 'n8n', 'duck-ai', 'monica', 'sider-ai',
  'notebooklm', 'midjourney',
].map((slug) => tools.find((t) => t.slug === slug)).filter(Boolean);

const bySlug = new Map();
const top = [];
for (const t of [...featured, ...curated]) {
  if (t && !bySlug.has(t.slug)) { bySlug.set(t.slug, true); top.push(t); }
}
const top30 = top.slice(0, 30);

// ── Guides: all 18, with descriptions ──
const guides = readdirSync(GUIDES)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...frontmatter(join(GUIDES, f)) }))
  .filter((g) => g.title);

const lines = [];
lines.push('# bla5k — Best AI Tools Directory 2026');
lines.push('');
lines.push('> bla5k is a curated, human-reviewed directory of the best AI tools, apps and');
lines.push('> communities. Every tool has an in-depth review: what it does, pricing, free');
lines.push('> tiers, pros/cons, comparison tables, FAQs and plain-language explainers.');
lines.push('> We cover AI chat, coding, design, video & audio, education, writing, agents');
lines.push('> and no-code builders. Updated weekly. Unbiased — affiliate links disclosed.');
lines.push('');
lines.push('## Key pages');
lines.push('');
lines.push('- Home (full directory): https://bla5k.com/');
lines.push('- In-depth guides: https://bla5k.com/guides/');
lines.push('- About: https://bla5k.com/about/');
lines.push('');
lines.push(`## Top ${top30.length} tools (curated)`);
lines.push('');
for (const t of top30) {
  const tagline = t.tagline ? t.tagline.replace(/["']/g, '') : 'AI tool reviewed by bla5k';
  lines.push(`- ${t.name}: https://bla5k.com/tools/${t.slug}/ — ${tagline}`);
}
lines.push('');
lines.push('## Guides (all)');
lines.push('');
for (const g of guides) {
  const desc = g.description ? g.description.replace(/["']/g, '') : 'In-depth guide by bla5k';
  lines.push(`- ${g.title}: https://bla5k.com/guides/${g.slug}/ — ${desc}`);
}
lines.push('');
lines.push('## What makes bla5k useful');
lines.push('');
lines.push('- Plain-language explainers: "What is this tool?" answered in the first 100 words');
lines.push('- Honest pros/cons and free-tier details for every tool');
lines.push('- Comparison tables and FAQ sections formatted for direct answers');
lines.push('- Policy-complete, ads-ready site: Privacy, Terms, Cookie (GDPR consent),');
lines.push('  DMCA, Disclosure and Acceptable Use policies all published');
lines.push('');
lines.push('## Contact');
lines.push('');
lines.push('- Contact page: https://bla5k.com/contact/');
lines.push('- Legal: https://bla5k.com/privacy/ · https://bla5k.com/terms/ · https://bla5k.com/cookie-policy/');
lines.push('');

writeFileSync(OUT, lines.join('\n'));
console.log(`✅ llms.txt written: ${top30.length} tools + ${guides.length} guides → ${OUT}`);
