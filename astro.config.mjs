// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static Site Generation (SSG) — fastest possible output for Cloudflare Pages.
// https://astro.build/config
export default defineConfig({
  site: 'https://bla5k.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always', // inline critical CSS -> better LCP / fewer requests
  },
  compressHTML: true,
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
