import { motion } from 'motion/react';
import { useState } from 'react';
import { Code2, Rocket, Linkedin, Mail, Download } from 'lucide-react';
import { useLanguage } from '../../../i18n/hooks';
import { useEdited, useEditContext } from '../../../shared/contexts/EditContext';
import { fireConfetti } from '../../../shared/effects/confetti';
import { profile } from '../data';
import { RecruiterShell, Section, Chip, StatCounter, sectionColor } from './primitives';

function ExpertiseChip({ index, language }: { index: number; language: 'fr' | 'en' }) {
  const { edits } = useEditContext();
  const item = profile.expertise[index];
  const value = edits[`profile.expertise.${index}.${language}`] ?? item[language];
  return <Chip>{value}</Chip>;
}

// Pas de photo → pas d'avatar du tout (le hero reprend toute la largeur).
// Déposer une image à `profile.avatarImage` suffit pour le faire réapparaître.
function Avatar({ src }: { src: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) return null;

  return (
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-accent/20 flex items-center justify-center flex-shrink-0">
      <img
        src={src}
        alt=""
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
}

export function HomeRecruiter() {
  const { t, language } = useLanguage();

  const role = useEdited(`profile.role.${language}`, profile.role[language]);
  const bio = useEdited(`profile.bio.${language}`, profile.bio[language]);
  const name = useEdited('profile.name', profile.name);

  return (
    <RecruiterShell>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left"
      >
        <Avatar src={profile.avatarImage} />
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 justify-center sm:justify-start flex-wrap">
            {name}
            <motion.span
              role="img"
              aria-label="waving hand"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="inline-block origin-[70%_70%]"
            >
              👋
            </motion.span>
          </h1>
          <p className="text-accent text-sm md:text-base mt-1">{role}</p>
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed mt-3">{bio}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.3, ease: 'easeOut' }}
        aria-label={t('recruiter.home.statsAriaLabel')}
        className="grid grid-cols-3 gap-4 bg-editor/50 border border-border rounded-xl p-5 md:p-7"
      >
        {profile.stats.map((stat, idx) => (
          <StatCounter
            key={idx}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label[language]}
            color={sectionColor(idx)}
          />
        ))}
      </motion.div>

      {/* Expertise */}
      <Section icon={Code2} title={t('recruiter.home.expertiseTitle')} index={2}>
        <div className="flex flex-wrap gap-2">
          {profile.expertise.map((_, idx) => (
            <ExpertiseChip key={idx} index={idx} language={language} />
          ))}
        </div>
      </Section>

      {/* Work approach */}
      <Section icon={Rocket} title={t('recruiter.home.approachTitle')} index={3}>
        <div className="flex flex-wrap gap-2">
          {profile.principles.map((item, idx) => (
            <Chip key={idx}>{item[language]}</Chip>
          ))}
        </div>
      </Section>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
        className="flex flex-wrap gap-3 justify-center sm:justify-start"
      >
        <a
          href={profile.cvPath}
          download
          onClick={() => fireConfetti()}
          aria-label={t('recruiter.home.downloadCv')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-sm md:text-base shadow-sm hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          {t('recruiter.home.downloadCv')}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('recruiter.home.linkedin')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm md:text-base hover:border-accent/40 hover:text-accent transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          {t('recruiter.home.linkedin')}
        </a>
        <a
          href={`mailto:${profile.email}`}
          aria-label={t('recruiter.home.email')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm md:text-base hover:border-accent/40 hover:text-accent transition-colors"
        >
          <Mail className="w-4 h-4" />
          {t('recruiter.home.email')}
        </a>
      </motion.div>
    </RecruiterShell>
  );
}
