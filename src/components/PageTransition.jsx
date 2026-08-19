import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from '../data/site.js'
import {
  enterMs,
  exitMs,
  prefersReducedMotion,
  TransitionContext,
} from '../lib/transition.js'

/** The technical label the sweep carries, e.g. "03 / PORTFOLIO". */
function labelFor(pathname) {
  const index = navigation.findIndex((item) => item.to === pathname)
  if (index >= 0) return `${String(index + 1).padStart(2, '0')} / ${navigation[index].name}`
  if (pathname === '/') return '00 / Starunico'
  const name = pathname.replace(/^\//, '').replace(/-/g, ' ')
  return name ? `— / ${name}` : '00 / Starunico'
}

/**
 * Branded route transition: click → exit → trajectory sweep → staggered reveal.
 *
 * Clicks on internal links are intercepted in the capture phase, so every link
 * on the site participates without being rewritten. Navigation is deferred
 * until the exit finishes, which is what makes the sweep read as a bridge
 * between two pages rather than decoration over a swap that already happened.
 *
 * The sweep stays mounted for exit *and* enter. Scoping it to the exit alone
 * cut the line off mid-stroke, so the bridge disappeared before it had crossed.
 *
 * Back and forward get the reveal half of the sequence. The browser owns that
 * navigation, so there is no exit to play, but replacing the page in a single
 * frame is exactly the abruptness the rest of this system exists to avoid.
 *
 * Every route is in the main bundle, so there is nothing to prefetch and no
 * loading state that could flash behind the animation.
 */
export default function PageTransition({ children }) {
  const [phase, setPhase] = useState('idle')
  const [label, setLabel] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const go = useCallback(
    (to) => {
      if (to === location.pathname + location.hash) return
      clearTimers()

      if (prefersReducedMotion()) {
        navigate(to)
        return
      }

      const exit = exitMs()
      setLabel(labelFor(to.split('#')[0]))
      setPhase('exiting')

      timers.current.push(
        setTimeout(() => {
          navigate(to)
          setPhase('entering')
        }, exit),
      )
      timers.current.push(setTimeout(() => setPhase('idle'), exit + enterMs()))
    },
    [navigate, location.pathname, location.hash],
  )

  /*
   * Back and forward. History is the external system here: popstate fires only
   * for browser-driven navigation, never for the pushes this component makes,
   * so there is no need to tell the two apart after the fact.
   *
   * There is no exit to play — the browser has already committed — but the
   * destination still reveals rather than appearing in a single frame.
   */
  useEffect(() => {
    const onPopState = () => {
      if (prefersReducedMotion()) return
      clearTimers()
      setLabel(labelFor(window.location.pathname))
      setPhase('entering')
      timers.current.push(setTimeout(() => setPhase('idle'), enterMs()))
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Capture internal link clicks anywhere in the tree.
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a[href]')
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/')) return

      event.preventDefault()
      go(href)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [go])

  return (
    <TransitionContext value={{ phase, go }}>
      <div data-phase={phase} className="page-transition">
        {children}
      </div>

      <div
        aria-hidden="true"
        className={`sweep ${phase === 'idle' ? '' : 'sweep--active'}`}
      >
        <span className="sweep__label">{label}</span>
      </div>
    </TransitionContext>
  )
}
