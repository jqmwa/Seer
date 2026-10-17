import React, { useRef, useState, useLayoutEffect } from 'react'
import { ArrowUpRight, Star, Gift, CheckCircle2, Link2 } from 'lucide-react'
import { MarketItem, MarketOutcome } from '../data/markets'

interface MarketCardProps {
  market: MarketItem
  index?: number
  onSelectMarket: (market: MarketItem, initialOutcome?: MarketOutcome) => void
  onToggleStar: (marketId: string, e: React.MouseEvent) => void
}

function formatLiquidity(val: number): string {
  if (val >= 1000) {
    return `$${(val / 1000).toFixed(2)}k`
  }
  return `$${val.toFixed(0)}`
}

function formatDateSlash(isoDate: string): string {
  const parts = isoDate.split('-')
  if (parts.length !== 3) return isoDate
  return `${parts[1]}/${parts[2]}/${parts[0]}`
}

/**
 * 3x2 Dotted Matrix (:::) from the reference card top-right header
 */
export function DottedSixMatrix({ active }: { active?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-[3.5px] p-0.5">
      {[0, 1, 2, 3, 4, 5].map((dotIdx) => (
        <span
          key={dotIdx}
          className={`w-[3.5px] h-[3.5px] rounded-[1px] transition-colors ${
            active
              ? 'bg-[#7D33FF]'
              : 'bg-[var(--theme-text-muted)] opacity-60 group-hover:opacity-100 group-hover:bg-[#8F55F7]'
          }`}
        />
      ))}
    </div>
  )
}

export function MarketThumbnail({ type }: { type: MarketItem['avatarType'] }) {
  switch (type) {
    case 'israel':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="bg-il" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#242238" />
              <stop offset="100%" stopColor="#141223" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" fill="url(#bg-il)" />
          <rect y="10" width="64" height="6" fill="#7D33FF" opacity="0.85" />
          <rect y="48" width="64" height="6" fill="#7D33FF" opacity="0.85" />
          <polygon points="32,19 41,36 23,36" fill="none" stroke="#9C6FF2" strokeWidth="2.5" />
          <polygon points="32,45 41,28 23,28" fill="none" stroke="#9C6FF2" strokeWidth="2.5" />
        </svg>
      )
    case 'france-rn':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#141223" />
          <circle cx="32" cy="32" r="24" fill="#242238" stroke="#8F55F7" strokeWidth="1.5" />
          <path d="M23 44 C21 32 27 22 31 16 C33 24 29 32 29 44 Z" fill="#7D33FF" />
          <path d="M31 44 C31 32 35 24 39 18 C41 28 37 36 35 44 Z" fill="#9C6FF2" />
          <text x="39" y="39" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">RN</text>
        </svg>
      )
    case 'le-pen':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#242238" />
          <rect x="0" y="0" width="6" height="64" fill="#7D33FF" opacity="0.85" />
          <rect x="58" y="0" width="6" height="64" fill="#9C6FF2" opacity="0.85" />
          <circle cx="32" cy="24" r="11" fill="#E9E9F5" />
          <path d="M20 22 C20 14 44 14 44 24 C44 18 38 14 32 14 C26 14 20 18 20 22 Z" fill="#BFBFE6" />
          <path d="M14 58 C14 43 22 38 32 38 C42 38 50 43 50 58 Z" fill="#141223" />
        </svg>
      )
    case 'france-assembly':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#141223" />
          <path d="M12 44 A20 20 0 0 1 52 44" fill="none" stroke="#7D33FF" strokeWidth="6" strokeDasharray="11 2" />
          <path d="M18 44 A14 14 0 0 1 46 44" fill="none" stroke="#9C6FF2" strokeWidth="5" />
          <circle cx="32" cy="44" r="4.5" fill="#E9E9F5" />
        </svg>
      )
    case 'polymarket':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="bg-poly" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7D33FF" />
              <stop offset="100%" stopColor="#242238" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" fill="url(#bg-poly)" />
          <path
            d="M17 16 L47 26 L17 32 L47 38 L17 48 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'denmark':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="32" fill="#242238" />
          <rect y="32" width="64" height="32" fill="#4A4660" />
          <circle cx="26" cy="32" r="13" fill="#7D33FF" />
          <path d="M13 32 A13 13 0 0 0 39 32 Z" fill="#E9E9F5" />
        </svg>
      )
    case 'nato':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#242238" />
          <circle cx="32" cy="32" r="15" fill="none" stroke="#BFBFE6" strokeWidth="1.8" />
          <polygon points="32,9 35.5,28.5 55,32 35.5,35.5 32,55 28.5,35.5 9,32 28.5,28.5" fill="#9C6FF2" />
        </svg>
      )
    case 'court':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#242238" />
          <path
            d="M17 16 L47 26 L17 32 L47 38 L17 48 Z"
            fill="none"
            stroke="#E9E9F5"
            strokeWidth="4.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'senate':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#141223" />
          <path d="M12 48 H52 M16 42 H48 M20 28 V42 M28 28 V42 M36 28 V42 M44 28 V42" stroke="#E9E9F5" strokeWidth="3" />
          <path d="M18 28 C18 18 46 18 46 28 Z" fill="#8F55F7" />
          <line x1="32" y1="12" x2="32" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#242238" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="#9C6FF2" strokeWidth="2.5" strokeDasharray="5 3" />
          <circle cx="32" cy="32" r="8" fill="#7D33FF" />
        </svg>
      )
  }
}

/**
 * Expressive Bloomberg-Style Left-to-Right Moving Hero of Wide Active Market Cards
 * Fully adaptive to both Seer Dark and Seer Light brand themes.
 */
export const BloombergMarketHero: React.FC<{
  markets: MarketItem[]
  onSelectMarket: (market: MarketItem) => void
  children?: React.ReactNode
}> = ({ markets, onSelectMarket, children }) => {
  const loopItems = [...markets, ...markets]

  return (
    <section className="mb-6 select-none space-y-5">
      {/* Row 1: Search Bar, Filters, and Create New Market Button right underneath the navbar */}
      {children && <div>{children}</div>}

      {/* Row 2: Left-to-Right Moving Wide Cards Viewport */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right Edge Fade Masks matching active theme background */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 z-20"
          style={{
            background: 'linear-gradient(to right, var(--theme-app-bg), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 z-20"
          style={{
            background: 'linear-gradient(to left, var(--theme-app-bg), transparent)',
          }}
        />

        <div className="seer-marquee-track gap-4">
          {loopItems.map((market, i) => {
            const displayIndex = String((i % markets.length) + 1).padStart(2, '0')
            const topOutcome = market.outcomes[0]
            const probText =
              market.type === 'scalar'
                ? `${market.scalarValue?.toFixed(1)}`
                : `${topOutcome?.probability.toFixed(1)}%`
            const deltaPositive = i % 3 !== 0
            const deltaVal = deltaPositive ? `+${((i % 5) + 1.2).toFixed(1)}%` : `-${((i % 3) + 0.8).toFixed(1)}%`

            return (
              <div
                key={`${market.id}-${i}`}
                onClick={() => onSelectMarket(market)}
                style={{
                  background: 'var(--theme-card-bg-scanline)',
                  boxShadow: 'var(--theme-shadow-card)',
                }}
                className="relative group cursor-pointer shrink-0 w-[330px] h-[248px] rounded-[20px] p-2.5 border border-[var(--theme-card-border)] hover:border-[#7D33FF] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Top Header: "01" on Left + 3x2 Dotted Matrix ":::" on Right */}
                <div className="flex items-center justify-between px-1.5 pb-2">
                  <span className="text-[12px] theme-font-mono font-semibold text-[var(--theme-text-primary)] tracking-tight">
                    {displayIndex}
                  </span>
                  <DottedSixMatrix active={market.starred} />
                </div>

                {/* Inner Rounded-Rectangle Frame */}
                <div className="relative flex-1 w-full rounded-[14px] overflow-hidden border border-[var(--theme-card-border)] bg-[var(--theme-well-bg)] flex flex-col justify-between">
                  {/* Background Visual Graphic */}
                  <div className="absolute inset-0 opacity-30 group-hover:scale-105 group-hover:opacity-45 transition-all duration-500">
                    <MarketThumbnail type={market.avatarType} />
                  </div>
                  {/* Theme-Adaptive Vignette Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'var(--theme-hero-vignette)',
                    }}
                  />

                  {/* Top Row Inside Viewport */}
                  <div className="relative z-10 p-3.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--theme-panel-bg)]/90 backdrop-blur-md border border-[var(--theme-card-border)] text-[10px] theme-font-mono font-semibold text-[var(--theme-text-secondary)]">
                      {formatLiquidity(market.liquidityUSD)}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] theme-font-mono font-semibold border ${
                        deltaPositive
                          ? 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/35'
                          : 'bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/35'
                      }`}
                    >
                      {deltaPositive ? '▲' : '▼'} {deltaVal}
                    </span>
                  </div>

                  {/* Bottom Content Inside Viewport */}
                  <div className="relative z-10 p-3.5 pt-0 space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-2xl font-bold theme-font-mono text-[var(--theme-text-primary)] tracking-tight">
                        {probText}
                      </span>
                      <span
                        className={`text-[11px] theme-font-mono font-semibold truncate max-w-[180px] ${
                          topOutcome?.label.toLowerCase() === 'yes'
                            ? 'text-[#34D399]'
                            : topOutcome?.label.toLowerCase() === 'no'
                            ? 'text-[#FB7185]'
                            : 'text-[#9C6FF2]'
                        }`}
                      >
                        {market.type === 'scalar' ? market.scalarUnit : topOutcome?.label}
                      </span>
                    </div>

                    <p className="text-[13px] font-medium leading-[1.35] text-[var(--theme-text-secondary)] line-clamp-2">
                      {market.question}
                    </p>

                    {/* Micro Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-[var(--theme-panel-divider)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, Math.max(8, topOutcome?.probability || 50))}%`,
                          background:
                            topOutcome?.label.toLowerCase() === 'yes'
                              ? 'linear-gradient(90deg, #059669, #34D399)'
                              : topOutcome?.label.toLowerCase() === 'no'
                              ? 'linear-gradient(90deg, #E11D48, #FB7185)'
                              : 'linear-gradient(90deg, #7D33FF, #9C6FF2)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function getOutcomeAccentColor(label: string, idx: number): string {
  const lower = label.trim().toLowerCase()
  if (lower === 'yes' || lower.startsWith('yes ')) return '#10B981'
  if (lower === 'no' || lower.startsWith('no ')) return '#F43F5E'
  const predictionPalette = ['#7D33FF', '#9C6FF2', '#8F55F7', '#BFBFE6']
  return predictionPalette[idx % predictionPalette.length]
}

function MiniDonut({ outcomes }: { outcomes: MarketOutcome[] }) {
  const size = 32
  const strokeWidth = 5.5
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  let accumulatedPercent = 0

  return (
    <div className="relative w-[32px] h-[32px] shrink-0 flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="var(--theme-donut-track)"
          strokeWidth={strokeWidth}
        />
        {outcomes.map((outcome, idx) => {
          const strokeDasharray = `${(outcome.probability / 100) * circumference} ${circumference}`
          const strokeDashoffset = -((accumulatedPercent / 100) * circumference)
          accumulatedPercent += outcome.probability
          const strokeColor = getOutcomeAccentColor(outcome.label, idx)
          return (
            <circle
              key={outcome.id}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
            />
          )
        })}
      </svg>
    </div>
  )
}

/**
 * Generates the fluid SVG path where the bottom-right cutout pocket has a fixed
 * square dimension (pocketW x pocketH) anchored to the bottom-right, so the detached
 * button is always a lowered, balanced rounded square even when the card gets taller.
 */
function buildFluidCardPath(
  w: number,
  h: number,
  pocketW: number,
  pocketH: number
): string {
  const R = 22 // Outer corner radius (top-left, bottom-left)
  const stepY = Math.max(28, h - pocketH) // Y coordinate where the cutout ceiling begins
  const rTopRight = Math.min(20, stepY / 2)
  const rLip = Math.min(16, stepY / 2) // Convex corner at bottom-right of upper lip
  const rConcave = 16 // Smooth concave inner fillet
  const rBottomCut = 18 // Convex corner at bottom of the pocket wall

  const cutX = Math.max(R + 40, w - pocketW)

  return [
    `M ${R} 0`,
    `L ${w - rTopRight} 0`,
    `A ${rTopRight} ${rTopRight} 0 0 1 ${w} ${rTopRight}`,
    `L ${w} ${stepY - rLip}`,
    `A ${rLip} ${rLip} 0 0 1 ${w - rLip} ${stepY}`,
    `L ${cutX + rConcave} ${stepY}`,
    `A ${rConcave} ${rConcave} 0 0 0 ${cutX} ${stepY + rConcave}`,
    `L ${cutX} ${h - rBottomCut}`,
    `A ${rBottomCut} ${rBottomCut} 0 0 1 ${cutX - rBottomCut} ${h}`,
    `L ${R} ${h}`,
    `A ${R} ${R} 0 0 1 0 ${h - R}`,
    `L 0 ${R}`,
    `A ${R} ${R} 0 0 1 ${R} 0`,
    'Z',
  ].join(' ')
}

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  index = 0,
  onSelectMarket,
  onToggleStar,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 380, h: 158 })

  // Lowered square button geometry anchored to the bottom-right corner
  const BTN_SIZE = 54 // Square 54x54 detached action button
  const GAP = 10 // Fluid channel gap between main body and detached button
  const POCKET_W = BTN_SIZE + GAP // 64px
  const POCKET_H = BTN_SIZE + GAP // 64px

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setDims({ w: Math.round(rect.width), h: Math.round(rect.height) })
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const svgPath = buildFluidCardPath(dims.w, dims.h, POCKET_W, POCKET_H)
  const gradId = `fluid-grad-${market.id}`

  const isUpMove = index % 3 !== 1
  const moveDelta = isUpMove
    ? `+${((index % 4) + 1.4).toFixed(1)}%`
    : `-${((index % 3) + 0.9).toFixed(1)}%`

  return (
    <div
      ref={containerRef}
      onClick={() => onSelectMarket(market)}
      className="relative group cursor-pointer select-none transition-transform duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
      style={{ minHeight: 156 }}
    >
      {/* Fluid Notched SVG Card Surface & Border (Theme-Adaptive, Seer Purple Hover) */}
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="var(--theme-card-grad-start)" />
            <stop offset="55%" stopColor="var(--theme-card-grad-mid)" />
            <stop offset="100%" stopColor="var(--theme-card-grad-end)" />
          </linearGradient>
        </defs>
        <path
          d={svgPath}
          fill={`url(#${gradId})`}
          className="transition-all duration-300"
          style={{
            filter: 'var(--theme-card-drop-shadow)',
          }}
        />
        <path
          d={svgPath}
          fill="none"
          stroke="var(--theme-card-stroke)"
          strokeWidth="1"
          className="transition-colors duration-300 group-hover:stroke-[#8F55F7]/65"
        />
      </svg>

      {/* Balanced Card Interior: Top Zone (Full Width) + Bottom Zone (Left of Action Button) */}
      <div className="relative z-10 flex flex-col justify-between flex-1 p-3.5">
        {/* Top Zone: Left Thumbnail + Full-Width Header Meta & Question Title */}
        <div className="flex items-start gap-3.5">
          {/* Top-Left Rounded-Square Thumbnail */}
          <div className="relative w-[68px] h-[68px] rounded-[14px] overflow-hidden shrink-0 border border-[var(--theme-card-border)] shadow-md bg-[#141223]">
            <MarketThumbnail type={market.avatarType} />
            <div className="absolute bottom-1 right-1 bg-[var(--theme-panel-bg)]/90 backdrop-blur-sm rounded-full p-0.5 border border-[var(--theme-card-border)]">
              <MiniDonut outcomes={market.outcomes} />
            </div>
          </div>

          {/* Right Column: Balanced Top Meta Row + Question Title */}
          <div className="min-w-0 flex-1 flex flex-col justify-between min-h-[68px]">
            {/* Top Meta Row: Date, Liquidity, Movement on Left; Badges & Star on Right */}
            <div className="flex items-center justify-between gap-2 text-[11px] theme-font-mono text-[var(--theme-text-muted)]">
              <div className="flex items-center flex-wrap gap-1.5 min-w-0">
                <span>{formatDateSlash(market.endDate)}</span>
                <span>·</span>
                <span className="text-[var(--theme-text-secondary)] font-semibold">
                  {formatLiquidity(market.liquidityUSD)}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold leading-none ${
                    isUpMove
                      ? 'bg-[#10B981]/15 text-[#34D399]'
                      : 'bg-[#F43F5E]/15 text-[#FB7185]'
                  }`}
                >
                  {isUpMove ? '▲' : '▼'} {moveDelta}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {market.hasIncentive && (
                  <span className="inline-flex items-center text-[#9C6FF2]" title="Farming Rewards">
                    <Gift className="w-3.5 h-3.5" />
                  </span>
                )}
                {market.hasParentLink && (
                  <span className="inline-flex items-center text-[#8F55F7]" title="Conditional Market">
                    <Link2 className="w-3.5 h-3.5" />
                  </span>
                )}
                {market.verified && (
                  <span className="inline-flex items-center text-[#34D399]" title="Verified">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => onToggleStar(market.id, e)}
                  className="inline-flex items-center text-[var(--theme-text-muted)] hover:text-[#9C6FF2] transition-colors focus:outline-none"
                  title={market.starred ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${market.starred ? 'text-[#9C6FF2]' : ''}`}
                    fill={market.starred ? '#9C6FF2' : 'none'}
                  />
                </button>
              </div>
            </div>

            {/* Question Title */}
            <h3 className="text-[14.5px] font-medium leading-[1.32] text-[var(--theme-text-primary)] group-hover:text-[#E9E9F5] line-clamp-2 tracking-[-0.01em] transition-colors mt-1">
              {market.question}
            </h3>
          </div>
        </div>

        {/* Bottom Zone: Outcome Pills Balanced Across Bottom Width Left of Cutout Pocket */}
        <div
          className="mt-3 pt-2.5 border-t border-[var(--theme-panel-divider)] flex items-center"
          style={{ marginRight: POCKET_W + 2 }}
        >
          {market.type === 'scalar' ? (
            <div className="w-full flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#7D33FF]/15 border border-[#8F55F7]/35 text-[11.5px] theme-font-mono text-[#E9E9F5] font-semibold">
                {market.scalarValue?.toFixed(2)} {market.scalarUnit}
              </span>
              <span className="text-[11px] theme-font-mono text-[var(--theme-text-muted)]">
                Range: {market.scalarMin} – {market.scalarMax}
              </span>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:flex sm:items-center gap-1.5">
              {market.outcomes.slice(0, 3).map((outcome, idx) => {
                const lower = outcome.label.trim().toLowerCase()
                const isYes = lower === 'yes' || lower.startsWith('yes ')
                const isNo = lower === 'no' || lower.startsWith('no ')

                const pillStyle = isYes
                  ? 'bg-[#10B981]/10 hover:bg-[#10B981]/20 border-[#10B981]/30 hover:border-[#10B981]/60'
                  : isNo
                  ? 'bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 border-[#F43F5E]/30 hover:border-[#F43F5E]/60'
                  : 'bg-[#7D33FF]/12 hover:bg-[#7D33FF]/22 border-[#8F55F7]/30 hover:border-[#9C6FF2]/60'

                const dotColor = isYes
                  ? '#10B981'
                  : isNo
                  ? '#F43F5E'
                  : getOutcomeAccentColor(outcome.label, idx)
                const probColor = isYes ? '#34D399' : isNo ? '#FB7185' : '#E9E9F5'

                return (
                  <button
                    key={outcome.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectMarket(market, outcome)
                    }}
                    className={`flex-1 min-w-0 inline-flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${pillStyle}`}
                  >
                    <span className="inline-flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: dotColor }}
                      />
                      <span className="text-[var(--theme-text-secondary)] truncate">
                        {outcome.label}
                      </span>
                    </span>
                    <span
                      className="theme-font-mono font-semibold shrink-0"
                      style={{ color: probColor }}
                    >
                      {outcome.probability % 1 === 0
                        ? `${outcome.probability.toFixed(0)}%`
                        : `${outcome.probability.toFixed(1)}%`}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detached Bottom-Right Square Action Button (↗) — Fixed 54x54 Square, Seer Purple Hover */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onSelectMarket(market)
        }}
        style={{
          width: BTN_SIZE,
          height: BTN_SIZE,
          bottom: 0,
          right: 0,
          boxShadow: 'var(--theme-shadow-panel)',
        }}
        className="absolute z-10 rounded-[16px] bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] group-hover:border-[#9C6FF2]/60 group-hover:bg-[#7D33FF] flex items-center justify-center text-[#9C6FF2] group-hover:text-[#FFFFFF] transition-all duration-300"
        title="Open Market & Trade"
      >
        <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  )
}
