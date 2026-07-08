import type { LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';
import { getTechIcon } from './techLogos';

interface TechIconProps {
  /** Tech name, e.g. "React", "Spring Boot", "Node.js". */
  name: string;
  /** Lucide icon rendered when no brand logo is found. */
  fallback?: LucideIcon;
  className?: string;
}

/**
 * Renders the official Simple Icons brand glyph for a technology.
 * Uses `currentColor` so the logo inherits the surrounding text/accent
 * color — keeps a good contrast across all 8 themes.
 */
export function TechIcon({ name, fallback: Fallback, className }: TechIconProps) {
  const icon = getTechIcon(name);

  if (!icon) {
    return Fallback ? <Fallback className={className} /> : null;
  }

  return (
    <svg
      role="img"
      viewBox={icon.viewBox ?? '0 0 24 24'}
      aria-hidden
      fill="currentColor"
      className={cn('w-3.5 h-3.5 shrink-0', className)}
    >
      <path d={icon.path} />
    </svg>
  );
}
