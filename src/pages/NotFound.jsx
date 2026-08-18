import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase dark:text-brand-400">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
        The page you were looking for has moved, or never existed in the first place.
      </p>
      <Button to="/" size="lg" className="mt-10">
        Back to home
      </Button>
    </section>
  )
}
