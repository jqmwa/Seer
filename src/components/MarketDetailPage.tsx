import React, { useState, useMemo, useEffect } from 'react'
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
  Info,
  SlidersHorizontal,
  ListPlus,
  Flag,
  Ban,
  Check,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { MarketItem, MarketOutcome } from '../data/markets'
import { MarketThumbnail } from './MarketCard'

interface MarketDetailPageProps {
  market: MarketItem
  allMarkets: MarketItem[]
  initialOutcome?: MarketOutcome
  walletConnected: boolean
  walletBalance: number
  onBack: () => void
  onSelectMarket: (market: MarketItem, initialOutcome?: MarketOutcome) => void
  onToggleStar: (marketId: string, e: React.MouseEvent) => void
  onExecuteTrade: (
    marketId: string,
    outcomeId: string,
    amountSDAI: number,
    mode: 'buy' | 'sell' | 'mint'
  ) => void
  onConnectWallet: () => void
}

interface ContractRow {
  id: string
  outcomeId: string
  label: string
  probability: number
  delta: number
  color: string
  yesCents: number
  noCents: number
}

interface NewsItem {
  id: string
  source: string
  badgeBg: string
  badgeText: string
  date: string
  headline: string
  summary?: string
}

/**
 * Deterministic pseudo-random generator seeded by string
 */
function seededRandom(seedStr: string) {
  let hash = 2166136261
  for (let i = 0; i < seedStr.length; i++) {
    hash ^= seedStr.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return () => {
    hash += hash << 13
    hash ^= hash >>> 7
    hash += hash << 3
    hash ^= hash >>> 17
    hash += hash << 5
    return ((hash >>> 0) % 10000) / 10000
  }
}

function formatEndDateReadable(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildContractRows(market: MarketItem): ContractRow[] {
  const rand = seededRandom(market.id)

  // If binary market, build 3 milestone/date contracts leading up to endDate using the 3 Brand Kit Purples
  if (market.type === 'binary') {
    const yesOutcome =
      market.outcomes.find((o) => o.label.toLowerCase() === 'yes') ||
      market.outcomes[0]
    const baseProb = yesOutcome ? yesOutcome.probability : 50
    const endFormatted = formatEndDateReadable(market.endDate)

    const earlyProb1 = Math.max(2, Math.round(baseProb * 0.44))
    const earlyProb2 = Math.max(4, Math.round(baseProb * 0.68))
    const mainProb = Math.round(baseProb)

    return [
      {
        id: `${market.id}-m1`,
        outcomeId: yesOutcome.id,
        label: 'Before Jul 1, 2026',
        probability: earlyProb1,
        delta: 2,
        color: '#60A5FA', // Prediction Mid Blue
        yesCents: Math.min(99, earlyProb1 + 2),
        noCents: Math.min(99, 100 - earlyProb1 + 1),
      },
      {
        id: `${market.id}-m2`,
        outcomeId: yesOutcome.id,
        label: 'Before Oct 1, 2026',
        probability: earlyProb2,
        delta: Math.max(1, Math.round(rand() * 6 + 1)),
        color: '#10B981', // Positive Emerald
        yesCents: Math.min(99, earlyProb2 + 2),
        noCents: Math.min(99, 100 - earlyProb2 + 1),
      },
      {
        id: `${market.id}-main`,
        outcomeId: yesOutcome.id,
        label: `Before ${endFormatted}`,
        probability: mainProb,
        delta: -Math.max(1, Math.round(rand() * 4 + 1)),
        color: '#38BDF8', // Primary Prediction Blue
        yesCents: Math.min(99, Math.max(1, mainProb + 1)),
        noCents: Math.min(99, Math.max(1, 100 - mainProb + 2)),
      },
    ]
  }

  // Categorical or scalar market: map each outcome to a contract row using Prediction Blue, Emerald, Rose, and Purple
  const palette = ['#38BDF8', '#10B981', '#60A5FA', '#F43F5E', '#9C6FF2']
  return market.outcomes.map((o, idx) => {
    const p = Math.round(o.probability)
    const rawDelta = Math.round((rand() - 0.45) * 9)
    return {
      id: o.id,
      outcomeId: o.id,
      label: o.label,
      probability: p,
      delta: rawDelta === 0 ? 2 : rawDelta,
      color: palette[idx % palette.length],
      yesCents: Math.min(99, Math.max(1, p + 1)),
      noCents: Math.min(99, Math.max(1, 100 - p + 1)),
    }
  })
}

function generateStepHistory(
  rows: ContractRow[],
  timeframe: '1D' | '1W' | '1M' | 'ALL',
  seedKey: string
) {
  const numPoints = timeframe === '1D' ? 36 : timeframe === '1W' ? 48 : 68
  const rand = seededRandom(`${seedKey}-${timeframe}`)

  const series = rows.map((row, rIdx) => {
    const target = row.probability
    let current = Math.min(
      88,
      Math.max(8, target + (rIdx === 0 ? 22 : rIdx === 1 ? 16 : 12) * (rand() > 0.3 ? 1 : -0.5))
    )
    const points: number[] = []
    for (let i = 0; i < numPoints - 1; i++) {
      if (rand() > 0.42) {
        const pull = (target - current) * 0.08
        const step = (rand() - 0.48) * 9 + pull
        current = Math.min(92, Math.max(3, current + step))
      }
      points.push(Number(current.toFixed(1)))
    }
    points.push(target)
    return {
      id: row.id,
      label: row.label,
      color: row.color,
      currentProb: row.probability,
      points,
    }
  })

  const xLabels =
    timeframe === '1D'
      ? ['00:00', '06:00', '12:00', '18:00']
      : timeframe === '1W'
      ? ['Mon', 'Wed', 'Fri', 'Sun']
      : timeframe === '1M'
      ? ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4']
      : ['Jul', 'Aug', 'Sep', 'Oct']

  return { series, numPoints, xLabels }
}

function getMarketNews(market: MarketItem): NewsItem[] {
  if (market.category === 'Regulation' || market.question.toLowerCase().includes('clarity')) {
    return [
      {
        id: 'n1',
        source: 'COINDESK',
        badgeBg: '#7D33FF',
        badgeText: 'CD',
        date: 'Oct 11',
        headline: "Clarity's legislative timeline could speed crypto innovation while shielding incumbents",
      },
      {
        id: 'n2',
        source: 'CRYPTONEWS.NET',
        badgeBg: '#8F55F7',
        badgeText: 'CN',
        date: 'Oct 8',
        headline: 'Digital asset market structure bill faces key Senate markup test ahead of Q4 floor calendar',
        summary:
          'Bipartisan Senate negotiators are weighing updated CFTC/SEC jurisdictional definitions as prediction market odds adjust to committee whip counts.',
      },
      {
        id: 'n3',
        source: 'KLEROS DISPUTE FEED',
        badgeBg: '#9C6FF2',
        badgeText: 'KL',
        date: 'Oct 5',
        headline: 'Industry leaders warn US regulatory parity is at risk if market structure legislation slips past 2026',
        summary:
          'Find out what policy analysts and oracle researchers are watching regarding legislative finality.',
      },
    ]
  }

  if (market.category === 'Politics') {
    return [
      {
        id: 'n1',
        source: 'REUTERS',
        badgeBg: '#7D33FF',
        badgeText: 'R',
        date: 'Oct 14',
        headline: `New national polling shifts implied coalition probabilities in "${market.question.slice(0, 58)}..."`,
      },
      {
        id: 'n2',
        source: 'POLITICO EUROPE',
        badgeBg: '#8F55F7',
        badgeText: 'PE',
        date: 'Oct 10',
        headline: 'Party leadership conventions set strategic terms ahead of electoral commission filing deadlines',
        summary:
          'Traders on Seer have repriced leading outcome shares following regional turnout projections and parliamentary bloc negotiations.',
      },
      {
        id: 'n3',
        source: 'SEER RESEARCH',
        badgeBg: '#9C6FF2',
        badgeText: 'SR',
        date: 'Oct 4',
        headline: 'Conditional market liquidity deepens as sDAI yield farmers allocate to political markets',
        summary:
          'Analysis of combinatorial orderflow and Reality.eth verification parameters for upcoming national elections.',
      },
    ]
  }

  return [
    {
      id: 'n1',
      source: 'THE BLOCK',
      badgeBg: '#7D33FF',
      badgeText: 'TB',
      date: 'Oct 12',
      headline: `On-chain orderflow surges across "${market.question.slice(0, 62)}..."`,
    },
    {
      id: 'n2',
      source: 'MESSARI INTEL',
      badgeBg: '#8F55F7',
      badgeText: 'MI',
      date: 'Oct 9',
      headline: 'Protocol governance & oracle feeds align on upcoming Q4 milestone verification standards',
      summary:
        'Developers and market makers are closely monitoring public repository commits and official API changelog updates ahead of the resolution cutoff.',
    },
    {
      id: 'n3',
      source: 'GNOSIS CHAIN WIRE',
      badgeBg: '#9C6FF2',
      badgeText: 'GC',
      date: 'Oct 3',
      headline: 'sDAI collateralized prediction markets record tighter bid-ask spreads across verified pools',
      summary:
        'Explore how yield-bearing collateral reduces opportunity cost for long-horizon market positions.',
    },
  ]
}

export const MarketDetailPage: React.FC<MarketDetailPageProps> = ({
  market,
  allMarkets,
  initialOutcome,
  walletConnected,
  onBack,
  onSelectMarket,
  onToggleStar,
  onExecuteTrade,
  onConnectWallet,
}) => {
  const contractRows = useMemo(() => buildContractRows(market), [market])

  const defaultRowId = useMemo(() => {
    if (initialOutcome) {
      const match = contractRows.find((r) => r.id === initialOutcome.id)
      if (match) return match.id
    }
    return contractRows[contractRows.length - 1]?.id || contractRows[0]?.id || ''
  }, [contractRows, initialOutcome])

  const [selectedRowId, setSelectedRowId] = useState<string>(defaultRowId)
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no'>('yes')
  const [tradeTab, setTradeTab] = useState<'buy' | 'sell'>('buy')
  const [orderUnit, setOrderUnit] = useState<'DOLLARS' | 'SHARES'>('DOLLARS')
  const [amountInput, setAmountInput] = useState<string>('')
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | 'ALL'>('ALL')
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [scrolledCompact, setScrolledCompact] = useState(false)

  // Collapsible sections
  const [newsOpen, setNewsOpen] = useState(true)
  const [rulesOpen, setRulesOpen] = useState(true)
  const [fullRulesExpanded, setFullRulesExpanded] = useState(false)
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [integrityOpen, setIntegrityOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [txNotice, setTxNotice] = useState<string | null>(null)
  const [rightSubTab, setRightSubTab] = useState<'markets' | 'activity'>('markets')
  const [customTrades, setCustomTrades] = useState<
    Array<{
      id: string
      user: string
      action: 'Bought' | 'Sold'
      side: 'YES' | 'NO'
      contract: string
      cents: number
      amount: string
      time: string
    }>
  >([])

  useEffect(() => {
    setSelectedRowId(defaultRowId)
    setHoverIndex(null)
    setTxNotice(null)
  }, [defaultRowId, market.id])

  useEffect(() => {
    const onScroll = () => {
      setScrolledCompact(window.scrollY > 190)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeRow =
    contractRows.find((r) => r.id === selectedRowId) ||
    contractRows[contractRows.length - 1] ||
    contractRows[0]

  const { series, numPoints, xLabels } = useMemo(
    () => generateStepHistory(contractRows, timeframe, market.id),
    [contractRows, timeframe, market.id]
  )

  const newsItems = useMemo(() => getMarketNews(market), [market])
  const relatedMarkets = useMemo(
    () => allMarkets.filter((m) => m.id !== market.id).slice(0, 4),
    [allMarkets, market.id]
  )

  const activityFeed = useMemo(() => {
    const firstRow = contractRows[contractRows.length - 1] || contractRows[0]
    const secondRow = contractRows[0]
    const seeded = [
      {
        id: 'act-1',
        user: '0x71C...9A23',
        action: 'Bought' as const,
        side: 'YES' as const,
        contract: firstRow?.label || 'Yes',
        cents: firstRow?.yesCents || 52,
        amount: '$420',
        time: '2m ago',
      },
      {
        id: 'act-2',
        user: '0x3F8...11B0',
        action: 'Bought' as const,
        side: 'NO' as const,
        contract: secondRow?.label || 'No',
        cents: secondRow?.noCents || 48,
        amount: '$185',
        time: '11m ago',
      },
      {
        id: 'act-3',
        user: '0x94A...E402',
        action: 'Sold' as const,
        side: 'YES' as const,
        contract: firstRow?.label || 'Yes',
        cents: firstRow?.yesCents || 52,
        amount: '$950',
        time: '27m ago',
      },
      {
        id: 'act-4',
        user: '0xC12...77D9',
        action: 'Bought' as const,
        side: 'YES' as const,
        contract: secondRow?.label || 'Yes',
        cents: secondRow?.yesCents || 38,
        amount: '$310',
        time: '1h ago',
      },
    ]
    return [...customTrades, ...seeded]
  }, [contractRows, customTrades])

  const activeCents =
    selectedSide === 'yes' ? activeRow?.yesCents || 50 : activeRow?.noCents || 50
  const unitPrice = Math.max(0.01, activeCents / 100)
  const numericAmount = Math.max(0, parseFloat(amountInput) || 0)
  const dollarCost =
    orderUnit === 'DOLLARS' ? numericAmount : numericAmount * unitPrice
  const sharesCount =
    orderUnit === 'DOLLARS' ? numericAmount / unitPrice : numericAmount
  const maxPayout = sharesCount * 1.0
  const displayedOdds =
    selectedSide === 'yes'
      ? activeRow?.probability || 50
      : 100 - (activeRow?.probability || 50)

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (numericAmount <= 0) {
      setAmountInput('100')
      return
    }
    if (!walletConnected) {
      onConnectWallet()
    }
    let targetOutcomeId = activeRow.outcomeId
    if (market.type === 'binary') {
      const match = market.outcomes.find(
        (o) => o.label.toLowerCase() === selectedSide
      )
      if (match) targetOutcomeId = match.id
    }

    onExecuteTrade(
      market.id,
      targetOutcomeId,
      Math.max(1, dollarCost),
      tradeTab
    )
    setCustomTrades((prev) => [
      {
        id: `user-${Date.now()}`,
        user: '0x71C...9A23 (You)',
        action: tradeTab === 'buy' ? 'Bought' : 'Sold',
        side: selectedSide.toUpperCase() as 'YES' | 'NO',
        contract: activeRow.label,
        cents: activeCents,
        amount: `$${dollarCost.toFixed(0)}`,
        time: 'Just now',
      },
      ...prev,
    ])
    setTxNotice(
      `${tradeTab === 'buy' ? 'Bought' : 'Sold'} ${sharesCount.toFixed(1)} ${selectedSide.toUpperCase()} contracts on "${activeRow.label}" ($${dollarCost.toFixed(2)} ${market.collateral})`
    )
    setTimeout(() => setTxNotice(null), 4000)
  }

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // SVG Step Chart Geometry
  const chartW = 760
  const chartH = 260
  const padLeft = 8
  const padRight = 46
  const padTop = 14
  const padBottom = 28
  const plotW = chartW - padLeft - padRight
  const plotH = chartH - padTop - padBottom
  const maxY = 80
  const yCeiling = useMemo(() => {
    const highest = Math.max(
      ...series.flatMap((s) => s.points),
      ...contractRows.map((r) => r.probability)
    )
    return highest > 78 ? 100 : maxY
  }, [series, contractRows])

  const yTicks =
    yCeiling === 100 ? [0, 25, 50, 75, 100] : [0, 20, 40, 60, 80]

  const buildStepSvgPath = (pts: number[]) => {
    if (pts.length === 0) return ''
    const coords = pts.map((val, idx) => {
      const x = padLeft + (idx / Math.max(1, pts.length - 1)) * plotW
      const clamped = Math.min(yCeiling, Math.max(0, val))
      const y = padTop + plotH - (clamped / yCeiling) * plotH
      return { x, y }
    })

    let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`
    for (let i = 1; i < coords.length; i++) {
      d += ` L ${coords[i].x.toFixed(1)} ${coords[i - 1].y.toFixed(1)}`
      d += ` L ${coords[i].x.toFixed(1)} ${coords[i].y.toFixed(1)}`
    }
    return d
  }

  return (
    <div className="w-full pb-20 select-none">
      {/* Top Back Navigation Bar */}
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm theme-font-mono text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors group"
        >
          <span className="w-7 h-7 rounded-lg bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] group-hover:border-[#7D33FF] flex items-center justify-center transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
          <span>All Markets</span>
          <span className="text-[var(--theme-text-muted)]/50">/</span>
          <span className="text-[var(--theme-text-accent)] font-semibold uppercase">{market.category}</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs theme-font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] text-[var(--theme-text-secondary)]">
            {market.chain} · {market.collateral}
          </span>
          <span className="osiris-pill osiris-pill-brand flex items-center gap-1 py-1 px-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Reality.eth + Kleros
          </span>
        </div>
      </div>

      {/* Main 2-Column Layout: Left Content + Right Sticky Order Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================================================================ */}
        {/* LEFT COLUMN (8 Cols): Chart, Contracts Table, News, Rules, Related */}
        {/* ================================================================ */}
        <div className="lg:col-span-8 space-y-8">
          {/* Sticky Compact Market Bar when scrolled down */}
          {scrolledCompact && (
            <div className="sticky top-16 z-20 -mx-2 px-3 py-2.5 bg-[var(--theme-panel-bg)]/95 backdrop-blur-md border-b border-[var(--theme-card-border)] flex items-center justify-between gap-3 transition-all shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-[var(--theme-card-border)] bg-[#141223]">
                  <MarketThumbnail type={market.avatarType} />
                </div>
                <span className="text-sm sm:text-base font-bold text-[var(--theme-text-primary)] truncate">
                  {market.question}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById('market-rules-section')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-well-bg)]"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById('breaking-news-section')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-well-bg)]"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-well-bg)]"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-[#7D33FF]" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => onToggleStar(market.id, e)}
                  className="p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-well-bg)]"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 1. Market Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-2xl overflow-hidden shrink-0 border border-[var(--theme-card-border)] shadow-md bg-[#141223]">
                <MarketThumbnail type={market.avatarType} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs theme-font-mono uppercase tracking-[0.12em] text-[var(--theme-text-accent)] font-semibold mb-1">
                  {market.category}
                </div>
                <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[var(--theme-text-primary)] leading-[1.2] tracking-[-0.015em]">
                  {market.question}
                </h1>
                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] mt-1.5">
                  Or any qualifying contract resolution verified on {market.chain} via Reality.eth &amp; Kleros
                </p>
              </div>
            </div>

            {/* Top-Right Action Icons */}
            <div className="flex items-center gap-1.5 shrink-0 pt-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('market-rules-section')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="p-2 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-panel-bg)] transition-colors"
                title="Jump to Market Rules & Schedule"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('breaking-news-section')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="p-2 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-panel-bg)] transition-colors"
                title="Market Intelligence & Discussion"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCopyShare}
                className="p-2 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-panel-bg)] transition-colors"
                title="Share Market Link"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-[#7D33FF]" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={(e) => onToggleStar(market.id, e)}
                className={`p-2 rounded-lg transition-colors ${
                  market.starred
                    ? 'text-[#7D33FF] bg-[#7D33FF]/15'
                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-panel-bg)]'
                }`}
                title={market.starred ? 'Saved to Watchlist' : 'Add to Watchlist'}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Legend + Watermark + Interactive Step Line Chart */}
          <div className="pt-1">
            {/* Legend Row + Brand Mark */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[...series].reverse().map((s) => {
                  const displayVal =
                    hoverIndex !== null && s.points[hoverIndex] !== undefined
                      ? s.points[hoverIndex]
                      : s.currentProb
                  return (
                    <div key={s.id} className="flex items-center gap-2 text-xs sm:text-[13px]">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[var(--theme-text-muted)]">{s.label}</span>
                      <span className="font-bold text-[var(--theme-text-primary)] theme-font-mono">
                        {Math.round(displayVal)}%
                      </span>
                    </div>
                  )
                })}
              </div>

              <span className="text-xl font-bold tracking-tight text-[var(--theme-text-muted)]/45 select-none">
                Seer
              </span>
            </div>

            {/* Interactive SVG Multi-Series Step Chart */}
            <div
              className="relative w-full select-none"
              onMouseLeave={() => setHoverIndex(null)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const relX = e.clientX - rect.left
                const ratio = Math.max(0, Math.min(1, relX / rect.width))
                const idx = Math.min(
                  numPoints - 1,
                  Math.max(0, Math.round(ratio * (numPoints - 1)))
                )
                setHoverIndex(idx)
              }}
            >
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full h-[230px] sm:h-[265px] overflow-visible"
              >
                {/* Horizontal Dotted Grid Lines + Right Axis Percentage Labels */}
                {yTicks.map((tick) => {
                  const y = padTop + plotH - (tick / yCeiling) * plotH
                  return (
                    <g key={tick}>
                      <line
                        x1={padLeft}
                        y1={y}
                        x2={padLeft + plotW}
                        y2={y}
                        stroke="var(--theme-chart-grid)"
                        strokeWidth="1"
                        strokeDasharray="2 4"
                      />
                      <text
                        x={chartW - 4}
                        y={y + 4}
                        textAnchor="end"
                        fill="var(--theme-chart-axis)"
                        fontSize="11"
                        fontFamily="var(--theme-font-mono)"
                      >
                        {tick}%
                      </text>
                    </g>
                  )
                })}

                {/* Hover Vertical Crosshair Line */}
                {hoverIndex !== null && (
                  <line
                    x1={padLeft + (hoverIndex / Math.max(1, numPoints - 1)) * plotW}
                    y1={padTop}
                    x2={padLeft + (hoverIndex / Math.max(1, numPoints - 1)) * plotW}
                    y2={padTop + plotH}
                    stroke="#8F55F7"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Step Line Paths & End Dots */}
                {series.map((s) => {
                  const pathD = buildStepSvgPath(s.points)
                  const activeIdx =
                    hoverIndex !== null ? hoverIndex : s.points.length - 1
                  const activeVal = s.points[activeIdx] ?? s.currentProb
                  const dotX =
                    padLeft +
                    (activeIdx / Math.max(1, s.points.length - 1)) * plotW
                  const dotY =
                    padTop +
                    plotH -
                    (Math.min(yCeiling, Math.max(0, activeVal)) / yCeiling) *
                      plotH

                  return (
                    <g key={s.id}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={s.color}
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx={dotX}
                        cy={dotY}
                        r="4.5"
                        fill={s.color}
                        stroke="var(--theme-app-bg)"
                        strokeWidth="1.5"
                      />
                    </g>
                  )
                })}

                {/* X-Axis Labels */}
                {xLabels.map((lbl, idx) => {
                  const x =
                    padLeft +
                    (idx / Math.max(1, xLabels.length - 1)) * (plotW * 0.92)
                  return (
                    <text
                      key={lbl}
                      x={x}
                      y={chartH - 4}
                      fill="var(--theme-chart-axis)"
                      fontSize="11"
                      fontFamily="var(--theme-font-mono)"
                    >
                      {lbl}
                    </text>
                  )
                })}
              </svg>
            </div>

            {/* Volume + Timeframe Bar Under Chart */}
            <div className="flex items-center justify-between pt-3 pb-3 border-b border-[var(--theme-panel-divider)] text-xs theme-font-mono">
              <div className="flex items-center gap-3 text-[var(--theme-text-muted)]">
                <span>${market.volumeUSD.toLocaleString()} vol</span>
                <span>·</span>
                <span>${market.liquidityUSD.toLocaleString()} liq</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {(['1D', '1W', '1M', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      timeframe === tf
                        ? 'text-[#FFFFFF] bg-[#7D33FF]'
                        : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
                <button
                  type="button"
                  className="p-1.5 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors"
                  title="Compare Outcomes"
                >
                  <ListPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Outcomes / Contracts Table */}
          <div>
            {/* Table Column Header */}
            <div className="grid grid-cols-12 items-center py-2.5 border-b border-[var(--theme-panel-divider)] text-xs text-[var(--theme-text-muted)]">
              <div className="col-span-5 sm:col-span-5 font-medium">
                {market.type === 'binary' ? 'Contract' : 'Outcome'}
              </div>
              <div className="col-span-2 sm:col-span-3 font-medium">Chance</div>
              <div className="col-span-5 sm:col-span-4 flex justify-end">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
              </div>
            </div>

            {/* Contract Rows */}
            <div className="divide-y divide-[var(--theme-panel-divider)]">
              {contractRows.map((row) => {
                const isRowSelected = activeRow?.id === row.id
                const isYesActive = isRowSelected && selectedSide === 'yes'
                const isNoActive = isRowSelected && selectedSide === 'no'

                return (
                  <div
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    className={`grid grid-cols-12 items-center py-4 px-2 -mx-2 rounded-xl gap-2 cursor-pointer transition-colors ${
                      isRowSelected
                        ? 'bg-[#38BDF8]/10'
                        : 'hover:bg-[var(--theme-panel-bg)]/60'
                    }`}
                  >
                    {/* Left: Contract / Outcome Label */}
                    <div className="col-span-5 sm:col-span-5 pr-2">
                      <span className="text-sm sm:text-[15px] font-medium text-[var(--theme-text-primary)] leading-snug">
                        {row.label}
                      </span>
                    </div>

                    {/* Middle: Large Bold Chance % (Prediction Blue) + Red/Green Delta Badge */}
                    <div className="col-span-2 sm:col-span-3 flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-bold text-[#38BDF8] theme-font-mono">
                        {row.probability}%
                      </span>
                      {row.delta !== 0 && (
                        <span
                          className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs theme-font-mono font-semibold ${
                            row.delta > 0
                              ? 'bg-[#10B981]/15 text-[#34D399]'
                              : 'bg-[#F43F5E]/15 text-[#FB7185]'
                          }`}
                        >
                          {row.delta > 0 ? `▲ ${row.delta}%` : `▼ ${Math.abs(row.delta)}%`}
                        </span>
                      )}
                    </div>

                    {/* Right: Green Yes XX¢ and Red No YY¢ Pill Buttons */}
                    <div className="col-span-5 sm:col-span-4 flex items-center justify-end gap-2 sm:gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedRowId(row.id)
                          setSelectedSide('yes')
                        }}
                        className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold border transition-all min-w-[82px] sm:min-w-[108px] text-center ${
                          isYesActive
                            ? 'bg-[#10B981] border-[#10B981] text-[#FFFFFF] shadow-[0_0_16px_rgba(16,185,129,0.35)]'
                            : 'bg-[#10B981]/10 border-[#10B981]/30 hover:border-[#10B981]/60 text-[#34D399] hover:bg-[#10B981]/20'
                        }`}
                      >
                        Yes {row.yesCents}¢
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedRowId(row.id)
                          setSelectedSide('no')
                        }}
                        className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold border transition-all min-w-[82px] sm:min-w-[108px] text-center ${
                          isNoActive
                            ? 'bg-[#F43F5E] border-[#F43F5E] text-[#FFFFFF] shadow-[0_0_16px_rgba(244,63,94,0.35)]'
                            : 'bg-[#F43F5E]/10 border-[#F43F5E]/30 hover:border-[#F43F5E]/60 text-[#FB7185] hover:bg-[#F43F5E]/20'
                        }`}
                      >
                        No {row.noCents}¢
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-3 border-t border-[var(--theme-panel-divider)]">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('related-markets-section')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-xs sm:text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-text-accent)] transition-colors"
              >
                More markets
              </button>
            </div>
          </div>

          {/* 4. Breaking News Section */}
          <section
            id="breaking-news-section"
            className="pt-4 border-t border-[var(--theme-panel-divider)]"
          >
            <button
              type="button"
              onClick={() => setNewsOpen((o) => !o)}
              className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
            >
              <h2 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] tracking-tight">
                Breaking News
              </h2>
              {newsOpen ? (
                <ChevronUp className="w-5 h-5 text-[var(--theme-text-muted)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--theme-text-muted)]" />
              )}
            </button>

            {newsOpen && (
              <div className="mt-2 divide-y divide-[var(--theme-panel-divider)] border-t border-[var(--theme-panel-divider)]">
                {newsItems.map((item) => (
                  <div key={item.id} className="py-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] theme-font-mono text-[var(--theme-text-muted)]">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-[#FFFFFF] shrink-0"
                        style={{ backgroundColor: item.badgeBg }}
                      >
                        {item.badgeText}
                      </span>
                      <span className="uppercase tracking-wider">{item.source}</span>
                      <span>·</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--theme-text-primary)] leading-snug">
                      {item.headline}
                    </h3>
                    {item.summary && (
                      <p className="text-xs sm:text-[13px] text-[var(--theme-text-secondary)] leading-relaxed">
                        {item.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 5. Market Rules Section */}
          <section
            id="market-rules-section"
            className="pt-4 border-t border-[var(--theme-panel-divider)]"
          >
            <button
              type="button"
              onClick={() => setRulesOpen((o) => !o)}
              className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
            >
              <h2 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] tracking-tight">
                Market Rules
              </h2>
              {rulesOpen ? (
                <ChevronUp className="w-5 h-5 text-[var(--theme-text-muted)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--theme-text-muted)]" />
              )}
            </button>

            {rulesOpen && (
              <div className="mt-3 pt-4 border-t border-[var(--theme-panel-divider)] space-y-4 text-sm text-[var(--theme-text-secondary)]">
                {/* Selected Contract Dropdown Pill + Info Icon */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = contractRows.findIndex((r) => r.id === activeRow?.id)
                      const next = contractRows[(idx + 1) % contractRows.length]
                      if (next) setSelectedRowId(next.id)
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-text-accent)] hover:opacity-85 transition-opacity"
                  >
                    <span>{activeRow?.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <Info className="w-4 h-4 text-[var(--theme-text-muted)]" />
                </div>

                {/* Resolves Yes If & Verification Source */}
                <p className="leading-relaxed">
                  <strong className="text-[var(--theme-text-primary)]">Resolves Yes if</strong>{' '}
                  {market.description.replace(/^Resolves to Yes if\s*/i, '')}
                </p>

                <p className="leading-relaxed">
                  <strong className="text-[var(--theme-text-primary)]">Outcome verified from</strong>{' '}
                  <a
                    href="https://reality.eth.limo/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[#8F55F7] underline-offset-4 hover:text-[var(--theme-text-accent)] transition-colors"
                  >
                    Reality.eth + Kleros Decentralized Oracle
                  </a>
                  .
                </p>

                {/* Numbered Criteria List */}
                <div className="space-y-2.5 text-[13.5px] leading-relaxed">
                  <p>
                    For purposes of this Contract, qualifying resolution requires{' '}
                    <strong className="text-[var(--theme-text-primary)]">all of the following:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Official public confirmation or primary source publication verifying the
                      outcome prior to <strong className="text-[var(--theme-text-primary)]">{formatEndDateReadable(market.endDate)}</strong>{' '}
                      (23:59:59 UTC); AND
                    </li>
                    <li>
                      Submission of the outcome answer to the Reality.eth question contract on{' '}
                      <strong className="text-[var(--theme-text-primary)]">{market.chain} Chain</strong> with the
                      required bond; AND
                    </li>
                    <li>
                      Completion of the 24-hour challenge period without an overturned Kleros
                      arbitration ruling.
                    </li>
                  </ol>
                </div>

                {/* Bulleted Examples */}
                <div className="space-y-2.5 text-[13.5px] leading-relaxed">
                  <p>Examples that would meet the Payout Criterion:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      An authoritative announcement or certified record published by the primary
                      resolution source confirming "{activeRow?.label}" before expiration;
                    </li>
                    <li>
                      A finalized Reality.eth answer affirmed by Kleros General Court arbitration
                      if disputed.
                    </li>
                  </ul>

                  <p className="pt-1">
                    Examples that would <strong className="text-[var(--theme-text-primary)]">NOT</strong> meet the
                    Payout Criterion:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      Unconfirmed media rumors, draft proposals, or preliminary polls without
                      binding finality;
                    </li>
                    <li>
                      An event that occurs after the {formatEndDateReadable(market.endDate)} UTC
                      cutoff timestamp;
                    </li>
                    <li>
                      Partial or provisional actions that are stayed, vetoed, or invalidated prior
                      to settlement.
                    </li>
                  </ul>
                </div>

                {fullRulesExpanded && (
                  <div className="osiris-well p-4 text-xs theme-font-mono text-[var(--theme-text-secondary)] space-y-1.5">
                    <div className="text-[var(--theme-text-primary)] font-semibold">
                      ON-CHAIN CONTRACT SPECIFICATION
                    </div>
                    <div>Market ID: {market.id}</div>
                    <div>Collateral Token: {market.collateral} (ERC-20 / ERC-4626 Yield-Bearing)</div>
                    <div>Oracle Adapter: Reality.eth v3.0 + Kleros Arbitrator Proxy</div>
                    <div>Conditional Token Framework: Gnosis CTF (0xCeAf...9B21)</div>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setFullRulesExpanded((v) => !v)}
                    className="px-4 py-2 rounded-xl bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] hover:border-[#7D33FF] text-xs sm:text-sm font-medium text-[var(--theme-text-accent)] transition-colors"
                  >
                    {fullRulesExpanded ? 'Hide full rules' : 'View full rules'}
                  </button>
                  <a
                    href="https://app.seer.pm/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] hover:border-[#7D33FF] text-xs sm:text-sm font-medium text-[var(--theme-text-accent)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Help center</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIntegrityOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#242238] hover:bg-[#7D33FF] text-[#FFFFFF] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report Insider Trading</span>
                  </button>
                </div>
              </div>
            )}

            {/* Expandable Accordion Rows: Timeline and payout & Insider trading */}
            <div className="mt-6 border-t border-[var(--theme-panel-divider)] divide-y divide-[var(--theme-panel-divider)]">
              {/* Timeline and payout */}
              <div>
                <button
                  type="button"
                  onClick={() => setTimelineOpen((o) => !o)}
                  className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[var(--theme-text-muted)]" />
                    <span>Timeline and payout</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--theme-text-muted)] transition-transform ${
                      timelineOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {timelineOpen && (
                  <div className="pb-4 pl-7 text-xs sm:text-sm text-[var(--theme-text-secondary)] space-y-2 leading-relaxed">
                    <div className="flex justify-between max-w-md">
                      <span>Market Scheduled Close:</span>
                      <span className="theme-font-mono text-[var(--theme-text-primary)] font-semibold">
                        {formatEndDateReadable(market.endDate)} · 23:59 UTC
                      </span>
                    </div>
                    <div className="flex justify-between max-w-md">
                      <span>Oracle Challenge Window:</span>
                      <span className="theme-font-mono text-[var(--theme-text-primary)] font-semibold">
                        24 Hours (Reality.eth)
                      </span>
                    </div>
                    <div className="flex justify-between max-w-md">
                      <span>Winning Contract Payout:</span>
                      <span className="theme-font-mono text-[var(--theme-text-accent)] font-semibold">
                        1.00 {market.collateral} + Accrued Yield
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Insider trading / Market integrity */}
              <div>
                <button
                  type="button"
                  onClick={() => setIntegrityOpen((o) => !o)}
                  className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Ban className="w-4 h-4 text-[var(--theme-text-muted)]" />
                    <span>Insider trading is prohibited</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--theme-text-muted)] transition-transform ${
                      integrityOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {integrityOpen && (
                  <div className="pb-4 pl-7 text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    Manipulation of primary resolution sources or fraudulent oracle reporting is
                    subject to bond slashing via Reality.eth and decentralized dispute arbitration
                    by Kleros jurors.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 6. People Are Also Trading Section */}
          <section id="related-markets-section" className="pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-4">
              People are also trading
            </h2>
            <div className="space-y-3">
              {relatedMarkets.map((rel) => {
                const topOut = rel.outcomes[0]
                return (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      onSelectMarket(rel)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="w-full flex items-center justify-between gap-4 p-2.5 -mx-2.5 rounded-xl hover:bg-[var(--theme-panel-bg)] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[var(--theme-card-border)] bg-[#141223]">
                        <MarketThumbnail type={rel.avatarType} />
                      </div>
                      <span className="text-sm sm:text-[15px] font-medium text-[var(--theme-text-primary)] group-hover:text-[#7DD3FC] transition-colors line-clamp-1">
                        {rel.question}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm theme-font-mono font-bold text-[#38BDF8] shrink-0">
                      {topOut ? `${topOut.probability.toFixed(0)}%` : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN (4 Cols): Sticky Order & Trade Card                 */}
        {/* ================================================================ */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <form
            onSubmit={handleTradeSubmit}
            className="osiris-card rounded-2xl overflow-hidden"
          >
            {/* Top Bar: BUY / SELL Tabs on Left + DOLLARS Dropdown on Right */}
            <div className="px-5 py-3.5 border-b border-[var(--theme-panel-divider)] flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs theme-font-mono font-bold tracking-wider uppercase">
                <button
                  type="button"
                  onClick={() => setTradeTab('buy')}
                  className={`transition-colors ${
                    tradeTab === 'buy'
                      ? 'text-[#34D399]'
                      : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeTab('sell')}
                  className={`transition-colors ${
                    tradeTab === 'sell'
                      ? 'text-[#FB7185]'
                      : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                  }`}
                >
                  SELL
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOrderUnit((u) => (u === 'DOLLARS' ? 'SHARES' : 'DOLLARS'))
                }
                className="inline-flex items-center gap-1 text-xs theme-font-mono font-bold tracking-wider uppercase text-[var(--theme-text-primary)] hover:text-[#38BDF8] transition-colors"
              >
                <span>{orderUnit}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ticket Body */}
            <div className="p-5 space-y-4">
              {/* Market Question + Mini Thumbnail + Selected Outcome Label */}
              <div>
                <div className="text-xs text-[var(--theme-text-muted)] line-clamp-1 mb-1.5">
                  {market.question}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-[var(--theme-card-border)] bg-[#141223]">
                    <MarketThumbnail type={market.avatarType} />
                  </div>
                  <div className="text-lg font-bold text-[var(--theme-text-primary)] leading-tight truncate">
                    {activeRow?.label}
                  </div>
                </div>
              </div>

              {/* YES (Green) / NO (Red) Segmented Pill Toggle + Yield Callout */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center p-1 rounded-full bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)]">
                  <button
                    type="button"
                    onClick={() => setSelectedSide('yes')}
                    className={`px-4 py-1.5 rounded-full text-xs theme-font-mono font-bold uppercase transition-all ${
                      selectedSide === 'yes'
                        ? 'bg-[#10B981] text-[#FFFFFF] shadow-[0_0_14px_rgba(16,185,129,0.4)]'
                        : 'text-[#34D399]/80 hover:text-[#34D399]'
                    }`}
                  >
                    YES {activeRow?.yesCents}¢
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSide('no')}
                    className={`px-4 py-1.5 rounded-full text-xs theme-font-mono font-bold uppercase transition-all ${
                      selectedSide === 'no'
                        ? 'bg-[#F43F5E] text-[#FFFFFF] shadow-[0_0_14px_rgba(244,63,94,0.4)]'
                        : 'text-[#FB7185]/80 hover:text-[#FB7185]'
                    }`}
                  >
                    NO {activeRow?.noCents}¢
                  </button>
                </div>

                <span
                  className="text-xs text-[#38BDF8] font-medium underline decoration-[#38BDF8]/50 underline-offset-4 cursor-help"
                  title="Positions collateralized in sDAI automatically accrue ~6.5% APY MakerDAO/Spark savings rate"
                >
                  6.5% Interest
                </span>
              </div>

              {/* Dollars Input Box */}
              <div className="space-y-2">
                <div className="rounded-xl border border-[var(--theme-input-border)] focus-within:border-[#38BDF8] bg-[var(--theme-input-bg)] px-3.5 py-2.5 flex items-center justify-between transition-colors">
                  <span className="text-xs text-[var(--theme-text-muted)]">
                    {orderUnit === 'DOLLARS' ? `Dollars (${market.collateral})` : 'Contracts'}
                  </span>
                  <div className="flex items-center">
                    {orderUnit === 'DOLLARS' && (
                      <span className="text-lg font-bold text-[var(--theme-text-muted)] mr-0.5">$</span>
                    )}
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="0"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="w-24 text-right text-lg font-bold text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)]/50 bg-transparent outline-none theme-font-mono"
                    />
                  </div>
                </div>

                {/* Quick Preset Chips */}
                <div className="flex items-center justify-between gap-1.5">
                  {[10, 25, 100, 250].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmountInput(String(preset))}
                      className="flex-1 py-1 rounded-lg bg-[var(--theme-well-bg)] hover:bg-[#38BDF8]/15 border border-[var(--theme-card-border)] hover:border-[#38BDF8]/50 text-[11px] theme-font-mono font-semibold text-[var(--theme-text-secondary)] transition-colors"
                    >
                      +${preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Odds (Prediction Blue) & Max Payout Summary */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--theme-text-muted)] flex items-center gap-1">
                    <span>Prediction Odds</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)] text-[9px] flex items-center justify-center text-[#38BDF8]">
                      %
                    </span>
                  </span>
                  <span className="text-sm font-bold theme-font-mono text-[#38BDF8]">
                    {displayedOdds}% chance
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-[var(--theme-text-muted)]">Max payout</div>
                    <div className="text-[11px] text-[var(--theme-text-muted)]/75">
                      {formatEndDateReadable(market.endDate)}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#34D399] theme-font-mono">
                    ${maxPayout > 0 ? maxPayout.toFixed(0) : '0'}
                  </div>
                </div>
              </div>

              {/* Feedback Toast if Traded */}
              {txNotice && (
                <div className="p-2.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#34D399] text-xs theme-font-mono text-center">
                  ✓ {txNotice}
                </div>
              )}

              {/* Primary CTA Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full osiris-btn-primary font-bold text-sm tracking-wide transition-all"
              >
                {!walletConnected
                  ? 'Sign up to trade'
                  : numericAmount > 0
                  ? `${tradeTab === 'buy' ? 'Buy' : 'Sell'} ${selectedSide.toUpperCase()} · $${dollarCost.toFixed(0)}`
                  : 'Enter amount to trade'}
              </button>
            </div>
          </form>

          {/* Underneath the Market Module: Minimal Text + Underline Tabs for Markets / Activity */}
          <div className="mt-5">
            <div className="flex items-center gap-6 border-b border-[var(--theme-panel-divider)] px-1">
              <button
                type="button"
                onClick={() => setRightSubTab('markets')}
                className={`pb-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  rightSubTab === 'markets'
                    ? 'text-[var(--theme-text-primary)] border-[#38BDF8]'
                    : 'text-[var(--theme-text-muted)] border-transparent hover:text-[var(--theme-text-primary)]'
                }`}
              >
                Markets
              </button>
              <button
                type="button"
                onClick={() => setRightSubTab('activity')}
                className={`pb-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  rightSubTab === 'activity'
                    ? 'text-[var(--theme-text-primary)] border-[#38BDF8]'
                    : 'text-[var(--theme-text-muted)] border-transparent hover:text-[var(--theme-text-primary)]'
                }`}
              >
                Activity
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-3">
              {rightSubTab === 'markets' ? (
                <div className="divide-y divide-[var(--theme-panel-divider)]">
                  {relatedMarkets.map((rel) => {
                    const topOut = rel.outcomes[0]
                    return (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => {
                          onSelectMarket(rel)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="w-full py-2.5 px-1 flex items-center justify-between gap-3 text-left group transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-[var(--theme-card-border)] bg-[#141223]">
                            <MarketThumbnail type={rel.avatarType} />
                          </div>
                          <span className="text-xs sm:text-[13px] text-[var(--theme-text-secondary)] group-hover:text-[#7DD3FC] transition-colors line-clamp-2 leading-snug">
                            {rel.question}
                          </span>
                        </div>
                        <span className="text-xs theme-font-mono font-bold text-[#38BDF8] shrink-0">
                          {topOut ? `${topOut.probability.toFixed(0)}%` : ''}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="divide-y divide-[var(--theme-panel-divider)]">
                  {activityFeed.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 px-1 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)] truncate">
                          <span className="theme-font-mono text-[var(--theme-text-muted)]">
                            {item.user}
                          </span>
                          <span className="text-[var(--theme-text-muted)]">{item.action.toLowerCase()}</span>
                          <span
                            className={`theme-font-mono font-bold ${
                              item.side === 'YES'
                                ? 'text-[#34D399]'
                                : 'text-[#FB7185]'
                            }`}
                          >
                            {item.side}
                          </span>
                          <span className="text-[var(--theme-text-muted)]">at {item.cents}¢</span>
                        </div>
                        <div className="text-[11px] text-[var(--theme-text-muted)] truncate">
                          {item.contract}
                        </div>
                      </div>
                      <div className="text-right shrink-0 theme-font-mono">
                        <div className="text-[var(--theme-text-primary)] font-semibold">{item.amount}</div>
                        <div className="text-[10.5px] text-[var(--theme-text-muted)]">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
