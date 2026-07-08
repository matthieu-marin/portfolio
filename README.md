# Portfolio — Matthieu Marin

Personal portfolio built as an interactive **VS Code-style IDE**: file explorer, tabs, status bar, a working fake terminal… the whole editor experience, used as a portfolio. 100% static — no backend.

**Live:** https://pvcsam.github.io/portfolio-dev/

> Tip: poke around. The IDE hides a few easter eggs for the curious — the terminal's `help` command is a good place to start.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript 5 |
| Bundler | Vite (`@vitejs/plugin-react-swc`) |
| Styling | Tailwind CSS v4 + SCSS theme variables |
| UI primitives | Radix UI (shadcn-style components) |
| Animation | `motion/react` |
| i18n | i18next — French (default) / English |

## Features

- **IDE shell** — file explorer, multi-tab navigation, status bar, resizable output panel.
- **Interactive terminal** — 40+ commands (`help`, `whoami`, `skills`, `ls`, …).
- **8 visual themes** — dark, light, steampunk, pixel, cyberpunk, synthwave, galaxy, nord — some with animated canvas backgrounds. Auto-detects `prefers-color-scheme` on first visit.
- **Bilingual** — full FR/EN switch, persisted.
- **Single source of truth for content** — everything displayed (profile, experiences, projects, skills) lives in `src/features/pages/data/` and is rendered from there.

## Getting started

```bash
npm install
npm run dev       # dev server on http://localhost:3000
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Vite dev server (port 3000, exposed on LAN) |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
├── app/App.tsx          # Root: tab state, theme wiring (no router — in-memory navigation)
├── features/
│   ├── pages/           # One component per page
│   │   ├── data/        # ← content lives here (profile, experiences, projects, skills)
│   │   └── recruiter/   # Page rendering components
│   └── output-panel/    # Terminal & output panel
├── i18n/                # i18next config + fr/en locales
├── shared/
│   ├── components/      # IDE chrome (explorer, tabs, status bar…) + UI kit
│   ├── contexts/        # Theme, navigation, edit state
│   └── effects/         # Per-theme canvas effects
└── styles/              # SCSS themes (one file per theme)
```

## Editing content

All displayed content comes from `src/features/pages/data/` — edit those files, never the components. UI strings go through i18next (`src/i18n/locales/fr.json` / `en.json`), always in both languages.

Static assets go in `public/`:

- `public/cv-matthieu-marin.pdf` — the downloadable CV
- `public/images/profile/avatar.jpg` — profile photo (layout adapts if absent)

## Contact form

Defaults to `mailto:`. To send through [Formspree](https://formspree.io) instead, set `VITE_FORMSPREE_ID` at build time.

## Deployment

Every merge to `main` deploys automatically to GitHub Pages via `.github/workflows/deploy.yml` (build → upload artifact → deploy). One-time repo setting: **Settings → Pages → Source → GitHub Actions**.

The site is host-agnostic: the workflow sets `VITE_BASE=/<repo>/` for the Pages sub-path; any other static host (Vercel, Netlify…) can just run `npm run build` and serve `build/` from the root.
