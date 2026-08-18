import { journey } from '../data/site.js'

/** Startup → Unicorn as a sequence of roles, not a promise of outcome. */
export default function Journey() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-slate-800">
      {journey.map((item, index) => (
        <li key={item.step} className="bg-white p-6 dark:bg-slate-950">
          <span className="text-xs font-semibold tracking-widest text-brand-600 dark:text-brand-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-lg font-semibold">{item.step}</h3>
          <p className="mt-1.5 text-sm/6 text-slate-600 dark:text-slate-400">{item.note}</p>
        </li>
      ))}
    </ol>
  )
}
