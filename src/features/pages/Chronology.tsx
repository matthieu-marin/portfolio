import { GitBranch } from 'lucide-react';
import { cn } from '../../shared/components/ui/utils';
import {
  PageShell,
  CodeCard,
  ClassHeader,
  ClassBody,
  ClassClose,
} from '../../shared/components/layout';

// ─── Column x positions ────────────────────────────────────────────
const MX = 36  // main  (purple)
const SX = 90  // école (blue)
const WX = 144 // travail (green)

// ─── Colors ────────────────────────────────────────────────────────
const CM = '#cba6f7'
const CS = '#89b4fa'
const CW = '#a6e3a1'

// ─── SVG dimensions ────────────────────────────────────────────────
const SW = 168
const SH = 560

// ─── Y positions (top = newest, bottom = oldest) ───────────────────
const Y = {
  head:     30,   // 2026 — HEAD (en cours)
  master:   100,  // Master Cloud Computing (école, ongoing)
  renault:  148,  // Alternance Renault Digital (travail, ongoing)
  mFork:    200,  // fork sur main → Master + Renault (sept. 2024)
  lMerge:   238,  // merge sur main ← Licence + Faubourg (août 2024)
  licence:  318,  // Licence Pro INSSET (école)
  faubourg: 360,  // Alternance Faubourg Numérique (travail)
  lFork:    415,  // fork sur main → Licence + Faubourg (sept. 2023)
  bts:      468,  // BTS SIO option B (école)
  init:     535,  // Initial commit — sept. 2021
}

// ─── Bezier helper ─────────────────────────────────────────────────
function bez(x1: number, y1: number, x2: number, y2: number) {
  const cy = (y1 + y2) / 2
  return `M ${x1} ${y1} C ${x1} ${cy} ${x2} ${cy} ${x2} ${y2}`
}

// ─── Commit data ───────────────────────────────────────────────────
interface Commit {
  x: number
  y: number
  color: string
  isMain: boolean
  title: string
  sub: string
  period?: string
  navEvent?: string   // dispatched on Ctrl+clic
  navLabel?: string   // shown in tooltip
}

const COMMITS: Commit[] = [
  {
    x: MX, y: Y.head, color: CM, isMain: true,
    title: 'HEAD — fix/visual',
    sub: 'Portfolio IDE — en cours',
    period: '2026',
  },
  {
    x: SX, y: Y.master, color: CS, isMain: false,
    title: 'Master Cloud Computing & Mobility',
    sub: 'UPJV / INSSET — Saint-Quentin',
    period: '2024 – 2026',
    navEvent: 'navigate-to-about',
    navLabel: 'About → Formation',
  },
  {
    x: WX, y: Y.renault, color: CW, isMain: false,
    title: 'Alternance Renault Digital',
    sub: 'Développeur full-stack',
    period: '2024 →',
    navEvent: 'navigate-to-experience',
    navLabel: 'Experience → Renault',
  },
  {
    x: MX, y: Y.lMerge, color: CM, isMain: true,
    title: 'Licence Pro obtenue',
    sub: 'merge: école + alternance',
    period: 'août 2024',
  },
  {
    x: SX, y: Y.licence, color: CS, isMain: false,
    title: 'Licence Pro — Dev Web & Mobile',
    sub: 'UPJV / INSSET — Saint-Quentin',
    period: '2023 – 2024',
    navEvent: 'navigate-to-about',
    navLabel: 'About → Formation',
  },
  {
    x: WX, y: Y.faubourg, color: CW, isMain: false,
    title: 'Alternance Faubourg Numérique',
    sub: 'Développeur web',
    period: '2023 – 2024',
    navEvent: 'navigate-to-experience',
    navLabel: 'Experience → Faubourg',
  },
  {
    x: MX, y: Y.lFork, color: CM, isMain: true,
    title: 'BTS SIO obtenu',
    sub: 'fork: Licence Pro + alternance',
    period: 'juin 2023',
  },
  {
    x: SX, y: Y.bts, color: CS, isMain: false,
    title: 'BTS SIO option B',
    sub: 'Lycée Paul Claudel — Laon',
    period: '2021 – 2023',
    navEvent: 'navigate-to-about',
    navLabel: 'About → Formation',
  },
  {
    x: MX, y: Y.init, color: CM, isMain: true,
    title: 'Initial commit',
    sub: 'début du parcours',
    period: 'sept. 2021',
  },
]

// ─── Component ─────────────────────────────────────────────────────
export function Chronology() {
  const handleCommitClick = (commit: Commit) => (e: React.MouseEvent) => {
    if ((e.ctrlKey || e.metaKey) && commit.navEvent) {
      window.dispatchEvent(new CustomEvent(commit.navEvent))
    }
  }

  return (
    <PageShell commentTitle="Chronologie.tsx" commentEditKey="chronology.title">
      <CodeCard accentColor="purple" delay={0.1}>
        <ClassHeader icon={GitBranch} title="Timeline" titleEditKey="chronology.class" />
        <ClassBody>
          {/* Légende */}
          <div className="flex items-center gap-6 mb-6 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: CM }} />
              <span className="opacity-60">main</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: CS }} />
              <span className="opacity-60">école</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: CW }} />
              <span className="opacity-60">alternance</span>
            </span>
            <span className="opacity-30 ml-auto">⌃ Ctrl+clic pour naviguer</span>
          </div>

          <div className="flex overflow-x-auto">
            {/* ── SVG Graph ── */}
            <svg
              width={SW}
              height={SH}
              className="shrink-0 block"
              aria-hidden="true"
            >
              {/* Main trunk */}
              <line x1={MX} y1={Y.head} x2={MX} y2={Y.init}
                stroke={CM} strokeWidth={2} />

              {/* School dashed — ongoing Master */}
              <line x1={SX} y1={Y.head} x2={SX} y2={Y.master}
                stroke={CS} strokeWidth={2} strokeDasharray="3 3" />

              {/* Work dashed — ongoing Renault */}
              <line x1={WX} y1={Y.head} x2={WX} y2={Y.renault}
                stroke={CW} strokeWidth={2} strokeDasharray="3 3" />

              {/* Fork main → Master (école) */}
              <path d={bez(MX, Y.mFork, SX, Y.master)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Fork main → Renault (travail) */}
              <path d={bez(MX, Y.mFork, WX, Y.renault)}
                fill="none" stroke={CW} strokeWidth={2} />

              {/* Merge Licence école → main */}
              <path d={bez(SX, Y.licence, MX, Y.lMerge)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Merge Faubourg travail → main */}
              <path d={bez(WX, Y.faubourg, MX, Y.lMerge)}
                fill="none" stroke={CW} strokeWidth={2} />

              {/* Fork main → Licence (école) */}
              <path d={bez(MX, Y.lFork, SX, Y.licence)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Fork main → Faubourg (travail) */}
              <path d={bez(MX, Y.lFork, WX, Y.faubourg)}
                fill="none" stroke={CW} strokeWidth={2} />

              {/* BTS arch: fork from init, commit, merge back at lFork */}
              <path d={bez(MX, Y.init, SX, Y.bts)}
                fill="none" stroke={CS} strokeWidth={2} />
              <path d={bez(SX, Y.bts, MX, Y.lFork)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Commit dots */}
              {COMMITS.map((c, i) => (
                <circle
                  key={i}
                  cx={c.x}
                  cy={c.y}
                  r={c.isMain ? 6 : 5}
                  fill={c.color}
                />
              ))}
            </svg>

            {/* ── Text labels ── */}
            <div className="relative flex-1" style={{ minHeight: SH }}>
              {COMMITS.map((c, i) => (
                <div
                  key={i}
                  className={cn(
                    'absolute font-mono select-none',
                    c.navEvent
                      ? 'cursor-pointer group'
                      : ''
                  )}
                  style={{ left: 16, top: c.y - 17 }}
                  onClick={c.navEvent ? handleCommitClick(c) : undefined}
                  title={c.navEvent ? '⌃ Ctrl+clic pour naviguer' : undefined}
                >
                  <div className="text-xs leading-snug">
                    <span style={{ color: c.color }} className="font-medium">
                      {c.title}
                    </span>
                    {c.period && (
                      <span className="text-muted-foreground ml-2 text-[10px] opacity-60">
                        · {c.period}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-muted-foreground/50 leading-tight">
                    {c.sub}
                  </div>
                  {c.navEvent && (
                    <div className="text-[9px] text-muted-foreground/25 opacity-0 group-hover:opacity-100 transition-opacity">
                      ⌃ Ctrl+clic → {c.navLabel}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ClassBody>
        <ClassClose />
      </CodeCard>
    </PageShell>
  )
}
