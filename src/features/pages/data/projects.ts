// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// Les projets menés PENDANT une expérience (stage/alternance) vivent dans
// experiences.ts (champ subProjects), pas ici.
// ─────────────────────────────────────────────────────────────
import type { ProjectEntry } from './types';

export const projects: ProjectEntry[] = [
  {
    id: 'streamquest',
    title: 'StreamQuest',
    description: {
      fr: "Extension Twitch gamifiée : les streamers créent des succès personnalisés que leurs viewers débloquent en interagissant (chat, points de chaîne), avec classements et badges. Projet de 2e année de master en équipe",
      en: 'Gamified Twitch extension: streamers create custom achievements that viewers unlock by interacting (chat, channel points), with leaderboards and badges. 2nd-year team master’s project',
    },
    status: { fr: 'Projet de master (M2)', en: "Master's project (M2)" },
    technologies: ['typescript', 'react', 'nodejs', 'googlecloud', 'docker', 'terraform', 'cicd'],
    features: [
      {
        fr: '14 dépôts : microservices TypeScript sur Cloud Run (événements Twitch, succès, notifications, IA…)',
        en: '14 repositories: TypeScript microservices on Cloud Run (Twitch events, achievements, notifications, AI…)',
      },
      {
        fr: 'Extension Twitch (panel + configuration) et application web React 19',
        en: 'Twitch extension (panel + config) and React 19 web application',
      },
      {
        fr: 'Bot Discord connecté et build mobile Android via Capacitor',
        en: 'Connected Discord bot and Android mobile build through Capacitor',
      },
      {
        fr: "Génération de succès assistée par IA et suggestions adaptées à la chaîne",
        en: 'AI-assisted achievement generation and channel-tailored suggestions',
      },
      {
        fr: 'Infrastructure Terraform + CI/CD GitHub Actions partagée entre les services',
        en: 'Terraform infrastructure + GitHub Actions CI/CD shared across services',
      },
      {
        fr: "Apprentissage de l'utilisation d'une IA (Claude) dans le cadre du projet",
        en: 'Learned to work with an AI assistant (Claude) over the course of the project',
      },
    ],
    images: [],
    repository: 'https://github.com/projet-ccm2',
  },
  {
    id: 'locaccm',
    title: 'LocaCCM',
    description: {
      fr: "Plateforme de gestion locative pour propriétaires (logements, locataires, documents, messagerie) en microservices. Projet de 1re année de master en équipe de 9, où j'ai tenu le rôle d'architecte cloud",
      en: 'Rental-management platform for landlords (housing, tenants, documents, messaging) built as microservices. 1st-year master’s project in a team of 9, where I was the cloud architect',
    },
    status: { fr: 'Projet de master (M1)', en: "Master's project (M1)" },
    technologies: ['typescript', 'nodejs', 'googlecloud', 'docker', 'terraform', 'cicd', 'postgresql'],
    features: [
      {
        fr: "Rôle : architecte cloud de l'équipe + développement du microservice d'authentification",
        en: 'Role: cloud architect of the team + development of the authentication microservice',
      },
      {
        fr: 'Une dizaine de microservices TypeScript déployés sur Google Cloud Run',
        en: 'A dozen TypeScript microservices deployed on Google Cloud Run',
      },
      {
        fr: 'Infrastructure-as-Code avec Terraform et images Docker sur Artifact Registry',
        en: 'Infrastructure-as-Code with Terraform and Docker images on Artifact Registry',
      },
      {
        fr: 'CI/CD GitHub Actions avec qualité de code contrôlée par SonarCloud (seuil 80 %)',
        en: 'GitHub Actions CI/CD with code quality gated by SonarCloud (80% threshold)',
      },
      {
        fr: 'Base PostgreSQL partagée via Prisma',
        en: 'Shared PostgreSQL database through Prisma',
      },
    ],
    images: [],
    repository: 'https://github.com/locaccm',
  },
  {
    id: 'portfolio',
    title: 'Portfolio IDE',
    description: {
      fr: 'Portfolio interactif inspiré de VS Code avec terminal intégré',
      en: 'Interactive portfolio inspired by VS Code with an integrated terminal',
    },
    status: { fr: 'Production', en: 'Production' },
    technologies: ['react', 'typescript'],
    features: [
      {
        fr: 'Interface fidèle à un IDE : explorateur de fichiers, onglets, barre de statut',
        en: 'IDE-faithful interface: file explorer, tabs, status bar',
      },
      {
        fr: 'Terminal interactif avec commandes Unix simulées',
        en: 'Interactive terminal with simulated Unix commands',
      },
      {
        fr: 'Bilingue (FR/EN) et responsive mobile',
        en: 'Bilingual (FR/EN) and mobile responsive',
      },
    ],
    images: [],
  },
];
