import { apiError, corsHeaders, withHeaders } from './http.js'
import { routes } from './routes.js'
import { metaFor } from '../src/lib/meta.js'
import { isKnownRoute } from '../src/lib/routes.js'
import { robots, sitemap } from './seo.js'

/**
 * Requests for real files are served by Cloudflare's asset layer without
 * invoking this Worker. Everything else arrives here: /api/* because
 * `run_worker_first` names it, and any other path because
 * `not_found_handling` is "none", so the asset layer stops rather than
 * inventing a fallback.
 *
 * That is what lets a genuinely unknown path answer 404. The single-page
 * fallback is served here instead, with the status the path deserves.
 */
/**
 * Serves the single-page document for a client route, or the same document with
 * a 404 for a path the router does not answer. Search engines and link checkers
 * then see the truth, while a visitor still gets the styled page.
 */
async function documentFor(url, request, env) {
  const index = await env.ASSETS.fetch(new URL('/', url.origin))

  if (!index.ok) return index

  const known = isKnownRoute(url.pathname)
  const headers = new Headers(index.headers)
  headers.set('cache-control', known ? 'public, max-age=0, must-revalidate' : 'no-store')

  const document = new Response(request.method === 'HEAD' ? null : index.body, {
    status: known ? 200 : 404,
    headers,
  })

  return withMeta(document, url.pathname)
}

/**
 * Rewrites the head for the route being served.
 *
 * Every route is one built document, so without this every page ships the
 * homepage's title, description and canonical URL. The title is a browsing
 * problem; the canonical is worse — it tells a search engine that eight
 * distinct pages are duplicates of the homepage.
 *
 * The app repeats this on client-side navigation. Doing it here as well is what
 * covers everything that never runs the app: crawlers, link unfurlers in chat
 * apps, and readers.
 */
function withMeta(response, pathname) {
  const { title, description, canonical } = metaFor(pathname)

  return new HTMLRewriter()
    .on('title', {
      element: (element) => element.setInnerContent(title),
    })
    .on('meta[name="description"], meta[property="og:description"]', {
      element: (element) => element.setAttribute('content', description),
    })
    .on('meta[property="og:title"]', {
      element: (element) => element.setAttribute('content', title),
    })
    .on('link[rel="canonical"], meta[property="og:url"]', {
      element: (element) => {
        // An unknown path is not canonical anywhere, so it claims nothing.
        if (!canonical) return element.remove()
        element.setAttribute(element.tagName === 'link' ? 'href' : 'content', canonical)
      },
    })
    .on('head', {
      element: (element) => {
        // A path with no canonical URL is a 404, which should not be indexed.
        if (!canonical) element.append('<meta name="robots" content="noindex">', { html: true })
      },
    })
    .transform(response)
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Generated rather than shipped as files, so they follow the route table.
    if (url.pathname === '/robots.txt') return robots(url)
    if (url.pathname === '/sitemap.xml') return sitemap()

    if (!url.pathname.startsWith('/api')) {
      return documentFor(url, request, env)
    }

    const cors = corsHeaders(request, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    // Tolerate a trailing slash so /api/health/ and /api/health are the same route.
    const pathname =
      url.pathname.length > 4 && url.pathname.endsWith('/')
        ? url.pathname.slice(0, -1)
        : url.pathname

    const handlers = Object.hasOwn(routes, pathname) ? routes[pathname] : undefined
    if (!handlers) {
      return withHeaders(apiError(404, `No API route for ${url.pathname}.`), cors)
    }

    // HEAD is served by running the GET handler and dropping the body.
    const method = request.method === 'HEAD' ? 'GET' : request.method
    const handler = handlers[method]
    if (!handler) {
      const allow = [...Object.keys(handlers), 'OPTIONS'].join(', ')
      return withHeaders(
        apiError(405, `${request.method} is not allowed on ${pathname}.`, { allow }),
        { ...cors, allow },
      )
    }

    try {
      const response = await handler(request, env, ctx)
      const withCors = withHeaders(response, cors)
      return request.method === 'HEAD'
        ? new Response(null, { status: withCors.status, headers: withCors.headers })
        : withCors
    } catch (error) {
      console.error('unhandled API error', error)
      return withHeaders(apiError(500, 'Something went wrong handling that request.'), cors)
    }
  },
}
