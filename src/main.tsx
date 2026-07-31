import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// A previously-clicked in-page link (e.g. "#terminal") can leave a fragment
// in the URL. On the next visit the browser auto-jumps straight to that
// element before React even mounts, which looks like "the site opens
// scrolled to the wrong section". Clear it before anything renders.
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
