import { readFileSync } from 'node:fs';

/**
 * The AdSense publisher id, resolved at build time.
 *
 * `public/ads.txt` already declares the publisher id — that file is what Google
 * itself reads to verify the account, so it is the one place the id is
 * guaranteed to be correct. Deriving the ad code's client id from the same line
 * means the two can never disagree, and the site keeps serving ads even when
 * nobody remembered to set an environment variable (which is exactly how it
 * ended up shipping no ad code at all).
 *
 * PUBLIC_ADSENSE_CLIENT still wins when set, so a preview deploy can point at a
 * different account or disable ads with an empty value.
 */
function fromAdsTxt(): string | undefined {
  try {
    // e.g. "google.com, pub-7308552764675687, DIRECT, f08c47fec0942fa0"
    const m = readFileSync('public/ads.txt', 'utf8').match(/^\s*google\.com\s*,\s*(pub-\d+)/m);
    return m ? `ca-${m[1]}` : undefined;
  } catch {
    return undefined;
  }
}

const fromEnv = import.meta.env.PUBLIC_ADSENSE_CLIENT;

export const ADSENSE_CLIENT: string | undefined =
  (typeof fromEnv === 'string' && fromEnv.trim()) || fromAdsTxt();
