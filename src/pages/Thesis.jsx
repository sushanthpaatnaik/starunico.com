import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Matrix from '../components/Matrix.jsx'
import Frontiers from '../components/Frontiers.jsx'
import Journey from '../components/Journey.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'
import { avoid, stages } from '../data/site.js'

export default function Thesis() {
  return (
    <>
      <PageHeader
        eyebrow="Investment philosophy"
        title="Early conviction in technology that is hard to replicate"
        description="We back companies built on breakthrough science, proprietary engineering and durable intellectual property."
      />

      <Section
        eyebrow="Framework"
        title="Technology × Defensibility × Market × Team × Timing"
        align="left"
      >
        <Matrix />
      </Section>

      <Section align="left" title="Stage" className="bg-neutral-50">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-pretty text-neutral-600">
            <p>
              We aim to enter at an early stage, when the technology and the founding team
              are strong but the full commercial value of the work is not yet recognised by
              the broader market.
            </p>
            <p>
              From that point we work alongside founders to strengthen the business and
              position it for subsequent stages of capital. As the company advances
              technologically, commercially and financially, we seek to participate in the
              value created along the way.
            </p>
          </div>
          <ol className="grid gap-3 self-start sm:grid-cols-2">
            {stages.map((stage) => (
              <li
                key={stage}
                className="rounded-xl border border-neutral-200 bg-white px-5 py-4 font-semibold"
              >
                {stage}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Frontiers" title="Where we underwrite" align="left">
        <Frontiers />
      </Section>

      <Section eyebrow="Selectivity" title="What we do not invest in" align="left">
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-3">
            {avoid.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Icon name="close" className="mt-1 h-4 w-4 shrink-0 text-neutral-400" />
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="self-start text-pretty text-neutral-600">
            We would rather back a small number of technologies capable of changing an
            industry than invest broadly across conventional companies. Being explicit about
            what falls outside our remit is part of that discipline.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Startup → Unicorn"
        title="How we participate"
        align="left"
        className="bg-neutral-50"
      >
        <Journey />
      </Section>

      <CallToAction />
    </>
  )
}
