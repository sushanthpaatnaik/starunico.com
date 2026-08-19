import Button from './Button.jsx'
import Icon from './Icon.jsx'
import Lattice from './Lattice.jsx'
import { site, stages } from '../data/site.js'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-neutral-200">
      {/* Masked so the structure never competes with the headline. */}
      <Lattice className="lattice-mask pointer-events-none absolute -top-16 -right-8 -z-10 hidden w-[54%] lg:block" />

      <div className="container-page py-28 sm:py-36">
        <div className="max-w-4xl">
          <p className="meta flex flex-wrap items-baseline gap-x-3">
            <span className="text-neutral-900">{site.name}</span>
            <span aria-hidden="true" className="text-neutral-300">
              /
            </span>
            <span className="text-brand-700">Proprietary deep-tech investing</span>
          </p>

          <h1 className="mt-10 text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.95] tracking-tight text-balance">
            We invest before the future becomes obvious.
          </h1>

          <p className="mt-10 max-w-2xl text-xl text-pretty text-neutral-700 sm:text-2xl/9">
            {site.positioning}
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button to="/thesis" size="lg" className="w-full sm:w-auto">
              Explore our thesis
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Button to="/founders" variant="outline" size="lg" className="w-full sm:w-auto">
              Present your technology
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="container-page py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10">
            <p className="meta shrink-0 text-neutral-600">
              We invest early and support the rounds that follow
            </p>
            <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {stages.map((stage, index) => (
                <li key={stage} className="flex items-center gap-4">
                  <span className="font-semibold tracking-tight">{stage}</span>
                  {index < stages.length - 1 && (
                    <span aria-hidden="true" className="text-neutral-400">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
