import Icon from './Icon.jsx'
import { criteria } from '../data/site.js'

export default function CriteriaGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
      {criteria.map((item) => (
        <li key={item.title} className="bg-white p-8 dark:bg-slate-950">
          <span className="inline-flex text-brand-700 dark:text-brand-400">
            <Icon name={item.icon} className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm/6 text-pretty text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </li>
      ))}
      <li className="flex items-center bg-slate-50 p-8 dark:bg-slate-900/60">
        <p className="text-sm/6 text-slate-600 dark:text-slate-400">
          We look for all five together. Any one of them absent is a pass, however strong
          the others.
        </p>
      </li>
    </ul>
  )
}
