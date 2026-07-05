// Detect macOS so keyboard-shortcut hints show the right modifier.
// All shortcut *handlers* already accept ctrlKey || metaKey — this only
// affects how the shortcut is *displayed* (⌘ on Mac, Ctrl on Win/Linux).
export const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/i.test(
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
      ?.platform || navigator.platform || navigator.userAgent
  );

/** Modifier label: "⌘" on macOS, "Ctrl" elsewhere. */
export const MOD = isMac ? '⌘' : 'Ctrl';
/** Shift label: "⇧" on macOS, "Shift" elsewhere. */
export const SHIFT = isMac ? '⇧' : 'Shift';
/** Separator between keys: none on macOS (⌘B), "+" elsewhere (Ctrl+B). */
export const SEP = isMac ? '' : '+';

/**
 * Builds a shortcut label from a modifier + keys.
 * combo('B')        → "⌘B"   / "Ctrl+B"
 * combo('1…6')      → "⌘1…6" / "Ctrl+1…6"
 */
export function combo(...keys: string[]): string {
  return [MOD, ...keys].join(SEP);
}
