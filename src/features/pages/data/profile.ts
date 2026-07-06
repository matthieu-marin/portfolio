// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// ─────────────────────────────────────────────────────────────
import type { Profile } from './types';

export const profile: Profile = {
  name: 'Matthieu Marin',
  openToWork: true,
  role: {
    fr: 'Développeur Full-Stack — Cloud & DevOps',
    en: 'Full-Stack Developer — Cloud & DevOps',
  },
  bio: {
    fr: "Diplômé d'un Master Cloud Computing & Mobility (UPJV / INSSET) après deux ans d'alternance chez Renault Digital sur les données du véhicule électrique, je construis des services backend robustes et l'infrastructure cloud qui les fait tourner. Mes terrains de jeu : Java/Spring Boot et TypeScript côté code ; Google Cloud, Docker et Terraform côté infrastructure. À la recherche d'un CDI.",
    en: "Master's graduate in Cloud Computing & Mobility (UPJV / INSSET) after a two-year apprenticeship at Renault Digital on electric-vehicle data, I build robust backend services and the cloud infrastructure they run on. Comfort zone: Java/Spring Boot and TypeScript for code; Google Cloud, Docker and Terraform for infrastructure. Looking for a permanent position.",
  },
  email: 'matthieumarin51@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matthieu-marin-b46865267/',
  cvPath: '/cv-matthieu-marin.pdf',
  avatarImage: '/images/profile/avatar.jpg',
  stats: [
    { label: { fr: "Années d'expérience pro", en: 'Years of pro experience' }, value: 2, suffix: '+' },
    { label: { fr: 'Expériences en entreprise', en: 'Professional experiences' }, value: 4 },
    { label: { fr: 'Technologies pratiquées', en: 'Technologies used' }, value: 15, suffix: '+' },
  ],
  expertise: [
    {
      fr: 'Développement backend (Java/Spring Boot, TypeScript/Node.js)',
      en: 'Backend development (Java/Spring Boot, TypeScript/Node.js)',
    },
    {
      fr: 'Cloud & DevOps : Google Cloud, Docker, Kubernetes, Terraform, CI/CD',
      en: 'Cloud & DevOps: Google Cloud, Docker, Kubernetes, Terraform, CI/CD',
    },
    {
      fr: 'Architectures microservices et événementielles (Pub/Sub)',
      en: 'Microservices and event-driven architectures (Pub/Sub)',
    },
    {
      fr: 'Frontend moderne : React, Vue.js',
      en: 'Modern frontend: React, Vue.js',
    },
    {
      fr: 'Bases de données relationnelles (PostgreSQL) et NoSQL (Firestore, MongoDB)',
      en: 'Relational databases (PostgreSQL) and NoSQL (Firestore, MongoDB)',
    },
    {
      fr: 'Méthode agile (SCRUM) et gestion de projet',
      en: 'Agile methodology (SCRUM) and project management',
    },
  ],
  principles: [
    { fr: "Autonomie et prise d'initiative", en: 'Autonomy and initiative' },
    { fr: 'Ponctualité et rigueur', en: 'Punctuality and rigor' },
    { fr: 'Curiosité et apprentissage continu', en: 'Curiosity and continuous learning' },
    { fr: 'Veille technologique active', en: 'Active technology watch' },
    { fr: 'Collaboration en équipe agile', en: 'Agile team collaboration' },
    { fr: 'Partage des connaissances', en: 'Knowledge sharing' },
  ],
};
