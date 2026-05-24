import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Code2,
  Heart,
  Book,
  Target,
} from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { EditableText } from '../../shared/components/EditableText';
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
  CodeProperty,
  CodeArrayProperty,
  CodeArrayItem,
} from '../../shared/components/layout';

export function About() {
  const { t, language } = useLanguage();

  const profile = {
    name: 'Matthieu Marin',
    role: 'Développeur en alternance — Master Cloud Computing & Mobility',
    location: 'Saint-Quentin, Hauts-de-France, France',
    email: 'matthieumarin51@gmail.com',
    interests: {
      fr: [
        'Veille technologique active',
        'Apprentissage continu',
        'Ressources Java & Spring (Baeldung)',
        'Formation en ligne (OpenClassrooms)',
      ],
      en: [
        'Active technology watch',
        'Continuous learning',
        'Java & Spring resources (Baeldung)',
        'Online learning (OpenClassrooms)',
      ],
    },
  };

  const education = [
    {
      key: 'master_cloud_computing',
      degree: {
        fr: 'Master — Cloud Computing & Mobility',
        en: 'Master — Cloud Computing & Mobility',
      },
      school: 'UPJV / INSSET — Saint-Quentin',
      period: 'sept. 2024 – juin 2026',
      location: 'Saint-Quentin, France',
      specialization: {
        fr: 'Informatique spécialisée en Cloud Computing et applications mobiles',
        en: 'Computer science specializing in Cloud Computing and mobile applications',
      },
      highlights: {
        fr: [
          'Découverte des outils cloud : Google Cloud, AWS, Azure',
          'DevOps avec Terraform pour la livraison continue (CD)',
          'Intégration continue (CI) avec contrôle qualité via SonarQube sur GitHub',
          "Développement d'applications mobiles avancées",
          'Gestion de projet agile (alternance Renault Digital)',
        ],
        en: [
          'Introduction to cloud tools: Google Cloud, AWS, Azure',
          'DevOps with Terraform for continuous delivery (CD)',
          'Continuous integration (CI) with code quality control via SonarQube on GitHub',
          'Advanced mobile application development',
          'Agile project management (Renault Digital apprenticeship)',
        ],
      },
    },
    {
      key: 'licence_pro_web_mobile',
      degree: {
        fr: "Licence Professionnelle — Conception et développement d'applications web et mobile",
        en: 'Professional Bachelor — Web and Mobile Application Design and Development',
      },
      school: 'UPJV / INSSET — Saint-Quentin',
      period: 'sept. 2023 – août 2024',
      location: 'Saint-Quentin, France',
      specialization: {
        fr: 'Développement web et mobile, NoSQL et conception web',
        en: 'Web and mobile development, NoSQL and web design',
      },
      highlights: {
        fr: [
          "Conception et développement d'applications web et mobiles",
          'Bases de données NoSQL (MongoDB)',
          'Développement mobile',
          'Versionnement et collaboration avec Git',
        ],
        en: [
          'Web and mobile application design and development',
          'NoSQL databases (MongoDB)',
          'Mobile development',
          'Version control and collaboration with Git',
        ],
      },
    },
    {
      key: 'bts_sio_option_b',
      degree: {
        fr: 'BTS SIO option B — Solutions logicielles et applications métiers',
        en: 'BTS SIO option B — Software Solutions and Business Applications',
      },
      school: 'Lycée Paul Claudel — Laon',
      period: 'sept. 2021 – juin 2023',
      location: 'Laon, France',
      specialization: {
        fr: 'Solutions informatiques et applications métiers',
        en: 'IT solutions and business applications',
      },
      highlights: {
        // TODO: miss info for education[2].highlights — détails des matières BTS non fournis
        fr: [
          "Développement d'applications",
          'Solutions logicielles',
          'Gestion de projet informatique',
          'Bases de données et systèmes',
        ],
        en: [
          'Application development',
          'Software solutions',
          'IT project management',
          'Databases and systems',
        ],
      },
    },
  ];

  const softSkills = {
    fr: ['Autonomie', 'Ponctualité', 'Curiosité', 'Apprentissage continu', 'Veille technologique', 'Collaboration en équipe'],
    en: ['Autonomy', 'Punctuality', 'Curiosity', 'Continuous learning', 'Technology watch', 'Team collaboration'],
  };

  return (
    <PageShell commentTitle={t('about.title')} commentEditKey="about.comment">
      <CodeCard accentColor="purple" delay={0.1}>
        <ClassHeader icon={User} title="Developer" titleEditKey="about.profile.title" />
        <ClassBody>
          <CodeProperty
            name="name"
            nameEditKey="about.prop.name"
            value={profile.name}
            valueEditKey="about.profile.name"
          />
          <CodeProperty
            name="role"
            nameEditKey="about.prop.role"
            value={profile.role}
            valueEditKey="about.profile.role"
          />
          <CodeProperty
            name="location"
            nameEditKey="about.prop.location"
            value={profile.location}
            valueEditKey="about.profile.location"
            icon={MapPin}
          />
          <CodeProperty
            name="email"
            nameEditKey="about.prop.email"
            value={profile.email}
            valueEditKey="about.profile.email"
            icon={Mail}
            link={`mailto:${profile.email}`}
          />
          <CodeArrayProperty name="interests">
            {profile.interests[language].map((interest, idx) => (
              <CodeArrayItem
                key={idx}
                icon={Code2}
                isLast={idx === profile.interests[language].length - 1}
              >
                <EditableText
                  value={interest}
                  editKey={`about.profile.interests.${language}.${idx}`}
                />
              </CodeArrayItem>
            ))}
          </CodeArrayProperty>
        </ClassBody>
        <ClassClose />
      </CodeCard>

      <CodeCard accentColor="blue" delay={0.2}>
        <ClassHeader
          icon={GraduationCap}
          title="Education"
          titleEditKey="about.class.education"
        />
        <ClassBody className="space-y-6">
          {education.map((edu, eduIdx) => (
            <div key={edu.key} className="space-y-3">
              <div className="flex items-center gap-2">
                {eduIdx === 0 ? (
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                ) : (
                  <Book className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                )}
                <span className="text-syntax-keyword">class</span>{' '}
                <span className="text-syntax-class text-blue-400">
                  <EditableText
                    value={edu.key}
                    editKey={`about.education.${eduIdx}.className`}
                  />
                </span>{' '}
                <span className="text-syntax-punctuation">{'{'}</span>
              </div>
              <div className="ml-4 space-y-3">
                <CodeProperty
                  name="degree"
                  value={edu.degree[language]}
                  valueEditKey={`about.education.${eduIdx}.degree.${language}`}
                />
                <CodeProperty
                  name="school"
                  value={edu.school}
                  valueEditKey={`about.education.${eduIdx}.school`}
                />
                <CodeProperty
                  name="period"
                  value={edu.period}
                  valueEditKey={`about.education.${eduIdx}.period`}
                  icon={GraduationCap}
                />
                <CodeProperty
                  name="location"
                  value={edu.location}
                  valueEditKey={`about.education.${eduIdx}.location`}
                  icon={MapPin}
                />
                <CodeProperty
                  name="specialization"
                  value={edu.specialization[language]}
                  valueEditKey={`about.education.${eduIdx}.specialization.${language}`}
                />
                <CodeArrayProperty name="highlights">
                  {edu.highlights[language].map((highlight, idx) => (
                    <CodeArrayItem
                      key={idx}
                      icon={Book}
                      isLast={idx === edu.highlights[language].length - 1}
                    >
                      <EditableText
                        value={highlight}
                        editKey={`about.education.${eduIdx}.highlights.${language}.${idx}`}
                      />
                    </CodeArrayItem>
                  ))}
                </CodeArrayProperty>
              </div>
              <div className="font-mono">
                <span className="text-syntax-punctuation">{'}'}</span>
              </div>
            </div>
          ))}
        </ClassBody>
        <ClassClose />
      </CodeCard>

      <CodeCard accentColor="pink" delay={0.3}>
        <ClassHeader icon={Heart} title="SoftSkills" titleEditKey="about.class.values" />
        <ClassBody>
          <CodeArrayProperty name="coreValues" variant="inline">
            {softSkills[language].map((value, idx) => (
              <CodeArrayItem
                key={idx}
                icon={Target}
                variant="pill"
              >
                <EditableText
                  value={value}
                  editKey={`about.values.${language}.${idx}`}
                />
              </CodeArrayItem>
            ))}
          </CodeArrayProperty>
        </ClassBody>
        <ClassClose />
      </CodeCard>
    </PageShell>
  );
}
