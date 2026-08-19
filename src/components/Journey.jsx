import { journey } from '../data/site.js'

/**
 * Startup → Unicorn, stated as stages of company formation. Vertical and
 * editorial: the rule down the left carries the eye without decoration.
 */
export default function Journey() {
  return (
    <ol className="relative border-l border-neutral-200">
      {journey.map((item, index) => (
        <li key={item.step} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
          <span
            aria-hidden="true"
            className="absolute -left-px top-2 h-px w-5 bg-neutral-300 sm:w-8"
          />
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-xs font-semibold tracking-widest text-neutral-400 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight">{item.step}</h3>
            <span className="text-sm text-neutral-500">{item.label}</span>
          </div>
          <p className="mt-3 max-w-2xl text-pretty text-neutral-700">{item.note}</p>
        </li>
      ))}
    </ol>
  )
}
