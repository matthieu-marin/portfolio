import { Code2, Rocket, Building2, Cat, Radio, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Icône affichée pour chaque entreprise/projet.
 * Doit rester synchrone avec l'icône de la `class` correspondante dans
 * Experience.tsx (`exp.icon`) et Projects.tsx (`project.icon`).
 * Consommé par Skills.tsx → pills acquiredFrom, pour qu'une pill montre le
 * même logo que la class vers laquelle elle pointe.
 * Keyed by entity id (experience id ou project id).
 */
export const ENTITY_ICONS: Record<string, LucideIcon> = {
  // Expériences
  renault: Code2,
  faubourg: Rocket,
  chatterie2: Building2,
  chatterie1: Building2,
  studies: GraduationCap, // pas de class dédiée — icône études par défaut

  // Projets
  portfolio: Code2,
  'iot-territoire': Radio,
  'chatterie-vitrine': Cat,
};

export function getEntityIcon(id: string): LucideIcon | undefined {
  return ENTITY_ICONS[id];
}
