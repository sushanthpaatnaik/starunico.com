import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900 ' +
    'dark:bg-brand-500 dark:hover:bg-brand-400 dark:active:bg-brand-300 dark:text-neutral-950',
  secondary:
    'bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200',
  outline:
    'border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 ' +
    'dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-800',
  ghost:
    'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
  // For panels that are dark in both themes (e.g. the call-to-action band).
  onDark: 'bg-white text-neutral-900 shadow-sm hover:bg-neutral-200 active:bg-neutral-300',
  onDarkGhost: 'text-neutral-200 hover:bg-white/10 hover:text-white',
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
