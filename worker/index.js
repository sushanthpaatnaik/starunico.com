import { apiError, corsHeaders, withHeaders } from './http.js'
import { routes } from './routes.js'

/**
 * Only /api/* reaches this Worker — wrangler.jsonc sets
 * `assets.run_worker_first: ["/api/*"]`, so the static bundle and the SPA
 * fallback are served by Cloudflare's asset layer without invoking us.
 * `env.ASSETS.fetch` is still available for anything that slips through.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (!url.pathname.startsWith('/api')) {
      return env.ASSETS.fetch(request)
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
