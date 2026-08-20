import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navigation, offices, site } from '../data/site.js'

const legal = [
  { name: 'Privacy', to: '/privacy' },
  { name: 'Terms', to: '/terms' },
]

/**
 * The address below the country heading, which already names the country — so
 * these lines carry the street and then the city with its postcode. Where no
 * street is confirmed the city stands alone rather than the entry collapsing
 * to a country with nothing under it.
 */
function addressLines(office) {
  const locality = office.postcode ? `${office.city} – ${office.postcode}` : office.city
  return office.street ? [`${office.street},`, locality] : [locality]
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-2">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Starunico home">
              <Logo className="h-8 w-auto" />
              <span className="text-lg font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-2">
              {site.descriptor}
            </p>
          </div>

          <FooterColumn title="Firm">
            {[...navigation, { name: 'For founders', to: '/founders' }].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-ink-2 transition hover:text-ink"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </FooterColumn>


          <FooterColumn title="Offices" spacing="space-y-6">
            {offices.map((office) => (
              <li key={office.city}>
                {/* Role above name, the same eyebrow-then-content order the
                    rest of the site uses, so the two never compete inline. */}
                <p className="meta text-ink-3">{office.role}</p>
                <p className="mt-1.5 font-medium text-ink">{office.region}</p>
                <address className="mt-1 block leading-relaxed text-ink-2 not-italic">
                  {addressLines(office).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {legal.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="text-ink-2 transition hover:text-ink"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <p className="mt-16 max-w-2xl border-t border-line pt-10 text-2xl tracking-tight text-balance sm:text-3xl/tight">
          Backing difficult technology with patient capital.
        </p>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-ink-2">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-ink-2 transition hover:text-ink"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children, spacing = 'space-y-3' }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-ink uppercase">
        {title}
      </h3>
      <ul className={`mt-4 text-sm ${spacing}`}>{children}</ul>
    </div>
  )
}
