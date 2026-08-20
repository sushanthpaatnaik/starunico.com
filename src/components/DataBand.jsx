/**
 * A horizontal data band: numbered rows separated by rules. Replaces card grids
 * where the content is a list of statements rather than discrete objects.
 */
/**
 * `mobileLimit` trims the band on small screens, where six stacked rows run to
 * most of a phone screen each. The remainder is not lost — the caller links to
 * the page that carries the full set.
 */
export default function DataBand({ items, mobileLimit }) {
  return (
    <ol className="border-t border-line">
      {items.map((item, index) => (
        <li
          key={item.title}
          className={`items-baseline gap-x-8 gap-y-2 border-b border-line py-6 sm:grid sm:grid-cols-[4rem_16rem_1fr] ${
            mobileLimit && index >= mobileLimit ? 'hidden' : 'grid'
          }`}
        >
          <span className="meta text-ink-3">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-semibold tracking-tight">{item.title}</h3>
          <p className="text-pretty text-ink-2">{item.description}</p>
        </li>
      ))}
    </ol>
  )
}
