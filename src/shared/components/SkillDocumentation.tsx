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
  java: {
    fr: {
      name: 'Java',
      description: 'Langage orienté objet utilisé chez Renault Digital pour développer des services backend robustes et typés.',
      keyFeatures: [
        'Typage statique fort',
        'JVM portable et performante',
        'Écosystème enterprise mature (Spring, Hibernate)',
        'Outillage de qualité (Maven, JUnit)'
      ],
      experience: 'Alternance en cours chez Renault Digital depuis sept. 2024',
      projects: ['Services backend Renault Digital']
    },
    en: {
      name: 'Java',
      description: 'Object-oriented language used at Renault Digital to build robust, statically-typed backend services.',
      keyFeatures: [
        'Strong static typing',
        'Portable and performant JVM',
        'Mature enterprise ecosystem (Spring, Hibernate)',
        'Quality tooling (Maven, JUnit)'
      ],
      experience: 'Apprenticeship in progress at Renault Digital since Sept 2024',
      projects: ['Renault Digital backend services']
    }
  },
  springboot: {
    fr: {
      name: 'Spring Boot',
      description: 'Framework Java pour bâtir rapidement des APIs REST et microservices configurables, utilisé au quotidien chez Renault Digital.',
      keyFeatures: [
        'Configuration par convention',
        'Injection de dépendances',
        'Starters pour intégrations courantes',
        'Tests d\'intégration via Spring Test'
      ],
      experience: 'Utilisé en alternance depuis sept. 2024',
      projects: ['Backends REST Renault Digital']
    },
    en: {
      name: 'Spring Boot',
      description: 'Java framework for quickly building configurable REST APIs and microservices, used daily at Renault Digital.',
      keyFeatures: [
        'Convention over configuration',
        'Dependency injection',
        'Starters for common integrations',
        'Integration testing via Spring Test'
      ],
      experience: 'Used in apprenticeship since Sept 2024',
      projects: ['Renault Digital REST backends']
    }
  },
  nodejs: {
    fr: {
      name: 'Node.js',
      description: 'Runtime JavaScript serveur utilisé pour le projet Territoire Connecté & Durable chez Faubourg Numérique.',
      keyFeatures: [
        'I/O non-bloquant et asynchrone',
        'Écosystème NPM massif',
        'Idéal pour APIs et services temps réel',
        'Mêmes outils côté front et back'
      ],
      experience: 'Stage de 4 mois chez Faubourg Numérique (2024)',
      projects: ['Plateforme IoT Territoire Connecté & Durable']
    },
    en: {
      name: 'Node.js',
      description: 'Server-side JavaScript runtime used for the Connected & Sustainable Territory project at Faubourg Numérique.',
      keyFeatures: [
        'Non-blocking, asynchronous I/O',
        'Massive NPM ecosystem',
        'Ideal for APIs and realtime services',
        'Same tooling on front and back'
      ],
      experience: '4-month internship at Faubourg Numérique (2024)',
      projects: ['Connected & Sustainable Territory IoT platform']
    }
  },
  vuejs: {
    fr: {
      name: 'Vue.js',
      description: 'Framework JavaScript progressif utilisé pour l\'interface de la plateforme IoT chez Faubourg Numérique.',
      keyFeatures: [
        'Single File Components',
        'Réactivité fine',
        'Courbe d\'apprentissage douce',
        'Composition API'
      ],
      experience: 'Stage Faubourg Numérique (2024)',
      projects: ['Frontend Territoire Connecté & Durable']
    },
    en: {
      name: 'Vue.js',
      description: 'Progressive JavaScript framework used to build the IoT platform front end at Faubourg Numérique.',
      keyFeatures: [
        'Single File Components',
        'Fine-grained reactivity',
        'Gentle learning curve',
        'Composition API'
      ],
      experience: 'Faubourg Numérique internship (2024)',
      projects: ['Connected & Sustainable Territory frontend']
    }
  },
  react: {
    fr: {
      name: 'React',
      description: 'Bibliothèque UI utilisée pour ce portfolio (React 18 + TypeScript) et au cours du Master Cloud Computing.',
      keyFeatures: [
        'Architecture composant',
        'Hooks pour la gestion d\'état',
        'Virtual DOM',
        'Écosystème riche'
      ],
      experience: 'Projets personnels et études (2023+)',
      projects: ['Portfolio IDE (ce site)']
    },
    en: {
      name: 'React',
      description: 'UI library used to build this portfolio (React 18 + TypeScript) and during the Master Cloud Computing program.',
      keyFeatures: [
        'Component architecture',
        'Hooks for state management',
        'Virtual DOM',
        'Rich ecosystem'
      ],
      experience: 'Personal projects and studies (2023+)',
      projects: ['Portfolio IDE (this site)']
    }
  },
  php: {
    fr: {
      name: 'PHP',
      description: 'Langage côté serveur utilisé lors des deux stages chez la Chatterie de la Terre de Brasco pour développer un site vitrine WordPress.',
      keyFeatures: [
        'Intégration native avec WordPress',
        'Déploiement simple sur hébergeur classique',
        'Vaste écosystème de CMS',
        'Syntaxe accessible'
      ],
      experience: 'Deux stages associatifs (2022 puis 2023)',
      projects: ['Site vitrine Chatterie de la Terre de Brasco']
    },
    en: {
      name: 'PHP',
      description: 'Server-side language used during both internships at Chatterie de la Terre de Brasco to build a WordPress showcase site.',
      keyFeatures: [
        'Native WordPress integration',
        'Simple deployment on classic hosting',
        'Vast CMS ecosystem',
        'Accessible syntax'
      ],
      experience: 'Two associative internships (2022 then 2023)',
      projects: ['Chatterie de la Terre de Brasco showcase site']
    }
  },
  wordpress: {
    fr: {
      name: 'WordPress',
      description: 'CMS open-source utilisé chez la Chatterie de la Terre de Brasco pour créer et finaliser un site vitrine.',
      keyFeatures: [
        'Thèmes et plugins extensibles',
        'Back-office prêt à l\'emploi',
        'Hébergement standardisé',
        'Personnalisation via PHP/Twig'
      ],
      experience: 'Deux stages (2022 et 2023)',
      projects: ['Site vitrine Chatterie de la Terre de Brasco']
    },
    en: {
      name: 'WordPress',
      description: 'Open-source CMS used at Chatterie de la Terre de Brasco to build and finalize a showcase site.',
      keyFeatures: [
        'Extensible themes and plugins',
        'Ready-to-use admin panel',
        'Standardized hosting',
        'Customization via PHP/Twig'
      ],
      experience: 'Two internships (2022 and 2023)',
      projects: ['Chatterie de la Terre de Brasco showcase site']
    }
  },
  mongodb: {
    fr: {
      name: 'MongoDB',
      description: 'Base NoSQL orientée documents utilisée pendant le stage Faubourg Numérique pour stocker les données capteurs IoT.',
      keyFeatures: [
        'Modèle document flexible',
        'Indexation puissante',
        'Scalabilité horizontale',
        'Aggregation pipeline'
      ],
      experience: 'Stage Faubourg Numérique (2024) et études',
      projects: ['Plateforme IoT Territoire Connecté & Durable']
    },
    en: {
      name: 'MongoDB',
      description: 'Document-oriented NoSQL database used during the Faubourg Numérique internship to store IoT sensor data.',
      keyFeatures: [
        'Flexible document model',
        'Powerful indexing',
        'Horizontal scalability',
        'Aggregation pipeline'
      ],
      experience: 'Faubourg Numérique internship (2024) and studies',
      projects: ['Connected & Sustainable Territory IoT platform']
    }
  },
  agile: {
    fr: {
      name: 'Agile / SCRUM',
      description: 'Méthode de gestion de projet pratiquée au quotidien chez Renault Digital : sprints, daily, rétrospectives.',
      keyFeatures: [
        'Sprints courts et itératifs',
        'Cérémonies SCRUM',
        'Backlog priorisé',
        'Amélioration continue'
      ],
      experience: 'Alternance Renault Digital depuis sept. 2024',
      projects: ['Équipe agile Renault Digital']
    },
    en: {
      name: 'Agile / SCRUM',
      description: 'Project management method practiced daily at Renault Digital: sprints, dailies, retrospectives.',
      keyFeatures: [
        'Short iterative sprints',
        'SCRUM ceremonies',
        'Prioritized backlog',
        'Continuous improvement'
      ],
      experience: 'Renault Digital apprenticeship since Sept 2024',
      projects: ['Renault Digital agile team']
    }
  },
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
          {language === 'fr' ? 'Expérience' : 'Experience'}
        </div>
        <div className="bg-background/50 p-3 rounded ml-2">
          <code className="text-syntax-string">{doc.experience}</code>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-syntax-variable mb-3">
          <Code className="w-4 h-4" />
          <span>{language === 'fr' ? 'Projets concernés' : 'Related projects'}</span>
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
