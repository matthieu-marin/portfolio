# Refonte compacte de la page Skills

**Date :** 2026-06-08
**Statut :** Validé (design approuvé)
**Fichier principal :** `src/features/pages/Skills.tsx`

## Problème

Chaque techno est aujourd'hui rendue comme une **classe imbriquée complète** :

```
class Backend {
  class Java {
    acquiredFrom: [ pills ]
  }
  ... ×5
}
```

Le bloc `class X { acquiredFrom: [...] }` (~4 lignes + cadre) est répété pour chaque
techno juste pour afficher un nom + ses sources. Beaucoup de hauteur pour peu
d'information. De plus, le champ `level` (Beginner/Intermediate/Advanced) existe dans
les données mais n'est **jamais affiché**.

## Objectif

Diviser la hauteur de la section par ~3, garder l'identité « fichier de code » du
portfolio, rendre chaque techno identifiable au premier coup d'œil (logo), et
valoriser le champ `level`.

## Design retenu — « propriétés » (Option A finale)

Une **seule classe par catégorie** ; chaque techno = **une ligne** au format :

```
[pastille] [logo] nomTechno: <pills sources> // Niveau
```

Rendu cible (catégorie Backend) :

```
class Backend {
  🟡 [J] java: RenaultDigital                          // Intermediate
  🟡 [S] springBoot: RenaultDigital                    // Intermediate
  🟡 [N] nodejs: FaubourgNumerique                     // Intermediate
  🟡 [P] php: ChatterieTerreBrasco ChatterieTerreBrasco // Intermediate
  🔵 [P] python: Etudes                                // Beginner
}
```

Éléments d'une ligne, de gauche à droite :

1. **Pastille de niveau** — petit rond coloré (lecture rapide).
2. **Logo de la techno** — `TechIcon` (simple-icons, `currentColor`/couleur de marque,
   fallback Lucide). Identification immédiate.
3. **Nom de la techno** — `skill.name`, stylé en `text-syntax-property`, éditable via
   `EditableText` (`editKey` existant conservé).
4. **`:`** ponctuation.
5. **Sources (`acquiredFrom`)** — pills inline qui s'enroulent (`flex-wrap`), chacune
   avec son icône d'entité (`getEntityIcon`), tooltip (`ItemTooltip`) et navigation au
   clic (vers expérience ou projet) — **comportement actuel conservé à l'identique**.
6. **Commentaire de niveau** — `// Intermediate`, stylé en `text-syntax-comment`.

Le label `acquiredFrom: [ ]` disparaît : le nom de la techno devient lui-même la clé de
propriété, les sources en sont la valeur.

### Légende des niveaux — en commentaire

En haut de la page (dans `PageShell`, sous le commentaire de titre existant), une ligne
de **commentaire de code** sert de légende :

```
// 🟢 Advanced   🟡 Intermediate   🔵 Beginner
```

Rendue en `text-syntax-comment`, avec les vraies pastilles colorées (pas des emoji) +
le libellé.

### Couleurs de niveau

| Niveau        | Pastille      |
|---------------|---------------|
| Advanced      | vert          |
| Intermediate  | ambre / jaune |
| Beginner      | bleu          |

Mappées dans un petit objet local (`LEVEL_STYLES`) — couleurs sémantiques propres au
niveau, indépendantes de l'`accentColor` de la catégorie.

## Composants

- **Réutilisés tels quels :** `CodeCard`, `ClassHeader` (en-tête de catégorie),
  `ClassBody`, `ClassClose`, `TechIcon`, `ItemTooltip`, `EditableText`,
  `CodeArrayItem` (variante `pill`, avec `leading`/`icon` pour le logo d'entité),
  `getEntityIcon`.
- **Logique conservée :** `skillRefs` + `targetSkillId` (scroll-to + ring de surbrillance
  à la navigation), `SkillDocumentation`, animations `motion`.
- **Nouveau :** un mapping `LEVEL_STYLES` (niveau → classe de couleur de pastille +
  libellé) et le rendu de ligne compacte, **inline dans `Skills.tsx`** (spécifique à la
  page, pas besoin d'une primitive partagée).

## Hors périmètre / notes

- Le type `Skill` et les données ne changent pas (`level` et `description` restent ;
  `description` n'est toujours pas affiché — pas demandé).
- `SkillLevel.tsx` reste orphelin (on ne le réintroduit pas ; la pastille est un simple
  rond).
- Effet de bord positif : l'ancien en-tête par techno (`flex flex-wrap` lignes ~181-195)
  disparaît, supprimant au passage le même risque de wrap cross-browser que celui corrigé
  récemment dans `ClassHeader`.

## Critères de réussite

- La section Skills est nettement plus courte (~1 ligne par techno au lieu de ~4).
- Le logo de chaque techno est visible.
- Le niveau apparaît en pastille **et** en commentaire ; la légende est en commentaire en
  haut de page.
- La navigation au clic sur une source (pill) fonctionne comme avant.
- Le multi-sources (PHP, JavaScript, SQL, WordPress, Git) s'affiche correctement (pills
  qui s'enroulent).
- `npx tsc --noEmit` passe sans erreur.
- Rendu correct sur mobile étroit (le commentaire de niveau peut passer à la ligne).
