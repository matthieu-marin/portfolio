import {
  Calendar,
  MapPin,
  Award,
  Target,
  Rocket,
  Building2,
  Code2,
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
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
import { experiences } from './data';

// UI-only metadata (icon, accent color) keyed by experience id — the data
// layer (`data/experiences.ts`) holds only content, not presentation.
const EXPERIENCE_UI: Record<string, { icon: typeof Code2; accentColor: AccentColor }> = {
  renault: { icon: Code2, accentColor: 'purple' },
  faubourg: { icon: Rocket, accentColor: 'blue' },
  chatterie2: { icon: Building2, accentColor: 'green' },
  chatterie1: { icon: Building2, accentColor: 'orange' },
};

// Tooltip copy per technology name, keyed by experience id then tech name.
// Not part of ExperienceEntry — display-only detail shown on hover.
const TECH_TOOLTIPS: Record<string, Record<string, { description: string; details: string }>> = {
  renault: {
    Java: { description: 'Langage de programmation orienté objet', details: "Utilisé pour : développement backend, applications d'entreprise" },
    SpringBoot: { description: 'Framework Java pour applications web', details: 'Utilisé pour : APIs REST, microservices, architecture backend' },
    AgileScrum: { description: 'Méthode de gestion de projet agile', details: 'Utilisé pour : sprints, rétrospectives, planification' },
  },
  faubourg: {
    NodeJS: { description: 'JavaScript runtime for scalable server applications', details: 'Utilisé pour : backend du projet IoT' },
    VueJS: { description: 'Framework JavaScript progressif', details: 'Utilisé pour : interface web de la plateforme' },
  },
  chatterie2: {
    PHP: { description: 'Langage de script côté serveur', details: 'Utilisé pour : développement backend du site' },
    WordPress: { description: 'CMS open source', details: 'Utilisé pour : création et gestion du site vitrine' },
  },
  chatterie1: {
    PHP: { description: 'Langage de script côté serveur', details: 'Utilisé pour : développement backend du site' },
    WordPress: { description: 'CMS open source', details: 'Utilisé pour : création du site vitrine' },
  },
};

// skillId lookup for each technology name, keyed by experience id — mirrors
// data/skills.ts ids so pills can navigate to the Skills page.
const TECH_SKILL_IDS: Record<string, Record<string, string>> = {
  renault: { Java: 'java', SpringBoot: 'springboot', AgileScrum: 'agile' },
  faubourg: { NodeJS: 'nodejs', VueJS: 'vuejs' },
  chatterie2: { PHP: 'php', WordPress: 'wordpress' },
  chatterie1: { PHP: 'php', WordPress: 'wordpress' },
};

// Extra technologies displayed on the card but without a dedicated Skills
// entry (no skillId, so no tooltip navigation) — display-only.
const EXTRA_TECHNOLOGIES: Record<string, string[]> = {
  renault: ['GoogleCloud', 'Docker', 'GitLab', 'Dynatrace'],
  faubourg: ['IoT', 'Grafana'],
};

// Display order for technology pills per experience. Ensures the original
// rendered order is preserved when merging skill-linked techs with extra techs.
// Entries not listed are appended at the end in the order they appear.
const TECH_DISPLAY_ORDER: Record<string, string[]> = {
  renault: ['Java', 'SpringBoot', 'GoogleCloud', 'Docker', 'GitLab', 'Dynatrace', 'AgileScrum'],
  faubourg: ['NodeJS', 'VueJS', 'IoT', 'Grafana'],
  chatterie2: ['PHP', 'WordPress'],
  chatterie1: ['PHP', 'WordPress'],
};

const EXTRA_TECH_TOOLTIPS: Record<string, Record<string, { description: string; details: string }>> = {
  renault: {
    GoogleCloud: { description: 'Plateforme cloud Google', details: 'Utilisé pour : Kubernetes Engine, Pub/Sub, Cloud Functions' },
    Docker: { description: "Conteneurisation d'applications", details: 'Utilisé pour : containerisation des services' },
    GitLab: { description: 'Plateforme DevOps CI/CD', details: 'Utilisé pour : pipelines CI/CD, gestion du code source' },
    Dynatrace: { description: 'Outil de monitoring applicatif', details: 'Utilisé pour : observabilité et monitoring des applications' },
  },
  faubourg: {
    IoT: { description: 'Internet des Objets', details: 'Utilisé pour : gestion de données capteurs' },
    Grafana: { description: 'Outil de visualisation et monitoring', details: 'Utilisé pour : tableaux de bord et monitoring de la plateforme' },
  },
};

// Achievements per experience id — display-only, not part of ExperienceEntry.
const ACHIEVEMENTS: Record<string, { fr: string[]; en: string[] }> = {
  renault: {
    fr: ["En cours — alternance jusqu'à juin 2026"],
    en: ['Ongoing — apprenticeship until June 2026'],
  },
  faubourg: {
    fr: ['Livraison de la plateforme web IoT en 4 mois'],
    en: ['Delivery of the IoT web platform in 4 months'],
  },
  chatterie2: {
    fr: ['Site web vitrine finalisé et livré'],
    en: ['Showcase website finalized and delivered'],
  },
  chatterie1: {
    fr: ['Base du site web vitrine développée'],
    en: ['Showcase website base developed'],
  },
};

const CURRENT_IDS = new Set(['renault']);

export function Experience() {
  const { t, language } = useLanguage();
  const { targetExperienceId, setTargetSkillId } = useNavigation();
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
    <PageShell commentTitle={t('experience.title')} commentEditKey="experience.comment">
      <div className="space-y-3 md:space-y-4">
        {experiences.map((exp, expIndex) => {
          const isTargeted = exp.id === targetExperienceId;
          const ui = EXPERIENCE_UI[exp.id];
          const skillIds = TECH_SKILL_IDS[exp.id] ?? {};
          const tooltips = TECH_TOOLTIPS[exp.id] ?? {};
          const extraTech = EXTRA_TECHNOLOGIES[exp.id] ?? [];
          const extraTooltips = EXTRA_TECH_TOOLTIPS[exp.id] ?? {};
          const achievements = ACHIEVEMENTS[exp.id] ?? { fr: [], en: [] };

          // Technologies shown = skill-linked techs (from data layer) + extra
          // display-only techs, sorted by the display order map to preserve original order.
          const allTechs: Array<{ name: string; skillId: string | null }> = [
            ...exp.technologies.map((skillId) => {
              const name = Object.entries(skillIds).find(([, id]) => id === skillId)?.[0] ?? skillId;
              return { name, skillId };
            }),
            ...extraTech.map((name) => ({ name, skillId: null })),
          ];

          // Sort by display order if available, otherwise append unknown techs at the end
          const displayOrder = TECH_DISPLAY_ORDER[exp.id] ?? [];
          const techNames = allTechs.sort((a, b) => {
            const aIdx = displayOrder.indexOf(a.name);
            const bIdx = displayOrder.indexOf(b.name);
            // Both in order map: sort by order map
            if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
            // Only a in order map: a comes first
            if (aIdx >= 0) return -1;
            // Only b in order map: b comes first
            if (bIdx >= 0) return 1;
            // Neither in order map: keep original order
            return 0;
          });

          return (
            <CodeCard
              key={exp.id}
              ref={(el) => {
                experienceRefs.current[exp.id] = el;
              }}
              accentColor={ui.accentColor}
              delay={0.1 + expIndex * 0.1}
              highlighted={isTargeted}
            >
              <ClassHeader
                icon={ui.icon}
                title={exp.company}
                titleEditKey={`experience.${expIndex}.company`}
                rightSlot={
                  CURRENT_IDS.has(exp.id) ? (
                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30 font-mono">
                      {t('experience.current')}
                    </span>
                  ) : null
                }
              />
              <ClassBody>
                <CodeProperty
                  name="position"
                  value={exp.role[language]}
                  valueEditKey={`experience.${expIndex}.position`}
                />
                <CodeProperty
                  name="period"
                  value={exp.period[language]}
                  valueEditKey={`experience.${expIndex}.period`}
                  icon={Calendar}
                />
                <CodeProperty
                  name="location"
                  value={exp.location}
                  valueEditKey={`experience.${expIndex}.location`}
                  icon={MapPin}
                />
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
                          editKey={`experience.${expIndex}.tech.${idx}.name`}
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
                <CodeArrayProperty name="responsibilities">
                  {exp.highlights.map((resp, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Target}
                      isLast={idx === exp.highlights.length - 1}
                    >
                      <EditableText
                        value={resp[language]}
                        editKey={`experience.${expIndex}.resp.${language}.${idx}`}
                      />
                    </CodeArrayItem>
                  ))}
                </CodeArrayProperty>
                <CodeArrayProperty name="achievements">
                  {achievements[language].map((achievement, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Award}
                      isLast={idx === achievements[language].length - 1}
                    >
                      <EditableText
                        value={achievement}
                        editKey={`experience.${expIndex}.ach.${language}.${idx}`}
                      />
                    </CodeArrayItem>
                  ))}
                </CodeArrayProperty>
              </ClassBody>
              <ClassClose />
            </CodeCard>
          );
        })}
      </div>
    </PageShell>
  );
}
