// ─────────────────────────────────────────────────────────────
// README.md (code view) — reconstruit un faux-mais-crédible
// fichier markdown SOURCE (pas de rendu riche : c'est la vue code)
// à partir de `profile` et `about` (data/profile.ts, data/about.ts).
// Ne jamais coder une entrée en dur ici : tout vient des données.
// ─────────────────────────────────────────────────────────────
import { profile, about } from '../data';
import { ln, blank, p, kw, str, ed, pn } from './tokens';
import type { CodeFileModel, CodeLine } from './tokens';

// "en_alternance" — dérivé du role FR, en snake_case, pour le badge shields.io.
function statusSlug(role: string): string {
  return role
    .toLowerCase()
    .split(/\s|—|,/)
    .filter(Boolean)
    .slice(0, 2)
    .join('_');
}

function badgeLine(label: string, value: string, color: string): CodeLine {
  const url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}`;
  return ln(0, p('!'), pn('['), p(label), pn(']'), pn('('), str(url), pn(')'));
}

// Table markdown | Diplôme | École | Période | générée depuis about.education.
function educationTableLines(language: 'fr' | 'en'): CodeLine[] {
  return [
    ln(0, pn('| '), p('Diplôme'), pn(' | '), p('École'), pn(' | '), p('Période'), pn(' |')),
    ln(0, pn('| --- | --- | --- |')),
    ...about.education.map((edu) =>
      ln(
        0,
        pn('| '),
        ed(`edu.${edu.id}.degree.${language}`, edu.degree[language]),
        pn(' | '),
        p(edu.school),
        pn(' | '),
        p(edu.period),
        pn(' |')
      )
    ),
  ];
}

function listLines(items: string[]): CodeLine[] {
  return items.map((item) => ln(0, pn('- '), p(item)));
}

function editableInterestLines(language: 'fr' | 'en'): CodeLine[] {
  return about.interests.map((interest, idx) =>
    ln(0, pn('- '), ed(`about.interests.${idx}.${language}`, interest[language], false))
  );
}

export function buildReadmeMd(language: 'fr' | 'en'): CodeFileModel {
  const role = profile.role[language];
  const slug = statusSlug(profile.role.fr);

  return {
    lines: [
      ln(0, kw(`# ${profile.name}`)),
      blank(),
      badgeLine('statut', slug, 'success'),
      badgeLine('cloud', 'GCP', 'blue'),
      badgeLine('licence', 'MIT', 'lightgrey'),
      blank(),
      ln(0, pn('> '), ed(`profile.role.${language}`, role, false)),
      blank(),
      ln(0, kw('## 🎓 Formations')),
      ...educationTableLines(language),
      blank(),
      ln(0, kw('## Centres d’intérêt')),
      ...editableInterestLines(language),
      blank(),
      ln(0, kw('## Soft skills')),
      ...listLines(about.softSkills.map((skill) => skill[language])),
    ],
  };
}
