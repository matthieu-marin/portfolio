// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// ─────────────────────────────────────────────────────────────
import type { ExperienceEntry } from './types';

export const experiences: ExperienceEntry[] = [
  {
    id: 'renault',
    company: 'Renault Digital',
    role: {
      fr: 'Développeur (Alternance)',
      en: 'Developer (Apprenticeship)',
    },
    period: {
      fr: "sept. 2024 – aujourd'hui",
      en: 'Sept. 2024 – present',
    },
    location: 'Saint-Quentin, Hauts-de-France · Hybride',
    kind: 'apprenticeship',
    highlights: [
      {
        fr: "Développement d'applications en Java / Spring Boot",
        en: 'Application development in Java / Spring Boot',
      },
      {
        fr: 'Utilisation de Google Cloud (Kubernetes Engine, Pub/Sub, Cloud Functions)',
        en: 'Google Cloud usage (Kubernetes Engine, Pub/Sub, Cloud Functions)',
      },
      {
        fr: 'Conteneurisation avec Docker',
        en: 'Containerization with Docker',
      },
      {
        fr: 'Pratiques DevOps sur GitLab (pipelines CI/CD)',
        en: 'DevOps practices on GitLab (CI/CD pipelines)',
      },
      {
        fr: 'Monitoring applicatif avec Dynatrace',
        en: 'Application monitoring with Dynatrace',
      },
      {
        fr: 'Participation aux cérémonies agile (SCRUM)',
        en: 'Participation in agile ceremonies (SCRUM)',
      },
    ],
    technologies: ['java', 'springboot', 'agile'],
  },
  {
    id: 'faubourg',
    company: 'Faubourg Numérique',
    role: {
      fr: 'Stagiaire Développement Web',
      en: 'Web Development Intern',
    },
    period: {
      fr: 'mai 2024 – août 2024 · 4 mois',
      en: 'May 2024 – August 2024 · 4 months',
    },
    location: 'Saint-Quentin, Hauts-de-France · Hybride',
    kind: 'internship',
    highlights: [
      {
        fr: 'Développement de la plateforme web pour la gestion de données IoT',
        en: 'Development of the web platform for IoT data management',
      },
      {
        fr: 'Travail sur le projet Territoire Connecté et Durable',
        en: 'Work on the Connected and Sustainable Territory project',
      },
      {
        fr: 'Mise en place du monitoring avec Grafana',
        en: 'Setting up monitoring with Grafana',
      },
      {
        fr: 'Collaboration avec La Somme Numérique',
        en: 'Collaboration with La Somme Numérique',
      },
    ],
    technologies: ['nodejs', 'vuejs'],
  },
  {
    id: 'chatterie2',
    company: 'Chatterie de la Terre de Brasco',
    role: {
      fr: 'Stagiaire Développement Web',
      en: 'Web Development Intern',
    },
    period: {
      fr: 'février 2023',
      en: 'February 2023',
    },
    location: 'France',
    kind: 'internship',
    highlights: [
      {
        fr: "Finalisation du site web vitrine de l'association",
        en: "Finalization of the association's showcase website",
      },
      {
        fr: 'Développement PHP et intégration WordPress',
        en: 'PHP development and WordPress integration',
      },
    ],
    technologies: ['php', 'wordpress'],
  },
  {
    id: 'chatterie1',
    company: 'Chatterie de la Terre de Brasco',
    role: {
      fr: 'Stagiaire Développement Web',
      en: 'Web Development Intern',
    },
    period: {
      fr: 'mai 2022',
      en: 'May 2022',
    },
    location: 'France',
    kind: 'internship',
    highlights: [
      {
        fr: 'Démarrage du développement du site web vitrine',
        en: 'Start of showcase website development',
      },
      {
        fr: "Mise en place de l'environnement WordPress",
        en: 'WordPress environment setup',
      },
    ],
    technologies: ['php', 'wordpress'],
  },
];
