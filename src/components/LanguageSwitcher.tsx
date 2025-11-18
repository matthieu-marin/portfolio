import { Languages } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { id: Language; label: string }[] = [
    { id: 'fr', label: 'FR' },
    { id: 'en', label: 'EN' },
  ];

  return (
    <div className="flex items-center gap-1 bg-hover rounded p-1">
      <Languages className="w-4 h-4 ml-1" />
      {languages.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setLanguage(id)}
          className={`
            px-2 py-1 rounded text-xs transition-colors
            ${language === id ? 'bg-accent text-accent-foreground' : 'hover:bg-background'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
