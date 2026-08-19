import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from '../data/site.js'
import {
  ENTER_MS,
  EXIT_MS,
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
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }

      setLabel(labelFor(to.split('#')[0]))
      setPhase('exiting')

      timers.current.push(
        setTimeout(() => {
          navigate(to)
          window.scrollTo({ top: 0, behavior: 'instant' })
          setPhase('entering')
        }, EXIT_MS),
      )
      timers.current.push(setTimeout(() => setPhase('idle'), EXIT_MS + ENTER_MS))
    },
    [navigate, location.pathname, location.hash],
  )

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
        className={`sweep ${phase === 'exiting' ? 'sweep--active' : ''}`}
      >
        <span className="sweep__label">{label}</span>
      </div>
    </TransitionContext>
  )
}
