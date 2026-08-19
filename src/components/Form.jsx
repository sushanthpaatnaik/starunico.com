const base =
  'mt-2 w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm transition ' +
  'placeholder:text-neutral-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20'

const border = (error) => (error ? 'border-red-500' : 'border-neutral-300')

function Label({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium">{children}</span>
      {optional && <span className="text-xs text-neutral-400">Optional</span>}
    </label>
  )
}

function Error({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  )
}

function Hint({ id, children }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-neutral-500">
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
            <p id={`${name}-error`} className="text-sm text-red-600">
              {error}
            </p>
          ) : (
            hint && (
              <p id={`${name}-hint`} className="text-sm text-neutral-500">
                {hint}
              </p>
            )
          )}
        </div>
        {max && (
          <span
            className={`shrink-0 text-xs tabular-nums ${
              used > max ? 'text-red-600' : 'text-neutral-400'
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
    <fieldset className="border-t border-neutral-200 pt-8">
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="flex items-baseline gap-3">
            <span className="text-xs font-semibold text-neutral-400 tabular-nums">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-semibold tracking-tight" aria-hidden="true">
              {legend}
            </span>
          </p>
          {description && <p className="mt-2 text-sm/6 text-neutral-500">{description}</p>}
        </div>
        <div className="grid gap-5">{children}</div>
      </div>
    </fieldset>
  )
}
