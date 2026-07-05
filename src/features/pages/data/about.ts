// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// ─────────────────────────────────────────────────────────────
import type { AboutData } from './types';

export const about: AboutData = {
  location: 'Saint-Quentin, Hauts-de-France, France',
  education: [
    {
      id: 'master_cloud_computing',
      degree: {
        fr: 'Master — Cloud Computing & Mobility',
        en: 'Master — Cloud Computing & Mobility',
      },
      school: 'UPJV / INSSET — Saint-Quentin',
      period: 'sept. 2024 – juin 2026',
      highlights: [
        {
          fr: 'Découverte des outils cloud : Google Cloud, AWS, Azure',
          en: 'Introduction to cloud tools: Google Cloud, AWS, Azure',
        },
        {
          fr: 'DevOps avec Terraform pour la livraison continue (CD)',
          en: 'DevOps with Terraform for continuous delivery (CD)',
        },
        {
          fr: 'Intégration continue (CI) avec contrôle qualité via SonarQube sur GitHub',
          en: 'Continuous integration (CI) with code quality control via SonarQube on GitHub',
        },
        {
          fr: "Développement d'applications mobiles avancées",
          en: 'Advanced mobile application development',
        },
        {
          fr: 'Gestion de projet agile (alternance Renault Digital)',
          en: 'Agile project management (Renault Digital apprenticeship)',
        },
      ],
    },
    {
      id: 'licence_pro_web_mobile',
      degree: {
        fr: "Licence Professionnelle — Conception et développement d'applications web et mobile",
        en: 'Professional Bachelor — Web and Mobile Application Design and Development',
      },
      school: 'UPJV / INSSET — Saint-Quentin',
      period: 'sept. 2023 – août 2024',
      highlights: [
        {
          fr: "Conception et développement d'applications web et mobiles",
          en: 'Web and mobile application design and development',
        },
        {
          fr: 'Bases de données NoSQL (MongoDB)',
          en: 'NoSQL databases (MongoDB)',
        },
        {
          fr: 'Développement mobile',
          en: 'Mobile development',
        },
        {
          fr: 'Versionnement et collaboration avec Git',
          en: 'Version control and collaboration with Git',
        },
      ],
    },
    {
      id: 'bts_sio_option_b',
      degree: {
        fr: 'BTS SIO option B — Solutions logicielles et applications métiers',
        en: 'BTS SIO option B — Software Solutions and Business Applications',
      },
      school: 'Lycée Paul Claudel — Laon',
      period: 'sept. 2021 – juin 2023',
      highlights: [
        // TODO: miss info for education[2].highlights — détails des matières BTS non fournis
        {
          fr: "Développement d'applications",
          en: 'Application development',
        },
        {
          fr: 'Solutions logicielles',
          en: 'Software solutions',
        },
        {
          fr: 'Gestion de projet informatique',
          en: 'IT project management',
        },
        {
          fr: 'Bases de données et systèmes',
          en: 'Databases and systems',
        },
      ],
    },
  ],
  interests: [
    {
      fr: 'Veille technologique active',
      en: 'Active technology watch',
    },
    {
      fr: 'Apprentissage continu',
      en: 'Continuous learning',
    },
    {
      fr: 'Ressources Java & Spring (Baeldung)',
      en: 'Java & Spring resources (Baeldung)',
    },
    {
      fr: 'Formation en ligne (OpenClassrooms)',
      en: 'Online learning (OpenClassrooms)',
    },
  ],
  softSkills: [
    { fr: 'Autonomie', en: 'Autonomy' },
    { fr: 'Ponctualité', en: 'Punctuality' },
    { fr: 'Curiosité', en: 'Curiosity' },
    { fr: 'Apprentissage continu', en: 'Continuous learning' },
    { fr: 'Veille technologique', en: 'Technology watch' },
    { fr: 'Collaboration en équipe', en: 'Team collaboration' },
  ],
};
