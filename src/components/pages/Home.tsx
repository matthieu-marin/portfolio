import { motion } from 'motion/react';
import { 
  User, 
  Code2, 
  Briefcase, 
  Rocket,
  Github, 
  Linkedin, 
  Mail, 
  Download,
  Terminal,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function Home() {
  const { t, language } = useLanguage();

  const profileData = {
    id: 'profile',
    title: 'FullStackDeveloper',
    icon: Code2,
    color: 'text-purple-400',
    borderColor: 'border-purple-400',
    name: 'Votre Nom',
    role: 'Full Stack Developer',
    tagline: {
      fr: 'Créateur d\'expériences web modernes et performantes',
      en: 'Creator of modern and performant web experiences'
    },
    bio: {
      fr: 'Passionné par le développement web, je transforme des idées en applications élégantes et fonctionnelles. Spécialisé en React, TypeScript et Node.js.',
      en: 'Passionate about web development, I transform ideas into elegant and functional applications. Specialized in React, TypeScript and Node.js.'
    },
    stats: [
      { label: { fr: 'Années d\'expérience', en: 'Years of experience' }, value: '5+' },
      { label: { fr: 'Projets réalisés', en: 'Completed projects' }, value: '30+' },
      { label: { fr: 'Technologies maîtrisées', en: 'Technologies mastered' }, value: '15+' }
    ],
    socialLinks: [
      { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'text-purple-400' },
      { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'text-blue-400' },
      { icon: Mail, label: 'Email', href: 'mailto:contact@example.com', color: 'text-green-400' }
    ]
  };

  const expertiseData = {
    id: 'expertise',
    title: 'CoreExpertise',
    icon: Sparkles,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-400',
    areas: {
      fr: [
        'Architecture d\'applications web scalables',
        'Développement d\'interfaces utilisateur modernes',
        'APIs RESTful et microservices',
        'Optimisation des performances',
        'Tests unitaires et intégration continue',
        'Mentorat et revue de code'
      ],
      en: [
        'Scalable web application architecture',
        'Modern user interface development',
        'RESTful APIs and microservices',
        'Performance optimization',
        'Unit testing and continuous integration',
        'Mentoring and code review'
      ]
    }
  };

  const approachData = {
    id: 'approach',
    title: 'WorkApproach',
    icon: Terminal,
    color: 'text-pink-400',
    borderColor: 'border-pink-400',
    principles: {
      fr: [
        'Code propre et maintenable',
        'Design patterns et best practices',
        'Collaboration en équipe agile',
        'Apprentissage et amélioration continue',
        'Focus sur l\'expérience utilisateur',
        'Documentation claire et complète'
      ],
      en: [
        'Clean and maintainable code',
        'Design patterns and best practices',
        'Agile team collaboration',
        'Continuous learning and improvement',
        'Focus on user experience',
        'Clear and complete documentation'
      ]
    }
  };

  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        {/* Header comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base"
        >
          <span className="text-syntax-comment">{'// '}</span>
          <span className="text-syntax-comment">Portfolio.tsx</span>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-purple-400 hover:border-purple-400 transition-all duration-300 overflow-hidden"
        >
          {/* Class declaration */}
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 md:w-6 md:h-6 ${profileData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${profileData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  {profileData.title}
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
            <div className="ml-6 md:ml-10 text-syntax-comment text-xs md:text-sm break-words">
              // {profileData.tagline[language]}
            </div>
          </div>

          {/* Properties */}
          <div className="ml-4 md:ml-8 space-y-4 font-mono text-sm md:text-base overflow-hidden">
            
            {/* Property: name */}
            <div className="break-words">
              <span className="text-syntax-property">name</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"{profileData.name}"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>

            {/* Property: role */}
            <div className="break-words">
              <span className="text-syntax-property">role</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"{profileData.role}"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>

            {/* Property: bio */}
            <div className="break-words">
              <span className="text-syntax-property">bio</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">
                "{profileData.bio[language]}"
              </span>
              <span className="text-syntax-punctuation">;</span>
            </div>

            {/* Property: stats */}
            <div>
              <span className="text-syntax-property">stats</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">{'{'}</span>
            </div>
            <div className="ml-4 space-y-2">
              {profileData.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 min-w-0">
                  <Sparkles className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} flex-shrink-0`} />
                  <span className="text-syntax-property break-words">{stat.label[language]}</span>
                  <span className="text-syntax-punctuation">:</span>{' '}
                  <span className={`${profileData.color}`}>{stat.value}</span>
                  {idx < profileData.stats.length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div>
              <span className="text-syntax-punctuation">{'}'};</span>
            </div>

            {/* Property: social links */}
            <div>
              <span className="text-syntax-property">connect</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 flex flex-wrap gap-3 mt-2">
              {profileData.socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 md:p-3 bg-background hover:bg-hover rounded-lg transition-colors border-2 ${social.color}`}
                    title={social.label}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                );
              })}
              <button 
                className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-background hover:bg-hover rounded-lg transition-colors text-sm border-2 border-accent"
                aria-label="Download CV"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                <span>CV</span>
              </button>
            </div>
            <div>
              <span className="text-syntax-punctuation">];</span>
            </div>
          </div>

          {/* Close class */}
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-cyan-400 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
        >
          {/* Class declaration */}
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className={`w-5 h-5 md:w-6 md:h-6 ${expertiseData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${expertiseData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  {expertiseData.title}
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
            <div className="ml-6 md:ml-10 text-syntax-comment text-xs md:text-sm break-words">
              // {language === 'fr' ? 'Domaines d\'expertise et compétences principales' : 'Areas of expertise and core skills'}
            </div>
          </div>

          {/* Properties */}
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            
            {/* Property: areas */}
            <div>
              <span className="text-syntax-property">areas</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {expertiseData.areas[language].map((area, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  <Code2 className={`w-3 h-3 md:w-4 md:h-4 ${expertiseData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string break-words">"{area}"</span>
                  {idx < expertiseData.areas[language].length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div>
              <span className="text-syntax-punctuation">];</span>
            </div>
          </div>

          {/* Close class */}
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>

        {/* Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-pink-400 hover:border-pink-400 transition-all duration-300 overflow-hidden"
        >
          {/* Class declaration */}
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <Terminal className={`w-5 h-5 md:w-6 md:h-6 ${approachData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${approachData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  {approachData.title}
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
            <div className="ml-6 md:ml-10 text-syntax-comment text-xs md:text-sm break-words">
              // {language === 'fr' ? 'Philosophie et approche de travail' : 'Philosophy and work approach'}
            </div>
          </div>

          {/* Properties */}
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            
            {/* Property: principles */}
            <div>
              <span className="text-syntax-property">principles</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {approachData.principles[language].map((principle, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  <Rocket className={`w-3 h-3 md:w-4 md:h-4 ${approachData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string break-words">"{principle}"</span>
                  {idx < approachData.principles[language].length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div>
              <span className="text-syntax-punctuation">];</span>
            </div>
          </div>

          {/* Close class */}
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>

        {/* Closing comment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-syntax-comment text-xs md:text-sm pt-4"
        >
          <div>{'// export default FullStackDeveloper;'}</div>
        </motion.div>
      </div>
    </div>
  );
}