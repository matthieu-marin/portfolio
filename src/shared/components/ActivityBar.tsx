import { Files, Puzzle } from 'lucide-react';
import { cn } from './ui/utils';
import { MOD, SEP } from '../utils/platform';
import type { PanelId } from '../../app/types';

interface ActivityBarProps {
  activePanel: PanelId | null;
  onPanelSelect: (id: PanelId) => void;
}

const PANELS: { id: PanelId; icon: React.ElementType; label: string }[] = [
  { id: 'explorer',   icon: Files,  label: `Explorer (${MOD}${SEP}B)` },
  { id: 'extensions', icon: Puzzle, label: 'Extensions' },
];

export function ActivityBar({ activePanel, onPanelSelect }: ActivityBarProps) {
  return (
    <div className="hidden md:flex flex-col items-center w-11 bg-sidebar border-r border-border py-1 flex-shrink-0">
      {PANELS.map(({ id, icon: Icon, label }) => {
        const isActive = activePanel === id;
        return (
          <button
            key={id}
            onClick={() => onPanelSelect(id)}
            title={label}
            aria-label={label}
            className={cn(
              'relative w-9 h-9 flex items-center justify-center rounded transition-all duration-150 my-0.5',
              isActive
                ? 'text-foreground before:absolute before:left-[-4px] before:inset-y-1 before:w-0.5 before:bg-foreground before:rounded-r'
                : 'text-muted-foreground opacity-50 hover:opacity-100'
            )}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
