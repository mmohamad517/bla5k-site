import { getCollection } from 'astro:content';

/**
 * Build-scoped memo for collection queries that every page repeats.
 *
 * `getCollection('sites')` walks and validates all 10k+ entries on each call.
 * That is fine on a page rendered once, but Header renders on every one of the
 * 10k+ pages, so the same full-collection scan was running 10k times — the
 * dominant cost of `astro build`. The module is evaluated once per build, so
 * caching the promise here collapses those scans into one.
 */
let sponsoredPromise: Promise<Awaited<ReturnType<typeof getCollection<'sites'>>>> | undefined;

/** Tools with `sponsored: true` — paid placements shown in the header carousel. */
export function getSponsoredSites() {
  sponsoredPromise ??= getCollection('sites').then((all) => all.filter((s) => s.data.sponsored));
  return sponsoredPromise;
}

let countPromise: Promise<number> | undefined;

/**
 * How many tools the directory actually holds, rounded down to a round number
 * for use in copy ("8,000+"). The site description hard-coded "2,500+" long
 * after the directory had grown past three times that, so derive it instead.
 */
export function getToolCountLabel() {
  countPromise ??= getCollection('sites').then((all) => all.length);
  return countPromise.then((n) => {
    const step = n >= 10000 ? 1000 : n >= 1000 ? 500 : 100;
    return (Math.floor(n / step) * step).toLocaleString('en-US') + '+';
  });
}
