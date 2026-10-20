import React, { useState, useMemo } from 'react'
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Info,
  Check,
  Sparkles,
} from 'lucide-react'
import { NavSection } from './EcosystemViews'

interface ReactorsViewProps {
  onNavigate: (section: NavSection) => void
}

interface CompositionRow {
  id: string
  token: string
  pool: string
  chain: string
  exchange: string
  allocation: string
  percentage: number
  color: string
}

interface ReactorPoolConfig {
  id: string
  codeName: string
  name: string
  apy: string
  tvl: string
  unit: string
  description: string
  compositionSubtitle: string
  rows: CompositionRow[]
  topDepositors: Array<{ rank: number; wallet: string; deposited: string }>
}

const REACTOR_POOLS: ReactorPoolConfig[] = [
  {
    id: 'autoeth',
    codeName: 'AUTOETH_',
    name: 'AUTOETH',
    apy: '8.54%',
    tvl: '$30.93M',
    unit: 'ETH',
    description:
      'ETH Autopools autonomously rebalance your LP positions across a set of DEXs and assets, while keeping you composable within DeFi.',
    compositionSubtitle:
      'How Autopilot allocates the Total ETH supplied across Tokens and Pools.',
    rows: [
      {
        id: 'eth-1',
        token: 'ETH',
        pool: 'WETH / wstETH',
        chain: 'Ethereum',
        exchange: 'Balancer v3',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#E9E9F5',
      },
      {
        id: 'eth-2',
        token: 'ETH',
        pool: 'ETH / rETH',
        chain: 'Ethereum',
        exchange: 'Curve NG',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#9C6FF2',
      },
      {
        id: 'eth-3',
        token: 'ETH',
        pool: 'WETH / osETH',
        chain: 'Ethereum',
        exchange: 'Uniswap v4',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#7D33FF',
      },
      {
        id: 'eth-4',
        token: 'ETH',
        pool: 'ETH / cbETH',
        chain: 'Ethereum',
        exchange: 'Aerodrome',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#8F55F7',
      },
      {
        id: 'eth-5',
        token: 'ETH',
        pool: 'WETH / sfrxETH',
        chain: 'Ethereum',
        exchange: 'Curve v2',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#BFBFE6',
      },
      {
        id: 'eth-6',
        token: 'ETH',
        pool: 'ETH / weETH',
        chain: 'Ethereum',
        exchange: 'Balancer v3',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#2dd4bf',
      },
      {
        id: 'eth-7',
        token: 'ETH',
        pool: 'WETH / ezETH',
        chain: 'Ethereum',
        exchange: 'Maverick v2',
        allocation: '3.27M',
        percentage: 26.4,
        color: '#4A4660',
      },
    ],
    topDepositors: [
      { rank: 1, wallet: '0xosh...i7ds', deposited: '1,625 ETH' },
      { rank: 2, wallet: '0xosh...i7ds', deposited: '1,625 ETH' },
      { rank: 3, wallet: '0xosh...i7ds', deposited: '1,625 ETH' },
      { rank: 4, wallet: '0xosh...i7ds', deposited: '1,625 ETH' },
      { rank: 5, wallet: '0xosh...i7ds', deposited: '1,625 ETH' },
    ],
  },
  {
    id: 'autosdai',
    codeName: 'AUTOSDAI_',
    name: 'AUTOSDAI',
    apy: '11.28%',
    tvl: '$42.18M',
    unit: 'sDAI',
    description:
      'sDAI Autopools dynamically route savings collateral across Seer conditional risk tranches and Gnosis/Mainnet yield venues driven by live implied incident probabilities.',
    compositionSubtitle:
      'How Autopilot allocates Total sDAI supplied across Conditional Markets and Lending Pools.',
    rows: [
      {
        id: 'sdai-1',
        token: 'sDAI',
        pool: 'Spark DSR Core',
        chain: 'Gnosis',
        exchange: 'Spark Lend',
        allocation: '9.40M',
        percentage: 28.2,
        color: '#E9E9F5',
      },
      {
        id: 'sdai-2',
        token: 'sDAI',
        pool: 'sDAI / USDC',
        chain: 'Ethereum',
        exchange: 'Curve NG',
        allocation: '7.85M',
        percentage: 22.4,
        color: '#9C6FF2',
      },
      {
        id: 'sdai-3',
        token: 'sDAI',
        pool: 'Seer Tier-1 CTF',
        chain: 'Gnosis',
        exchange: 'Seer AMM',
        allocation: '6.12M',
        percentage: 17.5,
        color: '#7D33FF',
      },
      {
        id: 'sdai-4',
        token: 'sDAI',
        pool: 'Aave v3 sDAI',
        chain: 'Ethereum',
        exchange: 'Aave v3',
        allocation: '5.10M',
        percentage: 14.1,
        color: '#8F55F7',
      },
      {
        id: 'sdai-5',
        token: 'sDAI',
        pool: 'sDAI / GHO',
        chain: 'Ethereum',
        exchange: 'Balancer v3',
        allocation: '4.05M',
        percentage: 10.6,
        color: '#BFBFE6',
      },
      {
        id: 'sdai-6',
        token: 'sDAI',
        pool: 'CoW AMM Vault',
        chain: 'Gnosis',
        exchange: 'CoW AMM',
        allocation: '2.96M',
        percentage: 7.2,
        color: '#2dd4bf',
      },
    ],
    topDepositors: [
      { rank: 1, wallet: '0x71C...9A23', deposited: '4,850,000 sDAI' },
      { rank: 2, wallet: '0x94A...3F10', deposited: '3,210,000 sDAI' },
      { rank: 3, wallet: '0x38E...B419', deposited: '2,740,000 sDAI' },
      { rank: 4, wallet: '0xC02...88D1', deposited: '1,980,000 sDAI' },
      { rank: 5, wallet: '0x5F1...12E7', deposited: '1,625,000 sDAI' },
    ],
  },
  {
    id: 'autogno',
    codeName: 'AUTOGNO_',
    name: 'AUTOGNO',
    apy: '9.42%',
    tvl: '$18.64M',
    unit: 'GNO',
    description:
      'GNO Autopools continuously optimize validator staking and futarchy governance liquidity across Gnosis Chain and Ethereum L1.',
    compositionSubtitle:
      'How Autopilot allocates Total GNO supplied across Staking and Futarchy Pools.',
    rows: [
      {
        id: 'gno-1',
        token: 'GNO',
        pool: 'GNO / wstETH',
        chain: 'Gnosis',
        exchange: 'Balancer v3',
        allocation: '4.12M',
        percentage: 27.5,
        color: '#E9E9F5',
      },
      {
        id: 'gno-2',
        token: 'GNO',
        pool: 'GNO / sDAI',
        chain: 'Gnosis',
        exchange: 'Seer Futarchy',
        allocation: '3.80M',
        percentage: 24.8,
        color: '#9C6FF2',
      },
      {
        id: 'gno-3',
        token: 'GNO',
        pool: 'osGNO / GNO',
        chain: 'Gnosis',
        exchange: 'Curve NG',
        allocation: '3.45M',
        percentage: 21.0,
        color: '#7D33FF',
      },
      {
        id: 'gno-4',
        token: 'GNO',
        pool: 'GNO / WETH',
        chain: 'Ethereum',
        exchange: 'Uniswap v4',
        allocation: '2.90M',
        percentage: 16.2,
        color: '#8F55F7',
      },
      {
        id: 'gno-5',
        token: 'GNO',
        pool: 'CoW LVR Shield',
        chain: 'Gnosis',
        exchange: 'CoW AMM',
        allocation: '2.15M',
        percentage: 10.5,
        color: '#2dd4bf',
      },
    ],
    topDepositors: [
      { rank: 1, wallet: '0xgn0...4d2a', deposited: '14,200 GNO' },
      { rank: 2, wallet: '0xkler...91f0', deposited: '11,850 GNO' },
      { rank: 3, wallet: '0xsafe...3c88', deposited: '9,400 GNO' },
      { rank: 4, wallet: '0x04b...e812', deposited: '7,120 GNO' },
      { rank: 5, wallet: '0x89a...77c1', deposited: '5,640 GNO' },
    ],
  },
]

const CHAIN_BADGES = [
  { symbol: 'Ξ', bg: '#7D33FF', border: '#9C6FF2', label: 'Ethereum' },
  { symbol: 'G', bg: '#1A1A1E', border: '#8F55F7', label: 'Gnosis' },
  { symbol: 'A', bg: '#1D1B30', border: '#38BDF8', label: 'Arbitrum' },
  { symbol: 'O', bg: '#4A4660', border: '#9C6FF2', label: 'Optimism' },
  { symbol: 'B', bg: '#7D33FF', border: '#BFBFE6', label: 'Base' },
]

const TOKEN_BADGES = [
  { symbol: 'Ξ', bg: '#8F55F7', border: '#E9E9F5', label: 'ETH' },
  { symbol: 'st', bg: '#2dd4bf', border: '#E9E9F5', label: 'wstETH' },
  { symbol: 's$', bg: '#7D33FF', border: '#9C6FF2', label: 'sDAI' },
  { symbol: 'rE', bg: '#4A4660', border: '#BFBFE6', label: 'rETH' },
  { symbol: '◈', bg: '#1A1A1E', border: '#9C6FF2', label: 'weETH' },
]

/**
 * 3D Spindle/Magnetic Torus Wireframe rendered in Seer Brand Purple/Lavender
 */
const SeerTorusWireframe: React.FC = () => {
  const { meridians, parallels } = useMemo(() => {
    const mPaths: Array<{ d: string; opacity: number }> = []
    const pPaths: Array<{ d: string; opacity: number }> = []

    const cx = 150
    const cy = 78
    const R = 48
    const r = 46
    const tilt = 0.22 // slight vertical perspective tilt

    const project = (u: number, v: number) => {
      const x3d = (R + r * Math.cos(v)) * Math.cos(u)
      const y3d = r * Math.sin(v)
      const z3d = (R + r * Math.cos(v)) * Math.sin(u)

      // Rotate slightly around X-axis for 3D depth
      const yRot = y3d * Math.cos(tilt) - z3d * Math.sin(tilt)
      const zRot = y3d * Math.sin(tilt) + z3d * Math.cos(tilt)

      const perspective = 1 + zRot / 420
      return {
        x: cx + x3d * perspective,
        y: cy + yRot * perspective,
        z: zRot,
      }
    }

    // 36 meridian rings around the torus
    const numU = 36
    const stepsV = 40
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

    // 16 parallel latitude rings
    const numV = 16
    const stepsU = 60
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
      className="w-full max-w-[300px] h-[148px] overflow-visible select-none"
      aria-label="Seer Magnetic Torus Reactor Wireframe"
    >
      <defs>
        <radialGradient id="seerTorusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7D33FF" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#8F55F7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#101013" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="seerTorusStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BFBFE6" />
          <stop offset="50%" stopColor="#9C6FF2" />
          <stop offset="100%" stopColor="#7D33FF" />
        </linearGradient>
      </defs>

      {/* Ambient core glow */}
      <ellipse cx="150" cy="78" rx="105" ry="64" fill="url(#seerTorusGlow)" />

      {/* Parallel rings */}
      {parallels.map((p, idx) => (
        <path
          key={`p-${idx}`}
          d={p.d}
          fill="none"
          stroke="#8F55F7"
          strokeOpacity={p.opacity}
          strokeWidth="0.65"
        />
      ))}

      {/* Meridian rings */}
      {meridians.map((m, idx) => (
        <path
          key={`m-${idx}`}
          d={m.d}
          fill="none"
          stroke="url(#seerTorusStroke)"
          strokeOpacity={m.opacity}
          strokeWidth="0.8"
        />
      ))}

      {/* Center singularity focal ring */}
      <ellipse
        cx="150"
        cy="78"
        rx="7"
        ry="42"
        fill="none"
        stroke="#E9E9F5"
        strokeOpacity="0.45"
        strokeWidth="0.9"
        strokeDasharray="2 3"
      />

      {/* Comparative Risk Data Callout */}
      <g transform="translate(132, 12)">
        <rect x="0" y="0" width="160" height="24" rx="6" fill="#101013" fillOpacity="0.92" stroke="#9C6FF2" strokeWidth="1" />
        <text x="80" y="16" textAnchor="middle" fill="#E9E9F5" fontSize="11.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          AAVE 1.2% · BRIDGE 8.7%
        </text>
      </g>
    </svg>
  )
}

/**
 * Corner technical ticks for Osiris cards (matching the reference's chamfered frame detail in Seer brand colors)
 */
const OsirisCornerTicks: React.FC = () => (
  <>
    <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t border-l border-[#9C6FF2]/60 rounded-tl-[14px]" />
    <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t border-r border-[#9C6FF2]/60 rounded-tr-[14px]" />
    <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#9C6FF2]/60 rounded-bl-[14px]" />
    <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#9C6FF2]/60 rounded-br-[14px]" />
  </>
)

/**
 * Cluster of Chain = Token icon badges used in the top Reactors card
 */
const MetricBadgeCluster: React.FC<{ label: string }> = ({ label }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-1 text-[11.5px] theme-font-mono text-[var(--theme-text-muted)]">
      <span>{label}</span>
      <Info className="w-3 h-3 text-[var(--theme-text-accent)] opacity-80" />
    </div>
    <div className="flex items-center gap-1.5">
      {/* Left overlapping pair */}
      <div className="flex items-center -space-x-2">
        <span className="w-6 h-6 rounded-full bg-[#7D33FF] border border-[#E9E9F5]/80 flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-white shadow-sm">
          Ξ
        </span>
        <span className="w-6 h-6 rounded-full bg-[#1A1A1E] border border-[#9C6FF2] flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-[#E9E9F5] shadow-sm">
          ◈
        </span>
      </div>
      <span className="text-[11.5px] theme-font-mono font-bold text-[var(--theme-text-accent)]">
        =
      </span>
      {/* Right overlapping trio */}
      <div className="flex items-center -space-x-2">
        <span className="w-6 h-6 rounded-full bg-[#2dd4bf] border border-[#101013] flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-[#101013] shadow-sm">
          T
        </span>
        <span className="w-6 h-6 rounded-full bg-[#8F55F7] border border-[#E9E9F5]/80 flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-white shadow-sm">
          $
        </span>
        <span className="w-6 h-6 rounded-full bg-[#1D1B30] border border-[#BFBFE6]/80 flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-[#E9E9F5] shadow-sm">
          M
        </span>
      </div>
    </div>
  </div>
)

export const ReactorsView: React.FC<ReactorsViewProps> = ({ onNavigate }) => {
  const [poolIndex, setPoolIndex] = useState(0)
  const [compositionTab, setCompositionTab] = useState<
    'TOKEN' | 'ALLOCATION' | 'EXCHANGE' | 'PERCENTAGE'
  >('TOKEN')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [tradeMode, setTradeMode] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT')
  const [amount, setAmount] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<string>('')
  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false)
  const [autoStake, setAutoStake] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const activePool = REACTOR_POOLS[poolIndex]

  const handleNextPool = () => {
    setPoolIndex((prev) => (prev + 1) % REACTOR_POOLS.length)
    setHoveredRow(null)
  }

  const handlePrevPool = () => {
    setPoolIndex((prev) => (prev - 1 + REACTOR_POOLS.length) % REACTOR_POOLS.length)
    setHoveredRow(null)
  }

  // Compute SVG Donut segments
  const donutSegments = useMemo(() => {
    const rows = activePool.rows
    const totalWeight = rows.reduce((acc, r) => acc + r.percentage, 0)
    const radius = 78
    const circumference = 2 * Math.PI * radius
    let accumulatedAngle = 0

    return rows.map((row, idx) => {
      const fraction = row.percentage / totalWeight
      const gapFraction = 0.012
      const visibleFraction = Math.max(0.02, fraction - gapFraction)
      const strokeDasharray = `${(visibleFraction * circumference).toFixed(2)} ${circumference.toFixed(2)}`
      const strokeDashoffset = (-accumulatedAngle * circumference).toFixed(2)
      accumulatedAngle += fraction
      return {
        ...row,
        idx,
        radius,
        strokeDasharray,
        strokeDashoffset,
      }
    })
  }, [activePool])

  const tokenOptions = [
    { symbol: 'ETH', name: 'Ether', balance: '4.82 ETH' },
    { symbol: 'wstETH', name: 'Wrapped Lido Staked ETH', balance: '12.40 wstETH' },
    { symbol: 'rETH', name: 'Rocket Pool ETH', balance: '3.15 rETH' },
    { symbol: 'sDAI', name: 'Savings xDAI (Seer Collateral)', balance: '4,250.00 sDAI' },
  ]

  const currentTokenObj = tokenOptions.find((t) => t.symbol === selectedToken)
  const numericAmount = parseFloat(amount) || 0
  const estimatedReceive =
    numericAmount > 0
      ? `${(numericAmount * 0.995).toFixed(4)} ${activePool.name}`
      : '-'

  const faqs = [
    {
      question: 'What is the primary purpose of this platform?',
      answer:
        'Seer Reactors are autonomous risk-repositioning autopools. They combine continuous prediction market risk signals (exploit & depeg probabilities calibrated in sDAI) with automated LP rebalancing across integrated DEXs and lending markets.',
    },
    {
      question: 'Which cryptocurrencies are currently supported?',
      answer:
        'Reactors currently support ETH, major liquid staking derivatives (wstETH, rETH, weETH, cbETH, osETH), yield-bearing sDAI collateral, and GNO across Ethereum Mainnet and Gnosis Chain.',
    },
    {
      question: 'How do Seer risk markets protect autopool liquidity?',
      answer:
        'Whenever a protocol’s implied 12-month incident probability rises above its governance threshold in Seer’s conditional markets, Autopilot autonomously migrates LP exposure toward lower-risk venues without manual intervention.',
    },
  ]

  return (
    <div className="w-full max-w-[1180px] mx-auto pb-16 space-y-7 select-none">
      {/* =====================================================================
          1. TOP HEADER: AUTOMATED AI RISK REPOSITIONING + ://REACTORS
      ===================================================================== */}
      <div className="pt-2 pb-4 text-center space-y-2.5">
        <div className="inline-flex items-center justify-center gap-2.5 flex-wrap">
          <span className="text-[11.5px] sm:text-xs theme-font-mono uppercase tracking-[0.26em] text-[var(--theme-text-secondary)]">
            AUTOMATED AI RISK REPOSITIONING
          </span>
          <span className="osiris-pill osiris-pill-brand inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full shadow-[0_0_14px_rgba(125,51,255,0.35)]">
            <Sparkles className="w-2.5 h-2.5 text-[#9C6FF2]" />
            <span className="text-[11.5px] tracking-wider normal-case font-semibold">
              Beta 2.0
            </span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold theme-font-mono tracking-[0.12em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#7D33FF] via-[#9C6FF2] to-[#BFBFE6] drop-shadow-[0_0_28px_rgba(125,51,255,0.32)]">
          ://REACTORS
        </h1>
      </div>

      {/* =====================================================================
          2. FEATURED REACTORS HERO BANNER WITH OVERLAPPING ORBITAL BADGE & TORUS
      ===================================================================== */}
      <div className="relative pt-7">
        {/* Top-Left Overlapping Concentric Orbital Badge */}
        <div className="pointer-events-none absolute -top-2 left-7 sm:left-12 z-20 flex items-center justify-center w-20 h-20">
          {/* Outer orbital ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#9C6FF2]/45 animate-[spin_28s_linear_infinite]" />
          <div className="absolute inset-1.5 rounded-full border border-[#7D33FF]/50 shadow-[0_0_20px_rgba(125,51,255,0.4)]" />
          {/* Horizontal crosshair flare lines */}
          <div className="absolute top-1/2 -left-8 -right-8 h-[1px] bg-gradient-to-r from-transparent via-[#9C6FF2]/60 to-transparent" />
          {/* Inner circular avatar with Seer brand backdrop + logo */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#9C6FF2] shadow-lg flex items-center justify-center bg-[#101013]">
            <img
              src="/branding/seer-backdrop.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img
              src="/branding/seer-logo.png"
              alt="Seer Reactor Core"
              className="relative z-10 w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            />
          </div>
        </div>

        {/* Outer Framed Hero Card */}
        <div className="osiris-card p-2 sm:p-3 border border-[#7D33FF]/45 shadow-[0_0_36px_-10px_rgba(125,51,255,0.28)]">
          <div className="osiris-well relative overflow-hidden px-6 sm:px-9 pt-10 pb-6 rounded-xl border border-[var(--theme-card-border)]">
            {/* Subtle Seer Raven Pattern Watermark in Top-Right */}
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
              {/* Left Column: Title, Subtitle, Description, 3 Badge Clusters */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-medium theme-font-mono text-[var(--theme-text-primary)] tracking-tight">
                      Reactors
                    </h2>
                    <span className="osiris-pill osiris-pill-brand">
                      {activePool.codeName}
                    </span>
                  </div>
                  <div className="text-[11.5px] theme-font-mono uppercase tracking-[0.18em] text-[var(--theme-text-accent)] font-semibold">
                    SEER AUTOPOOLS
                  </div>
                  <p className="text-xs text-[var(--theme-text-muted)] pt-1 max-w-md leading-relaxed">
                    Autopool featuring ETH LSTs &amp; sDAI deployed across integrated DEXs and
                    conditional risk markets.
                  </p>
                </div>

                {/* Chains / TVL / APR Badge Clusters */}
                <div className="pt-1 flex flex-wrap items-center gap-6 sm:gap-8">
                  <MetricBadgeCluster label="Chains" />
                  <MetricBadgeCluster label="TVL" />
                  <MetricBadgeCluster label="APR" />
                </div>
              </div>

              {/* Center-Right: 3D Wireframe Torus */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <SeerTorusWireframe />
              </div>

              {/* Far Right: Next Reactor Chevron Button */}
              <div className="lg:col-span-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNextPool}
                  title="Cycle to next Seer Reactor"
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7D33FF] hover:text-[#9C6FF2] hover:bg-[#7D33FF]/10 transition-all group"
                >
                  <ChevronRight className="w-10 h-10 stroke-[2.2] transition-transform group-hover:translate-x-0.5 drop-shadow-[0_0_12px_rgba(125,51,255,0.5)]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BREADCRUMB + REACTOR POOL SELECTOR PILLS
      ===================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={handlePrevPool}
          className="inline-flex items-center gap-1.5 text-xs theme-font-mono uppercase tracking-wider text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-accent)] transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--theme-text-accent)]" />
          <span>REACTORS</span>
        </button>

        <div className="flex items-center gap-2">
          {REACTOR_POOLS.map((pool, idx) => {
            const isSelected = idx === poolIndex
            return (
              <button
                key={pool.id}
                type="button"
                onClick={() => {
                  setPoolIndex(idx)
                  setHoveredRow(null)
                }}
                className={`px-3 py-1 rounded-md text-xs theme-font-mono transition-all ${
                  isSelected
                    ? 'osiris-pill-brand font-semibold shadow-sm'
                    : 'bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                }`}
              >
                {pool.codeName}
              </button>
            )
          })}
        </div>
      </div>

      {/* =====================================================================
          4. ACTIVE REACTOR BANNER (AUTOETH_)
      ===================================================================== */}
      <div className="osiris-card p-6 sm:p-8 relative">
        <OsirisCornerTicks />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex items-center md:justify-center">
            <div className="text-3xl sm:text-4xl font-bold theme-font-mono tracking-tight text-[var(--theme-text-primary)]">
              {activePool.name}
              <span className="text-[#9C6FF2] animate-pulse">_</span>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-xs sm:text-sm theme-font-mono text-[var(--theme-text-muted)] leading-relaxed">
              {activePool.description}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. MAIN TWO-COLUMN REACTOR WORKSPACE
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (7 cols): KPI Strip, Composition, Top Depositors, FAQ */}
        <div className="lg:col-span-7 space-y-6">
          {/* 5-Box KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="osiris-card p-3.5 text-center space-y-1">
              <div className="text-[11.5px] theme-font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                NAME
              </div>
              <div className="text-sm sm:text-base font-bold theme-font-mono text-[var(--theme-text-primary)]">
                {activePool.name}
              </div>
            </div>

            <div className="osiris-card p-3.5 text-center space-y-1">
              <div className="text-[11.5px] theme-font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                APY
              </div>
              <div className="text-sm sm:text-base font-bold theme-font-mono text-[#2dd4bf]">
                {activePool.apy}
              </div>
            </div>

            <div className="osiris-card p-3.5 text-center space-y-1">
              <div className="text-[11.5px] theme-font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                TVL
              </div>
              <div className="text-sm sm:text-base font-bold theme-font-mono text-[var(--theme-text-primary)]">
                {activePool.tvl}
              </div>
            </div>

            <div className="osiris-card p-3.5 text-center space-y-1.5 flex flex-col items-center justify-center">
              <div className="text-[11.5px] theme-font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                CHAINS
              </div>
              <div className="flex items-center justify-center -space-x-1.5">
                {CHAIN_BADGES.map((c, i) => (
                  <span
                    key={i}
                    title={c.label}
                    style={{ backgroundColor: c.bg, borderColor: c.border }}
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-white shadow-sm"
                  >
                    {c.symbol}
                  </span>
                ))}
              </div>
            </div>

            <div className="osiris-card p-3.5 text-center space-y-1.5 flex flex-col items-center justify-center col-span-2 sm:col-span-1">
              <div className="text-[11.5px] theme-font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                TOKENS
              </div>
              <div className="flex items-center justify-center -space-x-1.5">
                {TOKEN_BADGES.map((t, i) => (
                  <span
                    key={i}
                    title={t.label}
                    style={{ backgroundColor: t.bg, borderColor: t.border }}
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-[11.5px] theme-font-mono font-bold text-white shadow-sm"
                  >
                    {t.symbol}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AUTOPOOL COMPOSITION Card */}
          <div className="osiris-card p-6 sm:p-7 space-y-6 relative">
            <OsirisCornerTicks />

            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold theme-font-mono uppercase tracking-wider text-[var(--theme-text-primary)]">
                AUTOPOOL COMPOSITION
              </h3>
              <p className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                {activePool.compositionSubtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-6 border-b border-[var(--theme-panel-divider)] text-xs theme-font-mono">
              {(['TOKEN', 'ALLOCATION', 'EXCHANGE', 'PERCENTAGE'] as const).map(
                (tab) => {
                  const active = compositionTab === tab
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setCompositionTab(tab)}
                      className={`pb-2.5 uppercase tracking-wider transition-colors relative ${
                        active
                          ? 'text-[var(--theme-text-primary)] font-semibold'
                          : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)]'
                      }`}
                    >
                      {tab}
                      {active && (
                        <span className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-[#7D33FF] to-[#9C6FF2]" />
                      )}
                    </button>
                  )
                }
              )}
            </div>

            {/* Donut Chart + Composition Table */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-1">
              {/* Left: Double-Ring Segmented SVG Donut */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full -rotate-90 overflow-visible"
                  >
                    {/* Outer thin technical ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="92"
                      fill="none"
                      stroke="currentColor"
                      className="text-[#9C6FF2]/35"
                      strokeWidth="1.2"
                    />

                    {/* Track ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="var(--theme-donut-track)"
                      strokeWidth="12"
                    />

                    {/* Segmented Donut Arcs */}
                    {donutSegments.map((seg) => {
                      const isHovered = hoveredRow === seg.idx
                      return (
                        <circle
                          key={seg.id}
                          cx="100"
                          cy="100"
                          r={seg.radius}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth={isHovered ? 15 : 11}
                          strokeDasharray={seg.strokeDasharray}
                          strokeDashoffset={seg.strokeDashoffset}
                          className="transition-all duration-200 cursor-pointer"
                          style={{
                            filter: isHovered
                              ? 'drop-shadow(0 0 8px rgba(156,111,242,0.65))'
                              : 'none',
                          }}
                          onMouseEnter={() => setHoveredRow(seg.idx)}
                          onMouseLeave={() => setHoveredRow(null)}
                        />
                      )
                    })}

                    {/* Inner thin technical ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="64"
                      fill="none"
                      stroke="currentColor"
                      className="text-[#9C6FF2]/35"
                      strokeWidth="1.2"
                    />
                  </svg>

                  {/* Center TVL Readout */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <div className="text-2xl sm:text-3xl font-bold theme-font-mono text-[var(--theme-text-primary)] tracking-tight">
                      {hoveredRow !== null
                        ? `$${activePool.rows[hoveredRow].allocation}`
                        : activePool.tvl}
                    </div>
                    {hoveredRow !== null && (
                      <div className="text-[11.5px] theme-font-mono text-[var(--theme-text-accent)] mt-0.5">
                        {activePool.rows[hoveredRow].exchange} ·{' '}
                        {activePool.rows[hoveredRow].percentage}%
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Allocation Breakdown Table */}
              <div className="md:col-span-7 overflow-x-auto">
                <table className="w-full text-left border-collapse theme-font-mono text-xs">
                  <thead>
                    <tr className="text-[11.5px] uppercase tracking-wider text-[var(--theme-text-muted)] border-b border-[var(--theme-panel-divider)]">
                      <th className="pb-2.5 font-normal">
                        {compositionTab === 'EXCHANGE' ? 'EXCHANGE' : 'TOKEN'}
                      </th>
                      <th className="pb-2.5 font-normal">CHAIN</th>
                      <th className="pb-2.5 font-normal text-right">ALLOCATION</th>
                      <th className="pb-2.5 font-normal text-right">PERCENTAGE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--theme-panel-divider)]/40">
                    {activePool.rows.map((row, idx) => {
                      const isHovered = hoveredRow === idx
                      return (
                        <tr
                          key={row.id}
                          onMouseEnter={() => setHoveredRow(idx)}
                          onMouseLeave={() => setHoveredRow(null)}
                          className={`transition-colors cursor-pointer ${
                            isHovered ? 'bg-[#7D33FF]/12' : 'hover:bg-[#7D33FF]/5'
                          }`}
                        >
                          <td className="py-2.5 text-[var(--theme-text-primary)] font-medium flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: row.color }}
                            />
                            <span>
                              {compositionTab === 'EXCHANGE'
                                ? row.exchange
                                : compositionTab === 'ALLOCATION'
                                ? row.pool
                                : row.token}
                            </span>
                          </td>
                          <td className="py-2.5 text-[var(--theme-text-muted)]">
                            {row.chain}
                          </td>
                          <td className="py-2.5 text-right text-[var(--theme-text-secondary)]">
                            {row.allocation}
                          </td>
                          <td className="py-2.5 text-right text-[var(--theme-text-primary)] font-semibold">
                            {row.percentage.toFixed(1)}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* TOP DEPOSITORS Card */}
          <div className="osiris-card p-6 sm:p-7 space-y-4 relative">
            <OsirisCornerTicks />
            <h3 className="text-base sm:text-lg font-semibold theme-font-mono uppercase tracking-wider text-[var(--theme-text-primary)]">
              TOP DEPOSITORS
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse theme-font-mono text-xs">
                <thead>
                  <tr className="text-[11.5px] uppercase tracking-wider text-[var(--theme-text-muted)] border-b border-[var(--theme-panel-divider)]">
                    <th className="pb-2.5 font-normal w-10">#</th>
                    <th className="pb-2.5 font-normal">WALLET</th>
                    <th className="pb-2.5 font-normal text-right">DEPOSITED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--theme-panel-divider)]/40">
                  {activePool.topDepositors.map((dep) => (
                    <tr
                      key={dep.rank}
                      className="hover:bg-[#7D33FF]/5 transition-colors"
                    >
                      <td className="py-2.5 text-[var(--theme-text-muted)]">
                        {dep.rank}
                      </td>
                      <td className="py-2.5 text-[var(--theme-text-secondary)]">
                        {dep.wallet}
                      </td>
                      <td className="py-2.5 text-right text-[var(--theme-text-primary)] font-medium">
                        {dep.deposited}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="osiris-card p-6 sm:p-7 space-y-4 relative">
            <OsirisCornerTicks />
            <h3 className="text-base sm:text-lg font-semibold theme-font-mono uppercase tracking-wider text-[var(--theme-text-primary)]">
              FAQ
            </h3>

            <div className="divide-y divide-[var(--theme-panel-divider)]">
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div key={idx} className="py-3.5 first:pt-1 last:pb-1">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left text-xs sm:text-sm theme-font-mono text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[var(--theme-text-muted)] transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[var(--theme-text-accent)]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2.5 text-xs text-[var(--theme-text-muted)] leading-relaxed pr-6">
                        {item.answer}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): DEPOSIT / WITHDRAW INTERACTIVE TERMINAL */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="osiris-card overflow-visible relative">
            <OsirisCornerTicks />

            {/* Top Notched Tab Header (DEPOSIT / WITHDRAW) */}
            <div className="grid grid-cols-2 border-b border-[var(--theme-panel-divider)] bg-[var(--theme-well-bg)]/60 rounded-t-[14px] overflow-hidden">
              {(['DEPOSIT', 'WITHDRAW'] as const).map((tab) => {
                const active = tradeMode === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setTradeMode(tab)}
                    className={`py-3.5 px-5 text-xs theme-font-mono uppercase tracking-wider font-semibold transition-all relative ${
                      active
                        ? 'bg-[var(--theme-panel-bg)] text-[var(--theme-text-primary)] border-t-2 border-t-[#7D33FF]'
                        : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              {/* Numeric Input Line */}
              <div className="space-y-2">
                <div className="border-b border-[var(--theme-panel-divider)] pb-2.5 flex items-baseline justify-between gap-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-3xl sm:text-4xl theme-font-mono font-medium text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] focus:outline-none"
                  />
                  {selectedToken && (
                    <span className="text-xs theme-font-mono text-[var(--theme-text-accent)] font-semibold shrink-0">
                      {selectedToken}
                    </span>
                  )}
                </div>
              </div>

              {/* Token Selector Dropdown */}
              <div className="space-y-2 relative">
                <button
                  type="button"
                  onClick={() => setTokenDropdownOpen((o) => !o)}
                  className="w-full osiris-well px-4 py-3 flex items-center justify-between text-xs theme-font-mono text-[var(--theme-text-primary)] hover:border-[#9C6FF2]/60 transition-colors"
                >
                  <span>
                    {currentTokenObj
                      ? `${currentTokenObj.symbol} — ${currentTokenObj.name}`
                      : 'Select Token'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--theme-text-muted)] transition-transform ${
                      tokenDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {tokenDropdownOpen && (
                  <div className="absolute left-0 right-0 top-12 z-30 osiris-card p-1.5 border border-[#8F55F7]/50 shadow-2xl space-y-1">
                    {tokenOptions.map((tok) => (
                      <button
                        key={tok.symbol}
                        type="button"
                        onClick={() => {
                          setSelectedToken(tok.symbol)
                          setTokenDropdownOpen(false)
                        }}
                        className="w-full px-3 py-2 rounded-lg text-left text-xs theme-font-mono flex items-center justify-between hover:bg-[#7D33FF]/20 transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-[var(--theme-text-primary)]">
                            {tok.symbol}
                          </span>
                          <span className="text-[var(--theme-text-muted)] ml-2">
                            {tok.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11.5px] text-[var(--theme-text-accent)]">
                            {tok.balance}
                          </span>
                          {selectedToken === tok.symbol && (
                            <Check className="w-3.5 h-3.5 text-[#2dd4bf]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] pt-0.5">
                  <span>
                    Current Balance: {currentTokenObj ? currentTokenObj.balance : 'N/A'}
                  </span>
                  {currentTokenObj && (
                    <button
                      type="button"
                      onClick={() =>
                        setAmount(
                          currentTokenObj.balance.split(' ')[0].replace(/,/g, '')
                        )
                      }
                      className="text-[var(--theme-text-accent)] hover:underline font-semibold"
                    >
                      MAX
                    </button>
                  )}
                </div>
              </div>

              {/* Execution Parameters */}
              <div className="pt-4 space-y-3.5 border-t border-[var(--theme-panel-divider)] text-xs theme-font-mono">
                {/* Auto-stake row with custom toggle */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[var(--theme-text-muted)]">
                    <span>Auto-stake</span>
                    <Info className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoStake}
                    onClick={() => setAutoStake((s) => !s)}
                    className={`w-12 h-5 rounded-sm p-0.5 transition-colors flex items-center ${
                      autoStake
                        ? 'bg-[#7D33FF]/35 border border-[#9C6FF2]'
                        : 'bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)]'
                    }`}
                  >
                    <span
                      className={`h-3.5 w-5 rounded-[2px] transition-transform ${
                        autoStake
                          ? 'translate-x-5 bg-[#E9E9F5] shadow-[0_0_8px_rgba(156,111,242,0.8)]'
                          : 'translate-x-0 bg-[var(--theme-text-muted)]'
                      }`}
                    />
                  </button>
                </div>

                {/* Gas Fee */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[var(--theme-text-muted)]">
                    <span>Gas Fee</span>
                    <Info className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                  </span>
                  <span className="text-[var(--theme-text-primary)] font-medium">
                    $0.36 ⛽
                  </span>
                </div>

                {/* Max Slippage */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[var(--theme-text-muted)]">
                    <span>Max Slippage</span>
                    <Info className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                  </span>
                  <span className="text-[var(--theme-text-primary)] font-medium">
                    0.50%
                  </span>
                </div>

                {/* Receive at least */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[var(--theme-text-muted)]">
                    <span>Receive at least</span>
                    <Info className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                  </span>
                  <span className="text-[var(--theme-text-primary)] font-medium">
                    {estimatedReceive}
                  </span>
                </div>
              </div>

              {/* Primary Action CTA Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedToken) {
                      setTokenDropdownOpen(true)
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-lg osiris-btn-primary text-xs sm:text-sm theme-font-mono uppercase tracking-[0.16em] font-semibold text-center shadow-lg"
                >
                  {tradeMode}
                </button>

                <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[var(--theme-text-muted)] pt-1">
                  <span>Risk Oracle: Reality.eth + Kleros</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('app')}
                    className="text-[var(--theme-text-accent)] hover:underline"
                  >
                    View Risk Markets →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
