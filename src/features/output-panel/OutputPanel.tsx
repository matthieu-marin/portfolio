import { useRef } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { TerminalView } from './TerminalView';
import { OutputPanelProps } from './types';

export function OutputPanel({ mode, onClose, title, customContent }: OutputPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const displayTitle = title || (mode === 'terminal' ? 'Terminal' : 'Output');

  return (
    <div className="h-full flex flex-col bg-terminal">
      <div className="bg-terminal-header border-b border-border px-4 py-2 flex items-center justify-between">
        <span className="text-sm">{displayTitle}</span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-hover rounded">
            <Minus className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-hover rounded">
            <Square className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-hover rounded" onClick={onClose}>
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div 
        ref={contentRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm text-terminal-text"
      >
        {mode === 'terminal' ? (
          <TerminalView ref={contentRef} />
        ) : (
          customContent || null
        )}
      </div>
    </div>
  );
}

