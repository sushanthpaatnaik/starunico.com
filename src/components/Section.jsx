export default function Section({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  children,
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <div className={`max-w-2xl ${alignment}`}>
            {eyebrow && (
              <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase dark:text-brand-400">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-pretty text-slate-600 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={eyebrow || title || description ? 'mt-14' : ''}>{children}</div>
      </div>
    </section>
  )
}
