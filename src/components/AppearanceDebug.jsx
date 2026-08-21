import { useEffect, useState } from 'react'
import { useAppearance } from '../lib/appearance.js'
import { ambientSupported } from '../lib/ambient.js'

/**
 * Development-only readout of how the theme was decided.
 *
 * Guarded by `import.meta.env.DEV`, which the production build replaces with
 * `false`, so the whole component is removed rather than merely hidden. Shown
 * only with `?theme-debug` in the URL, so it stays out of the way during
 * ordinary development too.
 */
export default function AppearanceDebug() {
  const { mode, theme, source, tracker } = useAppearance()
  const [snapshot, setSnapshot] = useState(null)
  // Read once at mount rather than in an effect: the URL is not a moving part
  // this component needs to track, it is just where the flag lives.
  const [shown] = useState(
    () =>
      import.meta.env.DEV &&
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('theme-debug'),
  )

  useEffect(() => {
    if (!shown) return
    const id = setInterval(() => setSnapshot(tracker?.current?.snapshot(Date.now()) ?? null), 500)
    return () => clearInterval(id)
  }, [shown, tracker])

  if (!import.meta.env.DEV || !shown) return null

  const rows = [
    ['mode', mode],
    ['theme', theme],
    ['source', source],
    ['sensor', ambientSupported() ? 'available' : 'unavailable'],
    ['smoothed lux', snapshot?.average ?? '—'],
    ['candidate', snapshot?.candidate ? `${snapshot.candidate.theme} ${snapshot.candidate.heldMs}ms` : '—'],
    ['cooldown', snapshot ? `${snapshot.cooldownRemainingMs}ms` : '—'],
    ['settling', snapshot ? String(snapshot.settling) : '—'],
  ]

  return (
    <aside className="meta fixed bottom-3 left-3 z-[70] border border-line bg-surface/95 px-3 py-2 text-ink-2 shadow-lg">
      <table>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <td className="pr-4 text-ink-3">{label}</td>
              <td className="text-ink">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}
