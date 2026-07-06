// ─────────────────────────────────────────────────────────────
// POUR AJOUTER / MODIFIER : les noms d'affichage des skills vivent
// dans skills.ts (champ `name`) — les maps ci-dessous en sont DÉRIVÉES,
// ne jamais les dupliquer à la main. Seuls EXTRA_TECH_NAMES et
// TECH_DISPLAY_ORDER (données de présentation) s'éditent ici.
// ─────────────────────────────────────────────────────────────
import { skillCategories } from './skills';

// skillId -> nom d'affichage canonique (ex: 'springboot' -> 'Spring Boot').
// Dérivé de skills.ts : zéro synchro manuelle possible.
export const SKILL_NAME_BY_ID: Record<string, string> = Object.fromEntries(
  skillCategories.flatMap((category) => category.skills.map((skill) => [skill.id, skill.name]))
);

// Réciproque : nom d'affichage canonique -> skillId (ex: 'Spring Boot' -> 'springboot').
export const SKILL_ID_BY_NAME: Record<string, string> = Object.fromEntries(
  skillCategories.flatMap((category) => category.skills.map((skill) => [skill.name, skill.id]))
);

// Technos affichées sur la carte d'une expérience mais SANS entrée dédiée
// sur la page Skills (pas de skillId, donc pas de navigation au clic) —
// display-only, par id d'expérience.
export const EXTRA_TECH_NAMES: Record<string, string[]> = {
  renault: ['Pub/Sub', 'GitLab', 'Dynatrace', 'Bruno'],
  faubourg: ['IoT', 'Grafana'],
};

// Ordre d'affichage des pills technos par expérience (noms canoniques).
// Garantit l'ordre d'origine quand on fusionne skills cliquables + extras.
export const TECH_DISPLAY_ORDER: Record<string, string[]> = {
  renault: [
    'Java',
    'Spring Boot',
    'Google Cloud',
    'Pub/Sub',
    'Kubernetes',
    'Docker',
    'GitLab',
    'Dynatrace',
    'Bruno',
    'SQL',
  ],
  faubourg: ['Node.js', 'Vue.js', 'MongoDB', 'IoT', 'Grafana'],
  chatterie: ['PHP', 'WordPress'],
};
