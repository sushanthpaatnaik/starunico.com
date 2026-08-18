/**
 * The site mark. The artwork lives in `public/logo.svg` rather than in this
 * component, so swapping the logo means replacing one file — the header, the
 * footer and the favicon in index.html all point at it.
 *
 * Using a different format? Drop the file in `public/` and change both this
 * `src` and the favicon `href` in index.html.
 *
 * Width is left to `w-auto` so a non-square mark keeps its aspect ratio.
 */
export default function Logo({ className = 'h-8 w-auto' }) {
  return <img src="/logo.svg" alt="" className={className} />
}
