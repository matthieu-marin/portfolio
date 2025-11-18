import { motion } from 'motion/react';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench,
  Boxes,
  FileCode2,
  Braces,
  Palette,
  Code,
  Terminal,
  Package,
  GitBranch,
  Container,
  FileJson,
  Zap,
  TestTube2
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { SkillDocumentation } from '../../shared/components/SkillDocumentation';
import { ItemTooltip } from '../../shared/components/ItemTooltip';

const skillIdMap: Record<string, { category: string; skillName: string }> = {
  'react': { category: 'Frontend', skillName: 'React' },
  'typescript': { category: 'Frontend', skillName: 'TypeScript' },
  'nodejs': { category: 'Backend', skillName: 'Node.js' },
  'tailwind': { category: 'Frontend', skillName: 'Tailwind CSS' },
};

export function Skills() {
  const { t, language } = useLanguage();
  const { targetSkillId, setTargetSkillId, setCurrentPage } = useNavigation();
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
          id: 'nodejs',
          name: 'Node.js',
          icon: Terminal,
          level: 'Expert',
          description: 'JavaScript runtime for scalable server applications',
          acquiredFrom: [
            { type: 'project', id: 'api', name: 'RESTAPIProject', displayName: 'REST API Project', description: 'RESTful API with authentication and database integration' },
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' }
          ]
        },
        { 
          id: 'express',
          name: 'Express',
          icon: Zap,
          level: 'Advanced',
          description: 'Fast, minimalist web framework for Node.js',
          acquiredFrom: [
            { type: 'project', id: 'api', name: 'RESTAPIProject', displayName: 'REST API Project', description: 'RESTful API with authentication and database integration' }
          ]
        },
        { 
          id: 'python',
          name: 'Python',
          icon: Code,
          level: 'Intermediate',
          description: 'Versatile language for backend and data processing',
          acquiredFrom: [
            { type: 'project', id: 'automation', name: 'AutomationScripts', displayName: 'Automation Scripts', description: 'Python scripts for task automation and data processing' }
          ]
        },
        { 
          id: 'graphql',
          name: 'GraphQL',
          icon: FileJson,
          level: 'Advanced',
          description: 'Query language for flexible API development',
          acquiredFrom: [
            { type: 'project', id: 'ecommerce', name: 'ECommercePlatform', displayName: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with TypeScript' }
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
          id: 'react',
          name: 'React',
          icon: Boxes,
          level: 'Expert',
          description: 'Modern UI library for building interactive interfaces',
          acquiredFrom: [
            { type: 'project', id: 'portfolio', name: 'PortfolioProject', displayName: 'Portfolio Project', description: 'Personal portfolio showcasing projects and skills' },
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' }
          ]
        },
        { 
          id: 'typescript',
          name: 'TypeScript',
          icon: FileCode2,
          level: 'Advanced',
          description: 'Typed superset of JavaScript for robust applications',
          acquiredFrom: [
            { type: 'project', id: 'ecommerce', name: 'ECommercePlatform', displayName: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with TypeScript' },
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' }
          ]
        },
        { 
          id: 'nextjs',
          name: 'Next.js',
          icon: Zap,
          level: 'Advanced',
          description: 'React framework for production-ready applications',
          acquiredFrom: [
            { type: 'project', id: 'portfolio', name: 'PortfolioProject', displayName: 'Portfolio Project', description: 'Personal portfolio showcasing projects and skills' }
          ]
        },
        { 
          id: 'tailwind',
          name: 'Tailwind CSS',
          icon: Palette,
          level: 'Expert',
          description: 'Utility-first CSS framework for rapid UI development',
          acquiredFrom: [
            { type: 'project', id: 'portfolio', name: 'PortfolioProject', displayName: 'Portfolio Project', description: 'Personal portfolio showcasing projects and skills' },
            { type: 'project', id: 'dashboard', name: 'AdminDashboard', displayName: 'Admin Dashboard', description: 'Modern admin dashboard with real-time analytics' }
          ]
        },
        { 
          id: 'javascript',
          name: 'JavaScript',
          icon: Braces,
          level: 'Expert',
          description: 'Core programming language for web development',
          acquiredFrom: [
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' },
            { type: 'experience', id: 'exp2', name: 'StartupB', displayName: 'Startup B', description: 'Frontend Developer at a fast-growing startup' }
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
          id: 'postgresql',
          name: 'PostgreSQL',
          icon: Database,
          level: 'Advanced',
          description: 'Powerful open-source relational database',
          acquiredFrom: [
            { type: 'project', id: 'ecommerce', name: 'ECommercePlatform', displayName: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with TypeScript' },
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' }
          ]
        },
        { 
          id: 'mongodb',
          name: 'MongoDB',
          icon: Database,
          level: 'Advanced',
          description: 'NoSQL database for flexible data models',
          acquiredFrom: [
            { type: 'project', id: 'social', name: 'SocialMediaApp', displayName: 'Social Media App', description: 'Real-time social platform with chat and notifications' }
          ]
        },
        { 
          id: 'redis',
          name: 'Redis',
          icon: Zap,
          level: 'Intermediate',
          description: 'In-memory data structure store for caching',
          acquiredFrom: [
            { type: 'project', id: 'api', name: 'RESTAPIProject', displayName: 'REST API Project', description: 'RESTful API with authentication and database integration' }
          ]
        },
        { 
          id: 'prisma',
          name: 'Prisma',
          icon: Package,
          level: 'Advanced',
          description: 'Next-generation ORM for type-safe database access',
          acquiredFrom: [
            { type: 'project', id: 'ecommerce', name: 'ECommercePlatform', displayName: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with TypeScript' }
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
          level: 'Expert',
          description: 'Distributed version control system',
          acquiredFrom: [
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' },
            { type: 'experience', id: 'exp2', name: 'StartupB', displayName: 'Startup B', description: 'Frontend Developer at a fast-growing startup' }
          ]
        },
        { 
          id: 'docker',
          name: 'Docker',
          icon: Container,
          level: 'Intermediate',
          description: 'Platform for containerizing applications',
          acquiredFrom: [
            { type: 'project', id: 'devops', name: 'DevOpsPipeline', displayName: 'DevOps Pipeline', description: 'CI/CD pipeline with Docker and Kubernetes' }
          ]
        },
        { 
          id: 'vscode',
          name: 'VS Code',
          icon: Code2,
          level: 'Expert',
          description: 'Feature-rich code editor',
          acquiredFrom: [
            { type: 'experience', id: 'exp1', name: 'CompanyA', displayName: 'Company A', description: 'Web Developer position focusing on React applications' }
          ]
        },
        { 
          id: 'vite',
          name: 'Vite',
          icon: Zap,
          level: 'Advanced',
          description: 'Next-generation frontend build tool',
          acquiredFrom: [
            { type: 'project', id: 'portfolio', name: 'PortfolioProject', displayName: 'Portfolio Project', description: 'Personal portfolio showcasing projects and skills' }
          ]
        },
        { 
          id: 'jest',
          name: 'Jest',
          icon: TestTube2,
          level: 'Advanced',
          description: 'Delightful JavaScript testing framework',
          acquiredFrom: [
            { type: 'project', id: 'testing', name: 'TestingSuite', displayName: 'Testing Suite', description: 'Comprehensive testing setup with unit and integration tests' }
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
          <span className="text-syntax-comment">{'// '}</span>
          <span className="text-syntax-comment">{t('skills.title')}</span>
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
                        {skillInterface.name}
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
                            {skill.name}
                          </span>
                          {' '}
                          <span className="text-syntax-punctuation">{'{'}</span>
                        </div>
                        <div className="ml-4 md:ml-6 space-y-1">
                          <div>
                            <span className="text-syntax-property">level</span>
                            <span className="text-syntax-punctuation">:</span>{' '}
                            <span className="text-syntax-string">"{skill.level}"</span>
                            <span className="text-syntax-punctuation">;</span>
                          </div>
                          <div>
                            <span className="text-syntax-property">acquiredFrom</span>
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
                                      setCurrentPage('projects');
                                    } else {
                                      setCurrentPage('experience');
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