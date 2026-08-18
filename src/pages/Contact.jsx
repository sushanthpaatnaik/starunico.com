import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { site } from '../data/site.js'
import { emptyContact, SUBJECTS, validateContact } from '../lib/contact.js'

export default function Contact() {
  const [values, setValues] = useState(emptyContact)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [notice, setNotice] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validated here first for instant feedback; the Worker re-runs the exact
    // same rules, because a client-side check is never a guarantee.
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    setNotice('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await response.json().catch(() => ({}))

      if (response.status === 422 && data?.error?.fields) {
        setErrors(data.error.fields)
        setStatus('failed')
        setNotice('Some fields need attention.')
        return
      }

      if (!response.ok) {
        setStatus('failed')
        setNotice(data?.error?.message ?? 'We could not send that. Please try again.')
        return
      }

      setValues(emptyContact)
      setStatus('sent')
      setNotice(data.message ?? 'Thanks — your message has been received.')
    } catch {
      setStatus('failed')
      setNotice('Network error — please check your connection and try again.')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Tell us what you have built, what makes it hard to replicate, and where you are today."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="text-left">
            <h2 className="text-2xl font-semibold tracking-tight">Introduce your company</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              We read everything that reaches us. Founders, co-investors and advisers are
              all welcome to get in touch.
            </p>

            <dl className="mt-8 space-y-6 text-sm">
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-brand-700 hover:underline dark:text-brand-400"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">What helps</dt>
                <dd className="mt-1 text-neutral-600 dark:text-neutral-400">
                  A short description of the technology, its defensibility, and the stage
                  you are at. Decks are welcome but not required.
                </dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            {notice && (
              <p
                role="status"
                className={`mb-6 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
                  status === 'failed'
                    ? 'bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                    : 'bg-brand-50 text-brand-800 dark:bg-neutral-800 dark:text-brand-300'
                }`}
              >
                <Icon name={status === 'failed' ? 'close' : 'check'} className="h-5 w-5 shrink-0" />
                {notice}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={values.name}
                error={errors.name}
                onChange={handleChange}
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              >
                {SUBJECTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`mt-2 w-full rounded-lg border px-3 py-2.5 text-sm dark:bg-neutral-900 ${
                  errors.message ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot: hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <Button type="submit" disabled={status === 'sending'} className="mt-8 w-full sm:w-auto">
              {status === 'sending' ? 'Sending…' : 'Send'}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Section>
    </>
  )
}

function Field({ label, name, error, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 w-full rounded-lg border px-3 py-2.5 text-sm dark:bg-neutral-900 ${
          error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
        }`}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
