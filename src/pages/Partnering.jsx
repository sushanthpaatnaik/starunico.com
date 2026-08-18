import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'
import { partnering } from '../data/site.js'

const founderNotes = [
  {
    title: 'When to talk to us',
    body: 'Early. Often before a company looks fundable to an institutional investor — when the science is sound and the commercial path is still being drawn.',
  },
  {
    title: 'What interests us',
    body: 'Breakthrough science, proprietary engineering, defensible intellectual property and problems that matter at industrial scale.',
  },
  {
    title: 'What we bring',
    body: 'Principal capital, a long horizon, and hands-on support in getting to the point where institutional capital becomes the natural next step.',
  },
]

export default function Partnering() {
  return (
    <>
      <PageHeader
        eyebrow="Partnering"
        title="An investor and owner-partner"
        description="Capital alone does not build a transformational company. We work alongside founders on the things that make one investable."
      />

      <Section align="left">
        <ul className="grid gap-8 lg:grid-cols-3">
          {founderNotes.map((note) => (
            <li key={note.title}>
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="mt-2 text-pretty text-slate-600 dark:text-slate-400">{note.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Where we help"
        title="Practical, and led by the company's needs"
        align="left"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {partnering.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Icon
                  name="check"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400"
                />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
          <p className="self-start text-pretty text-slate-600 dark:text-slate-400">
            We are investors and owners first. This support exists because it makes the
            companies we own stronger and more investable — not because we are running an
            advisory practice alongside.
          </p>
        </div>
      </Section>

      <CallToAction
        title="Introduce your company"
        description="Tell us what you have built, what makes it hard to replicate, and where you are today."
      />
    </>
  )
}
