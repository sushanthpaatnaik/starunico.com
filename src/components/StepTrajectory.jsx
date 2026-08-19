import { STEPS } from '../lib/submission.js'

/**
 * The trajectory as the form's progress device, so the submission reads as part
 * of the same instrument as the rest of the site. Marks are announced to screen
 * readers as an ordered list with the current step flagged.
 */
export default function StepTrajectory({ current }) {
  const progress = current / (STEPS.length - 1)

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="meta text-neutral-500">
          {String(current + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
        </p>
        <p className="meta text-neutral-400">Submission</p>
      </div>

      <div className="relative mt-3 h-px w-full bg-neutral-200">
        <div
          className="absolute inset-y-0 left-0 bg-brand-600 transition-[width] duration-500"
          style={{ width: `${progress * 100}%`, transitionTimingFunction: 'var(--ease-precision)' }}
        />
        <ol className="absolute inset-x-0 -top-1 flex justify-between">
          {STEPS.map((step, index) => (
            <li key={step.id} aria-current={index === current ? 'step' : undefined}>
              <span className="sr-only">
                Step {index + 1}: {step.question}
                {index === current ? ' (current)' : ''}
              </span>
              <span
                aria-hidden="true"
                className={`block h-2 w-2 rounded-full transition-colors ${
                  index <= current ? 'bg-brand-600' : 'bg-neutral-300'
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
