import { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TerminalProps {
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: string[];
}

export function Terminal({ onClose }: TerminalProps) {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const commands: { [key: string]: () => string[] } = {
    help: () => [
      'Commandes disponibles / Available commands:',
      '  help       - Affiche cette aide / Show this help',
      '  about      - À propos / About me',
      '  skills     - Compétences / Skills',
      '  projects   - Liste des projets / List projects',
      '  contact    - Informations de contact / Contact info',
      '  clear      - Efface le terminal / Clear terminal',
      '  theme      - Info sur le thème / Theme info',
      '  whoami     - Qui suis-je? / Who am I?',
    ],
    about: () => [
      language === 'fr' 
        ? 'Développeur Full Stack passionné par la création d\'applications web modernes.'
        : 'Full Stack Developer passionate about creating modern web applications.',
      language === 'fr'
        ? 'Spécialisé en React, TypeScript, Node.js et bien plus.'
        : 'Specialized in React, TypeScript, Node.js and more.',
    ],
    skills: () => [
      'Frontend: React, TypeScript, Tailwind CSS, Next.js',
      'Backend: Node.js, Express, PostgreSQL, MongoDB',
      'Tools: Git, Docker, VS Code, Figma',
      'Other: REST APIs, GraphQL, WebSockets',
    ],
    projects: () => [
      '1. Portfolio IDE - Ce portfolio interactif / This interactive portfolio',
      '2. E-commerce Platform - Application de commerce en ligne / Online shopping app',
      '3. Task Manager - Gestionnaire de tâches / Task management tool',
      '4. Weather Dashboard - Tableau de bord météo / Weather dashboard',
    ],
    contact: () => [
      'Email: contact@portfolio.dev',
      'GitHub: github.com/yourname',
      'LinkedIn: linkedin.com/in/yourname',
      'Twitter: @yourname',
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    theme: () => [
      language === 'fr'
        ? 'Interface inspirée de VS Code avec trois thèmes:'
        : 'VS Code inspired interface with three themes:',
      '- Dark (Violet/Noir)',
      '- Light',
      language === 'fr'
        ? '- Steampunk (avec rouages animés)'
        : '- Steampunk (with animated gears)',
    ],
    whoami: () => [
      language === 'fr'
        ? 'Un développeur qui aime transformer le café en code ☕→💻'
        : 'A developer who loves turning coffee into code ☕→💻',
    ],
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd] 
      ? commands[trimmedCmd]()
      : [`Commande inconnue: ${cmd}. Tapez 'help' pour voir les commandes disponibles.`];

    if (trimmedCmd !== 'clear') {
      setHistory(prev => [...prev, { command: cmd, output }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Afficher le message de bienvenue
    setHistory([{
      command: '',
      output: [
        t('terminal.welcome') + ' 🚀',
        t('terminal.help'),
        '',
      ]
    }]);
  }, []);

  return (
    <div className="h-full flex flex-col bg-terminal">
      <div className="bg-terminal-header border-b border-border px-4 py-2 flex items-center justify-between">
        <span className="text-sm">Terminal</span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-hover rounded">
            <Minus className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-hover rounded">
            <Square className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-hover rounded" onClick={onClose}>
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm text-terminal-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-2">
            {item.command && (
              <div className="flex gap-2">
                <span className="text-terminal-prompt">$</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output.map((line, lineIdx) => (
              <div key={lineIdx} className="text-terminal-output">
                {line}
              </div>
            ))}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className="text-terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-terminal-text"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}