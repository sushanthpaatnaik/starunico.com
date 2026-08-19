import { PATHS } from '../src/lib/routes.js'
import { portfolio, site } from '../src/data/site.js'

const CANONICAL = new URL(site.url)

function text(body, { status = 200, type = 'text/plain; charset=utf-8', maxAge = 300 } = {}) {
  return new Response(body, {
    status,
    headers: {
      'content-type': type,
      'cache-control': `public, max-age=${maxAge}`,
      'x-content-type-options': 'nosniff',
    },
  })
}

/** Every canonical URL, built from the same route table the router uses. */
export function urls() {
  return [
    ...Object.values(PATHS),
    ...portfolio.disclosed.map((company) => `${PATHS.portfolio}/${company.slug}`),
  ].map((path) => new URL(path, CANONICAL).href)
}

/**
 * No <lastmod>, <changefreq> or <priority>. We have no honest per-page
 * modification date, and stamping the request time would tell crawlers the
 * content changes on every fetch; the other two are ignored by every major
 * engine.
 */
export function sitemap() {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls().map((loc) => `  <url><loc>${loc}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')

  return text(body, { type: 'application/xml; charset=utf-8' })
}

/**
 * The Worker also answers on its workers.dev subdomain. That host serves the
 * same site, so letting it be crawled would compete with the real domain —
 * anything but the canonical host is disallowed outright.
 *
 * Cloudflare's managed robots.txt feature prepends its own block to whatever we
 * return here, which already contains a `User-agent: *` group allowing
 * everything. So this adds only what that block lacks: the /api/ exclusion and
 * the sitemap reference. Omitting a redundant `Allow: /` keeps the merged file
 * readable, and costs nothing if the managed block is ever turned off — an
 * unlisted path is allowed by default.
 */
export function robots(url) {
  // Short TTL: Cloudflare's managed block is layered on at the edge, so this
  // file's content can change from a dashboard setting with no deploy. A long
  // cache would hide that for an hour.
  if (url.host !== CANONICAL.host) {
    return text(['User-agent: *', 'Disallow: /', ''].join('\n'))
  }

  const body = [
    'User-agent: *',
    '# JSON endpoints, nothing to index.',
    'Disallow: /api/',
    '',
    `Sitemap: ${new URL('/sitemap.xml', CANONICAL).href}`,
    '',
  ].join('\n')

  return text(body)
}
