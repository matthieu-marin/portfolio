import { GitBranch } from 'lucide-react';
import { cn } from '../../shared/components/ui/utils';
import { useLanguage } from '../../i18n/hooks';
import { RecruiterShell, Section } from './recruiter/primitives';

// ─── Column x positions ────────────────────────────────────────────
const MX = 36  // main  (trunk)
const SX = 90  // école
const WX = 144 // travail

// ─── Colors — variables de thème, jamais d'hex en dur ──────────────
const CM = 'var(--syntax-keyword)'
const CS = 'var(--syntax-property)'
const CW = 'var(--syntax-string)'

// ─── SVG dimensions ────────────────────────────────────────────────
const SW = 168
const SH = 590

// ─── Y positions (top = newest, bottom = oldest) ───────────────────
const Y = {
  head:      30,  // 2026 — HEAD (aujourd'hui)
  mMerge:    78,  // merge sur main ← Master + Renault (août 2026)
  master:   140,  // Master Cloud Computing & Mobility (école)
  renault:  188,  // Alternance Renault Digital (travail)
  mFork:    236,  // fork sur main → Master + Renault (sept. 2024)
  lMerge:   274,  // merge sur main ← Licence + Faubourg (août 2024)
  licence:  336,  // Licence Pro INSSET (école)
  faubourg: 380,  // Stage Faubourg Numérique (travail)
  lFork:    428,  // fork sur main → Licence + Faubourg (sept. 2023)
  bts:      470,  // BTS SIO option B (école)
  chatterie: 514, // Stages Chatterie ×2 (travail)
  init:     560,  // Initial commit — sept. 2021
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
  navEvent?: string   // dispatched au clic
  navLabel?: string   // shown in tooltip
}

const COMMITS: Commit[] = [
  {
    x: MX, y: Y.head, color: CM, isMain: true,
    title: 'HEAD',
    sub: 'aujourd\'hui',
    period: '2026 →',
  },
  {
    x: MX, y: Y.mMerge, color: CM, isMain: true,
    title: 'Master obtenu · alternance terminée',
    sub: 'merge: école + alternance',
    period: 'août 2026',
  },
  {
    x: SX, y: Y.master, color: CS, isMain: false,
    title: 'Master Cloud Computing & Mobility',
    sub: 'UPJV / INSSET, Saint-Quentin',
    period: '2024 – 2026',
    navEvent: 'navigate-to-about',
    navLabel: 'About → Formation',
  },
  {
    x: WX, y: Y.renault, color: CW, isMain: false,
    title: 'Alternance Renault Digital',
    sub: 'Développeur · données véhicule électrique',
    period: '2024 – 2026',
    navEvent: 'navigate-to-experience',
    navLabel: 'Experience → Renault',
  },
  {
    x: MX, y: Y.lMerge, color: CM, isMain: true,
    title: 'Licence Pro obtenue',
    sub: 'merge: école + stage',
    period: 'août 2024',
  },
  {
    x: SX, y: Y.licence, color: CS, isMain: false,
    title: 'Licence Pro Dev Web & Mobile',
    sub: 'UPJV / INSSET, Saint-Quentin',
    period: '2023 – 2024',
    navEvent: 'navigate-to-about',
    navLabel: 'About → Formation',
  },
  {
    x: WX, y: Y.faubourg, color: CW, isMain: false,
    title: 'Stage Faubourg Numérique',
    sub: 'Plateforme IoT Territoire Connecté Durable',
    period: 'mai – août 2024',
    navEvent: 'navigate-to-experience',
    navLabel: 'Experience → Faubourg',
  },
  {
    x: SX, y: Y.bts, color: CS, isMain: false,
    title: 'BTS SIO option B',
    sub: 'Lycée Paul Claudel, Laon',
    period: '2021 – 2023',
    navEvent: 'navigate-to-about',
    navLabel: 'About → Formation',
  },
  {
    x: WX, y: Y.chatterie, color: CW, isMain: false,
    title: 'Stages Chatterie ×2',
    sub: 'Site vitrine PHP/MySQL',
    period: '2022 – 2023',
    navEvent: 'navigate-to-experience',
    navLabel: 'Experience → Chatterie',
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
  const { t } = useLanguage();

  const handleCommitClick = (commit: Commit) => () => {
    if (commit.navEvent) {
      window.dispatchEvent(new CustomEvent(commit.navEvent))
    }
  }

  return (
    <RecruiterShell>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {t('nav.chronology')}
      </h1>
      <Section icon={GitBranch} title={t('recruiter.chronology.title')} index={0}>
        <>
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
              <span className="opacity-60">travail</span>
            </span>
            <span className="opacity-30 ml-auto hidden sm:inline">clic pour naviguer</span>
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

              {/* Master (école) : fork sept. 2024 → merge août 2026 */}
              <path d={bez(MX, Y.mFork, SX, Y.master)}
                fill="none" stroke={CS} strokeWidth={2} />
              <path d={bez(SX, Y.master, MX, Y.mMerge)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Renault (travail) : fork sept. 2024 → merge août 2026 */}
              <path d={bez(MX, Y.mFork, WX, Y.renault)}
                fill="none" stroke={CW} strokeWidth={2} />
              <path d={bez(WX, Y.renault, MX, Y.mMerge)}
                fill="none" stroke={CW} strokeWidth={2} />

              {/* Licence (école) : fork sept. 2023 → merge août 2024 */}
              <path d={bez(MX, Y.lFork, SX, Y.licence)}
                fill="none" stroke={CS} strokeWidth={2} />
              <path d={bez(SX, Y.licence, MX, Y.lMerge)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Faubourg (travail) : fork sept. 2023 → merge août 2024 */}
              <path d={bez(MX, Y.lFork, WX, Y.faubourg)}
                fill="none" stroke={CW} strokeWidth={2} />
              <path d={bez(WX, Y.faubourg, MX, Y.lMerge)}
                fill="none" stroke={CW} strokeWidth={2} />

              {/* BTS arch : fork à l'init, merge au lFork */}
              <path d={bez(MX, Y.init, SX, Y.bts)}
                fill="none" stroke={CS} strokeWidth={2} />
              <path d={bez(SX, Y.bts, MX, Y.lFork)}
                fill="none" stroke={CS} strokeWidth={2} />

              {/* Chatterie arch : stages pendant le BTS */}
              <path d={bez(MX, Y.init, WX, Y.chatterie)}
                fill="none" stroke={CW} strokeWidth={2} />
              <path d={bez(WX, Y.chatterie, MX, Y.lFork)}
                fill="none" stroke={CW} strokeWidth={2} />

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
                  title={c.navEvent ? 'clic pour naviguer' : undefined}
                >
                  <div className="text-xs leading-snug">
                    <span style={{ color: c.color }} className="font-medium group-hover:underline">
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
                      clic → {c.navLabel}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      </Section>
    </RecruiterShell>
  )
}
