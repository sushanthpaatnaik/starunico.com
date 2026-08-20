import { createContext, use } from 'react'

export const AppearanceContext = createContext({
  mode: 'auto',
  theme: 'light',
  setMode: () => {},
})

export const useAppearance = () => use(AppearanceContext)

/**
 * The active theme, read from the element that carries it.
 *
 * `data-theme` on the root is the source of truth, not a copy of it: the
 * pre-paint script sets it before React exists, and CSS selects on it. Mirroring
 * it into React state would create a second truth that can disagree with the
 * first, so consumers subscribe to the attribute itself instead.
 */
export function readTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function subscribeTheme(onChange) {
  if (typeof document === 'undefined') return () => {}
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
