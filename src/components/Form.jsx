const base =
  'mt-2 w-full rounded-sm border bg-surface px-3.5 py-2.5 text-sm transition ' +
  'placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25'

const border = (error) => (error ? 'border-danger' : 'border-line-2')

function Label({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium">{children}</span>
      {optional && <span className="text-xs text-ink-3">Optional</span>}
    </label>
  )
}

function Error({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-danger">
      {children}
    </p>
  )
}

function Hint({ id, children }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-ink-3">
      {children}
    </p>
  )
}

/** Wires label, hint and error to the control for screen readers. */
function describedBy(name, error, hint) {
  const ids = []
  if (error) ids.push(`${name}-error`)
  if (hint) ids.push(`${name}-hint`)
  return ids.length ? ids.join(' ') : undefined
}

export function Field({ label, name, error, hint, optional, ...props }) {
  return (
    <div>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, error, hint)}
        className={`${base} ${border(error)}`}
        {...props}
      />
      {error ? <Error id={`${name}-error`}>{error}</Error> : hint && <Hint id={`${name}-hint`}>{hint}</Hint>}
    </div>
  )
}

export function Select({ label, name, error, hint, options, placeholder, optional, ...props }) {
  return (
    <div>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, error, hint)}
        className={`${base} ${border(error)}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <Error id={`${name}-error`}>{error}</Error> : hint && <Hint id={`${name}-hint`}>{hint}</Hint>}
    </div>
  )
}

export function TextArea({ label, name, error, hint, value, max, optional, ...props }) {
  const used = String(value ?? '').length
  return (
    <div>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, error, hint)}
        className={`${base} ${border(error)}`}
        {...props}
      />
      <div className="mt-1.5 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          {error ? (
            <p id={`${name}-error`} className="text-sm text-danger">
              {error}
            </p>
          ) : (
            hint && (
              <p id={`${name}-hint`} className="text-sm text-ink-3">
                {hint}
              </p>
            )
          )}
        </div>
        {max && (
          <span
            className={`shrink-0 text-xs tabular-nums ${
              used > max ? 'text-danger' : 'text-ink-3'
            }`}
          >
            {used} / {max}
          </span>
        )}
      </div>
    </div>
  )
}

export function Fieldset({ index, legend, description, children }) {
  return (
    <fieldset className="border-t border-line pt-8">
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="flex items-baseline gap-3">
            <span className="text-xs font-semibold text-ink-3 tabular-nums">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-semibold tracking-tight" aria-hidden="true">
              {legend}
            </span>
          </p>
          {description && <p className="mt-2 text-sm/6 text-ink-3">{description}</p>}
        </div>
        <div className="grid gap-5">{children}</div>
      </div>
    </fieldset>
  )
}
