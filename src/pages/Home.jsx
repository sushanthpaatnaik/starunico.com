import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import Matrix from '../components/Matrix.jsx'
import Trajectory from '../components/Trajectory.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'
import { capitalAdvantages, partnering, sectors, trajectory } from '../data/site.js'

export default function Home() {
  return (
    <>
      <Hero />

      <Section index={1} eyebrow="Conviction" title="We back technology, not trends." align="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <p className="text-pretty text-neutral-700">
            Five conditions, considered together. The framework is multiplicative rather
            than a scorecard — a company strong on four and absent on the fifth is a pass.
          </p>
          <Matrix />
        </div>
      </Section>

      <Section
        index={2}
        eyebrow="Capital"
        title="Our capital. Our conviction. Our horizon."
        align="left"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-pretty text-neutral-700">
              We invest principal capital. Without money raised against a cycle there is no
              obligation to deploy on a schedule, no pressure toward interim markups, and no
              structural reason to exit a company before its technology has matured.
            </p>
            <Link
              to="/capital"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"
            >
              Why proprietary capital matters
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
            {capitalAdvantages.map((item, index) => (
              <li key={item.title} className="bg-white p-6">
                <span className="text-xs font-semibold tracking-widest text-neutral-400 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm/6 text-neutral-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section index={3} eyebrow="Frontiers" title="Where we underwrite" align="left">
        <ul className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <li key={sector.name} className="group bg-white p-8 transition-colors hover:bg-neutral-950">
              <span className="text-xs font-semibold tracking-widest text-neutral-400 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-white">
                {sector.name}
              </h3>
              <p className="mt-2 text-sm/6 text-neutral-600 transition-colors group-hover:text-neutral-300">
                {sector.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {sector.areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 transition-colors group-hover:border-neutral-700 group-hover:text-neutral-400"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        index={4}
        eyebrow="The journey"
        title="Startup → Unicorn, stated honestly"
        description="The line describes where we participate in a company's formation. Most companies will not reach the end of it."
        align="left"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <Trajectory points={trajectory} />
      </Section>

      <Section index={5} eyebrow="Beyond capital" title="Investor first, partner second" align="left">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnering.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <span className="text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title="Capital for technologies that take time to understand."
        description="If your advantage is genuinely technical and genuinely early, we would like to see it."
      />
    </>
  )
}
