import Button from './Button.jsx'
import Icon from './Icon.jsx'

export default function CallToAction({
  title = 'Present your technology',
  description = 'If you are building something technically differentiated and early, we would like to hear about it.',
  primary = { label: 'Present your technology', to: '/founders' },
  secondary = { label: 'Explore our thesis', to: '/thesis' },
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-sm bg-panel px-6 py-20 text-center sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-panel-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-panel-ink/70">{description}</p>
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
