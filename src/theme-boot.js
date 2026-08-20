/**
 * Resolves and applies the theme before the first paint.
 *
 * Bundled into a blocking inline script by the `themeBoot` plugin in
 * vite.config.js, from this one source. Writing a second, hand-rolled resolver
 * into index.html would put two implementations of the same rule in the
 * codebase, and the inline one — the one that decides the very first frame —
 * would be the copy nobody tests.
 *
 * It must stay small and synchronous: anything deferred paints first and
 * corrects afterwards, which is the flash this exists to prevent.
 */
import { cacheResolved, resolveAuto, storedMode, timeZone } from './lib/theme.js'

const mode = storedMode()

let theme
if (mode === 'light' || mode === 'dark') {
  theme = mode
} else {
  const resolved = resolveAuto(new Date(), timeZone())
  theme = resolved.theme
  // Left for the next visit, where it saves repeating this work before paint.
  cacheResolved(resolved.theme, resolved.until)
}

document.documentElement.dataset.theme = theme
