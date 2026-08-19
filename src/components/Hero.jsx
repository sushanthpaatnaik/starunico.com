import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { site, stages } from '../data/site.js'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl">
        <div className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-brand-400 to-brand-300 opacity-15 [clip-path:polygon(74%_44%,100%_62%,97%_27%,85%_0%,80%_2%,72%_32%,60%_62%,52%_68%,47%_58%,45%_35%,27%_76%,0%_65%,18%_100%,27%_77%,76%_98%)]" />
      </div>

      <div className="container-page py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-700 uppercase">
            Proprietary deep-tech investment
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            From Startup to Unicorn
          </h1>

          <p className="mt-8 max-w-3xl text-xl text-pretty text-neutral-600 sm:text-2xl/9">
            {site.positioning}
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Present your technology
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Button to="/philosophy" variant="outline" size="lg" className="w-full sm:w-auto">
              Explore our investment philosophy
            </Button>
          </div>
        </div>

        <div className="mt-24 border-t border-neutral-200 pt-10">
          <p className="text-sm font-semibold tracking-widest text-neutral-600 uppercase">
            We invest early and support the rounds that follow
          </p>
          <ol className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            {stages.map((stage, index) => (
              <li key={stage} className="flex items-center gap-4">
                <span className="text-lg font-semibold tracking-tight sm:text-xl">{stage}</span>
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
    </section>
  )
}
