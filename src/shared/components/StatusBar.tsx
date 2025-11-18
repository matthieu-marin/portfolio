import { Terminal, GitBranch, AlertCircle, Wifi, Moon, Sun, Settings, Gamepad2, Zap, Sunset, Rocket, Snowflake } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../../i18n/hooks';
import { useState, useRef, useEffect } from 'react';

interface StatusBarProps {
  onTerminalToggle: () => void;
  isTerminalVisible: boolean;
}

export function StatusBar({ onTerminalToggle, isTerminalVisible }: StatusBarProps) {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'dark' as const, name: 'Dark', icon: Moon },
    { id: 'light' as const, name: 'Light', icon: Sun },
    { id: 'steampunk' as const, name: 'Steampunk', icon: Settings },
    { id: 'pixel' as const, name: 'Pixel', icon: Gamepad2 },
    { id: 'cyberpunk' as const, name: 'Cyberpunk', icon: Zap },
    { id: 'synthwave' as const, name: 'Synthwave', icon: Sunset },
    { id: 'galaxy' as const, name: 'Galaxy', icon: Rocket },
    { id: 'nord' as const, name: 'Nord', icon: Snowflake },
  ];

  const menuBackgrounds: Record<string, string> = {
    light: '#ffffff',
    dark: '#1e1e1e',
    steampunk: '#2d1f14',
    pixel: '#0a2a0a',
    cyberpunk: '#050508',
    synthwave: '#1f0841',
    galaxy: '#081220',
    nord: '#282c36',
  };

  const currentTheme = themes.find(t => t.id === theme);
  const CurrentIcon = currentTheme?.icon || Moon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-6 bg-statusbar text-statusbar-text flex items-center justify-between px-3 md:px-2 text-xs border-t border-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>0</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-1">
          <Wifi className="w-3 h-3" />
          <span>Connected</span>
        </div>
        <button
          onClick={onTerminalToggle}
          className={`flex items-center gap-1 px-2 py-0.5 rounded hover:bg-hover ${
            isTerminalVisible ? 'bg-accent/20' : ''
          }`}
        >
          <Terminal className="w-3 h-3" />
          <span>Terminal</span>
        </button>
        <span className="uppercase">{language}</span>
        <div ref={themeMenuRef} className="relative">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-hover"
          >
            <CurrentIcon className="w-3 h-3" />
            <span className="capitalize">{theme}</span>
          </button>
          {isThemeMenuOpen && (
            <div className="absolute right-0 bottom-full mb-1 border border-border rounded shadow-lg overflow-hidden min-w-[120px] z-50" style={{ backgroundColor: menuBackgrounds[theme] }}>
              {themes.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-hover text-left transition-colors ${
                      theme === t.id ? 'bg-accent/20' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

