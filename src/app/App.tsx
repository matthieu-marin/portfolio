import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from '../shared/contexts/ThemeContext';
import { NavigationProvider } from '../shared/contexts/NavigationContext';
import { EditProvider } from '../shared/contexts/EditContext';
import { TabBar } from '../shared/components/TabBar';
import { FileExplorer } from '../shared/components/FileExplorer';
import { StatusBar } from '../shared/components/StatusBar';
import { OutputPanel } from '../features/output-panel';
import { LanguageSwitcher } from '../shared/components/LanguageSwitcher';
import { ThemeSwitcher } from '../shared/components/ThemeSwitcher';
import { CommandPalette } from '../shared/components/CommandPalette';
import { useKeyboardShortcuts } from '../shared/hooks/useKeyboardShortcuts';
import {
  SteampunkGears,
  PixelEffects,
  CyberpunkEffects,
  SynthwaveEffects,
  GalaxyEffects,
  NordEffects,
} from '../shared/effects';
import { Home } from '../features/pages/Home';
import { About } from '../features/pages/About';
import { Projects } from '../features/pages/Projects';
import { Skills } from '../features/pages/Skills';
import { Contact } from '../features/pages/Contact';
import { Experience } from '../features/pages/Experience';
import { PanelLeftOpen, PanelLeftClose, Command as CommandIcon } from 'lucide-react';
import { Toaster } from 'sonner';
import type { Page, Tab } from './types';

function PortfolioContent() {
  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { id: 'home', name: 'Home.tsx', path: 'src/pages/Home.tsx' },
  ]);
  const [activeTab, setActiveTab] = useState<Page>('home');
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(256);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [isExplorerVisible, setIsExplorerVisible] = useState(true);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language === 'en' ? 'en' : 'fr';
    document.documentElement.setAttribute('lang', lang);
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('meta.description'));
  }, [t, i18n.language]);

  const MIN_TERMINAL_HEIGHT = 100;
  const MAX_TERMINAL_HEIGHT = 600;

  useEffect(() => {
    // Aligned with useIsMobile (Tailwind md breakpoint) — see ui/use-mobile.ts.
    const MOBILE_BREAKPOINT = 768;
    const handleResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsExplorerVisible(!isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openFile = useCallback((id: Page, name: string, path: string) => {
    setOpenTabs((prev) =>
      prev.find((tab) => tab.id === id) ? prev : [...prev, { id, name, path }]
    );
    setActiveTab(id);
  }, []);

  useEffect(() => {
    const handleNavigateToSkill = () => openFile('skills', 'Skills.tsx', 'src/pages/Skills.tsx');
    const handleNavigateToExperience = () =>
      openFile('experience', 'Experience.tsx', 'src/pages/Experience.tsx');
    const handleNavigateToProject = () =>
      openFile('projects', 'Projects.tsx', 'src/pages/Projects.tsx');

    window.addEventListener('navigate-to-skill', handleNavigateToSkill as EventListener);
    window.addEventListener('navigate-to-experience', handleNavigateToExperience as EventListener);
    window.addEventListener('navigate-to-project', handleNavigateToProject as EventListener);

    return () => {
      window.removeEventListener('navigate-to-skill', handleNavigateToSkill as EventListener);
      window.removeEventListener('navigate-to-experience', handleNavigateToExperience as EventListener);
      window.removeEventListener('navigate-to-project', handleNavigateToProject as EventListener);
    };
  }, [openFile]);

  useEffect(() => {
    if (!isResizingTerminal) return;

    let rafId: number | null = null;
    let pendingClientY = 0;

    const apply = () => {
      rafId = null;
      const newHeight = window.innerHeight - pendingClientY;
      const clamped = Math.max(
        MIN_TERMINAL_HEIGHT,
        Math.min(MAX_TERMINAL_HEIGHT, newHeight)
      );
      setTerminalHeight(clamped);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingClientY = e.clientY;
      if (rafId === null) rafId = requestAnimationFrame(apply);
    };
    const handleMouseUp = () => setIsResizingTerminal(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingTerminal]);

  const closeTab = useCallback(
    (id: Page) => {
      setOpenTabs((prev) => {
        const closedIdx = prev.findIndex((tab) => tab.id === id);
        const newTabs = prev.filter((tab) => tab.id !== id);
        if (activeTab === id && newTabs.length > 0) {
          // Switch to the neighbour (prefer the tab on the left).
          const nextIdx = Math.max(0, closedIdx - 1);
          setActiveTab(newTabs[nextIdx].id);
        }
        return newTabs;
      });
    },
    [activeTab]
  );

  const closeActiveTab = useCallback(() => {
    closeTab(activeTab);
  }, [activeTab, closeTab]);

  const switchTabByIndex = useCallback(
    (index: number) => {
      const target = openTabs[index];
      if (target) setActiveTab(target.id);
    },
    [openTabs]
  );

  useKeyboardShortcuts({
    onCommandPalette: () => setIsCommandOpen(true),
    onToggleExplorer: () => setIsExplorerVisible((v) => !v),
    onToggleTerminal: () => setIsTerminalVisible((v) => !v),
    onCloseTab: closeActiveTab,
    onSwitchTab: switchTabByIndex,
  });

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      case 'experience':
        return <Experience />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {theme === 'steampunk' && <SteampunkGears />}
      {theme === 'pixel' && <PixelEffects />}
      {theme === 'cyberpunk' && <CyberpunkEffects />}
      {theme === 'synthwave' && <SynthwaveEffects />}
      {theme === 'galaxy' && <GalaxyEffects />}
      {theme === 'nord' && <NordEffects />}
      <div className="h-12 bg-titlebar border-b border-border flex items-center justify-between px-5 md:px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExplorerVisible(!isExplorerVisible)}
            className="p-1 hover:bg-accent rounded transition-colors"
            aria-label={isExplorerVisible ? 'Hide explorer' : 'Show explorer'}
            title={isExplorerVisible ? 'Hide explorer (⌘B)' : 'Show explorer (⌘B)'}
          >
            {isExplorerVisible ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeftOpen className="w-5 h-5" />
            )}
          </button>
          <span className="font-mono text-sm md:text-base">Portfolio IDE</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded border border-border bg-background/50 hover:bg-hover transition-colors text-xs font-mono"
            aria-label="Open command palette"
            title="Command palette (⌘K)"
          >
            <CommandIcon className="w-3.5 h-3.5" />
            <span className="opacity-70">⌘K</span>
          </button>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden relative">
        {isExplorerVisible && (
          <FileExplorer onFileSelect={openFile} onVisibilityChange={setIsExplorerVisible} />
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
      <StatusBar
        onTerminalToggle={() => setIsTerminalVisible(!isTerminalVisible)}
        isTerminalVisible={isTerminalVisible}
        openTabsCount={openTabs.length}
      />

      <CommandPalette
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        onOpenFile={openFile}
        onToggleTerminal={() => setIsTerminalVisible((v) => !v)}
        onToggleExplorer={() => setIsExplorerVisible((v) => !v)}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'font-mono text-xs',
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <EditProvider>
          <PortfolioContent />
        </EditProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
