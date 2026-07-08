import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLanguage() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-language', i18n.language);
    } catch {
      // Storage disabled — language won't persist across reloads.
    }
  }, [i18n.language]);

  const setLanguage = (lang: 'fr' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return {
    language: i18n.language as 'fr' | 'en',
    setLanguage,
    t,
  };
}

