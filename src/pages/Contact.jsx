import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { site } from '../data/site.js'

const empty = { name: '', email: '', subject: 'general', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim()) {
    errors.email = 'An email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'That does not look like a valid email address.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please write at least 10 characters.'
  }
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Demo only — wire this up to your own endpoint or form service.
    setSent(true)
    setValues(empty)
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="This form is a front-end demo — connect it to your own backend or a service like Formspree."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="text-left">
            <h2 className="text-2xl font-bold tracking-tight">We usually reply within a day</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Questions about the template, licensing, or custom work — all welcome.
            </p>

            <dl className="mt-8 space-y-6 text-sm">
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Elsewhere</dt>
                <dd className="mt-1 flex gap-4">
                  {site.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      {item.name}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/60"
          >
            {sent && (
              <p
                role="status"
                className="mb-6 flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800 dark:bg-slate-800 dark:text-brand-300"
              >
                <Icon name="check" className="h-5 w-5" />
                Thanks — your message has been queued.
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
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="general">General enquiry</option>
                <option value="support">Support</option>
                <option value="sales">Sales</option>
                <option value="custom">Custom work</option>
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
                className={`mt-2 w-full rounded-lg border px-3 py-2.5 text-sm dark:bg-slate-900 ${
                  errors.message
                    ? 'border-red-500'
                    : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" className="mt-8 w-full sm:w-auto">
              Send message
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
        className={`mt-2 w-full rounded-lg border px-3 py-2.5 text-sm dark:bg-slate-900 ${
          error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
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
