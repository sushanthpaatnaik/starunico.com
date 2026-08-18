import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import FeatureGrid from '../components/FeatureGrid.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Icon from '../components/Icon.jsx'

const included = [
  'Sticky navigation with a mobile drawer',
  'Hero section with gradient backdrop and stat row',
  'Feature grid, testimonials, pricing and FAQ blocks',
  'Contact form with client-side validation',
  'Reusable Button, Section, Icon and Logo primitives',
  'Class-based dark mode with no flash on load',
  'Skip link, focus rings and reduced-motion support',
  'ESLint configured for React hooks and fast refresh',
]

export default function Features() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Built to be edited"
        description="Each block is a small, self-contained component. Delete what you do not need — nothing else breaks."
      />

      <Section>
        <FeatureGrid />
      </Section>

      <Section
        eyebrow="In the box"
        title="What ships with the template"
        align="left"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {included.map((item) => (
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

      <CallToAction
        title="Take it for a spin"
        description="Run the dev server and start deleting the parts you don't want. That is the fastest way to learn the structure."
      />
    </>
  )
}
