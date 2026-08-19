import { createContext, use } from 'react'

export const TransitionContext = createContext({ phase: 'idle', go: () => {} })

export const useTransition = () => use(TransitionContext)

/**
 * Transition timings live in CSS (`--t-exit` / `--t-enter`) so the animations
 * and the JavaScript that sequences them cannot drift apart, and so the mobile
 * budget is expressed once, as a media query, rather than duplicated here.
 */
const readMs = (name, fallback) => {
  if (typeof window === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name)
  const ms = raw.trim().endsWith('ms')
    ? parseFloat(raw)
    : parseFloat(raw) * 1000
  return Number.isFinite(ms) && ms > 0 ? ms : fallback
}

export const exitMs = () => readMs('--t-exit', 280)
export const enterMs = () => readMs('--t-enter', 300)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
