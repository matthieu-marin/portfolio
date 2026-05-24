import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';
import { EditableText } from '../EditableText';
import { ACCENT_CLASSES } from './accent';
import { useCodeCardAccent } from './CodeCardContext';

interface ClassHeaderProps {
  icon: LucideIcon;
  title: string;
  titleEditKey?: string;
  rightSlot?: React.ReactNode;
}

export function ClassHeader({ icon: Icon, title, titleEditKey, rightSlot }: ClassHeaderProps) {
  const accent = ACCENT_CLASSES[useCodeCardAccent()];

  return (
    <div className="font-mono space-y-2 text-sm md:text-base mb-4">
      <div className="flex items-center gap-3">
        <Icon className={cn('w-5 h-5 md:w-6 md:h-6 flex-shrink-0', accent.text)} />
        <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
          <span className="text-syntax-keyword">class</span>{' '}
          <span
            className={cn('text-syntax-class break-words', accent.text)}
            style={{ fontSize: '1.1em' }}
          >
            {titleEditKey ? (
              <EditableText value={title} editKey={titleEditKey} />
            ) : (
              title
            )}
          </span>{' '}
          <span className="text-syntax-punctuation">{'{'}</span>
        </div>
        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
      </div>
    </div>
  );
}

export function ClassClose() {
  return (
    <div className="font-mono text-sm md:text-base mt-3">
      <span className="text-syntax-punctuation">{'}'}</span>
    </div>
  );
}

interface ClassBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ClassBody({ children, className }: ClassBodyProps) {
  return (
    <div
      className={cn(
        'ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
