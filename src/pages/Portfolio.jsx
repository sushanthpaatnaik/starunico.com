import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import { portfolio, sectors } from '../data/site.js'

export default function Portfolio() {
  const { disclosed, note } = portfolio

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Held privately, disclosed selectively"
        description="We make few investments, and we hold them for a long time."
      />

      <Section align="left">
        {disclosed.length > 0 ? (
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
            {disclosed.map((company) => (
              <li key={company.name} className="bg-white p-8">
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <p className="mt-1 text-sm text-brand-700">{company.domain}</p>
                <p className="mt-3 text-sm/6 text-neutral-600">{company.description}</p>
                <p className="mt-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  {company.stageAtEntry} · {company.year}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-2xl border-l-2 border-brand-600 pl-8">
            <p className="text-2xl tracking-tight text-balance">{note}</p>
            <p className="mt-6 text-neutral-700">
              Where a holding is public, it will appear here with the domain it sits in, the
              stage at which we invested, and what the technology does.
            </p>
          </div>
        )}
      </Section>

      <Section
        eyebrow="Where we invest"
        title="The domains we underwrite"
        align="left"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li key={sector.name} className="bg-white p-8">
              <h3 className="font-semibold">{sector.name}</h3>
              <p className="mt-2 text-sm/6 text-neutral-600">{sector.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </>
  )
}
