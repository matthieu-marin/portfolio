import { Server, Code2, Cloud, Database, Wrench, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../../../i18n/hooks';
import { useEdited } from '../../../shared/contexts/EditContext';
import { useNavigation } from '../../../shared/contexts/NavigationContext';
import { TechIcon } from '../../../shared/components/TechIcon';
import { cn } from '../../../shared/components/ui/utils';
import { skillCategories, experiences, projects } from '../data';
import { RecruiterShell, Section, Chip } from './primitives';

// UI-only per-category icon — the data layer (data/skills.ts) holds only
// content, not presentation. Kept in sync with the code view's category order.
const CATEGORY_ICON: Record<string, LucideIcon> = {
  backend: Server,
  frontend: Code2,
  cloud: Cloud,
  database: Database,
  tools: Wrench,
};

// displayName overrides for acquiredAt ids that are NOT experiences/projects —
// those have no entry in the data layer to derive a name from. Experience and
// project labels are derived below from `experiences[].company` and
// `projects[].title` so adding one only requires touching its data file.
const DISPLAY_NAMES: Record<string, string> = {
  studies: 'BTS SIO / Master UPJV',
};

const DISPLAY_NAMES_STUDIES_MYSQL = 'BTS SIO / Licence Pro';

type AcquiredFrom = {
  type: 'experience' | 'project' | 'other';
  id: string;
  displayName: string;
};

// Resolves an `acquiredAt` id (experience id, project id, or 'studies') to a
// display label + whether it's clickable. Mirrors the resolution used
// previously in Skills.tsx (source pills) — same fallbacks, same ids.
function resolveAcquiredFrom(id: string, skillId: string): AcquiredFrom {
  if (id === 'studies') {
    const displayName = skillId === 'mysql' ? DISPLAY_NAMES_STUDIES_MYSQL : (DISPLAY_NAMES[id] ?? id);
    return { type: 'other', id, displayName };
  }
  const experience = experiences.find((e) => e.id === id);
  if (experience) {
    return { type: 'experience', id, displayName: experience.company };
  }
  const project = projects.find((p) => p.id === id);
  if (project) {
    return { type: 'project', id, displayName: project.title };
  }
  // Fallback — should not happen if acquiredAt ids stay in sync with data.
  return { type: 'other', id, displayName: DISPLAY_NAMES[id] ?? id };
}

function SkillRow({ categoryId, skillId, index }: { categoryId: string; skillId: string; index: number }) {
  const { t, language } = useLanguage();
  const { setTargetExperienceId, setTargetProjectId } = useNavigation();
  const category = skillCategories.find((c) => c.id === categoryId)!;
  const skill = category.skills.find((s) => s.id === skillId)!;

  const description = useEdited(`skill.${skill.id}.description.${language}`, skill.description[language]);
  const sources = skill.acquiredAt.map((id) => resolveAcquiredFrom(id, skill.id));

  return (
    <div
      className={cn(
        'py-2.5',
        index > 0 && 'border-t border-border/60'
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <TechIcon name={skill.name} fallback={GraduationCap} className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
          {t('recruiter.skills.experienceCount', { count: skill.acquiredAt.length })}
        </span>
      </div>
      <p className="text-foreground/70 text-sm mt-1.5">{description}</p>
      {sources.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-foreground/50 text-xs">{t('recruiter.skills.acquiredAt')}</span>
          {sources.map((source, idx) =>
            source.type === 'other' ? (
              <Chip key={idx}>{source.displayName}</Chip>
            ) : (
              <Chip
                key={idx}
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
                {source.displayName}
              </Chip>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function SkillsRecruiter() {
  const { t, language } = useLanguage();
  const { targetSkillId, setTargetSkillId } = useNavigation();
  const skillRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (targetSkillId) {
      const skillRef = skillRefs.current[targetSkillId];
      if (skillRef) {
        skillRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => setTargetSkillId(null), 2000);
      }
    }
  }, [targetSkillId, setTargetSkillId]);

  return (
    <RecruiterShell>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('recruiter.skills.title')}</h1>
      {skillCategories.map((category, categoryIndex) => {
        const categoryName = category.id === 'tools' ? t('skills.tools') : category.name[language];
        return (
          <Section
            key={category.id}
            icon={CATEGORY_ICON[category.id] ?? Code2}
            title={categoryName}
            index={categoryIndex}
          >
            <div>
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.id}
                  ref={(el) => {
                    skillRefs.current[skill.id] = el;
                  }}
                  className={cn(
                    skill.id === targetSkillId && 'ring-2 ring-accent rounded-lg px-2 -mx-2'
                  )}
                >
                  <SkillRow categoryId={category.id} skillId={skill.id} index={skillIndex} />
                </div>
              ))}
            </div>
          </Section>
        );
      })}
    </RecruiterShell>
  );
}
