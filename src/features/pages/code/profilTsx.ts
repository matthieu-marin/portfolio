// ─────────────────────────────────────────────────────────────
// profil.tsx (code view) — reconstruit un faux-mais-crédible
// fichier React à partir de `profile` (data/profile.ts). Ne jamais
// coder une entrée en dur ici : tout vient des données.
// ─────────────────────────────────────────────────────────────
import { profile } from '../data';
import { ln, blank, p, kw, ty, str, cmt, prop, fn, pn, ed, num } from './tokens';
import type { CodeFileModel } from './tokens';

// Transforme un libellé humain ("Years of pro experience") en clé
// camelCase ("yearsOfProExperience") pour l'objet `stats`.
function camel(label: string): string {
  const words = label
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/);
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function buildProfilTsx(language: 'fr' | 'en'): CodeFileModel {
  return {
    lines: [
      ln(0, cmt('// profil.tsx — la personne derrière le portfolio')),
      ln(0, cmt('// NOTE: désactiver Portfolio Renderer ne me désactive pas moi.')),
      blank(),
      ln(0, kw('import'), p(' { '), ty('Developer'), p(' } '), kw('from'), p(' '), str("'@matthieu/core'"), pn(';')),
      blank(),
      ln(0, kw('export const'), p(' '), fn('profil'), pn(':'), p(' '), ty('Developer'), p(' '), pn('= {')),
      ln(1, prop('name'), pn(':'), p(' '), ed('profile.name', profile.name), pn(',')),
      ln(1, prop('role'), pn(':'), p(' '), ed(`profile.role.${language}`, profile.role[language]), pn(',')),
      ln(1, prop('bio'), pn(':'), p(' '), ed(`profile.bio.${language}`, profile.bio[language]), pn(',')),
      ln(1, prop('stats'), pn(': {')),
      ...profile.stats.map((s, i) =>
        ln(2, prop(camel(s.label.en)), pn(':'), p(' '), num(`${s.value}${s.suffix ?? ''}`), pn(','))
      ),
      ln(1, pn('},')),
      ln(1, cmt('// aucune de ces lignes ne ment — la source, c’est data/profile.ts')),
      ln(1, prop('expertise'), pn(': [')),
      ...profile.expertise.map((e, i) =>
        ln(2, ed(`profile.expertise.${i}.${language}`, e[language]), pn(','))
      ),
      ln(1, pn('],')),
      ln(1, prop('connect'), pn(': {')),
      ln(2, prop('email'), pn(':'), p(' '), str(`'${profile.email}'`), pn(',')),
      ln(2, prop('linkedin'), pn(':'), p(' '), str(`'${profile.linkedin}'`), pn(',')),
      ln(1, pn('},')),
      ln(0, pn('};')),
      blank(),
      ln(0, kw('export default'), p(' '), fn('profil'), pn(';'), p(' '), cmt('// aucun test ne couvre ma motivation : elle est infaillible')),
    ],
  };
}
