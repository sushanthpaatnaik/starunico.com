import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/transition.js'

/**
 * The trajectory as a site-wide system rather than one section: a hairline under
 * the header that advances with scroll depth, carrying the stage the reader has
 * reached. Reads as telemetry, not a loading bar.
 */
const STAGES = ['Breakthrough', 'Validation', 'Commercialization', 'Institutionalization', 'Scale']

export default function ScrollTrajectory() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let frame = 0
    const measure = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setProgress(scrollable > 0 ? Math.min(1, doc.scrollTop / scrollable) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const stage = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length))

  return (
    <div aria-hidden="true" className="relative h-px w-full bg-line">
      <div
        className="absolute inset-y-0 left-0 bg-accent"
        style={{ width: `${progress * 100}%` }}
      />
      <span
        className="meta absolute top-2 hidden text-ink-3 transition-opacity lg:block"
        style={{ left: `min(${progress * 100}%, calc(100% - 11rem))`, opacity: progress > 0.02 ? 1 : 0 }}
      >
        {String(stage + 1).padStart(2, '0')} {STAGES[stage]}
      </span>
    </div>
  )
}
