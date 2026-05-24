# Portfolio Project — Context for Claude

## Stack at a glance

| Layer | Choice |
|-------|--------|
| Framework | React 18.3 + TypeScript 4.9 |
| Bundler | Vite 6.3.5 + `@vitejs/plugin-react-swc` |
| Styling | Tailwind CSS v4 (prebuilt in `src/index.css`) + Sass (`src/styles/main.scss`) |
| UI Kit | shadcn-style components built on Radix UI + `cva` + `cn()` |
| Animation | `motion/react` (toutes les animations) |
| i18n | i18next + react-i18next — FR default, EN available |
| Charts | recharts |
| State | React Context + local state (no Redux / Zustand / React Query) |
| Path alias | `@` → `./src` |
| Build output | `build/` (not `dist/`) |
| Dev port | 3000 |

## Project concept

A **VS Code–style IDE shell** used as a portfolio. The UI mimics a code editor with a title bar, file explorer, tab bar, code area (pages), status bar, and a fake terminal. No React Router — navigation is pure in-memory state in `App.tsx`.

## Directory map

```
src/
├── app/App.tsx                 # Root: tab state, theme effects, event listeners
├── main.tsx                   # createRoot, imports App, index.css, main.scss, i18n
├── index.css                  # Generated Tailwind v4 stylesheet
├── features/
│   ├── pages/                 # Home, About, Experience, Projects, Skills, Contact
│   └── output-panel/          # TerminalView, OutputPanel, types
├── i18n/
│   ├── config.ts
│   ├── hooks.ts               # useLanguage hook
│   └── locales/en.json, fr.json
├── shared/
│   ├── components/
│   │   ├── TabBar.tsx
│   │   ├── FileExplorer.tsx
│   │   ├── StatusBar.tsx
│   │   ├── EditableText.tsx  # Inline contentEditable wired to EditContext
│   │   ├── ThemeSwitcher.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── SkillDocumentation.tsx
│   │   ├── SkillTooltip.tsx
│   │   ├── ItemTooltip.tsx
│   │   ├── ImagePreviewTooltip.tsx
│   │   ├── ImageWithFallback.tsx
│   │   ├── ui/               # Full shadcn/Radix component set + utils.ts
│   │   └── layout/           # PageShell, CodeCard, ClassHeader, CodeProperty primitives
│   ├── contexts/
│   │   ├── ThemeContext.tsx   # useTheme hook
│   │   ├── NavigationContext.tsx # useNavigation hook (deep-link refs only — no setCurrentPage)
│   │   └── EditContext.tsx   # useEditContext — in-memory live edits dictionary
│   └── effects/              # Per-theme visual canvas effects
│       ├── SteampunkGears.tsx
│       ├── PixelEffects.tsx
│       ├── CyberpunkEffects.tsx
│       ├── SynthwaveEffects.tsx
│       ├── GalaxyEffects.tsx
│       └── NordEffects.tsx
└── styles/
    ├── main.scss              # @use all theme/component partials
    ├── base/_body.scss
    ├── components/            # _theme-colors.scss, _scrollbar.scss, _transitions.scss
    └── themes/                # _dark.scss, _light.scss, _steampunk.scss, _pixel.scss, etc.
```

## Navigation model

```ts
// App.tsx
type Page = 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'experience'
type Tab = { id: string; title: string; page: Page; isActive: boolean }

// State: openTabs[], activeTab
// openFile(page) → opens or activates a tab
// window events: 'navigate-to-skill' | 'navigate-to-experience' | 'navigate-to-project'
```

There is **no React Router**. All page rendering is a `switch` on `activeTab.page`.

## Themes

Supported themes (set via `data-theme` on `<html>`):
`dark` | `light` | `steampunk` | `pixel` | `cyberpunk` | `synthwave` | `galaxy` | `nord`

Theme stored in `localStorage` via `ThemeContext`. Each theme has a matching SCSS file in `styles/themes/` and optionally a background effect component.

## Styling conventions

- Use **Tailwind utility classes** for layout/spacing in components and pages.
- Use **SCSS theme variables** (e.g. `var(--color-sidebar-bg)`) for colors — never hardcode hex values.
- Use **`cn()`** from `src/shared/components/ui/utils.ts` for conditional classes.
- Use **`cva`** for component variants (see `ui/button.tsx` as reference).
- **No CSS Modules** and no styled-components in this project.

## State and hooks

| Hook | Source | Purpose |
|------|--------|---------|
| `useTheme()` | `ThemeContext` | Current theme + `setTheme` |
| `useNavigation()` | `NavigationContext` | `targetSkillId`, `targetExperienceId`, `targetProjectId` + setters |
| `useLanguage()` | `src/i18n/hooks.ts` | `t`, `language`, `setLanguage` (persisted) |
| `useIsMobile()` | `ui/use-mobile.ts` | MatchMedia flag at 768px |
| `useChart()` | `ui/chart.tsx` | Internal chart context |

## Animation conventions

- Use **`motion` from `'motion/react'`** in all components — `framer-motion` is no longer installed.
- Common pattern: `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>` with `AnimatePresence` for unmount transitions.

## Layout primitives

All pages render via the shared primitives in `src/shared/components/layout/`:

| Primitive | Purpose |
|---|---|
| `<PageShell commentTitle="X">` | Page outer wrapper with the `// X` comment header |
| `<CodeCard accentColor="purple">` | Themed card with left accent border, hover, motion |
| `<ClassHeader icon={...} title="X" />` + `<ClassClose />` | `class X {` ... `}` envelope |
| `<ClassBody>` | Indented body (`ml-4 md:ml-8`) |
| `<CodeProperty name="email" value="..." link="mailto:...">` | `name: "value";` line |
| `<CodeArrayProperty name="items" variant="list" \| "inline">` + `<CodeArrayItem variant="string" \| "pill" \| "instance">` | `items: [ ... ];` block, pill variant for chips |

`accentColor` ∈ `'purple' \| 'cyan' \| 'pink' \| 'blue' \| 'green' \| 'orange' \| 'yellow' \| 'red'` — mapping centralized in `src/shared/components/layout/accent.ts`. Never hand-write the four-side border accent pattern again.

## i18n conventions

- All user-visible strings must use `t('key')` via `useLanguage()`.
- Translation keys live in `src/i18n/locales/en.json` and `fr.json`.
- Default language: French (`fr`).

## Known issues

1. **Stale closure historically possible in `App.tsx`**: `navigate-to-*` event listeners now re-register on `openTabs` changes (`useEffect(..., [openTabs])`) — keep it that way when modifying tab logic.

2. **`public/index.html` vs root `index.html`**: Vite uses the root one; `public/index.html` is a CRA leftover.

## Content structure

Pages contain **static data** (no API calls, no fetch). Content objects are defined inline in each page component. The fake terminal (`TerminalView.tsx`) maps string commands to hard-coded responses.

Data is now based on **real information** from `info.md` (Matthieu Marin). The following sections have been filled:
- **Home**: rôle, bio, email, expertises, approche
- **About**: localisation (Saint-Quentin), email réel, 3 formations réelles (Master Cloud Computing, Licence Pro web/mobile, BTS SIO option B), intérêts et valeurs réels
- **Experience**: 4 vraies expériences (Renault Digital alternance, Faubourg Numérique stage, Chatterie de la Terre de Brasco ×2)
- **Contact**: email `matthieumarin51@gmail.com`, téléphone `07.83.33.47.50`, localisation Saint-Quentin
- **Skills**: vraies compétences (Java, Spring Boot, Node.js, PHP, Python, JavaScript, React, Vue.js, WordPress, MongoDB, SQL, Git, Agile/SCRUM)

**TODO — informations manquantes** (marquées `// TODO: miss info for...` dans le code) :
- URL GitHub (non fournie)
- Projets personnels — `Projects.tsx` contient encore des données fictives
- Stats "projets réalisés" sur la Home page
- Détails responsibilities/achievements de chaque expérience
- Highlights détaillés des formations

## UI component library

All shadcn/Radix-based components live in `src/shared/components/ui/`. When adding UI primitives, extend this set. Import `cn` from `@/shared/components/ui/utils`.

## How to add a new page

1. Add the page name to the `Page` union in `App.tsx`.
2. Create the component in `src/features/pages/NewPage.tsx`.
3. Add a `case 'newpage':` to the render switch in `App.tsx`.
4. Add the entry to `FileExplorer.tsx`'s file tree data.
5. Add translations in both `en.json` and `fr.json`.

## How to add a new theme

1. Create `src/styles/themes/_mytheme.scss` with `[data-theme="mytheme"]` CSS variable overrides.
2. `@use` it in `src/styles/main.scss`.
3. Add `'mytheme'` to the `Theme` union in `ThemeContext.tsx`.
4. Optionally create `src/shared/effects/MythemeEffects.tsx` and render it conditionally in `App.tsx`.

## Build and run

```bash
npm run dev      # Vite dev server on port 3000
npm run build    # Output to build/
npm run preview  # Preview the build
```
