import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import ScrollTrajectory from './ScrollTrajectory.jsx'
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
    `nav-link ${isActive ? 'nav-link--active' : ''}`

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
          {navigation.map((item, index) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                <span aria-hidden="true" className="nav-link__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="nav-link__rule" aria-hidden="true" />
                <span className="nav-link__label">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">

          {/* Wrapper handles the responsive hide so it cannot clash with the button's own display utility. */}
          <div className="hidden sm:block">
            <Button to="/founders" size="sm">
              Present your technology
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-sm p-2 text-neutral-600 transition hover:bg-neutral-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      <ScrollTrajectory />

      {open && (
        <div
          id="mobile-menu"
          className="menu-panel fixed inset-0 top-16 z-40 bg-neutral-950 md:hidden"
        >
          <nav className="container-page flex h-full flex-col justify-between py-10" aria-label="Menu">
            <ul>
              {navigation.map((item, index) => (
                <li key={item.to} className="border-b border-white/10">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-baseline gap-5 py-5 text-3xl tracking-tight transition-colors ${
                        isActive ? 'text-brand-400' : 'text-white'
                      }`
                    }
                  >
                    <span aria-hidden="true" className="meta text-neutral-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div>
              <Button to="/founders" onClick={closeMenu} variant="onDark" size="lg" className="w-full">
                Present your technology
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
              <p className="meta mt-6 text-neutral-500">{site.descriptor}</p>
            </div>
          </nav>
        </div>
      )}

    </header>
  )
}
