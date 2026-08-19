import Button from './Button.jsx'
import Icon from './Icon.jsx'

export default function CallToAction({
  title = 'Present your technology',
  description = 'If you are building something technically differentiated and early, we would like to hear about it.',
  primary = { label: 'Introduce your company', to: '/contact' },
  secondary = { label: 'Explore our philosophy', to: '/philosophy' },
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl bg-neutral-950 px-6 py-20 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 opacity-25 blur-3xl"
          />
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-neutral-300">{description}</p>
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
