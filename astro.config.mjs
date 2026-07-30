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
  const out = [];
  try {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const slug = f.replace(/\.md$/, '');
      const m = readFileSync(dir + '/' + f, 'utf8').match(/^name:\s*(.+)$/m);
      const name = (m ? m[1].replace(/^["']|["']$/g, '') : slug).trim();
      if (name.length >= 4) out.push({ name, slug, re: new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b') });
    }
  } catch {}
  return out.sort((a, b) => b.name.length - a.name.length); // match longer names first
}
const TOOL_INDEX = loadToolIndex();

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
        for (const t of TOOL_INDEX) {
          if (t.slug === curSlug || linked.has(t.slug)) continue;
          const m = t.re.exec(c.value);
          if (!m) continue;
          const before = c.value.slice(0, m.index);
          const after = c.value.slice(m.index + m[0].length);
          const link = { type: 'element', tagName: 'a', properties: { href: `/tools/${t.slug}/` }, children: [{ type: 'text', value: m[0] }] };
          const repl = [];
          if (before) repl.push({ type: 'text', value: before });
          repl.push(link);
          if (after) repl.push({ type: 'text', value: after });
          node.children.splice(i, 1, ...repl);
          i += repl.length - 1;
          linked.add(t.slug);
          break;
        }
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
    }),
  ],
});
