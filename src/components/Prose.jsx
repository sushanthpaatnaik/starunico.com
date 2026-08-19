/**
 * Long-form legal copy. Kept as one place so /privacy and /terms stay
 * typographically identical.
 */
export function Prose({ children }) {
  return <div className="mx-auto max-w-3xl">{children}</div>
}

export function Clause({ n, title, children }) {
  return (
    <section className="border-t border-neutral-200 py-8">
      <h2 className="text-xl font-semibold tracking-tight">
        <span className="mr-3 text-sm font-semibold text-neutral-400 tabular-nums">
          {String(n).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-pretty text-neutral-700">{children}</div>
    </section>
  )
}

export function Bullets({ items }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-neutral-400">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key}>{item}</li>
      ))}
    </ul>
  )
}

/** A fact we do not have yet. Visible on purpose, so it cannot ship unnoticed. */
export function Pending({ children }) {
  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-sm font-medium text-amber-900">
      {children}
    </mark>
  )
}

export function ReviewNotice() {
  return (
    <p className="mb-10 rounded-sm border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
      <strong className="font-semibold">Details still to be confirmed.</strong> This page
      describes how the site actually works, but the highlighted items below are not yet
      settled. It should not be relied on until they are.
    </p>
  )
}
