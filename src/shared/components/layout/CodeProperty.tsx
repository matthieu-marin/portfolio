import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';
import { EditableText } from '../EditableText';
import { ACCENT_CLASSES } from './accent';
import { useCodeCardAccent } from './CodeCardContext';

interface CodePropertyProps {
  name: string;
  nameEditKey?: string;
  value?: string;
  valueEditKey?: string;
  link?: string;
  icon?: LucideIcon;
  multiline?: boolean;
  children?: React.ReactNode;
}

export function CodeProperty({
  name,
  nameEditKey,
  value,
  valueEditKey,
  link,
  icon: Icon,
  multiline = false,
  children,
}: CodePropertyProps) {
  const accent = ACCENT_CLASSES[useCodeCardAccent()];

  const valueNode = children ?? (
    valueEditKey && value !== undefined ? (
      <EditableText value={value} editKey={valueEditKey} multiline={multiline} />
    ) : (
      value
    )
  );

  const wrapped = link ? (
    <a
      href={link}
      target={link.startsWith('http') ? '_blank' : undefined}
      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={cn('hover:underline transition-colors', accent.text)}
    >
      <span className="text-syntax-string">"{valueNode}"</span>
    </a>
  ) : (
    <span className="text-syntax-string break-words">"{valueNode}"</span>
  );

  return (
    <div className="flex items-center gap-2 min-w-0 break-words">
      {Icon && <Icon className={cn('w-3 h-3 md:w-4 md:h-4 opacity-60 flex-shrink-0', accent.text)} />}
      <span className="text-syntax-property">
        {nameEditKey ? <EditableText value={name} editKey={nameEditKey} /> : name}
      </span>
      <span className="text-syntax-punctuation">:</span>{' '}
      {wrapped}
      <span className="text-syntax-punctuation">;</span>
    </div>
  );
}

interface CodeArrayPropertyProps {
  name: string;
  nameEditKey?: string;
  children: React.ReactNode;
  variant?: 'list' | 'inline';
}

export function CodeArrayProperty({
  name,
  nameEditKey,
  children,
  variant = 'list',
}: CodeArrayPropertyProps) {
  return (
    <div>
      <div>
        <span className="text-syntax-property">
          {nameEditKey ? <EditableText value={name} editKey={nameEditKey} /> : name}
        </span>
        <span className="text-syntax-punctuation">:</span>{' '}
        <span className="text-syntax-punctuation">[</span>
      </div>
      <div
        className={cn(
          'ml-4 mt-1',
          variant === 'list' ? 'space-y-1' : 'flex flex-wrap gap-2'
        )}
      >
        {children}
      </div>
      <div>
        <span className="text-syntax-punctuation">];</span>
      </div>
    </div>
  );
}

interface CodeArrayItemProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  isLast?: boolean;
  variant?: 'string' | 'instance' | 'pill';
  onClick?: () => void;
}

export function CodeArrayItem({
  icon: Icon,
  children,
  isLast = false,
  variant = 'string',
  onClick,
}: CodeArrayItemProps) {
  const accent = ACCENT_CLASSES[useCodeCardAccent()];

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs md:text-sm',
          'transition-colors',
          'border-current/20',
          accent.bg,
          accent.text,
          onClick && 'cursor-pointer'
        )}
      >
        {Icon && <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'instance') {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-syntax-keyword">new</span>{' '}
        <span className={cn('text-syntax-class', accent.text)}>{children}</span>
        <span className="text-syntax-punctuation">()</span>
        {!isLast && <span className="text-syntax-punctuation">,</span>}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 min-w-0">
      {Icon && (
        <Icon className={cn('w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0', accent.text)} />
      )}
      <span className="text-syntax-string break-words">"{children}"</span>
      {!isLast && <span className="text-syntax-punctuation">,</span>}
    </div>
  );
}
