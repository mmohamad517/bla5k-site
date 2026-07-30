// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
    rehypePlugins: [rehypeCleanPastedContent],
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
