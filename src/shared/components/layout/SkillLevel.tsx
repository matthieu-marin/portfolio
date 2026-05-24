import { cn } from '../ui/utils';
import { ACCENT_CLASSES } from './accent';
import { useCodeCardAccent } from './CodeCardContext';

export type SkillLevelValue = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const LEVEL_FILL: Record<SkillLevelValue, number> = {
  Beginner: 2,
  Intermediate: 5,
  Advanced: 8,
  Expert: 10,
};

const TOTAL = 10;

interface SkillLevelProps {
  level: SkillLevelValue | string;
  className?: string;
  label?: string;
}

export function SkillLevel({ level, className, label }: SkillLevelProps) {
  const accent = ACCENT_CLASSES[useCodeCardAccent()];
  const fill = LEVEL_FILL[level as SkillLevelValue] ?? 5;

  return (
    <div className={cn('flex items-center gap-2 font-mono text-sm md:text-base', className)}>
      <span className="text-syntax-property">{label ?? 'level'}</span>
      <span className="text-syntax-punctuation">:</span>{' '}
      <span aria-hidden className="tracking-[0.05em] select-none whitespace-nowrap">
        <span className="text-syntax-punctuation">[</span>
        <span className={accent.text}>{'█'.repeat(fill)}</span>
        <span className="opacity-30">{'░'.repeat(Math.max(0, TOTAL - fill))}</span>
        <span className="text-syntax-punctuation">]</span>
      </span>{' '}
      <span className="text-syntax-string">"{level}"</span>
      <span className="text-syntax-punctuation">;</span>
    </div>
  );
}
