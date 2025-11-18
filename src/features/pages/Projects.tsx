import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  ShoppingCart, 
  CheckSquare, 
  Cloud, 
  BarChart3, 
  FileText,
  Zap,
  Database,
  Globe,
  Rocket,
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useNavigation } from '../../shared/contexts/NavigationContext';
import { useEffect, useRef } from 'react';
import { ItemTooltip } from '../../shared/components/ItemTooltip';
import { ImagePreviewTooltip } from '../../shared/components/ImagePreviewTooltip';

export function Projects() {
  const { t } = useLanguage();
  const { targetProjectId, setTargetProjectId, setCurrentPage } = useNavigation();
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const projects = [
    {
      id: 'portfolio',
      title: 'PortfolioIDE',
      icon: Code2,
      color: 'text-purple-400',
      borderColor: 'border-purple-400',
      description: 'Interactive portfolio inspired by VS Code with integrated terminal and custom themes',
      repository: 'https://github.com/yourusername/portfolio-ide',
      technologies: [
        { 
          name: 'React', 
          skillId: 'react',
          description: 'Modern UI library for building interactive interfaces',
          details: 'Used for: Component architecture, State management, Hooks'
        },
        { 
          name: 'TypeScript', 
          skillId: 'typescript',
          description: 'Typed superset of JavaScript for robust applications',
          details: 'Used for: Type safety, Better IDE support, Reduced bugs'
        },
        { 
          name: 'TailwindCSS', 
          skillId: 'tailwind',
          description: 'Utility-first CSS framework for rapid UI development',
          details: 'Used for: Styling, Theme system, Responsive design'
        },
        { 
          name: 'Motion', 
          skillId: null,
          description: 'Animation library for React',
          details: 'Used for: Page transitions, Hover effects, Smooth animations'
        },
      ],
      features: [
        'Multi-theme system (Dark, Light, Steampunk)',
        'Interactive terminal with custom commands',
        'File explorer navigation',
        'Responsive design with mobile support'
      ],
      previews: [
        { label: 'Main Interface', imageUrl: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGFyayUyMHRoZW1lfGVufDF8fHx8MTc2MzQxMTUyMnww&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Terminal View', imageUrl: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGFyayUyMHRoZW1lfGVufDF8fHx8MTc2MzQxMTUyMnww&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Steampunk Theme', imageUrl: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGFyayUyMHRoZW1lfGVufDF8fHx8MTc2MzQxMTUyMnww&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      status: 'Production',
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    {
      id: 'ecommerce',
      title: 'ECommercePlatform',
      icon: ShoppingCart,
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      description: 'Full-featured e-commerce platform with secure payment and inventory management',
      repository: 'https://github.com/yourusername/ecommerce-platform',
      technologies: [
        { 
          name: 'NextJS', 
          skillId: 'nextjs',
          description: 'React framework for production-ready applications',
          details: 'Used for: SSR/SSG, API Routes, File-based routing'
        },
        { 
          name: 'PostgreSQL', 
          skillId: 'postgresql',
          description: 'Powerful open-source relational database',
          details: 'Used for: Data persistence, Complex queries, ACID compliance'
        },
        { 
          name: 'Prisma', 
          skillId: 'prisma',
          description: 'Next-generation ORM for type-safe database access',
          details: 'Used for: Database migrations, Type-safe queries, Schema management'
        },
        { 
          name: 'Stripe', 
          skillId: null,
          description: 'Payment processing platform',
          details: 'Used for: Payment gateway, Subscription management, Secure transactions'
        },
      ],
      features: [
        'Secure payment processing with Stripe',
        'Real-time inventory management',
        'Admin dashboard for analytics',
        'Product search and filtering'
      ],
      previews: [
        { label: 'Product Grid', imageUrl: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMGNhcnR8ZW58MXx8fHwxNzYzNDExNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Checkout Flow', imageUrl: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMGNhcnR8ZW58MXx8fHwxNzYzNDExNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Admin Dashboard', imageUrl: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMGNhcnR8ZW58MXx8fHwxNzYzNDExNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      status: 'Production',
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    {
      id: 'taskmanager',
      title: 'TaskManagerPro',
      icon: CheckSquare,
      color: 'text-green-400',
      borderColor: 'border-green-400',
      description: 'Collaborative task management app with real-time synchronization',
      repository: 'https://github.com/yourusername/task-manager-pro',
      technologies: [
        { 
          name: 'React', 
          skillId: 'react',
          description: 'Modern UI library for building interactive interfaces',
          details: 'Used for: Real-time UI updates, Component composition, Hooks'
        },
        { 
          name: 'NodeJS', 
          skillId: 'nodejs',
          description: 'JavaScript runtime for scalable server applications',
          details: 'Used for: Backend API, WebSocket server, Authentication'
        },
        { 
          name: 'MongoDB', 
          skillId: 'mongodb',
          description: 'NoSQL database for flexible data models',
          details: 'Used for: Document storage, Fast queries, Scalability'
        },
        { 
          name: 'SocketIO', 
          skillId: null,
          description: 'Real-time bidirectional event-based communication',
          details: 'Used for: Live updates, Collaboration, Notifications'
        },
      ],
      features: [
        'Real-time collaboration with Socket.io',
        'Task assignment and tracking',
        'Team workspace management',
        'Notifications and reminders'
      ],
      previews: [
        { label: 'Task Board', imageUrl: 'https://images.unsplash.com/photo-1629819126368-d85e9138d2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjM0MTE1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Calendar View', imageUrl: 'https://images.unsplash.com/photo-1629819126368-d85e9138d2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjM0MTE1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      status: 'Development',
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    {
      id: 'weather',
      title: 'WeatherDashboard',
      icon: Cloud,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-400',
      description: 'Weather dashboard with data visualizations and detailed forecasts',
      repository: undefined,
      technologies: [
        { 
          name: 'React', 
          skillId: 'react',
          description: 'Modern UI library for building interactive interfaces',
          details: 'Used for: Dynamic charts, Data visualization, Responsive UI'
        },
        { 
          name: 'D3JS', 
          skillId: null,
          description: 'Data visualization library',
          details: 'Used for: Custom charts, Interactive maps, Data-driven graphics'
        },
        { 
          name: 'Recharts', 
          skillId: null,
          description: 'Composable charting library built on React',
          details: 'Used for: Line charts, Bar charts, Area charts'
        },
      ],
      features: [
        'Interactive weather maps',
        '7-day forecast with hourly details',
        'Historical data analysis',
        'Location-based weather alerts'
      ],
      previews: [
        { label: 'Main Dashboard', imageUrl: 'https://images.unsplash.com/photo-1705077031869-51b60754302a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwZm9yZWNhc3QlMjBhcHB8ZW58MXx8fHwxNzYzNDExNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Forecast View', imageUrl: 'https://images.unsplash.com/photo-1705077031869-51b60754302a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwZm9yZWNhc3QlMjBhcHB8ZW58MXx8fHwxNzYzNDExNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      status: 'Production',
      github: undefined,
      demo: 'https://example.com',
    },
    {
      id: 'analytics',
      title: 'SocialMediaAnalytics',
      icon: BarChart3,
      color: 'text-pink-400',
      borderColor: 'border-pink-400',
      description: 'Social media analysis tool with detailed reports and visualizations',
      repository: 'https://github.com/yourusername/social-analytics',
      technologies: [
        { 
          name: 'VueJS', 
          skillId: null,
          description: 'Progressive JavaScript framework',
          details: 'Used for: Reactive UI, Component system, State management'
        },
        { 
          name: 'Express', 
          skillId: 'express',
          description: 'Fast, minimalist web framework for Node.js',
          details: 'Used for: REST API, Middleware, Request handling'
        },
        { 
          name: 'Redis', 
          skillId: 'redis',
          description: 'In-memory data structure store for caching',
          details: 'Used for: Session storage, Cache layer, Real-time analytics'
        },
      ],
      features: [
        'Multi-platform analytics integration',
        'Custom report generation',
        'Engagement metrics tracking',
        'Scheduled data exports'
      ],
      previews: [
        { label: 'Analytics Overview', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzYzMzcyODE4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Reports', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzYzMzcyODE4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      status: 'Production',
      github: undefined,
      demo: undefined,
    },
    {
      id: 'cms',
      title: 'BlogCMS',
      icon: FileText,
      color: 'text-orange-400',
      borderColor: 'border-orange-400',
      description: 'Content management system for blogs with Markdown editor and SEO optimization',
      repository: 'https://github.com/yourusername/blog-cms',
      technologies: [
        { 
          name: 'NextJS', 
          skillId: 'nextjs',
          description: 'React framework for production-ready applications',
          details: 'Used for: Static generation, SEO optimization, Image optimization'
        },
        { 
          name: 'MDX', 
          skillId: null,
          description: 'Markdown for the component era',
          details: 'Used for: Content authoring, Component embedding, Rich formatting'
        },
        { 
          name: 'TailwindCSS', 
          skillId: 'tailwind',
          description: 'Utility-first CSS framework for rapid UI development',
          details: 'Used for: Custom themes, Responsive design, Typography'
        },
      ],
      features: [
        'Markdown editor with live preview',
        'SEO optimization tools',
        'Custom taxonomy and tagging',
        'Static site generation'
      ],
      previews: [
        { label: 'Editor Interface', imageUrl: 'https://images.unsplash.com/photo-1762939079730-23708c0dd337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwY21zJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MzQxMTUyNHww&ixlib=rb-4.1.0&q=80&w=1080' },
        { label: 'Blog Preview', imageUrl: 'https://images.unsplash.com/photo-1762939079730-23708c0dd337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwY21zJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MzQxMTUyNHww&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      status: 'Production',
      github: 'https://github.com',
      demo: 'https://example.com',
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
          <span className="text-syntax-comment">{'// '}</span>
          <span className="text-syntax-comment">{t('projects.title')}</span>
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
              case 'ecommerce':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400';
                break;
              case 'taskmanager':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-green-400 hover:border-green-400';
                break;
              case 'weather':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-cyan-400 hover:border-cyan-400';
                break;
              case 'analytics':
                borderClasses = 'border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-pink-400 hover:border-pink-400';
                break;
              case 'cms':
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
                        {project.title}
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
                    <span className="text-syntax-property">status</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{project.status}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  {project.repository && (
                    <div className="flex items-center gap-2">
                      <span className="text-syntax-property">repository</span>
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
                    <span className="text-syntax-property">technologies</span>
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
                              setCurrentPage('skills');
                            }}
                          >
                            <span className={`text-syntax-class ${project.color}`}>
                              {tech.name}
                            </span>
                          </ItemTooltip>
                        ) : (
                          <span className={`text-syntax-class ${project.color}`}>
                            {tech.name}
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
                    <span className="text-syntax-property">features</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Rocket className={`w-3 h-3 md:w-4 md:h-4 ${project.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"{feature}"</span>
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
                    <span className="text-syntax-property">previews</span>
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