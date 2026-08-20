import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/**
 * A holding presented as an investment dossier rather than a logo tile: the
 * technical facts are visible at rest, and the breakthrough surfaces on hover or
 * focus. Keyboard users get the same reveal, since it is driven by :focus-within
 * rather than hover alone.
 */
export default function Dossier({ company }) {
  return (
    <li className="group relative border-b border-line transition-colors focus-within:bg-canvas-2 hover:bg-canvas-2">
      <article className="grid gap-x-10 gap-y-4 px-2 py-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="meta text-ink-3">
            {company.domain}
            {company.year ? ` · ${company.year}` : ''}
          </p>
          <h3 className="mt-3 text-2xl tracking-tight">
            <Link to={`/portfolio/${company.slug}`} className="after:absolute after:inset-0">
              {company.name}
            </Link>
          </h3>
          <p className="mt-2 text-pretty text-ink-2">{company.technology}</p>
        </div>

        <div className="flex flex-col justify-between gap-6">
          {/* Held at zero height until the row is hovered or focused. */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr] motion-reduce:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="meta text-ink-3">Core breakthrough</p>
              <p className="mt-2 text-pretty text-ink-2">{company.breakthrough}</p>
            </div>
          </div>

          <dl className="flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-line pt-4">
            <div>
              <dt className="meta text-ink-3">Entry</dt>
              <dd className="mt-1 text-sm font-semibold">{company.stageAtEntry}</dd>
            </div>
            <div>
              <dt className="meta text-ink-3">Current</dt>
              <dd className="mt-1 text-sm font-semibold">{company.currentStage}</dd>
            </div>
            <div>
              <dt className="meta text-ink-3">Location</dt>
              <dd className="mt-1 text-sm font-semibold">{company.location}</dd>
            </div>
            <span className="ml-auto flex items-center gap-2 text-sm font-semibold text-accent opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:opacity-100">
              Read the case
              <Icon name="arrow" className="h-4 w-4" />
            </span>
          </dl>
        </div>
      </article>
    </li>
  )
}
