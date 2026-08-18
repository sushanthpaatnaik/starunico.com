import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navigation, site } from '../data/site.js'

const resources = [
  { name: 'Documentation', href: '#' },
  { name: 'Changelog', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Status', href: '#' },
]

const legal = [
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
  { name: 'Licence', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2" aria-label="Starunico home">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-bold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-400">
              {site.description}
            </p>
          </div>

          <FooterColumn title="Site">
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

          <FooterColumn title="Resources">
            {resources.map((item) => (
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
          <ul className="flex items-center gap-6">
            {site.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
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
