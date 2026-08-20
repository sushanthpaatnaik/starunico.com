import { useEffect, useRef, useState } from 'react'

/**
 * The signature device: one continuous line tracing breakthrough → scale.
 * It draws itself as the section enters the viewport, then holds. Motion is
 * mechanical rather than playful — a constant-rate sweep, no easing bounce —
 * and it renders fully drawn for anyone who prefers reduced motion.
 */
export default function Trajectory({ points, className = '' }) {
  const ref = useRef(null)
  // Reduced motion starts fully drawn, so the effect never sets state synchronously.
  const [drawn, setDrawn] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const node = ref.current
    if (!node || drawn) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setDrawn(true),
      { rootMargin: '-10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [drawn])

  const width = 1000
  const height = 200
  // A rising curve: shallow at first, steepening as the company compounds.
  const path = `M 0 ${height - 10} C ${width * 0.34} ${height - 18}, ${width * 0.52} ${height * 0.78}, ${width * 0.68} ${height * 0.5} S ${width * 0.9} 24, ${width} 8`

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={path} fill="none" stroke="currentColor" strokeWidth="1" className="text-panel-ink/80" />
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: 'stroke-dashoffset 1400ms linear',
          }}
        />
      </svg>
      <ol className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {points.map((point, index) => (
          <li key={point} className="border-t border-line pt-3">
            <span className="meta block text-ink-3">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mt-1 block text-sm font-semibold tracking-tight">{point}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
