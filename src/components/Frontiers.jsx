import { useState } from 'react'
import { sectors } from '../data/site.js'

/**
 * The domains as an interactive taxonomy rather than six cards: a rail of
 * domains on the left, the active one expanded on the right. Hover, focus and
 * arrow keys all move through it, and it collapses to a plain stacked list on
 * small screens where hover does not exist.
 */
/**
 * `compactOnMobile` reduces the phone view to the domain names alone. The
 * descriptions are worth a screen of scrolling on the pages about where we
 * invest; on the homepage the names carry the point, and the link goes to the
 * page that explains them.
 */
export default function Frontiers({ compactOnMobile = false }) {
  const [active, setActive] = useState(0)
  const current = sectors[active]

  return (
    <div className="border-y border-line">
      {/* Desktop: rail plus detail. */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr]">
        <ul className="border-r border-line">
          {sectors.map((sector, index) => {
            const selected = index === active
            return (
              <li key={sector.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-current={selected}
                  className="group flex w-full items-baseline gap-5 border-b border-line px-2 py-6 text-left transition-colors last:border-b-0"
                >
                  <span
                    className={`meta transition-colors ${selected ? 'text-accent' : 'text-ink-3'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-2xl tracking-tight transition-all ${
                      selected ? 'translate-x-1 text-ink' : 'text-ink-3'
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
            <p className="meta text-ink-3">
              Domain {String(active + 1).padStart(2, '0')} / {String(sectors.length).padStart(2, '0')}
            </p>
            <p className="mt-6 text-2xl text-pretty sm:text-3xl/tight">{current.description}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
            {current.areas.map((area) => (
              <li key={area} className="meta text-ink-3">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Small screens: no hover, so the list is shown rather than the rail. */}
      <ul className="lg:hidden">
        {sectors.map((sector, index) => (
          <li
            key={sector.name}
            className={`border-b border-line last:border-b-0 sm:py-7 ${
              compactOnMobile ? 'py-3.5 sm:py-7' : 'py-5'
            }`}
          >
            <p className={`meta text-ink-3 ${compactOnMobile ? 'hidden sm:block' : ''}`}>
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3
              className={`tracking-tight sm:mt-2 sm:text-xl ${
                compactOnMobile ? 'flex items-baseline gap-4 text-lg' : 'mt-2 text-xl'
              }`}
            >
              {compactOnMobile && (
                <span aria-hidden="true" className="meta text-ink-3 sm:hidden">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              {sector.name}
            </h3>
            <p
              className={`text-sm/6 text-ink-2 sm:mt-2 sm:block ${
                compactOnMobile ? 'hidden' : 'mt-2'
              }`}
            >
              {sector.description}
            </p>
            {/* The tags restate the description; on a phone that is a screen
                of scrolling for no new information. */}
            <ul className="mt-3 hidden flex-wrap gap-x-5 gap-y-1 sm:flex">
              {sector.areas.map((area) => (
                <li key={area} className="meta text-ink-3">
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
