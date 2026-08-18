import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import { stats, team } from '../data/site.js'

const values = [
  {
    title: 'Readable over clever',
    body: 'Every component should make sense on first read. No abstractions that need a diagram to explain.',
  },
  {
    title: 'Accessible from the start',
    body: 'Keyboard navigation, colour contrast and motion preferences are requirements, not a later pass.',
  },
  {
    title: 'Content lives in one place',
    body: 'Copy, navigation and pricing sit in a single data file so non-developers can safely change them.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A template with opinions"
        description="Placeholder company copy for the About page — replace it with your own story."
      />

      <Section align="left" title="Our story">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Starunico began as an internal starter kit. We kept rebuilding the same
              navigation, the same hero, the same pricing table — so we wrote them once,
              properly, and stopped.
            </p>
            <p>
              The goal was never to cover every case. It was to make the first day of a new
              project boring: install, edit two files, and get on with the part that is
              actually yours.
            </p>
            <p>
              It is open source under the MIT licence, and it stays deliberately small so it
              is still easy to read after you have changed half of it.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-start">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
              >
                <dd className="text-3xl font-bold tracking-tight">{stat.value}</dd>
                <dt className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section
        eyebrow="Values"
        title="What we optimise for"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">{value.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Team" title="The people behind it">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.name} className="text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-pink-500 text-xl font-bold text-white">
                {member.initials}
              </span>
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{member.role}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title="Want to work with us?"
        description="We are always happy to hear from people building thoughtful things on the web."
        primary={{ label: 'Say hello', to: '/contact' }}
        secondary={{ label: 'See the features', to: '/features' }}
      />
    </>
  )
}
