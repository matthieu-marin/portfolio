# Skills Layout Compact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compacter la page Skills — chaque techno passe d'un bloc `class X { acquiredFrom: [...] }` (~4 lignes) à une seule ligne `[pastille] [logo] nom: <sources> // Niveau`, et afficher le niveau (pastille + commentaire) avec une légende en commentaire en haut de page.

**Architecture :** Modification d'un seul fichier de page (`src/features/pages/Skills.tsx`). On réutilise les primitives existantes (`CodeCard`, `ClassHeader`, `ClassBody`, `ClassClose`, `TechIcon`, `ItemTooltip`, `EditableText`, `CodeArrayItem` variante `pill`, `getEntityIcon`). Aucune nouvelle dépendance, aucune nouvelle primitive partagée. Le mapping niveau→style est un objet local.

**Tech Stack :** React 18 + TypeScript (strict), Tailwind CSS v4, motion/react. Pas de framework de test dans le projet → vérification par `npx tsc --noEmit` + `npx vite build` + contrôle visuel navigateur (pas de TDD unitaire, ce serait du YAGNI / nouvelle dépendance non justifiée).

**Note règles projet :** au démarrage de l'exécution, recopier ce plan en checklist dans `.context/states.md` (Rule 02) ; à la fin, ajouter une entrée dans `.context/history.md` (Rule 05). Ne pas committer sans demande explicite de l'utilisateur (Rule 07/global). Aucune commande destructive ici.

---

### Task 1 : Préparer imports + mapping des niveaux

**Files:**
- Modify: `src/features/pages/Skills.tsx` (zone des imports, lignes ~1-36 ; ajout du mapping après la définition du type `Skill`, ~ligne 51)

- [ ] **Step 1 : Ajouter l'import `cn`**

Dans le bloc d'imports en haut du fichier, ajouter sous la ligne `import { TechIcon } ...` :

```tsx
import { cn } from '../../shared/components/ui/utils';
```

- [ ] **Step 2 : Retirer l'import devenu inutile `CodeArrayProperty`**

Dans l'import groupé depuis `'../../shared/components/layout'`, supprimer la ligne `CodeArrayProperty,` (le composant ne sera plus utilisé après Task 3). Garder `CodeArrayItem`. Résultat de l'import groupé :

```tsx
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
  CodeArrayItem,
  ACCENT_CLASSES,
  type AccentColor,
} from '../../shared/components/layout';
```

- [ ] **Step 3 : Ajouter le mapping `LEVEL_STYLES`**

Juste après la définition du type `Skill` (avant `type SkillInterface`), ajouter :

```tsx
const LEVEL_STYLES: Record<Skill['level'], { dot: string; label: string }> = {
  Advanced: { dot: 'bg-green-400', label: 'Advanced' },
  Intermediate: { dot: 'bg-amber-400', label: 'Intermediate' },
  Beginner: { dot: 'bg-blue-400', label: 'Beginner' },
};
```

- [ ] **Step 4 : Vérifier le type-check**

Run: `npx tsc --noEmit`
Expected: 0 erreur. (`cn` et `LEVEL_STYLES` peuvent être signalés comme non utilisés uniquement si `noUnusedLocals` était activé — ce n'est pas le cas dans ce projet, donc PASS. Ils seront utilisés en Task 2/3.)

---

### Task 2 : Légende des niveaux en commentaire (haut de page)

**Files:**
- Modify: `src/features/pages/Skills.tsx` (dans le `return`, premier enfant à l'intérieur de `<PageShell>`, avant `<div className="space-y-6 md:space-y-8">`)

- [ ] **Step 1 : Insérer la ligne de légende**

Juste après `<PageShell ...>` et avant le `<div className="space-y-6 md:space-y-8">`, insérer :

```tsx
<div className="font-mono text-xs md:text-sm text-syntax-comment flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
  <span>{'// '}</span>
  <span className="inline-flex items-center gap-1.5">
    <span className="w-2 h-2 rounded-full bg-green-400" />
    Advanced
  </span>
  <span className="inline-flex items-center gap-1.5">
    <span className="w-2 h-2 rounded-full bg-amber-400" />
    Intermediate
  </span>
  <span className="inline-flex items-center gap-1.5">
    <span className="w-2 h-2 rounded-full bg-blue-400" />
    Beginner
  </span>
</div>
```

- [ ] **Step 2 : Vérifier le type-check**

Run: `npx tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 3 : Contrôle visuel**

Run: `npx vite` (ou serveur de dev déjà lancé), ouvrir la page Skills.
Expected: sous le commentaire de titre, une ligne `// 🟢 Advanced  🟡 Intermediate  🔵 Beginner` (pastilles colorées réelles), en couleur de commentaire.

---

### Task 3 : Remplacer le bloc par techno par la ligne compacte

**Files:**
- Modify: `src/features/pages/Skills.tsx` (corps de `skillInterface.skills.map(...)`, actuellement lignes ~163-241 — le `motion.div` qui contenait l'en-tête `class X {`, le `acquiredFrom` et l'accolade fermante)

- [ ] **Step 1 : Remplacer le contenu du `motion.div` de chaque skill**

Remplacer l'intégralité du JSX retourné par le `.map` des skills (le `motion.div` et tout son contenu : ancien en-tête `flex flex-wrap` avec `class`/nom/`{`, le bloc `CodeArrayProperty` `acquiredFrom`, et l'accolade fermante `}`) par ce nouveau `motion.div` à ligne unique :

```tsx
return (
  <motion.div
    key={skill.id}
    ref={(el) => {
      skillRefs.current[skill.id] = el;
    }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      delay: 0.2 + interfaceIndex * 0.1 + skillIndex * 0.05,
    }}
    className={`font-mono text-sm md:text-base p-2 -mx-2 rounded transition-all duration-300 ${
      isTargeted ? 'bg-accent/20 ring-2 ring-accent' : ''
    }`}
  >
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
      {/* Pastille de niveau */}
      <span
        className={cn(
          'w-2 h-2 rounded-full flex-shrink-0',
          LEVEL_STYLES[skill.level].dot
        )}
      />
      {/* Logo de la techno */}
      <TechIcon
        name={skill.name}
        fallback={skill.icon}
        className={cn('w-4 h-4 md:w-5 md:h-5 flex-shrink-0', accent.text)}
      />
      {/* Nom de la techno = clé de propriété (éditable) */}
      <span className="text-syntax-property">
        <EditableText
          value={skill.name}
          editKey={`skills.${skillInterface.id}.${skill.id}.name`}
        />
      </span>
      <span className="text-syntax-punctuation">:</span>
      {/* Sources (acquiredFrom) en pills inline, navigation conservée */}
      {skill.acquiredFrom.map((source, idx) => (
        <ItemTooltip
          key={idx}
          itemName={source.name}
          description={source.description}
          details={`Type: ${source.type}\nName: ${source.displayName}`}
          type="class"
          onClick={() => {
            if (source.type === 'project') {
              setTargetProjectId(source.id);
              window.dispatchEvent(new Event('navigate-to-project'));
            } else {
              setTargetExperienceId(source.id);
              window.dispatchEvent(new Event('navigate-to-experience'));
            }
          }}
        >
          <CodeArrayItem
            variant="pill"
            icon={getEntityIcon(source.id)}
            onClick={() => {
              if (source.type === 'project') {
                setTargetProjectId(source.id);
                window.dispatchEvent(new Event('navigate-to-project'));
              } else {
                setTargetExperienceId(source.id);
                window.dispatchEvent(new Event('navigate-to-experience'));
              }
            }}
          >
            {source.name}
          </CodeArrayItem>
        </ItemTooltip>
      ))}
      {/* Commentaire de niveau */}
      <span className="text-syntax-comment whitespace-nowrap">
        {`// ${LEVEL_STYLES[skill.level].label}`}
      </span>
    </div>
  </motion.div>
);
```

- [ ] **Step 2 : Vérifier le type-check**

Run: `npx tsc --noEmit`
Expected: 0 erreur. Vérifier qu'aucun import n'est resté orphelin de façon bloquante (`CodeArrayProperty` retiré en Task 1).

- [ ] **Step 3 : Vérifier le build**

Run: `npx vite build`
Expected: build OK, pas d'erreur TypeScript/Tailwind.

- [ ] **Step 4 : Contrôle visuel (desktop + mobile étroit)**

Ouvrir la page Skills.
Expected, pour chaque catégorie :
- en-tête `class Backend {` inchangé,
- une ligne par techno : pastille colorée + logo + nom + pills sources + `// Niveau`,
- multi-sources OK (PHP, JavaScript, SQL, WordPress, Git affichent 2 pills),
- clic sur une pill → navigue vers l'expérience/projet correspondant (comportement conservé),
- à largeur étroite, les pills et le commentaire passent à la ligne proprement,
- la section est visiblement plus courte qu'avant.

---

### Task 4 : Mettre à jour le suivi projet (.context)

**Files:**
- Modify: `.context/states.md`
- Modify: `.context/history.md`

- [ ] **Step 1 : Cocher toutes les étapes dans `.context/states.md`**

Mettre à jour `states.md` (déjà rempli en checklist au démarrage) : toutes les cases `[x]`, avec une note « contrôle visuel à valider par l'utilisateur ».

- [ ] **Step 2 : Ajouter l'entrée dans `.context/history.md`**

Sous la section datée `## 2026-06-08` (la créer si absente), ajouter :

```markdown
- REFACTOR: Skills — refonte compacte de la mise en page
  - Chaque techno passe d'un bloc `class X { acquiredFrom: [...] }` (~4 lignes) à une ligne unique : pastille de niveau + logo + nom + pills sources + commentaire `// Niveau`
  - Niveau (Beginner/Intermediate/Advanced) enfin affiché : pastille colorée + commentaire, légende en commentaire en haut de page
  - Suppression de l'ancien en-tête `flex flex-wrap` par techno (supprime au passage le même risque de wrap cross-browser que celui corrigé dans ClassHeader)
  - `CodeArrayProperty` retiré des imports de Skills.tsx
```

- [ ] **Step 3 : Vérification finale**

Run: `npx tsc --noEmit`
Expected: 0 erreur. Le travail est prêt pour revue visuelle utilisateur.

---

## Notes d'implémentation

- **Navigation des pills :** le double `onClick` (sur `ItemTooltip` ET `CodeArrayItem`) reproduit le comportement actuel — ne pas « simplifier » en en retirant un, le tooltip et le bouton ont chacun leur handler.
- **`SkillLevel.tsx`** reste orphelin (non réintroduit) ; la pastille est un simple `<span>` rond.
- **Couleurs de niveau** (`bg-green-400` / `bg-amber-400` / `bg-blue-400`) sont des classes Tailwind standard, indépendantes de l'`accentColor` de la catégorie — sémantique propre au niveau.
- **Pas de commit automatique.** Proposer le commit à l'utilisateur une fois la revue visuelle validée.
