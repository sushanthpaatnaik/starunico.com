import { journey } from '../data/site.js'

/** Startup → Unicorn as a sequence of roles, not a promise of outcome. */
export default function Journey() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-neutral-800 dark:bg-neutral-800">
      {journey.map((item, index) => (
        <li key={item.step} className="bg-white p-6 dark:bg-neutral-950">
          <span className="text-xs font-semibold tracking-widest text-brand-700 dark:text-brand-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-lg font-semibold">{item.step}</h3>
          <p className="mt-1.5 text-sm/6 text-neutral-600 dark:text-neutral-400">{item.note}</p>
        </li>
      ))}
    </ol>
  )
}
