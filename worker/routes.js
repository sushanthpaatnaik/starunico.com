import { apiError, json } from './http.js'
import { validateContact, LIMITS, SUBJECTS } from '../src/lib/contact.js'
import {
  avoid,
  capitalAdvantages,
  criteria,
  journey,
  navigation,
  partnering,
  sectors,
  site,
  stages,
} from '../src/data/site.js'

const CACHE_PUBLIC = { 'cache-control': 'public, max-age=60' }
const MAX_BODY_BYTES = 16 * 1024

/** GET /api — a self-describing index of the available endpoints. */
function index(request) {
  const base = new URL(request.url).origin
  return json(
    {
      name: `${site.name} API`,
      version: 1,
      endpoints: [
        { method: 'GET', path: '/api', description: 'This index.' },
        { method: 'GET', path: '/api/health', description: 'Liveness probe.' },
        { method: 'GET', path: '/api/content', description: 'All site content in one payload.' },
        { method: 'GET', path: '/api/sectors', description: 'Sectors of interest, grouped.' },
        { method: 'POST', path: '/api/contact', description: 'Submit the contact form.' },
      ].map((endpoint) => ({ ...endpoint, url: `${base}${endpoint.path}` })),
    },
    { headers: CACHE_PUBLIC },
  )
}

function health() {
  return json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { headers: { 'cache-control': 'no-store' } },
  )
}

function content() {
  return json(
    { site, navigation, criteria, stages, journey, avoid, capitalAdvantages, partnering, sectors },
    { headers: CACHE_PUBLIC },
  )
}

/** GET /api/sectors */
function sectorList() {
  return json({ count: sectors.length, sectors }, { headers: CACHE_PUBLIC })
}

/** POST /api/contact */
async function contact(request, env, ctx) {
  const type = request.headers.get('content-type') ?? ''
  if (!type.includes('application/json')) {
    return apiError(415, 'Send a JSON body with content-type: application/json.')
  }

  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) {
    return apiError(413, 'That message is too large.')
  }

  let body
  try {
    body = await request.json()
  } catch {
    return apiError(400, 'Request body was not valid JSON.')
  }

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return apiError(400, 'Request body must be a JSON object.')
  }

  // A hidden field real people never fill in; bots usually do.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return json({ ok: true, id: crypto.randomUUID() }, { status: 202 })
  }

  const errors = validateContact(body)
  if (Object.keys(errors).length > 0) {
    return apiError(422, 'Some fields need attention.', { fields: errors })
  }

  const submission = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    subject: String(body.subject ?? 'general').trim() || 'general',
    message: String(body.message).trim(),
    country: request.headers.get('cf-ipcountry') ?? null,
  }

  // Optional fan-out. Without CONTACT_WEBHOOK_URL the submission is only logged,
  // which is enough to see it in `wrangler tail` while you wire up a real sink.
  if (env.CONTACT_WEBHOOK_URL) {
    ctx.waitUntil(
      fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(submission),
      }).catch((error) => console.error('contact webhook failed', error)),
    )
  } else {
    console.log('contact submission', JSON.stringify(submission))
  }

  return json(
    {
      ok: true,
      id: submission.id,
      receivedAt: submission.receivedAt,
      message: 'Thanks — your message has been received.',
    },
    { status: 201 },
  )
}

function meta() {
  return json({ limits: LIMITS, subjects: SUBJECTS }, { headers: CACHE_PUBLIC })
}

/** path -> method -> handler. Used to answer 405 with a correct Allow header. */
export const routes = {
  '/api': { GET: index },
  '/api/health': { GET: health },
  '/api/content': { GET: content },
  '/api/sectors': { GET: sectorList },
  '/api/contact': { POST: contact, GET: meta },
}
