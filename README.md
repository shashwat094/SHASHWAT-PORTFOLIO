# SHASHWAT_OS — Developer Portfolio

A dark, minimal developer portfolio with real personality: a short boot-up
moment on load, a genuinely working terminal, a live AI-project tie-in, and a
scripted "Nova" guide bot — built to be clean enough to send to a hiring
manager, not a hacker-movie cosplay.
Built with React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, Three.js /
React Three Fiber, and Lenis smooth scroll.

---

## 1. Quick start

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build      # production build → /dist
npm run preview    # preview the production build locally
```

---

## 2. Before you deploy — 3 things to drop in

| What | Where | Why |
|---|---|---|
| **Your photo** | `public/pic.jpeg` | Shown in the Hero section. Until it's there, a styled "AWAITING UPLINK" placeholder shows automatically — nothing looks broken. |
| **Your résumé** | `public/resume.pdf` | **Already included** — the PDF you uploaded has been copied straight into `public/resume.pdf`, so the "Download Resume" button and the terminal's `resume` command work right now, out of the box. Replace this file any time you update your résumé. |
| **EmailJS keys** | `src/data/content.ts` → `SITE.emailjs` | Powers the Contact form. Free tier at emailjs.com. Until you add real keys, submitting the form shows a "your message is ready" panel with an **Open in Email App** button and a **Copy Message** button — so it always gives the visitor a real, working way to reach you, even with no backend configured. |
| **Nova AI live URL** | `src/data/content.ts` → `SITE.novaUrl` | Already set to `nova-ai-bice-five.vercel.app`. Update this if that URL ever changes — both the Projects card and the Nova guide bot's "Try the full Nova AI" link read from this one value. |

Everything else (name, bio, projects, skills, experience, education, testimonials, links)
lives in **one file**: `src/data/content.ts`. Edit that file and the whole site updates.

Your GitHub stats section (`#github`) pulls **live data** from the public GitHub REST API
for `SITE.githubUsername` (currently `shashwat094`) — repo count, followers, and your 6
most recently updated repos, fetched in the browser, no backend required.

---

## 3. What's real vs. simulated

Everything in the original brief that needs a *paid API or a backend server* has been built
as a convincing, fully-working **client-side simulation** instead — so the site is 100%
static, free to host, and still feels alive:

- **Discord status / Spotify now-playing** — not included. Both require a running backend
  (OAuth + a server to poll the API) that a static site can't host. A great "phase 2" once
  you have a backend (e.g. a small Vercel/Netlify function).
- **GitHub stats** — this one *is* live and real, no simulation needed (see above).
- **AI chatbot** — not included as a real LLM integration (that needs a paid API key and a
  backend to keep it secret). The **terminal** fills this role instead: a genuinely working
  command shell with 20+ real commands.
- **Visitor counter** — not included; a real one needs a database. Easiest real
  implementation later: a tiny serverless function + Redis/Upstash counter.
- **Weather widget** — implemented as a clearly labeled "SIMULATED FORECAST" in the
  terminal's `weather` command, since real weather needs an API key.

Nothing pretends to be live when it isn't — anything simulated is explicitly labeled as
such in its own UI.

---

## 4. Signature features

- **Nova, the guide bot** (bottom-right on every page): a scripted chat widget that
  explains the page based on what's actually in `src/data/content.ts` — About, Skills,
  Projects, Experience, Contact, and a dedicated answer about the real Nova AI project.
  It also notices which section you're scrolled to and mentions it once. It's
  intentionally *not* wired to a real LLM (that needs a paid API key and a backend to
  keep it secret) — it's a fast, honest, zero-cost stand-in that links out to the real
  thing. See section 3 below to point it at your actual Nova AI deployment.
- **BIOS boot sequence → desktop**: a short, skippable "logging into an OS" moment on
  first load, not a bolted-on loading spinner.
- **Interactive terminal** (`#terminal`): real command history (up/down arrows),
  tab-autocomplete, live command suggestions as you type, a full-screen mode
  (click the accent-colored dot or the "fullscreen" button), and tap-to-run command
  chips so it's just as usable on a phone as a keyboard. Commands include
  `hack` (fake intrusion sequence), `matrix` (full-screen matrix rain, a self-aware
  easter egg — not the site's default look), `theme` (cycles the site's accent color
  live), `ascii`, `joke`, `sudo`, and more. Type `help` for the full list.
- **Konami code easter egg**: Up Up Down Down Left Right Left Right B A anywhere on the
  site triggers confetti.
- **Custom cursor, command palette (Ctrl/Cmd+K)**, synthesized UI sound effects (Web
  Audio, so no audio files to ship), animated Three.js particle field + wireframe globe
  background with mouse parallax, and full fallback on touch devices (the custom cursor
  and `cursor:none` automatically disable on touch/mobile).

---

## 5. Project structure

```
src/
  data/content.ts        <- single source of truth for all text content
  context/                <- SoundContext (Web Audio SFX), ThemeContext (accent color)
  hooks/                  <- Lenis smooth scroll, typewriter, count-up, Konami code, sound
  components/
    system/               <- BootLoader, Navbar, CustomCursor, Background3D,
                             CommandPalette, MatrixRain
    sections/             <- Hero, About, Terminal, Skills, Projects, Experience,
                             Education, Services, Testimonials, Achievements,
                             GithubStats, Contact, Footer
    ui/                   <- SectionHeading, MagneticButton, ProfilePhoto
```

## 6. Push to GitHub

```bash
cd shashwat-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first — github.com → New repository — don't
initialize it with a README, or the push above will need `git pull --rebase`
first.)

## 7. Deploying

The build uses a **relative base path** (`base: './'` in `vite.config.ts`), so
the exact same build works whether it's served from a domain root or a
subfolder — nothing to change per host.

### Option A — Vercel (recommended)

A `vercel.json` is already included with the right build command, output
directory, and an SPA rewrite rule.

1. Push the repo to GitHub (step 6 above).
2. Go to vercel.com → **Add New → Project → Import Git Repository** → pick this repo.
3. Vercel auto-detects everything from `vercel.json`. Click **Deploy** — no
   config needed.
4. Every future `git push` auto-deploys, with a preview URL for branches/PRs.

Netlify works identically (**Add new site → Import from GitHub**; defaults:
build command `npm run build`, publish directory `dist`).

### Option B — GitHub Pages (also included, zero extra setup)

This repo also has `.github/workflows/deploy.yml`, which builds and deploys
automatically on every push to `main` if you'd rather host it on GitHub
directly instead of Vercel:

1. On GitHub: **Settings → Pages → Source → GitHub Actions**.
2. Push to `main` (or re-run the workflow from the **Actions** tab).
3. Your site goes live at `https://<your-username>.github.io/<your-repo>/`,
   and stays up to date on every future push to `main`.

Either way, no server is required — it's a fully static build.

## 8. Tech stack

React 19, Vite 8, TypeScript, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger,
Three.js / @react-three/fiber, Lenis, @emailjs/browser, react-icons, canvas-confetti.
