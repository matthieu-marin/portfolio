import { cn } from './ui/utils';
import { toast } from 'sonner';
import { useRenderer } from '../contexts/RendererContext';

interface Extension {
  id: string;
  name: string;
  publisher: string;
  version: string;
  icon: string;
  core: boolean;
}

const EXTENSIONS: Extension[] = [
  { id: 'react',      name: 'React',        publisher: 'Meta',         version: '18.3.1',  icon: '⚛',  core: true },
  { id: 'vite',       name: 'Vite',         publisher: 'vitejs',       version: '6.3.5',   icon: '⚡', core: true },
  { id: 'tailwind',   name: 'Tailwind CSS', publisher: 'tailwindlabs', version: '4.0',     icon: '🎨', core: true },
  { id: 'motion',     name: 'Motion',       publisher: 'framer',       version: 'latest',  icon: '🎭', core: true },
  { id: 'typescript', name: 'TypeScript',   publisher: 'Microsoft',    version: '5.x',     icon: '🔷', core: true },
  { id: 'lucide',     name: 'Lucide React', publisher: 'lucide',       version: '0.487.0', icon: '✦',  core: true },
];

function Toggle({ locked, enabled, onToggle }: { locked: boolean; enabled?: boolean; onToggle?: () => void }) {
  return (
    <button
      onClick={() => {
        if (locked) {
          toast.error('Cannot disable built-in extension');
        } else if (onToggle) {
          onToggle();
        }
      }}
      aria-label={locked ? 'Built-in — cannot disable' : 'Toggle extension'}
      className={cn(
        'relative w-7 h-3.5 rounded-full flex-shrink-0 transition-colors',
        locked || enabled ? 'bg-green-500 cursor-not-allowed' : 'bg-muted cursor-pointer'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow transition-transform',
          locked || enabled ? 'left-[calc(100%-12px)]' : 'left-0.5'
        )}
      />
    </button>
  );
}

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
          Installed ({EXTENSIONS.length + 1})
        </p>

        <ul>
          <li className="px-3 py-2 hover:bg-hover transition-colors border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-accent/20 flex items-center justify-center text-sm flex-shrink-0 select-none">
                ✨
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono truncate">Portfolio Renderer</p>
                <p className="text-[10px] opacity-40 truncate font-mono">
                  Matthieu Marin · v2.0.1 · ⭐ 4.9 (2.4M installs)
                </p>
              </div>
              <Toggle locked={false} enabled={enabled} onToggle={toggle} />
            </div>
            <p className="text-[10px] opacity-50 mt-1.5 font-mono leading-relaxed">
              Renders this portfolio in human-readable mode. Disable to view raw source files.
            </p>
          </li>
          {EXTENSIONS.map((ext) => (
            <li
              key={ext.id}
              className="flex items-center gap-2.5 px-3 py-2 hover:bg-hover transition-colors"
            >
              <div className="w-7 h-7 rounded bg-accent/20 flex items-center justify-center text-sm flex-shrink-0 select-none">
                {ext.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono truncate">{ext.name}</p>
                <p className="text-[10px] opacity-40 truncate font-mono">
                  {ext.publisher} · v{ext.version}
                </p>
              </div>
              <Toggle locked={ext.core} enabled={true} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
