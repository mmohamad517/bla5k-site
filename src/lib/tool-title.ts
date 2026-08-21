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

// Several phrasings of the same true claim, so no single hook carries too
// much of the site. At 12 total phrasings across 8,142 pages, the busiest
// ones (freemium especially) were landing on 1,400+ pages each — still a
// unique title per page (the tool name leads every one), but a searcher
// comparing two bla5k results side by side saw the same hook twice. Longest
// first — the first one that fits is used.
const ANGLES: Record<'free' | 'freemium' | 'paid' | 'unknown', string[][]> = {
  free: [
    ['Free: What It Does and Where It Stops', 'Free — and Where It Stops'],
    ["Free, and What You Give Up for It", 'Free: The Trade-offs'],
    ["What the Free Tool Can and Can't Do", 'Free: What You Get'],
    ["Genuinely Free — Here's the Catch", "Free — Here's the Catch"],
    ['No Paywall, No Catch? The Real Answer', 'No Paywall — Really?'],
    ['Free Forever, But Not Unlimited', 'Free, Not Unlimited'],
    ['What "Free" Actually Means Here', 'What Free Actually Means'],
    ['Zero Cost, Real Limits — What to Expect', 'Zero Cost, Real Limits'],
    ['Free to Use — Is That Enough?', 'Free — Is That Enough?'],
    ['The Free Version, Fully Explained', 'The Free Version Explained'],
  ],
  freemium: [
    ['Free Tier vs Paid: Where the Line Is', 'Free vs Paid'],
    ['Is the Free Plan Enough for You?', 'Is the Free Plan Enough?'],
    ['What the Free Version Leaves Out', 'What Free Leaves Out'],
    ['Free vs Paid, and Who Each Suits', 'Free vs Paid: Who It Suits'],
    ["Free to Start — Here's When You'll Pay", 'Free to Start, Then What?'],
    ['The Upgrade Point: When Free Stops Cutting It', 'When Free Stops Cutting It'],
    ["Free Plan or Paid Plan? The Real Answer", 'Free or Paid? Real Answer'],
    ['How Far the Free Plan Actually Gets You', 'How Far Free Gets You'],
    ['Before You Pay: What Free Already Covers', 'What Free Already Covers'],
    ['Free Tier, Real Limits, Honest Verdict', 'Free Tier, Honest Verdict'],
  ],
  paid: [
    ["What It Costs, and Whether It's Worth It", "Is It Worth the Price?"],
    ['Worth Paying For? Fit, Limits, Price', 'Worth Paying For?'],
    ['The Case For and Against Paying', 'For and Against Paying'],
    ["No Free Tier — Is It Worth the Money?", 'Worth the Money?'],
    ['The Price, the Fit, and the Verdict', 'Price, Fit, Verdict'],
    ["What You're Actually Paying For", "What You're Paying For"],
    ["Paid Only — Here's What You Actually Get", 'Paid Only — What You Get'],
    ['Before You Pay: The Honest Breakdown', 'The Honest Breakdown'],
  ],
  unknown: [
    ["What It Does Well, and What It Doesn't", 'Strengths and Limits'],
    ['Strengths, Limits, and Who It Suits', 'Who It Suits'],
    ['What It Actually Does, Explained', 'What It Actually Does'],
    ['The Honest Rundown: Strengths and Gaps', 'Strengths and Gaps'],
    ["Where It Excels, and Where It Doesn't", 'Where It Excels'],
    ['A Clear-Eyed Look at What It Offers', 'A Clear-Eyed Look'],
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
