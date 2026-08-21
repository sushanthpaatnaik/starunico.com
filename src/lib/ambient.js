/**
 * Deciding a theme from ambient room light.
 *
 * Kept as a pure state machine, separate from the sensor that feeds it: every
 * input — the reading and the current time — is passed in, so the behaviour
 * that actually matters here (not flipping when someone walks past a lamp) can
 * be tested without a device. No browser currently ships the Ambient Light
 * Sensor API, so a test that needed real hardware would be a test that never
 * ran.
 *
 * Three separate mechanisms keep it calm, and they solve different problems:
 *
 * - Smoothing removes sensor noise, so one spike cannot move the average far.
 * - Hysteresis removes the borderline: the level that turns the lights on is
 *   not the level that turns them off, so sitting between the two changes
 *   nothing at all. A single threshold would oscillate around itself.
 * - Dwell and cooldown remove brief events: a hand over the sensor, a doorway,
 *   a turn of the phone. The condition has to persist, and changes cannot come
 *   in quick succession.
 */

export const AMBIENT_DEFAULTS = {
  /** Dark → light needs a clearly lit room; indoor lighting is ~100-300 lux. */
  toLightLux: 110,
  /** Light → dark needs a clearly dim one; dusk indoors is ~30-50 lux. */
  toDarkLux: 40,
  /** Weight of each new reading in the moving average. */
  smoothing: 0.25,
  /** How long the new condition must hold before the theme follows it. */
  dwellMs: 7000,
  /** Minimum gap between two automatic changes. */
  cooldownMs: 25_000,
  /** Readings are ignored this long after the tab becomes visible again. */
  settleMs: 4000,
}

/**
 * A tracker that turns a stream of lux readings into occasional decisions.
 *
 * `reading` returns a theme only at the moment one should change; every other
 * call returns null, which is the normal case by a wide margin.
 */
export function createAmbientTracker(options = {}) {
  const config = { ...AMBIENT_DEFAULTS, ...options }

  let average = null
  let candidate = null // { theme, since }
  let lastChangeAt = -Infinity
  let ignoreUntil = -Infinity

  /** The theme this level argues for, or null where it argues for neither. */
  const desiredFor = (level, current) => {
    if (current === 'dark' && level >= config.toLightLux) return 'light'
    if (current === 'light' && level <= config.toDarkLux) return 'dark'
    return null
  }

  return {
    /** Feed one sensor reading. Returns a theme to switch to, or null. */
    reading(lux, now, currentTheme) {
      if (!Number.isFinite(lux) || lux < 0) return null

      average = average === null ? lux : average + config.smoothing * (lux - average)

      if (now < ignoreUntil) return null

      const desired = desiredFor(average, currentTheme)

      if (!desired) {
        // Borderline, or already correct: prefer continuity over movement.
        candidate = null
        return null
      }

      if (!candidate || candidate.theme !== desired) {
        candidate = { theme: desired, since: now }
        return null
      }

      if (now - candidate.since < config.dwellMs) return null
      if (now - lastChangeAt < config.cooldownMs) return null

      lastChangeAt = now
      candidate = null
      return desired
    },

    /** The tab went away; readings stop being meaningful. */
    suspend() {
      candidate = null
    },

    /**
     * The tab came back. The first readings after a return can describe the
     * room the visitor left rather than the one they are in, so they are
     * ignored until the sensor has had time to catch up.
     */
    resume(now) {
      candidate = null
      average = null
      ignoreUntil = now + config.settleMs
    },

    /** Current state, for the development-only debug panel. */
    snapshot(now = 0) {
      return {
        average: average === null ? null : Math.round(average),
        candidate: candidate && {
          theme: candidate.theme,
          heldMs: Math.max(0, Math.round(now - candidate.since)),
        },
        cooldownRemainingMs: Math.max(0, Math.round(config.cooldownMs - (now - lastChangeAt))),
        settling: now < ignoreUntil,
        config,
      }
    },
  }
}

/**
 * Whether this browser exposes ambient light at all.
 *
 * It almost certainly does not. The Ambient Light Sensor API is not enabled in
 * any current shipping browser — Chromium 141 does not expose it even behind
 * `--enable-generic-sensor-extra-classes`, and Firefox removed the older
 * `devicelight` event — both on privacy grounds, since room brightness is a
 * usable fingerprinting and side-channel signal. This is written to work if
 * that changes, and to cost nothing while it has not.
 */
export const ambientSupported = () =>
  typeof window !== 'undefined' && typeof window.AmbientLightSensor === 'function'
