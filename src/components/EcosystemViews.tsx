import React, { useState } from 'react'
import {
  ArrowRight,
  Compass,
  Cpu,
  GitBranch,
  Award,
  ShieldAlert,
  Layers,
  Bot,
  Info,
  ChevronRight,
  Sparkles,
  Search,
} from 'lucide-react'
import { ReactorsView } from './ReactorsView'

export type NavSection = 'home' | 'app' | 'deep' | 'futarchy' | 'markets' | 'risk'

interface EcosystemSectionsProps {
  onNavigate: (section: NavSection) => void
  onCreateMarket?: () => void
}

const ProcessMotionVector: React.FC<{ id: NavSection; accent: string }> = ({
  id,
  accent,
}) => {
  switch (id) {
    case 'app':
      // 01 · Explorer Motif: Shares (Outcome share split & conditional unit price)
      return (
        <div className="my-3 w-full space-y-1.5">
          <div className="flex items-center justify-between text-[11.5px] theme-font-mono">
            <span className="text-[#E9E9F5] font-semibold">YES 68¢</span>
            <span className="text-[#8A8A94]">SHARES</span>
            <span className="text-[#9C6FF2] font-semibold">NO 32¢</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#101013] overflow-hidden flex gap-0.5 p-0.5 border border-[#9C6FF2]/25">
            <div
              className="h-full rounded-l-full"
              style={{ width: '68%', backgroundColor: accent }}
            />
            <div
              className="h-full rounded-r-full bg-[#9C6FF2]/45"
              style={{ width: '32%' }}
            />
          </div>
          <div className="text-[11.5px] theme-font-mono text-[#8A8A94] truncate">
            50% · 6.3¢ of 12.5¢
          </div>
        </div>
      )

    case 'deep':
      // 02 · High-Cardinality Motif: Forecasts (Evaluator score distribution 8.14/10)
      return (
        <div className="my-3 w-full space-y-1">
          <div className="flex items-center justify-between text-[11.5px] theme-font-mono">
            <span className="text-[#8A8A94]">FORECAST</span>
            <span className="text-[#E9E9F5] font-bold">8.14/10</span>
          </div>
          <svg viewBox="0 0 180 34" className="w-full h-8 overflow-visible">
            <path
              d="M 4 30 L 176 30"
              fill="none"
              stroke="#8A8A94"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <path
              d="M 6 29 C 38 29, 64 26, 92 16 C 114 8, 132 6, 146 12 C 158 18, 168 26, 176 29"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="138"
              y1="6"
              x2="138"
              y2="30"
              stroke="#34D399"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <circle cx="138" cy="8" r="3.2" fill="#34D399" />
          </svg>
        </div>
      )

    case 'futarchy':
      // 03 · Governance Motif: A Decision Fork (Conditional Pass vs. Fail trajectories)
      return (
        <div className="my-3 w-full space-y-1">
          <div className="flex items-center justify-between text-[11.5px] theme-font-mono">
            <span className="text-[#34D399] font-semibold">PASS +19.3%</span>
            <span className="text-[#FB7185] font-semibold">FAIL -16.2%</span>
          </div>
          <svg viewBox="0 0 180 36" className="w-full h-8 overflow-visible">
            {/* Decision Fork Stem */}
            <path
              d="M 6 18 L 52 18"
              fill="none"
              stroke="#E9E9F5"
              strokeWidth="1.8"
            />
            {/* Pass Branch (Upward) */}
            <path
              d="M 52 18 C 82 18, 104 7, 172 7"
              fill="none"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Fail Branch (Downward) */}
            <path
              d="M 52 18 C 82 18, 104 29, 172 29"
              fill="none"
              stroke="#FB7185"
              strokeWidth="1.6"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            {/* Fork Node */}
            <circle cx="52" cy="18" r="3.5" fill={accent} stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="172" cy="7" r="2.8" fill="#34D399" />
            <circle cx="172" cy="29" r="2.5" fill="#FB7185" />
          </svg>
        </div>
      )

    case 'markets':
      // 04 · Curation Motif: Conditional Share Forecast (50% · 6.3¢ of 12.5¢)
      return (
        <div className="my-3 w-full space-y-1.5">
          <div className="flex items-center justify-between text-[11.5px] theme-font-mono">
            <span className="text-[#38BDF8] font-bold">50%</span>
            <span className="text-[#E9E9F5] font-semibold">6.3¢ of 12.5¢</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#101013] overflow-hidden border border-[#38BDF8]/30 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8]"
              style={{ width: '50%' }}
            />
          </div>
          <div className="text-[11.5px] theme-font-mono text-[#8A8A94] truncate">
            1/8 Cohort Base · 12.5¢
          </div>
        </div>
      )

    case 'risk':
    default:
      // 05 · Exposure Motif: Comparative Protocol Risk Readout
      return (
        <div className="my-3 w-full space-y-1.5">
          <div className="flex items-center justify-between text-[11.5px] theme-font-mono">
            <span className="text-[#34D399] font-semibold">AAVE 1.2%</span>
            <span className="text-[#FB7185] font-semibold">BRIDGE 8.7%</span>
          </div>
          <svg viewBox="0 0 180 32" className="w-full h-7 overflow-visible">
            <path
              d="M 4 24 Q 44 22, 88 24 T 176 23"
              fill="none"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 4 12 Q 36 4, 72 13 T 140 8 T 176 10"
              fill="none"
              stroke="#FB7185"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )
  }
}

/* ======================================================================
 * SEER PROTOCOL ECOSYSTEM MAP & ARCHITECTURE LAYER
 * Matches swiftbotlab.github.io/seer-six/home/ protocol interactive layer
 * ====================================================================== */
const ORIGINAL_CARDS = [
  {
    id: 'app' as NavSection,
    tag: '01 · EXPLORER',
    title: 'Seer App',
    subtitle: 'The Etherscan of Seer Markets',
    icon: Compass,
    accent: '#7D33FF',
  },
  {
    id: 'deep' as NavSection,
    tag: '02 · HIGH-CARDINALITY',
    title: 'Deep',
    subtitle: 'Multi-Outcome & AI Agent Markets',
    icon: Cpu,
    accent: '#8F55F7',
  },
  {
    id: 'futarchy' as NavSection,
    tag: '03 · GOVERNANCE',
    title: 'Futarchy',
    subtitle: 'Conditional DAO Decision Signals',
    icon: GitBranch,
    accent: '#9C6FF2',
  },
  {
    id: 'markets' as NavSection,
    tag: '04 · CURATION',
    title: 'Opportunity Markets',
    subtitle: 'Submission & Selection Signals',
    icon: Award,
    accent: '#38BDF8',
  },
  {
    id: 'risk' as NavSection,
    tag: '05 · EXPOSURE',
    title: 'Risk Pricing',
    subtitle: 'Comparative DeFi Risk Estimates',
    icon: ShieldAlert,
    accent: '#8F55F7',
  },
]

const ECOSYSTEM_GROUPS = [
  { id: 'markets', label: 'MARKET TYPES' },
  { id: 'tokens', label: 'OUTCOME TOKENS' },
  { id: 'truth', label: 'ANSWERS' },
  { id: 'collateral', label: 'COLLATERAL' },
  { id: 'chains', label: 'CHAINS' },
]

interface PrimitiveItem {
  groupId: string
  id: string
  name: string
  desc: string
}

const ECOSYSTEM_PRIMS: PrimitiveItem[] = [
  {
    groupId: 'markets',
    id: 'categorical',
    name: 'Categorical',
    desc: 'One outcome wins. Each outcome has a token, and the prices add up to 1.',
  },
  {
    groupId: 'markets',
    id: 'multi-categorical',
    name: 'Multi-categorical',
    desc: 'Several outcomes can be true at once. The payout is split between them.',
  },
  {
    groupId: 'markets',
    id: 'scalar',
    name: 'Scalar',
    desc: 'A number inside a range, traded as a pair of DOWN and UP tokens. Deep runs one per proposal: a score for every entry.',
  },
  {
    groupId: 'markets',
    id: 'multi-scalar',
    name: 'Multi-scalar',
    desc: "One token per item, and each redeems its number's share of the total: a share per chain, a weight per dependency.",
  },
  {
    groupId: 'markets',
    id: 'conditional',
    name: 'Conditional markets',
    desc: "A market collateralised by another market's outcome token, so it only pays out if that outcome happens. Futarchy is built from these.",
  },
  {
    groupId: 'tokens',
    id: 'ctf',
    name: 'Conditional Tokens',
    desc: 'Gnosis Conditional Tokens: every outcome is an ERC-1155 position, backed one to one by collateral.',
  },
  {
    groupId: 'tokens',
    id: 'erc20',
    name: 'ERC-20 wrapping',
    desc: 'Each position is wrapped as an ERC-20, so it trades on ordinary pools and shows up in any wallet.',
  },
  {
    groupId: 'truth',
    id: 'reality',
    name: 'Reality.eth',
    desc: "Anyone can answer a market's question by posting a bond. A different answer has to double it.",
  },
  {
    groupId: 'truth',
    id: 'kleros',
    name: 'Kleros arbitration',
    desc: 'If an answer is contested, Kleros jurors rule on it and the ruling settles the question.',
  },
  {
    groupId: 'truth',
    id: 'curate',
    name: 'Kleros Curate',
    desc: 'Markets are listed for verification, and anyone can challenge a market that is badly posed.',
  },
  {
    groupId: 'collateral',
    id: 'sDAI',
    name: 'sDAI',
    desc: 'Savings DAI. Collateral keeps earning the DAI savings rate while it sits in a market.',
  },
  {
    groupId: 'collateral',
    id: 'xDAI',
    name: 'xDAI',
    desc: "Gnosis Chain's native token, wrapped to sDAI when it is used as collateral.",
  },
  {
    groupId: 'collateral',
    id: 'sUSDS',
    name: 'sUSDS',
    desc: 'Savings USDS. It earns the Sky savings rate, which is why Deep uses it on OP Mainnet.',
  },
  {
    groupId: 'chains',
    id: 'ethereum',
    name: 'Ethereum',
    desc: 'Ethereum mainnet. Seer markets and their outcome tokens live on four chains.',
  },
  {
    groupId: 'chains',
    id: 'optimism',
    name: 'OP Mainnet',
    desc: "OP Mainnet, where Deep's high-volume rounds run with low fees.",
  },
  {
    groupId: 'chains',
    id: 'gnosis',
    name: 'Gnosis',
    desc: 'Gnosis Chain, where Seer started. Most governance and grant markets live here.',
  },
  {
    groupId: 'chains',
    id: 'base',
    name: 'Base',
    desc: 'Base. The same contracts and the same market format as on the other three chains.',
  },
]

const ALL_PRIM_IDS = ECOSYSTEM_PRIMS.map((p) => p.id)

const APP_USES: Record<string, string[]> = {
  app: ALL_PRIM_IDS,
  deep: ['scalar', 'ctf', 'erc20', 'reality', 'kleros', 'sUSDS', 'optimism'],
  futarchy: [
    'categorical',
    'scalar',
    'conditional',
    'ctf',
    'erc20',
    'reality',
    'kleros',
    'sDAI',
    'gnosis',
    'ethereum',
  ],
  markets: ['multi-categorical', 'ctf', 'erc20', 'reality', 'kleros', 'curate', 'sDAI', 'gnosis'],
  opportunity: ['multi-categorical', 'ctf', 'erc20', 'reality', 'kleros', 'curate', 'sDAI', 'gnosis'],
  risk: ['multi-categorical', 'ctf', 'erc20', 'reality', 'kleros', 'sDAI', 'ethereum'],
}

const APP_READOUT_DETAILS: Record<
  string,
  { headline: string; description: string; marketId: string; marketLabel: string }
> = {
  app: {
    headline: 'The explorer for every market',
    description:
      'Every market on every chain, in every type and state, with its contracts, answer, events and holders. A block explorer for questions.',
    marketId: '2832',
    marketLabel: '#2832 · Categorical',
  },
  deep: {
    headline: 'Many outcomes, priced at once',
    description:
      'Rounds of scalar markets on OP Mainnet in sUSDS: one UP/DOWN pair per entry prices a score for every entry in a large field, so forecasting agents can trade hundreds of outcomes in one batch.',
    marketId: '2841',
    marketLabel: '#2841 · Scalar',
  },
  futarchy: {
    headline: 'What a decision would do',
    description:
      'A decision market plus two conditional price markets: the token price if a proposal passes, and if it does not. The gap informs the DAO; the vote still decides.',
    marketId: '2843',
    marketLabel: '#2843 · Conditional',
  },
  markets: {
    headline: 'Which entries will be selected',
    description:
      "Multi-categorical markets on which submissions a panel will fund: traders predict the reviewers' choices, and the market surfaces the cohort to watch.",
    marketId: '2842',
    marketLabel: '#2842 · Multi-categorical',
  },
  opportunity: {
    headline: 'Which entries will be selected',
    description:
      "Multi-categorical markets on which submissions a panel will fund: traders predict the reviewers' choices, and the market surfaces the cohort to watch.",
    marketId: '2842',
    marketLabel: '#2842 · Multi-categorical',
  },
  risk: {
    headline: 'Default risk priced directly',
    description:
      'Markets where each collateral token carries an estimate of default risk, derived from prediction market spreads so treasuries can price smart-contract risk alongside financial risk.',
    marketId: '2844',
    marketLabel: '#2844 · Multi-categorical',
  },
}

const renderSeerMark = (className = 'w-5 h-5') => (
  <svg
    className={className}
    viewBox="357 357 285 285"
    fill="currentColor"
    role="img"
    aria-label="Seer"
  >
    <path d="M570.6,428.8l-66.9,66.9c-1.5,1.5-.4,4.1,1.7,4.1h47.6c6.5,0,9.7,7.9,5.2,12.4l-56.5,56.5c-1.4,1.4-3.2,2.1-5.2,2.1h-68.1v56.5c0,8.1,6.5,14.6,14.6,14.6h50.5c3.9,0,7.6-1.5,10.3-4.3l133.6-133.6c2.7-2.7,4.3-6.4,4.3-10.3v-50.5c0-8.1-6.5-14.6-14.6-14.6h-56.5Z" />
    <path d="M440.9,487.5l56.5-56.5c1.4-1.4,3.2-2.1,5.2-2.1h68.1v-56.5c0-8.1-6.5-14.6-14.6-14.6h-50.5c-3.9,0-7.6,1.5-10.3,4.3l-133.6,133.6c-2.7,2.7-4.3,6.4-4.3,10.3v50.5c0,8.1,6.5,14.6,14.6,14.6h56.5l66.9-66.9c1.5-1.5.4-4.1-1.7-4.1h-47.6c-6.5,0-9.7-7.9-5.2-12.4Z" />
  </svg>
)

export const ProtocolEcosystemMap: React.FC<{ onNavigate: (section: NavSection) => void }> = ({
  onNavigate,
}) => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [selectedPrim, setSelectedPrim] = useState<string | null>('multi-categorical')
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [hoveredPrim, setHoveredPrim] = useState<string | null>(null)

  const activeApp = hoveredApp || (hoveredPrim ? null : selectedApp)
  const activePrim = hoveredApp ? null : (hoveredPrim || selectedPrim)

  const activePrimitiveData = activePrim
    ? ECOSYSTEM_PRIMS.find((p) => p.id === activePrim)
    : null
  const activeGroupData = activePrimitiveData
    ? ECOSYSTEM_GROUPS.find((g) => g.id === activePrimitiveData.groupId)
    : null
  const activeAppUsers = activePrim
    ? ORIGINAL_CARDS.filter(
        (a) =>
          APP_USES[a.id]?.includes(activePrim) ||
          (a.id === 'markets' && APP_USES['opportunity']?.includes(activePrim))
      )
    : []

  const activeAppData = activeApp
    ? ORIGINAL_CARDS.find((a) => a.id === activeApp)
    : null
  const activeAppDetails = activeApp
    ? APP_READOUT_DETAILS[activeApp] ||
      APP_READOUT_DETAILS[activeApp === 'markets' ? 'opportunity' : activeApp]
    : null

  return (
    <div className="hm-map w-full space-y-0">
      {/* 1. Original Five App Step Cards with color-graded ProcessMotionVector */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
        {ORIGINAL_CARDS.map((item) => {
          const Icon = item.icon
          const isOn = activeApp === item.id
          const isUses =
            !activeApp &&
            !!activePrim &&
            (APP_USES[item.id]?.includes(activePrim) ||
              (item.id === 'markets' && APP_USES['opportunity']?.includes(activePrim)))
          const isDim =
            !activeApp &&
            !!activePrim &&
            !APP_USES[item.id]?.includes(activePrim) &&
            !(item.id === 'markets' && APP_USES['opportunity']?.includes(activePrim))

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedApp(item.id)
                setSelectedPrim(null)
              }}
              onMouseEnter={() => setHoveredApp(item.id)}
              onMouseLeave={() => setHoveredApp(null)}
              className={`osiris-subcard p-4 text-left group transition-all flex flex-col justify-between min-h-[190px] relative ${
                isOn
                  ? 'border-[#8F55F7] ring-1 ring-[#8F55F7] bg-[#8F55F7]/[0.08]'
                  : ''
              } ${isUses ? 'border-[#8F55F7] ring-1 ring-[#8F55F7]/70' : ''} ${
                isDim ? 'opacity-40' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] theme-font-mono text-[var(--theme-text-muted)]">
                  {item.tag}
                </span>
                <Icon
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  style={{ color: item.accent }}
                />
              </div>

              {/* Middle Motion Vector Line Visualizing Process (Original Color-Graded Design) */}
              <ProcessMotionVector id={item.id} accent={item.accent} />

              <div>
                <div className="text-base font-medium text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate(item.id)
                    }}
                    className="cursor-pointer p-0.5 hover:text-[#9C6FF2]"
                    title={`Open ${item.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </span>
                </div>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* 2. Bus Connector Lines */}
      <div className="hm-map__bus" aria-hidden="true">
        {ORIGINAL_CARDS.map((app) => {
          const isLineOn = activeApp
            ? activeApp === app.id
            : !!activePrim &&
              (APP_USES[app.id]?.includes(activePrim) ||
                (app.id === 'markets' && APP_USES['opportunity']?.includes(activePrim)))
          return <i key={app.id} className={isLineOn ? 'is-on' : ''} />
        })}
      </div>

      {/* 3. Seer Protocol Architecture Layer */}
      <div className="hm-layer shadow-2xl">
        <div className="hm-layer__head">
          <span className="hm-layer__name">
            {renderSeerMark('w-5 h-5 text-[#9C6FF2]')}
            <span>Seer protocol</span>
          </span>
          <div className="flex items-center gap-3 text-xs theme-font-mono text-[#8A8A94] uppercase tracking-wider">
            <span>SAME MARKET FORMAT</span>
            <span>·</span>
            <span>SAME OUTCOME TOKENS</span>
            <span>·</span>
            <span>SAME ORACLE</span>
          </div>
        </div>

        {/* 5 Group Columns */}
        <div className="hm-layer__groups">
          {ECOSYSTEM_GROUPS.map((group) => {
            const groupPrims = ECOSYSTEM_PRIMS.filter((p) => p.groupId === group.id)
            return (
              <div key={group.id} className="hm-group">
                <h3>{group.label}</h3>
                <div className="flex flex-col gap-1.5">
                  {groupPrims.map((prim) => {
                    const isPrimPressed = activePrim === prim.id
                    const isPrimUsed =
                      !!activeApp &&
                      (APP_USES[activeApp]?.includes(prim.id) ||
                        (activeApp === 'markets' && APP_USES['opportunity']?.includes(prim.id)))
                    const isPrimDim =
                      !!activeApp &&
                      !APP_USES[activeApp]?.includes(prim.id) &&
                      !(activeApp === 'markets' && APP_USES['opportunity']?.includes(prim.id))

                    return (
                      <button
                        key={prim.id}
                        type="button"
                        className={`hm-prim ${isPrimUsed ? 'is-used' : ''} ${
                          isPrimDim ? 'is-dim' : ''
                        }`}
                        aria-pressed={isPrimPressed}
                        onClick={() => {
                          setSelectedPrim(prim.id)
                          setSelectedApp(null)
                        }}
                        onMouseEnter={() => setHoveredPrim(prim.id)}
                        onMouseLeave={() => setHoveredPrim(null)}
                      >
                        <i />
                        <span>{prim.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Readout Panel */}
        <div className="hm-layer__read" aria-live="polite">
          {activeAppData && activeAppDetails ? (
            <>
              <div>
                <span className="text-xs theme-font-mono text-[rgba(224,226,245,0.6)] uppercase tracking-wider">
                  {activeAppData.tag.split('·')[0].trim()} · USES{' '}
                  {APP_USES[activeAppData.id]?.length || 7} OF {ALL_PRIM_IDS.length} BUILDING BLOCKS
                </span>
                <h3 className="mt-1">
                  {activeAppData.title}: {activeAppDetails.headline}
                </h3>
                <p>{activeAppDetails.description}</p>
              </div>

              <div className="hm-layer__uses">
                <span className="s-spec text-xs theme-font-mono text-[rgba(224,226,245,0.6)] uppercase tracking-wider">
                  EXAMPLE MARKET
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    className="hm-pill"
                  >
                    <Search className="w-3.5 h-3.5 text-[#B79BF7]" />
                    <span>{activeAppDetails.marketLabel}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(activeAppData.id)}
                    className="hm-pill"
                  >
                    <span>Open {activeAppData.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B79BF7]" />
                  </button>
                </div>
              </div>
            </>
          ) : activePrimitiveData ? (
            <>
              <div>
                <span className="text-xs theme-font-mono text-[rgba(224,226,245,0.6)] uppercase tracking-wider">
                  {activeGroupData?.label}
                </span>
                <h3 className="mt-1">{activePrimitiveData.name}</h3>
                <p>{activePrimitiveData.desc}</p>
              </div>

              <div className="hm-layer__uses">
                <span className="s-spec text-xs theme-font-mono text-[rgba(224,226,245,0.6)] uppercase tracking-wider">
                  USED BY {activeAppUsers.length} OF 5 APPS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeAppUsers.map((u) => {
                    const Icon = u.icon
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          setSelectedApp(u.id)
                          setSelectedPrim(null)
                        }}
                        className="hm-pill"
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: u.accent }} />
                        <span>{u.title}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}





/**
 * Clean futuristic 3D wireframe geometry for the Blue CTA card (matching the Reactors hero torus aesthetic without info bubbles or tiny icons)
 */
const FutureHeroWireframe: React.FC = () => {
  const { meridians, parallels } = React.useMemo(() => {
    const mPaths: { d: string; opacity: number }[] = []
    const pPaths: { d: string; opacity: number }[] = []
    const cx = 150
    const cy = 78
    const R = 48
    const r = 46
    const tilt = 0.22 // slight vertical perspective tilt

    const project = (u: number, v: number) => {
      const x3d = (R + r * Math.cos(v)) * Math.cos(u)
      const y3d = r * Math.sin(v)
      const z3d = (R + r * Math.cos(v)) * Math.sin(u)

      const yRot = y3d * Math.cos(tilt) - z3d * Math.sin(tilt)
      const zRot = y3d * Math.sin(tilt) + z3d * Math.cos(tilt)

      const perspective = 1 + zRot / 420
      return {
        x: cx + x3d * perspective,
        y: cy + yRot * perspective,
        z: zRot,
      }
    }

    // Meridian rings around the torus
    const numU = 32
    const stepsV = 36
    for (let i = 0; i < numU; i++) {
      const u = (i / numU) * Math.PI * 2
      let d = ''
      for (let j = 0; j <= stepsV; j++) {
        const v = (j / stepsV) * Math.PI * 2
        const pt = project(u, v)
        d += `${j === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `
      }
      const depthFactor = 0.25 + 0.55 * ((Math.sin(u) + 1) / 2)
      mPaths.push({ d, opacity: depthFactor })
    }

    // Parallel latitude rings
    const numV = 14
    const stepsU = 50
    for (let j = 0; j < numV; j++) {
      const v = (j / numV) * Math.PI * 2
      let d = ''
      for (let i = 0; i <= stepsU; i++) {
        const u = (i / stepsU) * Math.PI * 2
        const pt = project(u, v)
        d += `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `
      }
      const opacity = 0.18 + 0.35 * Math.abs(Math.sin(v))
      pPaths.push({ d, opacity })
    }

    return { meridians: mPaths, parallels: pPaths }
  }, [])

  return (
    <svg
      viewBox="0 0 300 156"
      className="w-full h-full overflow-visible select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="futureHeroTorusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#0284C7" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="futureHeroTorusStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Ambient core glow */}
      <ellipse cx="150" cy="78" rx="108" ry="66" fill="url(#futureHeroTorusGlow)" />

      {/* Parallel rings */}
      {parallels.map((p, idx) => (
        <path
          key={`fhp-${idx}`}
          d={p.d}
          fill="none"
          stroke="#38BDF8"
          strokeOpacity={p.opacity * 0.75}
          strokeWidth="0.7"
        />
      ))}

      {/* Meridian rings */}
      {meridians.map((m, idx) => (
        <path
          key={`fhm-${idx}`}
          d={m.d}
          fill="none"
          stroke="url(#futureHeroTorusStroke)"
          strokeOpacity={m.opacity * 0.85}
          strokeWidth="0.85"
        />
      ))}

      {/* Center singularity focal ring */}
      <ellipse
        cx="150"
        cy="78"
        rx="7.5"
        ry="42"
        fill="none"
        stroke="#E0F2FE"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
    </svg>
  )
}

export const HomepageEcosystemSections: React.FC<EcosystemSectionsProps> = ({
  onNavigate,
  onCreateMarket,
}) => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-28 space-y-24 select-none">
      {/* Section Header: Seer as the Underlying Protocol */}
      <section className="pt-12 border-t border-[var(--theme-panel-divider)]">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] text-[11.5px] theme-font-mono text-[var(--theme-text-accent)] uppercase tracking-wider shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>The Seer Protocol Layer</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-medium tracking-[-0.02em] text-[var(--theme-text-primary)] leading-tight">
            Five Apps For{' '}
            <span className="text-[#9C6FF2]">
              Better Predictions
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
            A connected suite of applications. Every surface shares the same conditional token
            standard, yield-bearing sDAI collateral, and Kleros + Reality.eth verification layer.
          </p>
        </div>

        {/* Interactive Protocol Architecture Layer & 5 Step Cards */}
        <ProtocolEcosystemMap onNavigate={onNavigate} />
      </section>

      {/* Detailed Application Sections */}
      <div className="space-y-12">
        {/* 1. SEER APP */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="osiris-pill osiris-pill-brand">
                01 · SEER APP
              </span>
              <span className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                UNIVERSAL MARKET EXPLORER
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)] tracking-tight">
              Seer App: Universal Market Explorer
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              The general explorer for all Seer markets: a place to find and trade across
              market types, without specialising in any one of them; Seer’s equivalent of
              Etherscan. Inspect binary, categorical, scalar, and conditional markets in one
              universal index.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('app')}
                className="osiris-btn-primary px-5 py-2.5 rounded-xl text-xs theme-font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2"
              >
                <span>Open Seer App Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 osiris-well p-4 space-y-2.5 overflow-hidden">
            <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span>UNIVERSAL MARKET INDEX · PRICES IN THEIR UNIT</span>
            </div>
            {[
              {
                type: 'CATEGORICAL',
                q: 'Israeli Knesset election 2026 most seats',
                stat: 'Yashar 60.9% · 60.9¢',
                liq: '$27.74k',
                badgeClass: 'bg-[#7D33FF]/20 text-[#B8A5FF] border border-[#7D33FF]/40',
                statColor: '#B8A5FF',
                liqColor: '#34D399',
              },
              {
                type: 'CONDITIONAL',
                q: 'Polymarket API per-position fee endpoint',
                stat: '50% · 6.3¢ of 12.5¢',
                liq: '$7.54k',
                badgeClass: 'bg-[#38BDF8]/15 text-[#7DD3FC] border border-[#38BDF8]/35',
                statColor: '#38BDF8',
                liqColor: '#34D399',
              },
              {
                type: 'SCALAR',
                q: 'ZK-TLS Oracle Adapter human evaluator score',
                stat: '8.14/10',
                liq: '$1.11k',
                badgeClass: 'bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/35',
                statColor: '#FBBF24',
                liqColor: '#A78BFA',
              },
            ].map((row, i) => (
              <div
                key={i}
                onClick={() => onNavigate('app')}
                style={{ animationDelay: `${i * 220}ms` }}
                className="osiris-subcard seer-stagger-item p-3 cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex items-center">
                  <span
                    className={`text-[11.5px] theme-font-mono px-1.5 py-0.5 rounded font-semibold mr-2.5 shrink-0 ${row.badgeClass}`}
                  >
                    {row.type}
                  </span>
                  <span className="text-xs text-[var(--theme-text-primary)] font-medium truncate">
                    {row.q}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 theme-font-mono text-xs">
                  <span className="font-semibold" style={{ color: row.statColor }}>
                    {row.stat}
                  </span>
                  <span className="font-medium" style={{ color: row.liqColor }}>
                    {row.liq}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. DEEP (Flipped: Visual Card on Left, Step Number & Title on Right) */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 osiris-well p-4 space-y-3 overflow-hidden">
            <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[var(--theme-text-accent)]" />
                AI AGENT PROPOSAL EVALUATION (142 PROPOSALS)
              </span>
              <span className="text-[#34D399] font-semibold">28 AGENTS TRADING</span>
            </div>
            {[
              {
                id: 'PROP-041',
                name: 'ZK-TLS Oracle Bridge for Conditional Tokens',
                score: '8.14/10',
                signal: '50% · 6.3¢ of 12.5¢',
                badgeClass: 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/35',
                scoreColor: '#34D399',
                signalColor: '#10B981',
              },
              {
                id: 'PROP-108',
                name: 'Autonomous LMSR Market Maker Vaults',
                score: '7.85/10',
                signal: '64% · 8.0¢ of 12.5¢',
                badgeClass: 'bg-[#38BDF8]/15 text-[#7DD3FC] border border-[#38BDF8]/35',
                scoreColor: '#60A5FA',
                signalColor: '#38BDF8',
              },
              {
                id: 'PROP-019',
                name: 'Cross-Chain sDAI Settlement Router',
                score: '7.42/10',
                signal: '44% · 5.5¢ of 12.5¢',
                badgeClass: 'bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/35',
                scoreColor: '#FBBF24',
                signalColor: '#B8A5FF',
              },
            ].map((p, i) => (
              <div
                key={p.id}
                onClick={() => onNavigate('deep')}
                style={{ animationDelay: `${i * 220}ms` }}
                className="osiris-subcard seer-stagger-item p-3 cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span
                    className={`inline-block text-[11.5px] theme-font-mono px-1.5 py-0.5 rounded font-semibold mb-1 ${p.badgeClass}`}
                  >
                    {p.id}
                  </span>
                  <div className="text-xs text-[var(--theme-text-primary)] font-medium truncate">
                    {p.name}
                  </div>
                </div>
                <div className="text-right shrink-0 theme-font-mono">
                  <div className="text-xs font-bold" style={{ color: p.scoreColor }}>
                    {p.score}
                  </div>
                  <div className="text-[11.5px] font-medium" style={{ color: p.signalColor }}>
                    {p.signal}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 flex flex-col lg:items-end lg:text-right">
            <div className="flex items-center lg:justify-end gap-2.5">
              <span className="text-xs theme-font-mono text-[var(--theme-text-muted)] order-2 lg:order-1">
                MANY-OUTCOME &amp; AI AGENT MARKETS
              </span>
              <span className="osiris-pill osiris-pill-brand order-1 lg:order-2">
                02 · DEEP
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)] tracking-tight">
              Deep: Markets for AI Agents
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              Handles questions with many possible outcomes, including markets designed for AI
              agents to trade. For example, agents could forecast how evaluators would
              assess proposals, giving a team a signal about which options deserve closer review.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('deep')}
                className="osiris-btn-primary px-5 py-2.5 rounded-xl text-xs theme-font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2"
              >
                <span>Explore Deep Markets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. FUTARCHY */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="osiris-pill osiris-pill-brand">
                03 · FUTARCHY
              </span>
              <span className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                CONDITIONAL GOVERNANCE FORECASTING
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)] tracking-tight">
              Futarchy: Decision Signals for DAOs
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              Forecasts success metrics conditionally: pass versus fail. Gives DAOs predictive
              evidence to inform choices without taking governance away from voters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('futarchy')}
                className="osiris-btn-primary px-5 py-2.5 rounded-xl text-xs theme-font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2"
              >
                <span>Open Futarchy Proposals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 osiris-well p-4 space-y-3 overflow-hidden">
            <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span>GIP-114: ALLOCATE 5,000 GNO TO SEER LIQUIDITY</span>
              <span className="text-[#34D399] font-semibold">ADVISORY SIGNAL</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Green Color-Coded Pass Condition Card */}
              <div
                style={{ animationDelay: '0ms' }}
                className="seer-stagger-item p-3.5 rounded-xl bg-[#062016] border border-[#065F46] shadow-[inset_0_1px_0_rgba(16,185,129,0.15)]"
              >
                <div className="text-[11.5px] theme-font-mono text-[#34D399] font-semibold uppercase">
                  IF PROPOSAL PASSES
                </div>
                <div className="text-xl font-bold theme-font-mono text-[#ECFDF5] mt-1">
                  $48.2M TVL
                </div>
                <div className="text-[11.5px] theme-font-mono text-[#10B981] font-medium mt-0.5">
                  +19.3% Projected 90d Impact
                </div>
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-[#101013]/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#059669] to-[#34D399] w-[78%]" />
                </div>
              </div>

              {/* Red Color-Coded Fail Condition Card */}
              <div
                style={{ animationDelay: '220ms' }}
                className="seer-stagger-item p-3.5 rounded-xl bg-[#240D15] border border-[#881337] shadow-[inset_0_1px_0_rgba(244,63,94,0.15)]"
              >
                <div className="text-[11.5px] theme-font-mono text-[#FB7185] font-semibold uppercase">
                  IF PROPOSAL FAILS
                </div>
                <div className="text-xl font-bold theme-font-mono text-[#FFE4E6] mt-1">
                  $40.4M TVL
                </div>
                <div className="text-[11.5px] theme-font-mono text-[#F43F5E] font-medium mt-0.5">
                  -16.2% vs. Pass Trajectory
                </div>
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-[#101013]/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#FB7185] w-[46%]" />
                </div>
              </div>
            </div>
            <div className="text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] text-center">
              DAO voters retain final authority · Market provides conditional expectation
            </div>
          </div>
        </section>

        {/* 4. OPPORTUNITY MARKETS (Flipped: Visual Card on Left, Step Number & Title on Right, Distinct Bluish Forecasting Color) */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 osiris-well p-4 space-y-2.5 overflow-hidden">
            <div className="s-orows flex flex-col gap-2">
              {[
                {
                  title: 'Submission #09: Conditional Treasury Hedging SDK',
                  prob: 78.4,
                  unitLabel: '78.4% · 9.8¢ of 12.5¢',
                  badge: 'Leading',
                  selected: true,
                },
                {
                  title: 'Submission #27: Automated Reality.eth Evidence Bot',
                  prob: 64.0,
                  unitLabel: '64.0% · 8.0¢ of 12.5¢',
                },
                {
                  title: 'Submission #14: Privacy-Preserving Orderflow Pool',
                  prob: 50.0,
                  unitLabel: '50.0% · 6.3¢ of 12.5¢',
                },
                {
                  title: 'Other 13 cohort submissions',
                  prob: 18.0,
                  unitLabel: '4–18% each',
                },
              ].map((sub, i) => (
                <div
                  key={i}
                  onClick={() => onNavigate('markets')}
                  style={
                    {
                      '--p': sub.prob / 100,
                      animationDelay: `${i * 220}ms`,
                    } as React.CSSProperties
                  }
                  className={`s-orow seer-stagger-item relative h-11 rounded-[10px] overflow-hidden flex items-center justify-between px-3.5 cursor-pointer transition-colors ${
                    sub.selected
                      ? 'is-selected border border-[#38BDF8]/85 bg-[#16202A] hover:border-[#7DD3FC]'
                      : 'border border-white/[0.05] bg-[#1E1E24] hover:border-[#38BDF8]/40'
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-y-0 left-0 ${
                      sub.selected ? 'bg-[#0369A1]/55' : 'bg-[#0C4A6E]/55'
                    }`}
                    style={{ width: `${sub.prob}%` }}
                  />
                  <span className="s-orow__label relative z-10 flex items-center gap-2 min-w-0 pr-3">
                    <span
                      className={`u-clamp-1 text-[12.5px] font-medium truncate ${
                        sub.selected ? 'text-[#FFFFFF]' : 'text-[#E9E9F5]'
                      }`}
                    >
                      {sub.title}
                    </span>
                    {sub.badge && (
                      <span className="s-tag s-tag--solid shrink-0 px-2 py-0.5 rounded-[6px] bg-[#0284C7] text-[10.5px] font-semibold text-[#FFFFFF]">
                        {sub.badge}
                      </span>
                    )}
                  </span>
                  <span
                    className={`s-orow__pct relative z-10 text-[12px] theme-font-mono shrink-0 ${
                      sub.selected
                        ? 'font-semibold text-[#7DD3FC]'
                        : 'font-medium text-[#BAE6FD]/85'
                    }`}
                  >
                    {sub.unitLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 flex flex-col lg:items-end lg:text-right">
            <div className="flex items-center lg:justify-end gap-2.5">
              <span className="text-xs theme-font-mono text-[#7DD3FC] order-2 lg:order-1">
                SELECTION &amp; CURATION FORECASTING
              </span>
              <span className="osiris-pill bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#BAE6FD] order-1 lg:order-2">
                04 · OPPORTUNITY MARKETS
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)] tracking-tight">
              Opportunity Markets: Forecasting Selection Likelihood
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              Let traders forecast which submissions are likely to be selected, giving
              reviewers another signal while leaving the final selection to them.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('markets')}
                className="px-5 py-2.5 rounded-xl text-xs theme-font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0EA5E9] text-[#FFFFFF] transition-colors"
              >
                <span>View Opportunity Markets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 5. RISK PRICING (REACTORS) */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="osiris-pill osiris-pill-brand">
                05 · REACTORS
              </span>
              <span className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                COMPARATIVE DEFI EXPOSURE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)] tracking-tight">
              Real-Time Risk Readjustments
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              Shows market estimates of risk across protocols; someone assessing DeFi exposure
              can compare those estimates instead of interpreting a single yes-or-no price in
              isolation.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('risk')}
                className="osiris-btn-primary px-5 py-2.5 rounded-xl text-xs theme-font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2"
              >
                <span>Compare Protocol Risk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 osiris-well p-4 space-y-2.5 overflow-hidden">
            <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span>ANNUALIZED PROTOCOL RISK MATRIX (2026)</span>
              <span className="text-[var(--theme-text-accent)] font-semibold">RELATIVE BENCHMARK</span>
            </div>
            {[
              {
                protocol: 'Aave v3 (Core Pools)',
                exploitRisk: '1.2%',
                depegRisk: '0.8%',
                rating: 'LOW RELATIVE RISK',
                metricColor: '#34D399',
                pillClass: 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/40',
              },
              {
                protocol: 'Spark / sDAI Savings Layer',
                exploitRisk: '1.4%',
                depegRisk: '0.6%',
                rating: 'LOW RELATIVE RISK',
                metricColor: '#34D399',
                pillClass: 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/40',
              },
              {
                protocol: 'Cross-Chain Restaking Bridge X',
                exploitRisk: '8.7%',
                depegRisk: '4.9%',
                rating: 'ELEVATED EXPOSURE',
                metricColor: '#FB7185',
                pillClass: 'bg-[#F43F5E]/15 text-[#FB7185] border border-[#F43F5E]/40',
              },
            ].map((r, i) => (
              <div
                key={i}
                onClick={() => onNavigate('risk')}
                style={{ animationDelay: `${i * 220}ms` }}
                className="osiris-subcard seer-stagger-item p-3 cursor-pointer flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-medium text-[var(--theme-text-primary)]">
                    {r.protocol}
                  </div>
                  <div className="text-[11.5px] theme-font-mono text-[var(--theme-text-muted)]">
                    Smart Contract:{' '}
                    <span className="font-semibold" style={{ color: r.metricColor }}>
                      {r.exploitRisk}
                    </span>{' '}
                    · Collateral/Peg:{' '}
                    <span className="font-semibold" style={{ color: r.metricColor }}>
                      {r.depegRisk}
                    </span>
                  </div>
                </div>
                <span className={`osiris-pill ${r.pillClass}`}>{r.rating}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Public Result · Opportunity Archive + Violet CTA Poster (Replaces Start Now CTA) */}
      <section className="s-section--tight hm-proof" aria-labelledby="hm-proof-title">
        <div className="s-container hm-proof__grid grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Card: Public Result · Opportunity Archive */}
          <div
            className="s-card s-card--pad hm-rebrand lg:col-span-5 rounded-[22px] bg-[#17171B] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between gap-6"
            id="hm-rebrand"
          >
            <div className="s-col flex flex-col gap-3">
              <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] text-[#FFFFFF] leading-[1.2]">
                Your Opportunity. Your Outcome.
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#9E9EA9] leading-[1.55]">
                Seer ran its own rebrand as an Opportunity Market. Traders priced which of 16
                entries the team would choose. Electric Foundation finished at 80.1%, and it is
                the identity these six interfaces are built on.
              </p>
            </div>

            <div className="s-orows flex flex-col gap-2">
              {/* Row 1: Electric Foundation (80.1%) */}
              <div
                className="s-orow is-selected relative h-11 rounded-[10px] border border-[#38BDF8]/85 bg-[#16202A] overflow-hidden flex items-center justify-between px-3.5"
                style={{ '--p': 0.801 } as React.CSSProperties}
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 bg-[#0369A1]/55"
                  style={{ width: '80.1%' }}
                />
                <span className="s-orow__label relative z-10 flex items-center gap-2 min-w-0">
                  <span className="u-clamp-1 text-[13px] font-medium text-[#FFFFFF] truncate">
                    Electric Foundation
                  </span>
                  <span className="s-tag s-tag--solid px-2 py-0.5 rounded-[6px] bg-[#0284C7] text-[11px] font-semibold text-[#FFFFFF]">
                    Chosen
                  </span>
                </span>
                <span className="s-orow__pct relative z-10 text-[13px] theme-font-mono font-semibold text-[#7DD3FC]">
                  80.1%
                </span>
              </div>

              {/* Row 2: Signal Convergence (10.3%) */}
              <div
                className="s-orow relative h-11 rounded-[10px] border border-white/[0.05] bg-[#1E1E24] overflow-hidden flex items-center justify-between px-3.5"
                style={{ '--p': 0.103 } as React.CSSProperties}
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 bg-[#0C4A6E]/55"
                  style={{ width: '10.3%' }}
                />
                <span className="s-orow__label relative z-10 flex items-center min-w-0">
                  <span className="u-clamp-1 text-[13px] font-medium text-[#E9E9F5] truncate">
                    Signal Convergence
                  </span>
                </span>
                <span className="s-orow__pct relative z-10 text-[13px] theme-font-mono font-medium text-[#BAE6FD]/85">
                  10.3%
                </span>
              </div>

              {/* Row 3: Signal Dark (2.9%) */}
              <div
                className="s-orow relative h-11 rounded-[10px] border border-white/[0.05] bg-[#1E1E24] overflow-hidden flex items-center justify-between px-3.5"
                style={{ '--p': 0.029 } as React.CSSProperties}
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 bg-[#0C4A6E]/55"
                  style={{ width: '2.9%' }}
                />
                <span className="s-orow__label relative z-10 flex items-center min-w-0">
                  <span className="u-clamp-1 text-[13px] font-medium text-[#E9E9F5] truncate">
                    Signal Dark
                  </span>
                </span>
                <span className="s-orow__pct relative z-10 text-[13px] theme-font-mono font-medium text-[#BAE6FD]/85">
                  2.9%
                </span>
              </div>

              {/* Row 4: Other 13 entries (6.7%) */}
              <div
                className="s-orow relative h-11 rounded-[10px] border border-white/[0.05] bg-[#1E1E24] overflow-hidden flex items-center justify-between px-3.5"
                style={{ '--p': 0.06699999999999995 } as React.CSSProperties}
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 bg-[#0C4A6E]/55"
                  style={{ width: '6.7%' }}
                />
                <span className="s-orow__label relative z-10 flex items-center min-w-0">
                  <span className="u-clamp-1 text-[13px] font-medium text-[#E9E9F5] truncate">
                    Other 13 entries
                  </span>
                </span>
                <span className="s-orow__pct relative z-10 text-[13px] theme-font-mono font-medium text-[#BAE6FD]/85">
                  0.5–1% each
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: The Future As Defined By You. (Clean blue futuristic hero card) */}
          <div className="lg:col-span-7 rounded-[22px] p-2 sm:p-2.5 bg-[#111823] border border-[#38BDF8]/35 shadow-[0_0_36px_-10px_rgba(56,189,248,0.25)] flex flex-col">
            <div
              className="relative rounded-[16px] overflow-hidden flex flex-col justify-between flex-1 p-7 sm:p-9 border border-[#7DD3FC]/25"
              style={{
                background:
                  'radial-gradient(85% 90% at 82% 68%, rgba(56, 189, 248, 0.32) 0%, rgba(2, 132, 199, 0) 62%), linear-gradient(140deg, #0284C7 0%, #0369A1 42%, #071E34 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(4, 15, 28, 0.6)',
              }}
            >
              {/* Top Section: Eyebrow & Display Headline */}
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2.5 text-[11px] theme-font-mono uppercase tracking-[0.18em] text-[#BAE6FD] mb-4">
                  <span>Every opinion has a price</span>
                  <span className="hidden sm:inline text-[#BAE6FD]/75">·&nbsp;&nbsp;Est. on Gnosis Chain</span>
                </div>

                <h2
                  id="hm-proof-title"
                  className="text-[36px] sm:text-[50px] font-semibold tracking-[-0.03em] leading-[1.06] text-[#FFFFFF]"
                >
                  The Future
                  <span className="block text-[#BAE6FD]">
                    As Defined By You.
                  </span>
                </h2>

                <p className="mt-4 text-[13.5px] sm:text-[14px] text-[#E0F2FE]/80 leading-[1.55] max-w-md">
                  Permissionless conditional markets settled on-chain with yield-bearing sDAI
                  collateral and verifiable resolution.
                </p>
              </div>

              {/* Right / Bottom-Right: Clean 3D Torus Wireframe from Reactors Hero */}
              <div className="pointer-events-none absolute -right-4 bottom-3 sm:right-5 sm:bottom-5 w-[260px] sm:w-[310px] h-[150px] sm:h-[175px]">
                <FutureHeroWireframe />
              </div>

              {/* Bottom-Left: Action Buttons anchored cleanly at the bottom */}
              <div className="relative z-10 pt-8 flex flex-wrap items-center gap-3">
                <a
                  className="px-6 py-3.5 rounded-[12px] bg-[#091524] hover:bg-[#0F2238] border border-[#38BDF8]/35 text-[#FFFFFF] text-[14.5px] font-medium inline-flex items-center justify-center transition-colors shadow-[0_6px_18px_rgba(4,12,24,0.4)]"
                  href="../app/"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate('app')
                  }}
                >
                  Open the App
                </a>
                <button
                  className="px-6 py-3.5 rounded-[12px] bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 border border-[#BAE6FD]/40 text-[#FFFFFF] text-[14.5px] font-medium inline-flex items-center justify-center transition-colors backdrop-blur-sm"
                  type="button"
                  onClick={() => {
                    if (onCreateMarket) {
                      onCreateMarket()
                    } else {
                      onNavigate('app')
                    }
                  }}
                >
                  Create a market
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const SeerFooter: React.FC<{
  onNavigate: (section: NavSection) => void
}> = ({ onNavigate }) => {
  return (
    <footer className="relative z-20 w-full border-t border-[var(--theme-card-border)] bg-[var(--theme-header-bg)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--theme-panel-divider)]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 focus:outline-none"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src="/branding/seer-backdrop.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                  src="/branding/seer-logo.png"
                  alt="Seer"
                  className="relative z-10 w-5 h-5 object-contain"
                />
              </div>
              <span className="text-xl font-medium tracking-tight text-[var(--theme-text-primary)]">
                seer
              </span>
            </button>

            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed max-w-sm">
              Prediction markets for distilled human judgement. Built on the Conditional Token
              Framework with Reality.eth and Kleros resolution across Gnosis and Ethereum.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)] text-[11.5px] theme-font-mono text-[var(--theme-text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>ALL PROTOCOL MARKETS LIVE · GNOSIS &amp; ETHEREUM</span>
            </div>
          </div>

          {/* Protocol Surfaces */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs theme-font-mono uppercase tracking-wider text-[var(--theme-text-accent)] font-semibold">
              Protocol Surfaces
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--theme-text-muted)]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('app')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  01 · Seer App
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('deep')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  02 · Deep (AI Agent Markets)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('futarchy')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  03 · Futarchy Governance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('markets')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  04 · Opportunity Markets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('risk')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  05 · Risk Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Core Infrastructure */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs theme-font-mono uppercase tracking-wider text-[var(--theme-text-accent)] font-semibold">
              Infrastructure
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--theme-text-muted)]">
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Conditional Token Framework
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Reality.eth Verification
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Kleros Decentralized Court
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Spark sDAI Yield Collateral
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                CoW Protocol Orderflow
              </li>
            </ul>
          </div>

          {/* Community & Docs */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs theme-font-mono uppercase tracking-wider text-[var(--theme-text-accent)] font-semibold">
              Community
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--theme-text-muted)]">
              <li>
                <a
                  href="https://github.com/jqmwa/Seer"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Governance Forum
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                Discord
              </li>
              <li className="hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer">
                X (Twitter)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Attribution Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-font-mono text-[var(--theme-text-muted)]">
          <div>© 2026 Seer Protocol. Distilled Human Judgement.</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--theme-text-primary)] cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-[var(--theme-text-primary)] cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-[var(--theme-text-primary)] cursor-pointer transition-colors">
              Security Audits
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}


const HeroBadgeCluster: React.FC<{
  label: string
  leftSymbols: Array<{ s: string; bg: string; border: string }>
  rightSymbols: Array<{ s: string; bg: string; border: string; darkText?: boolean }>
}> = ({ label, leftSymbols, rightSymbols }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-1 text-[11.5px] theme-font-mono text-[var(--theme-text-muted)]">
      <span>{label}</span>
      <Info className="w-3 h-3 text-[var(--theme-text-accent)] opacity-80" />
    </div>
    <div className="flex items-center gap-1.5">
      <div className="flex items-center -space-x-2">
        {leftSymbols.map((item, i) => (
          <span
            key={i}
            style={{ backgroundColor: item.bg, borderColor: item.border }}
            className="w-6 h-6 rounded-full border flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-white shadow-sm"
          >
            {item.s}
          </span>
        ))}
      </div>
      <span className="text-[11.5px] theme-font-mono font-bold text-[var(--theme-text-accent)]">
        =
      </span>
      <div className="flex items-center -space-x-2">
        {rightSymbols.map((item, i) => (
          <span
            key={i}
            style={{ backgroundColor: item.bg, borderColor: item.border }}
            className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11.5px] theme-font-mono font-bold shadow-sm ${
              item.darkText ? 'text-[#101013]' : 'text-white'
            }`}
          >
            {item.s}
          </span>
        ))}
      </div>
    </div>
  </div>
)

/**
 * 3D High-Cardinality Geodesic & Neural Branching Sphere Wireframe for Deep
 */
const DeepGeodesicWireframe: React.FC = () => {
  const { rings, longitudes, nodes } = React.useMemo(() => {
    const cx = 150
    const cy = 78
    const R = 60
    const tilt = 0.32

    const project = (lat: number, lon: number, radiusScale = 1) => {
      const r = R * radiusScale
      const x3d = r * Math.cos(lat) * Math.cos(lon)
      const y3d = r * Math.sin(lat)
      const z3d = r * Math.cos(lat) * Math.sin(lon)

      const yRot = y3d * Math.cos(tilt) - z3d * Math.sin(tilt)
      const zRot = y3d * Math.sin(tilt) + z3d * Math.cos(tilt)
      const p = 1 + zRot / 380
      return { x: cx + x3d * p, y: cy + yRot * p, z: zRot }
    }

    const rPaths: Array<{ d: string; opacity: number }> = []
    const lPaths: Array<{ d: string; opacity: number }> = []
    const nodePts: Array<{ x: number; y: number; highlight: boolean }> = []

    // Latitude geodesic rings
    const latSteps = 11
    for (let i = 1; i < latSteps; i++) {
      const lat = -Math.PI / 2 + (i / latSteps) * Math.PI
      let d = ''
      for (let j = 0; j <= 48; j++) {
        const lon = (j / 48) * Math.PI * 2
        const pt = project(lat, lon)
        d += `${j === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `
      }
      rPaths.push({ d, opacity: 0.2 + 0.45 * Math.cos(lat) })
    }

    // Longitude meridian arcs + outer outcome orbital shell
    const lonCount = 18
    for (let i = 0; i < lonCount; i++) {
      const lon = (i / lonCount) * Math.PI * 2
      let d = ''
      for (let j = 0; j <= 36; j++) {
        const lat = -Math.PI / 2 + (j / 36) * Math.PI
        const pt = project(lat, lon)
        d += `${j === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `
        if (j % 9 === 0 && i % 3 === 0) {
          nodePts.push({
            x: pt.x,
            y: pt.y,
            highlight: (i + j) % 2 === 0,
          })
        }
      }
      lPaths.push({ d, opacity: 0.22 + 0.48 * ((Math.sin(lon) + 1) / 2) })
    }

    return { rings: rPaths, longitudes: lPaths, nodes: nodePts }
  }, [])

  return (
    <svg
      viewBox="0 0 300 156"
      className="w-full max-w-[300px] h-[148px] overflow-visible select-none"
      aria-label="Seer Deep High-Cardinality Geodesic Wireframe"
    >
      <defs>
        <radialGradient id="deepCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7D33FF" stopOpacity="0.36" />
          <stop offset="55%" stopColor="#8F55F7" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#101013" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="deepWireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9E9F5" />
          <stop offset="50%" stopColor="#9C6FF2" />
          <stop offset="100%" stopColor="#7D33FF" />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="78" rx="108" ry="66" fill="url(#deepCoreGlow)" />

      {/* Outer Equatorial Orbital Ring */}
      <ellipse
        cx="150"
        cy="78"
        rx="96"
        ry="28"
        transform="rotate(-14 150 78)"
        fill="none"
        stroke="#9C6FF2"
        strokeOpacity="0.38"
        strokeWidth="0.9"
        strokeDasharray="4 4"
      />
      <ellipse
        cx="150"
        cy="78"
        rx="96"
        ry="28"
        transform="rotate(14 150 78)"
        fill="none"
        stroke="#7D33FF"
        strokeOpacity="0.32"
        strokeWidth="0.9"
      />

      {rings.map((r, idx) => (
        <path
          key={`dr-${idx}`}
          d={r.d}
          fill="none"
          stroke="#8F55F7"
          strokeOpacity={r.opacity}
          strokeWidth="0.7"
        />
      ))}

      {longitudes.map((l, idx) => (
        <path
          key={`dl-${idx}`}
          d={l.d}
          fill="none"
          stroke="url(#deepWireGrad)"
          strokeOpacity={l.opacity}
          strokeWidth="0.8"
        />
      ))}

      {nodes.map((n, idx) => (
        <circle
          key={`dn-${idx}`}
          cx={n.x}
          cy={n.y}
          r={n.highlight ? 2 : 1.3}
          fill={n.highlight ? '#2dd4bf' : '#E9E9F5'}
          fillOpacity={n.highlight ? 0.9 : 0.65}
        />
      ))}

      {/* Forecast Score Data Callout */}
      <g transform="translate(178, 12)">
        <rect x="0" y="0" width="114" height="24" rx="6" fill="#101013" fillOpacity="0.92" stroke="#2dd4bf" strokeWidth="1" />
        <text x="57" y="16" textAnchor="middle" fill="#2dd4bf" fontSize="11.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          SCORE 8.14/10
        </text>
      </g>
    </svg>
  )
}

/**
 * 3D Bifurcating Conditional Manifold Wireframe for Futarchy (Pass vs Fail Cones)
 */
const FutarchyBifurcationWireframe: React.FC = () => {
  const { passRings, failRings, streamlines } = React.useMemo(() => {
    const pRings: Array<{ d: string; opacity: number }> = []
    const fRings: Array<{ d: string; opacity: number }> = []
    const sLines: Array<{ d: string; isPass: boolean; opacity: number }> = []

    const numSlices = 22
    const stepsTheta = 32

    const evalPoint = (t: number, theta: number, branch: 1 | -1) => {
      // t in [0, 1] from left origin (x=36) to right diverging lobes (x=258)
      const x = 36 + t * 222
      const divergeY = branch * Math.pow(t, 1.35) * 38
      const tubeRadius = 10 + Math.sin(t * Math.PI) * 18 + t * 8

      const y3d = divergeY + tubeRadius * Math.sin(theta)
      const z3d = tubeRadius * Math.cos(theta)
      const yProj = 78 + y3d - z3d * 0.22
      const xProj = x + z3d * 0.28
      return { x: xProj, y: yProj }
    }

    for (let i = 0; i <= numSlices; i++) {
      const t = i / numSlices
      let dPass = ''
      let dFail = ''
      for (let j = 0; j <= stepsTheta; j++) {
        const theta = (j / stepsTheta) * Math.PI * 2
        const ptP = evalPoint(t, theta, -1)
        const ptF = evalPoint(t, theta, 1)
        dPass += `${j === 0 ? 'M' : 'L'} ${ptP.x.toFixed(1)} ${ptP.y.toFixed(1)} `
        dFail += `${j === 0 ? 'M' : 'L'} ${ptF.x.toFixed(1)} ${ptF.y.toFixed(1)} `
      }
      const op = 0.22 + 0.55 * t
      pRings.push({ d: dPass, opacity: op })
      fRings.push({ d: dFail, opacity: op * 0.78 })
    }

    const numStream = 12
    for (let j = 0; j < numStream; j++) {
      const theta = (j / numStream) * Math.PI * 2
      let dP = ''
      let dF = ''
      for (let i = 0; i <= numSlices; i++) {
        const t = i / numSlices
        const ptP = evalPoint(t, theta, -1)
        const ptF = evalPoint(t, theta, 1)
        dP += `${i === 0 ? 'M' : 'L'} ${ptP.x.toFixed(1)} ${ptP.y.toFixed(1)} `
        dF += `${i === 0 ? 'M' : 'L'} ${ptF.x.toFixed(1)} ${ptF.y.toFixed(1)} `
      }
      const op = 0.2 + 0.45 * ((Math.sin(theta) + 1) / 2)
      sLines.push({ d: dP, isPass: true, opacity: op })
      sLines.push({ d: dF, isPass: false, opacity: op * 0.75 })
    }

    return { passRings: pRings, failRings: fRings, streamlines: sLines }
  }, [])

  return (
    <svg
      viewBox="0 0 300 156"
      className="w-full max-w-[300px] h-[148px] overflow-visible select-none"
      aria-label="Seer Futarchy Conditional Bifurcation Wireframe"
    >
      <defs>
        <radialGradient id="futarchyGlow" cx="55%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7D33FF" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#9C6FF2" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#101013" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="155" cy="78" rx="115" ry="66" fill="url(#futarchyGlow)" />

      {/* Fail Manifold (Lower Lobe) */}
      {failRings.map((r, idx) => (
        <path
          key={`fr-${idx}`}
          d={r.d}
          fill="none"
          stroke="#BFBFE6"
          strokeOpacity={r.opacity * 0.65}
          strokeWidth="0.65"
        />
      ))}

      {/* Pass Manifold (Upper Lobe) */}
      {passRings.map((r, idx) => (
        <path
          key={`pr-${idx}`}
          d={r.d}
          fill="none"
          stroke="#9C6FF2"
          strokeOpacity={r.opacity}
          strokeWidth="0.75"
        />
      ))}

      {/* Longitudinal Streamlines */}
      {streamlines.map((s, idx) => (
        <path
          key={`sl-${idx}`}
          d={s.d}
          fill="none"
          stroke={s.isPass ? '#7D33FF' : '#8F55F7'}
          strokeOpacity={s.opacity}
          strokeWidth={s.isPass ? '0.85' : '0.65'}
        />
      ))}

      {/* Decision Origin Nexus */}
      <circle
        cx="36"
        cy="78"
        r="5"
        fill="#2dd4bf"
        stroke="#FFFFFF"
        strokeWidth="1.2"
      />

      {/* Decision Fork Data Callouts */}
      <g transform="translate(182, 10)">
        <rect x="0" y="0" width="112" height="22" rx="6" fill="#101013" fillOpacity="0.92" stroke="#2dd4bf" strokeWidth="1" />
        <text x="56" y="15" textAnchor="middle" fill="#2dd4bf" fontSize="11.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          PASS +19.3%
        </text>
      </g>
      <g transform="translate(182, 124)">
        <rect x="0" y="0" width="112" height="22" rx="6" fill="#101013" fillOpacity="0.92" stroke="#8A8A94" strokeWidth="1" />
        <text x="56" y="15" textAnchor="middle" fill="#8A8A94" fontSize="11.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          FAIL -16.2%
        </text>
      </g>
    </svg>
  )
}

/**
 * 3D Hyperboloid Curation Funnel & Converging Vortex Wireframe for Opportunity Markets
 */
const MarketsConvergenceWireframe: React.FC = () => {
  const { rings,generators } = React.useMemo(() => {
    const rList: Array<{ d: string; opacity: number; isNeck: boolean }> = []
    const gList: Array<{ d: string; opacity: number; accent: boolean }> = []

    const numSlices = 24
    const stepsTheta = 36

    // Hyperboloid of one sheet oriented horizontally along X
    const evalPoint = (u: number, theta: number) => {
      // u in [-1, 1]
      const x = 150 + u * 104
      // Narrow waist near u = 0.15, wider intake on left, curated flare on right
      const waist = 16
      const radius = waist * Math.sqrt(1 + Math.pow((u - 0.15) * 2.35, 2))
      const y3d = radius * Math.sin(theta)
      const z3d = radius * Math.cos(theta)

      const xProj = x + z3d * 0.28
      const yProj = 78 + y3d - z3d * 0.18
      return { x: xProj, y: yProj }
    }

    for (let i = 0; i <= numSlices; i++) {
      const u = -1 + (i / numSlices) * 2
      let d = ''
      for (let j = 0; j <= stepsTheta; j++) {
        const theta = (j / stepsTheta) * Math.PI * 2
        const pt = evalPoint(u, theta)
        d += `${j === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `
      }
      const isNeck = Math.abs(u - 0.15) < 0.12
      const op = isNeck ? 0.85 : 0.24 + 0.42 * (1 - Math.abs(u) * 0.5)
      rList.push({ d, opacity: op, isNeck })
    }

    // Twisted ruling lines (hyperboloid generators)
    const numGen = 18
    for (let j = 0; j < numGen; j++) {
      const baseTheta = (j / numGen) * Math.PI * 2
      let d1 = ''
      let d2 = ''
      for (let i = 0; i <= numSlices; i++) {
        const u = -1 + (i / numSlices) * 2
        const pt1 = evalPoint(u, baseTheta + u * 1.15)
        const pt2 = evalPoint(u, baseTheta - u * 1.15)
        d1 += `${i === 0 ? 'M' : 'L'} ${pt1.x.toFixed(1)} ${pt1.y.toFixed(1)} `
        d2 += `${i === 0 ? 'M' : 'L'} ${pt2.x.toFixed(1)} ${pt2.y.toFixed(1)} `
      }
      const op = 0.22 + 0.42 * ((Math.sin(baseTheta) + 1) / 2)
      gList.push({ d: d1, opacity: op, accent: j % 3 === 0 })
      gList.push({ d: d2, opacity: op * 0.75, accent: false })
    }

    return { rings: rList, generators: gList }
  }, [])

  return (
    <svg
      viewBox="0 0 300 156"
      className="w-full max-w-[300px] h-[148px] overflow-visible select-none"
      aria-label="Seer Opportunity Markets Curation Convergence Wireframe"
    >
      <defs>
        <radialGradient id="marketsCurationGlow" cx="54%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7D33FF" stopOpacity="0.36" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#101013" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="162" cy="78" rx="112" ry="64" fill="url(#marketsCurationGlow)" />

      {generators.map((g, idx) => (
        <path
          key={`mg-${idx}`}
          d={g.d}
          fill="none"
          stroke={g.accent ? '#38BDF8' : '#8F55F7'}
          strokeOpacity={g.opacity}
          strokeWidth={g.accent ? '0.85' : '0.65'}
        />
      ))}

      {rings.map((r, idx) => (
        <path
          key={`mr-${idx}`}
          d={r.d}
          fill="none"
          stroke={r.isNeck ? '#2dd4bf' : '#9C6FF2'}
          strokeOpacity={r.opacity}
          strokeWidth={r.isNeck ? '1.3' : '0.7'}
        />
      ))}

      {/* Share Unit Data Callout */}
      <g transform="translate(132, 12)">
        <rect x="0" y="0" width="160" height="24" rx="6" fill="#101013" fillOpacity="0.92" stroke="#38BDF8" strokeWidth="1" />
        <text x="80" y="16" textAnchor="middle" fill="#E9E9F5" fontSize="11.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          50% · 6.3¢ of 12.5¢
        </text>
      </g>
    </svg>
  )
}

export const SpecializedSurfaceView: React.FC<{
  section: Exclude<NavSection, 'home' | 'app'>
  onNavigate: (section: NavSection) => void
}> = ({ section, onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<number>(0)

  if (section === 'deep') {
    const proposals = [
      {
        id: 'GRANT-041',
        title: 'ZK-TLS Oracle Adapter for Subjective & Web2 API Attestations',
        applicant: 'zk-attest-labs.eth',
        agentScore: '8.14/10',
        agentConsensus: 81.4,
        humanEvaluatorForecast: 'Top 5% · Strong Recommend',
        volume: '$18.4k',
        agentsActive: 19,
        rationale:
          'AI evaluator agents forecast an 8.14/10 human grant reviewer score on technical feasibility, specification clarity, and ecosystem impact.',
      },
      {
        id: 'GRANT-108',
        title: 'Combinatorial LMSR Automated Market Maker for 100+ Outcome Fields',
        applicant: 'poly-math-dao.eth',
        agentScore: '8.72/10',
        agentConsensus: 87.2,
        humanEvaluatorForecast: 'Top 10% · Closer Review',
        volume: '$14.2k',
        agentsActive: 16,
        rationale:
          'High agent agreement on mathematical novelty (8.72/10); moderate spread on gas optimization timeline.',
      },
      {
        id: 'GRANT-019',
        title: 'Autonomous Agent SDK for Reality.eth Dispute Evidence Aggregation',
        applicant: 'epistemic-swarm.eth',
        agentScore: '8.39/10',
        agentConsensus: 83.9,
        humanEvaluatorForecast: 'Top 15% · Closer Review',
        volume: '$11.9k',
        agentsActive: 14,
        rationale:
          'Strong alignment with Kleros arbitration workflows (8.39/10); flagged for priority technical diligence.',
      },
      {
        id: 'GRANT-077',
        title: 'Multi-Chain sDAI Yield Router for Conditional Positions',
        applicant: 'gnosis-router.eth',
        agentScore: '7.65/10',
        agentConsensus: 76.5,
        humanEvaluatorForecast: 'Top 25% · Standard Review',
        volume: '$9.1k',
        agentsActive: 11,
        rationale:
          'Solid engineering team (7.65/10); overlaps partially with existing bridge infrastructure.',
      },
      {
        id: 'GRANT-132',
        title: 'Social Sentiment Scraper Bot without On-Chain Verification',
        applicant: 'alpha-feed.eth',
        agentScore: '2.28/10',
        agentConsensus: 22.8,
        humanEvaluatorForecast: 'Bottom Quartile · Low Signal',
        volume: '$6.4k',
        agentsActive: 15,
        rationale:
          'Agents forecast human evaluators will score 2.28/10 and deprioritize due to lack of sybil resistance.',
      },
    ]

    return (
      <div className="space-y-7 select-none">
        {/* Top Expressive Display Title */}
        <div className="pt-2 pb-1 text-center space-y-2.5">
          <div className="inline-flex items-center justify-center gap-2.5 flex-wrap">
            <span className="text-[11.5px] sm:text-xs theme-font-mono uppercase tracking-[0.26em] text-[var(--theme-text-secondary)]">
              HIGH-CARDINALITY AI AGENT &amp; MULTI-OUTCOME MARKETS
            </span>
            <span className="osiris-pill osiris-pill-brand inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full shadow-[0_0_14px_rgba(125,51,255,0.35)]">
              <Sparkles className="w-2.5 h-2.5 text-[#9C6FF2]" />
              <span className="text-[11.5px] tracking-wider normal-case font-semibold">
                142 Outcomes
              </span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold theme-font-mono tracking-[0.12em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#7D33FF] via-[#9C6FF2] to-[#BFBFE6] drop-shadow-[0_0_28px_rgba(125,51,255,0.32)]">
            ://DEEP
          </h1>
        </div>

        {/* Expressive Hero Banner Card with Overlapping Seer Orbital Emblem & 3D Geodesic Wireframe */}
        <div className="relative pt-7">
          <div className="pointer-events-none absolute -top-2 left-7 sm:left-12 z-20 flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#9C6FF2]/45 animate-[spin_28s_linear_infinite]" />
            <div className="absolute inset-1.5 rounded-full border border-[#7D33FF]/50 shadow-[0_0_20px_rgba(125,51,255,0.4)]" />
            <div className="absolute top-1/2 -left-8 -right-8 h-[1px] bg-gradient-to-r from-transparent via-[#9C6FF2]/60 to-transparent" />
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#9C6FF2] shadow-lg flex items-center justify-center bg-[#101013]">
              <img
                src="/branding/seer-backdrop.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src="/branding/seer-logo.png"
                alt="Seer Deep Core"
                className="relative z-10 w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="osiris-card p-2 sm:p-3 border border-[#7D33FF]/45 shadow-[0_0_36px_-10px_rgba(125,51,255,0.28)]">
            <div className="osiris-well relative overflow-hidden px-6 sm:px-9 pt-10 pb-6 rounded-xl border border-[var(--theme-card-border)]">
              <div
                className="pointer-events-none absolute top-0 right-0 w-80 h-12 opacity-20"
                style={{
                  backgroundImage: 'url(/branding/seer-raven-pattern.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right center',
                  backgroundSize: 'contain',
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-medium theme-font-mono text-[var(--theme-text-primary)] tracking-tight">
                        Deep — Grant Evaluation
                      </h2>
                      <span className="osiris-pill osiris-pill-brand">
                        {proposals[selectedItem]?.id}
                      </span>
                    </div>
                    <div className="text-[11.5px] theme-font-mono uppercase tracking-[0.18em] text-[var(--theme-text-accent)] font-semibold">
                      AUTONOMOUS AGENT TRIAGE &amp; COMBINATORIAL LMSR
                    </div>
                    <p className="text-xs text-[var(--theme-text-muted)] pt-1 max-w-xl leading-relaxed">
                      Handles questions with many possible outcomes, including markets designed
                      for AI agents to trade. Autonomous agents forecast how human evaluators
                      will assess a large field of grant proposals.
                    </p>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-6 sm:gap-8">
                    <HeroBadgeCluster
                      label="Agents"
                      leftSymbols={[
                        { s: 'AI', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: '19', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: '◈', bg: '#2dd4bf', border: '#101013', darkText: true },
                        { s: 'S', bg: '#8F55F7', border: '#E9E9F5' },
                        { s: 'K', bg: '#1D1B30', border: '#BFBFE6' },
                      ]}
                    />
                    <HeroBadgeCluster
                      label="Outcomes"
                      leftSymbols={[
                        { s: 'N', bg: '#8F55F7', border: '#E9E9F5' },
                        { s: '∑', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: '142', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: '✓', bg: '#2dd4bf', border: '#101013', darkText: true },
                      ]}
                    />
                    <HeroBadgeCluster
                      label="Collateral"
                      leftSymbols={[
                        { s: 'G', bg: '#1A1A1E', border: '#9C6FF2' },
                        { s: 'Ξ', bg: '#7D33FF', border: '#E9E9F5' },
                      ]}
                      rightSymbols={[
                        { s: 's$', bg: '#2dd4bf', border: '#101013', darkText: true },
                        { s: '$', bg: '#8F55F7', border: '#E9E9F5' },
                      ]}
                    />
                  </div>
                </div>

                <div className="lg:col-span-4 flex items-center justify-center">
                  <DeepGeodesicWireframe />
                </div>

                <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedItem((prev) => (prev + 1) % proposals.length)
                    }
                    title="Cycle Active Proposal Signal"
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7D33FF] hover:text-[#9C6FF2] hover:bg-[#7D33FF]/10 transition-all group"
                  >
                    <ChevronRight className="w-10 h-10 stroke-[2.2] transition-transform group-hover:translate-x-0.5 drop-shadow-[0_0_12px_rgba(125,51,255,0.5)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    className="osiris-btn-primary px-3.5 py-2 rounded-xl text-[11.5px] theme-font-mono uppercase shrink-0"
                  >
                    All-Market Explorer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 space-y-3">
            {proposals.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setSelectedItem(idx)}
                className={`osiris-card p-4 cursor-pointer ${
                  selectedItem === idx ? 'osiris-card-selected' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs theme-font-mono">
                      <span className="text-[var(--theme-text-accent)] font-bold">{p.id}</span>
                      <span className="text-[var(--theme-text-muted)]">· {p.applicant}</span>
                      <span className="osiris-pill bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)] text-[var(--theme-text-secondary)]">
                        {p.agentsActive} AI Agents Trading
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-[var(--theme-text-primary)]">
                      {p.title}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0 theme-font-mono">
                    <div className="text-lg font-bold text-[var(--theme-text-primary)]">
                      {p.agentScore}
                    </div>
                    <div className="text-[11.5px] text-[var(--theme-text-accent)] font-medium">
                      {p.humanEvaluatorForecast}
                    </div>
                  </div>
                </div>
                <div className="mt-3 w-full h-2 osiris-hp-bar overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7D33FF] via-[#8F55F7] to-[#9C6FF2]"
                    style={{ width: `${p.agentConsensus}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 osiris-card p-5 space-y-4 h-fit">
            <div className="flex items-center gap-2 text-xs theme-font-mono text-[var(--theme-text-accent)] font-semibold uppercase">
              <Bot className="w-4 h-4" />
              <span>Agent Market Signal Inspector</span>
            </div>
            <h3 className="text-base font-medium text-[var(--theme-text-primary)]">
              {proposals[selectedItem]?.title}
            </h3>
            <div className="osiris-well p-3.5 space-y-2 text-xs">
              <div className="flex justify-between theme-font-mono">
                <span className="text-[var(--theme-text-muted)]">Forecasted Human Score</span>
                <span className="text-[var(--theme-text-primary)] font-bold">
                  {proposals[selectedItem]?.agentScore}
                </span>
              </div>
              <div className="flex justify-between theme-font-mono">
                <span className="text-[var(--theme-text-muted)]">Active Agent Traders</span>
                <span className="text-[var(--theme-text-accent)] font-semibold">
                  {proposals[selectedItem]?.agentsActive} Autonomous Agents
                </span>
              </div>
              <div className="flex justify-between theme-font-mono">
                <span className="text-[var(--theme-text-muted)]">Volume Traded</span>
                <span className="text-[var(--theme-text-secondary)] font-semibold">{proposals[selectedItem]?.volume}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
              {proposals[selectedItem]?.rationale}
            </p>
            <div className="p-3 rounded-lg bg-[#7D33FF]/10 border border-[#8F55F7]/40 text-[11.5px] theme-font-mono text-[var(--theme-text-secondary)]">
              ✓ Funding team receives prioritized triage queue while human evaluators make all
              final grant awards.
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'futarchy') {
    const proposals = [
      {
        id: 'GIP-114',
        dao: 'Gnosis DAO',
        title: 'Allocate 5,000 GNO to Incentivize Conditional Prediction Market Liquidity',
        metric: '90-Day Protocol TVL & Active Forecasters',
        passProjection: '$48.2M TVL (+19.3%)',
        failProjection: '$40.4M TVL (Baseline)',
        delta: '+$7.8M Expected Lift',
        liquidity: '$64.2k',
      },
      {
        id: 'SEP-029',
        dao: 'Safe Ecosystem',
        title: 'Integrate Native Risk Pricing Module into Safe{Wallet} Transaction Guard',
        metric: 'Quarterly Prevented Exploit Loss & Active Safes',
        passProjection: '1.42M Active Safes (+11.8%)',
        failProjection: '1.27M Active Safes',
        delta: '+150k Active Safes',
        liquidity: '$41.8k',
      },
      {
        id: 'KIP-088',
        dao: 'Kleros Cooperative',
        title: 'Reduce Fast-Track Arbitration Appeal Bond Multiplier by 15%',
        metric: 'Dispute Resolution Speed & Juror Participation',
        passProjection: '18.4h Median Finality',
        failProjection: '26.1h Median Finality',
        delta: '-7.7h Faster Finality',
        liquidity: '$29.5k',
      },
    ]

    return (
      <div className="space-y-7 select-none">
        {/* Top Expressive Display Title */}
        <div className="pt-2 pb-1 text-center space-y-2.5">
          <div className="inline-flex items-center justify-center gap-2.5 flex-wrap">
            <span className="text-[11.5px] sm:text-xs theme-font-mono uppercase tracking-[0.26em] text-[var(--theme-text-secondary)]">
              CONDITIONAL GOVERNANCE IMPACT FORECASTS
            </span>
            <span className="osiris-pill osiris-pill-brand inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full shadow-[0_0_14px_rgba(125,51,255,0.35)]">
              <Sparkles className="w-2.5 h-2.5 text-[#9C6FF2]" />
              <span className="text-[11.5px] tracking-wider normal-case font-semibold">
                DAO Decision Support
              </span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold theme-font-mono tracking-[0.12em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#7D33FF] via-[#9C6FF2] to-[#BFBFE6] drop-shadow-[0_0_28px_rgba(125,51,255,0.32)]">
            ://FUTARCHY
          </h1>
        </div>

        {/* Expressive Hero Banner Card with Overlapping Seer Orbital Emblem & 3D Bifurcation Wireframe */}
        <div className="relative pt-7">
          <div className="pointer-events-none absolute -top-2 left-7 sm:left-12 z-20 flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#9C6FF2]/45 animate-[spin_28s_linear_infinite]" />
            <div className="absolute inset-1.5 rounded-full border border-[#7D33FF]/50 shadow-[0_0_20px_rgba(125,51,255,0.4)]" />
            <div className="absolute top-1/2 -left-8 -right-8 h-[1px] bg-gradient-to-r from-transparent via-[#9C6FF2]/60 to-transparent" />
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#9C6FF2] shadow-lg flex items-center justify-center bg-[#101013]">
              <img
                src="/branding/seer-backdrop.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src="/branding/seer-logo.png"
                alt="Seer Futarchy Core"
                className="relative z-10 w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="osiris-card p-2 sm:p-3 border border-[#7D33FF]/45 shadow-[0_0_36px_-10px_rgba(125,51,255,0.28)]">
            <div className="osiris-well relative overflow-hidden px-6 sm:px-9 pt-10 pb-6 rounded-xl border border-[var(--theme-card-border)]">
              <div
                className="pointer-events-none absolute top-0 right-0 w-80 h-12 opacity-20"
                style={{
                  backgroundImage: 'url(/branding/seer-raven-pattern.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right center',
                  backgroundSize: 'contain',
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-medium theme-font-mono text-[var(--theme-text-primary)] tracking-tight">
                        Futarchy — DAO Impact Signals
                      </h2>
                      <span className="osiris-pill osiris-pill-brand">
                        IF PASSES / IF FAILS
                      </span>
                    </div>
                    <div className="text-[11.5px] theme-font-mono uppercase tracking-[0.18em] text-[var(--theme-text-accent)] font-semibold">
                      CONDITIONAL TOKEN FRAMEWORK · ADVISORY GOVERNANCE
                    </div>
                    <p className="text-xs text-[var(--theme-text-muted)] pt-1 max-w-xl leading-relaxed">
                      Uses conditional markets to forecast what a chosen measure of success
                      might look like if a proposal passes versus if it does not—giving a DAO
                      information to consider rather than making the decision for it.
                    </p>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-6 sm:gap-8">
                    <HeroBadgeCluster
                      label="DAOs"
                      leftSymbols={[
                        { s: 'G', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: 'S', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: 'K', bg: '#2dd4bf', border: '#101013', darkText: true },
                        { s: '◈', bg: '#8F55F7', border: '#E9E9F5' },
                        { s: 'Ξ', bg: '#1D1B30', border: '#BFBFE6' },
                      ]}
                    />
                    <HeroBadgeCluster
                      label="Branches"
                      leftSymbols={[
                        { s: 'P', bg: '#2dd4bf', border: '#101013' },
                        { s: 'F', bg: '#4A4660', border: '#BFBFE6' },
                      ]}
                      rightSymbols={[
                        { s: 'Δ', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: '%', bg: '#8F55F7', border: '#E9E9F5' },
                      ]}
                    />
                    <HeroBadgeCluster
                      label="Liquidity"
                      leftSymbols={[
                        { s: 's$', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: 'G', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: '$', bg: '#2dd4bf', border: '#101013', darkText: true },
                        { s: 'M', bg: '#8F55F7', border: '#E9E9F5' },
                      ]}
                    />
                  </div>
                </div>

                <div className="lg:col-span-4 flex items-center justify-center">
                  <FutarchyBifurcationWireframe />
                </div>

                <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    title="Explore Conditional Governance Markets"
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7D33FF] hover:text-[#9C6FF2] hover:bg-[#7D33FF]/10 transition-all group"
                  >
                    <ChevronRight className="w-10 h-10 stroke-[2.2] transition-transform group-hover:translate-x-0.5 drop-shadow-[0_0_12px_rgba(125,51,255,0.5)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    className="osiris-btn-primary px-3.5 py-2 rounded-xl text-[11.5px] theme-font-mono uppercase shrink-0"
                  >
                    Conditional Markets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {proposals.map((prop) => (
            <div key={prop.id} className="osiris-card p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs theme-font-mono">
                  <span className="osiris-pill osiris-pill-brand">
                    {prop.id} · {prop.dao}
                  </span>
                  <span className="text-[var(--theme-text-muted)]">Liq: {prop.liquidity}</span>
                </div>
                <h3 className="text-base font-medium text-[var(--theme-text-primary)] leading-snug">
                  {prop.title}
                </h3>
                <div className="text-xs theme-font-mono text-[var(--theme-text-accent)] font-medium">
                  Success Metric: {prop.metric}
                </div>
              </div>

              <div className="osiris-well p-3.5 space-y-3">
                <div className="p-2.5 rounded-lg bg-[#7D33FF]/12 border border-[#7D33FF]/40 flex items-center justify-between">
                  <span className="text-xs theme-font-mono text-[var(--theme-text-accent)] font-semibold">
                    IF PASSES
                  </span>
                  <span className="text-xs theme-font-mono font-bold text-[var(--theme-text-primary)]">
                    {prop.passProjection}
                  </span>
                </div>
                <div className="osiris-subcard p-2.5 rounded-lg flex items-center justify-between">
                  <span className="text-xs theme-font-mono text-[var(--theme-text-muted)] font-semibold">
                    IF FAILS
                  </span>
                  <span className="text-xs theme-font-mono font-bold text-[var(--theme-text-primary)]">
                    {prop.failProjection}
                  </span>
                </div>
                <div className="pt-1 flex items-center justify-between text-xs theme-font-mono">
                  <span className="text-[var(--theme-text-muted)]">Implied Net Effect</span>
                  <span className="text-[var(--theme-text-accent)] font-bold">{prop.delta}</span>
                </div>
              </div>

              <div className="text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--theme-panel-divider)]">
                <span>Advisory Signal Only</span>
                <span className="text-[var(--theme-text-secondary)] font-medium">DAO Retains Final Vote</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section === 'markets') {
    const submissions = [
      {
        id: 'SUB-14',
        title: 'Privacy-Preserving Orderflow Batch Auction on Gnosis',
        category: 'Protocol Infrastructure Track',
        selectionProb: 50.0,
        unitPrice: '50% · 6.3¢ of 12.5¢',
        staked: '$19.2k sDAI',
        status: 'High Selection Signal',
      },
      {
        id: 'SUB-09',
        title: 'Conditional Treasury Hedging SDK for DAO Working Groups',
        category: 'Governance Tooling Track',
        selectionProb: 64.0,
        unitPrice: '64% · 8.0¢ of 12.5¢',
        staked: '$14.8k sDAI',
        status: 'Strong Contender',
      },
      {
        id: 'SUB-27',
        title: 'Automated Reality.eth Verification & Citation Indexer',
        category: 'Oracle & Resolution Track',
        selectionProb: 52.0,
        unitPrice: '52% · 6.5¢ of 12.5¢',
        staked: '$11.4k sDAI',
        status: 'In Contention',
      },
      {
        id: 'SUB-03',
        title: 'Mobile Push Notifications for Scalar Market Thresholds',
        category: 'Consumer UX Track',
        selectionProb: 34.4,
        unitPrice: '34.4% · 4.3¢ of 12.5¢',
        staked: '$7.6k sDAI',
        status: 'Moderate Signal',
      },
    ]

    return (
      <div className="space-y-7 select-none">
        {/* Top Expressive Display Title */}
        <div className="pt-2 pb-1 text-center space-y-2.5">
          <div className="inline-flex items-center justify-center gap-2.5 flex-wrap">
            <span className="text-[11.5px] sm:text-xs theme-font-mono uppercase tracking-[0.26em] text-[var(--theme-text-secondary)]">
              OPPORTUNITY MARKETS · SUBMISSION SELECTION SIGNALS
            </span>
            <span className="osiris-pill osiris-pill-brand inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full shadow-[0_0_14px_rgba(125,51,255,0.35)]">
              <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
              <span className="text-[11.5px] tracking-wider normal-case font-semibold">
                Curation Layer
              </span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold theme-font-mono tracking-[0.12em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#7D33FF] via-[#9C6FF2] to-[#38BDF8] drop-shadow-[0_0_28px_rgba(125,51,255,0.32)]">
            ://MARKETS
          </h1>
        </div>

        {/* Expressive Hero Banner Card with Overlapping Seer Orbital Emblem & 3D Hyperboloid Convergence Wireframe */}
        <div className="relative pt-7">
          <div className="pointer-events-none absolute -top-2 left-7 sm:left-12 z-20 flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#9C6FF2]/45 animate-[spin_28s_linear_infinite]" />
            <div className="absolute inset-1.5 rounded-full border border-[#7D33FF]/50 shadow-[0_0_20px_rgba(125,51,255,0.4)]" />
            <div className="absolute top-1/2 -left-8 -right-8 h-[1px] bg-gradient-to-r from-transparent via-[#9C6FF2]/60 to-transparent" />
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#9C6FF2] shadow-lg flex items-center justify-center bg-[#101013]">
              <img
                src="/branding/seer-backdrop.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src="/branding/seer-logo.png"
                alt="Seer Opportunity Markets Core"
                className="relative z-10 w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="osiris-card p-2 sm:p-3 border border-[#7D33FF]/45 shadow-[0_0_36px_-10px_rgba(125,51,255,0.28)]">
            <div className="osiris-well relative overflow-hidden px-6 sm:px-9 pt-10 pb-6 rounded-xl border border-[var(--theme-card-border)]">
              <div
                className="pointer-events-none absolute top-0 right-0 w-80 h-12 opacity-20"
                style={{
                  backgroundImage: 'url(/branding/seer-raven-pattern.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right center',
                  backgroundSize: 'contain',
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-medium theme-font-mono text-[var(--theme-text-primary)] tracking-tight">
                        Opportunity Markets
                      </h2>
                      <span className="osiris-pill osiris-pill-brand">
                        SELECTION SIGNALS
                      </span>
                    </div>
                    <div className="text-[11.5px] theme-font-mono uppercase tracking-[0.18em] text-[var(--theme-text-accent)] font-semibold">
                      FORECASTING SUBMISSION SELECTION LIKELIHOOD
                    </div>
                    <p className="text-xs text-[var(--theme-text-muted)] pt-1 max-w-xl leading-relaxed">
                      Let traders forecast which submissions are likely to be selected, giving
                      reviewers another high-integrity signal while leaving the final selection
                      decision to them.
                    </p>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-6 sm:gap-8">
                    <HeroBadgeCluster
                      label="Tracks"
                      leftSymbols={[
                        { s: 'I', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: 'G', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: 'O', bg: '#38BDF8', border: '#101013', darkText: true },
                        { s: 'U', bg: '#8F55F7', border: '#E9E9F5' },
                      ]}
                    />
                    <HeroBadgeCluster
                      label="Signals"
                      leftSymbols={[
                        { s: 'S', bg: '#8F55F7', border: '#E9E9F5' },
                        { s: '◈', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: '%', bg: '#2dd4bf', border: '#101013', darkText: true },
                        { s: '✓', bg: '#7D33FF', border: '#E9E9F5' },
                      ]}
                    />
                    <HeroBadgeCluster
                      label="Staked"
                      leftSymbols={[
                        { s: 's$', bg: '#7D33FF', border: '#E9E9F5' },
                        { s: 'Ξ', bg: '#1A1A1E', border: '#9C6FF2' },
                      ]}
                      rightSymbols={[
                        { s: '$', bg: '#2dd4bf', border: '#101013', darkText: true },
                        { s: '53k', bg: '#8F55F7', border: '#E9E9F5' },
                      ]}
                    />
                  </div>
                </div>

                <div className="lg:col-span-4 flex items-center justify-center">
                  <MarketsConvergenceWireframe />
                </div>

                <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    title="Browse All Markets"
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7D33FF] hover:text-[#9C6FF2] hover:bg-[#7D33FF]/10 transition-all group"
                  >
                    <ChevronRight className="w-10 h-10 stroke-[2.2] transition-transform group-hover:translate-x-0.5 drop-shadow-[0_0_12px_rgba(125,51,255,0.5)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    className="osiris-btn-primary px-3.5 py-2 rounded-xl text-[11.5px] theme-font-mono uppercase shrink-0"
                  >
                    Browse All Markets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="osiris-card p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs theme-font-mono text-[var(--theme-text-accent)] font-semibold">
                    {sub.id} · {sub.category}
                  </span>
                  <h3 className="text-base font-medium text-[var(--theme-text-primary)] mt-1">
                    {sub.title}
                  </h3>
                </div>
                <div className="text-right theme-font-mono shrink-0">
                  <div className="text-base sm:text-lg font-bold text-[var(--theme-text-primary)]">
                    {sub.unitPrice}
                  </div>
                  <div className="text-[11.5px] text-[var(--theme-text-muted)]">Implied · Share of Cohort</div>
                </div>
              </div>

              <div className="osiris-well p-3 space-y-2">
                <div className="w-full h-2 osiris-hp-bar overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7D33FF] via-[#8F55F7] to-[#9C6FF2]"
                    style={{ width: `${sub.selectionProb}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs theme-font-mono text-[var(--theme-text-muted)]">
                  <span>Liquidity: {sub.staked}</span>
                  <span className="text-[var(--theme-text-accent)] font-semibold">{sub.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Risk Pricing View
  return <ReactorsView onNavigate={onNavigate} />
}
