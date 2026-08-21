import { useAppearance } from '../lib/appearance.js'

const OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

/**
 * Appearance selector.
 *
 * A real radio group rather than three buttons, so the selected mode is
 * announced as such and arrow keys move between options the way they do in
 * every other set of exclusive choices.
 *
 * The selected option is marked by a hairline beneath it and a shift in
 * weight, not a filled pill — the same restraint the navigation uses for its
 * active state.
 */
export default function AppearanceControl({ tone = 'light', className = '' }) {
  const { mode, setMode } = useAppearance()
  const onPanel = tone === 'panel'

  return (
    <fieldset className={className}>
      <legend
        className={`meta ${onPanel ? 'text-panel-ink/60' : 'text-ink-3'} ${
          onPanel ? 'mb-3' : 'sr-only'
        }`}
      >
        Appearance
      </legend>

      <div
        className={`flex items-center ${onPanel ? 'gap-6' : 'gap-3'}`}
        role="radiogroup"
        aria-label="Appearance"
      >
        {OPTIONS.map((option) => {
          const selected = mode === option.value
          return (
            <label
              key={option.value}
              className={`group cursor-pointer text-sm transition-colors ${
                onPanel ? 'relative flex items-center py-3' : 'relative'
              } ${
                selected
                  ? onPanel
                    ? 'font-semibold text-panel-ink'
                    : 'font-semibold text-ink'
                  : onPanel
                    ? 'text-panel-ink/60 hover:text-panel-ink'
                    : 'text-ink-3 hover:text-ink'
              }`}
            >
              <input
                type="radio"
                name="appearance"
                value={option.value}
                checked={selected}
                onChange={() => setMode(option.value)}
                className="sr-only"
              />
              {/*
                On the mobile plane the label is padded out to a comfortable
                thumb target, so the underline hangs off an inner span that
                still hugs the word. On desktop the label is the word, and the
                markup stays as it was: wrapping it there moved the rule and
                widened the control by a few pixels, for no benefit.
              */}
              {onPanel ? (
                <span className="relative">
                  {option.label}
                  <Rule onPanel={onPanel} selected={selected} />
                </span>
              ) : (
                <>
                  {option.label}
                  <Rule onPanel={onPanel} selected={selected} />
                </>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/** The hairline that marks the selected option. */
function Rule({ onPanel, selected }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-1 left-0 block h-px transition-[width] duration-200 ${
        onPanel ? 'bg-panel-accent' : 'bg-accent'
      } ${selected ? 'w-full' : 'w-0'}`}
    />
  )
}
