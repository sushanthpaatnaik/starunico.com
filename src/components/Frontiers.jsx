import { useState } from 'react'
import { sectors } from '../data/site.js'

/**
 * The domains as an interactive taxonomy rather than six cards: a rail of
 * domains on the left, the active one expanded on the right. Hover, focus and
 * arrow keys all move through it, and it collapses to a plain stacked list on
 * small screens where hover does not exist.
 */
export default function Frontiers() {
  const [active, setActive] = useState(0)
  const current = sectors[active]

  return (
    <div className="border-y border-neutral-200">
      {/* Desktop: rail plus detail. */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr]">
        <ul className="border-r border-neutral-200">
          {sectors.map((sector, index) => {
            const selected = index === active
            return (
              <li key={sector.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-current={selected}
                  className="group flex w-full items-baseline gap-5 border-b border-neutral-200 px-2 py-6 text-left transition-colors last:border-b-0"
                >
                  <span
                    className={`meta transition-colors ${selected ? 'text-brand-600' : 'text-neutral-400'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-2xl tracking-tight transition-all ${
                      selected ? 'translate-x-1 text-neutral-950' : 'text-neutral-400'
                    }`}
                  >
                    {sector.name}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col justify-between gap-10 px-10 py-10">
          <div>
            <p className="meta text-neutral-400">
              Domain {String(active + 1).padStart(2, '0')} / {String(sectors.length).padStart(2, '0')}
            </p>
            <p className="mt-6 text-2xl text-pretty sm:text-3xl/tight">{current.description}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-200 pt-6">
            {current.areas.map((area) => (
              <li key={area} className="meta text-neutral-500">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Small screens: no hover, so everything is shown. */}
      <ul className="lg:hidden">
        {sectors.map((sector, index) => (
          <li key={sector.name} className="border-b border-neutral-200 py-5 last:border-b-0 sm:py-7">
            <p className="meta text-neutral-400">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 text-xl tracking-tight">{sector.name}</h3>
            <p className="mt-2 text-sm/6 text-neutral-600">{sector.description}</p>
            {/* The tags restate the description; on a phone that is a screen
                of scrolling for no new information. */}
            <ul className="mt-3 hidden flex-wrap gap-x-5 gap-y-1 sm:flex">
              {sector.areas.map((area) => (
                <li key={area} className="meta text-neutral-500">
                  {area}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
