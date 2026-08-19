import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Owns scroll position across navigation.
 *
 * The browser's own restoration and a blanket scroll-to-top on every route
 * change fight each other: the browser restores asynchronously, after the
 * router has already jumped to the top, and the winner depends on how long
 * layout takes. Measured on this site, going back to a page left at 641px
 * landed at 1200px every time — a position the visitor had never been at.
 *
 * So restoration is taken off the browser and made explicit: a push goes to
 * the top, a back or forward returns to the offset recorded for that history
 * entry, and an in-page hash goes to its target.
 */
export default function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef(new Map())
  const { key, hash } = location

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  /*
   * Keep the offset for the entry currently on screen up to date.
   *
   * Recording on scroll only, never on teardown: the layout effect below has
   * already scrolled the new page to the top by the time this effect's cleanup
   * runs, so a save there would overwrite the outgoing page's real position
   * with zero — which is exactly what it did.
   */
  useEffect(() => {
    const save = () => positions.current.set(key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [key])

  useLayoutEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    const top = navigationType === 'POP' ? (positions.current.get(key) ?? 0) : 0
    if (top === 0) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    /*
     * Sections reveal as they enter the viewport, so the document can still be
     * shorter than the saved offset at this point and the scroll gets clamped.
     * Reapply across a few frames until it takes, or until the page has clearly
     * settled at a genuinely shorter height.
     */
    let frame = 0
    let raf = 0
    const apply = () => {
      window.scrollTo({ top, behavior: 'instant' })
      if (Math.abs(window.scrollY - top) > 1 && (frame += 1) < 20) {
        raf = requestAnimationFrame(apply)
      }
    }
    apply()
    return () => cancelAnimationFrame(raf)
  }, [key, hash, navigationType])

  return null
}
