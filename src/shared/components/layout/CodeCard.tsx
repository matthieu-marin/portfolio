import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../ui/utils';
import { ACCENT_CLASSES, type AccentColor } from './accent';
import { CodeCardProvider } from './CodeCardContext';

interface CodeCardProps {
  accentColor: AccentColor;
  delay?: number;
  highlighted?: boolean;
  className?: string;
  initialX?: number;
  children: React.ReactNode;
}

export const CodeCard = forwardRef<HTMLDivElement, CodeCardProps>(function CodeCard(
  { accentColor, delay = 0, highlighted = false, className, initialX, children },
  ref
) {
  const accent = ACCENT_CLASSES[accentColor];

  const initial =
    initialX !== undefined ? { opacity: 0, x: initialX } : { opacity: 0, y: 20 };
  const animate = initialX !== undefined ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ delay }}
      className={cn(
        'group bg-editor/50 rounded-lg p-4 md:p-6 overflow-hidden',
        'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20',
        accent.borderLeft,
        accent.hoverBorder,
        'transition-all duration-300',
        highlighted && 'ring-2 ring-accent',
        className
      )}
    >
      <CodeCardProvider accentColor={accentColor}>{children}</CodeCardProvider>
    </motion.div>
  );
});

export { ACCENT_CLASSES } from './accent';
export type { AccentColor } from './accent';
