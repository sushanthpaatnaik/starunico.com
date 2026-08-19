import { createContext, use } from 'react'

export const TransitionContext = createContext({ phase: 'idle', go: () => {} })

export const useTransition = () => use(TransitionContext)

export const EXIT_MS = 280
export const ENTER_MS = 300

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
