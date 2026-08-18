import Icon from './Icon.jsx'
import { features } from '../data/site.js'

export default function FeatureGrid({ items = features }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((feature) => (
        <li
          key={feature.title}
          className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-700"
        >
          <span className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-slate-800 dark:text-brand-400 dark:group-hover:bg-brand-500 dark:group-hover:text-slate-950">
            <Icon name={feature.icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">
            {feature.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
