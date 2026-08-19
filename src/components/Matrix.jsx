import { useState } from 'react'
import Icon from './Icon.jsx'
import { criteria } from '../data/site.js'

/**
 * Technology × Defensibility × Market × Team × Timing.
 * Multiplicative: selecting a dimension shows what a zero there costs, which is
 * the actual argument — one absent condition ends the conversation.
 */
export default function Matrix() {
  const [active, setActive] = useState(0)
  const current = criteria[active]

  return (
    <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 lg:grid-cols-[auto_1fr]">
      <ul className="grid bg-white lg:w-72">
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
                className={`flex w-full items-center gap-4 border-b border-neutral-200 px-6 py-5 text-left transition-colors last:border-b-0 ${
                  selected ? 'bg-neutral-950 text-white' : 'hover:bg-neutral-50'
                }`}
              >
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    selected ? 'text-brand-400' : 'text-neutral-400'
                  }`}
                >
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

      <div className="flex flex-col justify-between gap-8 bg-white p-8 sm:p-12">
        <div>
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Dimension {String(active + 1).padStart(2, '0')} / {criteria.length}
          </p>
          <p className="mt-4 text-2xl text-pretty sm:text-3xl/tight">{current.description}</p>
        </div>
        <p className="border-t border-neutral-200 pt-6 text-sm text-neutral-600">
          Absent {current.title.toLowerCase()}, we pass — however strong the other four.
        </p>
      </div>
    </div>
  )
}
