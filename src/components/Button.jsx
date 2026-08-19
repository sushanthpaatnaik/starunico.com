import { Link } from 'react-router-dom'

/**
 * Squared, rule-based treatment rather than a pill. The arrow steps on hover and
 * the underline extends — the same 200ms precision easing the rest of the site
 * uses, so a button reads as part of the instrument rather than a web control.
 */
const base =
  'group/btn inline-flex items-center justify-center gap-2.5 font-semibold tracking-tight transition ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900',
  secondary: 'bg-neutral-950 text-white hover:bg-neutral-800',
  outline:
    'border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50',
  ghost: 'text-neutral-700 hover:bg-neutral-100',
  // For panels that are dark in both themes.
  onDark: 'bg-white text-neutral-950 hover:bg-neutral-200',
  onDarkGhost: 'text-neutral-300 hover:bg-white/10 hover:text-white',
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
