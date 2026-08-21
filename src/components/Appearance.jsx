import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import {
  AppearanceContext,
  readSource,
  readTheme,
  subscribeAppearance,
} from '../lib/appearance.js'
import { ambientSupported, createAmbientTracker } from '../lib/ambient.js'
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
 * Auto is a hierarchy, not a single rule. Room light decides when the device
 * can report it, daylight when it cannot, the operating system's stated
 * preference when neither is available, and the clock as a last resort. Which
 * one answered is carried as `source`, because otherwise a theme that looks
 * wrong gives no way to tell which layer decided it.
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
  const theme = useSyncExternalStore(subscribeAppearance, readTheme, () => 'light')
  const source = useSyncExternalStore(subscribeAppearance, readSource, () => 'pending')

  const transitionTimer = useRef(0)
  const boundaryTimer = useRef(0)
  /* An automatic change waits here while the interface is busy. A ref, not
     state: applying it writes `data-theme`, which is what consumers watch. */
  const pending = useRef(null)
  const retryTimer = useRef(0)
  const ambient = useRef(null)

  const { phase } = useTransition()
  const busy = phase !== 'idle'

  const apply = useCallback((next, { animate, source: from }) => {
    const root = document.documentElement
    if (from) root.dataset.themeSource = from
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
  const flush = useCallback(function attempt() {
    const queued = pending.current
    if (!queued) return

    /*
     * Nothing else reliably signals that the interface went quiet — leaving a
     * text field fires no event this component watches — so a blocked change
     * asks again shortly rather than waiting for a trigger that may never
     * come. Without this, a change deferred while typing was deferred forever.
     */
    const later = () => {
      clearTimeout(retryTimer.current)
      retryTimer.current = setTimeout(attempt, 1500)
    }

    /*
     * Text entry, specifically — not merely a focused form control. Treating
     * every INPUT as typing meant that choosing an appearance left focus on the
     * radio and blocked every later automatic change, since the control that
     * turns auto back on is itself an input.
     */
    const NOT_TEXT = new Set([
      'radio', 'checkbox', 'button', 'submit', 'reset', 'range', 'color', 'file',
    ])
    const active = document.activeElement
    const typing =
      active instanceof HTMLElement &&
      (active.isContentEditable ||
        active.tagName === 'TEXTAREA' ||
        (active.tagName === 'INPUT' && !NOT_TEXT.has(active.type)))
    if (typing) return later()
    if (document.getElementById('mobile-menu')) return later()

    pending.current = null
    clearTimeout(retryTimer.current)
    apply(queued.theme, { animate: queued.animate, source: queued.source })
  }, [apply])

  const queue = useCallback(
    (next, { animate, source: from }) => {
      // Already correct: record which layer confirmed it and change nothing.
      if (document.documentElement.dataset.theme === next) {
        document.documentElement.dataset.themeSource = from
        return
      }
      pending.current = { theme: next, animate, source: from }
      flush()
    },
    [flush],
  )

  /*
   * Resolve auto from daylight, then wake once at the next sunrise or sunset
   * rather than polling. Re-running also refreshes the cache the pre-paint
   * script reads, which keeps the first frame of the next visit correct.
   */
  useEffect(() => {
    clearTimeout(boundaryTimer.current)

    if (mode !== 'auto') {
      pending.current = null
      apply(mode, { animate: true, source: 'manual' })
      return
    }

    let cancelled = false

    const settle = (animate) => {
      if (cancelled) return
      const resolved = resolveAuto(new Date(), timeZone())
      cacheResolved(resolved.theme, resolved.until)

      // Room light, where it is available, outranks the calendar.
      if (!ambient.current) queue(resolved.theme, { animate, source: resolved.source })

      if (resolved.until) {
        // Clamped: setTimeout tops out near 24.8 days, and long sleeps drift.
        const delay = Math.min(Math.max(resolved.until.getTime() - Date.now(), 1000), 6 * 3_600_000)
        boundaryTimer.current = setTimeout(() => settle(true), delay)
      }
    }

    settle(false)

    // Auto still listens to the OS while no stronger signal disagrees.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onPreference = () => settle(true)
    media.addEventListener('change', onPreference)

    return () => {
      cancelled = true
      media.removeEventListener('change', onPreference)
      clearTimeout(boundaryTimer.current)
    }
  }, [mode, apply, queue])

  /*
   * Room light, where the device reports it.
   *
   * No current browser exposes the Ambient Light Sensor API — it was withdrawn
   * over fingerprinting concerns — so in practice this detects nothing and
   * costs nothing. It is written so that a device which does expose it needs no
   * further work, and so that failure is silent: an unsupported browser, a
   * denied permission or a sensor that errors all leave auto resolving exactly
   * as it did before, with nothing logged at anyone.
   */
  useEffect(() => {
    if (mode !== 'auto' || !ambientSupported()) return

    let sensor = null
    let stopped = false
    const tracker = createAmbientTracker()

    const teardown = () => {
      stopped = true
      ambient.current = null
      try {
        sensor?.stop()
      } catch {
        // Already stopped, or the sensor died: nothing left to do.
      }
      sensor = null
    }

    const start = () => {
      if (stopped || sensor) return
      try {
        // 1 Hz: room light does not change faster than that in any way worth
        // reacting to, and a higher rate is only battery.
        sensor = new window.AmbientLightSensor({ frequency: 1 })
        sensor.addEventListener('reading', () => {
          const decision = tracker.reading(
            sensor.illuminance,
            Date.now(),
            document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
          )
          if (decision) queue(decision, { animate: true, source: 'ambient' })
        })
        sensor.addEventListener('error', () => teardown())
        sensor.start()
        ambient.current = tracker
      } catch {
        teardown()
      }
    }

    const onVisibility = () => {
      if (document.hidden) {
        tracker.suspend()
        try {
          sensor?.stop()
        } catch {
          /* nothing to stop */
        }
        sensor = null
      } else {
        tracker.resume(Date.now())
        start()
      }
    }

    // A denied permission is a normal outcome, not an error to report.
    navigator.permissions
      ?.query({ name: 'ambient-light-sensor' })
      .then((status) => {
        if (status.state !== 'denied') start()
      })
      .catch(() => start())

    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      teardown()
    }
  }, [mode, queue])

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

  useEffect(
    () => () => {
      clearTimeout(transitionTimer.current)
      clearTimeout(retryTimer.current)
    },
    [],
  )

  const value = useMemo(
    () => ({ mode, theme, source, setMode, tracker: ambient }),
    [mode, theme, source, setMode],
  )

  return <AppearanceContext value={value}>{children}</AppearanceContext>
}
