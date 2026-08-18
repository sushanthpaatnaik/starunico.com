import { useState } from 'react'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { pricing } from '../data/site.js'

export default function PricingTable() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <span
          className={`text-sm font-medium ${annual ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual((value) => !value)}
          className={`relative h-6 w-11 rounded-full transition ${
            annual ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <span className="sr-only">Bill annually</span>
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition ${
              annual ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}
        >
          Annual
          <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-slate-800 dark:text-brand-400">
            Save 20%
          </span>
        </span>
      </div>

      <ul className="mt-12 grid items-start gap-8 lg:grid-cols-3">
        {pricing.map((plan) => {
          const price = annual ? Math.round(plan.price * 0.8) : plan.price

          return (
            <li
              key={plan.name}
              className={`rounded-3xl border p-8 ${
                plan.featured
                  ? 'border-brand-600 bg-white shadow-xl ring-1 ring-brand-600 lg:-mt-4 lg:pb-12 dark:border-brand-500 dark:bg-slate-900 dark:ring-brand-500'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {plan.description}
              </p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">${price}</span>
                <span className="text-sm text-slate-500">
                  {plan.price === 0 ? plan.cadence : annual ? 'per month, billed yearly' : plan.cadence}
                </span>
              </p>

              <Button
                to="/contact"
                variant={plan.featured ? 'primary' : 'outline'}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>

              <ul className="mt-8 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400"
                    />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
