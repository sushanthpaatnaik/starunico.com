import Button from './Button.jsx'
import Icon from './Icon.jsx'

export default function CallToAction({
  title = 'Ready to build something good?',
  description = 'Clone the template, change the theme tokens, and have a site live before the end of the day.',
  primary = { label: 'Get started free', to: '/contact' },
  secondary = { label: 'View pricing', to: '/pricing' },
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 text-center sm:px-16 dark:bg-slate-900/80 dark:ring-1 dark:ring-slate-800">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-pink-500 opacity-30 blur-3xl"
          />
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-slate-300">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primary.to} size="lg" variant="onDark" className="w-full sm:w-auto">
              {primary.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Button to={secondary.to} size="lg" variant="onDarkGhost" className="w-full sm:w-auto">
              {secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
