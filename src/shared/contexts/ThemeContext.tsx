import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type Theme =
  | 'dark'
  | 'light'
  | 'steampunk'
  | 'pixel'
  | 'synthwave'
  | 'galaxy'
  | 'nord';

const VALID_THEMES: readonly Theme[] = ['dark', 'light', 'steampunk', 'pixel', 'synthwave', 'galaxy', 'nord'];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

function readSavedTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // A stored theme that no longer exists (e.g. removed from the app)
    // must not leak into data-theme, or the UI loses all its variables.
    return VALID_THEMES.includes(saved as Theme) ? (saved as Theme) : null;
  } catch {
    return null;
  }
}

function getInitialTheme(): Theme {
  const saved = readSavedTheme();
  if (saved) return saved;
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Lazy-init ref: tracks whether the user has explicitly picked a theme.
  const userPickedRef = useRef<boolean | null>(null);
  if (userPickedRef.current === null) {
    userPickedRef.current = readSavedTheme() !== null;
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (userPickedRef.current) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage disabled (e.g. Safari private mode pre-iOS17) — ignore.
      }
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      if (userPickedRef.current) return;
      setThemeState(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    userPickedRef.current = true;
    setThemeState(newTheme);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
