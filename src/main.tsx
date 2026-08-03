import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { recoverFromStaleChunk } from './libs/stale-chunk-helper.ts'

// Vite fires this when a lazy chunk's modulepreload 404s, which is what a
// visitor on a cached copy of a previous deploy hits.
window.addEventListener('vite:preloadError', (event) => {
  if (recoverFromStaleChunk((event as Event & { payload?: unknown }).payload)) {
    event.preventDefault()
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
