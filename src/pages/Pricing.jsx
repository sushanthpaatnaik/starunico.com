import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import PricingTable from '../components/PricingTable.jsx'
import FAQ from '../components/FAQ.jsx'

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, predictable plans"
        description="Placeholder pricing to show the layout. Edit the plans in src/data/site.js."
      />

      <Section>
        <PricingTable />
      </Section>

      <Section
        eyebrow="FAQ"
        title="Before you decide"
        className="bg-slate-50 dark:bg-slate-900/40"
      >
        <FAQ />
      </Section>
    </>
  )
}
