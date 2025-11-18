import { motion } from 'motion/react';
import { BookOpen, Code, Zap, CheckCircle2 } from 'lucide-react';

interface SkillDoc {
  name: string;
  description: string;
  keyFeatures: string[];
  experience: string;
  projects: string[];
}

interface SkillDocumentationProps {
  skillId: string;
  language: 'fr' | 'en';
}

const skillDocs: Record<string, { fr: SkillDoc; en: SkillDoc }> = {
  react: {
    fr: {
      name: 'React',
      description: 'Bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateur interactives et réactives avec une approche basée sur les composants.',
      keyFeatures: [
        'Virtual DOM pour des performances optimales',
        'Composants réutilisables et modulaires',
        'Hooks pour la gestion d\'état',
        'Écosystème riche et communauté active'
      ],
      experience: '5+ années d\'expérience en production',
      projects: ['Applications web complexes', 'Dashboards interactifs', 'Systèmes de design']
    },
    en: {
      name: 'React',
      description: 'JavaScript library developed by Facebook for building interactive and reactive user interfaces with a component-based approach.',
      keyFeatures: [
        'Virtual DOM for optimal performance',
        'Reusable and modular components',
        'Hooks for state management',
        'Rich ecosystem and active community'
      ],
      experience: '5+ years of production experience',
      projects: ['Complex web applications', 'Interactive dashboards', 'Design systems']
    }
  },
  typescript: {
    fr: {
      name: 'TypeScript',
      description: 'Superset de JavaScript développé par Microsoft qui ajoute un typage statique optionnel pour améliorer la maintenabilité et la robustesse du code.',
      keyFeatures: [
        'Typage statique pour moins d\'erreurs',
        'Autocomplétion et IntelliSense',
        'Refactoring sécurisé',
        'Compatible avec JavaScript existant'
      ],
      experience: '4+ années en développement strictement typé',
      projects: ['Applications enterprise', 'APIs type-safe', 'Librairies réutilisables']
    },
    en: {
      name: 'TypeScript',
      description: 'JavaScript superset developed by Microsoft that adds optional static typing to improve code maintainability and robustness.',
      keyFeatures: [
        'Static typing for fewer errors',
        'Autocomplete and IntelliSense',
        'Safe refactoring',
        'Compatible with existing JavaScript'
      ],
      experience: '4+ years in strictly typed development',
      projects: ['Enterprise applications', 'Type-safe APIs', 'Reusable libraries']
    }
  },
  nodejs: {
    fr: {
      name: 'Node.js',
      description: 'Environnement d\'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome, permettant de construire des applications réseau rapides et scalables.',
      keyFeatures: [
        'I/O non-bloquant et asynchrone',
        'NPM - le plus grand écosystème de packages',
        'Performance élevée pour les APIs',
        'Même langage frontend et backend'
      ],
      experience: '5+ années en développement backend',
      projects: ['APIs RESTful', 'Microservices', 'Applications temps réel']
    },
    en: {
      name: 'Node.js',
      description: 'Server-side JavaScript runtime based on Chrome\'s V8 engine, enabling fast and scalable network applications.',
      keyFeatures: [
        'Non-blocking, asynchronous I/O',
        'NPM - the largest package ecosystem',
        'High performance for APIs',
        'Same language frontend and backend'
      ],
      experience: '5+ years in backend development',
      projects: ['RESTful APIs', 'Microservices', 'Real-time applications']
    }
  },
  tailwind: {
    fr: {
      name: 'Tailwind CSS',
      description: 'Framework CSS utility-first qui permet de construire rapidement des designs modernes et responsives directement dans le HTML.',
      keyFeatures: [
        'Approche utility-first',
        'Customisation complète via config',
        'Purge automatique du CSS inutilisé',
        'Design système cohérent'
      ],
      experience: '3+ années pour des interfaces modernes',
      projects: ['Sites web responsives', 'Applications SaaS', 'Design systems']
    },
    en: {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapidly building modern, responsive designs directly in HTML.',
      keyFeatures: [
        'Utility-first approach',
        'Full customization via config',
        'Automatic purging of unused CSS',
        'Consistent design system'
      ],
      experience: '3+ years building modern interfaces',
      projects: ['Responsive websites', 'SaaS applications', 'Design systems']
    }
  }
};

export function SkillDocumentation({ skillId, language }: SkillDocumentationProps) {
  const doc = skillDocs[skillId]?.[language];

  if (!doc) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-hover rounded-lg border-l-4 border-accent space-y-6 font-mono text-sm"
    >
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <BookOpen className="w-5 h-5 text-accent" />
        <h3 className="text-syntax-class text-lg">
          {language === 'fr' ? 'Documentation' : 'Documentation'}: {doc.name}
        </h3>
      </div>
      <div>
        <div className="text-syntax-comment text-xs mb-2">
          /** {language === 'fr' ? 'Description' : 'Description'} */
        </div>
        <p className="text-foreground/90 ml-2">{doc.description}</p>
      </div>
      <div>
        <div className="flex items-center gap-2 text-syntax-keyword mb-3">
          <Zap className="w-4 h-4" />
          <span>{language === 'fr' ? 'Fonctionnalités clés' : 'Key Features'}</span>
        </div>
        <ul className="space-y-2 ml-6">
          {doc.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-foreground/80">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-syntax-comment text-xs mb-2">
          Experience
        </div>
        <div className="bg-background/50 p-3 rounded ml-2">
          <code className="text-syntax-string">{doc.experience}</code>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-syntax-variable mb-3">
          <Code className="w-4 h-4" />
          <span>{language === 'fr' ? 'Projets réalisés' : 'Projects Completed'}</span>
        </div>
        <div className="flex flex-wrap gap-2 ml-2">
          {doc.projects.map((project, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-background/50 text-syntax-class text-xs rounded border border-border"
            >
              {project}
            </span>
          ))}
        </div>
      </div>
      <div className="pt-3 border-t border-border">
        <div className="text-syntax-comment text-xs">
          <span className="text-syntax-punctuation">{'<'}</span>
          <span>{language === 'fr' ? 'Fin de la documentation' : 'End of documentation'}</span>
          <span className="text-syntax-punctuation">{' />'}</span>
        </div>
      </div>
    </motion.div>
  );
}
