import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Database,
  Wrench,
  FileCode2,
  Braces,
  Code,
  Terminal,
  Package,
  GitBranch,
  Zap,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { SkillDocumentation } from '../../shared/components/SkillDocumentation';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { EditableText } from '../../shared/components/EditableText';

const skillIdMap: Record<string, { category: string; skillName: string }> = {
  'java': { category: 'Backend', skillName: 'Java' },
  'springboot': { category: 'Backend', skillName: 'Spring Boot' },
  'nodejs': { category: 'Backend', skillName: 'Node.js' },
  'php': { category: 'Backend', skillName: 'PHP' },
  'javascript': { category: 'Frontend', skillName: 'JavaScript' },
  'react': { category: 'Frontend', skillName: 'React' },
  'vuejs': { category: 'Frontend', skillName: 'Vue.js' },
  'wordpress': { category: 'Frontend', skillName: 'WordPress' },
  'mongodb': { category: 'Database', skillName: 'MongoDB' },
  'sql': { category: 'Database', skillName: 'SQL' },
  'git': { category: 'Tools', skillName: 'Git' },
  'agile': { category: 'Tools', skillName: 'Agile/SCRUM' },
};

export function Skills() {
  const { t, language } = useLanguage();
  const { targetSkillId, setTargetSkillId, setTargetProjectId, setTargetExperienceId } = useNavigation();
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

  const skillInterfaces = [
    {
      id: 'backend',
      name: 'Backend',
      icon: Server,
      color: 'text-green-400',
      borderColor: 'border-green-400',
      description: 'Interface for server-side development technologies',
      skills: [
        {
          id: 'java',
          name: 'Java',
          icon: Code,
          level: 'Intermediate',
          description: 'Langage orienté objet utilisé chez Renault Digital',
          acquiredFrom: [
            { type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' }
          ]
        },
        {
          id: 'springboot',
          name: 'Spring Boot',
          icon: Zap,
          level: 'Intermediate',
          description: 'Framework Java pour le développement d\'applications web',
          acquiredFrom: [
            { type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' }
          ]
        },
        {
          id: 'nodejs',
          name: 'Node.js',
          icon: Terminal,
          level: 'Intermediate',
          description: 'JavaScript runtime for scalable server applications',
          acquiredFrom: [
            { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }
          ]
        },
        {
          id: 'php',
          name: 'PHP',
          icon: FileCode2,
          level: 'Intermediate',
          description: 'Langage de script côté serveur pour le développement web',
          acquiredFrom: [
            { type: 'experience', id: 'chatterie2', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
            { type: 'experience', id: 'chatterie1', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' }
          ]
        },
        {
          id: 'python',
          name: 'Python',
          icon: Braces,
          level: 'Beginner',
          description: 'Langage polyvalent pour le scripting et l\'automatisation',
          acquiredFrom: [
            // TODO: miss info for python.acquiredFrom — contexte d'apprentissage non fourni dans info.md
          ]
        },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: Code2,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
      description: 'Interface for client-side development technologies',
      skills: [
        {
          id: 'javascript',
          name: 'JavaScript',
          icon: Braces,
          level: 'Advanced',
          description: 'Langage principal du développement web',
          acquiredFrom: [
            { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' },
            { type: 'experience', id: 'chatterie2', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' }
          ]
        },
        {
          id: 'react',
          name: 'React',
          icon: Boxes,
          level: 'Intermediate',
          description: 'Bibliothèque UI pour construire des interfaces interactives',
          acquiredFrom: [
            // TODO: miss info for react.acquiredFrom — contexte d'apprentissage non fourni dans info.md
          ]
        },
        {
          id: 'vuejs',
          name: 'Vue.js',
          icon: Zap,
          level: 'Intermediate',
          description: 'Framework JavaScript progressif pour le développement web',
          acquiredFrom: [
            { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }
          ]
        },
        {
          id: 'wordpress',
          name: 'WordPress',
          icon: Globe,
          level: 'Intermediate',
          description: 'CMS open source pour la création de sites web',
          acquiredFrom: [
            { type: 'experience', id: 'chatterie2', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' },
            { type: 'experience', id: 'chatterie1', name: 'ChatterieTerreBrasco', displayName: 'Chatterie de la Terre de Brasco', description: 'Stage — PHP, WordPress' }
          ]
        },
      ],
    },
    {
      id: 'database',
      name: 'Database',
      icon: Database,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      description: 'Interface for database management systems',
      skills: [
        {
          id: 'mongodb',
          name: 'MongoDB',
          icon: Database,
          level: 'Intermediate',
          description: 'Base de données NoSQL pour des modèles de données flexibles',
          acquiredFrom: [
            { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }
          ]
        },
        {
          id: 'sql',
          name: 'SQL',
          icon: Database,
          level: 'Intermediate',
          description: 'Langage de requête pour bases de données relationnelles',
          acquiredFrom: [
            // TODO: miss info for sql.acquiredFrom — contexte d'apprentissage non fourni dans info.md
          ]
        },
      ],
    },
    {
      id: 'tools',
      name: t('skills.tools'),
      icon: Wrench,
      color: 'text-orange-400',
      borderColor: 'border-orange-400',
      description: 'Interface for development tools and utilities',
      skills: [
        {
          id: 'git',
          name: 'Git',
          icon: GitBranch,
          level: 'Intermediate',
          description: 'Système de contrôle de version distribué',
          acquiredFrom: [
            { type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' },
            { type: 'experience', id: 'faubourg', name: 'FabourgNumerique', displayName: 'Faubourg Numérique', description: 'Stage — Node.js, Vue.js, IoT' }
          ]
        },
        {
          id: 'agile',
          name: 'Agile/SCRUM',
          icon: Package,
          level: 'Intermediate',
          description: 'Méthode de gestion de projet itérative',
          acquiredFrom: [
            { type: 'experience', id: 'renault', name: 'RenaultDigital', displayName: 'Renault Digital', description: 'Développeur en alternance — Java, Spring Boot, Agile' }
          ]
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base"
        >
          <span className="text-syntax-comment">{'// '}<EditableText value={t('skills.title')} editKey="skills.comment" /></span>
        </motion.div>
        <div className="space-y-6 md:space-y-8">
          {skillInterfaces.map((skillInterface, interfaceIndex) => {
            const Icon = skillInterface.icon;
            
            let borderClasses = '';
            switch (skillInterface.id) {
              case 'frontend':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-purple-400 hover:border-purple-400';
                break;
              case 'backend':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-green-400 hover:border-green-400';
                break;
              case 'database':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400';
                break;
              case 'tools':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-orange-400 hover:border-orange-400';
                break;
            }
            
            return (
              <motion.div
                key={skillInterface.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + interfaceIndex * 0.1 }}
                className={`group bg-editor/50 rounded-lg p-4 md:p-6 border border-accent/20 ${borderClasses} transition-all duration-300 overflow-hidden`}
              >
                <div className="font-mono space-y-2 text-sm md:text-base mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${skillInterface.color} flex-shrink-0`} />
                    <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                      <span className="text-syntax-keyword">class</span>{' '}
                      <span className={`text-syntax-class ${skillInterface.color} break-words`} style={{ fontSize: '1.1em' }}>
                        <EditableText value={skillInterface.name} editKey={`skills.${skillInterface.id}.name`} />
                      </span>{' '}
                      <span className="text-syntax-punctuation">{'{'}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 md:ml-8 space-y-4 overflow-hidden">
                  {skillInterface.skills.map((skill, skillIndex) => {
                    const isTargeted = skill.id === targetSkillId;
                    const SkillIcon = skill.icon;

                    return (
                      <motion.div
                        key={skill.id}
                        ref={(el) => { skillRefs.current[skill.id] = el; }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + interfaceIndex * 0.1 + skillIndex * 0.05 }}
                        className={`font-mono text-sm md:text-base p-2 -mx-2 rounded transition-all duration-300 ${
                          isTargeted ? 'bg-accent/20 ring-2 ring-accent' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <SkillIcon className={`w-4 h-4 md:w-5 md:h-5 ${skillInterface.color}`} />
                          <span className="text-syntax-keyword">class</span>{' '}
                          <span className={`text-syntax-class ${skillInterface.color}`}>
                            <EditableText value={skill.name} editKey={`skills.${skillInterface.id}.${skill.id}.name`} />
                          </span>
                          {' '}
                          <span className="text-syntax-punctuation">{'{'}</span>
                        </div>
                        <div className="ml-4 md:ml-6 space-y-1">
                          <div>
                            <span className="text-syntax-property"><EditableText value="level" editKey="skills.prop.level" /></span>
                            <span className="text-syntax-punctuation">:</span>{' '}
                            <span className="text-syntax-string">"<EditableText value={skill.level} editKey={`skills.${skillInterface.id}.${skill.id}.level`} />"</span>
                            <span className="text-syntax-punctuation">;</span>
                          </div>
                          <div>
                            <span className="text-syntax-property"><EditableText value="acquiredFrom" editKey="skills.prop.acquiredFrom" /></span>
                            <span className="text-syntax-punctuation">:</span>{' '}
                            <span className="text-syntax-punctuation">[</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            {skill.acquiredFrom.map((source, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="text-syntax-keyword">new</span>{' '}
                                <ItemTooltip
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
                                  <span className={`text-syntax-class ${skillInterface.color}`}>
                                    {source.name}
                                  </span>
                                </ItemTooltip>
                                <span className="text-syntax-punctuation">()</span>
                                {idx < skill.acquiredFrom.length - 1 && (
                                  <span className="text-syntax-punctuation">,</span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div>
                            <span className="text-syntax-punctuation">];</span>
                          </div>
                        </div>
                        <div className="font-mono mt-1">
                          <span className="text-syntax-punctuation">{'}'}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="font-mono text-sm md:text-base mt-3">
                  <span className="text-syntax-punctuation">{'}'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {targetSkillId && (
          <SkillDocumentation skillId={targetSkillId} language={language} />
        )}
      </div>
    </div>
  );
}