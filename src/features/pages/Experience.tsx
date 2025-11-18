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

export function Experience() {
  const { t, language } = useLanguage();
  const { targetExperienceId, setTargetExperienceId, setCurrentPage } = useNavigation();
  const experienceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const experiences = [
    {
      id: 'exp1',
      company: 'TechCompany',
      position: 'Senior Full Stack Developer',
      icon: Code2,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
      period: '2021 - Present',
      location: 'Paris, France',
      description: {
        fr: 'Direction technique et développement d\'applications web complexes',
        en: 'Technical leadership and development of complex web applications'
      },
      current: true,
      technologies: [
        { 
          name: 'NodeJS', 
          skillId: 'nodejs',
          description: 'JavaScript runtime for scalable server applications',
          details: 'Used for: Backend API, Microservices, Real-time features'
        },
        { 
          name: 'PostgreSQL', 
          skillId: 'postgresql',
          description: 'Powerful open-source relational database',
          details: 'Used for: Data persistence, Complex queries, ACID compliance'
        },
        { 
          name: 'Docker', 
          skillId: 'docker',
          description: 'Containerization platform for deployment',
          details: 'Used for: Development environment, CI/CD, Production deployment'
        },
        { 
          name: 'React', 
          skillId: 'react',
          description: 'Modern UI library for building interactive interfaces',
          details: 'Used for: Component architecture, State management, Complex UIs'
        },
        { 
          name: 'TypeScript', 
          skillId: 'typescript',
          description: 'Typed superset of JavaScript for robust applications',
          details: 'Used for: Type safety, Better IDE support, Reduced bugs'
        },
      ],
      responsibilities: {
        fr: [
          'Architecture de systèmes scalables et maintenables',
          'Mentorat technique d\'une équipe de 5 développeurs',
          'Optimisation des performances et de la qualité du code',
          'Mise en place de pipelines CI/CD et automatisation'
        ],
        en: [
          'Architecture of scalable and maintainable systems',
          'Technical mentoring of a team of 5 developers',
          'Performance optimization and code quality',
          'Implementation of CI/CD pipelines and automation'
        ]
      },
      achievements: {
        fr: [
          'Réduction de 40% du temps de chargement des pages',
          'Migration complète vers TypeScript avec zéro régression',
          'Amélioration de 60% de la couverture de tests'
        ],
        en: [
          '40% reduction in page load time',
          'Complete migration to TypeScript with zero regression',
          '60% improvement in test coverage'
        ]
      }
    },
    {
      id: 'exp2',
      company: 'StartupInnovante',
      position: 'Full Stack Developer',
      icon: Rocket,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      period: '2019 - 2021',
      location: 'Lyon, France',
      description: {
        fr: 'Développement de solutions web innovantes et APIs RESTful',
        en: 'Development of innovative web solutions and RESTful APIs'
      },
      current: false,
      technologies: [
        { 
          name: 'NodeJS', 
          skillId: 'nodejs',
          description: 'JavaScript runtime for scalable server applications',
          details: 'Used for: REST API, Authentication, Business logic'
        },
        { 
          name: 'MongoDB', 
          skillId: 'mongodb',
          description: 'NoSQL database for flexible data models',
          details: 'Used for: Document storage, Fast queries, Scalability'
        },
        { 
          name: 'Express', 
          skillId: 'express',
          description: 'Fast, minimalist web framework for Node.js',
          details: 'Used for: REST API, Middleware, Request handling'
        },
        { 
          name: 'AWS', 
          skillId: null,
          description: 'Cloud computing platform',
          details: 'Used for: Hosting, Storage, CDN, Serverless functions'
        },
        { 
          name: 'React', 
          skillId: 'react',
          description: 'Modern UI library for building interactive interfaces',
          details: 'Used for: SPA development, Component architecture, State management'
        },
      ],
      responsibilities: {
        fr: [
          'Développement full-stack de fonctionnalités end-to-end',
          'Création d\'APIs RESTful scalables et documentées',
          'Intégration de services tiers et APIs externes',
          'Optimisation des requêtes et performances backend'
        ],
        en: [
          'Full-stack development of end-to-end features',
          'Creation of scalable and documented RESTful APIs',
          'Integration of third-party services and external APIs',
          'Query optimization and backend performance'
        ]
      },
      achievements: {
        fr: [
          'Développement de 3 produits MVP en moins de 6 mois',
          'Mise en place d\'une architecture microservices',
          'Contribution à l\'augmentation de 200% des utilisateurs actifs'
        ],
        en: [
          'Development of 3 MVP products in less than 6 months',
          'Implementation of microservices architecture',
          'Contribution to 200% increase in active users'
        ]
      }
    },
    {
      id: 'exp3',
      company: 'AgenceWeb',
      position: 'Développeur Frontend',
      icon: Building2,
      color: 'text-green-400',
      borderColor: 'border-green-400',
      period: '2017 - 2019',
      location: 'Paris, France',
      description: {
        fr: 'Création d\'interfaces utilisateur responsive et accessibles',
        en: 'Creation of responsive and accessible user interfaces'
      },
      current: false,
      technologies: [
        { 
          name: 'JavaScript', 
          skillId: null,
          description: 'Programming language for the web',
          details: 'Used for: DOM manipulation, Event handling, Async operations'
        },
        { 
          name: 'VueJS', 
          skillId: null,
          description: 'Progressive JavaScript framework',
          details: 'Used for: Reactive UI, Component system, State management'
        },
        { 
          name: 'HTML5', 
          skillId: null,
          description: 'Markup language for structuring web content',
          details: 'Used for: Semantic HTML, Accessibility, SEO'
        },
        { 
          name: 'CSS3', 
          skillId: null,
          description: 'Styling language for web pages',
          details: 'Used for: Layouts, Animations, Responsive design'
        },
        { 
          name: 'SASS', 
          skillId: null,
          description: 'CSS preprocessor for better styling',
          details: 'Used for: Variables, Mixins, Nested rules'
        },
      ],
      responsibilities: {
        fr: [
          'Intégration de maquettes UI/UX avec pixel-perfect',
          'Développement de composants réutilisables et modulaires',
          'Collaboration étroite avec l\'équipe design',
          'Assurer la compatibilité cross-browser et responsive'
        ],
        en: [
          'Pixel-perfect UI/UX mockup integration',
          'Development of reusable and modular components',
          'Close collaboration with design team',
          'Ensure cross-browser and responsive compatibility'
        ]
      },
      achievements: {
        fr: [
          'Livraison de plus de 20 projets client avec succès',
          'Création d\'une bibliothèque de composants réutilisables',
          'Amélioration du score d\'accessibilité moyen de 85% à 98%'
        ],
        en: [
          'Successful delivery of over 20 client projects',
          'Creation of a reusable component library',
          'Improvement of average accessibility score from 85% to 98%'
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
          <span className="text-syntax-comment">{'// '}</span>
          <span className="text-syntax-comment">{t('experience.title')}</span>
        </motion.div>
        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, expIndex) => {
            const Icon = exp.icon;
            const isTargeted = exp.id === targetExperienceId;

            let borderClasses = '';
            switch (exp.id) {
              case 'exp1':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-purple-400 hover:border-purple-400';
                break;
              case 'exp2':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400';
                break;
              case 'exp3':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-green-400 hover:border-green-400';
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
                        {exp.company}
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
                    <span className="text-syntax-property">position</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{exp.position}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 break-words">
                    <Calendar className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} opacity-60 flex-shrink-0`} />
                    <span className="text-syntax-property">period</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{exp.period}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 break-words">
                    <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} opacity-60 flex-shrink-0`} />
                    <span className="text-syntax-property">location</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{exp.location}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div>
                    <span className="text-syntax-property">technologies</span>
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
                              setCurrentPage('skills');
                            }}
                          >
                            <span className={`text-syntax-class ${exp.color}`}>
                              {tech.name}
                            </span>
                          </ItemTooltip>
                        ) : (
                          <span className={`text-syntax-class ${exp.color}`}>
                            {tech.name}
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
                    <span className="text-syntax-property">responsibilities</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {exp.responsibilities[language].map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Target className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"{resp}"</span>
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
                    <span className="text-syntax-property">achievements</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {exp.achievements[language].map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Award className={`w-3 h-3 md:w-4 md:h-4 ${exp.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"{achievement}"</span>
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