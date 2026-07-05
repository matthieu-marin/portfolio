import { useEffect, useRef } from 'react';

export interface ShortcutHandlers {
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
  // Keep the latest handlers in a ref so the listener mounts only once.
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;
      const h = handlersRef.current;

      // Shortcuts don't fire while typing in an input/textarea.
      if (isEditableTarget(e.target)) return;

      // Cmd+B → toggle explorer
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        h.onToggleExplorer?.();
        return;
      }

      // Cmd+` → toggle terminal
      if (e.key === '`') {
        e.preventDefault();
        h.onToggleTerminal?.();
        return;
      }

      // Cmd+Shift+W → close current IDE tab. Cmd+W is reserved by the
      // browser (most engines don't honour preventDefault on it), so we
      // require Shift to avoid closing the browser tab by accident.
      if ((e.key === 'w' || e.key === 'W') && e.shiftKey) {
        e.preventDefault();
        h.onCloseTab?.();
        return;
      }

      // Cmd+1..6 → switch tab by index
      if (/^[1-6]$/.test(e.key)) {
        e.preventDefault();
        h.onSwitchTab?.(parseInt(e.key, 10) - 1);
        return;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
