import { GitBranch, GitCommitHorizontal } from 'lucide-react';

const BRANCH = 'fix/visual';
const AHEAD = 1;
const BEHIND = 0;
const COMMITS = [
  'chore: full scan-driven cleanup + bug fixes + build/perf upgrades',
  'fix: several visual fixes + scan-driven cleanup',
  'feat: refacto 2026-05-22 — layout primitives + Cmd+K + theme detection',
  'feat: add contact provider + formspree support',
  'feat: add Skills and Experience pages',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2 px-3 font-mono">
      {children}
    </p>
  );
}

export function GitPanel() {
  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col overflow-hidden flex-shrink-0">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
          Source Control
        </span>
      </div>

      <div className="flex-1 overflow-auto py-3 space-y-5">
        {/* Branch */}
        <div>
          <SectionLabel>Branch</SectionLabel>
          <div className="px-3 flex items-center gap-2 text-xs font-mono">
            <GitBranch className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            <span className="text-foreground truncate">{BRANCH}</span>
          </div>
          <p className="px-3 mt-1 text-[11px] opacity-50 font-mono">
            ↑ {AHEAD} &nbsp;&nbsp; ↓ {BEHIND}
          </p>
        </div>

        {/* Changes */}
        <div>
          <SectionLabel>Changes</SectionLabel>
          <p className="px-3 text-[11px] opacity-40 italic font-mono">
            No changes — working tree clean
          </p>
        </div>

        {/* Commits */}
        <div>
          <SectionLabel>Recent commits</SectionLabel>
          <ul className="space-y-1">
            {COMMITS.map((msg, i) => (
              <li
                key={i}
                className="px-3 flex items-start gap-2 text-[11px] font-mono"
                style={{ opacity: Math.max(0.2, 1 - i * 0.18) }}
              >
                <GitCommitHorizontal className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-60" />
                <span className="truncate opacity-70">{msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
