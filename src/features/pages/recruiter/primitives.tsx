// ─────────────────────────────────────────────────────────────
// Primitives partagées de la vue recruteur (Portfolio Renderer).
// Contenu lisible pour un public non technique : typographie
// font-sans explicite (le corps du site est mono par défaut),
// espacement généreux, cartes qui apparaissent en cascade.
// Réutilisées par toutes les pages recruteur (Tasks 7-9).
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../../i18n/hooks';
import { cn } from '../../../shared/components/ui/utils';

// Palette d'accents des sections, dérivée des variables de thème --syntax-*
// (jamais d'hex en dur) : chaque carte reçoit une couleur qui tourne avec
// son index pour casser le monochrome de la vue recruteur.
const SECTION_COLORS = [
  'var(--syntax-property)',
  'var(--syntax-string)',
  'var(--syntax-variable)',
  'var(--syntax-keyword)',
  'var(--syntax-class)',
  'var(--syntax-operator)',
] as const;

export function sectionColor(index: number): string {
  return SECTION_COLORS[index % SECTION_COLORS.length];
}

export function RecruiterShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-full bg-editor/90 overflow-auto relative z-10">
      <div className="max-w-3xl mx-auto p-6 md:p-10 space-y-6 min-h-full pb-16 font-sans">
        {children}
      </div>
    </div>
  );
}

interface SectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  index?: number;
  className?: string;
}

export function Section({ icon: Icon, title, children, index = 0, className }: SectionProps) {
  const color = sectionColor(index);
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.12, 0.3), duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={cn(
        'relative bg-editor/50 border border-border border-l-[3px] rounded-xl p-5 md:p-7',
        'shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      style={{ borderLeftColor: color }}
    >
      <h2 className="flex items-center gap-2.5 text-lg md:text-xl font-semibold text-foreground mb-4">
        <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} aria-hidden="true" />
        {title}
      </h2>
      <div className="text-sm md:text-base text-foreground/80 leading-relaxed">{children}</div>
    </motion.section>
  );
}

interface ChipProps {
  children: ReactNode;
  onClick?: () => void;
  // Style discret pour les chips non techniques (« Autres compétences »).
  muted?: boolean;
}

export function Chip({ children, onClick, muted }: ChipProps) {
  const { t } = useLanguage();
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={t('recruiter.chipNavigate')}
        className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm hover:bg-accent/25 hover:shadow-sm transition-all cursor-pointer"
      >
        {children}
        <ArrowUpRight className="w-3 h-3 ml-1 opacity-60" aria-hidden="true" />
      </button>
    );
  }
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm',
        muted ? 'bg-foreground/5 text-foreground/70' : 'bg-accent/10 text-accent'
      )}
    >
      {children}
    </span>
  );
}

function useCountUp(target: number, durationMs = 800): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(from + (target - from) * progress));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs]);

  return value;
}

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  color?: string;
}

export function StatCounter({ value, suffix, label, color }: StatCounterProps) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <div
        className={cn('text-2xl md:text-3xl font-bold tabular-nums', !color && 'text-accent')}
        style={color ? { color } : undefined}
      >
        {count}
        {suffix ?? ''}
      </div>
      <div className="text-xs md:text-sm text-foreground/60 mt-1">{label}</div>
    </div>
  );
}
