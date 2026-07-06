// ─────────────────────────────────────────────────────────────
// Primitives partagées de la vue recruteur (Portfolio Renderer).
// Contenu lisible pour un public non technique : typographie
// font-sans explicite (le corps du site est mono par défaut),
// espacement généreux, cartes qui apparaissent en cascade.
// Réutilisées par toutes les pages recruteur (Tasks 7-9).
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../shared/components/ui/utils';

export function RecruiterShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm overflow-auto relative z-10">
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
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.12, 0.3), duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={cn(
        'bg-editor/50 border border-border rounded-xl p-5 md:p-7',
        'shadow-sm hover:shadow-md hover:border-accent/40 transition-shadow',
        className
      )}
    >
      <h2 className="flex items-center gap-2.5 text-lg md:text-xl font-semibold text-foreground mb-4">
        <Icon className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
        {title}
      </h2>
      <div className="text-sm md:text-base text-foreground/80 leading-relaxed">{children}</div>
    </motion.section>
  );
}

interface ChipProps {
  children: ReactNode;
  onClick?: () => void;
}

export function Chip({ children, onClick }: ChipProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors cursor-pointer"
      >
        {children}
      </button>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
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
}

export function StatCounter({ value, suffix, label }: StatCounterProps) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-accent tabular-nums">
        {count}
        {suffix ?? ''}
      </div>
      <div className="text-xs md:text-sm text-foreground/60 mt-1">{label}</div>
    </div>
  );
}
