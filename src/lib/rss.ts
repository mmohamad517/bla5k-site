import { getCollection } from 'astro:content';
import { toolDate, guideDate } from './content-dates';

/**
 * RSS 2.0 feed generation for bla5k — shared by /rss.xml (combined),
 * /rss-tools.xml (tools only) and /rss-guides.xml (guides only).
 * Dates come from the shared content-dates helpers (frontmatter or mtime).
 */

const SITE = 'https://bla5k.com';

/** Escape text for XML (element + attribute context). */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RFC-2822 date string, required by RSS readers for pubDate. */
function rfc2822(d: Date): string {
  return d.toUTCString();
}

function item(title: string, link: string, date: Date, description: string, category?: string): string {
  return [
    '    <item>',
    `      <title>${esc(title)}</title>`,
    `      <link>${link}</link>`,
    `      <guid isPermaLink="true">${link}</guid>`,
    `      <pubDate>${rfc2822(date)}</pubDate>`,
    category ? `      <category>${esc(category)}</category>` : '',
    `      <description>${esc(description)}</description>`,
    '    </item>',
  ]
    .filter(Boolean)
    .join('\n');
}

function channelXml(opts: {
  title: string;
  description: string;
  selfLink: string;
  items: string[];
}): string {
  const now = new Date();
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(opts.title)}</title>`,
    `    <link>${SITE}/</link>`,
    `    <description>${esc(opts.description)}</description>`,
    '    <language>en-us</language>',
    '    <generator>bla5k</generator>',
    `    <lastBuildDate>${rfc2822(now)}</lastBuildDate>`,
    `    <atom:link href="${SITE}${opts.selfLink}" rel="self" type="application/rss+xml"/>`,
    opts.items.join('\n'),
    '  </channel>',
    '</rss>',
  ].join('\n');
}

type FeedKind = 'all' | 'tools' | 'guides';

/** Build the item XML for a feed kind, newest first. */
async function buildItems(kind: FeedKind): Promise<string[]> {
  const items: { title: string; link: string; date: Date; description: string; category?: string }[] = [];

  if (kind === 'all' || kind === 'guides') {
    const guides = await getCollection('guides');
    for (const g of guides) {
      items.push({
        title: g.data.title,
        link: `${SITE}/guides/${g.id}/`,
        date: guideDate(g),
        description: g.data.description,
        category: g.data.category,
      });
    }
  }

  if (kind === 'all' || kind === 'tools') {
    const tools = await getCollection('sites');
    for (const t of tools) {
      items.push({
        title: t.data.name,
        link: `${SITE}/tools/${t.id}/`,
        date: toolDate(t),
        description: t.data.metaDescription ?? t.data.tagline,
        category: t.data.subcategory,
      });
    }
  }

  items.sort((a, b) => b.date.getTime() - a.date.getTime());

  const cap = kind === 'all' ? 40 : kind === 'tools' ? 100 : 20;
  return items.slice(0, cap).map((it) => item(it.title, it.link, it.date, it.description, it.category));
}

export async function rssAll(): Promise<string> {
  return channelXml({
    title: 'bla5k — Best AI Tools Directory',
    description:
      'The latest AI tools and guides added to bla5k — a curated directory of the best AI tools, sites, and communities.',
    selfLink: '/rss.xml',
    items: await buildItems('all'),
  });
}

export async function rssTools(): Promise<string> {
  return channelXml({
    title: 'bla5k — New AI Tools',
    description: 'The latest AI tools added to the bla5k directory, reviewed and curated.',
    selfLink: '/rss-tools.xml',
    items: await buildItems('tools'),
  });
}

export async function rssGuides(): Promise<string> {
  return channelXml({
    title: 'bla5k — Guides & Articles',
    description: 'Long-form guides and articles from bla5k on the best AI tools of 2026.',
    selfLink: '/rss-guides.xml',
    items: await buildItems('guides'),
  });
}
