// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// acquiredAt référence des ids d'expériences (voir experiences.ts) ou de
// projets (voir projects.ts) — 'studies' référence l'éducation (about.ts).
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
        level: 'intermediate',
        description: {
          fr: 'Langage orienté objet utilisé chez Renault Digital',
          en: 'Object-oriented language used at Renault Digital',
        },
        acquiredAt: ['renault'],
      },
      {
        id: 'springboot',
        name: 'Spring Boot',
        level: 'intermediate',
        description: {
          fr: "Framework Java pour le développement d'applications web",
          en: 'Java framework for web application development',
        },
        acquiredAt: ['renault'],
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        level: 'intermediate',
        description: {
          fr: 'JavaScript runtime for scalable server applications',
          en: 'JavaScript runtime for scalable server applications',
        },
        acquiredAt: ['faubourg'],
      },
      {
        id: 'php',
        name: 'PHP',
        level: 'intermediate',
        description: {
          fr: 'Langage de script côté serveur pour le développement web',
          en: 'Server-side scripting language for web development',
        },
        acquiredAt: ['chatterie2', 'chatterie1'],
      },
      {
        id: 'python',
        name: 'Python',
        level: 'beginner',
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
        id: 'javascript',
        name: 'JavaScript',
        level: 'advanced',
        description: {
          fr: 'Langage principal du développement web',
          en: 'Main language of web development',
        },
        acquiredAt: ['faubourg', 'chatterie2'],
      },
      {
        id: 'react',
        name: 'React',
        level: 'intermediate',
        description: {
          fr: 'Bibliothèque UI pour construire des interfaces interactives',
          en: 'UI library for building interactive interfaces',
        },
        acquiredAt: ['portfolio'],
      },
      {
        id: 'vuejs',
        name: 'Vue.js',
        level: 'intermediate',
        description: {
          fr: 'Framework JavaScript progressif pour le développement web',
          en: 'Progressive JavaScript framework for web development',
        },
        acquiredAt: ['faubourg'],
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        level: 'intermediate',
        description: {
          fr: 'CMS open source pour la création de sites web',
          en: 'Open source CMS for website creation',
        },
        acquiredAt: ['chatterie2', 'chatterie1'],
      },
    ],
  },
  {
    id: 'database',
    name: { fr: 'Database', en: 'Database' },
    skills: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        level: 'intermediate',
        description: {
          fr: 'Base de données NoSQL pour des modèles de données flexibles',
          en: 'NoSQL database for flexible data models',
        },
        acquiredAt: ['faubourg'],
      },
      {
        id: 'sql',
        name: 'SQL',
        level: 'intermediate',
        description: {
          fr: 'Langage de requête pour bases de données relationnelles',
          en: 'Query language for relational databases',
        },
        acquiredAt: ['renault', 'studies'],
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
        level: 'intermediate',
        description: {
          fr: 'Système de contrôle de version distribué',
          en: 'Distributed version control system',
        },
        acquiredAt: ['renault', 'faubourg'],
      },
      {
        id: 'agile',
        name: 'Agile/SCRUM',
        level: 'intermediate',
        description: {
          fr: 'Méthode de gestion de projet itérative',
          en: 'Iterative project management method',
        },
        acquiredAt: ['renault'],
      },
    ],
  },
];
