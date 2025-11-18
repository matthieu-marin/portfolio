import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Code2,
  Heart,
  Coffee,
  Music,
  Book,
  Globe,
  Target
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function About() {
  const { t, language } = useLanguage();

  const profileData = {
    id: 'profile',
    title: 'Developer',
    icon: User,
    color: 'text-purple-400',
    borderColor: 'border-purple-400',
    name: 'Votre Nom',
    role: 'Full Stack Developer',
    location: 'Paris, France',
    email: 'contact@example.com',
    bio: {
      fr: 'Passionné par le développement web et les technologies modernes. Je crée des applications web performantes et élégantes en utilisant les dernières technologies. Toujours en quête d\'apprentissage et d\'amélioration continue.',
      en: 'Passionate about web development and modern technologies. I create performant and elegant web applications using the latest technologies. Always seeking learning and continuous improvement.'
    },
    interests: {
      fr: [
        'Développement d\'architectures scalables',
        'Open Source et contribution communautaire',
        'Design patterns et clean code',
        'Performance et optimisation'
      ],
      en: [
        'Development of scalable architectures',
        'Open Source and community contribution',
        'Design patterns and clean code',
        'Performance and optimization'
      ]
    },
    hobbies: {
      fr: [
        'Lecture de documentation technique',
        'Contribution à des projets open source',
        'Veille technologique et apprentissage',
        'Partage de connaissances via articles et talks'
      ],
      en: [
        'Reading technical documentation',
        'Contributing to open source projects',
        'Tech watch and learning',
        'Sharing knowledge through articles and talks'
      ]
    }
  };

  const educationData = {
    id: 'education',
    title: 'Formation',
    icon: GraduationCap,
    color: 'text-blue-400',
    borderColor: 'border-blue-400',
    items: [
      {
        degree: {
          fr: 'Master en Informatique',
          en: 'Master in Computer Science'
        },
        school: 'Université de Paris',
        period: '2017 - 2019',
        location: 'Paris, France',
        specialization: {
          fr: 'Spécialisation en développement web et architecture logicielle',
          en: 'Specialization in web development and software architecture'
        },
        highlights: {
          fr: [
            'Architecture distribuée et microservices',
            'Développement web full-stack avancé',
            'Sécurité des applications web',
            'Gestion de projet agile'
          ],
          en: [
            'Distributed architecture and microservices',
            'Advanced full-stack web development',
            'Web application security',
            'Agile project management'
          ]
        }
      },
      {
        degree: {
          fr: 'Licence en Informatique',
          en: 'Bachelor in Computer Science'
        },
        school: 'Université Lyon 1',
        period: '2014 - 2017',
        location: 'Lyon, France',
        specialization: {
          fr: 'Fondamentaux de la programmation et des systèmes',
          en: 'Programming and systems fundamentals'
        },
        highlights: {
          fr: [
            'Algorithmique et structures de données',
            'Programmation orientée objet',
            'Bases de données relationnelles',
            'Réseaux et systèmes d\'exploitation'
          ],
          en: [
            'Algorithms and data structures',
            'Object-oriented programming',
            'Relational databases',
            'Networks and operating systems'
          ]
        }
      }
    ]
  };

  const valuesData = {
    id: 'values',
    title: 'Values',
    icon: Heart,
    color: 'text-pink-400',
    borderColor: 'border-pink-400',
    items: {
      fr: [
        'Code propre et maintenable',
        'Collaboration et communication',
        'Innovation et créativité',
        'Apprentissage continu',
        'Qualité et excellence',
        'Partage des connaissances'
      ],
      en: [
        'Clean and maintainable code',
        'Collaboration and communication',
        'Innovation and creativity',
        'Continuous learning',
        'Quality and excellence',
        'Knowledge sharing'
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
          <span className="text-syntax-comment">{t('about.title')}</span>
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
              // {profileData.bio[language]}
            </div>
          </div>

          {/* Properties */}
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            
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

            {/* Property: location */}
            <div className="flex items-center gap-2 break-words">
              <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} opacity-60`} />
              <span className="text-syntax-property">location</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"{profileData.location}"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>

            {/* Property: email */}
            <div className="flex items-center gap-2 break-words">
              <Mail className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} opacity-60`} />
              <span className="text-syntax-property">email</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <a 
                href={`mailto:${profileData.email}`}
                className={`text-syntax-string hover:underline ${profileData.color} transition-colors`}
              >
                "{profileData.email}"
              </a>
              <span className="text-syntax-punctuation">;</span>
            </div>

            {/* Property: interests */}
            <div className="break-words">
              <span className="text-syntax-property">interests</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {profileData.interests[language].map((interest, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Code2 className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string">"{interest}"</span>
                  {idx < profileData.interests[language].length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div className="break-words">
              <span className="text-syntax-punctuation">];</span>
            </div>

            {/* Property: hobbies */}
            <div className="break-words">
              <span className="text-syntax-property">hobbies</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {profileData.hobbies[language].map((hobby, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Coffee className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string">"{hobby}"</span>
                  {idx < profileData.hobbies[language].length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div className="break-words">
              <span className="text-syntax-punctuation">];</span>
            </div>
          </div>

          {/* Close class */}
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400 transition-all duration-300 overflow-hidden"
        >
          {/* Class declaration */}
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <GraduationCap className={`w-5 h-5 md:w-6 md:h-6 ${educationData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${educationData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  Education
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
            <div className="ml-6 md:ml-10 text-syntax-comment text-xs md:text-sm break-words">
              // {language === 'fr' ? 'Parcours académique et formations' : 'Academic background and training'}
            </div>
          </div>

          {/* Properties - Education items */}
          <div className="ml-4 md:ml-8 space-y-6 font-mono text-sm md:text-base overflow-hidden">
            {educationData.items.map((edu, eduIdx) => (
              <div key={eduIdx} className="space-y-3">
                {/* Sub-class for each degree */}
                <div className="flex items-center gap-2">
                  {eduIdx === 0 ? (
                    <GraduationCap className={`w-4 h-4 md:w-5 md:h-5 ${educationData.color}`} />
                  ) : (
                    <Book className={`w-4 h-4 md:w-5 md:h-5 ${educationData.color}`} />
                  )}
                  <span className="text-syntax-keyword">class</span>{' '}
                  <span className={`text-syntax-class ${educationData.color}`}>
                    {eduIdx === 0 ? 'master_informatique' : 'licence_informatique'}
                  </span>{' '}
                  <span className="text-syntax-punctuation">{'{'}</span>
                </div>

                <div className="ml-4 space-y-3">
                  {/* Degree */}
                  <div>
                    <span className="text-syntax-property">degree</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{edu.degree[language]}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>

                  {/* School */}
                  <div>
                    <span className="text-syntax-property">school</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{edu.school}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`w-3 h-3 md:w-4 md:h-4 ${educationData.color} opacity-60`} />
                    <span className="text-syntax-property">period</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{edu.period}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${educationData.color} opacity-60`} />
                    <span className="text-syntax-property">location</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{edu.location}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>

                  {/* Specialization */}
                  <div>
                    <span className="text-syntax-property">specialization</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"{edu.specialization[language]}"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>

                  {/* Highlights */}
                  <div>
                    <span className="text-syntax-property">highlights</span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {edu.highlights[language].map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Book className={`w-3 h-3 md:w-4 md:h-4 ${educationData.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"{highlight}"</span>
                        {idx < edu.highlights[language].length - 1 && (
                          <span className="text-syntax-punctuation">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-syntax-punctuation">];</span>
                  </div>
                </div>

                {/* Close sub-class */}
                <div>
                  <span className="text-syntax-punctuation">{'}'}</span>
                </div>

                {/* Separator between education items */}
                {eduIdx < educationData.items.length - 1 && (
                  <div className="pt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Close class */}
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-pink-400 hover:border-pink-400 transition-all duration-300 overflow-hidden"
        >
          {/* Class declaration */}
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <Heart className={`w-5 h-5 md:w-6 md:h-6 ${valuesData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${valuesData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  Values
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
            <div className="ml-6 md:ml-10 text-syntax-comment text-xs md:text-sm break-words">
              // {language === 'fr' ? 'Principes et valeurs professionnelles' : 'Professional principles and values'}
            </div>
          </div>

          {/* Properties */}
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            
            {/* Property: core values */}
            <div>
              <span className="text-syntax-property">coreValues</span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {valuesData.items[language].map((value, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  <Target className={`w-3 h-3 md:w-4 md:h-4 ${valuesData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string break-words">"{value}"</span>
                  {idx < valuesData.items[language].length - 1 && (
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
      </div>
    </div>
  );
}