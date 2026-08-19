/**
 * The hero's signature visual: a lattice of nodes and traces, drawn to the same
 * rising curve as the trajectory. Deterministic geometry rather than particles —
 * it reads as a material structure or a semiconductor trace, and it is static,
 * so it costs nothing at runtime and cannot jank.
 */
export default function Lattice({ className = '' }) {
  const cols = 13
  const rows = 6
  const gapX = 40
  const gapY = 34

  // Nodes rise toward the right, the same gesture as the trajectory line.
  const nodes = []
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const lift = Math.pow(c / (cols - 1), 2) * 46
      nodes.push({ x: c * gapX, y: r * gapY + 14 - lift, c, r })
    }
  }
  const at = (c, r) => nodes[c * rows + r]

  return (
    <svg
      viewBox={`-10 -40 ${(cols - 1) * gapX + 20} ${(rows - 1) * gapY + 80}`}
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <g stroke="currentColor" strokeWidth="0.75" className="text-neutral-200">
        {nodes.map((n) => (
          <g key={`${n.c}-${n.r}`}>
            {n.c < cols - 1 && (
              <line x1={n.x} y1={n.y} x2={at(n.c + 1, n.r).x} y2={at(n.c + 1, n.r).y} />
            )}
            {n.r < rows - 1 && (
              <line x1={n.x} y1={n.y} x2={at(n.c, n.r + 1).x} y2={at(n.c, n.r + 1).y} />
            )}
          </g>
        ))}
      </g>

      {/* One trace picked out of the lattice: the trajectory through the material. */}
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-brand-600"
        points={Array.from({ length: cols }, (_, c) => {
          const r = Math.max(0, rows - 1 - Math.round((c / (cols - 1)) * (rows - 1)))
          const n = at(c, r)
          return `${n.x},${n.y}`
        }).join(' ')}
      />
      {Array.from({ length: cols }, (_, c) => {
        const r = Math.max(0, rows - 1 - Math.round((c / (cols - 1)) * (rows - 1)))
        const n = at(c, r)
        return <circle key={c} cx={n.x} cy={n.y} r="2.5" className="fill-brand-600" />
      })}
    </svg>
  )
}
