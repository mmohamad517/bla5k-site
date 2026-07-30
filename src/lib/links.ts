/**
 * Affiliate / referral link handling.
 *
 * You normally do NOT set anything per site — just paste the URL:
 *   • a clean URL  (https://notion.so)            -> normal, follow link
 *   • a URL with a tracking code (?ref=, ?aff=…)  -> auto-tagged rel="sponsored"
 *
 * To force a decision, set `affiliate: true` or `affiliate: false` in the
 * site's Markdown frontmatter — an explicit value always wins.
 */

const AFFILIATE_HOST_MARKERS = [
  'amzn.to', 'amazon.', 'bit.ly', 'skimresources.com', 'shareasale.com',
  'awin1.com', 'go.redirectingat.com', 'clickbank', 'impact.com', 'partnerize',
  'go2cloud', 'sjv.io', 'pxf.io', 'gswsef', 'track.', 'go.', 'click.', 'redirect.',
];

const AFFILIATE_PARAM_MARKERS = [
  'ref=', 'ref_', 'aff', 'tag=', 'partner', 'utm_', 'via=', 'campaign',
  'clickid', 'irclickid', 'pid=', 'sid=', 'mtm_', 'fpr=', 'coupon', 'promo',
];

/** Heuristic: does this URL look like a referral/affiliate link? */
export function looksAffiliate(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '').toLowerCase();
    if (AFFILIATE_HOST_MARKERS.some((m) => host.includes(m))) return true;
    const q = u.search.toLowerCase();
    if (q && AFFILIATE_PARAM_MARKERS.some((m) => q.includes(m))) return true;
    return false;
  } catch {
    return false;
  }
}

/** Final decision: explicit frontmatter flag wins, otherwise auto-detect. */
export function isAffiliate(url: string, explicit?: boolean): boolean {
  return typeof explicit === 'boolean' ? explicit : looksAffiliate(url);
}

/**
 * Build the correct rel attribute for an outbound link.
 * Affiliate/paid -> rel="sponsored" (Google-required, invisible to visitors).
 * Editorial links stay follow but keep noopener/noreferrer.
 */
export function outboundRel(url: string, explicit?: boolean): string {
  return isAffiliate(url, explicit)
    ? 'sponsored nofollow noopener noreferrer'
    : 'noopener noreferrer';
}
