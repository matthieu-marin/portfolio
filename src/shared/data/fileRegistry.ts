import { User, BookOpen, Briefcase, FolderKanban, Wrench, Mail, GitBranch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Page } from '../../app/types';

export type FileMeta = {
  humanLabelKey: string; // i18n key, e.g. 'nav.home'
  humanIcon: LucideIcon;
  fileName: string;
  filePath: string;
  badge: string;
  badgeClass: string;
};

export const FILE_REGISTRY: Record<Page, FileMeta> = {
  home: {
    humanLabelKey: 'nav.home',
    humanIcon: User,
    fileName: 'profil.tsx',
    filePath: 'src/profil.tsx',
    badge: 'TS',
    badgeClass: 'text-syntax-function',
  },
  experience: {
    humanLabelKey: 'nav.experience',
    humanIcon: Briefcase,
    fileName: 'Experience.java',
    filePath: 'src/Experience.java',
    badge: 'J',
    badgeClass: 'text-syntax-class',
  },
  about: {
    humanLabelKey: 'nav.about',
    humanIcon: BookOpen,
    fileName: 'README.md',
    filePath: 'src/README.md',
    badge: 'MD',
    badgeClass: 'text-syntax-comment',
  },
  skills: {
    humanLabelKey: 'nav.skills',
    humanIcon: Wrench,
    fileName: 'skills.yml',
    filePath: 'src/skills.yml',
    badge: 'YML',
    badgeClass: 'text-syntax-property',
  },
  projects: {
    humanLabelKey: 'nav.projects',
    humanIcon: FolderKanban,
    fileName: 'projects.tf',
    filePath: 'src/projects.tf',
    badge: 'TF',
    badgeClass: 'text-syntax-variable',
  },
  contact: {
    humanLabelKey: 'nav.contact',
    humanIcon: Mail,
    fileName: 'contact.http',
    filePath: 'src/contact.http',
    badge: 'HTTP',
    badgeClass: 'text-syntax-string',
  },
  chronology: {
    humanLabelKey: 'nav.chronology',
    humanIcon: GitBranch,
    fileName: 'chronologie.git',
    filePath: 'src/chronologie.git',
    badge: 'GIT',
    badgeClass: 'text-syntax-keyword',
  },
};

export function tabDisplay(
  page: Page,
  rendererEnabled: boolean,
  t: (key: string) => string
): { name: string; path: string } {
  const meta = FILE_REGISTRY[page];
  if (rendererEnabled) {
    return { name: t(meta.humanLabelKey), path: '' };
  }
  return { name: meta.fileName, path: meta.filePath };
}
