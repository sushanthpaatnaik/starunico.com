import { useRef, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Field, Fieldset, Select, TextArea } from '../components/Form.jsx'
import { founders, site } from '../data/site.js'
import {
  CAPITAL_BANDS,
  DOMAINS,
  emptySubmission,
  LIMITS,
  STAGES,
  validateSubmission,
} from '../lib/submission.js'

const qualifiers = [
  'Your core advantage is technological, not commercial.',
  'The engineering or intellectual property is difficult to replicate.',
  'You are solving a large technical or industrial problem.',
  'You are early, but there is meaningful technical evidence.',
  'You need an investor who understands long development cycles.',
]

export default function Founders() {
  const [values, setValues] = useState(emptySubmission)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [notice, setNotice] = useState('')
  const noticeRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const focusFirstError = (found) => {
    const first = Object.keys(found)[0]
    document.getElementById(first)?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validateSubmission(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('failed')
      setNotice(
        `${Object.keys(found).length} ${Object.keys(found).length === 1 ? 'field needs' : 'fields need'} attention.`,
      )
      focusFirstError(found)
      return
    }

    setStatus('sending')
    setNotice('')

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await response.json().catch(() => ({}))

      if (response.status === 422 && data?.error?.fields) {
        setErrors(data.error.fields)
        setStatus('failed')
        setNotice('Some fields need attention.')
        focusFirstError(data.error.fields)
        return
      }

      if (!response.ok) {
        setStatus('failed')
        setNotice(data?.error?.message ?? 'We could not send that. Please try again.')
        return
      }

      setValues(emptySubmission)
      setStatus('sent')
      setNotice(data.message ?? 'Received. Thank you — we read everything that reaches us.')
      noticeRef.current?.scrollIntoView({ block: 'center' })
    } catch {
      setStatus('failed')
      setNotice('Network error — please check your connection and try again.')
    }
  }

  const field = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
  })

  return (
    <>
      <PageHeader
        eyebrow="For founders"
        title="Show us what others haven't seen yet"
        description={founders.lede}
      />

      <Section align="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl tracking-tight">Present your technology if</h2>
            <ul className="mt-6 space-y-4">
              {qualifiers.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span className="text-neutral-700">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-neutral-200 pl-6 text-sm/6 text-neutral-500">
              We make few investments, and we read every submission. A pass is not a verdict
              on your company — only on our fit with it at this moment.
            </p>
          </div>

          <ul className="grid gap-8 self-start sm:grid-cols-2">
            {founders.points.map((point) => (
              <li key={point.title}>
                <h3 className="font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm/6 text-neutral-600">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        index={1}
        eyebrow="Submission"
        title="Introduce your company"
        align="left"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <form onSubmit={handleSubmit} noValidate className="max-w-4xl">
          {notice && (
            <p
              ref={noticeRef}
              role="status"
              aria-live="polite"
              className={`mb-10 flex items-start gap-3 rounded-xl px-5 py-4 text-sm font-medium ${
                status === 'failed'
                  ? 'bg-red-50 text-red-800 ring-1 ring-red-200'
                  : 'bg-brand-50 text-brand-800 ring-1 ring-brand-200'
              }`}
            >
              <Icon
                name={status === 'failed' ? 'close' : 'check'}
                className="mt-0.5 h-5 w-5 shrink-0"
              />
              {notice}
            </p>
          )}

          <div className="grid gap-10">
            <Fieldset index={1} legend="You" description="Who we would be speaking with.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" autoComplete="name" {...field('name')} />
                <Field
                  label="Role"
                  optional
                  placeholder="Co-founder & CTO"
                  autoComplete="organization-title"
                  {...field('role')}
                />
              </div>
              <Field label="Email" type="email" autoComplete="email" {...field('email')} />
            </Fieldset>

            <Fieldset index={2} legend="Company" description="The basics, so we can place it.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company" autoComplete="organization" {...field('company')} />
                <Field
                  label="Website"
                  optional
                  placeholder="example.com"
                  inputMode="url"
                  {...field('website')}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Location"
                  placeholder="City, country"
                  hint="Where the work actually happens."
                  {...field('location')}
                />
                <Select
                  label="Domain"
                  placeholder="Select the closest"
                  options={DOMAINS}
                  {...field('domain')}
                />
              </div>
            </Fieldset>

            <Fieldset
              index={3}
              legend="Technology"
              description="The part we care about most. Detail is welcome — we would rather understand how it works than be walked around it."
            >
              <TextArea
                label="What have you built?"
                rows={5}
                max={LIMITS.long}
                hint="The technology itself, in the terms you would use with another engineer."
                {...field('technology')}
              />
              <TextArea
                label="What is technically difficult about it?"
                rows={4}
                max={LIMITS.long}
                hint="The problem that took real work to solve."
                {...field('difficulty')}
              />
              <TextArea
                label="What makes it hard to replicate?"
                rows={4}
                max={LIMITS.long}
                hint="Intellectual property, know-how, engineering complexity, data — whatever applies."
                {...field('defensibility')}
              />
              <TextArea
                label="What evidence exists today?"
                optional
                rows={4}
                max={LIMITS.long}
                hint="Prototypes, test data, pilots, qualification, publications, first customers."
                {...field('validation')}
              />
            </Fieldset>

            <Fieldset index={4} legend="Raise" description="Where you are, and what you are seeking.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Select label="Stage" placeholder="Select a stage" options={STAGES} {...field('stage')} />
                <Select
                  label="Capital sought"
                  optional
                  options={CAPITAL_BANDS}
                  {...field('capital')}
                />
              </div>
              <Field
                label="Pitch deck or data room link"
                optional
                placeholder="https://…"
                inputMode="url"
                hint="A link we can open. Please do not send anything confidential before we have an agreement in place."
                {...field('deckUrl')}
              />
            </Fieldset>
          </div>

          {/* Hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="referrer">Referrer</label>
            <input id="referrer" name="referrer" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-neutral-500">
              By sending this you agree to our{' '}
              <a href="/terms" className="text-brand-700 hover:underline">
                terms
              </a>
              , including how unsolicited material is treated.
            </p>
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Present your technology'}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <p className="mt-10 max-w-4xl text-sm text-neutral-500">
          Prefer email? Write to{' '}
          <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
            {site.email}
          </a>
          .
        </p>
      </Section>
    </>
  )
}
