/**
 * The founder submission schema, shared by the React form and the Worker so the
 * instant feedback in the browser and the authoritative check on the server can
 * never disagree.
 */

export const STAGES = [
  { value: 'pre-seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'pre-series-a', label: 'Pre-Series A' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B or later' },
  { value: 'not-raising', label: 'Not currently raising' },
]

export const DOMAINS = [
  { value: 'materials', label: 'Advanced Materials & Manufacturing' },
  { value: 'energy', label: 'Energy & Climate' },
  { value: 'semiconductors', label: 'Semiconductors & Computing' },
  { value: 'robotics', label: 'Robotics & Automation' },
  { value: 'aerospace', label: 'Aerospace & Strategic Technologies' },
  { value: 'life-sciences', label: 'Life Sciences & Biotechnology' },
  { value: 'other', label: 'Other frontier technology' },
]

export const CAPITAL_BANDS = [
  { value: 'undecided', label: 'Not yet decided' },
  { value: 'under-500k', label: 'Under $500k' },
  { value: '500k-2m', label: '$500k – $2m' },
  { value: '2m-5m', label: '$2m – $5m' },
  { value: '5m-15m', label: '$5m – $15m' },
  { value: 'over-15m', label: 'Over $15m' },
]

export const LIMITS = {
  name: 80,
  role: 80,
  email: 254,
  company: 120,
  website: 300,
  location: 120,
  deckUrl: 500,
  short: 60,
  long: 2000,
  minLong: 40,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emptySubmission = {
  name: '',
  role: '',
  email: '',
  company: '',
  website: '',
  location: '',
  domain: '',
  stage: '',
  capital: 'undecided',
  technology: '',
  difficulty: '',
  defensibility: '',
  validation: '',
  deckUrl: '',
}

/** Long-form answers we will not evaluate a company without. */
export const NARRATIVE_FIELDS = ['technology', 'difficulty', 'defensibility']

/**
 * The submission asked one question at a time. Technology comes first because
 * that is the order we actually read in; identity comes last, once the
 * substance is down.
 */
export const STEPS = [
  {
    id: 'technology',
    question: 'What are you building?',
    help: 'The technology itself, in the terms you would use with another engineer.',
    fields: ['technology'],
  },
  {
    id: 'difficulty',
    question: 'What is technically difficult about it?',
    help: 'The problem that took real work to solve.',
    fields: ['difficulty'],
  },
  {
    id: 'defensibility',
    question: 'What makes it hard to replicate?',
    help: 'Intellectual property, know-how, engineering complexity, data — whatever applies.',
    fields: ['defensibility'],
  },
  {
    id: 'validation',
    question: 'What evidence exists today?',
    help: 'Prototypes, test data, pilots, qualification, publications, first customers.',
    fields: ['validation'],
  },
  {
    id: 'stage',
    question: 'Where are you, and what are you seeking?',
    help: 'A range is fine. We are not holding you to it.',
    fields: ['stage', 'capital', 'deckUrl'],
  },
  {
    id: 'company',
    question: 'Tell us about the company.',
    help: 'Enough to place it.',
    fields: ['company', 'website', 'location', 'domain'],
  },
  {
    id: 'you',
    question: 'And who are we speaking with?',
    help: 'We reply to every submission we receive.',
    fields: ['name', 'role', 'email'],
  },
]

/** Errors for one step only, so a step never reports problems further on. */
export function validateStep(stepIndex, values) {
  const step = STEPS[stepIndex]
  if (!step) return {}
  const all = validateSubmission(values)
  const errors = {}
  for (const field of step.fields) {
    if (all[field]) errors[field] = all[field]
  }
  return errors
}

const isUrl = (value) => {
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`)
    return url.hostname.includes('.')
  } catch {
    return false
  }
}

const inList = (list, value) => list.some((option) => option.value === value)

/** Returns { field: message }. Empty means valid. */
export function validateSubmission(values = {}) {
  const errors = {}
  const get = (key) => String(values[key] ?? '').trim()

  const name = get('name')
  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length > LIMITS.name) errors.name = `Keep this under ${LIMITS.name} characters.`

  if (get('role').length > LIMITS.role) errors.role = `Keep this under ${LIMITS.role} characters.`

  const email = get('email')
  if (!email) errors.email = 'An email address is required.'
  else if (email.length > LIMITS.email || !EMAIL.test(email))
    errors.email = 'That does not look like a valid email address.'

  const company = get('company')
  if (!company) errors.company = 'Please give us the company name.'
  else if (company.length > LIMITS.company)
    errors.company = `Keep this under ${LIMITS.company} characters.`

  const website = get('website')
  if (website && !isUrl(website)) errors.website = 'Please give a valid web address.'
  else if (website.length > LIMITS.website) errors.website = 'That address is too long.'

  const location = get('location')
  if (!location) errors.location = 'Where is the company based?'
  else if (location.length > LIMITS.location)
    errors.location = `Keep this under ${LIMITS.location} characters.`

  const domain = get('domain')
  if (!domain) errors.domain = 'Please choose the closest domain.'
  else if (!inList(DOMAINS, domain)) errors.domain = 'Please choose one of the listed domains.'

  const stage = get('stage')
  if (!stage) errors.stage = 'Please choose a stage.'
  else if (!inList(STAGES, stage)) errors.stage = 'Please choose one of the listed stages.'

  const capital = get('capital')
  if (capital && !inList(CAPITAL_BANDS, capital))
    errors.capital = 'Please choose one of the listed ranges.'

  for (const field of NARRATIVE_FIELDS) {
    const value = get(field)
    if (value.length < LIMITS.minLong) {
      errors[field] = `Please write at least ${LIMITS.minLong} characters.`
    } else if (value.length > LIMITS.long) {
      errors[field] = `Please keep this under ${LIMITS.long} characters.`
    }
  }

  if (get('validation').length > LIMITS.long)
    errors.validation = `Please keep this under ${LIMITS.long} characters.`

  const deckUrl = get('deckUrl')
  if (deckUrl && !isUrl(deckUrl))
    errors.deckUrl = 'Please give a link we can open, or leave this blank.'

  return errors
}
