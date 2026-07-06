// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// ─────────────────────────────────────────────────────────────
import type { ProjectEntry } from './types';

// Projets réels dérivés de info.md (1 portfolio + 2 stages).
// TODO github URL: à compléter quand l'utilisateur fournira son URL GitHub.
export const projects: ProjectEntry[] = [
  {
    id: 'portfolio',
    title: 'Portfolio IDE',
    description: {
      fr: 'Portfolio interactif inspiré de VS Code avec terminal intégré et thèmes personnalisés',
      en: 'Interactive portfolio inspired by VS Code with integrated terminal and custom themes',
    },
    status: { fr: 'Production', en: 'Production' },
    technologies: ['react'],
    features: [
      {
        fr: 'Système multi-thèmes (Dark, Light, Steampunk, Cyberpunk, Synthwave, Galaxy, Nord, Pixel)',
        en: 'Multi-theme system (Dark, Light, Steampunk, Cyberpunk, Synthwave, Galaxy, Nord, Pixel)',
      },
      {
        fr: 'Terminal interactif avec commandes Unix simulées',
        en: 'Interactive terminal with simulated Unix commands',
      },
      {
        fr: 'Navigation par explorateur de fichiers',
        en: 'File explorer navigation',
      },
      {
        fr: 'Bilingue (FR/EN) et responsive mobile',
        en: 'Bilingual (FR/EN) and mobile responsive',
      },
    ],
    images: [],
  },
  {
    id: 'iot-territoire',
    title: 'Territoire Connecté Durable',
    description: {
      fr: 'Plateforme web IoT pour la gestion de données capteurs, développée chez Faubourg Numérique en collaboration avec La Somme Numérique',
      en: 'IoT web platform for sensor data management, developed at Faubourg Numérique in collaboration with La Somme Numérique',
    },
    status: { fr: 'Livré', en: 'Delivered' },
    technologies: ['nodejs', 'vuejs', 'mongodb'],
    features: [
      {
        fr: "Ingestion de données IoT (capteurs Internet des Objets)",
        en: 'IoT data ingestion (Internet of Things sensors)',
      },
      {
        fr: 'Interface de visualisation des relevés',
        en: 'Data visualization interface',
      },
      {
        fr: 'Collaboration avec La Somme Numérique',
        en: 'Collaboration with La Somme Numérique',
      },
      {
        fr: "Livré dans le cadre d'un stage de 4 mois",
        en: 'Delivered as part of a 4-month internship',
      },
    ],
    images: [],
  },
  {
    id: 'chatterie-vitrine',
    title: 'Site vitrine — Chatterie de la Terre de Brasco',
    description: {
      fr: "Site vitrine de l'association Chatterie de la Terre de Brasco, démarré en 2022 et finalisé lors du second stage en 2023",
      en: 'Showcase website for the Chatterie de la Terre de Brasco association, started in 2022 and finalized during the second internship in 2023',
    },
    status: { fr: 'Livré', en: 'Delivered' },
    technologies: ['php', 'wordpress'],
    features: [
      {
        fr: "Site vitrine pour l'association",
        en: 'Showcase website for the association',
      },
      {
        fr: 'Gestion de contenu via WordPress',
        en: 'Content management via WordPress',
      },
      {
        fr: 'Premier stage : conception et démarrage du site',
        en: 'First internship: site design and startup',
      },
      {
        fr: 'Second stage : finalisation et livraison',
        en: 'Second internship: finalization and delivery',
      },
    ],
    images: [],
  },
];
