/**
 * Appearance: auto, light or dark.
 *
 * What is stored is the *mode*, never the resolved theme. Storing "dark"
 * because auto happened to resolve dark at 9pm would freeze a visitor into
 * night for good; storing "auto" lets it resolve again on the next visit, in
 * whatever place and season they are then in.
 *
 * Auto resolves from daylight rather than a fixed clock, because 18:30 is
 * after dark in Berlin in December and broad daylight there in June. Latitude
 * is what daylight depends on, and it is inferred from the browser's IANA
 * timezone — never from GPS, which would mean a permission prompt and a
 * precise location, both indefensible for choosing a colour.
 */

export const MODES = ['auto', 'light', 'dark']
export const STORAGE_KEY = 'starunico:appearance'
/** Where the pre-paint script leaves what auto last resolved to, and until when. */
export const CACHE_KEY = 'starunico:appearance:resolved'

/**
 * Representative latitude and longitude per IANA timezone.
 *
 * Only a coarse position is needed: an hour either side of sunrise changes
 * nothing about whether a page should be light. Zones absent from this table
 * fall back to the clock, which is why the table can stay small rather than
 * shipping every zone on earth.
 */
const ZONES = {
  'Africa/Cairo': [30, 31],
  'Africa/Johannesburg': [-26, 28],
  'Africa/Lagos': [6, 3],
  'Africa/Nairobi': [-1, 37],
  'America/Argentina/Buenos_Aires': [-35, -58],
  'America/Bogota': [5, -74],
  'America/Chicago': [42, -88],
  'America/Denver': [40, -105],
  'America/Halifax': [45, -64],
  'America/Lima': [-12, -77],
  'America/Los_Angeles': [34, -118],
  'America/Mexico_City': [19, -99],
  'America/New_York': [41, -74],
  'America/Phoenix': [33, -112],
  'America/Sao_Paulo': [-24, -47],
  'America/Toronto': [44, -79],
  'America/Vancouver': [49, -123],
  'Asia/Bangkok': [14, 101],
  'Asia/Dhaka': [24, 90],
  'Asia/Dubai': [25, 55],
  'Asia/Hong_Kong': [22, 114],
  'Asia/Jakarta': [-6, 107],
  'Asia/Jerusalem': [32, 35],
  'Asia/Karachi': [25, 67],
  'Asia/Kolkata': [23, 78],
  'Asia/Kuala_Lumpur': [3, 102],
  'Asia/Manila': [15, 121],
  'Asia/Riyadh': [25, 47],
  'Asia/Seoul': [37, 127],
  'Asia/Shanghai': [31, 121],
  'Asia/Singapore': [1, 104],
  'Asia/Taipei': [25, 121],
  'Asia/Tokyo': [36, 140],
  'Australia/Brisbane': [-27, 153],
  'Australia/Melbourne': [-38, 145],
  'Australia/Perth': [-32, 116],
  'Australia/Sydney': [-34, 151],
  'Europe/Amsterdam': [52, 5],
  'Europe/Athens': [38, 24],
  'Europe/Berlin': [52, 13],
  'Europe/Brussels': [51, 4],
  'Europe/Bucharest': [44, 26],
  'Europe/Budapest': [47, 19],
  'Europe/Copenhagen': [56, 13],
  'Europe/Dublin': [53, -6],
  'Europe/Helsinki': [60, 25],
  'Europe/Istanbul': [41, 29],
  'Europe/Lisbon': [39, -9],
  'Europe/London': [52, 0],
  'Europe/Madrid': [40, -4],
  'Europe/Moscow': [56, 38],
  'Europe/Oslo': [60, 11],
  'Europe/Paris': [47, 2],
  'Europe/Prague': [50, 14],
  'Europe/Rome': [42, 13],
  'Europe/Stockholm': [59, 18],
  'Europe/Vienna': [48, 16],
  'Europe/Warsaw': [52, 21],
  'Europe/Zurich': [47, 8],
  'Pacific/Auckland': [-37, 175],
  'Pacific/Honolulu': [21, -158],
}

const DEG = Math.PI / 180
const DAY_MS = 86_400_000

/** Whole days from the J2000.0 epoch, the reference the formulae below use. */
const daysSinceEpoch = (date) => date.getTime() / DAY_MS - 10_957.5

/**
 * UTC instants of sunrise and sunset for a date and place.
 *
 * The low-precision solar position from the Astronomical Almanac: accurate to
 * about a minute, which is far finer than this decision needs. Returns null in
 * polar day or polar night, where the sun does not cross the horizon at all
 * and there is no boundary to compute.
 */
export function sunTimes(date, latitude, longitude) {
  const n = Math.round(daysSinceEpoch(date) - longitude / 360)
  const solarNoonApprox = n + longitude / -360

  const meanAnomaly = (357.5291 + 0.98560028 * solarNoonApprox) % 360
  const centre =
    1.9148 * Math.sin(meanAnomaly * DEG) +
    0.02 * Math.sin(2 * meanAnomaly * DEG) +
    0.0003 * Math.sin(3 * meanAnomaly * DEG)
  const eclipticLongitude = (meanAnomaly + centre + 180 + 102.9372) % 360

  const solarTransit =
    2_451_545.0 +
    solarNoonApprox +
    0.0053 * Math.sin(meanAnomaly * DEG) -
    0.0069 * Math.sin(2 * eclipticLongitude * DEG)

  const declination = Math.asin(Math.sin(eclipticLongitude * DEG) * Math.sin(23.44 * DEG))

  // -0.833° accounts for refraction and the sun's disc, the standard horizon.
  const cosHourAngle =
    (Math.sin(-0.833 * DEG) - Math.sin(latitude * DEG) * Math.sin(declination)) /
    (Math.cos(latitude * DEG) * Math.cos(declination))

  if (cosHourAngle > 1 || cosHourAngle < -1) return null

  const hourAngle = Math.acos(cosHourAngle) / DEG
  const toDate = (julian) => new Date((julian - 2_440_587.5) * DAY_MS)

  return {
    sunrise: toDate(solarTransit - hourAngle / 360),
    sunset: toDate(solarTransit + hourAngle / 360),
  }
}

/**
 * The operating system's stated preference, or null when it states none.
 *
 * Absence has to be detected by asking both ways: a `prefers-color-scheme:
 * dark` query that does not match means either "light" or "no opinion", and
 * treating no opinion as a preference would let it outrank the clock.
 */
export function systemPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return null
}

/** The visitor's IANA timezone, or null where it cannot be read. */
export function timeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null
  } catch {
    return null
  }
}

/** Local wall-clock hour as a fraction, e.g. 18.5 for 18:30. */
function localHours(date) {
  return date.getHours() + date.getMinutes() / 60
}

/**
 * Which theme auto means right now, and when that answer next changes.
 *
 * The boundary is returned alongside so the caller can wake exactly once, at
 * the change, rather than polling to find out.
 */
export function resolveAuto(now = new Date(), zone = timeZone()) {
  const place = zone && ZONES[zone]

  if (place) {
    const [latitude, longitude] = place

    /*
     * Events from the surrounding days, then the interval that actually
     * contains `now`. Asking for "today's" sunrise begs the question of whose
     * today: at longitude 151 the local date is ahead of UTC, and picking the
     * solar day by rounding put Sydney a day behind — reporting dark at ten in
     * the morning. Bracketing sidesteps the question entirely.
     */
    const events = []
    for (const offset of [-1, 0, 1]) {
      const times = sunTimes(new Date(now.getTime() + offset * DAY_MS), latitude, longitude)
      if (!times) continue
      events.push({ at: times.sunrise, theme: 'light' }, { at: times.sunset, theme: 'dark' })
    }

    if (events.length) {
      events.sort((a, b) => a.at - b.at)
      const started = events.filter((event) => event.at <= now).at(-1)
      const next = events.find((event) => event.at > now)
      return {
        // Before every known event means the night that began earlier still holds.
        theme: started ? started.theme : next?.theme === 'light' ? 'dark' : 'light',
        until: next?.at ?? null,
        source: 'sunrise-sunset',
      }
    }

    // Polar day or night: the sun settles the question without an hour angle.
    const midsummer = Math.abs(now.getMonth() - 5.5) < 3
    const polarDay = latitude > 0 ? midsummer : !midsummer
    return { theme: polarDay ? 'light' : 'dark', until: null, source: 'sunrise-sunset' }
  }

  // No usable position. The operating system is asked next, because a stated
  // preference is a real answer, where the clock is only ever an assumption.
  const preference = systemPreference()
  if (preference) return { theme: preference, until: null, source: 'system' }

  // Last resort: the local clock, which is at least local to the visitor.
  const hours = localHours(now)
  const isDay = hours >= 6.5 && hours < 18.5
  const boundary = new Date(now)
  boundary.setHours(isDay ? 18 : 6, 30, 0, 0)
  if (boundary <= now) boundary.setDate(boundary.getDate() + 1)

  return { theme: isDay ? 'light' : 'dark', until: boundary, source: 'time' }
}

/** The stored mode, defaulting to auto for anyone who has not chosen. */
export function storedMode() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return MODES.includes(value) ? value : 'auto'
  } catch {
    return 'auto'
  }
}

export function storeMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // Private browsing and blocked storage: the mode simply will not persist.
  }
}

/**
 * Remembers what auto resolved to, and until when.
 *
 * This is what lets the pre-paint script get auto right on the very first
 * frame without running the solar maths inline: it reads the last answer, and
 * only falls back to the OS preference if that answer has expired or never
 * existed.
 */
export function cacheResolved(theme, until) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ theme, until: until?.getTime() ?? null }))
  } catch {
    // Non-fatal: without the cache the first frame uses prefers-color-scheme.
  }
}
