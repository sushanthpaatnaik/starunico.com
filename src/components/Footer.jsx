import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navigation, site } from '../data/site.js'

const legal = [
  { name: 'Privacy', to: '/privacy' },
  { name: 'Terms', to: '/terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Starunico home">
              <Logo className="h-8 w-auto" />
              <span className="text-lg font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-600">
              {site.descriptor}
            </p>
          </div>

          <FooterColumn title="Firm">
            {[...navigation, { name: 'For founders', to: '/founders' }].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-neutral-600 transition hover:text-neutral-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </FooterColumn>


          <FooterColumn title="Legal">
            {legal.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="text-neutral-600 transition hover:text-neutral-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-neutral-600 transition hover:text-neutral-900"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">{children}</ul>
    </div>
  )
}
