import { useEffect, useRef } from 'react';
import { cn } from './ui/utils';
import { useEditContext } from '../contexts/EditContext';

interface EditableTextProps {
  value: string;
  editKey: string;
  className?: string;
  multiline?: boolean;
}

export function EditableText({ value, editKey, className, multiline = false }: EditableTextProps) {
  const { edits, setEdit } = useEditContext();
  const ref = useRef<HTMLSpanElement>(null);
  const displayValue = edits[editKey] ?? value;

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = displayValue;
    }
  }, [displayValue]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={cn(
        'outline-none rounded-sm px-0.5 -mx-0.5',
        'hover:ring-1 hover:ring-inset hover:ring-white/20',
        'focus:ring-1 focus:ring-inset focus:ring-accent/40 focus:bg-accent/5',
        'transition-all duration-100 cursor-text',
        className
      )}
      onKeyDown={(e) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === 'Escape') {
          if (ref.current) ref.current.textContent = displayValue;
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => {
        setEdit(editKey, e.currentTarget.textContent ?? value);
      }}
    />
  );
}
