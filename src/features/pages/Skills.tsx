import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Database,
  Wrench,
  FileCode2,
  Braces,
  Boxes,
  Code,
  Terminal,
  Package,
  GitBranch,
  Zap,
  Globe,
  GraduationCap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { SkillDocumentation } from '../../shared/components/SkillDocumentation';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { EditableText } from '../../shared/components/EditableText';
import { TechIcon } from '../../shared/components/TechIcon';
import { getEntityIcon } from '../../shared/data/entityIcons';
import { cn } from '../../shared/components/ui/utils';
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
import { skillCategories, experiences, projects } from './data';
import type { SkillLevel } from './data/types';

const LEVEL_STYLES: Record<SkillLevel, { dot: string; label: string }> = {
  advanced: { dot: 'bg-green-400', label: 'Advanced' },
  intermediate: { dot: 'bg-amber-400', label: 'Intermediate' },
  beginner: { dot: 'bg-blue-400', label: 'Beginner' },
};

// UI-only metadata (icon, accent color) keyed by skill category id — the
// data layer (`data/skills.ts`) holds only content, not presentation.
const CATEGORY_UI: Record<string, { icon: LucideIcon; accentColor: AccentColor }> = {
  backend: { icon: Server, accentColor: 'green' },
  frontend: { icon: Code2, accentColor: 'purple' },
  database: { icon: Database, accentColor: 'blue' },
  tools: { icon: Wrench, accentColor: 'orange' },
};

// Icon per individual skill, keyed by skill id — display-only.
const SKILL_ICONS: Record<string, LucideIcon> = {
  java: Code,
  springboot: Zap,
  nodejs: Terminal,
  php: FileCode2,
  python: Braces,
  javascript: Braces,
  react: Boxes,
  vuejs: Zap,
  wordpress: Globe,
  mongodb: Database,
  sql: Database,
  git: GitBranch,
  agile: Package,
};

// displayName overrides — the source's raw `name`/`company` (id-like, e.g.
// "FabourgNumerique") differs from the human-friendly label shown in the
// tooltip title. 'studies' is not an experience nor a project — it refers
// to education (about.ts) and has no entry of its own in the data layer.
const DISPLAY_NAMES: Record<string, string> = {
  renault: 'Renault Digital',
  faubourg: 'Faubourg Numérique',
  chatterie2: 'Chatterie de la Terre de Brasco',
  chatterie1: 'Chatterie de la Terre de Brasco',
  studies: 'BTS SIO / Master UPJV',
  portfolio: 'Portfolio IDE',
};

// Tooltip description shown for an acquiredAt source, keyed by
// `${sourceId}:${skillId}` — the same source (e.g. "renault") is described
// slightly differently depending on which skill points to it, so a flat
// per-source map isn't enough. Falls back to DEFAULT_DESCRIPTIONS[sourceId].
const SOURCE_SKILL_DESCRIPTIONS: Record<string, string> = {
  'studies:python': 'Apprentissage durant le BTS SIO option B et le Master Cloud Computing',
  'studies:sql': 'Modules base de données du BTS SIO et de la Licence Pro',
  'renault:sql': 'Développeur en alternance — bases relationnelles côté backend Java/Spring',
};

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  renault: 'Développeur en alternance — Java, Spring Boot, Agile',
  faubourg: 'Stage — Node.js, Vue.js, IoT',
  chatterie2: 'Stage — PHP, WordPress',
  chatterie1: 'Stage — PHP, WordPress',
  studies: 'BTS SIO / Master UPJV',
  portfolio: 'Ce portfolio — React 18, TypeScript, Tailwind v4, Motion',
};

const DISPLAY_NAMES_STUDIES_SQL = 'BTS SIO / Licence Pro';

type AcquiredFrom = {
  type: 'experience' | 'project';
  id: string;
  name: string;
  displayName: string;
  description: string;
};

function resolveAcquiredFrom(id: string, skillId: string): AcquiredFrom {
  const description = SOURCE_SKILL_DESCRIPTIONS[`${id}:${skillId}`] ?? DEFAULT_DESCRIPTIONS[id] ?? '';
  const displayName = id === 'studies' && skillId === 'sql' ? DISPLAY_NAMES_STUDIES_SQL : (DISPLAY_NAMES[id] ?? id);

  if (id === 'studies') {
    return { type: 'experience', id: 'studies', name: 'Etudes', displayName, description };
  }
  const exp = experiences.find((e) => e.id === id);
  if (exp) {
    return { type: 'experience', id: exp.id, name: exp.company, displayName, description };
  }
  const project = projects.find((p) => p.id === id);
  if (project) {
    return { type: 'project', id: project.id, name: project.title, displayName, description };
  }
  // Fallback — should not happen if acquiredAt ids stay in sync with data.
  return { type: 'experience', id, name: id, displayName: id, description: '' };
}

export function Skills() {
  const { t, language } = useLanguage();
  const { targetSkillId, setTargetSkillId, setTargetProjectId, setTargetExperienceId } =
    useNavigation();
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
    <PageShell commentTitle={t('skills.title')} commentEditKey="skills.comment">
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
      <div className="space-y-6 md:space-y-8">
        {skillCategories.map((category, categoryIndex) => {
          const ui = CATEGORY_UI[category.id];
          const accent = ACCENT_CLASSES[ui.accentColor];
          const categoryName = category.id === 'tools' ? t('skills.tools') : category.name[language];

          return (
            <CodeCard
              key={category.id}
              accentColor={ui.accentColor}
              delay={0.1 + categoryIndex * 0.1}
            >
              <ClassHeader
                icon={ui.icon}
                title={categoryName}
                titleEditKey={`skills.${category.id}.name`}
              />
              <ClassBody className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const isTargeted = skill.id === targetSkillId;
                  const acquiredFrom = skill.acquiredAt.map((id) => resolveAcquiredFrom(id, skill.id));

                  return (
                    <motion.div
                      key={skill.id}
                      ref={(el) => {
                        skillRefs.current[skill.id] = el;
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.05,
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
                          fallback={SKILL_ICONS[skill.id] ?? GraduationCap}
                          className={cn('w-4 h-4 md:w-5 md:h-5 flex-shrink-0', accent.text)}
                        />
                        {/* Nom de la techno = clé de propriété (éditable) */}
                        <span className="text-syntax-property">
                          <EditableText
                            value={skill.name}
                            editKey={`skills.${category.id}.${skill.id}.name`}
                          />
                        </span>
                        <span className="text-syntax-punctuation">:</span>
                        {/* Sources (acquiredFrom) en pills inline, navigation conservée */}
                        {acquiredFrom.map((source, idx) => (
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
                                  window.dispatchEvent(
                                    new Event('navigate-to-experience')
                                  );
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
                })}
              </ClassBody>
              <ClassClose />
            </CodeCard>
          );
        })}
      </div>

      {targetSkillId && <SkillDocumentation skillId={targetSkillId} language={language} />}
    </PageShell>
  );
}
