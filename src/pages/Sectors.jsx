import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import { sectors } from '../data/site.js'

export default function Sectors() {
  return (
    <>
      <PageHeader
        eyebrow="Sectors"
        title="Built for deep technology"
        description="Six areas where breakthrough science tends to meet industrial scale. Our interests can extend beyond them where the technology warrants it."
      />

      <Section align="left">
        <ul className="grid gap-6 lg:grid-cols-2">
          {sectors.map((sector) => (
            <li
              key={sector.name}
              className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <h2 className="text-xl font-semibold">{sector.name}</h2>
              <p className="mt-3 text-pretty text-slate-600 dark:text-slate-400">
                {sector.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {sector.areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title="Working in one of these areas?"
        description="We are interested in the technology first. Stage, revenue and polish matter less to us than what you have built."
      />
    </>
  )
}
