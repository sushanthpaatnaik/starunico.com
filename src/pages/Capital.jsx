import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import { capitalAdvantages, site } from '../data/site.js'

export default function Capital() {
  return (
    <>
      <PageHeader
        eyebrow="Proprietary capital"
        title="Our own capital, and therefore our own time horizon"
        description={site.descriptor}
      />

      <Section align="left">
        <div className="mx-auto max-w-3xl space-y-6 text-pretty text-lg/8 text-slate-600 dark:text-slate-400">
          <p>
            Starunico Capital invests principal capital. We do not raise from external
            investors and deploy on their behalf, which means the structure we operate
            inside is unusually simple: we commit our own money, and we answer for it over
            the long term.
          </p>
          <p>
            Deep technology rarely matures on a convenient schedule. Materials need
            qualification. Hardware needs iteration. Science needs to survive contact with
            an industrial customer. Capital that must be placed within a defined period, and
            returned within another, is not always well matched to that reality.
          </p>
          <p>
            Ours is. That lets us think like long-term owners: enter early, concentrate on a
            small number of positions, support successive rounds where it is warranted, and
            hold as enterprise value compounds.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="What it enables"
        title="Structure shaping strategy"
        align="left"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
          {capitalAdvantages.map((item) => (
            <li key={item.title} className="bg-white p-8 dark:bg-slate-950">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title="A different kind of first investor"
        description="If you are early, technical, and looking for a partner who can wait, we would like to hear from you."
      />
    </>
  )
}
