import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildSync } from 'esbuild'

/**
 * Inlines the theme resolver into <head> as a blocking script.
 *
 * The theme has to be decided before the first paint, which rules out a module
 * script — those are deferred, so the page would paint in one theme and correct
 * to the other. Bundling `src/theme-boot.js` here keeps that decision in real
 * source, shared with the running app, rather than as a hand-copied duplicate
 * living in the HTML.
 */
function themeBoot() {
  return {
    name: 'starunico-theme-boot',
    transformIndexHtml() {
      const entry = fileURLToPath(new URL('./src/theme-boot.js', import.meta.url))
      const { outputFiles } = buildSync({
        entryPoints: [entry],
        bundle: true,
        format: 'iife',
        minify: true,
        target: 'es2020',
        write: false,
      })

      return [
        {
          tag: 'script',
          attrs: { 'data-theme-boot': '' },
          children: outputFiles[0].text,
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [themeBoot(), react(), tailwindcss()],
  server: {
    // `npm run dev:api` runs the Worker on 8787, so /api works with HMR too.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
})
