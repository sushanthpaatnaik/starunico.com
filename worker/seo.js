import { PATHS } from '../src/lib/routes.js'
import { portfolio, site } from '../src/data/site.js'

const CANONICAL = new URL(site.url)

function text(body, { status = 200, type = 'text/plain; charset=utf-8', maxAge = 3600 } = {}) {
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
 */
export function robots(url) {
  if (url.host !== CANONICAL.host) {
    return text(['User-agent: *', 'Disallow: /', ''].join('\n'))
  }

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# JSON endpoints, nothing to index.',
    'Disallow: /api/',
    '',
    `Sitemap: ${new URL('/sitemap.xml', CANONICAL).href}`,
    '',
  ].join('\n')

  return text(body)
}
