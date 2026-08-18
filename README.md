# Starunico — React + Vite + Tailwind website template

A modern, responsive marketing-site template. Five prebuilt pages, a small set of
reusable components, class-based dark mode, and content kept in a single data file
so copy changes never touch component code.

## Stack

| | |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Routing | React Router 7 |
| Linting | ESLint 10 (flat config, react-hooks + react-refresh) |

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # static bundle in dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

## Project structure

```
src/
├── App.jsx              # route table
├── main.jsx             # entry point
├── index.css            # Tailwind import + theme tokens
├── data/site.js         # ALL site copy: nav, features, pricing, FAQ, team
├── hooks/useTheme.js    # dark-mode state, persisted to localStorage
├── components/
│   ├── Layout.jsx       # shell: skip link, navbar, main, footer
│   ├── Navbar.jsx       # sticky nav, mobile drawer, theme toggle
│   ├── Footer.jsx
│   ├── Hero.jsx         # gradient hero + stat row
│   ├── Section.jsx      # section wrapper with eyebrow/title/description
│   ├── PageHeader.jsx   # inner-page hero
│   ├── FeatureGrid.jsx
│   ├── Testimonials.jsx
│   ├── PricingTable.jsx # monthly/annual toggle
│   ├── FAQ.jsx          # native <details> accordion
│   ├── CallToAction.jsx
│   ├── Button.jsx       # variants: primary, secondary, outline, ghost, onDark
│   ├── Icon.jsx         # inline SVG icon set
│   ├── Logo.jsx
│   └── ScrollToTop.jsx  # resets scroll on navigation
└── pages/               # Home, Features, Pricing, About, Contact, NotFound
```

## Making it yours

**Content.** Edit `src/data/site.js`. Site name, navigation, features, stats,
testimonials, pricing plans, FAQs and team members all live there.

**Colour and type.** Edit the `@theme` block in `src/index.css`. The `--color-brand-*`
scale drives every accent in the site, so changing those nine values rebrands it. The
`--font-sans` token sets the type stack.

**Adding a page.**

1. Create the component in `src/pages/`.
2. Add a `<Route>` for it in `src/App.jsx`.
3. Add an entry to the `navigation` array in `src/data/site.js`.

## Notes

- **Dark mode** is class-based. An inline script in `index.html` applies the stored
  or system theme before first paint, so there is no flash of the wrong theme.
  `useTheme` keeps the `dark` class on `<html>` in sync afterwards.
- **Button classes.** `Button` composes its own display and colour utilities, so pass
  responsive visibility on a wrapper element rather than in `className` — two
  competing utilities for the same CSS property resolve by stylesheet order, not by
  the order you list them.
- **The contact form is a front-end demo.** `src/pages/Contact.jsx` validates input
  and shows a success state, but does not send anything. Wire `handleSubmit` up to
  your own endpoint or a service such as Formspree.
- **Client-side routing.** `npm run build` emits a static bundle. Configure your host
  to rewrite unknown paths to `index.html`, or deep links will 404.
- **Accessibility.** Skip link, semantic landmarks, visible focus rings, labelled
  form controls with `aria-invalid`/`aria-describedby`, and a `prefers-reduced-motion`
  override are all in place.

## Licence

MIT — see [LICENSE](./LICENSE).
