export default function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  children,
}) {
  const centred = align === 'center'
  const hasHeader = eyebrow || title || description

  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        {hasHeader && (
          <div className={centred ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl text-left'}>
            {(eyebrow || index != null) && (
              <p className="meta flex items-baseline gap-3 text-brand-700">
                {index != null && (
                  <span className="text-neutral-400 tabular-nums">
                    {String(index).padStart(2, '0')}
                  </span>
                )}
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 text-3xl tracking-tight text-balance sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-pretty text-neutral-600">{description}</p>
            )}
          </div>
        )}
        <div className={hasHeader ? 'mt-14' : ''}>{children}</div>
      </div>
    </section>
  )
}
