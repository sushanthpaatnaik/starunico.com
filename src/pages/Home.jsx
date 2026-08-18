import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import FeatureGrid from '../components/FeatureGrid.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FAQ from '../components/FAQ.jsx'
import CallToAction from '../components/CallToAction.jsx'

const steps = [
  {
    title: 'Clone the template',
    body: 'Grab the repository, run npm install, and start the dev server. Nothing else to configure.',
  },
  {
    title: 'Make it yours',
    body: 'Edit the theme tokens and the content file. Copy changes and colour changes never touch component code.',
  },
  {
    title: 'Ship it',
    body: 'One build command produces a static bundle. Push it to any host and you are live.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="features"
        eyebrow="Why this template"
        title="Everything a marketing site needs, nothing it doesn't"
        description="Sensible defaults, honest markup, and components that stay readable once you start editing them."
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <FeatureGrid />
      </Section>

      <Section
        eyebrow="How it works"
        title="Three steps from clone to live"
        description="The whole workflow fits in an afternoon, even if this is your first Tailwind project."
      >
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pl-14">
              <span className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Testimonials"
        title="Teams that shipped with it"
        description="Sample copy — swap it for your own quotes in src/data/site.js."
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <Testimonials />
      </Section>

      <Section eyebrow="FAQ" title="Questions, answered">
        <FAQ />
      </Section>

      <CallToAction />
    </>
  )
}
