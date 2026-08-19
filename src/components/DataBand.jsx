/**
 * A horizontal data band: numbered rows separated by rules. Replaces card grids
 * where the content is a list of statements rather than discrete objects.
 */
export default function DataBand({ items }) {
  return (
    <ol className="border-t border-neutral-200">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="grid items-baseline gap-x-8 gap-y-2 border-b border-neutral-200 py-6 sm:grid-cols-[4rem_16rem_1fr]"
        >
          <span className="meta text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-semibold tracking-tight">{item.title}</h3>
          <p className="text-pretty text-neutral-600">{item.description}</p>
        </li>
      ))}
    </ol>
  )
}
