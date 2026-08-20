import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Frontiers from '../components/Frontiers.jsx'
import Dossier from '../components/Dossier.jsx'
import { portfolio, sectors, stages } from '../data/site.js'

const ALL = 'All'

export default function Portfolio() {
  const { disclosed, note } = portfolio
  const [domain, setDomain] = useState(ALL)
  const [stage, setStage] = useState(ALL)

  // Only offer filters the disclosed set can actually satisfy.
  const domains = useMemo(
    () => [ALL, ...sectors.map((s) => s.name).filter((n) => disclosed.some((c) => c.domain === n))],
    [disclosed],
  )
  const entryStages = useMemo(
    () => [ALL, ...stages.filter((s) => disclosed.some((c) => c.stageAtEntry === s))],
    [disclosed],
  )

  const shown = disclosed.filter(
    (c) => (domain === ALL || c.domain === domain) && (stage === ALL || c.stageAtEntry === stage),
  )

  const filter = (label, value, current, set) => (
    <button
      key={value}
      type="button"
      onClick={() => set(value)}
      aria-pressed={current === value}
      className={`meta border px-3 py-1.5 transition-colors ${
        current === value
          ? 'border-panel bg-panel text-panel-ink'
          : 'border-line-2 text-ink-2 hover:border-line-2 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Held privately, disclosed selectively"
        description="We make few investments, and we hold them for a long time."
      />

      <Section align="left">
        {disclosed.length === 0 ? (
          <div className="max-w-2xl border-l-2 border-accent pl-8">
            <p className="text-2xl tracking-tight text-balance">{note}</p>
            <p className="mt-6 text-ink-2">
              Where a holding is public it appears here as a dossier: the domain it sits in,
              the stage at which we invested, where it is now, the core technical
              breakthrough, and why we backed it.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-6 border-b border-line pb-6">
              {domains.length > 2 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="meta mr-1 text-ink-3">Domain</span>
                  {domains.map((d) => filter(d === ALL ? 'All' : d, d, domain, setDomain))}
                </div>
              )}
              {entryStages.length > 2 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="meta mr-1 text-ink-3">Entry</span>
                  {entryStages.map((s) => filter(s === ALL ? 'All' : s, s, stage, setStage))}
                </div>
              )}
              <p aria-live="polite" className="meta ml-auto text-ink-3">
                {shown.length} of {disclosed.length}
              </p>
            </div>

            {shown.length > 0 ? (
              <ul className="border-t border-line">
                {shown.map((company) => (
                  <Dossier key={company.slug} company={company} />
                ))}
              </ul>
            ) : (
              <p className="py-16 text-ink-2">
                No holdings match that combination.{' '}
                <button
                  type="button"
                  onClick={() => {
                    setDomain(ALL)
                    setStage(ALL)
                  }}
                  className="font-semibold text-accent hover:underline"
                >
                  Clear the filters
                </button>
                .
              </p>
            )}
          </>
        )}
      </Section>

      <Section
        eyebrow="Where we invest"
        title="The domains we underwrite"
        align="left"
        className="border-t border-line"
      >
        <Frontiers />
      </Section>

      <CallToAction />
    </>
  )
}
