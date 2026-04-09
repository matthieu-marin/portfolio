import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Award,
  Target,
  Rocket,
  Building2,
  Code2
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { EditableText } from '../../shared/components/EditableText';

export function Experience() {
  const { t, language } = useLanguage();
  const { targetExperienceId, setTargetExperienceId, setTargetSkillId } = useNavigation();
  const experienceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const experiences = [
    {
      id: 'renault',
      company: 'RenaultDigital',
      position: 'Développeur (Alternance)',
      icon: Code2,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
      period: 'sept. 2024 – aujourd\'hui',
      location: 'Saint-Quentin, Hauts-de-France · Hybride',
      description: {
        fr: 'Développement en contrat d\'alternance dans le cadre du Master Cloud Computing & Mobility',
        en: 'Development as part of apprenticeship contract within the Master Cloud Computing & Mobility program'
      },
      current: true,
      technologies: [
        {
          name: 'Java',
          skillId: 'java',
          description: 'Langage de programmation orienté objet',
          details: 'Utilisé pour : développement backend, applications d\'entreprise'
        },
        {
          name: 'SpringBoot',
          skillId: 'springboot',
          description: 'Framework Java pour applications web',
          details: 'Utilisé pour : APIs REST, microservices, architecture backend'
        },
        {
          name: 'AgileScrum',
          skillId: 'agile',
          description: 'Méthode de gestion de projet agile',
          details: 'Utilisé pour : sprints, rétrospectives, planification'
        },
      ],
      responsibilities: {
        // TODO: miss info for renault.responsibilities — détails des missions non fournis dans info.md
        fr: [
          'Développement d\'applications en Java / Spring Boot',
          'Participation aux cérémonies agile (SCRUM)',
          'Collaboration avec les équipes Renault Digital',
        ],
        en: [
          'Application development in Java / Spring Boot',
          'Participation in agile ceremonies (SCRUM)',
          'Collaboration with Renault Digital teams',
        ]
      },
      achievements: {
        // TODO: miss info for renault.achievements — aucune réalisation chiffrée fournie dans info.md
        fr: [
          'En cours — alternance jusqu\'à juin 2026',
        ],
        en: [
          'Ongoing — apprenticeship until June 2026',
        ]
      }
    },
    {
      id: 'faubourg',
      company: 'FabourgNumerique',
      position: 'Stagiaire Développement Web',
      icon: Rocket,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      period: 'mai 2024 – août 2024 · 4 mois',
      location: 'Saint-Quentin, Hauts-de-France · Hybride',
      description: {
        fr: 'Projet Territoire Connecté et Durable — plateforme web IoT en collaboration avec La Somme Numérique',
        en: 'Connected and Sustainable Territory project — IoT web platform in collaboration with La Somme Numérique'
      },
      current: false,
      technologies: [
        {
          name: 'NodeJS',
          skillId: 'nodejs',
          description: 'JavaScript runtime for scalable server applications',
          details: 'Utilisé pour : backend du projet IoT'
        },
        {
          name: 'VueJS',
          skillId: 'vuejs',
          description: 'Framework JavaScript progressif',
          details: 'Utilisé pour : interface web de la plateforme'
        },
        {
          name: 'IoT',
          skillId: null,
          description: 'Internet des Objets',
          details: 'Utilisé pour : gestion de données capteurs'
        },
      ],
      responsibilities: {
        // TODO: miss info for faubourg.responsibilities — détails des missions non fournis dans info.md
        fr: [
          'Développement de la plateforme web pour la gestion de données IoT',
          'Travail sur le projet Territoire Connecté et Durable',
          'Collaboration avec La Somme Numérique',
        ],
        en: [
          'Development of the web platform for IoT data management',
          'Work on the Connected and Sustainable Territory project',
          'Collaboration with La Somme Numérique',
        ]
      },
      achievements: {
        // TODO: miss info for faubourg.achievements — aucune réalisation chiffrée fournie dans info.md
        fr: [
          'Livraison de la plateforme web IoT en 4 mois',
        ],
        en: [
          'Delivery of the IoT web platform in 4 months',
        ]
      }
    },
    {
      id: 'chatterie2',
      company: 'ChatterieTerreBrasco',
      position: 'Stagiaire Développement Web',
      icon: Building2,
      color: 'text-green-400',
      borderColor: 'border-green-400',
      period: 'février 2023',
      location: 'France',
      description: {
        fr: 'Finalisation du site web vitrine précédemment débuté lors du stage précédent',
        en: 'Finalization of the showcase website previously started during the previous internship'
      },
      current: false,
      technologies: [
        {
          name: 'PHP',
          skillId: 'php',
          description: 'Langage de script côté serveur',
          details: 'Utilisé pour : développement backend du site'
        },
        {
          name: 'WordPress',
          skillId: 'wordpress',
          description: 'CMS open source',
          details: 'Utilisé pour : création et gestion du site vitrine'
        },
      ],
      responsibilities: {
        // TODO: miss info for chatterie2.responsibilities — détails des missions non fournis dans info.md
        fr: [
          'Finalisation du site web vitrine de l\'association',
          'Développement PHP et intégration WordPress',
        ],
        en: [
          'Finalization of the association\'s showcase website',
          'PHP development and WordPress integration',
        ]
      },
      achievements: {
        // TODO: miss info for chatterie2.achievements — aucune réalisation chiffrée fournie dans info.md
        fr: [
          'Site web vitrine finalisé et livré',
        ],
        en: [
          'Showcase website finalized and delivered',
        ]
      }
    },
    {
      id: 'chatterie1',
      company: 'ChatterieTerreBrasco',
      position: 'Stagiaire Développement Web',
      icon: Building2,
      color: 'text-orange-400',
      borderColor: 'border-orange-400',
      period: 'mai 2022',
      location: 'France',
      description: {
        fr: 'Commencement du développement d\'une application web vitrine pour l\'association',
        en: 'Start of development of a showcase web application for the association'
      },
      current: false,
      technologies: [
        {
          name: 'PHP',
          skillId: 'php',
          description: 'Langage de script côté serveur',
          details: 'Utilisé pour : développement backend du site'
        },
        {
          name: 'WordPress',
          skillId: 'wordpress',
          description: 'CMS open source',
          details: 'Utilisé pour : création du site vitrine'
        },
      ],
      responsibilities: {
        // TODO: miss info for chatterie1.responsibilities — détails des missions non fournis dans info.md
        fr: [
          'Démarrage du développement du site web vitrine',
          'Mise en place de l\'environnement WordPress',
        ],
        en: [
          'Start of showcase website development',
          'WordPress environment setup',
        ]
      },
      achievements: {
        // TODO: miss info for chatterie1.achievements — aucune réalisation chiffrée fournie dans info.md
        fr: [
          'Base du site web vitrine développée',
        ],
        en: [
          'Showcase website base developed',
        ]
      }
    }
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
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base"
        >
          <span className="text-syntax-comment">{'// '}<EditableText value={t('experience.title')} editKey="experience.comment" /></span>
        </motion.div>
        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, expIndex) => {
            const Icon = exp.icon;
            const isTargeted = exp.id === targetExperienceId;

            let borderClasses = '';
            switch (exp.id) {
              case 'renault':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-purple-400 hover:border-purple-400';
                break;
              case 'faubourg':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400';
                break;
              case 'chatterie2':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-green-400 hover:border-green-400';
                break;
              case 'chatterie1':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-orange-400 hover:border-orange-400';
                break;
            }

            return (
              <motion.div
                key={exp.id}
                ref={(el) => { experienceRefs.current[exp.id] = el; }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + expIndex * 0.1 }}
                className={`group bg-editor/50 rounded-lg p-4 md:p-6 border border-accent/20 ${borderClasses} transition-all duration-300 overflow-hidden ${
                  isTargeted ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="font-mono space-y-2 text-sm md:text-base mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${exp.color} flex-shrink-0`} />
                    <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                      <span className="text-syntax-keyword">class</span>{' '}
                      <span className={`text-syntax-class ${exp.color} break-words`} style={{ fontSize: '1.1em' }}>
                        <EditableText value={exp.company} editKey={`experience.${expIndex}.company`} />
                      </span>{' '}
                      <span className="text-syntax-punctuation">{'{'}</span>
                    </div>
                    {exp.current && (
                      <div className="ml-auto flex-shrink-0">
                        <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30 font-mono">
                          {language === 'fr' ? 'Actuel' : 'Current'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
                  <div className="break-words">
                    <span className="text-syntax-property"><EditableText value="position" editKey="experience.prop.position" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={exp.position} editKey={`experience.${expIndex}.position`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 break-words">
                    <Calendar className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} opacity-60 flex-shrink-0`} />
                    <span className="text-syntax-property"><EditableText value="period" editKey="experience.prop.period" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={exp.period} editKey={`experience.${expIndex}.period`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 break-words">
                    <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} opacity-60 flex-shrink-0`} />
                    <span className="text-syntax-property"><EditableText value="location" editKey="experience.prop.location" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={exp.location} editKey={`experience.${expIndex}.location`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="technologies" editKey="experience.prop.technologies" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {exp.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-center gap-2 min-w-0">
                        <span className="text-syntax-keyword">new</span>{' '}
                        {tech.skillId ? (
                          <ItemTooltip
                            itemName={tech.name}
                            description={tech.description}
                            details={tech.details}
                            type="class"
                            onClick={() => {
                              setTargetSkillId(tech.skillId!);
                              window.dispatchEvent(new Event('navigate-to-skill'));
                            }}
                          >
                            <span className={`text-syntax-class ${exp.color}`}>
                              <EditableText value={tech.name} editKey={`experience.${expIndex}.tech.${idx}.name`} />
                            </span>
                          </ItemTooltip>
                        ) : (
                          <span className={`text-syntax-class ${exp.color}`}>
                            <EditableText value={tech.name} editKey={`experience.${expIndex}.tech.${idx}.name`} />
                          </span>
                        )}
                        <span className="text-syntax-punctuation">()</span>
                        {idx < exp.technologies.length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-syntax-punctuation">];</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="responsibilities" editKey="experience.prop.responsibilities" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {exp.responsibilities[language].map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Target className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"<EditableText value={resp} editKey={`experience.${expIndex}.resp.${language}.${idx}`} />"</span>
                        {idx < exp.responsibilities[language].length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-syntax-punctuation">];</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="achievements" editKey="experience.prop.achievements" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {exp.achievements[language].map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Award className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"<EditableText value={achievement} editKey={`experience.${expIndex}.ach.${language}.${idx}`} />"</span>
                        {idx < exp.achievements[language].length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-syntax-punctuation">];</span>
                  </div>
                </div>
                <div className="font-mono text-sm md:text-base mt-3">
                  <span className="text-syntax-punctuation">{'}'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}