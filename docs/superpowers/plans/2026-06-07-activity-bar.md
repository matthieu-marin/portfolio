# Activity Bar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une activity bar VS Code (desktop only) avec 3 panels : Explorer, Source Control, Extensions.

**Architecture:** `ActivityBar` composant standalone → `App.tsx` refactore `isExplorerVisible: boolean` en `activePanel: PanelId | null` → 2 nouveaux panels (`GitPanel`, `ExtensionsPanel`). Mobile inchangé.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Lucide React, Sonner (toast)

---

### Task 1: Ajouter `PanelId` dans types.ts

**Files:**
- Modify: `src/app/types.ts`

- [ ] Ajouter le type `PanelId` :

```ts
// src/app/types.ts
export type Page =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'experience';

export type PanelId = 'explorer' | 'git' | 'extensions';

export interface Tab {
  id: Page;
  name: string;
  path: string;
}
```

- [ ] Commit :
```bash
git add src/app/types.ts
git commit -m "feat(activity-bar): add PanelId type"
```

---

### Task 2: Créer `ActivityBar.tsx`

**Files:**
- Create: `src/shared/components/ActivityBar.tsx`

- [ ] Créer le composant :

```tsx
// src/shared/components/ActivityBar.tsx
import { Files, GitBranch, Puzzle } from 'lucide-react';
import { cn } from './ui/utils';
import type { PanelId } from '../../app/types';

interface ActivityBarProps {
  activePanel: PanelId | null;
  onPanelSelect: (id: PanelId) => void;
}

const PANELS: { id: PanelId; icon: React.ElementType; label: string }[] = [
  { id: 'explorer',   icon: Files,     label: 'Explorer (⌘B)' },
  { id: 'git',        icon: GitBranch, label: 'Source Control' },
  { id: 'extensions', icon: Puzzle,    label: 'Extensions' },
];

export function ActivityBar({ activePanel, onPanelSelect }: ActivityBarProps) {
  return (
    <div className="hidden md:flex flex-col items-center w-11 bg-sidebar border-r border-border py-1 flex-shrink-0">
      {PANELS.map(({ id, icon: Icon, label }) => {
        const isActive = activePanel === id;
        return (
          <button
            key={id}
            onClick={() => onPanelSelect(id)}
            title={label}
            aria-label={label}
            className={cn(
              'relative w-9 h-9 flex items-center justify-center rounded transition-all duration-150 my-0.5',
              isActive
                ? 'text-foreground before:absolute before:left-0 before:inset-y-0 before:-ml-1 before:w-0.5 before:bg-foreground before:rounded-r'
                : 'text-muted-foreground opacity-50 hover:opacity-100'
            )}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] Commit :
```bash
git add src/shared/components/ActivityBar.tsx
git commit -m "feat(activity-bar): add ActivityBar component"
```

---

### Task 3: Créer `GitPanel.tsx`

**Files:**
- Create: `src/shared/components/GitPanel.tsx`

- [ ] Créer le composant :

```tsx
// src/shared/components/GitPanel.tsx
import { GitBranch, GitCommitHorizontal } from 'lucide-react';

const BRANCH = 'fix/visual';
const AHEAD = 1;
const BEHIND = 0;
const COMMITS = [
  'chore: full scan-driven cleanup + bug fixes + build/perf upgrades',
  'fix: several visual fixes + scan-driven cleanup',
  'feat: refacto 2026-05-22 — layout primitives + Cmd+K + theme detection',
  'feat: add contact provider + formspree support',
  'feat: add Skills and Experience pages',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2 px-3">
      {children}
    </p>
  );
}

export function GitPanel() {
  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col overflow-hidden flex-shrink-0">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-[10px] uppercase tracking-widest opacity-40">Source Control</span>
      </div>

      <div className="flex-1 overflow-auto py-3 space-y-5 text-sm font-mono">
        {/* Branch */}
        <div>
          <SectionLabel>Branch</SectionLabel>
          <div className="px-3 flex items-center gap-2 text-xs">
            <GitBranch className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            <span className="text-foreground truncate">{BRANCH}</span>
          </div>
          <p className="px-3 mt-1 text-[11px] opacity-50">
            ↑ {AHEAD} &nbsp; ↓ {BEHIND}
          </p>
        </div>

        {/* Changes */}
        <div>
          <SectionLabel>Changes</SectionLabel>
          <p className="px-3 text-[11px] opacity-40 italic">
            No changes — working tree clean
          </p>
        </div>

        {/* Commits */}
        <div>
          <SectionLabel>Recent commits</SectionLabel>
          <ul className="space-y-1">
            {COMMITS.map((msg, i) => (
              <li key={i} className="px-3 flex items-start gap-2 text-[11px]" style={{ opacity: 1 - i * 0.15 }}>
                <GitCommitHorizontal className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-60" />
                <span className="truncate opacity-70">{msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit :
```bash
git add src/shared/components/GitPanel.tsx
git commit -m "feat(activity-bar): add GitPanel component"
```

---

### Task 4: Créer `ExtensionsPanel.tsx`

**Files:**
- Create: `src/shared/components/ExtensionsPanel.tsx`

- [ ] Créer le composant :

```tsx
// src/shared/components/ExtensionsPanel.tsx
import { cn } from './ui/utils';
import { toast } from 'sonner';

interface Extension {
  id: string;
  name: string;
  publisher: string;
  version: string;
  icon: string;
  core: boolean;
}

const EXTENSIONS: Extension[] = [
  { id: 'react',      name: 'React',        publisher: 'Meta',          version: '18.3.1',     icon: '⚛',  core: true },
  { id: 'vite',       name: 'Vite',         publisher: 'vitejs',        version: '6.3.5',      icon: '⚡', core: true },
  { id: 'tailwind',   name: 'Tailwind CSS', publisher: 'tailwindlabs',  version: '4.0',        icon: '🎨', core: true },
  { id: 'motion',     name: 'Motion',       publisher: 'framer',        version: 'latest',     icon: '🎭', core: true },
  { id: 'typescript', name: 'TypeScript',   publisher: 'Microsoft',     version: '5.x',        icon: '🔷', core: true },
  { id: 'lucide',     name: 'Lucide React', publisher: 'lucide',        version: '0.487.0',    icon: '✦',  core: true },
];

function Toggle({ locked }: { locked: boolean }) {
  const handleClick = () => {
    if (locked) {
      toast.error('Cannot disable built-in extension');
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={locked ? 'Built-in — cannot disable' : 'Toggle extension'}
      className={cn(
        'w-7 h-3.5 rounded-full flex-shrink-0 transition-colors',
        locked
          ? 'bg-green-500 cursor-not-allowed'
          : 'bg-muted cursor-pointer hover:bg-muted/80'
      )}
    >
      <span
        className={cn(
          'block w-3 h-3 rounded-full bg-white shadow transition-transform mx-0.5',
          locked ? 'translate-x-3' : 'translate-x-0'
        )}
      />
    </button>
  );
}

export function ExtensionsPanel() {
  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col overflow-hidden flex-shrink-0">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-[10px] uppercase tracking-widest opacity-40">Extensions</span>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <p className="text-[10px] uppercase tracking-widest opacity-40 px-3 mb-2">
          Installed ({EXTENSIONS.length})
        </p>

        <ul className="space-y-0.5">
          {EXTENSIONS.map((ext) => (
            <li
              key={ext.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-hover transition-colors"
            >
              <div className="w-7 h-7 rounded bg-accent/20 flex items-center justify-center text-sm flex-shrink-0">
                {ext.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono truncate">{ext.name}</p>
                <p className="text-[10px] opacity-40 truncate font-mono">
                  {ext.publisher} · v{ext.version}
                </p>
              </div>
              <Toggle locked={ext.core} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] Commit :
```bash
git add src/shared/components/ExtensionsPanel.tsx
git commit -m "feat(activity-bar): add ExtensionsPanel component"
```

---

### Task 5: Refactorer `App.tsx`

**Files:**
- Modify: `src/app/App.tsx`

- [ ] Remplacer l'import + ajouter les nouveaux composants en haut du fichier :

```tsx
// Ajouter aux imports existants :
import { ActivityBar } from '../shared/components/ActivityBar';
import { GitPanel } from '../shared/components/GitPanel';
import { ExtensionsPanel } from '../shared/components/ExtensionsPanel';
import type { PanelId } from './types';
```

- [ ] Remplacer l'état `isExplorerVisible` par `activePanel` + ajouter `isMobileExplorerVisible` :

```tsx
// Remplacer :
const [isExplorerVisible, setIsExplorerVisible] = useState(true);

// Par :
const [activePanel, setActivePanel] = useState<PanelId | null>('explorer');
const [isMobileExplorerVisible, setIsMobileExplorerVisible] = useState(false);
```

- [ ] Remplacer le `useEffect` de resize :

```tsx
// Remplacer le useEffect qui setIsExplorerVisible par :
useEffect(() => {
  const MOBILE_BREAKPOINT = 768;
  const handleResize = () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobileExplorerVisible(!isMobile);
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

- [ ] Ajouter la fonction `togglePanel` + adapter le handler `onToggleExplorer` :

```tsx
// Ajouter après openFile :
const togglePanel = (id: PanelId) => {
  setActivePanel((prev) => (prev === id ? null : id));
};

const toggleExplorer = () => {
  // Desktop : toggle le panel explorer dans l'activity bar
  // Mobile : toggle la visibilité de l'explorer classique
  if (window.innerWidth >= 768) {
    togglePanel('explorer');
  } else {
    setIsMobileExplorerVisible((v) => !v);
  }
};
```

- [ ] Adapter `useKeyboardShortcuts` :

```tsx
// Remplacer onToggleExplorer dans useKeyboardShortcuts :
useKeyboardShortcuts({
  onCommandPalette: () => setIsCommandOpen(true),
  onToggleExplorer: toggleExplorer,
  onToggleTerminal: () => setIsTerminalVisible((v) => !v),
  onCloseTab: closeActiveTab,
  onSwitchTab: switchTabByIndex,
});
```

- [ ] Adapter le bouton hamburger dans la title bar :

```tsx
// Remplacer le bouton hamburger :
<button
  onClick={toggleExplorer}
  className="p-1 hover:bg-accent rounded transition-colors"
  aria-label="Toggle explorer"
  title="Toggle explorer (⌘B)"
>
  {(activePanel !== null || isMobileExplorerVisible) ? (
    <PanelLeftClose className="w-5 h-5" />
  ) : (
    <PanelLeftOpen className="w-5 h-5" />
  )}
</button>
```

- [ ] Remplacer le bloc de layout principal (div `flex-1 flex overflow-hidden relative`) :

```tsx
<div className="flex-1 flex overflow-hidden relative">
  {/* Desktop : Activity Bar + panel actif */}
  <div className="hidden md:flex h-full">
    <ActivityBar activePanel={activePanel} onPanelSelect={togglePanel} />
    {activePanel === 'explorer' && (
      <FileExplorer
        onFileSelect={openFile}
        onVisibilityChange={(v) => !v && setActivePanel(null)}
      />
    )}
    {activePanel === 'git' && <GitPanel />}
    {activePanel === 'extensions' && <ExtensionsPanel />}
  </div>

  {/* Mobile : Explorer classique */}
  {isMobileExplorerVisible && (
    <div className="md:hidden">
      <FileExplorer
        onFileSelect={openFile}
        onVisibilityChange={setIsMobileExplorerVisible}
      />
    </div>
  )}

  <div className="flex-1 flex flex-col min-w-0">
    <TabBar
      tabs={openTabs}
      activeTab={activeTab}
      onTabClick={setActiveTab}
      onTabClose={closeTab}
    />
    <div className="flex-1 overflow-auto">{renderPage()}</div>
    {isTerminalVisible && (
      <div
        className="border-t border-border relative"
        style={{ height: terminalHeight }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-transparent hover:bg-accent cursor-row-resize transition-colors z-10"
          onMouseDown={() => setIsResizingTerminal(true)}
        >
          <div className="absolute inset-x-0 -top-1 h-3" />
        </div>
        <OutputPanel mode="terminal" onClose={() => setIsTerminalVisible(false)} />
      </div>
    )}
  </div>
</div>
```

- [ ] Adapter `CommandPalette` prop `onToggleExplorer` :

```tsx
<CommandPalette
  open={isCommandOpen}
  onOpenChange={setIsCommandOpen}
  onOpenFile={openFile}
  onToggleTerminal={() => setIsTerminalVisible((v) => !v)}
  onToggleExplorer={toggleExplorer}
/>
```

- [ ] Commit :
```bash
git add src/app/App.tsx
git commit -m "feat(activity-bar): wire ActivityBar into App layout"
```

---

### Task 6: Vérification visuelle

- [ ] `npm run dev` est déjà lancé sur le port 3000
- [ ] Vérifier desktop : activity bar visible à gauche avec 3 icônes
- [ ] Cliquer Explorer → panel fichiers s'ouvre
- [ ] Cliquer Git → panel Source Control s'ouvre
- [ ] Cliquer Extensions → panel Extensions s'ouvre
- [ ] Cliquer l'icône active → collapse le panel
- [ ] Cliquer un toggle d'extension → toast erreur "Cannot disable built-in extension"
- [ ] ⌘B → toggle Explorer
- [ ] Mobile (< 768px) : activity bar masquée, hamburger toujours fonctionnel
