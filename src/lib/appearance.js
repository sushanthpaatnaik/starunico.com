import { createContext, use } from 'react'

export const AppearanceContext = createContext({
  mode: 'auto',
  theme: 'light',
  /** Which layer of the auto hierarchy decided: ambient, sunrise-sunset,
      system, time, or manual when the visitor chose. */
  source: 'pending',
  setMode: () => {},
  tracker: { current: null },
})

export const useAppearance = () => use(AppearanceContext)

/**
 * The active theme and the layer that chose it, read from the element that
 * carries them.
 *
 * `data-theme` on the root is the source of truth, not a copy of it: the
 * pre-paint script sets it before React exists, and CSS selects on it.
 * Mirroring it into React state would create a second truth that can disagree
 * with the first, so consumers subscribe to the attributes themselves.
 *
 * `data-theme-source` rides alongside for the same reason, and has the useful
 * side effect of being visible in devtools: when a theme looks wrong, the
 * element says which layer of the hierarchy decided it.
 */
export function readTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function readSource() {
  if (typeof document === 'undefined') return 'pending'
  return document.documentElement.dataset.themeSource ?? 'pending'
}

export function subscribeAppearance(onChange) {
  if (typeof document === 'undefined') return () => {}
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'data-theme-source'],
  })
  return () => observer.disconnect()
}
