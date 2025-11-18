import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.projects': { fr: 'Projets', en: 'Projects' },
  'nav.skills': { fr: 'Compétences', en: 'Skills' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.experience': { fr: 'Expérience', en: 'Experience' },
  
  // Home
  'home.greeting': { fr: 'Bonjour, je suis', en: 'Hello, I\'m' },
  'home.title': { fr: 'Développeur Full Stack', en: 'Full Stack Developer' },
  'home.subtitle': { fr: 'Passionné par la création d\'expériences web innovantes', en: 'Passionate about creating innovative web experiences' },
  
  // About
  'about.title': { fr: 'À propos de moi', en: 'About Me' },
  'about.description': { fr: 'Développeur passionné avec plusieurs années d\'expérience dans la création d\'applications web modernes. J\'aime résoudre des problèmes complexes et créer des interfaces utilisateur élégantes.', en: 'Passionate developer with several years of experience creating modern web applications. I love solving complex problems and creating elegant user interfaces.' },
  'about.experience': { fr: 'Expérience', en: 'Experience' },
  'about.education': { fr: 'Formation', en: 'Education' },
  
  // Projects
  'projects.title': { fr: 'Mes Projets', en: 'My Projects' },
  'projects.viewCode': { fr: 'Voir le code', en: 'View Code' },
  'projects.viewDemo': { fr: 'Voir la démo', en: 'View Demo' },
  
  // Skills
  'skills.title': { fr: 'Compétences Techniques', en: 'Technical Skills' },
  'skills.frontend': { fr: 'Frontend', en: 'Frontend' },
  'skills.backend': { fr: 'Backend', en: 'Backend' },
  'skills.tools': { fr: 'Outils', en: 'Tools' },
  
  // Contact
  'contact.title': { fr: 'Contactez-moi', en: 'Contact Me' },
  'contact.description': { fr: 'N\'hésitez pas à me contacter pour discuter de vos projets', en: 'Feel free to contact me to discuss your projects' },
  'contact.name': { fr: 'Nom', en: 'Name' },
  'contact.email': { fr: 'Email', en: 'Email' },
  'contact.message': { fr: 'Message', en: 'Message' },
  'contact.send': { fr: 'Envoyer', en: 'Send' },
  
  // Experience
  'experience.title': { fr: 'Expérience Professionnelle', en: 'Professional Experience' },
  
  // Terminal
  'terminal.welcome': { fr: 'Bienvenue dans le terminal interactif', en: 'Welcome to the interactive terminal' },
  'terminal.help': { fr: 'Tapez "help" pour voir les commandes disponibles', en: 'Type "help" to see available commands' },
  
  // Status Bar
  'status.terminal': { fr: 'Terminal', en: 'Terminal' },
  'status.theme': { fr: 'Thème', en: 'Theme' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}