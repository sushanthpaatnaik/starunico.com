# Starunico — React + Vite + Tailwind website template

A modern, responsive marketing-site template that deploys to Cloudflare Workers with
`npx wrangler deploy`. Five prebuilt pages, a small set of reusable components,
class-based dark mode, a JSON API on `/api/*`, and content kept in a single data file
so copy changes never touch component code.

## Stack

| | |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Routing | React Router 7 |
| Linting | ESLint 10 (flat config, react-hooks + react-refresh) |
| Hosting | Cloudflare Workers (static assets + Worker API) |

## Getting started

```bash
npm install
npm run dev              # Vite dev server with HMR at http://localhost:5173
npm run dev:api          # Worker API at http://localhost:8787 (second terminal)
npm run build            # static bundle in dist/
npm run preview:worker   # build, then serve site + API exactly as in production
npm run deploy           # build, then wrangler deploy
npm run lint             # ESLint
```

`npm run dev` proxies `/api` to `http://127.0.0.1:8787`, so run `npm run dev:api`
alongside it to work on the front end and the API together with HMR intact.

## Project structure

```
worker/
├── index.js             # fetch handler: routing, CORS, method + error handling
├── routes.js            # the API endpoints
└── http.js              # JSON/error/CORS response helpers
src/
├── App.jsx              # route table
├── main.jsx             # entry point
├── index.css            # Tailwind import + theme tokens
├── data/site.js         # ALL site copy: nav, features, pricing, FAQ, team
├── lib/contact.js       # contact validation shared by the form and the Worker
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

## Deploying to Cloudflare Workers

```bash
npx wrangler login   # once
npm run deploy       # builds, then npx wrangler deploy
```

`wrangler.jsonc` wires the two halves together:

```jsonc
"assets": {
  "directory": "./dist",
  "binding": "ASSETS",
  "not_found_handling": "single-page-application",
  "run_worker_first": ["/api", "/api/*"]
}
```

Static files are served by Cloudflare's asset layer without invoking the Worker, so
they cost nothing and stay fast. Unknown paths fall back to `index.html`, which is
what makes client-side routes like `/pricing` work on a hard refresh. Only `/api`
and `/api/*` run the Worker — `/api` is listed separately because the `/api/*`
pattern does not match the bare path.

Rename the Worker by changing `name` in `wrangler.jsonc`. To put it on your own
domain, add a `routes` entry pointing at a zone you control.

### API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api` | Self-describing index of the endpoints. |
| `GET` | `/api/health` | Liveness probe. |
| `GET` | `/api/content` | Every site content collection in one payload. |
| `GET` | `/api/pricing?cadence=monthly\|annual` | Plans, with the annual discount applied. |
| `GET` | `/api/contact` | Field limits and the allowed subject values. |
| `POST` | `/api/contact` | Submit the contact form. |

Errors share one shape, so a client can handle them generically:

```json
{ "error": { "status": 422, "message": "Some fields need attention.",
             "fields": { "email": "That does not look like a valid email address." } } }
```

`POST /api/contact` returns `201` on success, `422` with per-field messages on
invalid input, `415` for a non-JSON content type, `413` for an oversized body, and
`400` for malformed JSON. Unknown routes return `404` and wrong methods return `405`
with an `Allow` header. `OPTIONS` preflights and CORS headers are handled centrally.

### Configuration

| Name | Where | Purpose |
| --- | --- | --- |
| `ALLOWED_ORIGINS` | `vars` in `wrangler.jsonc` | Comma-separated CORS allow-list. Defaults to `*`. |
| `CONTACT_WEBHOOK_URL` | secret | Optional. Contact submissions are POSTed here. |

```bash
npx wrangler secret put CONTACT_WEBHOOK_URL
```

Without a webhook, submissions are logged — watch them with `npx wrangler tail`.

## Notes

- **Dark mode** is class-based. An inline script in `index.html` applies the stored
  or system theme before first paint, so there is no flash of the wrong theme.
  `useTheme` keeps the `dark` class on `<html>` in sync afterwards.
- **Button classes.** `Button` composes its own display and colour utilities, so pass
  responsive visibility on a wrapper element rather than in `className` — two
  competing utilities for the same CSS property resolve by stylesheet order, not by
  the order you list them.
- **Validation runs twice, from one source.** `src/lib/contact.js` is imported by both
  the React form and the Worker, so the instant feedback in the browser and the
  authoritative check on the server can never drift apart.
- **The contact form has no persistence yet.** The Worker validates a submission and
  returns an id, then either forwards it to `CONTACT_WEBHOOK_URL` or logs it. Point it
  at a queue, D1, or an email service for a real inbox.
- **The public POST endpoint is unauthenticated.** Add a Cloudflare
  [Rate Limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
  or a Turnstile check before pointing real traffic at it. A honeypot field catches
  naive bots, and nothing more.
- **Hosting elsewhere.** `npm run build` emits a plain static bundle in `dist/`. On any
  other host, rewrite unknown paths to `index.html` or deep links will 404 — and the
  `/api/*` routes will not exist.
- **Accessibility.** Skip link, semantic landmarks, visible focus rings, labelled
  form controls with `aria-invalid`/`aria-describedby`, and a `prefers-reduced-motion`
  override are all in place.

## Licence

MIT — see [LICENSE](./LICENSE).
