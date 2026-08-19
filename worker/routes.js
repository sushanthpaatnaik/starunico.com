import { apiError, json } from './http.js'
import {
  CAPITAL_BANDS,
  DOMAINS,
  emptySubmission,
  LIMITS,
  STAGES,
  validateSubmission,
} from '../src/lib/submission.js'
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
const MAX_BODY_BYTES = 64 * 1024

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
        {
          method: 'GET',
          path: '/api/submissions',
          description: 'Field vocabulary and limits for the submission form.',
        },
        {
          method: 'POST',
          path: '/api/submissions',
          description: 'Submit a founder introduction.',
        },
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

/** POST /api/submissions — the founder submission form. */
async function submit(request, env, ctx) {
  const type = request.headers.get('content-type') ?? ''
  if (!type.includes('application/json')) {
    return apiError(415, 'Send a JSON body with content-type: application/json.')
  }

  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) {
    return apiError(413, 'That submission is too large.')
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
  if (typeof body.referrer === 'string' && body.referrer.trim() !== '') {
    return json({ ok: true, id: crypto.randomUUID() }, { status: 202 })
  }

  const errors = validateSubmission(body)
  if (Object.keys(errors).length > 0) {
    return apiError(422, 'Some fields need attention.', { fields: errors })
  }

  // Copy only the fields we know about, so nothing extra is stored or forwarded.
  const submission = { id: crypto.randomUUID(), receivedAt: new Date().toISOString() }
  for (const key of Object.keys(emptySubmission)) {
    submission[key] = String(body[key] ?? '').trim()
  }
  submission.country = request.headers.get('cf-ipcountry') ?? null

  // Optional fan-out. Without SUBMISSION_WEBHOOK_URL the submission is only
  // logged, which is enough to see it in `wrangler tail` while a sink is wired.
  const webhook = env.SUBMISSION_WEBHOOK_URL ?? env.CONTACT_WEBHOOK_URL
  if (webhook) {
    ctx.waitUntil(
      fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(submission),
      }).catch((error) => console.error('submission webhook failed', error)),
    )
  } else {
    console.log('founder submission', JSON.stringify(submission))
  }

  return json(
    {
      ok: true,
      id: submission.id,
      receivedAt: submission.receivedAt,
      message: 'Received. Thank you — we read everything that reaches us.',
    },
    { status: 201 },
  )
}

/** GET /api/submissions — the field vocabulary, so the form is self-describing. */
function schema() {
  return json(
    { limits: LIMITS, domains: DOMAINS, stages: STAGES, capitalBands: CAPITAL_BANDS },
    { headers: CACHE_PUBLIC },
  )
}

/** path -> method -> handler. Used to answer 405 with a correct Allow header. */
export const routes = {
  '/api': { GET: index },
  '/api/health': { GET: health },
  '/api/content': { GET: content },
  '/api/sectors': { GET: sectorList },
  '/api/submissions': { POST: submit, GET: schema },
  // Kept so the previously published endpoint keeps working.
  '/api/contact': { POST: submit, GET: schema },
}
