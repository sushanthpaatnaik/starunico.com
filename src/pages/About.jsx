import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Journey from '../components/Journey.jsx'
import { about, site } from '../data/site.js'

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="Quiet capital, deep conviction" description={site.descriptor} />

      <Section align="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-3xl tracking-tight text-balance">Why the firm exists</h2>
          <div className="space-y-6 text-pretty text-lg/8 text-ink-2">
            <p>{about.origin}</p>
            <p>{about.why}</p>
          </div>
        </div>
      </Section>

      <Section align="left" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-3xl tracking-tight text-balance">{about.name}</h2>
          <div className="space-y-6 text-pretty text-lg/8 text-ink-2">
            <p>
              It describes the distance a company travels, and the fact that we intend to be
              there for the whole of it rather than a stage of it. Most companies will not
              reach the end of that path. The name is a statement of where we look and how
              long we are prepared to stay, not a forecast.
            </p>
            <p>{about.ownership}</p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Startup → Unicorn"
        title="The stages the name describes"
        align="left"
        className="bg-canvas-2"
      >
        <Journey />
      </Section>

      <CallToAction />
    </>
  )
}
