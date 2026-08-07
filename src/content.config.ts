import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { allSubcategorySlugs, allCategorySlugs } from './data/categories';

/**
 * The `sites` collection — one Markdown file per website/tool/forum.
 * Add src/content/sites/<slug>.md and it appears everywhere automatically
 * (home accordion, its category page, its own page, search, sitemap).
 * A site belongs to a SUBCATEGORY; the parent category is derived from it.
 */
const sites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sites' }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    subcategory: z.enum(allSubcategorySlugs),
    tagline: z.string(),               // one-line summary (shown on cards/rows)
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    /** Paid placement (advertised listing/featured slot). Renders a visible
     *  "Sponsored" badge and forces rel="sponsored" on the outbound link,
     *  per Google's paid-link policy — never shown as an editorial pick. */
    sponsored: z.boolean().default(false),
    /** Optional override. Leave unset for auto-detection from the URL.
     *  true  -> force rel="sponsored"; false -> force a normal follow link. */
    affiliate: z.boolean().optional(),
    updated: z.coerce.date().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    /** Optional logo or hero image URL for this tool. Used in UI and Schema. */
    image: z.string().optional(),
    /** Optional local screenshot preview (public/screens/<slug>.jpg).
     *  Shown above the tool name in directory cards as a visual preview. */
    screenshot: z.string().optional(),
    /** Pricing model — shown as a badge on directory rows and powers the
     *  price filter. free = no paywall at all, freemium = usable free tier
     *  with paid upgrades, paid = requires payment (trial may exist). */
    pricing: z.enum(['free', 'freemium', 'paid']).optional(),
    /** Plain-language explainer blocks shown at the TOP of the tool page,
     *  so a visitor understands the tool in ~10 seconds without jargon. */
    simple: z.string().optional(),            // "In plain words" — no technical terms, 1-2 sentences
    example: z.string().optional(),           // "Real example" — a concrete do-X → get-Y scenario
    goodFor: z.array(z.string()).default([]),  // "Is it for you?" — ✅ who it fits
    notFor: z.array(z.string()).default([]),   // ❌ who it does NOT fit
    /** Optional FAQ -> FAQPage schema (Position Zero) on the tool's page. */
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

/**
 * The `guides` collection — long-form SEO articles (2500+ words).
 * Add src/content/guides/<slug>.md and it appears in /guides and its own page.
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),          // meta description (150-160 chars ideal)
    keyword: z.string().optional(),   // primary target keyword
    tags: z.array(z.string()).default([]),
    category: z.enum(allCategorySlugs).optional(), // links the article to a directory category
    author: z.string().default('bla5k'),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    metaTitle: z.string().optional(),
    // Optional FAQ for FAQPage schema (Position Zero eligibility)
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

export const collections = { sites, guides };
