import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import Matrix from '../components/Matrix.jsx'
import Frontiers from '../components/Frontiers.jsx'
import DataBand from '../components/DataBand.jsx'
import Trajectory from '../components/Trajectory.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'
import { capitalAdvantages, partnering, trajectory } from '../data/site.js'

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
          <DataBand items={capitalAdvantages} />
        </div>
      </Section>

      <Section index={3} eyebrow="Frontiers" title="Where we underwrite" align="left">
        <Frontiers />
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
        <ol className="grid border-t border-neutral-200 sm:grid-cols-2">
          {partnering.map((item, index) => (
            <li
              key={item}
              className="flex items-baseline gap-5 border-b border-neutral-200 py-4 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
            >
              <span className="meta shrink-0 text-neutral-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-neutral-700">{item}</span>
            </li>
          ))}
        </ol>
      </Section>

      <CallToAction
        title="Capital for technologies that take time to understand."
        description="If your advantage is genuinely technical and genuinely early, we would like to see it."
      />
    </>
  )
}
