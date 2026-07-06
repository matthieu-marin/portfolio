// ─────────────────────────────────────────────────────────────
// projects.tf (code view) — reconstruit un faux-mais-crédible
// fichier Terraform à partir de `projects` (data/projects.ts).
// Ne jamais coder une entrée en dur ici : tout vient des données.
// ─────────────────────────────────────────────────────────────
import { projects, SKILL_NAME_BY_ID } from '../data';
import { ln, blank, p, kw, ty, str, cmt, ed, img, prop, pn } from './tokens';
import type { CodeFileModel, CodeLine } from './tokens';

// `["react", "typescript", "tailwind"]` tokens for a list of stack strings.
function stringListTokens(values: string[]) {
  const inner = values.flatMap((value, i) =>
    i === 0 ? [str(`"${value}"`)] : [pn(','), p(' '), str(`"${value}"`)]
  );
  return [pn('['), ...inner, pn(']')];
}

// Bloc `resource "portfolio_project" "<id>" { ... }` pour un projet.
function projectBlock(project: (typeof projects)[number], language: 'fr' | 'en'): CodeLine[] {
  const L = (fr: string, en: string) => (language === 'fr' ? fr : en);
  // Nom d'affichage canonique dérivé de data/skills.ts (voir data/techNames.ts).
  const stack = project.technologies.map((skillId) => SKILL_NAME_BY_ID[skillId] ?? skillId);
  const firstImage = project.images[0];

  return [
    ln(
      0,
      kw('resource'),
      p(' '),
      ty(`"portfolio_project"`),
      p(' '),
      ty(`"${project.id}"`),
      p(' '),
      pn('{')
    ),
    ln(
      1,
      prop('description'),
      p(' '),
      pn('='),
      p(' '),
      ed(`project.${project.id}.description.${language}`, project.description[language])
    ),
    ln(1, prop('status'), p('     '), pn('='), p(' '), str(`"${project.status[language]}"`)),
    ln(1, prop('stack'), p('      '), pn('='), p(' '), ...stringListTokens(stack)),
    ...(project.repository
      ? [ln(1, prop('repository'), p(' '), pn('='), p(' '), str(`"${project.repository}"`))]
      : []),
    ...(firstImage
      ? [
          ln(
            1,
            prop('preview'),
            p('    '),
            pn('='),
            p(' '),
            img(firstImage.path, firstImage.label),
            p('  '),
            cmt(L('# survolez le chemin → aperçu', '# hover the path → preview'))
          ),
        ]
      : []),
    ln(0, pn('}')),
  ];
}

export function buildProjectsTf(language: 'fr' | 'en'): CodeFileModel {
  const L = (fr: string, en: string) => (language === 'fr' ? fr : en);

  return {
    lines: [
      ln(0, cmt(L('# projects.tf — projets personnels & académiques', '# projects.tf — personal & academic projects'))),
      blank(),
      ln(0, kw('terraform'), p(' '), pn('{')),
      ln(1, prop('required_providers'), p(' '), pn('{')),
      ln(
        2,
        p('determination'),
        p(' '),
        pn('='),
        p(' '),
        pn('{'),
        p(' '),
        prop('source'),
        p(' '),
        pn('='),
        p(' '),
        str('"matthieu/determination"'),
        pn(','),
        p(' '),
        prop('version'),
        p(' '),
        pn('='),
        p(' '),
        str('">= 1.0"'),
        p(' '),
        pn('}')
      ),
      ln(1, pn('}')),
      ln(0, pn('}')),
      blank(),
      ...projects.flatMap((project, idx) => [
        ...projectBlock(project, language),
        ...(idx === projects.length - 1 ? [] : [blank()]),
      ]),
    ],
  };
}
