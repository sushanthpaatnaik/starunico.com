import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import CriteriaGrid from '../components/CriteriaGrid.jsx'
import Journey from '../components/Journey.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'
import { capitalAdvantages, partnering, sectors } from '../data/site.js'

export default function Home() {
  return (
    <>
      <Hero />

      <Section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl">
          <p className="text-2xl font-medium tracking-tight text-balance sm:text-3xl/tight">
            We invest our own capital. That single fact shapes everything else about how we
            invest.
          </p>
          <p className="mt-6 text-pretty text-slate-600 dark:text-slate-400">
            Without capital raised against a cycle, there is no obligation to deploy on a
            schedule, no pressure toward interim markups, and no structural reason to exit a
            company before its technology has matured. We can enter early, concentrate, and
            hold.
          </p>
          <Link
            to="/capital"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline dark:text-brand-400"
          >
            Why proprietary capital matters
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {capitalAdvantages.slice(0, 3).map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Investment framework"
        title="Technology × Defensibility × Market × Team × Timing"
        description="Five conditions we look for together, in companies built on breakthrough science and proprietary engineering."
        align="left"
      >
        <CriteriaGrid />
      </Section>

      <Section
        eyebrow="Sectors"
        title="Where we look"
        align="left"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li
              key={sector.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="text-lg font-semibold">{sector.name}</h3>
              <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">
                {sector.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Startup → Unicorn"
        title="How we participate"
        description="The name describes a path we travel with a company, not an outcome we promise."
        align="left"
      >
        <Journey />
      </Section>

      <Section
        eyebrow="Beyond capital"
        title="An owner-partner, not a passive cheque"
        align="left"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {partnering.slice(0, 6).map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Icon
                name="check"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400"
              />
              <span className="text-slate-700 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </>
  )
}
