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

type Experience = {
  id: string;
  company: string;
  position: string;
  icon: typeof Code2;
  accentColor: AccentColor;
  period: string;
  location: string;
  description: { fr: string; en: string };
  current: boolean;
  technologies: Array<{
    name: string;
    skillId: string | null;
    description: string;
    details: string;
  }>;
  responsibilities: { fr: string[]; en: string[] };
  achievements: { fr: string[]; en: string[] };
};

export function Experience() {
  const { t, language } = useLanguage();
  const { targetExperienceId, setTargetSkillId } = useNavigation();
  const experienceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const experiences: Experience[] = [
    {
      id: 'renault',
      company: 'RenaultDigital',
      position: 'Développeur (Alternance)',
      icon: Code2,
      accentColor: 'purple',
      period: "sept. 2024 – aujourd'hui",
      location: 'Saint-Quentin, Hauts-de-France · Hybride',
      description: {
        fr: "Développement en contrat d'alternance dans le cadre du Master Cloud Computing & Mobility",
        en: 'Development as part of apprenticeship contract within the Master Cloud Computing & Mobility program',
      },
      current: true,
      technologies: [
        { name: 'Java', skillId: 'java', description: 'Langage de programmation orienté objet', details: 'Utilisé pour : développement backend, applications d\'entreprise' },
        { name: 'SpringBoot', skillId: 'springboot', description: 'Framework Java pour applications web', details: 'Utilisé pour : APIs REST, microservices, architecture backend' },
        { name: 'GoogleCloud', skillId: null, description: 'Plateforme cloud Google', details: 'Utilisé pour : Kubernetes Engine, Pub/Sub, Cloud Functions' },
        { name: 'Docker', skillId: null, description: 'Conteneurisation d\'applications', details: 'Utilisé pour : containerisation des services' },
        { name: 'GitLab', skillId: null, description: 'Plateforme DevOps CI/CD', details: 'Utilisé pour : pipelines CI/CD, gestion du code source' },
        { name: 'Dynatrace', skillId: null, description: 'Outil de monitoring applicatif', details: 'Utilisé pour : observabilité et monitoring des applications' },
        { name: 'AgileScrum', skillId: 'agile', description: 'Méthode de gestion de projet agile', details: 'Utilisé pour : sprints, rétrospectives, planification' },
      ],
      responsibilities: {
        fr: [
          "Développement d'applications en Java / Spring Boot",
          'Utilisation de Google Cloud (Kubernetes Engine, Pub/Sub, Cloud Functions)',
          'Conteneurisation avec Docker',
          'Pratiques DevOps sur GitLab (pipelines CI/CD)',
          'Monitoring applicatif avec Dynatrace',
          'Participation aux cérémonies agile (SCRUM)',
        ],
        en: [
          'Application development in Java / Spring Boot',
          'Google Cloud usage (Kubernetes Engine, Pub/Sub, Cloud Functions)',
          'Containerization with Docker',
          'DevOps practices on GitLab (CI/CD pipelines)',
          'Application monitoring with Dynatrace',
          'Participation in agile ceremonies (SCRUM)',
        ],
      },
      achievements: {
        fr: ["En cours — alternance jusqu'à juin 2026"],
        en: ['Ongoing — apprenticeship until June 2026'],
      },
    },
    {
      id: 'faubourg',
      company: 'FabourgNumerique',
      position: 'Stagiaire Développement Web',
      icon: Rocket,
      accentColor: 'blue',
      period: 'mai 2024 – août 2024 · 4 mois',
      location: 'Saint-Quentin, Hauts-de-France · Hybride',
      description: {
        fr: 'Projet Territoire Connecté et Durable — plateforme web IoT en collaboration avec La Somme Numérique',
        en: 'Connected and Sustainable Territory project — IoT web platform in collaboration with La Somme Numérique',
      },
      current: false,
      technologies: [
        { name: 'NodeJS', skillId: 'nodejs', description: 'JavaScript runtime for scalable server applications', details: 'Utilisé pour : backend du projet IoT' },
        { name: 'VueJS', skillId: 'vuejs', description: 'Framework JavaScript progressif', details: 'Utilisé pour : interface web de la plateforme' },
        { name: 'IoT', skillId: null, description: 'Internet des Objets', details: 'Utilisé pour : gestion de données capteurs' },
        { name: 'Grafana', skillId: null, description: 'Outil de visualisation et monitoring', details: 'Utilisé pour : tableaux de bord et monitoring de la plateforme' },
      ],
      responsibilities: {
        fr: [
          'Développement de la plateforme web pour la gestion de données IoT',
          'Travail sur le projet Territoire Connecté et Durable',
          'Mise en place du monitoring avec Grafana',
          'Collaboration avec La Somme Numérique',
        ],
        en: [
          'Development of the web platform for IoT data management',
          'Work on the Connected and Sustainable Territory project',
          'Setting up monitoring with Grafana',
          'Collaboration with La Somme Numérique',
        ],
      },
      achievements: {
        fr: ['Livraison de la plateforme web IoT en 4 mois'],
        en: ['Delivery of the IoT web platform in 4 months'],
      },
    },
    {
      id: 'chatterie2',
      company: 'ChatterieTerreBrasco',
      position: 'Stagiaire Développement Web',
      icon: Building2,
      accentColor: 'green',
      period: 'février 2023',
      location: 'France',
      description: {
        fr: 'Finalisation du site web vitrine précédemment débuté lors du stage précédent',
        en: 'Finalization of the showcase website previously started during the previous internship',
      },
      current: false,
      technologies: [
        { name: 'PHP', skillId: 'php', description: 'Langage de script côté serveur', details: 'Utilisé pour : développement backend du site' },
        { name: 'WordPress', skillId: 'wordpress', description: 'CMS open source', details: 'Utilisé pour : création et gestion du site vitrine' },
      ],
      responsibilities: {
        // TODO: miss info for chatterie2.responsibilities
        fr: [
          "Finalisation du site web vitrine de l'association",
          'Développement PHP et intégration WordPress',
        ],
        en: [
          "Finalization of the association's showcase website",
          'PHP development and WordPress integration',
        ],
      },
      achievements: {
        // TODO: miss info for chatterie2.achievements
        fr: ['Site web vitrine finalisé et livré'],
        en: ['Showcase website finalized and delivered'],
      },
    },
    {
      id: 'chatterie1',
      company: 'ChatterieTerreBrasco',
      position: 'Stagiaire Développement Web',
      icon: Building2,
      accentColor: 'orange',
      period: 'mai 2022',
      location: 'France',
      description: {
        fr: "Commencement du développement d'une application web vitrine pour l'association",
        en: 'Start of development of a showcase web application for the association',
      },
      current: false,
      technologies: [
        { name: 'PHP', skillId: 'php', description: 'Langage de script côté serveur', details: 'Utilisé pour : développement backend du site' },
        { name: 'WordPress', skillId: 'wordpress', description: 'CMS open source', details: 'Utilisé pour : création du site vitrine' },
      ],
      responsibilities: {
        // TODO: miss info for chatterie1.responsibilities
        fr: [
          'Démarrage du développement du site web vitrine',
          "Mise en place de l'environnement WordPress",
        ],
        en: [
          'Start of showcase website development',
          'WordPress environment setup',
        ],
      },
      achievements: {
        // TODO: miss info for chatterie1.achievements
        fr: ['Base du site web vitrine développée'],
        en: ['Showcase website base developed'],
      },
    },
  ];

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

          return (
            <CodeCard
              key={exp.id}
              ref={(el) => {
                experienceRefs.current[exp.id] = el;
              }}
              accentColor={exp.accentColor}
              delay={0.1 + expIndex * 0.1}
              highlighted={isTargeted}
            >
              <ClassHeader
                icon={exp.icon}
                title={exp.company}
                titleEditKey={`experience.${expIndex}.company`}
                rightSlot={
                  exp.current ? (
                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30 font-mono">
                      {t('experience.current')}
                    </span>
                  ) : null
                }
              />
              <ClassBody>
                <CodeProperty
                  name="position"
                  value={exp.position}
                  valueEditKey={`experience.${expIndex}.position`}
                />
                <CodeProperty
                  name="period"
                  value={exp.period}
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
                  {exp.technologies.map((tech, idx) => {
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
                    return tech.skillId ? (
                      <ItemTooltip
                        key={idx}
                        itemName={tech.name}
                        description={tech.description}
                        details={tech.details}
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
                  {exp.responsibilities[language].map((resp, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Target}
                      isLast={idx === exp.responsibilities[language].length - 1}
                    >
                      <EditableText
                        value={resp}
                        editKey={`experience.${expIndex}.resp.${language}.${idx}`}
                      />
                    </CodeArrayItem>
                  ))}
                </CodeArrayProperty>
                <CodeArrayProperty name="achievements">
                  {exp.achievements[language].map((achievement, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Award}
                      isLast={idx === exp.achievements[language].length - 1}
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
