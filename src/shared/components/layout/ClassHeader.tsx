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
        {/*
          Flux de texte inline (pas de flex-wrap) -> wrap coherent cross-browser.
          overflow-wrap:anywhere autorise la coupure d'un nom de classe tres long
          sur petit ecran. L'espace insecable ( ) entre le nom et "{" garde
          l'accolade collee au dernier mot : elle ne tombe jamais seule a la ligne.
        */}
        <div className="flex-1 min-w-0 leading-relaxed [overflow-wrap:anywhere]">
          <span className="text-syntax-keyword">class</span>{' '}
          <span
            className={cn('text-syntax-class', accent.text)}
            style={{ fontSize: '1.1em' }}
          >
            {titleEditKey ? (
              <EditableText value={title} editKey={titleEditKey} />
            ) : (
              title
            )}
          </span>
          {' '}
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
