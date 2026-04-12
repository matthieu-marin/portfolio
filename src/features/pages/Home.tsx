import { motion } from 'motion/react';
import {
  User,
  Code2,
  Rocket,
  Linkedin,
  Mail,
  Download,
  Terminal,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { EditableText } from '../../shared/components/EditableText';

export function Home() {
  const { t, language } = useLanguage();

  const profileData = {
    id: 'profile',
    title: 'DeveloppeurAlternant',
    icon: Code2,
    color: 'text-purple-400',
    borderColor: 'border-purple-400',
    name: 'Matthieu Marin',
    role: 'Développeur en alternance — Master Cloud Computing & Mobility',
    tagline: {
      fr: 'Alternant chez Renault Digital, étudiant en Master Cloud Computing & Mobility à l\'UPJV/INSSET',
      en: 'Apprentice at Renault Digital, Master Cloud Computing & Mobility student at UPJV/INSSET'
    },
    bio: {
      fr: 'Étudiant en Master Cloud Computing & Mobility (UPJV / INSSET) et alternant chez Renault Digital, je m\'appuie sur quatre expériences en développement web (un stage IoT chez Faubourg Numérique et deux stages PHP/WordPress associatifs) pour construire des applications web utiles et bien testées. Mes terrains de jeu : Java/Spring Boot côté backend, JavaScript/React/Vue côté frontend.',
      en: 'Master Cloud Computing & Mobility student at UPJV / INSSET and apprentice at Renault Digital, drawing on four web-development experiences (an IoT internship at Faubourg Numérique and two PHP/WordPress associative internships) to ship useful, well-tested apps. Comfort zone: Java/Spring Boot on the back end, JavaScript/React/Vue on the front end.'
    },
    stats: [
      { label: { fr: 'Années d\'expérience pro', en: 'Years of pro experience' }, value: '1+' },
      { label: { fr: 'Expériences en entreprise', en: 'Professional experiences' }, value: '4' },
      { label: { fr: 'Technologies pratiquées', en: 'Technologies used' }, value: '10+' }
    ],
    socialLinks: [
      { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/matthieu-marin-b46865267/', color: 'text-blue-400' },
      { icon: Mail, label: 'Email', href: 'mailto:matthieumarin51@gmail.com', color: 'text-green-400' }
      // TODO: miss info for github — URL GitHub non fournie dans info.md, lien retiré pour ne pas exposer un placeholder
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
        'Développement web full-stack (PHP, JavaScript, Java)',
        'Frameworks modernes : React, Vue.js, Spring Boot',
        'Cloud Computing & applications mobiles',
        'Internet des Objets (IoT)',
        'Gestion de bases de données SQL et NoSQL',
        'Méthode agile (SCRUM) et gestion de projet'
      ],
      en: [
        'Full-stack web development (PHP, JavaScript, Java)',
        'Modern frameworks: React, Vue.js, Spring Boot',
        'Cloud Computing & mobile applications',
        'Internet of Things (IoT)',
        'SQL and NoSQL database management',
        'Agile methodology (SCRUM) and project management'
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
        'Autonomie et prise d\'initiative',
        'Ponctualité et rigueur',
        'Curiosité et apprentissage continu',
        'Veille technologique active',
        'Collaboration en équipe agile',
        'Partage des connaissances'
      ],
      en: [
        'Autonomy and initiative',
        'Punctuality and rigor',
        'Curiosity and continuous learning',
        'Active technology watch',
        'Agile team collaboration',
        'Knowledge sharing'
      ]
    }
  };

  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base"
        >
          <span className="text-syntax-comment">{'// '}<EditableText value="Portfolio.tsx" editKey="home.comment" /></span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-purple-400 hover:border-purple-400 transition-all duration-300 overflow-hidden"
        >
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 md:w-6 md:h-6 ${profileData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${profileData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  <EditableText value={profileData.title} editKey="home.profile.title" />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 md:ml-8 space-y-4 font-mono text-sm md:text-base overflow-hidden">
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="name" editKey="home.prop.name" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"<EditableText value={profileData.name} editKey="home.profile.name" />"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="role" editKey="home.prop.role" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"<EditableText value={profileData.role} editKey="home.profile.role" />"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="bio" editKey="home.prop.bio" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">
                "<EditableText value={profileData.bio[language]} editKey={`home.profile.bio.${language}`} multiline />"
              </span>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div>
              <span className="text-syntax-property"><EditableText value="stats" editKey="home.prop.stats" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">{'{'}</span>
            </div>
            <div className="ml-4 space-y-2">
              {profileData.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 min-w-0">
                  <Sparkles className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} flex-shrink-0`} />
                  <span className="text-syntax-property break-words"><EditableText value={stat.label[language]} editKey={`home.profile.stats.${idx}.label.${language}`} /></span>
                  <span className="text-syntax-punctuation">:</span>{' '}
                  <span className={`${profileData.color}`}><EditableText value={stat.value} editKey={`home.profile.stats.${idx}.value`} /></span>
                  {idx < profileData.stats.length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div>
              <span className="text-syntax-punctuation">{'}'};</span>
            </div>
            <div>
              <span className="text-syntax-property"><EditableText value="connect" editKey="home.prop.connect" /></span>
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
              <a
                href="/cv-matthieu-marin.pdf"
                download
                className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-background hover:bg-hover rounded-lg transition-colors text-sm border-2 border-accent"
                aria-label="Download CV"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                <span>CV</span>
              </a>
            </div>
            <div>
              <span className="text-syntax-punctuation">];</span>
            </div>
          </div>
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-cyan-400 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
        >
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className={`w-5 h-5 md:w-6 md:h-6 ${expertiseData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${expertiseData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  <EditableText value={expertiseData.title} editKey="home.expertise.title" />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            <div>
              <span className="text-syntax-property"><EditableText value="areas" editKey="home.prop.areas" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {expertiseData.areas[language].map((area, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  <Code2 className={`w-3 h-3 md:w-4 md:h-4 ${expertiseData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string break-words">"<EditableText value={area} editKey={`home.expertise.areas.${language}.${idx}`} />"</span>
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
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-pink-400 hover:border-pink-400 transition-all duration-300 overflow-hidden"
        >
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <Terminal className={`w-5 h-5 md:w-6 md:h-6 ${approachData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${approachData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  <EditableText value={approachData.title} editKey="home.approach.title" />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            <div>
              <span className="text-syntax-property"><EditableText value="principles" editKey="home.prop.principles" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {approachData.principles[language].map((principle, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  <Rocket className={`w-3 h-3 md:w-4 md:h-4 ${approachData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string break-words">"<EditableText value={principle} editKey={`home.approach.principles.${language}.${idx}`} />"</span>
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
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-syntax-comment text-xs md:text-sm pt-4"
        >
          <div>{'// export default '}<EditableText value="FullStackDeveloper" editKey="home.exportComment" className="text-syntax-comment" />{';'}</div>
        </motion.div>
      </div>
    </div>
  );
}