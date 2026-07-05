import {
  ExternalLink,
  Github,
  Code2,
  Rocket,
  Cat,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { ImagePreviewTooltip } from '../../shared/components/ImagePreviewTooltip';
import { EditableText } from '../../shared/components/EditableText';
import { TechIcon } from '../../shared/components/TechIcon';
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
  CodeProperty,
  CodeArrayProperty,
  CodeArrayItem,
  type AccentColor,
} from '../../shared/components/layout';
import { projects } from './data';

// UI-only metadata (icon, accent color) keyed by project id — the data layer
// (`data/projects.ts`) holds only content, not presentation.
const PROJECT_UI: Record<string, { icon: typeof Code2; accentColor: AccentColor }> = {
  portfolio: { icon: Code2, accentColor: 'purple' },
  'iot-territoire': { icon: Radio, accentColor: 'blue' },
  'chatterie-vitrine': { icon: Cat, accentColor: 'orange' },
};

// Tooltip copy per technology name, keyed by project id then tech name.
// Not part of ProjectEntry — display-only detail shown on hover.
const TECH_TOOLTIPS: Record<string, Record<string, { description: string; details: string }>> = {
  portfolio: {
    React: { description: 'Bibliothèque UI moderne pour interfaces interactives', details: "Utilisé pour : architecture composants, hooks, gestion d'état" },
  },
  'iot-territoire': {
    NodeJS: { description: 'Runtime JavaScript serveur', details: 'Utilisé pour : ingestion des données capteurs, API REST' },
    VueJS: { description: 'Framework JavaScript progressif', details: 'Utilisé pour : interface de visualisation des données IoT' },
    MongoDB: { description: 'Base NoSQL orientée documents', details: 'Utilisé pour : stockage flexible des relevés capteurs' },
  },
  'chatterie-vitrine': {
    PHP: { description: 'Langage de script côté serveur', details: 'Utilisé pour : développement backend du site et templates' },
    WordPress: { description: 'CMS open-source', details: 'Utilisé pour : gestion de contenu et structure du site vitrine' },
  },
};

// skillId lookup for each technology name, keyed by project id — mirrors
// data/skills.ts ids so pills can navigate to the Skills page.
const TECH_SKILL_IDS: Record<string, Record<string, string>> = {
  portfolio: { React: 'react' },
  'iot-territoire': { NodeJS: 'nodejs', VueJS: 'vuejs', MongoDB: 'mongodb' },
  'chatterie-vitrine': { PHP: 'php', WordPress: 'wordpress' },
};

// Extra technologies displayed on the card but without a dedicated Skills
// entry (no skillId, so no tooltip navigation) — display-only.
const EXTRA_TECHNOLOGIES: Record<string, string[]> = {
  portfolio: ['TypeScript', 'TailwindCSS', 'Motion'],
};

const EXTRA_TECH_TOOLTIPS: Record<string, Record<string, { description: string; details: string }>> = {
  portfolio: {
    TypeScript: { description: 'Superset typé de JavaScript', details: 'Utilisé pour : sûreté de type, autocomplétion IDE, refactor sereins' },
    TailwindCSS: { description: 'Framework CSS utility-first', details: 'Utilisé pour : styling, système de thèmes, responsive' },
    Motion: { description: "Bibliothèque d'animation pour React", details: 'Utilisé pour : transitions de pages, effets au survol' },
  },
};

const PREVIEWS: Record<string, Array<{ label: string; imageUrl: string }>> = {};

export function Projects() {
  const { t, language } = useLanguage();
  const { targetProjectId, setTargetSkillId } = useNavigation();
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (targetProjectId) {
      const currentRef = projectRefs.current[targetProjectId];
      if (currentRef) {
        currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetProjectId]);

  return (
    <PageShell commentTitle={t('projects.title')} commentEditKey="projects.comment">
      <div className="space-y-6 md:space-y-8">
        {projects.map((project, projectIndex) => {
          const ui = PROJECT_UI[project.id];
          const Icon = ui.icon;
          const isTargeted = project.id === targetProjectId;
          const previews = PREVIEWS[project.id] ?? [];
          const hasPreviews = previews.length > 0;
          const skillIds = TECH_SKILL_IDS[project.id] ?? {};
          const tooltips = TECH_TOOLTIPS[project.id] ?? {};
          const extraTech = EXTRA_TECHNOLOGIES[project.id] ?? [];
          const extraTooltips = EXTRA_TECH_TOOLTIPS[project.id] ?? {};

          const techNames: Array<{ name: string; skillId: string | null }> = [
            ...project.technologies.map((skillId) => {
              const name = Object.entries(skillIds).find(([, id]) => id === skillId)?.[0] ?? skillId;
              return { name, skillId };
            }),
            ...extraTech.map((name) => ({ name, skillId: null })),
          ];

          return (
            <CodeCard
              key={project.id}
              ref={(el) => {
                projectRefs.current[project.id] = el;
              }}
              accentColor={ui.accentColor}
              delay={0.1 + projectIndex * 0.1}
              highlighted={isTargeted}
            >
              <ClassHeader
                icon={Icon}
                title={project.title}
                titleEditKey={`projects.${projectIndex}.title`}
                rightSlot={
                  (project.repository || project.demo) && (
                    <div className="flex gap-2">
                      {project.repository && (
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 md:p-2 hover:bg-background rounded transition-colors"
                          title={t('projects.viewCode')}
                          aria-label="View code"
                        >
                          <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 md:p-2 hover:bg-background rounded transition-colors"
                          title={t('projects.viewDemo')}
                          aria-label="View demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                      )}
                    </div>
                  )
                }
              />
              <ClassBody>
                <CodeProperty
                  name="status"
                  value={project.status[language]}
                  valueEditKey={`projects.${projectIndex}.status`}
                />
                {project.repository && (
                  <CodeProperty
                    name="repository"
                    value={project.repository}
                    link={project.repository}
                  />
                )}
                <CodeArrayProperty name="technologies" variant="inline">
                  {techNames.map((tech, idx) => {
                    const inner = (
                      <CodeArrayItem
                        key={idx}
                        variant="pill"
                        leading={<TechIcon name={tech.name} className="w-3.5 h-3.5" />}
                      >
                        <EditableText
                          value={tech.name}
                          editKey={`projects.${projectIndex}.tech.${idx}.name`}
                        />
                      </CodeArrayItem>
                    );
                    const tooltip = tooltips[tech.name] ?? extraTooltips[tech.name];
                    return tech.skillId && tooltip ? (
                      <ItemTooltip
                        key={idx}
                        itemName={tech.name}
                        description={tooltip.description}
                        details={tooltip.details}
                        type="class"
                        onClick={() => {
                          setTargetSkillId(tech.skillId!);
                          window.dispatchEvent(new Event('navigate-to-skill'));
                        }}
                      >
                        {inner}
                      </ItemTooltip>
                    ) : (
                      inner
                    );
                  })}
                </CodeArrayProperty>
                <CodeArrayProperty name="features">
                  {project.features.map((feature, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Rocket}
                      isLast={idx === project.features.length - 1}
                    >
                      <EditableText
                        value={feature[language]}
                        editKey={`projects.${projectIndex}.features.${idx}`}
                      />
                    </CodeArrayItem>
                  ))}
                </CodeArrayProperty>
                {hasPreviews && (
                  <CodeArrayProperty name="previews">
                    {previews.map((preview, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ImageIcon className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0 opacity-60" />
                        <ImagePreviewTooltip
                          label={preview.label}
                          imageUrl={preview.imageUrl}
                        >
                          <span className="text-syntax-string cursor-pointer hover:underline">
                            "{preview.label}"
                          </span>
                        </ImagePreviewTooltip>
                        {idx < previews.length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </CodeArrayProperty>
                )}
              </ClassBody>
              <ClassClose />
            </CodeCard>
          );
        })}
      </div>
    </PageShell>
  );
}
