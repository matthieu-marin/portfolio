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

export type PageId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

interface PageDef {
  id: PageId;
  name: string;
  path: string;
  label: { fr: string; en: string };
  icon: typeof HomeIcon;
}

const PAGES: PageDef[] = [
  { id: 'home', name: 'Home.tsx', path: 'src/pages/Home.tsx', label: { fr: 'Accueil', en: 'Home' }, icon: HomeIcon },
  { id: 'about', name: 'About.tsx', path: 'src/pages/About.tsx', label: { fr: 'À propos', en: 'About' }, icon: User },
  { id: 'experience', name: 'Experience.tsx', path: 'src/pages/Experience.tsx', label: { fr: 'Expérience', en: 'Experience' }, icon: Briefcase },
  { id: 'projects', name: 'Projects.tsx', path: 'src/pages/Projects.tsx', label: { fr: 'Projets', en: 'Projects' }, icon: FolderGit2 },
  { id: 'skills', name: 'Skills.tsx', path: 'src/pages/Skills.tsx', label: { fr: 'Compétences', en: 'Skills' }, icon: Wrench },
  { id: 'contact', name: 'Contact.tsx', path: 'src/pages/Contact.tsx', label: { fr: 'Contact', en: 'Contact' }, icon: Mail },
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
  onOpenFile: (id: PageId, name: string, path: string) => void;
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
  const { language, setLanguage } = useLanguage();

  const run = (fn: () => void) => () => {
    onOpenChange(false);
    fn();
  };

  const copyEmail = run(() => {
    void navigator.clipboard.writeText('matthieumarin51@gmail.com').then(
      () => toast.success(language === 'fr' ? 'Email copié' : 'Email copied'),
      () => toast.error(language === 'fr' ? 'Échec de la copie' : 'Copy failed')
    );
  });

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={language === 'fr' ? 'Palette de commandes' : 'Command Palette'}
      description={
        language === 'fr'
          ? 'Tape une commande, change de thème, ouvre une page…'
          : 'Type a command, switch theme, open a page…'
      }
    >
      <CommandInput
        placeholder={language === 'fr' ? 'Tape une commande…' : 'Type a command…'}
      />
      <CommandList>
        <CommandEmpty>
          {language === 'fr' ? 'Aucun résultat.' : 'No results found.'}
        </CommandEmpty>

        <CommandGroup heading={language === 'fr' ? 'Aller à' : 'Go to'}>
          {PAGES.map((p) => {
            const Icon = p.icon;
            return (
              <CommandItem
                key={p.id}
                onSelect={run(() => onOpenFile(p.id, p.name, p.path))}
                value={`go-${p.id} ${p.label.fr} ${p.label.en} ${p.name}`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.label[language]}</span>
                <span className="ml-auto font-mono text-[10px] opacity-50">{p.name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={language === 'fr' ? 'Thème' : 'Theme'}>
          {THEMES.map((t) => {
            const Icon = t.icon;
            return (
              <CommandItem
                key={t.id}
                onSelect={run(() => setTheme(t.id))}
                value={`theme-${t.id} ${t.name}`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.name}</span>
                {theme === t.id && (
                  <CommandShortcut>{language === 'fr' ? 'actif' : 'active'}</CommandShortcut>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={language === 'fr' ? 'Langue' : 'Language'}>
          <CommandItem
            onSelect={run(() => setLanguage('fr'))}
            value="lang-fr Français French"
          >
            <Languages className="w-4 h-4" />
            <span>Français</span>
            {language === 'fr' && <CommandShortcut>actif</CommandShortcut>}
          </CommandItem>
          <CommandItem
            onSelect={run(() => setLanguage('en'))}
            value="lang-en English Anglais"
          >
            <Languages className="w-4 h-4" />
            <span>English</span>
            {language === 'en' && <CommandShortcut>active</CommandShortcut>}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={language === 'fr' ? 'Affichage' : 'View'}>
          <CommandItem onSelect={run(onToggleExplorer)} value="toggle-explorer">
            <PanelLeft className="w-4 h-4" />
            <span>{language === 'fr' ? "Basculer l'explorateur" : 'Toggle Explorer'}</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={run(onToggleTerminal)} value="toggle-terminal">
            <Terminal className="w-4 h-4" />
            <span>{language === 'fr' ? 'Basculer le terminal' : 'Toggle Terminal'}</span>
            <CommandShortcut>⌘`</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={language === 'fr' ? 'Actions' : 'Actions'}>
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
            <span>{language === 'fr' ? 'Télécharger le CV' : 'Download CV'}</span>
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
            <span>{language === 'fr' ? 'Ouvrir LinkedIn' : 'Open LinkedIn'}</span>
          </CommandItem>
          <CommandItem onSelect={copyEmail} value="copy-email">
            <Copy className="w-4 h-4" />
            <span>{language === 'fr' ? "Copier l'email" : 'Copy email'}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
