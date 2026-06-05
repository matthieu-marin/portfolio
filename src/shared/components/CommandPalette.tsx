import {
  Home as HomeIcon,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  Mail,
  Moon,
  Sun,
  Settings,
  Gamepad2,
  Zap,
  Sunset,
  Rocket,
  Snowflake,
  Languages,
  Terminal,
  PanelLeft,
  Download,
  Linkedin,
  Copy,
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './ui/command';
import { useTheme, type Theme } from '../contexts/ThemeContext';
import { useLanguage } from '../../i18n/hooks';
import { toast } from 'sonner';
import type { Page } from '../../app/types';

interface PageDef {
  id: Page;
  name: string;
  path: string;
  // Both translations are kept in the searchable value so users can find a
  // page by its name in either language regardless of the current locale.
  searchTokens: string;
  icon: typeof HomeIcon;
}

const PAGES: PageDef[] = [
  { id: 'home', name: 'Home.tsx', path: 'src/pages/Home.tsx', searchTokens: 'Accueil Home', icon: HomeIcon },
  { id: 'about', name: 'About.tsx', path: 'src/pages/About.tsx', searchTokens: 'À propos About', icon: User },
  { id: 'experience', name: 'Experience.tsx', path: 'src/pages/Experience.tsx', searchTokens: 'Expérience Experience', icon: Briefcase },
  { id: 'projects', name: 'Projects.tsx', path: 'src/pages/Projects.tsx', searchTokens: 'Projets Projects', icon: FolderGit2 },
  { id: 'skills', name: 'Skills.tsx', path: 'src/pages/Skills.tsx', searchTokens: 'Compétences Skills', icon: Wrench },
  { id: 'contact', name: 'Contact.tsx', path: 'src/pages/Contact.tsx', searchTokens: 'Contact', icon: Mail },
];

const THEMES: { id: Theme; name: string; icon: typeof Moon }[] = [
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'steampunk', name: 'Steampunk', icon: Settings },
  { id: 'pixel', name: 'Pixel', icon: Gamepad2 },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: Zap },
  { id: 'synthwave', name: 'Synthwave', icon: Sunset },
  { id: 'galaxy', name: 'Galaxy', icon: Rocket },
  { id: 'nord', name: 'Nord', icon: Snowflake },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenFile: (id: Page, name: string, path: string) => void;
  onToggleTerminal: () => void;
  onToggleExplorer: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onOpenFile,
  onToggleTerminal,
  onToggleExplorer,
}: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();

  const run = (fn: () => void) => () => {
    onOpenChange(false);
    fn();
  };

  const copyEmail = run(() => {
    void navigator.clipboard.writeText('matthieumarin51@gmail.com').then(
      () => toast.success(t('commandPalette.emailCopied')),
      () => toast.error(t('commandPalette.copyFailed'))
    );
  });

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('commandPalette.title')}
      description={t('commandPalette.description')}
    >
      <CommandInput placeholder={t('commandPalette.placeholder')} />
      <CommandList>
        <CommandEmpty>{t('commandPalette.noResults')}</CommandEmpty>

        <CommandGroup heading={t('commandPalette.group.goTo')}>
          {PAGES.map((p) => {
            const Icon = p.icon;
            return (
              <CommandItem
                key={p.id}
                onSelect={run(() => onOpenFile(p.id, p.name, p.path))}
                value={`go-${p.id} ${p.searchTokens} ${p.name}`}
              >
                <Icon className="w-4 h-4" />
                <span>{t(`nav.${p.id}`)}</span>
                <span className="ml-auto font-mono text-[10px] opacity-50">{p.name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('commandPalette.group.theme')}>
          {THEMES.map((th) => {
            const Icon = th.icon;
            return (
              <CommandItem
                key={th.id}
                onSelect={run(() => setTheme(th.id))}
                value={`theme-${th.id} ${th.name}`}
              >
                <Icon className="w-4 h-4" />
                <span>{th.name}</span>
                {theme === th.id && (
                  <CommandShortcut>{t('commandPalette.active')}</CommandShortcut>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('commandPalette.group.language')}>
          <CommandItem
            onSelect={run(() => setLanguage('fr'))}
            value="lang-fr Français French"
          >
            <Languages className="w-4 h-4" />
            <span>Français</span>
            {language === 'fr' && (
              <CommandShortcut>{t('commandPalette.active')}</CommandShortcut>
            )}
          </CommandItem>
          <CommandItem
            onSelect={run(() => setLanguage('en'))}
            value="lang-en English Anglais"
          >
            <Languages className="w-4 h-4" />
            <span>English</span>
            {language === 'en' && (
              <CommandShortcut>{t('commandPalette.active')}</CommandShortcut>
            )}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('commandPalette.group.view')}>
          <CommandItem onSelect={run(onToggleExplorer)} value="toggle-explorer">
            <PanelLeft className="w-4 h-4" />
            <span>{t('commandPalette.toggleExplorer')}</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={run(onToggleTerminal)} value="toggle-terminal">
            <Terminal className="w-4 h-4" />
            <span>{t('commandPalette.toggleTerminal')}</span>
            <CommandShortcut>⌘`</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('commandPalette.group.actions')}>
          <CommandItem
            onSelect={run(() => {
              const a = document.createElement('a');
              a.href = '/cv-matthieu-marin.pdf';
              a.download = 'cv-matthieu-marin.pdf';
              a.click();
            })}
            value="download-cv"
          >
            <Download className="w-4 h-4" />
            <span>{t('commandPalette.downloadCV')}</span>
          </CommandItem>
          <CommandItem
            onSelect={run(() =>
              window.open(
                'https://www.linkedin.com/in/matthieu-marin-b46865267/',
                '_blank',
                'noopener,noreferrer'
              )
            )}
            value="open-linkedin"
          >
            <Linkedin className="w-4 h-4" />
            <span>{t('commandPalette.openLinkedin')}</span>
          </CommandItem>
          <CommandItem onSelect={copyEmail} value="copy-email">
            <Copy className="w-4 h-4" />
            <span>{t('commandPalette.copyEmail')}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
