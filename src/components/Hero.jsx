import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { site, stats } from '../data/site.js'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl"
      >
        <div className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-brand-400 to-pink-400 opacity-20 dark:opacity-25 [clip-path:polygon(74%_44%,100%_62%,97%_27%,85%_0%,80%_2%,72%_32%,60%_62%,52%_68%,47%_58%,45%_35%,27%_76%,0%_65%,18%_100%,27%_77%,76%_98%)]" />
      </div>

      <div className="container-page py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-sm text-slate-600 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
          >
            <span className="font-semibold text-brand-600 dark:text-brand-400">New</span>
            Tailwind CSS v4 theme tokens
            <Icon name="arrow" className="h-4 w-4" />
          </a>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-slate-600 sm:text-xl dark:text-slate-400">
            {site.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Get started free
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Button to="/features" variant="outline" size="lg" className="w-full sm:w-auto">
              See what's inside
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            No credit card required · MIT licensed · Deploy anywhere
          </p>
        </div>

        <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 border-t border-slate-200 pt-10 lg:grid-cols-4 dark:border-slate-800">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="order-2 mt-1 text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </dt>
              <dd className="order-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
