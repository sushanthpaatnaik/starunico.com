import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navigation, site } from '../data/site.js'

// TODO: add the real policy pages before launch.
const legal = [
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Starunico home">
              <Logo className="h-8 w-auto" />
              <span className="text-lg font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-400">
              {site.descriptor}
            </p>
          </div>

          <FooterColumn title="Firm">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </FooterColumn>


          <FooterColumn title="Legal">
            {legal.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
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
      <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">{children}</ul>
    </div>
  )
}
