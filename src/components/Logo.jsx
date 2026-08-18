export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="starunico-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.63 0.19 275)" />
          <stop offset="100%" stopColor="oklch(0.68 0.2 350)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#starunico-logo)" />
      <path
        fill="#fff"
        d="M16 6.5l2.65 6.16 6.68.56-5.07 4.4 1.53 6.53L16 20.7l-5.79 3.45 1.53-6.53-5.07-4.4 6.68-.56z"
      />
    </svg>
  )
}
