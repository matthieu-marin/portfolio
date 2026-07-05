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

type Skill = {
  id: string;
  name: string;
  icon: LucideIcon;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  acquiredFrom: Array<{
    type: 'experience' | 'project';
    id: string;
    name: string;
    displayName: string;
    description: string;
  }>;
};

const LEVEL_STYLES: Record<Skill['level'], { dot: string; label: string }> = {
  Advanced: { dot: 'bg-green-400', label: 'Advanced' },
  Intermediate: { dot: 'bg-amber-400', label: 'Intermediate' },
  Beginner: { dot: 'bg-blue-400', label: 'Beginner' },
};

type SkillInterface = {
  id: string;
  name: string;
  icon: LucideIcon;
  accentColor: AccentColor;
  description: string;
  skills: Skill[];
};

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

  const skillInterfaces: SkillInterface[] = [
    {
      id: 'backend',
      name: 'Backend',
      icon: Server,
      accentColor: 'green',
      description: 'Interface for server-side development technologies',
      skills: [
        { id: 'java', name: 'Java', icon: Code, level: 'Intermediate', description: 'Langage orienté objet utilisé chez Renault Digital', acquiredFrom: [{ type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' }] },
        { id: 'springboot', name: 'Spring Boot', icon: Zap, level: 'Intermediate', description: "Framework Java pour le développement d'applications web", acquiredFrom: [{ type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' }] },
        { id: 'nodejs', name: 'Node.js', icon: Terminal, level: 'Intermediate', description: 'JavaScript runtime for scalable server applications', acquiredFrom: [{ type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }] },
        { id: 'php', name: 'PHP', icon: FileCode2, level: 'Intermediate', description: 'Langage de script côté serveur pour le développement web', acquiredFrom: [
          { type: 'experience', id: 'chatterie2', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
          { type: 'experience', id: 'chatterie1', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
        ] },
        { id: 'python', name: 'Python', icon: Braces, level: 'Beginner', description: "Langage polyvalent pour le scripting et l'automatisation", acquiredFrom: [{ type: 'experience', id: 'studies', name: 'Etudes', displayName: 'BTS SIO / Master UPJV', description: 'Apprentissage durant le BTS SIO option B et le Master Cloud Computing' }] },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: Code2,
      accentColor: 'purple',
      description: 'Interface for client-side development technologies',
      skills: [
        { id: 'javascript', name: 'JavaScript', icon: Braces, level: 'Advanced', description: 'Langage principal du développement web', acquiredFrom: [
          { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' },
          { type: 'experience', id: 'chatterie2', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
        ] },
        { id: 'react', name: 'React', icon: Boxes, level: 'Intermediate', description: 'Bibliothèque UI pour construire des interfaces interactives', acquiredFrom: [{ type: 'project', id: 'portfolio', name: 'PortfolioIDE', displayName: 'Portfolio IDE', description: 'Ce portfolio — React 18, TypeScript, Tailwind v4, Motion' }] },
        { id: 'vuejs', name: 'Vue.js', icon: Zap, level: 'Intermediate', description: 'Framework JavaScript progressif pour le développement web', acquiredFrom: [{ type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }] },
        { id: 'wordpress', name: 'WordPress', icon: Globe, level: 'Intermediate', description: 'CMS open source pour la création de sites web', acquiredFrom: [
          { type: 'experience', id: 'chatterie2', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
          { type: 'experience', id: 'chatterie1', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
        ] },
      ],
    },
    {
      id: 'database',
      name: 'Database',
      icon: Database,
      accentColor: 'blue',
      description: 'Interface for database management systems',
      skills: [
        { id: 'mongodb', name: 'MongoDB', icon: Database, level: 'Intermediate', description: 'Base de données NoSQL pour des modèles de données flexibles', acquiredFrom: [{ type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }] },
        { id: 'sql', name: 'SQL', icon: Database, level: 'Intermediate', description: 'Langage de requête pour bases de données relationnelles', acquiredFrom: [
          { type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — bases relationnelles côté backend Java/Spring' },
          { type: 'experience', id: 'studies', name: 'Etudes', displayName: 'BTS SIO / Licence Pro', description: 'Modules base de données du BTS SIO et de la Licence Pro' },
        ] },
      ],
    },
    {
      id: 'tools',
      name: t('skills.tools'),
      icon: Wrench,
      accentColor: 'orange',
      description: 'Interface for development tools and utilities',
      skills: [
        { id: 'git', name: 'Git', icon: GitBranch, level: 'Intermediate', description: 'Système de contrôle de version distribué', acquiredFrom: [
          { type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' },
          { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' },
        ] },
        { id: 'agile', name: 'Agile/SCRUM', icon: Package, level: 'Intermediate', description: 'Méthode de gestion de projet itérative', acquiredFrom: [{ type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' }] },
      ],
    },
  ];

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
        {skillInterfaces.map((skillInterface, interfaceIndex) => {
          const accent = ACCENT_CLASSES[skillInterface.accentColor];

          return (
            <CodeCard
              key={skillInterface.id}
              accentColor={skillInterface.accentColor}
              delay={0.1 + interfaceIndex * 0.1}
            >
              <ClassHeader
                icon={skillInterface.icon}
                title={skillInterface.name}
                titleEditKey={`skills.${skillInterface.id}.name`}
              />
              <ClassBody className="space-y-4">
                {skillInterface.skills.map((skill, skillIndex) => {
                  const isTargeted = skill.id === targetSkillId;

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
