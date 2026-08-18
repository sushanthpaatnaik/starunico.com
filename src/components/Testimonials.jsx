import { testimonials } from '../data/site.js'

export default function Testimonials() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((item) => (
        <li
          key={item.name}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <blockquote className="flex-1 text-pretty text-slate-700 dark:text-slate-300">
            “{item.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-slate-800 dark:text-brand-400">
              {item.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </span>
            <span>
              <span className="block text-sm font-semibold">{item.name}</span>
              <span className="block text-sm text-slate-500 dark:text-slate-400">
                {item.role}
              </span>
            </span>
          </figcaption>
        </li>
      ))}
    </ul>
  )
}
