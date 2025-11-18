import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '../shared/contexts/ThemeContext';
import { NavigationProvider } from '../shared/contexts/NavigationContext';
import { TabBar } from '../shared/components/TabBar';
import { FileExplorer } from '../shared/components/FileExplorer';
import { StatusBar } from '../shared/components/StatusBar';
import { Terminal } from '../shared/components/Terminal';
import { LanguageSwitcher } from '../shared/components/LanguageSwitcher';
import { ThemeSwitcher } from '../shared/components/ThemeSwitcher';
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
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

type Page = 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'experience';

interface Tab {
  id: Page;
  name: string;
  path: string;
}

function PortfolioContent() {
  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { id: 'home', name: 'Home.tsx', path: 'src/pages/Home.tsx' }
  ]);
  const [activeTab, setActiveTab] = useState<Page>('home');
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(256);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [isExplorerVisible, setIsExplorerVisible] = useState(true);
  const { theme } = useTheme();

  const MIN_TERMINAL_HEIGHT = 100;
  const MAX_TERMINAL_HEIGHT = 600;

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        setIsExplorerVisible(false);
      } else {
        setIsExplorerVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleNavigateToSkill = () => {
      openFile('skills', 'Skills.tsx', 'src/pages/Skills.tsx');
    };

    const handleNavigateToExperience = () => {
      openFile('experience', 'Experience.tsx', 'src/pages/Experience.tsx');
    };

    const handleNavigateToProject = () => {
      openFile('projects', 'Projects.tsx', 'src/pages/Projects.tsx');
    };

    window.addEventListener('navigate-to-skill', handleNavigateToSkill as EventListener);
    window.addEventListener('navigate-to-experience', handleNavigateToExperience as EventListener);
    window.addEventListener('navigate-to-project', handleNavigateToProject as EventListener);
    
    return () => {
      window.removeEventListener('navigate-to-skill', handleNavigateToSkill as EventListener);
      window.removeEventListener('navigate-to-experience', handleNavigateToExperience as EventListener);
      window.removeEventListener('navigate-to-project', handleNavigateToProject as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingTerminal) return;

      const newHeight = window.innerHeight - e.clientY;
      if (newHeight >= MIN_TERMINAL_HEIGHT && newHeight <= MAX_TERMINAL_HEIGHT) {
        setTerminalHeight(newHeight);
      } else if (newHeight > MAX_TERMINAL_HEIGHT) {
        setTerminalHeight(MAX_TERMINAL_HEIGHT);
      } else if (newHeight < MIN_TERMINAL_HEIGHT) {
        setTerminalHeight(MIN_TERMINAL_HEIGHT);
      }
    };

    const handleMouseUp = () => {
      setIsResizingTerminal(false);
    };

    if (isResizingTerminal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingTerminal]);

  const openFile = (id: Page, name: string, path: string) => {
    if (!openTabs.find(tab => tab.id === id)) {
      setOpenTabs([...openTabs, { id, name, path }]);
    }
    setActiveTab(id);
  };

  const closeTab = (id: Page) => {
    const newTabs = openTabs.filter(tab => tab.id !== id);
    setOpenTabs(newTabs);
    
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

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
            aria-label={isExplorerVisible ? "Hide explorer" : "Show explorer"}
            title={isExplorerVisible ? "Hide explorer" : "Show explorer"}
          >
            {isExplorerVisible ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
          <span className="font-mono text-sm md:text-base">Portfolio IDE</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden relative">
        {isExplorerVisible && (
          <FileExplorer 
            onFileSelect={openFile} 
            onVisibilityChange={setIsExplorerVisible}
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TabBar 
            tabs={openTabs} 
            activeTab={activeTab} 
            onTabClick={setActiveTab}
            onTabClose={closeTab}
          />
          
          <div className="flex-1 overflow-auto">
            {renderPage()}
          </div>
          {isTerminalVisible && (
            <div className="border-t border-border relative" style={{ height: terminalHeight }}>
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-transparent hover:bg-accent cursor-row-resize transition-colors z-10"
                onMouseDown={() => setIsResizingTerminal(true)}
              >
                <div className="absolute inset-x-0 -top-1 h-3" />
              </div>
              <Terminal onClose={() => setIsTerminalVisible(false)} />
            </div>
          )}
        </div>
      </div>
      <StatusBar 
        onTerminalToggle={() => setIsTerminalVisible(!isTerminalVisible)}
        isTerminalVisible={isTerminalVisible}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <PortfolioContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}

