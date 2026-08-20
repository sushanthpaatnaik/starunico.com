import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { AppearanceContext, readTheme, subscribeTheme } from '../lib/appearance.js'
import {
  cacheResolved,
  MODES,
  resolveAuto,
  storedMode,
  storeMode,
  timeZone,
} from '../lib/theme.js'
import { prefersReducedMotion, useTransition } from '../lib/transition.js'

/**
 * Owns the appearance mode and the theme it resolves to.
 *
 * Applying a theme is deliberately not a plain attribute write: the colour
 * transition is switched on for the length of the change and off again
 * afterwards, so ordinary hovers and route changes are not left dragging their
 * colours behind them.
 */
export function AppearanceProvider({ children }) {
  const [mode, setModeState] = useState(() =>
    typeof window === 'undefined' ? 'auto' : storedMode(),
  )
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'light')

  const transitionTimer = useRef(0)
  const boundaryTimer = useRef(0)
  /* An automatic change waits here while the interface is busy. A ref, not
     state: applying it writes `data-theme`, which is what consumers watch. */
  const pending = useRef(null)

  const { phase } = useTransition()
  const busy = phase !== 'idle'

  const apply = useCallback((next, { animate }) => {
    const root = document.documentElement
    if (root.dataset.theme === next) return

    if (animate && !prefersReducedMotion()) {
      root.classList.add('theme-changing')
      clearTimeout(transitionTimer.current)
      transitionTimer.current = setTimeout(() => root.classList.remove('theme-changing'), 420)
    }

    root.dataset.theme = next
  }, [])

  /*
   * Automatic changes land only when nothing is in flight. Swapping the whole
   * environment mid-route-transition, or under someone's hands while they are
   * typing into the submission form, reads as a bug however elegant the fade.
   */
  const flush = useCallback(() => {
    const queued = pending.current
    if (!queued) return

    const active = document.activeElement
    const typing =
      active instanceof HTMLElement &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.tagName === 'SELECT' ||
        active.isContentEditable)
    if (typing) return

    pending.current = null
    apply(queued.theme, { animate: queued.animate })
  }, [apply])

  /*
   * Resolve auto, then wake once at the next sunrise or sunset rather than
   * polling. Re-running also refreshes the cache the pre-paint script reads,
   * which is what keeps the first frame of the next visit correct.
   */
  useEffect(() => {
    clearTimeout(boundaryTimer.current)

    if (mode !== 'auto') {
      pending.current = null
      apply(mode, { animate: true })
      return
    }

    let cancelled = false

    const settle = (animate) => {
      if (cancelled) return
      const { theme: resolved, until } = resolveAuto(new Date(), timeZone())
      cacheResolved(resolved, until)

      if (document.documentElement.dataset.theme !== resolved) {
        pending.current = { theme: resolved, animate }
        flush()
      }

      if (until) {
        // Clamped: setTimeout tops out near 24.8 days, and long sleeps drift.
        const delay = Math.min(Math.max(until.getTime() - Date.now(), 1000), 6 * 3_600_000)
        boundaryTimer.current = setTimeout(() => settle(true), delay)
      }
    }

    settle(false)

    // Auto still listens to the OS while no stronger daylight signal disagrees.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onPreference = () => settle(true)
    media.addEventListener('change', onPreference)

    return () => {
      cancelled = true
      media.removeEventListener('change', onPreference)
      clearTimeout(boundaryTimer.current)
    }
  }, [mode, apply, flush])

  // Retry a held-back change as soon as the interface goes quiet again.
  useEffect(() => {
    if (busy) return
    flush()
  }, [busy, flush])

  // A change the visitor asked for is immediate: they are watching for it.
  const setMode = useCallback((next) => {
    if (!MODES.includes(next)) return
    pending.current = null
    setModeState(next)
    storeMode(next)
  }, [])

  useEffect(() => () => clearTimeout(transitionTimer.current), [])

  const value = useMemo(() => ({ mode, theme, setMode }), [mode, theme, setMode])

  return <AppearanceContext value={value}>{children}</AppearanceContext>
}
