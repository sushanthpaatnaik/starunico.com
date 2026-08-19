export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-neutral-200 bg-neutral-50">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -z-10 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-brand-300 opacity-20 blur-3xl"
      />
      <div className="container-page py-20 text-center sm:py-24">
        {eyebrow && (
          <p className="text-sm font-semibold tracking-widest text-brand-700 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
