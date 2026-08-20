import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'
import { portfolio } from '../data/site.js'

/** The full editorial case for one holding. */
export default function PortfolioCompany() {
  const { slug } = useParams()
  const company = portfolio.disclosed.find((item) => item.slug === slug)

  if (!company) return <NotFound />

  const facts = [
    ['Domain', company.domain],
    ['Stage at entry', company.stageAtEntry],
    ['Current stage', company.currentStage],
    ['Location', company.location],
    ['First invested', company.year],
  ].filter(([, value]) => value)

  return (
    <>
      <PageHeader eyebrow="Portfolio" title={company.name} description={company.technology} />

      <Section align="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <dl className="self-start border-t border-line">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="meta text-ink-3">{label}</dt>
                <dd className="text-sm font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="space-y-10">
            <div>
              <h2 className="meta text-accent">The breakthrough</h2>
              <p className="mt-4 text-pretty text-lg/8 text-ink-2">{company.breakthrough}</p>
            </div>
            <div>
              <h2 className="meta text-accent">Why we invested</h2>
              <p className="mt-4 text-pretty text-lg/8 text-ink-2">{company.thesis}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Button to="/portfolio" variant="outline">
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            All holdings
          </Button>
        </div>
      </Section>

      <CallToAction />
    </>
  )
}
