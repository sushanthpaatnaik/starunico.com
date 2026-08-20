import { useState } from 'react'
import Icon from './Icon.jsx'
import { criteria } from '../data/site.js'

/**
 * Technology × Defensibility × Market × Team × Timing.
 * Multiplicative: selecting a dimension shows what a zero there costs, which is
 * the actual argument — one absent condition ends the conversation.
 */
/**
 * `compactOnMobile` swaps the interactive matrix for a ruled list of the five
 * dimensions on small screens. The matrix is driven by hover and a detail panel,
 * neither of which earns a screen of phone scrolling on the homepage; the full
 * version still runs on the thesis page, where the detail is the point.
 */
export default function Matrix({ compactOnMobile = false }) {
  const [active, setActive] = useState(0)
  const current = criteria[active]

  return (
    <>
      {compactOnMobile && (
        <ol className="border-t border-line lg:hidden">
          {criteria.map((item, index) => (
            <li
              key={item.title}
              className="flex items-baseline gap-5 border-b border-line py-4"
            >
              <span className="meta text-ink-3">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-xl tracking-tight">{item.title}</span>
            </li>
          ))}
          <li className="py-5 text-sm/6 text-ink-2">
            We look for all five together. Any one of them absent is a pass, however strong
            the others.
          </li>
        </ol>
      )}

    <div
      className={`${compactOnMobile ? 'hidden lg:grid' : 'grid'} gap-px overflow-hidden border border-line bg-line lg:grid-cols-[auto_1fr]`}
    >
      <ul className="grid bg-surface lg:w-72">
        {criteria.map((item, index) => {
          const selected = index === active
          return (
            <li key={item.title}>
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-current={selected}
                className={`flex w-full items-center gap-4 border-b border-line px-6 py-5 text-left transition-colors last:border-b-0 ${
                  selected ? 'bg-panel text-panel-ink' : 'hover:bg-canvas-2'
                }`}
              >
                <span className={`meta ${selected ? 'text-panel-accent' : 'text-ink-3'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold tracking-tight">{item.title}</span>
                <Icon
                  name="arrow"
                  className={`ml-auto h-4 w-4 transition-opacity ${selected ? 'opacity-100' : 'opacity-0'}`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col justify-between gap-8 bg-surface p-8 sm:p-12">
        <div>
          <p className="meta text-ink-3">
            Dimension {String(active + 1).padStart(2, '0')} / {criteria.length}
          </p>
          <p className="mt-4 text-2xl text-pretty sm:text-3xl/tight">{current.description}</p>
        </div>
        <p className="border-t border-line pt-6 text-sm text-ink-2">
          Absent {current.title.toLowerCase()}, we pass — however strong the other four.
        </p>
      </div>
    </div>
    </>
  )
}
