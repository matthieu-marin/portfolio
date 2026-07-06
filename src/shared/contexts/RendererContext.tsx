import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'portfolio-renderer-enabled';

interface RendererContextType {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
}

const RendererContext = createContext<RendererContextType>({
  enabled: true,
  setEnabled: () => {},
  toggle: () => {},
});

export function RendererProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'false';
    } catch {
      return true;
    }
  });

  const persist = useCallback((v: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(v));
    } catch {
      /* storage unavailable: state in memory only */
    }
  }, []);

  const setEnabled = useCallback(
    (v: boolean) => {
      setEnabledState(v);
      persist(v);
    },
    [persist]
  );

  const toggle = useCallback(() => {
    setEnabledState((v) => {
      const next = !v;
      persist(next);
      return next;
    });
  }, [persist]);

  const value = useMemo(() => ({ enabled, setEnabled, toggle }), [enabled, setEnabled, toggle]);
  return <RendererContext.Provider value={value}>{children}</RendererContext.Provider>;
}

export const useRenderer = () => useContext(RendererContext);
