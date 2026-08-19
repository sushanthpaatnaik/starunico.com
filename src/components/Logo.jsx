/**
 * The site mark. The artwork lives in `public/logo.png` rather than in this
 * component, so swapping the logo means replacing one file — the header, the
 * footer and the favicon in index.html all point at it.
 *
 * Width is left to `w-auto` so the mark keeps its aspect ratio; the source is
 * 131x169, giving enough resolution for a 32px-tall render on a 3x display.
 */
export default function Logo({ className = 'h-8 w-auto' }) {
  return <img src="/logo.png" alt="" className={className} />
}
