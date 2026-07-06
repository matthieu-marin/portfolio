import {
  Terminal,
  GitBranch,
  AlertCircle,
  Wifi,
  Moon,
  Sun,
  Settings,
  Gamepad2,
  Zap,
  Sunset,
  Rocket,
  Snowflake,
  RotateCcw,
  Keyboard,
  FileCode,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../../i18n/hooks';
import { useState, useRef, useEffect } from 'react';
import { useEditContext } from '../contexts/EditContext';
import { useRenderer } from '../contexts/RendererContext';
import { MOD, SHIFT, SEP } from '../utils/platform';
import { StatusBarCat } from './StatusBarCat';

interface StatusBarProps {
  onTerminalToggle: () => void;
  isTerminalVisible: boolean;
  openTabsCount?: number;
  onOpenChronology?: () => void;
  onOpenExtensions?: () => void;
}

const SHORTCUTS: Array<{ keys: string; label: { fr: string; en: string } }> = [
  { keys: `${MOD}${SEP}B`, label: { fr: "Basculer l'explorateur", en: 'Toggle explorer' } },
  { keys: `${MOD}${SEP}\``, label: { fr: 'Basculer le terminal', en: 'Toggle terminal' } },
  { keys: `${MOD}${SEP}${SHIFT}${SEP}W`, label: { fr: "Fermer l'onglet actif", en: 'Close active tab' } },
  { keys: `${MOD}${SEP}1…6`, label: { fr: 'Aller à l’onglet n', en: 'Go to tab n' } },
];

function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function StatusBar({
  onTerminalToggle,
  isTerminalVisible,
  openTabsCount = 0,
  onOpenChronology,
  onOpenExtensions,
}: StatusBarProps) {
  const { theme, setTheme } = useTheme();
  const { t, language } = useLanguage();
  const { hasEdits, resetEdits } = useEditContext();
  const { enabled } = useRenderer();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const shortcutsRef = useRef<HTMLDivElement>(null);
  const now = useNow();

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

  // Popover background follows the theme via CSS variable rather than
  // a per-theme hardcoded hex, so adding a new theme works automatically.
  const menuBackground = 'var(--titlebar)';

  const currentTheme = themes.find((t) => t.id === theme);
  const CurrentIcon = currentTheme?.icon || Moon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
      if (shortcutsRef.current && !shortcutsRef.current.contains(event.target as Node)) {
        setIsShortcutsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedDate = now.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = now.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="h-6 bg-statusbar text-statusbar-text flex items-center justify-between px-3 md:px-2 text-xs border-t border-border relative overflow-hidden">
      <StatusBarCat />
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onOpenChronology}
          title="Chronologie du parcours"
          className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-hover transition-colors"
        >
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </button>
        <button
          onClick={onOpenExtensions}
          title="Portfolio Renderer extension"
          className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-hover transition-colors"
        >
          <Zap className="w-3 h-3" />
          <span className="hidden md:inline">Renderer: {enabled ? 'ON' : 'OFF'}</span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>0</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <FileCode className="w-3 h-3" />
          <span>{openTabsCount}</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-70">
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{formattedTime}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-1">
          <Wifi className="w-3 h-3" />
          <span>Connected</span>
        </div>
        {hasEdits && (
          <button
            onClick={resetEdits}
            title="Reset all edits"
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-hover text-yellow-400"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset edits</span>
          </button>
        )}
        <div ref={shortcutsRef} className="relative">
          <button
            onClick={() => setIsShortcutsOpen((v) => !v)}
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded hover:bg-hover"
            title={t('statusBar.shortcutsTitle')}
            aria-label={t('statusBar.shortcutsTitle')}
          >
            <Keyboard className="w-3 h-3" />
          </button>
          {isShortcutsOpen && (
            <div
              className="absolute right-0 bottom-full mb-1 border border-border rounded shadow-lg overflow-hidden min-w-[240px] z-50 font-mono"
              style={{ backgroundColor: menuBackground }}
            >
              <div className="px-3 py-2 border-b border-border text-[11px] uppercase tracking-wide opacity-70">
                {t('statusBar.shortcuts')}
              </div>
              {SHORTCUTS.map((s) => (
                <div key={s.keys} className="flex items-center justify-between px-3 py-1.5 text-xs">
                  <span>{s.label[language]}</span>
                  <span className="opacity-70 ml-3">{s.keys}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onTerminalToggle}
          className={`flex items-center gap-1 px-2 py-0.5 rounded hover:bg-hover ${
            isTerminalVisible ? 'bg-accent/20' : ''
          }`}
        >
          <Terminal className="w-3 h-3" />
          <span className="hidden md:inline">Terminal</span>
        </button>
        <span className="uppercase">{language}</span>
        <div ref={themeMenuRef} className="relative">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-hover"
          >
            <CurrentIcon className="w-3 h-3" />
            <span className="capitalize hidden md:inline">{theme}</span>
          </button>
          {isThemeMenuOpen && (
            <div
              className="absolute right-0 bottom-full mb-1 border border-border rounded shadow-lg overflow-hidden min-w-[120px] z-50"
              style={{ backgroundColor: menuBackground }}
            >
              {themes.map((t) => {
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
