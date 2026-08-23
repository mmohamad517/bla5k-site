import { pick } from './tool-title';

/**
 * 7,939 of 8,142 tool pages carry this exact `notFor[0]` string, verbatim,
 * from the original bulk-generation pass — the same signal that marks their
 * `example` field, FAQ answers, and markdown body as templated filler with
 * only the tool name swapped in. One reliable field to check rather than
 * pattern-matching prose in five different places.
 */
const GENERIC_NOTFOR_0 = 'You need the absolute best specialist for a highly niche format';

/** True for a bulk-generated page whose body/FAQs/notFor are templated filler. */
export function isGenericToolPage(notFor: string[] | undefined): boolean {
  return notFor?.[0] === GENERIC_NOTFOR_0;
}

type Pricing = 'free' | 'freemium' | 'paid' | undefined;

/**
 * The one-sentence pricing verdict on a generic-card tool page.
 *
 * Replacing #26's body text with a single fixed sentence per pricing tier
 * fixed the fake-review problem but created a smaller one: at ~3 sentences
 * total, that one line became a large share of each page's unique text, and
 * Google flagged a wave of these pages as "Duplicate without user-selected
 * canonical" — 5,855 freemium pages all rendered the literal same sentence
 * shape. Same fix as the title angles in tool-title.ts: several honest
 * phrasings of the same true claim, picked deterministically per slug.
 */
const PRICING_LINES: Record<'free' | 'freemium' | 'paid' | 'unknown', (name: string, key: string) => string> = {
  free: (name, key) => pickLine(name, key, [
    '{name} is completely free to use.',
    '{name} costs nothing to use.',
    "There's no charge to use {name}.",
    '{name} is free, with no paid tier.',
    'You can use {name} without paying anything.',
    "{name} doesn't charge for access.",
    'No payment is required to use {name}.',
    '{name} is free — no subscription, no paywall.',
    'Using {name} costs you nothing.',
    '{name} is available at no cost.',
    "There's no price tag on {name}.",
    '{name} is 100% free to access.',
    '{name} charges nothing for use.',
    'Access to {name} is entirely free.',
    '{name} has no paid plan — it just works, free.',
  ]),
  freemium: (name, key) => pickLine(name, key, [
    '{name} has a free tier, with paid plans for more.',
    '{name} offers a usable free plan before you need to pay.',
    'You can start {name} for free; paid plans unlock more.',
    '{name} is free to start, with paid tiers for heavier use.',
    "There's a free plan for {name}, plus paid options beyond it.",
    '{name} lets you begin for free before considering a paid plan.',
    'A free tier covers the basics of {name}; paid plans go further.',
    '{name} is free at the entry level, paid for more capacity.',
    "You don't need to pay to try {name} — a free tier is available.",
    '{name} combines a free plan with paid upgrades.',
    "Start with {name}'s free tier; upgrade if you need more.",
    '{name} is free to test, with paid plans for continued use.',
    "There's no cost to begin with {name}; paid tiers add more.",
    '{name} offers both a free plan and paid options.',
    '{name} is free at a basic level, with paid plans above that.',
  ]),
  paid: (name, key) => pickLine(name, key, [
    '{name} requires a paid plan — check the official site for current pricing.',
    "{name} doesn't offer a free tier — you'll need to pay to use it.",
    "There's no free version of {name}; it's a paid product.",
    '{name} is paid-only — check its site for current pricing.',
    '{name} requires a paid subscription or purchase to use.',
    '{name} charges for access — no free plan is available.',
    '{name} is a paid tool; pricing is on the official site.',
    "You'll need to pay to use {name} — there's no free tier.",
    "{name} doesn't have a free option; it's paid from the start.",
    'Access to {name} requires payment — check current pricing directly.',
    '{name} has no free tier — budget for a paid plan before you start.',
    'Using {name} means paying for it; there is no free option.',
  ]),
  unknown: (name, key) => pickLine(name, key, [
    "Pricing for {name} isn't listed here — check the official site for current plans.",
    "{name}'s pricing isn't specified — see its official site for current details.",
    "Check {name}'s official site for its current pricing.",
    "We don't have pricing details for {name} listed — the official site will have them.",
    "{name}'s cost isn't listed here; check directly with the official site.",
    'For current pricing on {name}, check the official site.',
  ]),
};

function pickLine(name: string, key: string, lines: string[]): string {
  const i = pick(key, lines.length);
  return lines[i].replace(/\{name\}/g, name);
}

/** The one-sentence, pricing-tier-backed verdict shown on a generic tool card. */
export function pricingLine(name: string, slug: string, pricing: Pricing): string {
  const bucket = pricing ?? 'unknown';
  // Hash the slug, not the name — two tools with the same display name in
  // different subcategories should still be able to land on different lines.
  return PRICING_LINES[bucket](name, slug);
}

/** A few openings for the "compare with other tools" sentence, same reasoning as above. */
const COMPARE_OPENERS = [
  'Comparing options? bla5k tracks {n} tools in {cat}, including',
  'Weighing alternatives? {cat} has {n} other tools tracked here, including',
  'Want to compare? bla5k lists {n} tools in {cat}, such as',
  'Looking at other options? {cat} includes {n} tools we track, including',
  'Still deciding? bla5k tracks {n} tools in {cat}, like',
];

export function compareOpener(slug: string, n: number, cat: string): string {
  const i = pick(slug + ':cmp', COMPARE_OPENERS.length);
  return COMPARE_OPENERS[i].replace('{n}', String(n)).replace('{cat}', cat);
}
