import type { CollectionEntry } from 'astro:content';
import { statSync } from 'node:fs';

/**
 * Honest dates for content entries, shared by the RSS feeds and the homepage
 * "Newest tools" section.
 *
 * - Guides: their `published` date (or `updated` when present).
 * - Tools: their `updated` frontmatter when set, falling back to the file's
 *   last-modified time so every tool gets a real (not guessed) recency order.
 */

const TOOLS_DIR = 'src/content/sites';

/** Best-known date for a tool entry. */
export function toolDate(tool: CollectionEntry<'sites'>): Date {
  if (tool.data.updated) return new Date(tool.data.updated);
  // The collection entry can only exist if its .md file exists, so this is safe.
  return statSync(`${TOOLS_DIR}/${tool.id}.md`).mtime;
}

/** Best-known date for a guide entry. */
export function guideDate(guide: CollectionEntry<'guides'>): Date {
  return new Date(guide.data.updated ?? guide.data.published);
}
