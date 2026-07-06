import { useState, useRef, useEffect, forwardRef } from 'react';
import { useLanguage } from '../../i18n/hooks';
import { useEditContext } from '../../shared/contexts/EditContext';
import { useRenderer } from '../../shared/contexts/RendererContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type OutputLine = string | { text: string; className: string };

interface HistoryEntry {
  command: string;
  output: OutputLine[];
  cwd: string;
}

interface FSFile {
  type: 'file';
  size: number;
  modified: string;
  content?: string;
}

interface FSDir {
  type: 'dir';
  modified: string;
  children: Record<string, FSNode>;
}

type FSNode = FSFile | FSDir;

// ─── Virtual Filesystem ───────────────────────────────────────────────────────

const ROOT_FS: FSDir = {
  type: 'dir', modified: 'Jan 15 10:30',
  children: {
    portfolio: {
      type: 'dir', modified: 'Apr  1 12:00',
      children: {
        src: {
          type: 'dir', modified: 'Apr  1 12:00',
          children: {
            app: {
              type: 'dir', modified: 'Mar 28 09:15',
              children: { 'App.tsx': { type: 'file', size: 4521, modified: 'Mar 28 09:15' } },
            },
            features: {
              type: 'dir', modified: 'Apr  1 11:30',
              children: {
                pages: {
                  type: 'dir', modified: 'Apr  1 11:30',
                  children: {
                    'Home.tsx':       { type: 'file', size: 3872,  modified: 'Apr  1 11:30' },
                    'About.tsx':      { type: 'file', size: 5241,  modified: 'Apr  1 11:00' },
                    'Experience.tsx': { type: 'file', size: 8934,  modified: 'Apr  1 10:45' },
                    'Projects.tsx':   { type: 'file', size: 12041, modified: 'Apr  1 10:30' },
                    'Skills.tsx':     { type: 'file', size: 9823,  modified: 'Apr  1 10:15' },
                    'Contact.tsx':    { type: 'file', size: 4512,  modified: 'Mar 29 14:20' },
                  },
                },
                'output-panel': {
                  type: 'dir', modified: 'Apr  1 09:00',
                  children: {
                    'OutputPanel.tsx':  { type: 'file', size: 1234, modified: 'Mar 25 16:40' },
                    'TerminalView.tsx': { type: 'file', size: 8891, modified: 'Apr  1 09:00' },
                    'types.ts':         { type: 'file', size: 312,  modified: 'Mar 20 11:00' },
                  },
                },
              },
            },
            shared: {
              type: 'dir', modified: 'Apr  1 11:45',
              children: {
                components: {
                  type: 'dir', modified: 'Apr  1 11:45',
                  children: {
                    'EditableText.tsx':       { type: 'file', size: 1823, modified: 'Apr  1 11:45' },
                    'FileExplorer.tsx':       { type: 'file', size: 3421, modified: 'Mar 27 10:00' },
                    'ItemTooltip.tsx':        { type: 'file', size: 2891, modified: 'Mar 26 15:30' },
                    'SkillDocumentation.tsx': { type: 'file', size: 1654, modified: 'Mar 22 09:00' },
                    'StatusBar.tsx':          { type: 'file', size: 2134, modified: 'Mar 24 14:15' },
                    'TabBar.tsx':             { type: 'file', size: 1876, modified: 'Mar 23 11:30' },
                    'ThemeSwitcher.tsx':      { type: 'file', size: 1243, modified: 'Mar 20 10:00' },
                    'LanguageSwitcher.tsx':   { type: 'file', size: 987,  modified: 'Mar 20 10:00' },
                    ui: {
                      type: 'dir', modified: 'Mar 15 09:00',
                      children: {
                        'button.tsx':    { type: 'file', size: 892,  modified: 'Mar 15 09:00' },
                        'utils.ts':      { type: 'file', size: 234,  modified: 'Mar 15 09:00' },
                        'chart.tsx':     { type: 'file', size: 1432, modified: 'Mar 15 09:00' },
                        'tooltip.tsx':   { type: 'file', size: 654,  modified: 'Mar 15 09:00' },
                        'use-mobile.ts': { type: 'file', size: 312,  modified: 'Mar 15 09:00' },
                      },
                    },
                  },
                },
                contexts: {
                  type: 'dir', modified: 'Mar 30 09:30',
                  children: {
                    'NavigationContext.tsx': { type: 'file', size: 1234, modified: 'Mar 30 09:30' },
                    'ThemeContext.tsx':       { type: 'file', size: 1876, modified: 'Mar 25 10:00' },
                  },
                },
                effects: {
                  type: 'dir', modified: 'Mar 18 14:00',
                  children: {
                    'CyberpunkEffects.tsx': { type: 'file', size: 2134, modified: 'Mar 18 14:00' },
                    'GalaxyEffects.tsx':    { type: 'file', size: 2543, modified: 'Mar 18 14:00' },
                    'NordEffects.tsx':      { type: 'file', size: 1654, modified: 'Mar 18 14:00' },
                    'PixelEffects.tsx':     { type: 'file', size: 1987, modified: 'Mar 18 14:00' },
                    'SteampunkGears.tsx':   { type: 'file', size: 2341, modified: 'Mar 18 14:00' },
                    'SynthwaveEffects.tsx': { type: 'file', size: 1876, modified: 'Mar 18 14:00' },
                  },
                },
              },
            },
            i18n: {
              type: 'dir', modified: 'Mar 25 12:00',
              children: {
                'config.ts': { type: 'file', size: 432, modified: 'Mar 20 09:00' },
                'hooks.ts':  { type: 'file', size: 312, modified: 'Mar 20 09:00' },
                locales: {
                  type: 'dir', modified: 'Mar 25 12:00',
                  children: {
                    'en.json': { type: 'file', size: 4231, modified: 'Mar 25 12:00' },
                    'fr.json': { type: 'file', size: 4521, modified: 'Mar 25 12:00' },
                  },
                },
              },
            },
            styles: {
              type: 'dir', modified: 'Mar 22 10:00',
              children: {
                'main.scss': { type: 'file', size: 876, modified: 'Mar 22 10:00' },
                base:       { type: 'dir', modified: 'Mar 18 09:00', children: { '_body.scss': { type: 'file', size: 432, modified: 'Mar 18 09:00' } } },
                components: {
                  type: 'dir', modified: 'Mar 20 11:00',
                  children: {
                    '_theme-colors.scss': { type: 'file', size: 2341, modified: 'Mar 20 11:00' },
                    '_scrollbar.scss':    { type: 'file', size: 543,  modified: 'Mar 18 09:00' },
                    '_transitions.scss':  { type: 'file', size: 654,  modified: 'Mar 19 10:00' },
                  },
                },
                themes: {
                  type: 'dir', modified: 'Mar 22 09:00',
                  children: {
                    '_cyberpunk.scss': { type: 'file', size: 1987, modified: 'Mar 22 09:00' },
                    '_dark.scss':      { type: 'file', size: 1234, modified: 'Mar 22 09:00' },
                    '_galaxy.scss':    { type: 'file', size: 1654, modified: 'Mar 22 09:00' },
                    '_light.scss':     { type: 'file', size: 1123, modified: 'Mar 22 09:00' },
                    '_nord.scss':      { type: 'file', size: 1432, modified: 'Mar 22 09:00' },
                    '_pixel.scss':     { type: 'file', size: 1543, modified: 'Mar 22 09:00' },
                    '_steampunk.scss': { type: 'file', size: 1876, modified: 'Mar 22 09:00' },
                    '_synthwave.scss': { type: 'file', size: 1765, modified: 'Mar 22 09:00' },
                  },
                },
              },
            },
            'index.css': { type: 'file', size: 2048, modified: 'Mar 22 10:00' },
            'main.tsx':  { type: 'file', size: 312,  modified: 'Mar 15 09:00' },
          },
        },
        public: {
          type: 'dir', modified: 'Mar 15 09:00',
          children: {
            'favicon.ico': { type: 'file', size: 1150, modified: 'Mar 15 09:00' },
            'index.html':  { type: 'file', size: 1024, modified: 'Mar 15 09:00' },
          },
        },
        build: {
          type: 'dir', modified: 'Apr  1 12:00',
          children: {
            'index.html': { type: 'file', size: 446, modified: 'Apr  1 12:00' },
            assets: {
              type: 'dir', modified: 'Apr  1 12:00',
              children: {
                'index-G5D9Jl8s.css': { type: 'file', size: 38820,  modified: 'Apr  1 12:00' },
                'index-UXbtTPZy.js':  { type: 'file', size: 502814, modified: 'Apr  1 12:00' },
              },
            },
          },
        },
        node_modules: { type: 'dir', modified: 'Mar 15 09:00', children: {} },
        '.env':         { type: 'file', size: 156,  modified: 'Mar 15 09:00' },
        '.gitignore':   {
          type: 'file', size: 234, modified: 'Mar 15 09:00',
          content: `# dependencies\nnode_modules/\n\n# production\nbuild/\ndist/\n\n# misc\n.DS_Store\n.env\n.env.local\n.idea/`,
        },
        'index.html':   { type: 'file', size: 534,  modified: 'Mar 15 09:00', content: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Portfolio</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>` },
        'package.json': {
          type: 'file', size: 2341, modified: 'Apr  1 10:00',
          content: `{\n  "name": "portfolio",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "vite --port 3000",\n    "build": "tsc -b && vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "motion": "^12.7.3",\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1",\n    "i18next": "^24.2.2",\n    "react-i18next": "^15.4.1",\n    "lucide-react": "^0.468.0",\n    "recharts": "^2.15.0"\n  },\n  "devDependencies": {\n    "typescript": "~5.6.2",\n    "vite": "^6.3.5",\n    "@vitejs/plugin-react-swc": "^3.7.2",\n    "tailwindcss": "^4.0.0"\n  }\n}`,
        },
        'README.md': {
          type: 'file', size: 3218, modified: 'Mar 30 10:00',
          content: `# Portfolio IDE\n\nA VS Code-inspired portfolio built with React + TypeScript.\n\n## Features\n- 8 custom themes\n- Bilingual (FR/EN)\n- Inline content editing\n- Fake terminal (you're in it)\n\n## Stack\nReact 18 · TypeScript · Vite · Tailwind CSS v4\n\n## Run\n  npm run dev      # port 3000\n  npm run build\n  npm run preview`,
        },
        'tsconfig.json': {
          type: 'file', size: 892, modified: 'Mar 15 09:00',
          content: `{\n  "compilerOptions": {\n    "target": "ES2020",\n    "lib": ["ES2020", "DOM", "DOM.Iterable"],\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "jsx": "react-jsx",\n    "strict": true,\n    "paths": { "@/*": ["./src/*"] }\n  }\n}`,
        },
        'vite.config.ts': {
          type: 'file', size: 456, modified: 'Mar 15 09:00',
          content: `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react-swc'\nimport path from 'path'\nimport tailwindcss from '@tailwindcss/vite'\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  resolve: { alias: { '@': path.resolve(__dirname, './src') } },\n  server: { port: 3000 },\n  build: { outDir: 'build' },\n})`,
        },
      },
    },
  },
};

// ─── Path utilities ───────────────────────────────────────────────────────────

const HOME = '/portfolio';

function normalizePath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    if (p === '..') out.pop();
    else if (p !== '.') out.push(p);
  }
  return '/' + out.join('/');
}

function resolvePath(cwd: string, target: string): string {
  if (!target || target === '~') return HOME;
  if (target.startsWith('~/')) return normalizePath(HOME + '/' + target.slice(2));
  if (target.startsWith('/')) return normalizePath(target);
  return normalizePath(cwd + '/' + target);
}

function getNode(path: string): FSNode | null {
  if (path === '/') return ROOT_FS;
  const parts = path.split('/').filter(Boolean);
  let cur: FSNode = ROOT_FS;
  for (const p of parts) {
    if (cur.type !== 'dir' || !cur.children[p]) return null;
    cur = cur.children[p];
  }
  return cur;
}

function displayPath(path: string): string {
  if (path === HOME) return '~';
  if (path.startsWith(HOME + '/')) return '~' + path.slice(HOME.length);
  return path;
}

function basename(path: string): string {
  return path.split('/').filter(Boolean).pop() ?? '/';
}

function fileColor(name: string, isDir: boolean): string {
  if (isDir) return 'text-blue-400';
  if (name.startsWith('.')) return 'text-gray-500';
  if (name.endsWith('.tsx') || name.endsWith('.ts')) return 'text-yellow-300';
  if (name.endsWith('.json')) return 'text-orange-300';
  if (name.endsWith('.scss') || name.endsWith('.css')) return 'text-pink-400';
  if (name.endsWith('.md')) return 'text-green-300';
  if (name.endsWith('.html')) return 'text-orange-400';
  if (name.endsWith('.js')) return 'text-yellow-400';
  return 'text-gray-200';
}

function fmtSize(n: number): string {
  if (n >= 1024 * 1024) return (n / 1024 / 1024).toFixed(1) + 'M';
  if (n >= 1024) return (n / 1024).toFixed(1) + 'K';
  return String(n);
}

// ─── Fortune messages ─────────────────────────────────────────────────────────

const FORTUNES = [
  'There are only two hard things in CS: cache invalidation and naming things. — Phil Karlton',
  'Any fool can write code a computer understands. Good programmers write code humans understand. — Fowler',
  'First, solve the problem. Then, write the code. — John Johnson',
  'Code is like humor. When you have to explain it, it\'s bad. — Cory House',
  'Make it work, make it right, make it fast. — Kent Beck',
  'The best error message is the one that never shows up. — Thomas Fuchs',
  'Debugging is twice as hard as writing the code in the first place. — Brian Kernighan',
  '"It works on my machine." — Every developer, ever',
  'A ship in port is safe, but that\'s not what ships are for. — Grace Hopper',
  'Talk is cheap. Show me the code. — Linus Torvalds',
  'Programs must be written for people to read, and only incidentally for machines to execute. — Abelson',
];

// ─── Component ────────────────────────────────────────────────────────────────

export const TerminalView = forwardRef<HTMLDivElement>((props, ref) => {
  const [history, setHistory]       = useState<HistoryEntry[]>([]);
  const [input, setInput]           = useState('');
  const [cwd, setCwd]               = useState(HOME);
  const [pendingSudo, setPendingSudo] = useState<string | null>(null);
  const [sudoAttempts, setSudoAttempts] = useState(0);
  const { resetEdits } = useEditContext();
  const { enabled, setEnabled } = useRenderer();

  const inputRef     = useRef<HTMLInputElement>(null);
  const cmdHistory   = useRef<string[]>([]);
  const historyIdx   = useRef(-1);
  const savedInput   = useRef('');

  const { t } = useLanguage();

  // ── Command executor ──────────────────────────────────────────────────────

  function execute(raw: string): void {
    const trimmed = raw.trim();
    if (!trimmed) return;

    cmdHistory.current.unshift(trimmed);
    historyIdx.current = -1;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const output = runCommand(cmd.toLowerCase(), args, trimmed);

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { command: trimmed, output, cwd }]);
    }
  }

  function runCommand(cmd: string, args: string[], raw: string): OutputLine[] {
    switch (cmd) {

      // ── Built-in portfolio commands ─────────────────────────────────────
      case 'help':
        return [
          `${t('terminal.helpTitle')}:`,
          `  help        — ${t('terminal.helpHelp')}`,
          `  about       — ${t('terminal.helpAbout')}`,
          `  skills      — ${t('terminal.helpSkills')}`,
          `  projects    — ${t('terminal.helpProjects')}`,
          `  contact     — ${t('terminal.helpContact')}`,
          `  whoami      — ${t('terminal.helpWhoami')}`,
          `  clear       — ${t('terminal.helpClear')}`,
          `  reset-edits — ${t('terminal.helpResetEdits')}`,
          `  extensions  — ${t('terminal.helpExtensions')}`,
          '',
          t('terminal.helpExtra'),
        ];

      case 'about':
        return [t('terminal.aboutLine1'), t('terminal.aboutLine2')];

      case 'skills':
        return [
          `Frontend : JavaScript, React, Vue.js, WordPress`,
          `Backend  : Java, Spring Boot, Node.js, PHP, Python`,
          `Database : MongoDB, SQL, NoSQL`,
          `Tools    : Git, Agile/SCRUM`,
        ];

      case 'projects':
        return [
          '1. Portfolio IDE              — VS Code-inspired portfolio (React/TS)',
          '2. Territoire Connecté Durable — IoT platform (Vue.js + Node.js)',
          '3. Chatterie Terre de Brasco  — Showcase site (PHP/WordPress)',
        ];

      case 'contact':
        return [
          `${t('terminal.contactEmail')}    : matthieumarin51@gmail.com`,
          `${t('terminal.contactLinkedin')} : linkedin.com/in/matthieu-marin-b46865267`,
          `${t('terminal.contactLocation')} : Saint-Quentin, Hauts-de-France`,
        ];

      case 'whoami':
        return [t('terminal.whoami')];

      case 'clear':
        return [];

      case 'reset-edits':
        setTimeout(() => resetEdits(), 0);
        return [{ text: 'All edits reset.', className: 'text-green-400' }];

      case 'extensions': {
        const sub = args[0];
        if (!sub || sub === '--help') {
          return ['usage: extensions <list|disable|enable> [extension-id]'];
        }

        if (sub === 'list') {
          const rendererLine = {
            text: `  ${enabled ? '✔ enabled ' : '✖ disabled'}  portfolio-renderer  — Matthieu Marin · v2.0.1`,
            className: enabled ? 'text-green-400' : 'text-red-400',
          };
          return ['Installed extensions:', rendererLine];
        }

        if (sub === 'disable' || sub === 'enable') {
          const id = args[1];
          if (!id) return ['usage: extensions <list|disable|enable> [extension-id]'];

          if (id === 'portfolio-renderer') {
            if (sub === 'disable') {
              setEnabled(false);
              return [{ text: "Extension 'portfolio-renderer' disabled. Reality unfiltered.", className: 'text-yellow-300' }];
            }
            setEnabled(true);
            return [{ text: "Extension 'portfolio-renderer' enabled. Back to human-readable.", className: 'text-green-400' }];
          }

          return [{ text: `Extension not found: ${id}`, className: 'text-red-400' }];
        }

        return ['usage: extensions <list|disable|enable> [extension-id]'];
      }

      // ── Navigation ───────────────────────────────────────────────────────
      case 'pwd':
        return [cwd];

      case 'cd': {
        const target = args[0] ?? HOME;
        const newPath = resolvePath(cwd, target);
        const node = getNode(newPath);
        if (!node) return [`cd: ${target}: No such file or directory`];
        if (node.type !== 'dir') return [`cd: ${target}: Not a directory`];
        setCwd(newPath);
        return [];
      }

      case 'ls': {
        const flags   = args.filter(a => a.startsWith('-'));
        const pathArg = args.find(a => !a.startsWith('-'));
        const target  = pathArg ? resolvePath(cwd, pathArg) : cwd;
        const node    = getNode(target);

        if (!node) return [`ls: ${pathArg ?? '.'}: No such file or directory`];
        if (node.type === 'file') {
          const name = pathArg ?? basename(target);
          return [{ text: name, className: fileColor(name, false) }];
        }

        const showAll  = flags.some(f => f.includes('a'));
        const longFmt  = flags.some(f => f.includes('l'));

        let entries = Object.entries(node.children);
        if (!showAll) entries = entries.filter(([n]) => !n.startsWith('.'));
        entries.sort(([a, an], [b, bn]) => {
          const da = an.type === 'dir', db = bn.type === 'dir';
          if (da !== db) return da ? -1 : 1;
          return a.localeCompare(b);
        });

        if (longFmt) {
          const header: OutputLine = { text: `total ${entries.length}`, className: 'text-gray-500' };
          const rows: OutputLine[] = entries.map(([name, n]) => {
            const isDir = n.type === 'dir';
            const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size  = isDir ? '4096' : fmtSize((n as FSFile).size).padStart(6);
            const mod   = n.modified;
            const label = isDir ? name + '/' : name;
            return {
              text: `${perms}  user  ${size}  ${mod}  ${label}`,
              className: fileColor(name, isDir),
            };
          });
          return [header, ...rows];
        }

        // Short format: names on one line
        const line: OutputLine[] = [];
        entries.forEach(([name, n], i) => {
          const isDir = n.type === 'dir';
          line.push({ text: (isDir ? name + '/' : name) + (i < entries.length - 1 ? '  ' : ''), className: fileColor(name, isDir) });
        });
        return line.length ? line : [];
      }

      // ── File reading ──────────────────────────────────────────────────────
      case 'cat': {
        if (!args.length) return ['cat: missing operand'];
        const lines: OutputLine[] = [];
        for (const a of args) {
          const p = resolvePath(cwd, a);
          const node = getNode(p);
          if (!node) { lines.push(`cat: ${a}: No such file or directory`); continue; }
          if (node.type === 'dir') { lines.push(`cat: ${a}: Is a directory`); continue; }
          const content = (node as FSFile).content;
          if (content) {
            content.split('\n').forEach(l => lines.push(l));
          } else {
            lines.push(`[binary file — ${fmtSize((node as FSFile).size)} bytes]`);
          }
        }
        return lines;
      }

      case 'head': {
        const nFlag = args.indexOf('-n');
        const n = nFlag >= 0 ? parseInt(args[nFlag + 1]) || 10 : 10;
        const file = args.find(a => !a.startsWith('-') && !/^\d+$/.test(a));
        if (!file) return ['head: missing operand'];
        const p = resolvePath(cwd, file);
        const node = getNode(p);
        if (!node || node.type === 'dir') return [`head: ${file}: No such file or directory`];
        const content = (node as FSFile).content ?? '';
        return content.split('\n').slice(0, n);
      }

      case 'tail': {
        const nFlag = args.indexOf('-n');
        const n = nFlag >= 0 ? parseInt(args[nFlag + 1]) || 10 : 10;
        const file = args.find(a => !a.startsWith('-') && !/^\d+$/.test(a));
        if (!file) return ['tail: missing operand'];
        const p = resolvePath(cwd, file);
        const node = getNode(p);
        if (!node || node.type === 'dir') return [`tail: ${file}: No such file or directory`];
        const content = (node as FSFile).content ?? '';
        return content.split('\n').slice(-n);
      }

      case 'wc': {
        const file = args.find(a => !a.startsWith('-'));
        if (!file) return ['wc: missing operand'];
        const p = resolvePath(cwd, file);
        const node = getNode(p);
        if (!node || node.type === 'dir') return [`wc: ${file}: No such file or directory`];
        const content = (node as FSFile).content ?? '';
        const lines = content.split('\n').length;
        const words = content.split(/\s+/).filter(Boolean).length;
        const bytes = (node as FSFile).size;
        return [`  ${lines}  ${words}  ${bytes} ${file}`];
      }

      case 'find': {
        const nameFlag = args.indexOf('-name');
        const pattern  = nameFlag >= 0 ? args[nameFlag + 1] : null;
        const startArg = args.find(a => !a.startsWith('-') && a !== args[nameFlag + 1]);
        const startPath = startArg ? resolvePath(cwd, startArg) : cwd;

        function walk(path: string, node: FSNode): string[] {
          const results: string[] = [];
          const rel = path.replace(cwd, '.') || '.';
          if (!pattern || rel.endsWith(pattern.replace('*', ''))) results.push(rel);
          if (node.type === 'dir') {
            for (const [name, child] of Object.entries(node.children)) {
              results.push(...walk(path + '/' + name, child));
            }
          }
          return results;
        }

        const startNode = getNode(startPath);
        if (!startNode) return [`find: '${startArg}': No such file or directory`];
        return walk(startPath, startNode).slice(0, 30);
      }

      case 'grep': {
        if (args.length < 2) return ['usage: grep <pattern> <file>'];
        const [pattern, fileArg] = args;
        const p = resolvePath(cwd, fileArg);
        const node = getNode(p);
        if (!node || node.type === 'dir') return [`grep: ${fileArg}: No such file or directory`];
        const content = (node as FSFile).content ?? '';
        const matches = content.split('\n').filter(l => l.includes(pattern));
        return matches.length
          ? matches.map(l => ({ text: l.replace(pattern, pattern), className: 'text-yellow-300' }))
          : [`grep: no matches for '${pattern}' in ${fileArg}`];
      }

      // ── Fake file ops ─────────────────────────────────────────────────────
      case 'mkdir':
        if (!args[0]) return ['mkdir: missing operand'];
        return [{ text: `mkdir: created directory '${args[0]}'`, className: 'text-green-400' }];

      case 'touch':
        if (!args[0]) return ['touch: missing operand'];
        return [{ text: `touched '${args[0]}'`, className: 'text-green-400' }];

      case 'rm': {
        if (!args.length) return ['rm: missing operand'];
        const file = args.find(a => !a.startsWith('-'));
        const protected_ = ['package.json', 'tsconfig.json', 'vite.config.ts', 'index.html', 'README.md'];
        if (file && protected_.some(f => file.endsWith(f))) {
          return [{ text: `rm: cannot remove '${file}': Operation not permitted`, className: 'text-red-400' }];
        }
        if (args.includes('-rf') && file === '/') {
          return [
            { text: 'rm: it is dangerous to operate recursively on \'/\'', className: 'text-red-400' },
            { text: 'rm: use --no-preserve-root to override this failsafe', className: 'text-red-400' },
            '(nice try)',
          ];
        }
        return [{ text: `removed '${file}'`, className: 'text-green-400' }];
      }

      case 'mv':
        if (args.length < 2) return ['mv: missing destination'];
        return [{ text: `'${args[0]}' -> '${args[1]}'`, className: 'text-green-400' }];

      case 'cp':
        if (args.length < 2) return ['cp: missing destination'];
        return [{ text: `'${args[0]}' -> '${args[1]}'`, className: 'text-green-400' }];

      // ── System info ───────────────────────────────────────────────────────
      case 'echo':
        return [args.join(' ')];

      case 'date': {
        const now = new Date();
        return [args.includes('-u')
          ? now.toUTCString()
          : now.toString()];
      }

      case 'uname':
        return [args.includes('-a')
          ? 'PortfolioOS 6.1.0 browser-kernel SMP PREEMPT x86_64 GNU/Linux'
          : 'PortfolioOS'];

      case 'env':
      case 'printenv':
        return [
          'NODE_ENV=production',
          'VITE_PORT=3000',
          'USER=user',
          'HOME=/portfolio',
          'SHELL=/bin/bash',
          'LANG=fr_FR.UTF-8',
          'EDITOR=code',
          'TERM=xterm-256color',
          'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
        ];

      case 'which': {
        const known: Record<string, string> = {
          node: '/usr/local/bin/node',
          npm: '/usr/local/bin/npm',
          git: '/usr/bin/git',
          bash: '/bin/bash',
          cat: '/bin/cat',
          ls: '/bin/ls',
          grep: '/bin/grep',
          find: '/usr/bin/find',
          code: '/usr/local/bin/code',
        };
        if (!args[0]) return ['which: missing argument'];
        return known[args[0]]
          ? [known[args[0]]]
          : [{ text: `which: no ${args[0]} in PATH`, className: 'text-red-400' }];
      }

      case 'history':
        return cmdHistory.current.length
          ? cmdHistory.current.slice(0, 20).map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`)
          : ['No command history yet.'];

      // ── Dev tools ─────────────────────────────────────────────────────────
      case 'node':
        if (args[0] === '-v' || args[0] === '--version') return ['v20.11.0'];
        if (args[0] === '-e') return ['[eval mode not supported in portfolio terminal]'];
        return [
          'Welcome to Node.js v20.11.0.',
          'Type ".exit" to exit.',
          '> ', '(interactive mode not available — this is a fake terminal)',
        ];

      case 'npm':
        if (!args[0]) return ['Usage: npm <command>'];
        if (args[0] === '-v' || args[0] === '--version') return ['10.2.4'];
        if (args[0] === 'run') {
          const script = args[1];
          if (script === 'dev')     return [{ text: '> vite --port 3000', className: 'text-green-400' }, '', '  VITE v6.3.5  ready in 312 ms', '', { text: '  ➜  Local:   http://localhost:3000/', className: 'text-cyan-400' }, { text: '  ➜  Network: use --host to expose', className: 'text-gray-400' }];
          if (script === 'build')   return [{ text: '> tsc -b && vite build', className: 'text-green-400' }, 'vite v6.3.5 building for production...', '✓ 2057 modules transformed.', { text: '✓ built in 2.45s', className: 'text-green-400' }];
          if (script === 'preview') return [{ text: '> vite preview', className: 'text-green-400' }, { text: '  ➜  Local:   http://localhost:4173/', className: 'text-cyan-400' }];
          return [{ text: `npm ERR! Missing script: "${script}"`, className: 'text-red-400' }];
        }
        if (args[0] === 'install' || args[0] === 'i') {
          return ['npm warn deprecated ...', { text: 'added 1247 packages in 12s', className: 'text-green-400' }];
        }
        if (args[0] === 'list' || args[0] === 'ls') {
          return ['portfolio@0.1.0', '├── motion@12.7.3', '├── react@18.3.1', '├── react-dom@18.3.1', '├── i18next@24.2.2', '├── lucide-react@0.468.0', '└── recharts@2.15.0'];
        }
        return [`npm: unknown command "${args[0]}"`];

      case 'git': {
        const sub = args[0];
        if (!sub) return ['usage: git <command> [<args>]'];
        if (sub === 'status') return [
          { text: 'On branch clean-figma-code', className: 'text-yellow-300' },
          'Your branch is up to date with \'origin/clean-figma-code\'.',
          '',
          'nothing to commit, working tree clean',
        ];
        if (sub === 'log') return [
          { text: 'commit 126a5ed  (HEAD -> clean-figma-code)', className: 'text-yellow-300' },
          'Author: Matthieu <matthieu.marin@example.com>',
          'Date:   Tue Apr  1 12:00:00 2026',
          '',
          '    add data',
          '',
          { text: 'commit 18ed35a', className: 'text-yellow-300' },
          '    refacto',
          '',
          { text: 'commit 949972c', className: 'text-yellow-300' },
          '    export figma to react',
        ];
        if (sub === 'branch') return [
          { text: '* clean-figma-code', className: 'text-green-400' },
          '  main',
        ];
        if (sub === 'diff') return ['(nothing to diff — working tree clean)'];
        if (sub === 'stash') return [{ text: 'Saved working directory and index state WIP on clean-figma-code', className: 'text-green-400' }];
        if (sub === 'pull') return [{ text: 'Already up to date.', className: 'text-green-400' }];
        if (sub === 'push') return [{ text: 'Everything up-to-date', className: 'text-green-400' }];
        if (sub === 'clone') return [{ text: `Cloning into '${args[1] ?? 'repo'}'...`, className: 'text-green-400' }, 'remote: Counting objects: 1247, done.', { text: 'Receiving objects: 100% (1247/1247), done.', className: 'text-green-400' }];
        return [`git: '${sub}' is not a git command. See 'git --help'.`];
      }

      // ── Network ───────────────────────────────────────────────────────────
      case 'ping': {
        const host = args.find(a => !a.startsWith('-')) ?? 'localhost';
        return [
          `PING ${host}: 56 data bytes`,
          `64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.042 ms`,
          `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.038 ms`,
          `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.041 ms`,
          '',
          `--- ${host} ping statistics ---`,
          `3 packets transmitted, 3 received, 0% packet loss`,
          { text: `round-trip min/avg/max = 0.038/0.040/0.042 ms`, className: 'text-green-400' },
        ];
      }

      case 'curl': {
        const url = args.find(a => !a.startsWith('-'));
        if (!url) return ['curl: no URL specified'];
        return [
          { text: `  % Total    % Received  Xferd  Average Speed`, className: 'text-gray-400' },
          { text: `100   342  100   342    0     0   8234      0`, className: 'text-green-400' },
          `{"status":"ok","message":"Hello from ${url}","timestamp":"${new Date().toISOString()}"}`,
        ];
      }

      case 'ssh':
        return [{ text: `ssh: connect to host ${args[0] ?? 'localhost'} port 22: Connection refused`, className: 'text-red-400' }];

      // ── Editors / IDE ─────────────────────────────────────────────────────
      case 'code':
        return args[0]
          ? [{ text: `Opening ${args[0]} in VS Code… (you're already in the portfolio IDE)`, className: 'text-blue-400' }]
          : [{ text: 'Launching VS Code… wait, you\'re already here.', className: 'text-blue-400' }];

      case 'vim':
      case 'vi':
        return [
          { text: '~', className: 'text-blue-400' },
          { text: '~', className: 'text-blue-400' },
          { text: '~  VIM — you are trapped. Type :q! to escape.', className: 'text-blue-400' },
          { text: '~  (but this isn\'t a real vim, so you\'re safe)', className: 'text-gray-500' },
        ];

      case 'nano':
        return ['  GNU nano  — [ New Buffer ]', '^X Exit  ^O Write  ^R Read', '(nano is simulated — edits don\'t persist here)'];

      case 'emacs':
        return [
          { text: 'GNU Emacs 29.1', className: 'text-purple-400' },
          'Welcome to the extensible, customizable editor.',
          '(C-x C-c to exit — good luck finding it)',
        ];

      // ── Process management ────────────────────────────────────────────────
      case 'ps':
        return [
          '  PID TTY          TIME CMD',
          { text: '    1 pts/0   00:00:00 bash', className: 'text-green-400' },
          '  420 pts/0   00:00:12 node (vite)',
          '  421 pts/0   00:00:01 npm run dev',
          '  999 pts/0   00:00:00 ps',
        ];

      case 'top':
        return [
          `top - ${new Date().toLocaleTimeString()}  up 1 day, 4:20`,
          'Tasks:   3 total,   1 running,   2 sleeping',
          '%Cpu(s):  4.2 us,  0.8 sy,  0.0 ni, 94.8 id',
          { text: 'MiB Mem :  16384.0 total,   4221.4 free,   6102.2 used', className: 'text-green-400' },
          '',
          '  PID USER      %CPU %MEM    TIME COMMAND',
          '  420 user   3.2  1.8   0:12 node',
        ];

      case 'kill':
        return [{ text: `bash: kill: (${args[0]}) - Operation not permitted`, className: 'text-red-400' }];

      // ── Misc ──────────────────────────────────────────────────────────────
      case 'sudo': {
        if (!args.length) return ['usage: sudo <command>'];
        // Trigger password prompt — actual handling is in handleSubmit
        setTimeout(() => {
          setPendingSudo(raw);
          setSudoAttempts(0);
        }, 0);
        return [];
      }

      case 'exit':
      case 'logout':
        return [{ text: t('terminal.exitMessage'), className: 'text-yellow-300' }];

      case 'man': {
        const topic = args[0];
        if (!topic) return ['What manual page do you want?'];
        const pages: Record<string, string[]> = {
          ls:  ['LS(1) — list directory contents', 'OPTIONS: -a all files, -l long format, -la both'],
          cd:  ['CD(1) — change directory', 'USAGE: cd [dir]   cd .. to go up, cd ~ to go home'],
          cat: ['CAT(1) — concatenate and print files', 'USAGE: cat [file...]'],
          git: ['GIT(1) — the stupid content tracker', 'SUBCOMMANDS: status, log, branch, diff, push, pull, clone, stash'],
          npm: ['NPM(1) — node package manager', 'USAGE: npm run dev|build|preview   npm install   npm list'],
          node:['NODE(1) — server-side JavaScript', 'VERSION: v20.11.0  (not interactive in this environment)'],
        };
        return pages[topic] ?? [`No manual entry for ${topic}`];
      }

      case 'alias':
        return [
          "alias ll='ls -la'",
          "alias gs='git status'",
          "alias gl='git log --oneline'",
          "alias nr='npm run'",
        ];

      case 'll':
        return runCommand('ls', ['-la', ...args], raw);

      case 'la':
        return runCommand('ls', ['-a', ...args], raw);

      // ── Easter eggs ───────────────────────────────────────────────────────
      case 'fortune':
        return [FORTUNES[Math.floor(Math.random() * FORTUNES.length)]];

      case 'cowsay': {
        const text = args.join(' ') || 'Moo!';
        const border = '-'.repeat(text.length + 2);
        return [
          ` ${border}`,
          `< ${text} >`,
          ` ${border}`,
          '        \\   ^__^',
          '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\',
          '                ||----w |',
          '                ||     ||',
        ];
      }

      case 'sl':
        return [
          '      ====        ________                ___________            ',
          '  _D _|  |_______/        \\__I_I_____===__|_________|            ',
          ' |(_)---  |   H\\________/ |   |        =|___ ___|      _______  ',
          ' /     |  |   H  |  |     |   |         ||_| |_||_)___(       \\ ',
          '/      |  |   H  |__--------------------| [___] |           oo  \\',
          '|      | _|_ H  \\ | |        [=======]  |     |           /  \\  /',
          '|  ______/   H  /   |        \\       /  |     |          /  \\  / ',
          '( \\        |  H / |  |         -------   |     |         /    \\   ',
          ' \\_________/   \\__/  |____/___________/  |_____|        /______\\  ',
          { text: '                    choo choo! 🚂', className: 'text-yellow-400' },
        ];

      case 'matrix':
        return [
          { text: '01001000 01100101 01101100 01101100 01101111', className: 'text-green-400' },
          { text: '00100000 01001110 01100101 01101111 00100001', className: 'text-green-500' },
          { text: '01010111 01100001 01101011 01100101 00100000', className: 'text-green-300' },
          { text: '01110101 01110000 00101100 00100000 01001110', className: 'text-green-400' },
          { text: '01100101 01101111 00101110 00100000 01010100', className: 'text-green-600' },
          { text: '01101000 01100101 00100000 01001101 01100001', className: 'text-green-400' },
          { text: '(The Matrix has you.)', className: 'text-green-300' },
        ];

      case 'hack':
        return [
          { text: 'Initiating hack sequence...', className: 'text-red-400' },
          { text: '[■■■■■■■■■■] Bypassing firewall... DONE', className: 'text-green-400' },
          { text: '[■■■■■■■■■■] Cracking RSA-2048......DONE', className: 'text-green-400' },
          { text: '[■■■■■■■■■■] Accessing mainframe.... DONE', className: 'text-green-400' },
          { text: '[■■■■■■■■■■] Downloading internet... DONE', className: 'text-green-400' },
          { text: 'ACCESS GRANTED. Welcome, Mr. Robot.', className: 'text-red-500' },
          { text: '(This is a portfolio. There is nothing to hack.)', className: 'text-gray-500' },
        ];

      default:
        return [`${cmd}: ${t('terminal.unknownCommand')}. ${t('terminal.unknownCommandHelp')}.`];
    }
  }

  // ── Keyboard handlers ────────────────────────────────────────────────────

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx.current === -1) savedInput.current = input;
      const next = historyIdx.current + 1;
      if (next < cmdHistory.current.length) {
        historyIdx.current = next;
        setInput(cmdHistory.current[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx.current <= 0) {
        historyIdx.current = -1;
        setInput(savedInput.current);
      } else {
        historyIdx.current -= 1;
        setInput(cmdHistory.current[historyIdx.current]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic path autocomplete
      const parts = input.split(' ');
      const partial = parts[parts.length - 1];
      if (partial) {
        const dir = partial.includes('/') ? resolvePath(cwd, partial.substring(0, partial.lastIndexOf('/') + 1)) : cwd;
        const prefix = partial.includes('/') ? partial.substring(partial.lastIndexOf('/') + 1) : partial;
        const node = getNode(dir);
        if (node?.type === 'dir') {
          const matches = Object.keys(node.children).filter(k => k.startsWith(prefix));
          if (matches.length === 1) {
            const isDir = node.children[matches[0]].type === 'dir';
            parts[parts.length - 1] = (partial.includes('/') ? partial.substring(0, partial.lastIndexOf('/') + 1) : '') + matches[0] + (isDir ? '/' : '');
            setInput(parts.join(' '));
          }
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setHistory(prev => [...prev, { command: input + '^C', output: [], cwd }]);
      setInput('');
      historyIdx.current = -1;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (pendingSudo !== null) {
      const password = input;
      setInput('');

      if (password === 'password') {
        setSudoAttempts(0);
        setPendingSudo(null);
        setHistory(prev => [...prev, {
          command: '',
          cwd,
          output: [
            { text: t('terminal.sudoSuccess1'), className: 'text-yellow-300' },
            { text: t('terminal.sudoSuccess2'), className: 'text-gray-400' },
          ],
        }]);
      } else {
        const next = sudoAttempts + 1;
        setSudoAttempts(next);
        if (next >= 3) {
          setPendingSudo(null);
          setSudoAttempts(0);
          setHistory(prev => [...prev, {
            command: '',
            cwd,
            output: [
              { text: t('terminal.sudoMaxAttempts'), className: 'text-red-400' },
              { text: t('terminal.sudoHint'), className: 'text-gray-500' },
            ],
          }]);
        } else {
          setHistory(prev => [...prev, {
            command: '',
            cwd,
            output: [{ text: t('terminal.sudoWrongPassword').replace('{n}', String(next)), className: 'text-red-400' }],
          }]);
        }
      }
      return;
    }

    if (input.trim()) {
      execute(input);
      setInput('');
    }
  }

  // ── Scroll to bottom ──────────────────────────────────────────────────────

  useEffect(() => {
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [history, ref]);

  // ── Welcome message ───────────────────────────────────────────────────────

  useEffect(() => {
    setHistory([{
      command: '',
      cwd: HOME,
      output: [
        { text: t('terminal.welcome') + ' 🚀', className: 'text-green-400' },
        t('terminal.help'),
        '',
      ],
    }]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="h-full font-mono text-sm" onClick={() => inputRef.current?.focus()}>
      {history.map((item, idx) => (
        <div key={idx} className="mb-1">
          {item.command && (
            <div className="flex gap-1 flex-wrap items-center">
              <span className="text-green-400">user@portfolio</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400">{displayPath(item.cwd)}</span>
              <span className="text-gray-300">$</span>
              <span className="text-white">{item.command}</span>
            </div>
          )}
          {item.output.map((line, li) => (
            <div key={li} className={typeof line === 'string' ? 'text-terminal-output' : line.className}>
              {typeof line === 'string' ? line : line.text}
            </div>
          ))}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-1 items-center flex-wrap">
        {pendingSudo ? (
          <span className="text-gray-300">{t('terminal.sudoPasswordPrompt')}</span>
        ) : (
          <>
            <span className="text-green-400">user@portfolio</span>
            <span className="text-gray-400">:</span>
            <span className="text-blue-400">{displayPath(cwd)}</span>
            <span className="text-gray-300">$</span>
          </>
        )}
        <input
          ref={inputRef}
          type={pendingSudo ? 'password' : 'text'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 bg-transparent outline-none text-white"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
});
