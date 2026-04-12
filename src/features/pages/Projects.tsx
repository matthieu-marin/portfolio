import { motion } from 'motion/react';
import {
  ExternalLink,
  Github,
  Code2,
  Rocket,
  Cat,
  Radio,
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { ImagePreviewTooltip } from '../../shared/components/ImagePreviewTooltip';
import { EditableText } from '../../shared/components/EditableText';

export function Projects() {
  const { t } = useLanguage();
  const { targetProjectId, setTargetProjectId, setTargetSkillId } = useNavigation();
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Projets réels dérivés de info.md (1 projet perso + 2 issus de stages).
  // TODO github URL: l'URL GitHub n'est pas fournie dans info.md — les liens "github" sont laissés à undefined.
  const projects = [
    {
      id: 'portfolio',
      title: 'PortfolioIDE',
      icon: Code2,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
      description: 'Portfolio interactif inspiré de VS Code avec terminal intégré et thèmes personnalisés',
      repository: undefined,
      technologies: [
        {
          name: 'React',
          skillId: 'react',
          description: 'Bibliothèque UI moderne pour interfaces interactives',
          details: 'Utilisé pour : architecture composants, hooks, gestion d\'état'
        },
        {
          name: 'TypeScript',
          skillId: null,
          description: 'Superset typé de JavaScript',
          details: 'Utilisé pour : sûreté de type, autocomplétion IDE, refactor sereins'
        },
        {
          name: 'TailwindCSS',
          skillId: null,
          description: 'Framework CSS utility-first',
          details: 'Utilisé pour : styling, système de thèmes, responsive'
        },
        {
          name: 'Motion',
          skillId: null,
          description: 'Bibliothèque d\'animation pour React',
          details: 'Utilisé pour : transitions de pages, effets au survol'
        },
      ],
      features: [
        'Système multi-thèmes (Dark, Light, Steampunk, Cyberpunk, Synthwave, Galaxy, Nord, Pixel)',
        'Terminal interactif avec commandes Unix simulées',
        'Navigation par explorateur de fichiers',
        'Bilingue (FR/EN) et responsive mobile'
      ],
      previews: [
        { label: 'Interface principale', imageUrl: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80' },
      ],
      status: 'Production',
      github: undefined,
      demo: undefined,
    },
    {
      id: 'iot-territoire',
      title: 'TerritoireConnecteDurable',
      icon: Radio,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      description: 'Plateforme web IoT pour la gestion de données capteurs, développée chez Faubourg Numérique en collaboration avec La Somme Numérique',
      repository: undefined,
      technologies: [
        {
          name: 'NodeJS',
          skillId: 'nodejs',
          description: 'Runtime JavaScript serveur',
          details: 'Utilisé pour : ingestion des données capteurs, API REST'
        },
        {
          name: 'VueJS',
          skillId: 'vuejs',
          description: 'Framework JavaScript progressif',
          details: 'Utilisé pour : interface de visualisation des données IoT'
        },
        {
          name: 'MongoDB',
          skillId: 'mongodb',
          description: 'Base NoSQL orientée documents',
          details: 'Utilisé pour : stockage flexible des relevés capteurs'
        },
      ],
      features: [
        'Ingestion de données IoT (capteurs Internet des Objets)',
        'Interface de visualisation des relevés',
        'Collaboration avec La Somme Numérique',
        'Livré dans le cadre d\'un stage de 4 mois'
      ],
      previews: [
        { label: 'Dashboard de visualisation', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80' },
      ],
      status: 'Livré',
      github: undefined,
      demo: undefined,
    },
    {
      id: 'chatterie-vitrine',
      title: 'ChatterieTerreBrascoSite',
      icon: Cat,
      color: 'text-orange-400',
      borderColor: 'border-orange-400',
      description: 'Site vitrine de l\'association Chatterie de la Terre de Brasco, démarré en 2022 et finalisé lors du second stage en 2023',
      repository: undefined,
      technologies: [
        {
          name: 'PHP',
          skillId: 'php',
          description: 'Langage de script côté serveur',
          details: 'Utilisé pour : développement backend du site et templates'
        },
        {
          name: 'WordPress',
          skillId: 'wordpress',
          description: 'CMS open-source',
          details: 'Utilisé pour : gestion de contenu et structure du site vitrine'
        },
      ],
      features: [
        'Site vitrine pour l\'association',
        'Gestion de contenu via WordPress',
        'Premier stage : conception et démarrage du site',
        'Second stage : finalisation et livraison'
      ],
      previews: [
        { label: 'Page d\'accueil', imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80' },
      ],
      status: 'Livré',
      github: undefined,
      demo: undefined,
    },
  ];

  useEffect(() => {
    if (targetProjectId) {
      const currentRef = projectRefs.current[targetProjectId];
      if (currentRef) {
        currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetProjectId]);

  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base"
        >
          <span className="text-syntax-comment">{'// '}<EditableText value={t('projects.title')} editKey="projects.comment" /></span>
        </motion.div>
        <div className="space-y-6 md:space-y-8">
          {projects.map((project, projectIndex) => {
            const Icon = project.icon;
            const isTargeted = project.id === targetProjectId;

            let borderClasses = '';
            switch (project.id) {
              case 'portfolio':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-purple-400 hover:border-purple-400';
                break;
              case 'iot-territoire':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400';
                break;
              case 'chatterie-vitrine':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-orange-400 hover:border-orange-400';
                break;
            }

            return (
              <motion.div
                key={project.id}
                ref={(el) => { projectRefs.current[project.id] = el; }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + projectIndex * 0.1 }}
                className={`group bg-editor/50 rounded-lg p-4 md:p-6 border border-accent/20 ${borderClasses} transition-all duration-300 overflow-hidden ${
                  isTargeted ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="font-mono space-y-2 text-sm md:text-base mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${project.color} flex-shrink-0`} />
                    <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                      <span className="text-syntax-keyword">class</span>{' '}
                      <span className={`text-syntax-class ${project.color} break-words`} style={{ fontSize: '1.1em' }}>
                        <EditableText value={project.title} editKey={`projects.${projectIndex}.title`} />
                      </span>{' '}
                      <span className="text-syntax-punctuation">{'{'}</span>
                    </div>
                    <div className="flex gap-2 ml-auto flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 md:p-2 hover:bg-background rounded transition-colors"
                          title={t('projects.viewCode')}
                          aria-label="View code"
                        >
                          <Github className={`w-3.5 h-3.5 md:w-4 md:h-4 ${project.color}`} />
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
                          <ExternalLink className={`w-3.5 h-3.5 md:w-4 md:h-4 ${project.color}`} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base">
                  <div>
                    <span className="text-syntax-property"><EditableText value="status" editKey="projects.prop.status" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={project.status} editKey={`projects.${projectIndex}.status`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  {project.repository && (
                    <div className="flex items-center gap-2">
                      <span className="text-syntax-property"><EditableText value="repository" editKey="projects.prop.repository" /></span>
                      <span className="text-syntax-punctuation">:</span>{' '}
                      <a 
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-syntax-string hover:underline ${project.color} transition-colors`}
                      >
                        "{project.repository}"
                      </a>
                      <span className="text-syntax-punctuation">;</span>
                    </div>
                  )}
                  <div>
                    <span className="text-syntax-property"><EditableText value="technologies" editKey="projects.prop.technologies" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {project.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-center gap-2">
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
                            <span className={`text-syntax-class ${project.color}`}>
                              <EditableText value={tech.name} editKey={`projects.${projectIndex}.tech.${idx}.name`} />
                            </span>
                          </ItemTooltip>
                        ) : (
                          <span className={`text-syntax-class ${project.color}`}>
                            <EditableText value={tech.name} editKey={`projects.${projectIndex}.tech.${idx}.name`} />
                          </span>
                        )}
                        <span className="text-syntax-punctuation">()</span>
                        {idx < project.technologies.length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-syntax-punctuation">];</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="features" editKey="projects.prop.features" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Rocket className={`w-3 h-3 md:w-4 md:h-4 ${project.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"<EditableText value={feature} editKey={`projects.${projectIndex}.features.${idx}`} />"</span>
                        {idx < project.features.length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-syntax-punctuation">];</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="previews" editKey="projects.prop.previews" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {project.previews.map((preview, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ImageIcon className={`w-3 h-3 md:w-4 md:h-4 ${project.color} mt-0.5 flex-shrink-0 opacity-60`} />
                        <ImagePreviewTooltip
                          label={preview.label}
                          imageUrl={preview.imageUrl}
                        >
                          <span className="text-syntax-string cursor-pointer hover:underline">
                            "{preview.label}"
                          </span>
                        </ImagePreviewTooltip>
                        {idx < project.previews.length - 1 && (
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