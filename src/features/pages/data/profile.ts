// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// ─────────────────────────────────────────────────────────────
import type { Profile } from './types';

export const profile: Profile = {
  name: 'Matthieu Marin',
  role: {
    fr: 'Développeur en alternance — Master Cloud Computing & Mobility',
    en: 'Apprentice developer — Master Cloud Computing & Mobility',
  },
  bio: {
    fr: "Étudiant en Master Cloud Computing & Mobility (UPJV / INSSET) et alternant chez Renault Digital, je m'appuie sur quatre expériences en développement web pour construire des applications robustes et bien testées. Mes terrains de jeu : Java/Spring Boot côté backend, JavaScript/React côté frontend, et les outils cloud (Google Cloud, Docker) en infrastructure.",
    en: 'Master Cloud Computing & Mobility student at UPJV / INSSET and apprentice at Renault Digital, drawing on four web-development experiences to build robust, well-tested applications. Comfort zone: Java/Spring Boot on the back end, JavaScript/React on the front end, and cloud tooling (Google Cloud, Docker) for infrastructure.',
  },
  email: 'matthieumarin51@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matthieu-marin-b46865267/',
  cvPath: '/cv-matthieu-marin.pdf',
  avatarImage: '/images/profile/avatar.jpg',
  stats: [
    { label: { fr: "Années d'expérience pro", en: 'Years of pro experience' }, value: 1, suffix: '+' },
    { label: { fr: 'Expériences en entreprise', en: 'Professional experiences' }, value: 4 },
    { label: { fr: 'Technologies pratiquées', en: 'Technologies used' }, value: 10, suffix: '+' },
  ],
  expertise: [
    {
      fr: 'Développement web full-stack (JavaScript, Java)',
      en: 'Full-stack web development (JavaScript, Java)',
    },
    {
      fr: 'Frameworks modernes : React, Spring Boot',
      en: 'Modern frameworks: React, Spring Boot',
    },
    {
      fr: 'Cloud Computing & applications mobiles',
      en: 'Cloud Computing & mobile applications',
    },
    {
      fr: 'Bases de données relationnelles (MySQL, PostgreSQL) et non relationnelles (MongoDB)',
      en: 'Relational databases (MySQL, PostgreSQL) and non-relational (MongoDB)',
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
