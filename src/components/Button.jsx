import { Link } from 'react-router-dom'

/**
 * Squared, rule-based treatment rather than a pill. The arrow steps on hover and
 * the underline extends — the same 200ms precision easing the rest of the site
 * uses, so a button reads as part of the instrument rather than a web control.
 */
const base =
  'group/btn inline-flex items-center justify-center gap-2.5 font-semibold tracking-tight transition ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-2 active:bg-accent-2',
  secondary: 'bg-panel text-panel-ink hover:bg-panel-hover',
  outline:
    'border border-line-2 text-ink hover:border-line-2 hover:bg-canvas-2',
  ghost: 'text-ink-2 hover:bg-surface-2',
  // For panels that are dark in both themes.
  onDark: 'bg-panel-solid text-panel-solid-ink hover:bg-panel-solid-hover',
  onDarkGhost: 'text-panel-ink/70 hover:bg-panel-ink/10 hover:text-panel-ink',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  const Component = as ?? 'button'
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
