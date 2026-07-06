// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// acquiredAt référence des ids d'expériences (voir experiences.ts) ou de
// projets (voir projects.ts) — 'studies' référence l'éducation (about.ts).
// Le badge recruteur affiche le nombre d'entrées de acquiredAt.
// ─────────────────────────────────────────────────────────────
import type { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    name: { fr: 'Backend', en: 'Backend' },
    skills: [
      {
        id: 'java',
        name: 'Java',
        description: {
          fr: 'Langage principal des services véhicule électrique chez Renault Digital',
          en: 'Main language of the electric-vehicle services at Renault Digital',
        },
        acquiredAt: ['renault'],
      },
      {
        id: 'springboot',
        name: 'Spring Boot',
        description: {
          fr: 'Framework Java des APIs et services événementiels développés en alternance',
          en: 'Java framework behind the APIs and event-driven services built during the apprenticeship',
        },
        acquiredAt: ['renault'],
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        description: {
          fr: 'Runtime JavaScript des microservices LocaCCM / StreamQuest et de la plateforme IoT',
          en: 'JavaScript runtime behind the LocaCCM / StreamQuest microservices and the IoT platform',
        },
        acquiredAt: ['faubourg', 'locaccm', 'streamquest'],
      },
      {
        id: 'php',
        name: 'PHP',
        description: {
          fr: 'Langage de script côté serveur pour le développement web',
          en: 'Server-side scripting language for web development',
        },
        acquiredAt: ['chatterie'],
      },
      {
        id: 'python',
        name: 'Python',
        description: {
          fr: "Langage polyvalent pour le scripting et l'automatisation",
          en: 'Versatile language for scripting and automation',
        },
        acquiredAt: ['studies'],
      },
    ],
  },
  {
    id: 'frontend',
    name: { fr: 'Frontend', en: 'Frontend' },
    skills: [
      {
        id: 'typescript',
        name: 'TypeScript',
        description: {
          fr: 'Langage de tous les microservices et frontends des projets de master',
          en: "Language of every microservice and frontend in the master's projects",
        },
        acquiredAt: ['locaccm', 'streamquest', 'portfolio'],
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        description: {
          fr: 'Langage principal du développement web',
          en: 'Main language of web development',
        },
        acquiredAt: ['faubourg', 'chatterie'],
      },
      {
        id: 'react',
        name: 'React',
        description: {
          fr: 'Bibliothèque UI de ce portfolio et du frontend StreamQuest',
          en: 'UI library behind this portfolio and the StreamQuest frontend',
        },
        acquiredAt: ['portfolio', 'streamquest'],
      },
      {
        id: 'vuejs',
        name: 'Vue.js',
        description: {
          fr: 'Framework JavaScript progressif pour le développement web',
          en: 'Progressive JavaScript framework for web development',
        },
        acquiredAt: ['faubourg'],
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        description: {
          fr: 'CMS open source pour la création de sites web',
          en: 'Open source CMS for website creation',
        },
        acquiredAt: ['chatterie'],
      },
    ],
  },
  {
    id: 'cloud',
    name: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    skills: [
      {
        id: 'googlecloud',
        name: 'Google Cloud',
        description: {
          fr: 'Pub/Sub, Firestore, GKE chez Renault ; Cloud Run et Artifact Registry sur les projets de master',
          en: "Pub/Sub, Firestore, GKE at Renault; Cloud Run and Artifact Registry on the master's projects",
        },
        acquiredAt: ['renault', 'locaccm', 'streamquest'],
      },
      {
        id: 'docker',
        name: 'Docker',
        description: {
          fr: 'Conteneurisation des services Renault et des microservices de master',
          en: "Containerization of the Renault services and the master's microservices",
        },
        acquiredAt: ['renault', 'locaccm', 'streamquest'],
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        description: {
          fr: 'Déploiement et exploitation des services véhicule électrique sur GKE',
          en: 'Deployment and operation of the electric-vehicle services on GKE',
        },
        acquiredAt: ['renault'],
      },
      {
        id: 'terraform',
        name: 'Terraform',
        description: {
          fr: "Infrastructure-as-Code des déploiements Cloud Run (LocaCCM, StreamQuest)",
          en: 'Infrastructure-as-Code for the Cloud Run deployments (LocaCCM, StreamQuest)',
        },
        acquiredAt: ['locaccm', 'streamquest', 'studies'],
      },
      {
        id: 'cicd',
        name: 'CI/CD',
        description: {
          fr: 'Pipelines GitLab CI chez Renault ; GitHub Actions + SonarCloud sur les projets de master',
          en: "GitLab CI pipelines at Renault; GitHub Actions + SonarCloud on the master's projects",
        },
        acquiredAt: ['renault', 'locaccm', 'streamquest'],
      },
    ],
  },
  {
    id: 'database',
    name: { fr: 'Database', en: 'Database' },
    skills: [
      {
        id: 'firestore',
        name: 'Firestore',
        description: {
          fr: 'Base temps réel des données du véhicule électrique (Charge Status)',
          en: 'Real-time database behind the electric-vehicle data (Charge Status)',
        },
        acquiredAt: ['renault'],
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        description: {
          fr: 'Base de données NoSQL pour des modèles de données flexibles',
          en: 'NoSQL database for flexible data models',
        },
        acquiredAt: ['faubourg'],
      },
      {
        id: 'sql',
        name: 'SQL',
        description: {
          fr: 'Langage de requête pour bases de données relationnelles (PostgreSQL via Prisma sur LocaCCM)',
          en: 'Query language for relational databases (PostgreSQL through Prisma on LocaCCM)',
        },
        acquiredAt: ['renault', 'locaccm', 'studies'],
      },
    ],
  },
  {
    id: 'tools',
    name: { fr: 'Outils', en: 'Tools' },
    skills: [
      {
        id: 'git',
        name: 'Git',
        description: {
          fr: 'Versionnement, merge requests et revue de code au quotidien',
          en: 'Everyday version control, merge requests and code review',
        },
        acquiredAt: ['renault', 'faubourg', 'locaccm', 'streamquest'],
      },
      {
        id: 'agile',
        name: 'Agile/SCRUM',
        description: {
          fr: 'Daily, sprints de 3 semaines et cycles PIP chez Renault ; SCRUM en équipe de 9 sur LocaCCM',
          en: 'Dailies, 3-week sprints and PIP cycles at Renault; SCRUM in a 9-person team on LocaCCM',
        },
        acquiredAt: ['renault', 'locaccm', 'streamquest'],
      },
    ],
  },
];
