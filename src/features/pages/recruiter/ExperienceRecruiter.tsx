import { Briefcase, Calendar, MapPin, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../../../i18n/hooks';
import { useEdited } from '../../../shared/contexts/EditContext';
import { useNavigation } from '../../../shared/contexts/NavigationContext';
import { TechIcon } from '../../../shared/components/TechIcon';
import { experiences, SKILL_NAME_BY_ID, EXTRA_TECH_NAMES, TECH_DISPLAY_ORDER } from '../data';
import { RecruiterShell, Section, Chip } from './primitives';

// Tech display names are derived from data/skills.ts via data/techNames.ts —
// no local name maps here. EXTRA_TECH_NAMES (display-only techs without a
// Skills entry) and TECH_DISPLAY_ORDER live in the same data module.

function techsForExperience(expId: string, technologies: string[]) {
  const extraTech = EXTRA_TECH_NAMES[expId] ?? [];

  const allTechs: Array<{ name: string; skillId: string | null }> = [
    ...technologies.map((skillId) => ({ name: SKILL_NAME_BY_ID[skillId] ?? skillId, skillId })),
    ...extraTech.map((name) => ({ name, skillId: null })),
  ];

  const displayOrder = TECH_DISPLAY_ORDER[expId] ?? [];
  return allTechs.sort((a, b) => {
    const aIdx = displayOrder.indexOf(a.name);
    const bIdx = displayOrder.indexOf(b.name);
    if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
    if (aIdx >= 0) return -1;
    if (bIdx >= 0) return 1;
    return 0;
  });
}

function ExperienceCard({
  expId,
  index,
  refCallback,
  highlighted,
}: {
  expId: string;
  index: number;
  refCallback: (el: HTMLDivElement | null) => void;
  highlighted: boolean;
}) {
  const { t, language } = useLanguage();
  const { setTargetSkillId } = useNavigation();
  const exp = experiences.find((e) => e.id === expId)!;

  const role = useEdited(`exp.${exp.id}.role.${language}`, exp.role[language]);
  const techs = techsForExperience(exp.id, exp.technologies);

  return (
    <div
      ref={refCallback}
      className={highlighted ? 'ring-2 ring-accent rounded-xl' : undefined}
    >
      <Section icon={Briefcase} title={exp.company} index={index}>
        <div className="space-y-4">
          <div>
            <p className="text-foreground font-medium">{role}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground/60 text-xs md:text-sm mt-1">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {exp.period[language]}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {exp.location}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                {t(`recruiter.experience.kind.${exp.kind}`)}
              </span>
            </div>
          </div>

          <ul className="space-y-1.5">
            {exp.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Target className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{highlight[language]}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {techs.map((tech, idx) =>
              tech.skillId ? (
                <Chip key={idx} onClick={() => {
                  setTargetSkillId(tech.skillId);
                  window.dispatchEvent(new CustomEvent('navigate-to-skill'));
                }}>
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
        </div>
      </Section>
    </div>
  );
}

export function ExperienceRecruiter() {
  const { t } = useLanguage();
  const { targetExperienceId } = useNavigation();
  const experienceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (targetExperienceId) {
      const currentRef = experienceRefs.current[targetExperienceId];
      if (currentRef) {
        currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetExperienceId]);

  return (
    <RecruiterShell>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {t('recruiter.experience.title')}
      </h1>
      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            expId={exp.id}
            index={idx}
            highlighted={exp.id === targetExperienceId}
            refCallback={(el) => {
              experienceRefs.current[exp.id] = el;
            }}
          />
        ))}
      </div>
    </RecruiterShell>
  );
}
