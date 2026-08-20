/**
 * The title, description and canonical URL for every route.
 *
 * One table, read twice: the app applies it on navigation so tabs, history and
 * bookmarks are distinguishable, and the Worker writes it into the served HTML
 * so crawlers and link unfurlers — which mostly do not run JavaScript — see it
 * too. A client-only fix would leave every shared link previewing as the
 * homepage.
 *
 * Descriptions are drawn from each page's own opening copy rather than written
 * fresh, so a page and its search result cannot describe different things.
 */
import { founders, portfolio, site } from '../data/site.js'
import { normalisePath, PATHS, REDIRECTS } from './routes.js'

/** Every title but the homepage's is "<page> — <firm>". */
const titled = (name) => `${name} — ${site.name}`

export const META = {
  [PATHS.home]: {
    title: `${site.name} — Proprietary Deep-Tech Investment`,
    description: site.description,
  },
  [PATHS.about]: {
    title: titled('About'),
    description:
      'A proprietary deep-tech investment firm backed by family capital, built for technology that takes years to qualify rather than a fund cycle to exit.',
  },
  [PATHS.thesis]: {
    title: titled('Investment Thesis'),
    description:
      'We back companies built on breakthrough science, proprietary engineering and durable intellectual property, judged on technology, defensibility, market, team and timing.',
  },
  [PATHS.capital]: {
    title: titled('Proprietary Capital'),
    description:
      'Starunico Capital invests principal capital. No external investors, no deployment clock, and no structural reason to exit a company before its technology has matured.',
  },
  [PATHS.approach]: {
    title: titled('Approach'),
    description:
      'How we evaluate an opportunity, how we invest, and what we do once we own part of a company.',
  },
  [PATHS.portfolio]: {
    title: titled('Portfolio'),
    description:
      'We make few investments and hold them for a long time. A holding appears here only with the founders’ agreement.',
  },
  [PATHS.founders]: {
    title: titled('For Founders'),
    description: founders.lede,
  },
  [PATHS.privacy]: {
    title: titled('Privacy Policy'),
    description:
      'What Starunico Capital does with personal information you send through this site: what is collected, why, who else sees it, and how long it is kept.',
  },
  [PATHS.terms]: {
    title: titled('Terms of Use'),
    description:
      'The terms on which this site is offered, including how unsolicited material sent through the submission form is treated.',
  },
}

export const NOT_FOUND_META = {
  title: titled('Page not found'),
  description: 'The page you were looking for has moved, or never existed in the first place.',
}

/**
 * Metadata for a path, including the canonical URL it should declare.
 *
 * A redirect answers with its destination's metadata: the two paths are the
 * same page, and pointing both canonicals at the destination is what stops them
 * competing with each other in an index.
 */
export function metaFor(pathname) {
  const path = normalisePath(pathname)
  const destination = Object.hasOwn(REDIRECTS, path) ? REDIRECTS[path] : path

  let meta = Object.hasOwn(META, destination) ? META[destination] : undefined

  if (!meta) {
    const slug = /^\/portfolio\/([^/]+)$/.exec(destination)?.[1]
    const company = slug && portfolio.disclosed.find((item) => item.slug === slug)
    if (company) {
      meta = {
        title: titled(company.name),
        // `technology` is the one-line description of what the company builds;
        // it is what the dossier page leads with, so the two agree.
        description: company.technology ?? META[PATHS.portfolio].description,
      }
    }
  }

  if (!meta) return { ...NOT_FOUND_META, canonical: null }

  // The homepage is canonical at the bare origin with a trailing slash.
  const canonical = destination === PATHS.home ? `${site.url}/` : `${site.url}${destination}`
  return { ...meta, canonical }
}
