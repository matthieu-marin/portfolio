import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const basicThemes = [
    { id: 'dark' as const, label: 'Dark', icon: Moon },
    { id: 'light' as const, label: 'Light', icon: Sun },
  ];

  const isSecretTheme = !['dark', 'light'].includes(theme);

  return (
    <div className="flex items-center gap-1">
      {/* Indicateur de thème secret */}
      {isSecretTheme && (
        <div className="flex items-center gap-1 bg-hover rounded p-1 animate-pulse">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
      )}

      {/* Switch Dark/Light */}
      <div className="flex items-center gap-1 bg-hover rounded p-1">
        {basicThemes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`
              px-2 py-1 rounded text-xs transition-colors flex items-center gap-1.5
              ${theme === id ? 'bg-accent text-accent-foreground' : 'hover:bg-background'}
            `}
            title={label}
          >
            <Icon className="w-3 h-3" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}