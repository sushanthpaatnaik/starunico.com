import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { navigation, site } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'text-brand-700'
        : 'text-neutral-600 hover:text-neutral-900'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition ${
        scrolled
          ? 'border-neutral-200 bg-white/85 backdrop-blur'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg"
          aria-label={`${site.name} home`}
        >
          <Logo className="h-8 w-auto" />
          <span className="text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">

          {/* Wrapper handles the responsive hide so it cannot clash with the button's own display utility. */}
          <div className="hidden sm:block">
            <Button to="/contact" size="sm">
              Present your technology
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full p-2 text-neutral-600 transition hover:bg-neutral-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-neutral-200 bg-white md:hidden"
        >
          <ul className="container-page space-y-1 py-4">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-base font-medium ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Button to="/contact" onClick={closeMenu} className="w-full">
                Present your technology
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
