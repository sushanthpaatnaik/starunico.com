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
          <p className="text-pretty text-ink-2">
            Five conditions, considered together. The framework is multiplicative rather
            than a scorecard — a company strong on four and absent on the fifth is a pass.
          </p>
          <Matrix compactOnMobile />
        </div>
      </Section>

      <Section
        index={2}
        eyebrow="Capital"
        title="Our capital. Our conviction. Our horizon."
        align="left"
        className="border-t border-line bg-canvas-2"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-pretty text-ink-2">
              We invest principal capital. Without money raised against a cycle there is no
              obligation to deploy on a schedule, no pressure toward interim markups, and no
              structural reason to exit a company before its technology has matured.
            </p>
            <Link
              to="/capital"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
            >
              Why proprietary capital matters
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <DataBand items={capitalAdvantages} mobileLimit={3} />
            <Link
              to="/capital"
              className="group/link mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline sm:hidden"
            >
              All six, and why they follow
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section index={3} eyebrow="Frontiers" title="Where we underwrite" align="left">
        <Frontiers compactOnMobile />
        <Link
          to="/thesis"
          className="group/link mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:underline sm:hidden"
        >
          What we look for in each
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </Section>

      <Section
        index={4}
        eyebrow="The journey"
        title="Startup → Unicorn, stated honestly"
        description="The line describes where we participate in a company's formation. Most companies will not reach the end of it."
        align="left"
        className="border-t border-line bg-canvas-2"
      >
        <Trajectory points={trajectory} />
      </Section>

      <Section
        index={5}
        eyebrow="Beyond capital"
        title="Investor first, partner second"
        align="left"
        className="hidden sm:block"
      >
        <ol className="grid border-t border-line sm:grid-cols-2">
          {partnering.map((item, index) => (
            <li
              key={item}
              className={`items-baseline gap-5 border-b border-line py-4 sm:flex sm:odd:border-r sm:odd:pr-8 sm:even:pl-8 ${
                index >= 6 ? 'hidden' : 'flex'
              }`}
            >
              <span className="meta shrink-0 text-ink-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-ink-2">{item}</span>
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
