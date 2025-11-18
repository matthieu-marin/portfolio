import { useState, useRef, useEffect, forwardRef } from 'react';
import { useLanguage } from '../../i18n/hooks';

interface CommandHistory {
  command: string;
  output: string[];
}

export const TerminalView = forwardRef<HTMLDivElement>((props, ref) => {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();

  const commands: { [key: string]: () => string[] } = {
    help: () => [
      `${t('terminal.helpTitle')}:`,
      `  help       - ${t('terminal.helpHelp')}`,
      `  about      - ${t('terminal.helpAbout')}`,
      `  skills     - ${t('terminal.helpSkills')}`,
      `  projects   - ${t('terminal.helpProjects')}`,
      `  contact    - ${t('terminal.helpContact')}`,
      `  clear      - ${t('terminal.helpClear')}`,
      `  whoami     - ${t('terminal.helpWhoami')}`,
    ],
    about: () => [
      t('terminal.aboutLine1'),
      t('terminal.aboutLine2'),
    ],
    skills: () => [
      `${t('terminal.skillsFrontend')}: React, TypeScript, Tailwind CSS, Next.js`,
      `${t('terminal.skillsBackend')}: Node.js, Express, PostgreSQL, MongoDB`,
      `${t('terminal.skillsTools')}: Git, Docker, VS Code`,
      `${t('terminal.skillsOther')}: REST APIs, GraphQL, WebSockets`,
    ],
    projects: () => [
      `1. Portfolio IDE - ${t('terminal.project1Desc')}`,
      `2. E-commerce Platform - ${t('terminal.project2Desc')}`,
      `3. Task Manager - ${t('terminal.project3Desc')}`,
      `4. Weather Dashboard - ${t('terminal.project4Desc')}`,
    ],
    contact: () => [
      'Email: matthieu.marin@example.com',
      'GitHub: github.com/matthieumarin',
      'LinkedIn: linkedin.com/in/matthieu-marin-b46865267',
      'Location: Paris, France',
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    whoami: () => [
      t('terminal.whoami'),
    ],
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd] 
      ? commands[trimmedCmd]()
      : [`${t('terminal.unknownCommand')}: ${cmd}. ${t('terminal.unknownCommandHelp')}.`];

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
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [history, ref]);

  useEffect(() => {
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
    <div
      className="h-full"
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
  );
});

