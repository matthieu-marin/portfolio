// ─────────────────────────────────────────────────────────────
// README.md (code view) — reconstruit un faux-mais-crédible
// fichier markdown SOURCE (pas de rendu riche : c'est la vue code)
// à partir de `profile` et `about` (data/profile.ts, data/about.ts).
// Ne jamais coder une entrée en dur ici : tout vient des données.
// ─────────────────────────────────────────────────────────────
import { profile, about } from '../data';
import { ln, blank, p, kw, str, ed, pn } from './tokens';
import type { CodeFileModel, CodeLine } from './tokens';

// Badge décor pour shields.io — valeur fixe (pas de données CV), un slug
// dérivé du role accentué casserait l'URL du badge (ex: "développeur_en").
const STATUS_BADGE_SLUG = 'open_to_work';

function badgeLine(label: string, value: string, color: string): CodeLine {
  const url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}`;
  return ln(0, p('!'), pn('['), p(label), pn(']'), pn('('), str(url), pn(')'));
}

// Table markdown | Diplôme | École | Période | générée depuis about.education.
function educationTableLines(language: 'fr' | 'en'): CodeLine[] {
  const L = (fr: string, en: string) => (language === 'fr' ? fr : en);
  return [
    ln(0, pn('| '), p(L('Diplôme', 'Degree')), pn(' | '), p(L('École', 'School')), pn(' | '), p(L('Période', 'Period')), pn(' |')),
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
  const L = (fr: string, en: string) => (language === 'fr' ? fr : en);
  const role = profile.role[language];

  return {
    lines: [
      ln(0, kw(`# ${profile.name}`)),
      blank(),
      badgeLine(L('statut', 'status'), STATUS_BADGE_SLUG, 'success'),
      badgeLine('cloud', 'GCP', 'blue'),
      badgeLine(L('licence', 'license'), 'MIT', 'lightgrey'),
      blank(),
      ln(0, pn('> '), ed(`profile.role.${language}`, role, false)),
      blank(),
      ln(0, kw(L('## 🎓 Formations', '## 🎓 Education'))),
      ...educationTableLines(language),
      blank(),
      ln(0, kw(L('## Centres d’intérêt', '## Interests'))),
      ...editableInterestLines(language),
      blank(),
      ln(0, kw('## Soft skills')),
      ...listLines(about.softSkills.map((skill) => skill[language])),
    ],
  };
}
