// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : éditez uniquement ce fichier.
// Les deux vues (recruteur + code) itèrent sur ces données.
// ─────────────────────────────────────────────────────────────
import type { ContactData } from './types';

export const contact: ContactData = {
  email: 'matthieumarin51@gmail.com',
  phone: '07.83.33.47.50',
  location: {
    fr: 'Saint-Quentin, Hauts-de-France, France',
    en: 'Saint-Quentin, Hauts-de-France, France',
  },
  socials: [
    // TODO github URL: à compléter quand l'utilisateur fournira son URL GitHub.
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/matthieu-marin-b46865267/',
    },
  ],
};
