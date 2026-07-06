import { FolderKanban, Github, ExternalLink, Rocket, Image as ImageIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../../../i18n/hooks';
import { useEdited } from '../../../shared/contexts/EditContext';
import { useNavigation } from '../../../shared/contexts/NavigationContext';
import { TechIcon } from '../../../shared/components/TechIcon';
import { ImageWithFallback } from '../../../shared/components/ImageWithFallback';
import { projects, SKILL_NAME_BY_ID } from '../data';
import { RecruiterShell, Section, Chip } from './primitives';

// Tech display names are derived from data/skills.ts via data/techNames.ts —
// no local name maps here. A technology is only clickable when it matches a
// known skillId; anything else (raw string not found in SKILL_NAME_BY_ID) is
// shown as a plain, non-navigable chip.
function techsForProject(technologies: string[]) {
  return technologies.map((tech) => {
    const name = SKILL_NAME_BY_ID[tech];
    return name ? { name, skillId: tech } : { name: tech, skillId: null as string | null };
  });
}

function ProjectCard({
  projectId,
  index,
  refCallback,
  highlighted,
}: {
  projectId: string;
  index: number;
  refCallback: (el: HTMLDivElement | null) => void;
  highlighted: boolean;
}) {
  const { t, language } = useLanguage();
  const { setTargetSkillId } = useNavigation();
  const project = projects.find((p) => p.id === projectId)!;

  const description = useEdited(
    `project.${project.id}.description.${language}`,
    project.description[language]
  );
  const techs = techsForProject(project.technologies);

  return (
    <div
      ref={refCallback}
      className={highlighted ? 'ring-2 ring-accent rounded-xl' : undefined}
    >
      <Section icon={FolderKanban} title={project.title} index={index}>
        <div className="space-y-4">
          <div>
            <p className="text-foreground">{description}</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
              {project.status[language]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {techs.map((tech, idx) =>
              tech.skillId ? (
                <Chip
                  key={idx}
                  onClick={() => {
                    setTargetSkillId(tech.skillId);
                    window.dispatchEvent(new CustomEvent('navigate-to-skill'));
                  }}
                >
                  <TechIcon name={tech.name} className="w-3.5 h-3.5 mr-1.5" />
                  {tech.name}
                </Chip>
              ) : (
                <Chip key={idx}>
                  <TechIcon name={tech.name} className="w-3.5 h-3.5 mr-1.5" />
                  {tech.name}
                </Chip>
              )
            )}
          </div>

          <ul className="space-y-1.5">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Rocket className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feature[language]}</span>
              </li>
            ))}
          </ul>

          {project.images.length > 0 && (
            <div>
              <h3 className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-foreground/60 mb-2">
                <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                {t('recruiter.projects.gallery')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {project.images.map((image, idx) => (
                  <ImageWithFallback
                    key={idx}
                    src={image.path}
                    alt={image.label}
                    className="w-full h-24 md:h-32 object-cover rounded-lg border border-border"
                  />
                ))}
              </div>
            </div>
          )}

          {(project.repository || project.demo) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background hover:bg-hover border border-border transition-colors text-xs md:text-sm"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('recruiter.projects.viewCode')}
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background hover:bg-hover border border-border transition-colors text-xs md:text-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('recruiter.projects.viewDemo')}
                </a>
              )}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

export function ProjectsRecruiter() {
  const { t } = useLanguage();
  const { targetProjectId } = useNavigation();
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
    <RecruiterShell>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {t('recruiter.projects.title')}
      </h1>
      <div className="space-y-4">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            projectId={project.id}
            index={idx}
            highlighted={project.id === targetProjectId}
            refCallback={(el) => {
              projectRefs.current[project.id] = el;
            }}
          />
        ))}
      </div>
    </RecruiterShell>
  );
}
