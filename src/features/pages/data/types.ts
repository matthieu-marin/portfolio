export type Localized = { fr: string; en: string };

export type ProfileStat = { label: Localized; value: number; suffix?: string };

export type Profile = {
  name: string;
  role: Localized;
  bio: Localized;
  email: string;
  linkedin: string;
  cvPath: string;
  avatarImage: string; // ex. '/images/profile/avatar.jpg'
  stats: ProfileStat[];
  expertise: Localized[];
  principles: Localized[];
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: Localized;
  period: Localized;
  location: string;
  kind: 'apprenticeship' | 'internship';
  highlights: Localized[];
  technologies: string[]; // skillIds quand ils existent
};

export type ProjectImage = { label: string; path: string };

export type ProjectEntry = {
  id: string;
  title: string;
  description: Localized;
  status: Localized;
  technologies: string[];
  features: Localized[];
  images: ProjectImage[];
  repository?: string;
  demo?: string;
};

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type SkillEntry = {
  id: string;
  name: string;
  level: SkillLevel;
  description: Localized;
  acquiredAt: string[]; // ids d'expériences ou de projets
};

export type SkillCategory = { id: string; name: Localized; skills: SkillEntry[] };

export type EducationEntry = {
  id: string;
  degree: Localized;
  school: string;
  period: string;
  highlights: Localized[];
};

export type AboutData = {
  location: string;
  education: EducationEntry[];
  interests: Localized[];
  softSkills: Localized[];
};

export type ContactData = {
  email: string;
  phone: string;
  phoneHref: string;
  location: Localized;
  socials: Array<{ label: string; url: string }>;
};
