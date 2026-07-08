import { MapPin, GraduationCap, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../i18n/hooks';
import { useEdited } from '../../../shared/contexts/EditContext';
import { about } from '../data';
import { RecruiterShell, Section, Chip } from './primitives';

function InterestChip({ index, language }: { index: number; language: 'fr' | 'en' }) {
  const interest = about.interests[index];
  const value = useEdited(`about.interests.${index}.${language}`, interest[language]);
  return <Chip>{value}</Chip>;
}

function EducationCard({ eduIndex, index }: { eduIndex: number; index: number }) {
  const { language } = useLanguage();
  const edu = about.education[eduIndex];

  const degree = useEdited(`edu.${edu.id}.degree.${language}`, edu.degree[language]);

  return (
    <div className={index > 0 ? 'pt-4 mt-4 border-t border-border/60' : undefined}>
      <p className="text-foreground font-medium">{degree}</p>
      <p className="text-foreground/60 text-sm mt-0.5">
        {edu.school} · {edu.period}
      </p>
      <ul className="space-y-1 mt-2">
        {edu.highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <GraduationCap className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{highlight[language]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutRecruiter() {
  const { t, language } = useLanguage();

  return (
    <RecruiterShell>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('recruiter.about.title')}</h1>

      <Section icon={MapPin} title={t('recruiter.about.locationTitle')} index={0}>
        <p>{about.location}</p>
      </Section>

      <Section icon={GraduationCap} title={t('recruiter.about.educationTitle')} index={1}>
        <div>
          {about.education.map((edu, idx) => (
            <EducationCard key={edu.id} eduIndex={idx} index={idx} />
          ))}
        </div>
      </Section>

      <Section icon={Sparkles} title={t('recruiter.about.interestsTitle')} index={2}>
        <div className="flex flex-wrap gap-2">
          {about.interests.map((interest, idx) => (
            <InterestChip key={idx} index={idx} language={language} />
          ))}
        </div>
      </Section>

      <Section icon={Heart} title={t('recruiter.about.softSkillsTitle')} index={3}>
        <div className="flex flex-wrap gap-2">
          {about.softSkills.map((skill, idx) => (
            <Chip key={idx}>{skill[language]}</Chip>
          ))}
        </div>
      </Section>
    </RecruiterShell>
  );
}
