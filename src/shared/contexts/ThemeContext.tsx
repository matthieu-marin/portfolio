import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'steampunk' | 'pixel' | 'cyberpunk' | 'synthwave' | 'galaxy' | 'nord';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

function getInitialTheme(): { theme: Theme; userPicked: boolean } {
  if (typeof window === 'undefined') return { theme: 'dark', userPicked: false };
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return { theme: saved as Theme, userPicked: true };
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return { theme: prefersLight ? 'light' : 'dark', userPicked: false };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const initial = useRef(getInitialTheme()).current;
  const [theme, setThemeState] = useState<Theme>(initial.theme);
  // Tracks whether the user has explicitly picked a theme this session.
  const userPickedRef = useRef<boolean>(initial.userPicked);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (userPickedRef.current) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme]);

  // Track OS color-scheme changes as long as the user hasn't explicitly chosen.
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

  const setTheme = (newTheme: Theme) => {
    userPickedRef.current = true;
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

