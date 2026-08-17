// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

/**
 * Auto internal links: when an article mentions another tool by name as plain
 * text, turn the FIRST mention into a real internal link to that tool's page.
 * Fixes "orphan pages", strengthens SEO, and means you never have to hand-write
 * internal links. Runs at build time; never edits your source files.
 */
function loadToolIndex() {
  const dir = 'src/content/sites';
  const all = [];
  try {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const slug = f.replace(/\.md$/, '');
      const m = readFileSync(dir + '/' + f, 'utf8').match(/^name:\s*(.+)$/m);
      const name = (m ? m[1].replace(/^["']|["']$/g, '') : slug).trim();
      if (name.length >= 4) all.push({ name, slug });
    }
  } catch {}
  all.sort((a, b) => b.name.length - a.name.length); // longer names win ties

  // Testing one regex per tool against every text node meant ~10k regex
  // executions per node — billions across the whole build, and the single
  // biggest cost in `astro build`. Names that begin and end with a word char
  // (10.4k of 10.5k) have `\bName\b` semantics identical to "starts and ends on
  // a token boundary", so they go in an exact-match Map keyed by the name and
  // are found by walking the text's tokens once. ~700x faster, same output.
  const byName = new Map();
  let maxTokens = 1;
  const oddballs = []; // names not bounded by word chars keep the regex path
  for (const t of all) {
    if (/^\w/.test(t.name) && /\w$/.test(t.name)) {
      if (!byName.has(t.name)) byName.set(t.name, t.slug);
      const n = (t.name.match(/\w+/g) || []).length;
      if (n > maxTokens) maxTokens = n;
    } else {
      oddballs.push({ ...t, re: new RegExp('\\b' + t.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b') });
    }
  }
  return { byName, maxTokens, oddballs };
}
const TOOL_INDEX = loadToolIndex();

/**
 * Leftmost tool mention in `text` that `accept(slug)` allows, or null.
 * Walks tokens once and probes the longest candidate name first so
 * "Adobe Firefly" wins over a bare "Adobe".
 */
function findToolMention(text, accept) {
  const toks = [...text.matchAll(/\w+/g)];
  for (let i = 0; i < toks.length; i++) {
    const max = Math.min(TOOL_INDEX.maxTokens, toks.length - i);
    for (let k = max; k >= 1; k--) {
      const start = toks[i].index;
      const end = toks[i + k - 1].index + toks[i + k - 1][0].length;
      const slug = TOOL_INDEX.byName.get(text.slice(start, end));
      if (slug && accept(slug)) return { slug, start, end };
    }
  }
  for (const t of TOOL_INDEX.oddballs) {
    if (!accept(t.slug)) continue;
    const m = t.re.exec(text);
    if (m) return { slug: t.slug, start: m.index, end: m.index + m[0].length };
  }
  return null;
}

/**
 * Turn any real URL written as PLAIN TEXT (e.g. https://github.com/x) into a
 * clickable link — even if GFM autolinking missed it. Skips text already inside
 * links or code. Handles multiple URLs per paragraph.
 */
function rehypeLinkifyBareUrls() {
  const SKIP = new Set(['a', 'code', 'pre']);
  const URL_RE = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"\]])/g;
  return (tree) => {
    const walk = (node, skip) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        if (c.type === 'element') { walk(c, skip || SKIP.has(c.tagName)); continue; }
        if (c.type !== 'text' || skip || !/https?:\/\//.test(c.value)) continue;
        const parts = []; let last = 0; let m; URL_RE.lastIndex = 0;
        while ((m = URL_RE.exec(c.value))) {
          if (m.index > last) parts.push({ type: 'text', value: c.value.slice(last, m.index) });
          parts.push({ type: 'element', tagName: 'a', properties: { href: m[1] }, children: [{ type: 'text', value: m[1] }] });
          last = m.index + m[1].length;
        }
        if (parts.length) {
          if (last < c.value.length) parts.push({ type: 'text', value: c.value.slice(last) });
          node.children.splice(i, 1, ...parts);
          i += parts.length - 1;
        }
      }
    };
    walk(tree, false);
  };
}

function rehypeAutoInternalLinks() {
  const SKIP = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'code', 'pre']);
  return (tree, file) => {
    const curSlug = String(file?.path || file?.history?.[0] || '').split(/[\\/]/).pop()?.replace(/\.md$/, '') || '';
    const linked = new Set();
    const walk = (node, skip) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        if (c.type === 'element') { walk(c, skip || SKIP.has(c.tagName)); continue; }
        if (c.type !== 'text' || skip) continue;
        const hit = findToolMention(c.value, (slug) => slug !== curSlug && !linked.has(slug));
        if (!hit) continue;
        const before = c.value.slice(0, hit.start);
        const after = c.value.slice(hit.end);
        const link = { type: 'element', tagName: 'a', properties: { href: `/tools/${hit.slug}/` }, children: [{ type: 'text', value: c.value.slice(hit.start, hit.end) }] };
        const repl = [];
        if (before) repl.push({ type: 'text', value: before });
        repl.push(link);
        if (after) repl.push({ type: 'text', value: after });
        node.children.splice(i, 1, ...repl);
        i += repl.length - 1;
        linked.add(hit.slug);
      }
    };
    walk(tree, false);
  };
}

/**
 * Auto-fix pasted content so it renders cleanly on the site:
 * 1) Demote any <h1> inside an article body to <h2>. The page template already
 *    prints the tool/article name as the single page <h1>, so a body that starts
 *    with "# Title" (common when pasting from ChatGPT) won't create a duplicate H1.
 * 2) Turn every external link into a safe new-tab link (rel + target).
 * Dependency-free — walks the rehype (HAST) tree manually.
 */
function rehypeCleanPastedContent() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element') {
        // demote body H1 -> H2 (avoid duplicate page H1)
        if (node.tagName === 'h1') node.tagName = 'h2';
        // external links open safely in a new tab
        if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
          const href = node.properties.href;
          if (/^https?:\/\//i.test(href) && !href.includes('bla5k.com')) {
            node.properties.target = '_blank';
            node.properties.rel = 'noopener noreferrer';
          }
        }
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

// Static Site Generation (SSG) — fastest possible output for Cloudflare Pages.
// https://astro.build/config
export default defineConfig({
  site: 'https://bla5k.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always', // inline critical CSS -> better LCP / fewer requests
  },
  compressHTML: true,
  markdown: {
    gfm: true, // GitHub-Flavored Markdown: turns bare URLs (https://…) into clickable links automatically
    rehypePlugins: [rehypeLinkifyBareUrls, rehypeAutoInternalLinks, rehypeCleanPastedContent],
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
      customPages: ['https://bla5k.com/llms.txt'],
      // RSS feeds are machine-readable endpoints, not indexable HTML pages.
      filter: (page) => !/\/rss(-tools|-guides)?\.xml$/.test(page),
    }),
  ],
});
