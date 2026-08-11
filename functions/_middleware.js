// Redirect www.bla5k.com → bla5k.com (301) to unify indexing.
//
// Cloudflare Pages "_redirects" does not support domain-level redirects, so
// this middleware is the code-level way to consolidate the www host onto the
// apex domain. It runs on every request to the Pages project and preserves
// the full path + query string. All other requests pass through via next(),
// so the static pipeline (assets, _redirects, _headers) is unaffected.
export const onRequest = async ({ request, next }) => {
  const host = (request.headers.get('host') || '').toLowerCase();
  if (host.startsWith('www.')) {
    const url = new URL(request.url);
    url.hostname = url.hostname.replace(/^www\./i, '');
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
