import { createContext, useContext } from 'react';
import type { AccentColor } from './accent';

interface CodeCardContextValue {
  accentColor: AccentColor;
}

const CodeCardContext = createContext<CodeCardContextValue | null>(null);

export function CodeCardProvider({
  accentColor,
  children,
}: {
  accentColor: AccentColor;
  children: React.ReactNode;
}) {
  return (
    <CodeCardContext.Provider value={{ accentColor }}>
      {children}
    </CodeCardContext.Provider>
  );
}

export function useCodeCardAccent(): AccentColor {
  const ctx = useContext(CodeCardContext);
  return ctx?.accentColor ?? 'purple';
}
