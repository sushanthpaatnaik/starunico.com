/**
 * Contact-form validation shared by the React form and the Worker API,
 * so the client and the server can never disagree about what is valid.
 */

export const SUBJECTS = [
  { value: 'founder', label: 'Founder — introducing my company' },
  { value: 'coinvestor', label: 'Co-investor or fund' },
  { value: 'adviser', label: 'Adviser or partner' },
  { value: 'general', label: 'General enquiry' },
]

export const LIMITS = {
  name: 80,
  email: 254,
  message: 4000,
  minMessage: 10,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emptyContact = {
  name: '',
  email: '',
  subject: 'founder',
  message: '',
}

/** Returns an object of field name -> error message. Empty means valid. */
export function validateContact(values = {}) {
  const errors = {}
  const name = String(values.name ?? '').trim()
  const email = String(values.email ?? '').trim()
  const subject = String(values.subject ?? '').trim()
  const message = String(values.message ?? '').trim()

  if (!name) {
    errors.name = 'Please tell us your name.'
  } else if (name.length > LIMITS.name) {
    errors.name = `Please keep your name under ${LIMITS.name} characters.`
  }

  if (!email) {
    errors.email = 'An email address is required.'
  } else if (email.length > LIMITS.email || !EMAIL.test(email)) {
    errors.email = 'That does not look like a valid email address.'
  }

  if (subject && !SUBJECTS.some((option) => option.value === subject)) {
    errors.subject = 'Please choose one of the listed subjects.'
  }

  if (message.length < LIMITS.minMessage) {
    errors.message = `Please write at least ${LIMITS.minMessage} characters.`
  } else if (message.length > LIMITS.message) {
    errors.message = `Please keep your message under ${LIMITS.message} characters.`
  }

  return errors
}
