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
import { useLanguage } from '../../i18n/hooks';
import { EditableText } from '../../shared/components/EditableText';

export function About() {
  const { t, language } = useLanguage();

  const profileData = {
    id: 'profile',
    title: 'Developer',
    icon: User,
    color: 'text-purple-400',
    borderColor: 'border-purple-400',
    name: 'Matthieu Marin',
    role: 'Développeur en alternance — Master Cloud Computing & Mobility',
    location: 'Saint-Quentin, Hauts-de-France, France',
    email: 'matthieumarin51@gmail.com',
    bio: {
      fr: 'Actuellement étudiant en Master Cloud Computing & Mobility et alternant chez Renault Digital, je suis fort d\'une expérience en développement web acquise lors de cinq stages en tant que développeur web stagiaire. Passionné par la création d\'applications web innovantes, j\'évolue dans un environnement stimulant où je continue à apprendre et à développer mes compétences.',
      en: 'Currently studying Master Cloud Computing & Mobility and working as an apprentice at Renault Digital, I have web development experience gained through five internships as a web developer. Passionate about creating innovative web applications, I thrive in a stimulating environment where I continue to learn and develop my skills.'
    },
    interests: {
      fr: [
        'Veille technologique active',
        'Apprentissage continu',
        'Ressources Java & Spring (Baeldung)',
        'Formation en ligne (OpenClassrooms)'
      ],
      en: [
        'Active technology watch',
        'Continuous learning',
        'Java & Spring resources (Baeldung)',
        'Online learning (OpenClassrooms)'
      ]
    },
    hobbies: {
      fr: [
        'Autonomie et prise d\'initiative dans les projets',
        'Ponctualité et rigueur au quotidien',
        'Curiosité pour les nouvelles technologies',
        'Apprentissage de nouvelles compétences'
      ],
      en: [
        'Autonomy and initiative in projects',
        'Punctuality and daily rigor',
        'Curiosity for new technologies',
        'Learning new skills'
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
          fr: 'Master — Cloud Computing & Mobility',
          en: 'Master — Cloud Computing & Mobility'
        },
        school: 'UPJV / INSSET — Saint-Quentin',
        period: 'sept. 2024 – juin 2026',
        location: 'Saint-Quentin, France',
        specialization: {
          fr: 'Informatique spécialisée en Cloud Computing et applications mobiles',
          en: 'Computer science specializing in Cloud Computing and mobile applications'
        },
        highlights: {
          // TODO: miss info for education[0].highlights — détails des matières/modules non fournis
          fr: [
            'Cloud Computing',
            'Développement d\'applications mobiles',
            'Architecture logicielle avancée',
            'Gestion de projet agile (alternance Renault Digital)'
          ],
          en: [
            'Cloud Computing',
            'Mobile application development',
            'Advanced software architecture',
            'Agile project management (Renault Digital apprenticeship)'
          ]
        }
      },
      {
        degree: {
          fr: 'Licence Professionnelle — Conception et développement d\'applications web et mobile',
          en: 'Professional Bachelor — Web and Mobile Application Design and Development'
        },
        school: 'UPJV / INSSET — Saint-Quentin',
        period: 'sept. 2023 – août 2024',
        location: 'Saint-Quentin, France',
        specialization: {
          fr: 'Développement web et mobile, NoSQL et conception web',
          en: 'Web and mobile development, NoSQL and web design'
        },
        highlights: {
          // TODO: miss info for education[1].highlights — détails des 26 compétences mentionnées non fournis
          fr: [
            'Conception web',
            'NoSQL',
            'Développement mobile',
            '26 compétences supplémentaires listées sur LinkedIn'
          ],
          en: [
            'Web design',
            'NoSQL',
            'Mobile development',
            '26 additional skills listed on LinkedIn'
          ]
        }
      },
      {
        degree: {
          fr: 'BTS SIO option B — Solutions logicielles et applications métiers',
          en: 'BTS SIO option B — Software Solutions and Business Applications'
        },
        school: 'Lycée Paul Claudel — Laon',
        period: 'sept. 2021 – juin 2023',
        location: 'Laon, France',
        specialization: {
          fr: 'Solutions informatiques et applications métiers',
          en: 'IT solutions and business applications'
        },
        highlights: {
          // TODO: miss info for education[2].highlights — détails des matières BTS non fournis
          fr: [
            'Développement d\'applications',
            'Solutions logicielles',
            'Gestion de projet informatique',
            'Bases de données et systèmes'
          ],
          en: [
            'Application development',
            'Software solutions',
            'IT project management',
            'Databases and systems'
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
        'Autonomie',
        'Ponctualité',
        'Curiosité',
        'Apprentissage continu',
        'Veille technologique',
        'Collaboration en équipe'
      ],
      en: [
        'Autonomy',
        'Punctuality',
        'Curiosity',
        'Continuous learning',
        'Technology watch',
        'Team collaboration'
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
          <span className="text-syntax-comment">{'// '}<EditableText value={t('about.title')} editKey="about.comment" /></span>
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
                  <EditableText value={profileData.title} editKey="about.profile.title" />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="name" editKey="about.prop.name" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"<EditableText value={profileData.name} editKey="about.profile.name" />"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="role" editKey="about.prop.role" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"<EditableText value={profileData.role} editKey="about.profile.role" />"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div className="flex items-center gap-2 break-words">
              <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} opacity-60`} />
              <span className="text-syntax-property"><EditableText value="location" editKey="about.prop.location" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-string">"<EditableText value={profileData.location} editKey="about.profile.location" />"</span>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div className="flex items-center gap-2 break-words">
              <Mail className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} opacity-60`} />
              <span className="text-syntax-property"><EditableText value="email" editKey="about.prop.email" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <a
                href={`mailto:${profileData.email}`}
                className={`text-syntax-string hover:underline ${profileData.color} transition-colors`}
              >
                "<EditableText value={profileData.email} editKey="about.profile.email" />"
              </a>
              <span className="text-syntax-punctuation">;</span>
            </div>
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="interests" editKey="about.prop.interests" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {profileData.interests[language].map((interest, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Code2 className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string">"<EditableText value={interest} editKey={`about.profile.interests.${language}.${idx}`} />"</span>
                  {idx < profileData.interests[language].length - 1 && (
                    <span className="text-syntax-punctuation">,</span>
                  )}
                </div>
              ))}
            </div>
            <div className="break-words">
              <span className="text-syntax-punctuation">];</span>
            </div>
            <div className="break-words">
              <span className="text-syntax-property"><EditableText value="hobbies" editKey="about.prop.hobbies" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {profileData.hobbies[language].map((hobby, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Coffee className={`w-3 h-3 md:w-4 md:h-4 ${profileData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string">"<EditableText value={hobby} editKey={`about.profile.hobbies.${language}.${idx}`} />"</span>
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
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group bg-editor/50 rounded-lg p-4 md:p-6 border-4 border-t-accent/20 border-r-accent/20 border-b-accent/20 border-l-blue-400 hover:border-blue-400 transition-all duration-300 overflow-hidden"
        >
          <div className="font-mono space-y-2 text-sm md:text-base mb-4">
            <div className="flex items-center gap-3">
              <GraduationCap className={`w-5 h-5 md:w-6 md:h-6 ${educationData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${educationData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  <EditableText value="Education" editKey="about.class.education" />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 md:ml-8 space-y-6 font-mono text-sm md:text-base overflow-hidden">
            {educationData.items.map((edu, eduIdx) => (
              <div key={eduIdx} className="space-y-3">
                <div className="flex items-center gap-2">
                  {eduIdx === 0 ? (
                    <GraduationCap className={`w-4 h-4 md:w-5 md:h-5 ${educationData.color}`} />
                  ) : (
                    <Book className={`w-4 h-4 md:w-5 md:h-5 ${educationData.color}`} />
                  )}
                  <span className="text-syntax-keyword">class</span>{' '}
                  <span className={`text-syntax-class ${educationData.color}`}>
                    <EditableText value={eduIdx === 0 ? 'master_cloud_computing' : eduIdx === 1 ? 'licence_pro_web_mobile' : 'bts_sio_option_b'} editKey={`about.education.${eduIdx}.className`} />
                  </span>{' '}
                  <span className="text-syntax-punctuation">{'{'}</span>
                </div>

                <div className="ml-4 space-y-3">
                  <div>
                    <span className="text-syntax-property"><EditableText value="degree" editKey="about.prop.degree" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={edu.degree[language]} editKey={`about.education.${eduIdx}.degree.${language}`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="school" editKey="about.prop.school" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={edu.school} editKey={`about.education.${eduIdx}.school`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`w-3 h-3 md:w-4 md:h-4 ${educationData.color} opacity-60`} />
                    <span className="text-syntax-property"><EditableText value="period" editKey="about.prop.period" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={edu.period} editKey={`about.education.${eduIdx}.period`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${educationData.color} opacity-60`} />
                    <span className="text-syntax-property"><EditableText value="location" editKey="about.prop.location" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={edu.location} editKey={`about.education.${eduIdx}.location`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="specialization" editKey="about.prop.specialization" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-string">"<EditableText value={edu.specialization[language]} editKey={`about.education.${eduIdx}.specialization.${language}`} />"</span>
                    <span className="text-syntax-punctuation">;</span>
                  </div>
                  <div>
                    <span className="text-syntax-property"><EditableText value="highlights" editKey="about.prop.highlights" /></span>
                    <span className="text-syntax-punctuation">:</span>{' '}
                    <span className="text-syntax-punctuation">[</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {edu.highlights[language].map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Book className={`w-3 h-3 md:w-4 md:h-4 ${educationData.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-syntax-string">"<EditableText value={highlight} editKey={`about.education.${eduIdx}.highlights.${language}.${idx}`} />"</span>
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
                <div>
                  <span className="text-syntax-punctuation">{'}'}</span>
                </div>
                {eduIdx < educationData.items.length - 1 && (
                  <div className="pt-2" />
                )}
              </div>
            ))}
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
              <Heart className={`w-5 h-5 md:w-6 md:h-6 ${valuesData.color} flex-shrink-0`} />
              <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                <span className="text-syntax-keyword">class</span>{' '}
                <span className={`text-syntax-class ${valuesData.color} break-words`} style={{ fontSize: '1.1em' }}>
                  <EditableText value="Values" editKey="about.class.values" />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 md:ml-8 space-y-3 font-mono text-sm md:text-base overflow-hidden">
            <div>
              <span className="text-syntax-property"><EditableText value="coreValues" editKey="about.prop.coreValues" /></span>
              <span className="text-syntax-punctuation">:</span>{' '}
              <span className="text-syntax-punctuation">[</span>
            </div>
            <div className="ml-4 space-y-1">
              {valuesData.items[language].map((value, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  <Target className={`w-3 h-3 md:w-4 md:h-4 ${valuesData.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-syntax-string break-words">"<EditableText value={value} editKey={`about.values.${language}.${idx}`} />"</span>
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
          <div className="font-mono text-sm md:text-base mt-3">
            <span className="text-syntax-punctuation">{'}'}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}