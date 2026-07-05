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
import { profile, about } from './data';

// UI-only per-education metadata not carried by AboutData (EducationEntry
// has no `location`/`specialization` fields) — display-only local map.
const EDUCATION_UI: Record<string, { location: string; specialization: { fr: string; en: string } }> = {
  master_cloud_computing: {
    location: 'Saint-Quentin, France',
    specialization: {
      fr: 'Informatique spécialisée en Cloud Computing et applications mobiles',
      en: 'Computer science specializing in Cloud Computing and mobile applications',
    },
  },
  licence_pro_web_mobile: {
    location: 'Saint-Quentin, France',
    specialization: {
      fr: 'Développement web et mobile, NoSQL et conception web',
      en: 'Web and mobile development, NoSQL and web design',
    },
  },
  bts_sio_option_b: {
    location: 'Laon, France',
    specialization: {
      fr: 'Solutions informatiques et applications métiers',
      en: 'IT solutions and business applications',
    },
  },
};

export function About() {
  const { t, language } = useLanguage();

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
            value={profile.role[language]}
            valueEditKey="about.profile.role"
          />
          <CodeProperty
            name="location"
            nameEditKey="about.prop.location"
            value={about.location}
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
            {about.interests.map((interest, idx) => (
              <CodeArrayItem
                key={idx}
                icon={Code2}
                isLast={idx === about.interests.length - 1}
              >
                <EditableText
                  value={interest[language]}
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
          {about.education.map((edu, eduIdx) => {
            const ui = EDUCATION_UI[edu.id];
            return (
              <div key={edu.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  {eduIdx === 0 ? (
                    <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  ) : (
                    <Book className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  )}
                  <span className="text-syntax-keyword">class</span>{' '}
                  <span className="text-syntax-class text-blue-400">
                    <EditableText
                      value={edu.id}
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
                    value={ui.location}
                    valueEditKey={`about.education.${eduIdx}.location`}
                    icon={MapPin}
                  />
                  <CodeProperty
                    name="specialization"
                    value={ui.specialization[language]}
                    valueEditKey={`about.education.${eduIdx}.specialization.${language}`}
                  />
                  <CodeArrayProperty name="highlights">
                    {edu.highlights.map((highlight, idx) => (
                      <CodeArrayItem
                        key={idx}
                        icon={Book}
                        isLast={idx === edu.highlights.length - 1}
                      >
                        <EditableText
                          value={highlight[language]}
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
            );
          })}
        </ClassBody>
        <ClassClose />
      </CodeCard>

      <CodeCard accentColor="pink" delay={0.3}>
        <ClassHeader icon={Heart} title="SoftSkills" titleEditKey="about.class.values" />
        <ClassBody>
          <CodeArrayProperty name="coreValues" variant="inline">
            {about.softSkills.map((value, idx) => (
              <CodeArrayItem
                key={idx}
                icon={Target}
                variant="pill"
              >
                <EditableText
                  value={value[language]}
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
