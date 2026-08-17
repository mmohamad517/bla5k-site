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
