/**
 * Search-result titles for tool pages.
 *
 * 7,668 of 8,141 pages carried the same title shape — "X - AI Tool Review &
 * Guide 2026" — which promises a searcher nothing the tool's own site doesn't
 * already offer. Search Console showed the cost: pages sitting at position 5-9
 * with zero clicks, because on a brand query the official site wins every time
 * against a generic "review & guide".
 *
 * A directory only earns the click by promising what a vendor will never say —
 * what the thing costs, where it stops, and who should skip it. Every tool page
 * carries `pricing`, a `notFor` list and FAQs, so these titles promise only
 * what the page in fact answers. Anything hand-written is left alone.
 */

/** The auto-generated shape we are replacing; anything else was written by a human. */
const GENERIC = /\bReview & Guide\s+\d{4}\s*$/i;

/** Google truncates around here, and the tool name must never be what gets cut. */
const MAX = 60;

type Pricing = 'free' | 'freemium' | 'paid' | undefined;

// Several phrasings of the same true claim, so 5,900 freemium pages don't all
// share one string. Longest first — the first one that fits is used.
const ANGLES: Record<'free' | 'freemium' | 'paid' | 'unknown', string[][]> = {
  free: [
    ['Free: What It Does and Where It Stops', 'Free — and Where It Stops'],
    ["Free, and What You Give Up for It", 'Free: The Trade-offs'],
    ["What the Free Tool Can and Can't Do", 'Free: What You Get'],
  ],
  freemium: [
    ['Free Tier vs Paid: Where the Line Is', 'Free vs Paid'],
    ['Is the Free Plan Enough for You?', 'Is the Free Plan Enough?'],
    ['What the Free Version Leaves Out', 'What Free Leaves Out'],
    ['Free vs Paid, and Who Each Suits', 'Free vs Paid: Who It Suits'],
  ],
  paid: [
    ["What It Costs, and Whether It's Worth It", "Is It Worth the Price?"],
    ['Worth Paying For? Fit, Limits, Price', 'Worth Paying For?'],
    ['The Case For and Against Paying', 'For and Against Paying'],
  ],
  unknown: [
    ["What It Does Well, and What It Doesn't", 'Strengths and Limits'],
    ['Strengths, Limits, and Who It Suits', 'Who It Suits'],
  ],
};

/** Stable across builds: the same slug always picks the same angle. */
function pick(slug: string, n: number) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % n;
}

/**
 * The <title> for a tool page. Returns `metaTitle` untouched when it was
 * written by hand; otherwise builds one from what the page actually answers.
 */
export function toolTitle(opts: {
  name: string;
  slug: string;
  pricing?: Pricing;
  metaTitle?: string;
}): string {
  const { name, slug, pricing, metaTitle } = opts;
  if (metaTitle && !GENERIC.test(metaTitle)) return metaTitle;

  const bucket = pricing ?? 'unknown';
  const options = ANGLES[bucket];
  const [long, short] = options[pick(slug, options.length)];

  const full = `${name} — ${long}`;
  if (full.length <= MAX) return full;
  const brief = `${name} — ${short}`;
  // A very long tool name leaves no room for a promise; the name alone still
  // beats a truncated one, since the name is what the searcher typed.
  return brief.length <= MAX ? brief : name;
}
