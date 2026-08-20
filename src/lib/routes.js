/**
 * Every path the client router answers, in one place.
 *
 * App.jsx builds its <Route> table from these constants and the Worker decides
 * 200 vs 404 with `isKnownRoute`, so the two cannot drift apart. A path added to
 * the router without being added here would start returning 404 from the edge
 * while rendering correctly — which is exactly the bug this file prevents.
 */
import { portfolio } from '../data/site.js'

export const PATHS = {
  home: '/',
  about: '/about',
  thesis: '/thesis',
  capital: '/capital',
  approach: '/approach',
  portfolio: '/portfolio',
  founders: '/founders',
  privacy: '/privacy',
  terms: '/terms',
}

/** Paths that existed before the rebuild and still redirect. */
export const REDIRECTS = {
  '/contact': PATHS.founders,
  '/philosophy': PATHS.thesis,
  '/sectors': PATHS.thesis,
  '/partnering': PATHS.approach,
}

/** A path in the form the tables above use: no trailing slash except at root. */
export const normalisePath = (pathname) =>
  pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

const strip = normalisePath

/** True when the router will render a real page rather than the 404. */
export function isKnownRoute(pathname) {
  const path = strip(pathname)
  if (Object.values(PATHS).includes(path)) return true
  if (Object.hasOwn(REDIRECTS, path)) return true

  const company = /^\/portfolio\/([^/]+)$/.exec(path)
  if (company) return portfolio.disclosed.some((item) => item.slug === company[1])

  return false
}
