import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import StepTrajectory from '../components/StepTrajectory.jsx'
import { Field, Select, TextArea } from '../components/Form.jsx'
import { founders, site } from '../data/site.js'
import {
  CAPITAL_BANDS,
  DOMAINS,
  emptySubmission,
  LIMITS,
  STAGES,
  STEPS,
  validateStep,
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
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(emptySubmission)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [notice, setNotice] = useState('')
  const headingRef = useRef(null)
  const movedRef = useRef(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  // Focus the new question when the step changes, but never on first render.
  useEffect(() => {
    if (!movedRef.current) return
    headingRef.current?.focus()
  }, [step])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((c) => ({ ...c, [name]: value }))
    setErrors((c) => ({ ...c, [name]: undefined }))
  }

  const focusFirstError = (found) => {
    const first = Object.keys(found)[0]
    if (first) document.getElementById(first)?.focus()
  }

  const goTo = (next) => {
    movedRef.current = true
    setStep(next)
    setNotice('')
    setStatus('idle')
  }

  const back = () => step > 0 && goTo(step - 1)

  const next = () => {
    const found = validateStep(step, values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      focusFirstError(found)
      return
    }
    goTo(step + 1)
  }

  const submit = async (event) => {
    event.preventDefault()

    // The last step gates on the whole submission, not just its own fields, so
    // nothing can be skipped by navigating oddly.
    const found = validateSubmission(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstBad = STEPS.findIndex((s) => s.fields.some((f) => found[f]))
      if (firstBad >= 0 && firstBad !== step) {
        goTo(firstBad)
        setErrors(found)
        setStatus('failed')
        setNotice('Something earlier needs attention.')
        return
      }
      setStatus('failed')
      setNotice('Some answers need attention.')
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
        const firstBad = STEPS.findIndex((s) => s.fields.some((f) => data.error.fields[f]))
        if (firstBad >= 0) goTo(firstBad)
        setStatus('failed')
        setNotice('Some answers need attention.')
        return
      }

      if (!response.ok) {
        setStatus('failed')
        setNotice(data?.error?.message ?? 'We could not send that. Please try again.')
        return
      }

      setStatus('sent')
      setNotice(data.message ?? 'Received. Thank you — we read everything that reaches us.')
    } catch {
      setStatus('failed')
      setNotice('Network error — please check your connection and try again.')
    }
  }

  // Enter advances from single-line inputs; textareas keep their newlines.
  const onKeyDown = (event) => {
    if (event.key !== 'Enter' || event.target.tagName === 'TEXTAREA') return
    if (isLast) return
    event.preventDefault()
    next()
  }

  const field = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
  })

  if (status === 'sent') {
    return (
      <>
        <PageHeader eyebrow="For founders" title="Received" description={notice} />
        <Section align="left">
          <div className="max-w-2xl">
            <p className="text-lg text-neutral-700">
              We read every submission. If your work fits what we are looking for, you will
              hear from us directly.
            </p>
            <div className="mt-10">
              <Button to="/thesis" variant="outline">
                Explore our thesis
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Section>
      </>
    )
  }

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
        eyebrow="Submission"
        title="Six questions, one at a time"
        align="left"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <form
          onSubmit={submit}
          onKeyDown={onKeyDown}
          noValidate
          className="max-w-3xl border border-neutral-200 bg-white p-8 sm:p-12"
        >
          <StepTrajectory current={step} />

          {/* Announces each move without stealing focus from the field. */}
          <p aria-live="polite" className="sr-only">
            Step {step + 1} of {STEPS.length}: {current.question}
          </p>

          <div className="mt-12 min-h-[22rem]">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="text-3xl tracking-tight text-balance outline-none sm:text-4xl"
            >
              {current.question}
            </h3>
            <p className="mt-3 text-neutral-600">{current.help}</p>

            <div className="mt-8 grid gap-5">
              {current.id === 'technology' && (
                <TextArea label="Your answer" rows={6} max={LIMITS.long} {...field('technology')} />
              )}

              {current.id === 'difficulty' && (
                <TextArea label="Your answer" rows={6} max={LIMITS.long} {...field('difficulty')} />
              )}

              {current.id === 'defensibility' && (
                <TextArea
                  label="Your answer"
                  rows={6}
                  max={LIMITS.long}
                  {...field('defensibility')}
                />
              )}

              {current.id === 'validation' && (
                <TextArea
                  label="Your answer"
                  optional
                  rows={6}
                  max={LIMITS.long}
                  {...field('validation')}
                />
              )}

              {current.id === 'stage' && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      label="Stage"
                      placeholder="Select a stage"
                      options={STAGES}
                      {...field('stage')}
                    />
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
                </>
              )}

              {current.id === 'company' && (
                <>
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
                    <Field label="Location" placeholder="City, country" {...field('location')} />
                    <Select
                      label="Domain"
                      placeholder="Select the closest"
                      options={DOMAINS}
                      {...field('domain')}
                    />
                  </div>
                </>
              )}

              {current.id === 'you' && (
                <>
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
                </>
              )}
            </div>
          </div>

          {notice && (
            <p
              role="status"
              className={`mt-8 flex items-start gap-3 px-4 py-3 text-sm font-medium ${
                status === 'failed'
                  ? 'bg-red-50 text-red-800 ring-1 ring-red-200'
                  : 'bg-brand-50 text-brand-800 ring-1 ring-brand-200'
              }`}
            >
              <Icon name="close" className="mt-0.5 h-5 w-5 shrink-0" />
              {notice}
            </p>
          )}

          {/* Hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="referrer">Referrer</label>
            <input id="referrer" name="referrer" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-neutral-200 pt-8">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="meta text-neutral-500 transition hover:text-neutral-900 disabled:invisible"
            >
              ← Back
            </button>

            {isLast ? (
              <Button type="submit" size="lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Present your technology'}
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={next} size="lg">
                Continue
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        <p className="mt-8 max-w-3xl text-sm text-neutral-500">
          By sending this you agree to our{' '}
          <a href="/terms" className="text-brand-700 hover:underline">
            terms
          </a>
          , including how unsolicited material is treated. Prefer email? Write to{' '}
          <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
            {site.email}
          </a>
          .
        </p>
      </Section>
    </>
  )
}
