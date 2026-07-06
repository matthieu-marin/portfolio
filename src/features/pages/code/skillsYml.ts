// ─────────────────────────────────────────────────────────────
// skills.yml (code view) — reconstruit un faux-mais-crédible
// fichier de config CI à partir de `skillCategories`
// (data/skills.ts). Ne jamais coder une entrée en dur ici : tout
// vient des données.
// ─────────────────────────────────────────────────────────────
import { skillCategories } from '../data';
import { ln, blank, p, prop, str, cmt, ed, pn } from './tokens';
import type { CodeFileModel, CodeLine } from './tokens';

// `[a, b, c]` tokens for a list of plain identifiers (YAML flow sequence).
function flowListTokens(values: string[]) {
  const inner = values.flatMap((value, i) => (i === 0 ? [p(value)] : [pn(','), p(' '), p(value)]));
  return [pn('['), ...inner, pn(']')];
}

// Lignes YAML pour un skill : name / acquired_at + commentaire description.
function skillEntryLines(skill: (typeof skillCategories)[number]['skills'][number], language: 'fr' | 'en'): CodeLine[] {
  return [
    ln(2, pn('- '), prop('name'), pn(':'), p(' '), str(skill.id)),
    ln(3, prop('acquired_at'), pn(':'), p(' '), ...flowListTokens(skill.acquiredAt)),
    ln(
      3,
      cmt('# '),
      ed(`skill.${skill.id}.description.${language}`, skill.description[language], false)
    ),
    blank(),
  ];
}

export function buildSkillsYml(language: 'fr' | 'en'): CodeFileModel {
  return {
    lines: [
      ln(0, cmt('# skills.yml — inventaire des compétences')),
      ln(0, cmt('# ⚠ ce fichier est généré par l’expérience, pas par un LLM')),
      blank(),
      ln(0, prop('version'), pn(':'), p(' '), str('2026.07')),
      blank(),
      ...skillCategories.flatMap((category) => [
        ln(0, prop(category.id), pn(':')),
        ...category.skills.flatMap((skill) => skillEntryLines(skill, language)),
      ]),
    ],
  };
}
