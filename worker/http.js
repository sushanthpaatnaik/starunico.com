/** Small helpers for consistent JSON responses across the API. */

const BASE_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
}

export function json(data, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { ...BASE_HEADERS, ...headers },
  })
}

/** An error body with a stable shape: { error: { status, message, ... } }. */
export function apiError(status, message, extra = {}) {
  return json({ error: { status, message, ...extra } }, { status })
}

/**
 * Resolves the CORS headers for a request.
 *
 * ALLOWED_ORIGINS is a comma-separated allow-list; the default of "*" keeps the
 * read-only endpoints usable from anywhere. Set it in wrangler.jsonc to lock the
 * API down to your own origins.
 */
export function corsHeaders(request, env) {
  const allowed = (env.ALLOWED_ORIGINS ?? '*').trim()
  const origin = request.headers.get('origin')

  if (allowed === '*') {
    return {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400',
    }
  }

  const list = allowed.split(',').map((value) => value.trim()).filter(Boolean)
  if (!origin || !list.includes(origin)) return { vary: 'Origin' }

  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'Origin',
  }
}

export function withHeaders(response, headers) {
  const merged = new Response(response.body, response)
  for (const [key, value] of Object.entries(headers)) merged.headers.set(key, value)
  return merged
}
