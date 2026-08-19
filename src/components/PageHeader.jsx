export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-neutral-200 bg-neutral-50">
      <div className="container-page py-20 text-center sm:py-24">
        {eyebrow && (
          <p data-reveal="meta" className="text-sm font-semibold tracking-widest text-brand-700 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p data-reveal="copy" className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
