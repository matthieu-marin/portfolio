import { useEffect } from 'react';

export interface ShortcutHandlers {
  onCommandPalette?: () => void;
  onToggleExplorer?: () => void;
  onToggleTerminal?: () => void;
  onCloseTab?: () => void;
  onSwitchTab?: (index: number) => void;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
  if (target.isContentEditable) return true;
  return false;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;

      // Cmd+K → command palette. Even when typing.
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handlers.onCommandPalette?.();
        return;
      }

      // Other shortcuts: don't fire while typing
      if (isEditableTarget(e.target)) return;

      // Cmd+B → toggle explorer
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        handlers.onToggleExplorer?.();
        return;
      }

      // Cmd+` → toggle terminal
      if (e.key === '`') {
        e.preventDefault();
        handlers.onToggleTerminal?.();
        return;
      }

      // Cmd+W → close current tab
      if ((e.key === 'w' || e.key === 'W') && !e.shiftKey) {
        // Prevent browser tab close (Mac Safari/Chrome may not allow override but try)
        e.preventDefault();
        handlers.onCloseTab?.();
        return;
      }

      // Cmd+1..6 → switch tab by index
      if (/^[1-6]$/.test(e.key)) {
        e.preventDefault();
        handlers.onSwitchTab?.(parseInt(e.key, 10) - 1);
        return;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers]);
}
