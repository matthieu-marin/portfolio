import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

function readSavedLanguage(): string {
  try {
    return localStorage.getItem('portfolio-language') || 'fr';
  } catch {
    return 'fr';
  }
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: readSavedLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
