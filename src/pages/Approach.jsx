import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Journey from '../components/Journey.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'
import { partnering } from '../data/site.js'

const steps = [
  {
    title: 'We read the technology first',
    body: 'Before market size or team, we want to understand what has actually been built and why it is hard to replicate. That usually means engineering detail, not a summary.',
  },
  {
    title: 'We decide slowly, then commit',
    body: 'Diligence on deep technology takes as long as it takes. Once we are convinced, we invest with conviction and concentration rather than optionality.',
  },
  {
    title: 'We work on what makes it investable',
    body: 'From the first cheque, the object is a company that institutional capital can underwrite: a defensible position, a commercial pathway, and governance that survives scrutiny.',
  },
  {
    title: 'We stay through the rounds that follow',
    body: 'We can support successive rounds on the merits of the company. Alignment over years is the point of the structure.',
  },
]

export default function Approach() {
  return (
    <>
      <PageHeader
        eyebrow="Approach"
        title="Investor first, strategic partner second"
        description="How we evaluate an opportunity, how we invest, and what we do once we own part of a company."
      />

      <Section align="left">
        <ol className="grid gap-px overflow-hidden rounded-sm border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-white p-8">
              <span className="text-xs font-semibold tracking-widest text-neutral-400 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h2>
              <p className="mt-3 text-pretty text-neutral-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Startup → Unicorn"
        title="Where we participate"
        align="left"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <Journey />
      </Section>

      <Section eyebrow="Beyond capital" title="What we actually do" align="left">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {partnering.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="self-start text-pretty text-neutral-700">
            This support exists because it makes the companies we own stronger and more
            investable — not because we are running an advisory practice alongside. We are
            owners, and this is what owners do.
          </p>
        </div>
      </Section>

      <CallToAction />
    </>
  )
}
