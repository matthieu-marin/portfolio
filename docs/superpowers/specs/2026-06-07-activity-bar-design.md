# Activity Bar — Design Spec

**Date:** 2026-06-07
**Status:** Approved

---

## Overview

Add a VS Code-faithful activity bar on the left side of the IDE shell (desktop only). It hosts three panel icons; clicking one opens the corresponding sidebar panel. Clicking the active icon collapses the sidebar.

---

## Layout

```
┌──────────────────────────────────────────────────────┐
│ Title Bar                                   ⌘K FR 🌙 │
├────┬──────────────┬───────────────────────────────────┤
│    │              │                                   │
│ 🗂  │ EXPLORER     │                                   │
│    │ ▾ portfolio  │         Editor (page content)     │
│ 🔀  │   ▾ src      │                                   │
│    │     ▾ pages  │                                   │
│ 🧩  │       ...   │                                   │
│    │              │                                   │
├────┴──────────────┴───────────────────────────────────┤
│ Status Bar                                            │
└──────────────────────────────────────────────────────┘
```

- **Activity bar**: 44px wide, `hidden md:flex`, flush left.
- **Sidebar panel**: width variable (resizable, existing behavior), shown to the right of the activity bar.
- **Desktop only**: `hidden md:flex flex-col` on the activity bar wrapper. Mobile keeps the current hamburger-only behavior.

---

## Components

### `ActivityBar.tsx` (new)

```
src/shared/components/ActivityBar.tsx
```

- Renders a vertical strip with three icon buttons.
- Props: `activePanel: PanelId | null`, `onPanelSelect: (id: PanelId) => void`
- Each button:
  - Icon: Lucide (`Files`, `GitBranch`, `Puzzle`)
  - Tooltip on hover (e.g. "Explorer", "Source Control", "Extensions")
  - Active state: `bg-accent/10 border-l-2 border-accent`
  - Inactive state: `opacity-40 hover:opacity-100`
  - Clicking the **active** icon → calls `onPanelSelect(null)` (collapse)
  - Clicking an **inactive** icon → calls `onPanelSelect(id)`

```ts
type PanelId = 'explorer' | 'git' | 'extensions'
```

---

### `GitPanel.tsx` (new)

```
src/shared/components/GitPanel.tsx
```

Static content — no live git queries. Data hardcoded as constants at top of file.

**Sections:**
1. **Branch** — branch name + `↑ N  ↓ N` ahead/behind indicators
2. **Changes** — always `No changes — working tree clean`
3. **Recent commits** — list of ~5 last commit messages (strings)

Style: mirrors the Explorer header/section label pattern (`text-xs uppercase opacity-40 tracking-widest`).

---

### `ExtensionsPanel.tsx` (new)

```
src/shared/components/ExtensionsPanel.tsx
```

**Data structure:**

```ts
interface Extension {
  id: string
  name: string
  publisher: string
  version: string
  icon: string          // emoji or LucideIcon
  core: boolean         // if true: toggle locked ON, error on click
}

const EXTENSIONS: Extension[] = [
  { id: 'react',     name: 'React',        publisher: 'Meta',         version: '18.3.1', icon: '⚛',  core: true },
  { id: 'vite',      name: 'Vite',         publisher: 'vitejs',       version: '6.3.5',  icon: '⚡', core: true },
  { id: 'tailwind',  name: 'Tailwind CSS', publisher: 'tailwindlabs', version: '4.0',    icon: '🎨', core: true },
  { id: 'motion',    name: 'Motion',       publisher: 'framer',       version: 'latest', icon: '🎭', core: true },
  { id: 'typescript',name: 'TypeScript',   publisher: 'Microsoft',    version: '5.x',    icon: '🔷', core: true },
  { id: 'lucide',    name: 'Lucide React', publisher: 'lucide',       version: '0.487',  icon: '✦',  core: true },
]
```

**Each row:**
- Icon (emoji in a 22×22 rounded square)
- Name + publisher · version (two lines)
- Toggle: always ON green (`bg-green-400`), `cursor-not-allowed`
- On click → `toast.error("Cannot disable built-in extension")` via `sonner` (already installed)

**Adding future extensions:** add an entry with `core: false` and it will render with a functional (or decorative) toggle. No placeholder rows are shown until an entry is added to the array.

---

## State changes in `App.tsx`

Replace:
```ts
const [isExplorerVisible, setIsExplorerVisible] = useState(true)
```

With:
```ts
type PanelId = 'explorer' | 'git' | 'extensions'
const [activePanel, setActivePanel] = useState<PanelId | null>('explorer')
```

Panel open/close logic:
```ts
const togglePanel = (id: PanelId) => {
  setActivePanel(prev => prev === id ? null : id)
}
```

Sidebar visibility = `activePanel !== null` (same as before for layout purposes).

**Hamburger button in title bar:** toggles the currently active panel (or re-opens Explorer if no panel is open). Behavior on mobile unchanged.

**Mobile:** `isExplorerVisible` logic on resize stays for mobile (`< 768px`), where the activity bar is hidden and only the hamburger controls Explorer visibility. Refactor: keep a separate `isMobileExplorerVisible` for mobile, or gate the `activePanel` logic to desktop only.

---

## Panel rendering in App.tsx

```tsx
{/* Desktop: Activity Bar + Panel */}
<div className="hidden md:flex h-full">
  <ActivityBar activePanel={activePanel} onPanelSelect={togglePanel} />
  {activePanel !== null && (
    activePanel === 'explorer' ? <FileExplorer ... /> :
    activePanel === 'git'      ? <GitPanel /> :
                                 <ExtensionsPanel />
  )}
</div>

{/* Mobile: Explorer only, controlled by hamburger */}
{isMobileExplorerVisible && (
  <div className="md:hidden">
    <FileExplorer ... />
  </div>
)}
```

---

## Styling

- Activity bar background: `bg-sidebar` (same as Explorer, already themed per theme)
- Active icon indicator: `border-l-2 border-accent` + `bg-accent/10`
- Panel headers: match existing Explorer "EXPLORER" label style
- All panels use the existing scrollbar styling from `_scrollbar.scss`

---

## Out of scope

- Persisting active panel to `localStorage`
- Search panel (4th icon)
- Animated panel transitions
- Functional git toggle (real branch data)

---

## Files to create / modify

| File | Action |
|------|--------|
| `src/shared/components/ActivityBar.tsx` | Create |
| `src/shared/components/GitPanel.tsx` | Create |
| `src/shared/components/ExtensionsPanel.tsx` | Create |
| `src/app/App.tsx` | Modify — state + layout |
| `src/app/types.ts` | Modify — add `PanelId` type |
