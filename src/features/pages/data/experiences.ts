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
      fr: 'Développeur en alternance — Données véhicule électrique',
      en: 'Apprentice Developer — Electric Vehicle Data',
    },
    period: {
      fr: 'sept. 2024 – août 2026 · 2 ans',
      en: 'Sept. 2024 – Aug. 2026 · 2 years',
    },
    location: 'Saint-Quentin, Hauts-de-France · Hybride',
    kind: 'apprenticeship',
    highlights: [
      {
        fr: 'Conception de services backend Java / Spring Boot autour des données du véhicule électrique',
        en: 'Design of Java / Spring Boot backend services around electric-vehicle data',
      },
      {
        fr: 'Architecture événementielle : consommation Pub/Sub et stockage temps réel dans Firestore',
        en: 'Event-driven architecture: Pub/Sub consumption and real-time storage in Firestore',
      },
      {
        fr: "Conception d'une API REST intégrant un service tiers (Google Places)",
        en: 'Design of a REST API integrating a third-party service (Google Places)',
      },
      {
        fr: "Déploiement sur Kubernetes, monitoring Dynatrace, tests d'API avec Bruno",
        en: 'Kubernetes deployment, Dynatrace monitoring, API testing with Bruno',
      },
      {
        fr: 'Pipelines CI/CD GitLab et revue de code en merge request',
        en: 'GitLab CI/CD pipelines and code review through merge requests',
      },
    ],
    subProjects: [
      {
        title: 'Charge Status',
        description: {
          fr: "Service qui centralise les données du véhicule (charge, localisation, configuration) publiées en Pub/Sub et les prépare dans Firestore pour l'application mobile",
          en: 'Service centralizing vehicle data (charge, location, configuration) published on Pub/Sub and preparing it in Firestore for the mobile app',
        },
      },
      {
        title: 'API POI',
        description: {
          fr: 'API REST de points d’intérêt adaptés au véhicule et à sa charge (stations de recharge, restaurants, parkings) via Google Places',
          en: 'REST API serving points of interest tailored to the vehicle and its charge (charging stations, restaurants, parkings) through Google Places',
        },
      },
    ],
    technologies: ['java', 'springboot', 'googlecloud', 'docker', 'kubernetes', 'sql'],
    otherSkills: [
      { fr: 'Agile au quotidien (daily, sprint, PIP)', en: 'Day-to-day agile (daily, sprint, PIP)' },
      { fr: 'Revue de code', en: 'Code review' },
      { fr: 'Estimation et découpage des tâches', en: 'Task estimation and breakdown' },
      { fr: 'Autonomie sur mes sujets', en: 'Ownership of my topics' },
    ],
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
        fr: 'Ingestion et visualisation des relevés de capteurs',
        en: 'Sensor data ingestion and visualization',
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
    subProjects: [
      {
        title: 'Territoire Connecté Durable',
        description: {
          fr: 'Plateforme web IoT de gestion de données capteurs, livrée en collaboration avec La Somme Numérique',
          en: 'IoT web platform for sensor data management, delivered in collaboration with La Somme Numérique',
        },
      },
    ],
    technologies: ['nodejs', 'vuejs', 'mongodb'],
    otherSkills: [
      { fr: 'Travail avec un partenaire public', en: 'Work with a public-sector partner' },
    ],
  },
  {
    id: 'chatterie',
    company: 'Chatterie de la Terre de Brasco',
    role: {
      fr: 'Stagiaire Développement Web',
      en: 'Web Development Intern',
    },
    period: {
      fr: 'mai 2022 & février 2023 · 2 stages',
      en: 'May 2022 & February 2023 · 2 internships',
    },
    location: 'France',
    kind: 'internship',
    highlights: [
      {
        fr: "Premier stage : démarrage du site vitrine et mise en place de l'environnement WordPress",
        en: 'First internship: showcase website kick-off and WordPress environment setup',
      },
      {
        fr: 'Second stage : finalisation et livraison du site',
        en: 'Second internship: site finalization and delivery',
      },
      {
        fr: 'Développement PHP et intégration WordPress',
        en: 'PHP development and WordPress integration',
      },
    ],
    subProjects: [
      {
        title: 'Site vitrine de l’association',
        description: {
          fr: "Site vitrine WordPress de l'association, démarré en 2022 et livré lors du second stage en 2023",
          en: 'WordPress showcase website for the association, started in 2022 and delivered during the second internship in 2023',
        },
      },
    ],
    technologies: ['php', 'wordpress'],
  },
];
