import { Settings } from 'lucide-react';
import { useRenderer } from '../contexts/RendererContext';

// Une seule extension : celle qui pilote le rendu du portfolio. Les vraies
// dépendances (React, Vite…) n'ont rien à faire ici — elles ne se
// désactivent pas, donc elles n'apportaient que du bruit.
export function ExtensionsPanel() {
  const { enabled, toggle } = useRenderer();

  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col overflow-hidden flex-shrink-0">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
          Extensions
        </span>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <p className="text-[10px] uppercase tracking-widest opacity-40 px-3 mb-2 font-mono">
          Installed (1)
        </p>

        <div className="px-3 py-2 hover:bg-hover transition-colors">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded bg-accent/20 flex items-center justify-center text-base flex-shrink-0 select-none">
              ✨
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono truncate">
                Portfolio Renderer
                {!enabled && (
                  <span className="ml-1.5 text-[9px] uppercase opacity-50">(disabled)</span>
                )}
              </p>
              <p className="text-[10px] opacity-40 truncate font-mono">
                Matthieu Marin · v2.0.1 · ⭐ 4.9 (2.4M installs)
              </p>
            </div>
          </div>
          <p className="text-[10px] opacity-50 mt-2 font-mono leading-relaxed">
            Renders this portfolio in human-readable mode. Disable to view raw source files.
          </p>
          {/* Barre d'actions façon VS Code : bouton rectangulaire + engrenage */}
          <div className="flex items-center gap-1.5 mt-2">
            <button
              onClick={toggle}
              className="px-2 py-0.5 text-[11px] font-mono rounded-[3px] bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
            >
              {enabled ? 'Disable' : 'Enable'}
            </button>
            <button
              onClick={toggle}
              title={enabled ? 'Disable extension' : 'Enable extension'}
              aria-label="Extension settings"
              className="p-1 rounded-[3px] hover:bg-background/60 transition-colors opacity-60 hover:opacity-100"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
