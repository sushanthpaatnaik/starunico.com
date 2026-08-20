import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor } from '../lib/meta.js'

/**
 * Keeps the document head in step with the route.
 *
 * The tags are edited in place rather than rendered, because the Worker has
 * already written the correct values into the served HTML: mutating what is
 * there keeps exactly one of each tag and leaves the first paint untouched, so
 * this only ever matters for client-side navigation.
 */
function ensure(selector, create) {
  const existing = document.head.querySelector(selector)
  if (existing) return existing
  const node = create()
  document.head.append(node)
  return node
}

function setMeta(key, attribute, content) {
  ensure(`meta[${attribute}="${key}"]`, () => {
    const node = document.createElement('meta')
    node.setAttribute(attribute, key)
    return node
  }).setAttribute('content', content)
}

export default function DocumentHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description, canonical } = metaFor(pathname)

    document.title = title
    setMeta('description', 'name', description)
    setMeta('og:title', 'property', title)
    setMeta('og:description', 'property', description)

    /*
     * A 404 has no canonical URL of its own, so the tag goes rather than being
     * left pointing at whatever page was on screen before it. Navigating back
     * to a real page has to put it back — which is why these are created when
     * missing rather than only updated.
     */
    if (canonical) {
      ensure('link[rel="canonical"]', () => {
        const node = document.createElement('link')
        node.rel = 'canonical'
        return node
      }).setAttribute('href', canonical)
      setMeta('og:url', 'property', canonical)
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
  }, [pathname])

  return null
}
