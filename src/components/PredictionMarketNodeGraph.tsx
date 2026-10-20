import React, { useState, useEffect } from 'react'
import { NavSection } from './EcosystemViews'
import { MarketThumbnail } from './MarketCard'
import { INITIAL_MARKETS, MarketItem } from '../data/markets'

type CardVariant = 'node' | 'yes-no' | 'winner'

interface FloatingHeroCard {
  id: string
  marketId: string
  shortTitle: string
  variant: CardVariant
  side: 'left' | 'right'
  x: number // percentage in full hero width (0 - 100)
  y: number // percentage in hero height (0 - 100)
  speedX: number
  speedY: number
  phaseX: number
  phaseY: number
  ampX: number
  ampY: number
  winnerSublabel?: string
}

const HERO_CARDS: FloatingHeroCard[] = [
  // Left Cluster (3 cards positioned cleanly to the left of the center hero text)
  {
    id: 'left-top',
    marketId: 'marine-le-pen-candidate',
    shortTitle: 'Le Pen RN Candidate',
    variant: 'yes-no',
    side: 'left',
    x: 9.5,
    y: 22,
    speedX: 0.24,
    speedY: 0.31,
    phaseX: 0.4,
    phaseY: 1.2,
    ampX: 0.28,
    ampY: 0.42,
  },
  {
    id: 'left-mid',
    marketId: 'french-pres-rn-1',
    shortTitle: 'French Pres. Election (RN)',
    variant: 'node',
    side: 'left',
    x: 15.5,
    y: 52,
    speedX: 0.21,
    speedY: 0.27,
    phaseX: 1.9,
    phaseY: 0.6,
    ampX: 0.25,
    ampY: 0.38,
  },
  {
    id: 'left-bottom',
    marketId: 'france-national-assembly-seats',
    shortTitle: 'French Assembly Winner',
    variant: 'winner',
    side: 'left',
    x: 9.0,
    y: 80,
    speedX: 0.26,
    speedY: 0.29,
    phaseX: 3.1,
    phaseY: 2.3,
    ampX: 0.28,
    ampY: 0.42,
    winnerSublabel: 'Projected Plurality',
  },

  // Right Cluster (3 cards positioned cleanly to the right of the center hero text)
  {
    id: 'right-top',
    marketId: 'knesset-2026',
    shortTitle: 'Knesset 2026 Plurality',
    variant: 'winner',
    side: 'right',
    x: 90.5,
    y: 22,
    speedX: 0.23,
    speedY: 0.28,
    phaseX: 2.2,
    phaseY: 1.5,
    ampX: 0.28,
    ampY: 0.42,
    winnerSublabel: 'Leading Seat Share',
  },
  {
    id: 'right-mid',
    marketId: 'polymarket-api-fees-positions',
    shortTitle: 'Polymarket Position Fees',
    variant: 'yes-no',
    side: 'right',
    x: 84.5,
    y: 52,
    speedX: 0.25,
    speedY: 0.22,
    phaseX: 4.1,
    phaseY: 2.9,
    ampX: 0.25,
    ampY: 0.38,
  },
  {
    id: 'right-bottom',
    marketId: 'polymarket-clarification-notes-scalar',
    shortTitle: 'ZK-TLS Evaluator Score',
    variant: 'node',
    side: 'right',
    x: 91.0,
    y: 80,
    speedX: 0.2,
    speedY: 0.26,
    phaseX: 5.0,
    phaseY: 3.7,
    ampX: 0.28,
    ampY: 0.42,
  },
]

const HERO_EDGES: Array<{ id: string; from: string; to: string }> = [
  { id: 'left-e1', from: 'left-top', to: 'left-mid' },
  { id: 'left-e2', from: 'left-mid', to: 'left-bottom' },
  { id: 'left-e3', from: 'left-top', to: 'left-bottom' },
  { id: 'right-e1', from: 'right-top', to: 'right-mid' },
  { id: 'right-e2', from: 'right-mid', to: 'right-bottom' },
  { id: 'right-e3', from: 'right-top', to: 'right-bottom' },
]

interface PredictionMarketNodeGraphProps {
  onNavigate: (section: NavSection) => void
}

export const PredictionMarketNodeGraph: React.FC<
  PredictionMarketNodeGraphProps
> = ({ onNavigate }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [selectedOutcomes, setSelectedOutcomes] = useState<Record<string, number>>({
    'left-top': 0,
    'right-mid': 0,
  })
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    let rafId: number
    const start = performance.now()
    const tick = (now: number) => {
      setTime((now - start) / 1000)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Gentle, independent ambient drift for each card (never bouncing between each other)
  const livePositions = new Map<string, { x: number; y: number }>()
  for (const card of HERO_CARDS) {
    const dx = Math.sin(time * card.speedX + card.phaseX) * card.ampX
    const dy = Math.cos(time * card.speedY + card.phaseY) * card.ampY
    livePositions.set(card.id, {
      x: card.x + dx,
      y: card.y + dy,
    })
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block overflow-hidden select-none">
      {/* Subtle Connector Lines linking the left cluster and right cluster */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        {HERO_EDGES.map((edge) => {
          const fromPos = livePositions.get(edge.from)
          const toPos = livePositions.get(edge.to)
          if (!fromPos || !toPos) return null

          const x1 = fromPos.x * 10
          const y1 = fromPos.y * 6
          const x2 = toPos.x * 10
          const y2 = toPos.y * 6

          const midX = (x1 + x2) / 2
          const midY = (y1 + y2) / 2
          const pullTowardsCenter = fromPos.x < 50 ? 22 : -22
          const ctrlX = midX + pullTowardsCenter
          const ctrlY = midY
          const pathD = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`

          const isHighlighted =
            hoveredCardId === edge.from || hoveredCardId === edge.to

          return (
            <path
              key={edge.id}
              d={pathD}
              fill="none"
              stroke={isHighlighted ? '#9358FF' : '#8F55F7'}
              strokeOpacity={isHighlighted ? 0.65 : 0.2}
              strokeWidth={isHighlighted ? 1.75 : 1.1}
              strokeDasharray={edge.id.endsWith('e3') ? '4 5' : undefined}
            />
          )
        })}
      </svg>

      {/* Left & Right Floating Cards (Node Cards, Yes/No Outcome Cards, and Winner Cards) */}
      {HERO_CARDS.map((card) => {
        const market: MarketItem =
          INITIAL_MARKETS.find((m) => m.id === card.marketId) ?? INITIAL_MARKETS[0]
        const topOutcome = market.outcomes[0]
        const secondOutcome = market.outcomes[1] ?? market.outcomes[0]
        const pos = livePositions.get(card.id) ?? { x: card.x, y: card.y }
        const isHovered = hoveredCardId === card.id
        const activeOutcomeIdx = selectedOutcomes[card.id] ?? 0

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCardId(card.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 text-left rounded-xl transition-[border-color,box-shadow,background-color] duration-300 backdrop-blur-md ${
              card.variant === 'node'
                ? 'w-[205px] xl:w-[224px] p-3'
                : card.variant === 'yes-no'
                ? 'w-[215px] xl:w-[236px] p-3'
                : 'w-[215px] xl:w-[236px] p-3'
            } ${
              isHovered
                ? 'bg-[#211E36]/95 border border-[#8B47FF] shadow-[0_12px_32px_-8px_rgba(125,51,255,0.45)] z-30'
                : 'bg-[#181529]/90 border border-[#BFBFE6]/15 shadow-[0_10px_28px_-10px_rgba(8,6,16,0.75)] z-20'
            }`}
          >
            {/* Header Row: Avatar + Title + Optional Badge */}
            <div
              onClick={() => onNavigate('app')}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 border border-[#BFBFE6]/15">
                  <MarketThumbnail type={market.avatarType} />
                </div>
                <div className="text-xs font-medium text-[#E9E9F5] leading-tight truncate">
                  {card.shortTitle}
                </div>
              </div>

              {card.variant === 'winner' && (
                <span className="px-1.5 py-0.5 rounded bg-[#7D33FF]/25 border border-[#9C6FF2]/40 text-[11.5px] theme-font-mono uppercase tracking-wider text-[#D5D3F2] shrink-0">
                  Lead
                </span>
              )}
            </div>

            {/* Variant 1: Classic Connected Market Node Card */}
            {card.variant === 'node' && (
              <div
                onClick={() => onNavigate('app')}
                className="mt-2.5 cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11.5px] theme-font-mono text-[#8A8A94] mb-1">
                  <span>
                    {market.type === 'scalar' ? 'Evaluator Score' : topOutcome?.label}
                  </span>
                  <span className="text-[#E9E9F5] font-medium">
                    {market.type === 'scalar'
                      ? `${market.scalarValue?.toFixed(2)}${market.scalarUnit ?? '/10'}`
                      : `${(topOutcome?.probability ?? 50).toFixed(1)}% · ${Math.round(
                          topOutcome?.probability ?? 50
                        )}¢`}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#12101F] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(8, topOutcome?.probability ?? 50)
                      )}%`,
                      backgroundColor: '#7D33FF',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Variant 2: Yes / No Outcome Card */}
            {card.variant === 'yes-no' && (
              <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                {[topOutcome, secondOutcome].map((outcome, idx) => {
                  const isActive = activeOutcomeIdx === idx
                  const unitLine = market.baseShareCents
                    ? `${Math.round(outcome.probability)}% · ${(
                        (outcome.probability / 100) *
                        market.baseShareCents
                      ).toFixed(1)}¢ of ${market.baseShareCents}¢`
                    : `${outcome.probability.toFixed(1)}% · ${Math.round(
                        outcome.probability
                      )}¢`
                  return (
                    <button
                      key={outcome.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOutcomes((prev) => ({
                          ...prev,
                          [card.id]: idx,
                        }))
                      }}
                      className={`px-2 py-1.5 rounded-lg text-left transition-colors border ${
                        isActive
                          ? 'bg-[#7D33FF] border-[#9C6FF2]/50 text-[#FFFFFF]'
                          : 'bg-[#1A1A1E]/90 border-[#BFBFE6]/10 text-[#D5D3F2] hover:bg-[#2E2B47]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11.5px] font-medium truncate">
                          {outcome.label}
                        </span>
                      </div>
                      <div className="text-[11.5px] theme-font-mono mt-0.5 truncate">
                        {unitLine}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Variant 3: Winner / Leading Outcome Card */}
            {card.variant === 'winner' && (
              <div
                onClick={() => onNavigate('app')}
                className="mt-2.5 space-y-1.5 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#101013]/90 border border-[#8F55F7]/25 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11.5px] theme-font-mono uppercase tracking-wider text-[#9C6FF2]">
                      {card.winnerSublabel ?? 'Projected Winner'}
                    </div>
                    <div className="text-xs font-medium text-[#FFFFFF] truncate">
                      {topOutcome?.label.split('(')[0].trim()}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs theme-font-mono font-semibold text-[#E9E9F5]">
                      {topOutcome?.probability.toFixed(1)}%
                    </div>
                    <div className="text-[11.5px] theme-font-mono text-[#9C6FF2]">
                      {Math.round(topOutcome?.probability ?? 50)}¢
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 text-[11.5px] theme-font-mono text-[#8A8A94]">
                  <span className="truncate">
                    2nd: {secondOutcome?.label.split('(')[0].trim()}
                  </span>
                  <span>
                    {secondOutcome?.probability.toFixed(1)}% ·{' '}
                    {Math.round(secondOutcome?.probability ?? 30)}¢
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
