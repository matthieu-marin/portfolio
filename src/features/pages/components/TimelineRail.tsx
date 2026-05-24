import { cn } from '../../../shared/components/ui/utils';
import { ACCENT_CLASSES, type AccentColor } from '../../../shared/components/layout';

interface TimelineEntryProps {
  year: string;
  accentColor: AccentColor;
  current?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}

export function TimelineEntry({
  year,
  accentColor,
  current = false,
  isFirst = false,
  isLast = false,
  children,
}: TimelineEntryProps) {
  const accent = ACCENT_CLASSES[accentColor];

  return (
    <div className="relative grid grid-cols-[52px_1fr] md:grid-cols-[80px_1fr] gap-3 md:gap-5">
      {/* Rail column */}
      <div className="relative">
        {/* Vertical line — drawn the full height of the row */}
        <div
          className={cn(
            'absolute left-[20px] md:left-[32px] w-px bg-border',
            isFirst ? 'top-3' : 'top-0',
            isLast ? 'bottom-3' : 'bottom-0'
          )}
          aria-hidden
        />

        {/* Bullet */}
        <div
          className={cn(
            'relative mt-3 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full',
            'ml-[14px] md:ml-[26px]',
            'border-2 border-background',
            current ? 'animate-pulse' : '',
            'shadow-[0_0_0_3px_var(--background)]',
            // Fill with accent
            accent.text.replace('text-', 'bg-')
          )}
          aria-hidden
        />

        {/* Year label */}
        <div className="mt-2 font-mono text-[10px] md:text-xs text-foreground/70 text-right pr-1 md:pr-2 break-words leading-tight">
          {year}
        </div>
      </div>

      {/* Card column */}
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function extractYearRange(period: string): string {
  // Examples:
  // "sept. 2024 – aujourd'hui"  → "2024 →"
  // "mai 2024 – août 2024"      → "2024"
  // "février 2023"               → "2023"
  // "mai 2022"                   → "2022"
  const years = period.match(/\d{4}/g);
  if (!years || years.length === 0) return period;
  if (years.length === 1) {
    if (/aujourd|present|current/i.test(period)) return `${years[0]} →`;
    return years[0];
  }
  if (years[0] === years[1]) return years[0];
  return `${years[0]}–${years[1]}`;
}
