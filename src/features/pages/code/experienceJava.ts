// ─────────────────────────────────────────────────────────────
// Experience.java (code view) — reconstruit un faux-mais-crédible
// fichier Java à partir de `experiences` (data/experiences.ts). Ne
// jamais coder une entrée en dur ici : tout vient des données.
// ─────────────────────────────────────────────────────────────
import { experiences, SKILL_NAME_BY_ID } from '../data';
import { ln, blank, p, kw, ty, str, cmt, ann, ed, num, pn } from './tokens';
import type { CodeFileModel, CodeLine } from './tokens';

// Année extraite du champ `period.en` de chaque expérience, pour @Since(...).
function extractYear(periodEn: string): string {
  const match = periodEn.match(/\d{4}/);
  return match ? match[0] : '';
}

// "renault" -> "RENAULT", "chatterie2" -> "CHATTERIE_2"
function constName(id: string): string {
  return id.replace(/([a-z])(\d+)$/i, '$1_$2').toUpperCase();
}

// `List.of("a", "b", "c")` tokens for a list of plain strings.
function stringListTokens(values: string[]) {
  return values.flatMap((value, i) => (i === 0 ? [str(`"${value}"`)] : [pn(','), p(' '), str(`"${value}"`)]));
}

// `A, B, C` tokens for a list of raw identifiers (no quotes).
function identifierListTokens(values: string[]) {
  return values.flatMap((value, i) => (i === 0 ? [p(value)] : [pn(','), p(' '), p(value)]));
}

// Lignes Java pour une expérience : annotations + constante + appel constructeur.
function experienceBlock(exp: (typeof experiences)[number], language: 'fr' | 'en'): CodeLine[] {
  const constId = constName(exp.id);
  // Nom d'affichage canonique dérivé de data/skills.ts (voir data/techNames.ts).
  const techNames = exp.technologies.map((skillId) => SKILL_NAME_BY_ID[skillId] ?? skillId);
  const year = extractYear(exp.period.en);
  const shownHighlights = exp.highlights.slice(0, 2);

  return [
    ln(1, ann('@Company'), pn('('), str(`name = "${exp.company}"`), pn(','), p(' '), str(`location = "${exp.location}"`), pn(')')),
    ln(1, ann('@Since'), pn('('), num(`"${year}"`), pn(')')),
    ln(
      1,
      kw('public static final'),
      p(' '),
      ty('Experience'),
      p(' '),
      p(constId),
      p(' '),
      pn('='),
      p(' '),
      kw('new'),
      p(' '),
      ty('Experience'),
      pn('(')
    ),
    ln(2, ed(`exp.${exp.id}.role.${language}`, exp.role[language]), pn(','), p(' '), cmt('// ← éditable (ed())')),
    ln(2, kw('List'), pn('.'), p('of'), pn('('), ...stringListTokens(techNames), pn('),')),
    ...shownHighlights.map((highlight, idx) =>
      ln(2, str(`"${highlight[language]}"`), pn(idx === shownHighlights.length - 1 ? '' : ','))
    ),
    ln(1, pn(');')),
  ];
}

export function buildExperienceJava(language: 'fr' | 'en'): CodeFileModel {
  const constNames = experiences.map((e) => constName(e.id));

  return {
    lines: [
      ln(0, kw('package'), p(' '), ty('dev.matthieumarin.career'), pn(';')),
      blank(),
      ln(0, kw('import'), p(' '), ty('java.util.List'), pn(';')),
      blank(),
      ln(0, cmt('/**')),
      ln(0, cmt(' * Parcours professionnel — trié par ordre chronologique inverse.')),
      ln(0, cmt(' * NOTE : cette classe est append-only, comme la motivation qui va avec.')),
      ln(0, cmt(' */')),
      ln(0, kw('public class'), p(' '), ty('Experience'), p(' '), pn('{')),
      blank(),
      ...experiences.flatMap((exp, idx) => [
        ...experienceBlock(exp, language),
        ...(idx === experiences.length - 1 ? [] : [blank()]),
      ]),
      blank(),
      ln(1, cmt('// aucune de ces lignes ne ment — la source, c’est data/experiences.ts')),
      ln(1, kw('public static'), p(' '), ty('List<Experience>'), p(' '), p('career'), pn('() {')),
      ln(2, kw('return'), p(' '), kw('List'), pn('.'), p('of'), pn('('), ...identifierListTokens(constNames), pn(');')),
      ln(1, pn('}')),
      ln(0, pn('}')),
    ],
  };
}
