import Icon from './Icon.jsx'
import { faqs } from '../data/site.js'

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 dark:divide-slate-800">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold marker:content-['']">
            {faq.question}
            <Icon
              name="chevron"
              className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-pretty text-slate-600 dark:text-slate-400">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
