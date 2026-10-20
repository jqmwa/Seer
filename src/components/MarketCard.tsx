import React, { useEffect, useRef } from 'react'
import { Gift, Bookmark } from 'lucide-react'
import { MarketItem, MarketOutcome } from '../data/markets'

interface MarketCardProps {
  market: MarketItem
  index?: number
  onSelectMarket: (market: MarketItem, initialOutcome?: MarketOutcome) => void
  onToggleStar: (marketId: string, e: React.MouseEvent) => void
}

function formatVolume(val: number): string {
  if (val >= 1_000_000) {
    return `$${(val / 1_000_000).toFixed(1)}M`
  }
  if (val >= 1_000) {
    return `$${(val / 1_000).toFixed(1)}K`
  }
  return `$${val.toFixed(0)}`
}

function formatLiquidity(val: number): string {
  if (val >= 1_000_000) {
    return `$${(val / 1_000_000).toFixed(1)}M`
  }
  if (val >= 1_000) {
    return `$${(val / 1_000).toFixed(1)}K`
  }
  return `$${val.toFixed(0)}`
}

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function formatDayMonth(isoDate: string): string {
  const parts = isoDate.split('-')
  if (parts.length !== 3) return isoDate
  const monthIdx = Math.max(0, Math.min(11, parseInt(parts[1], 10) - 1))
  const day = parseInt(parts[2], 10)
  return `${day} ${SHORT_MONTHS[monthIdx]}`
}

/**
 * 3x2 Dotted Matrix (:::) retained for compatibility
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

/**
 * MarketThumbnail retained for MarketDetailPage & PredictionMarketNodeGraph compatibility
 */
export function MarketThumbnail({ type }: { type: MarketItem['avatarType'] }) {
  switch (type) {
    case 'israel':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="bg-il" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1A1A1E" />
              <stop offset="100%" stopColor="#101013" />
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
          <rect width="64" height="64" fill="#101013" />
          <circle cx="32" cy="32" r="24" fill="#1A1A1E" stroke="#8F55F7" strokeWidth="1.5" />
          <path d="M23 44 C21 32 27 22 31 16 C33 24 29 32 29 44 Z" fill="#7D33FF" />
          <path d="M31 44 C31 32 35 24 39 18 C41 28 37 36 35 44 Z" fill="#9C6FF2" />
          <text x="38" y="39" fill="#FFFFFF" fontSize="11.5" fontWeight="bold" fontFamily="sans-serif">RN</text>
        </svg>
      )
    case 'le-pen':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#1A1A1E" />
          <rect x="0" y="0" width="6" height="64" fill="#7D33FF" opacity="0.85" />
          <rect x="58" y="0" width="6" height="64" fill="#9C6FF2" opacity="0.85" />
          <circle cx="32" cy="24" r="11" fill="#E9E9F5" />
          <path d="M20 22 C20 14 44 14 44 24 C44 18 38 14 32 14 C26 14 20 18 20 22 Z" fill="#BFBFE6" />
          <path d="M14 58 C14 43 22 38 32 38 C42 38 50 43 50 58 Z" fill="#101013" />
        </svg>
      )
    case 'france-assembly':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#101013" />
          <path d="M12 44 A20 20 0 0 1 52 44" fill="none" stroke="#7D33FF" strokeWidth="6" strokeDasharray="11 2" />
          <path d="M18 44 A14 14 0 0 1 46 44" fill="none" stroke="#9C6FF2" strokeWidth="5" />
          <circle cx="32" cy="44" r="4.5" fill="#E9E9F5" />
        </svg>
      )
    case 'polymarket':
    case 'eth':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="bg-poly" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7D33FF" />
              <stop offset="100%" stopColor="#1A1A1E" />
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
          <rect width="64" height="32" fill="#1A1A1E" />
          <rect y="32" width="64" height="32" fill="#4A4660" />
          <circle cx="26" cy="32" r="13" fill="#7D33FF" />
          <path d="M13 32 A13 13 0 0 0 39 32 Z" fill="#E9E9F5" />
        </svg>
      )
    case 'nato':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#1A1A1E" />
          <circle cx="32" cy="32" r="15" fill="none" stroke="#BFBFE6" strokeWidth="1.8" />
          <polygon points="32,9 35.5,28.5 55,32 35.5,35.5 32,55 28.5,35.5 9,32 28.5,28.5" fill="#9C6FF2" />
        </svg>
      )
    case 'court':
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#1A1A1E" />
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
          <rect width="64" height="64" fill="#101013" />
          <path d="M12 48 H52 M16 42 H48 M20 28 V42 M28 28 V42 M36 28 V42 M44 28 V42" stroke="#E9E9F5" strokeWidth="3" />
          <path d="M18 28 C18 18 46 18 46 28 Z" fill="#8F55F7" />
          <line x1="32" y1="12" x2="32" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="64" height="64" fill="#1A1A1E" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="#9C6FF2" strokeWidth="2.5" strokeDasharray="5 3" />
          <circle cx="32" cy="32" r="8" fill="#7D33FF" />
        </svg>
      )
  }
}

/**
 * Varied Dithered Purple Avatar / Glyph Icons so each market card has a distinct icon
 */
function MarketCardDitherIcon({
  market,
  index = 0,
}: {
  market: MarketItem
  index?: number
}) {
  // Determine a distinct variant per market
  const variant = (() => {
    switch (market.id) {
      case 'eth-close-5000-2026':
        return 'hash'
      case 'knesset-2026':
        return 'hexagram'
      case 'french-pres-rn-1':
        return 'flame'
      case 'marine-le-pen-candidate':
        return 'ballot'
      case 'france-national-assembly-seats':
        return 'hemicycle'
      case 'french-pres-rn-conditional':
        return 'branch'
      case 'polymarket-neg-risk-fix':
        return 'terminal'
      case 'polymarket-api-fees-positions':
        return 'layers'
      case 'polymarket-non-uma-oracle':
        return 'oracle-eye'
      case 'polymarket-api-total-fees-user':
        return 'bars'
      case 'kurdish-militant-iran-2026':
        return 'radar'
      case 'polymarket-clarification-notes-scalar':
        return 'scalar-wave'
      case 'greenland-sovereignty-treaty-2026':
        return 'globe'
      case 'us-nato-greenland-hostilities':
        return 'compass'
      case 'court-rule-against-polymarket-2026':
        return 'scales'
      case 'polymarket-token-distribution-2027':
        return 'token'
      case 'digital-asset-market-clarity-act-2026':
        return 'capitol'
      default: {
        const pool = [
          'hash',
          'hexagram',
          'flame',
          'ballot',
          'hemicycle',
          'branch',
          'terminal',
          'oracle-eye',
          'radar',
          'compass',
          'scales',
          'capitol',
        ]
        return pool[index % pool.length]
      }
    }
  })()

  return (
    <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
      {/* Left Bayer-style dither accent dots (varied pattern per index) */}
      <rect x="4.5" y="7" width="2.6" height="2.6" rx="0.5" fill="#8F55F7" />
      <rect
        x="4.5"
        y="13.5"
        width="2.6"
        height="2.6"
        rx="0.5"
        fill={index % 2 === 0 ? '#7D33FF' : '#9C6FF2'}
      />
      <rect x="4.5" y="20" width="2.6" height="2.6" rx="0.5" fill="#8F55F7" />
      <rect
        x="4.5"
        y="26.5"
        width="2.6"
        height="2.6"
        rx="0.5"
        fill={index % 2 === 0 ? '#9C6FF2' : '#7D33FF'}
      />
      <rect x="9" y="10.2" width="2.2" height="2.2" rx="0.4" fill="#7D33FF" opacity="0.7" />
      <rect x="9" y="23.2" width="2.2" height="2.2" rx="0.4" fill="#7D33FF" opacity="0.7" />

      {variant === 'hash' && (
        <g stroke="#8F55F7" strokeWidth="2.2" strokeLinecap="round">
          <line x1="19.5" y1="8" x2="18" y2="28" />
          <line x1="26.5" y1="8" x2="25" y2="28" />
          <line x1="14.5" y1="14.5" x2="30.5" y2="14.5" />
          <line x1="14" y1="21.5" x2="30" y2="21.5" />
        </g>
      )}

      {variant === 'hexagram' && (
        <g stroke="#9C6FF2" strokeWidth="1.9" strokeLinejoin="round">
          <polygon points="22.5,7.5 29.5,20.5 15.5,20.5" />
          <polygon points="22.5,28.5 29.5,15.5 15.5,15.5" />
        </g>
      )}

      {variant === 'flame' && (
        <path
          d="M22.5 7.5C22.5 7.5 29 13 29 19.5C29 24.2 26.1 28 22.5 28C18.9 28 16 24.2 16 19.5C16 16.2 18.2 13.5 19.5 12C19.5 15 21.5 16 22.5 13.5C23.5 11 22.5 7.5 22.5 7.5Z"
          stroke="#8F55F7"
          strokeWidth="2"
          fill="#7D33FF"
          fillOpacity="0.25"
          strokeLinejoin="round"
        />
      )}

      {variant === 'ballot' && (
        <g stroke="#9C6FF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="15" y="12" width="15" height="15" rx="2.5" fill="#7D33FF" fillOpacity="0.18" />
          <path d="M19 19.5L21.5 22L26.5 16.5" stroke="#B28AFF" strokeWidth="2.2" />
          <line x1="18" y1="9" x2="27" y2="9" />
        </g>
      )}

      {variant === 'hemicycle' && (
        <g stroke="#8F55F7" strokeWidth="2.1" strokeLinecap="round">
          <path d="M14.5 25.5A8.5 8.5 0 0 1 30.5 25.5" />
          <path d="M18 25.5A5 5 0 0 1 27 25.5" stroke="#B28AFF" />
          <circle cx="22.5" cy="25.5" r="1.8" fill="#9C6FF2" stroke="none" />
          <circle cx="16.5" cy="14" r="1.3" fill="#7D33FF" stroke="none" />
          <circle cx="22.5" cy="11.5" r="1.3" fill="#9C6FF2" stroke="none" />
          <circle cx="28.5" cy="14" r="1.3" fill="#7D33FF" stroke="none" />
        </g>
      )}

      {variant === 'branch' && (
        <g stroke="#9C6FF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16.5" cy="18" r="2.2" fill="#7D33FF" />
          <circle cx="28" cy="11.5" r="2.2" fill="#9C6FF2" />
          <circle cx="28" cy="24.5" r="2.2" fill="#7D33FF" />
          <path d="M18.7 17L25.8 12.5" />
          <path d="M18.7 19L25.8 23.5" />
        </g>
      )}

      {variant === 'terminal' && (
        <g stroke="#8F55F7" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15.5,13 20.5,18 15.5,23" />
          <line x1="22.5" y1="23.5" x2="29.5" y2="23.5" stroke="#B28AFF" />
          <rect x="24" y="11" width="3" height="3" fill="#7D33FF" stroke="none" />
        </g>
      )}

      {variant === 'layers' && (
        <g stroke="#9C6FF2" strokeWidth="1.9" strokeLinejoin="round">
          <polygon points="22.5,8.5 30.5,13 22.5,17.5 14.5,13" fill="#7D33FF" fillOpacity="0.25" />
          <polyline points="14.5,18 22.5,22.5 30.5,18" />
          <polyline points="14.5,23 22.5,27.5 30.5,23" stroke="#7D33FF" />
        </g>
      )}

      {variant === 'oracle-eye' && (
        <g stroke="#9C6FF2" strokeWidth="2" strokeLinejoin="round">
          <path
            d="M14 18C16.2 13.2 19.2 11.5 22.5 11.5C25.8 11.5 28.8 13.2 31 18C28.8 22.8 25.8 24.5 22.5 24.5C19.2 24.5 16.2 22.8 14 18Z"
            fill="#7D33FF"
            fillOpacity="0.2"
          />
          <circle cx="22.5" cy="18" r="2.8" fill="#B28AFF" />
        </g>
      )}

      {variant === 'bars' && (
        <g fill="#8F55F7">
          <rect x="15" y="19" width="3.5" height="8.5" rx="1" fill="#7D33FF" />
          <rect x="20.8" y="13.5" width="3.5" height="14" rx="1" fill="#9C6FF2" />
          <rect x="26.5" y="9" width="3.5" height="18.5" rx="1" fill="#B28AFF" />
        </g>
      )}

      {variant === 'radar' && (
        <g stroke="#8F55F7" strokeWidth="1.9">
          <circle cx="22.5" cy="18" r="7.5" />
          <circle cx="22.5" cy="18" r="3" fill="#7D33FF" fillOpacity="0.35" />
          <line x1="22.5" y1="8.5" x2="22.5" y2="12" strokeLinecap="round" />
          <line x1="22.5" y1="24" x2="22.5" y2="27.5" strokeLinecap="round" />
          <line x1="13" y1="18" x2="16.5" y2="18" strokeLinecap="round" />
          <line x1="28.5" y1="18" x2="32" y2="18" strokeLinecap="round" />
        </g>
      )}

      {variant === 'scalar-wave' && (
        <g stroke="#9C6FF2" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 21C16.5 12 19 12 21.5 18C24 24 26.5 24 29.5 13" />
          <circle cx="29.5" cy="13" r="2" fill="#B28AFF" stroke="none" />
        </g>
      )}

      {variant === 'globe' && (
        <g stroke="#8F55F7" strokeWidth="1.8">
          <circle cx="22.5" cy="18" r="7.5" fill="#7D33FF" fillOpacity="0.15" />
          <ellipse cx="22.5" cy="18" rx="3.6" ry="7.5" />
          <line x1="15" y1="18" x2="30" y2="18" />
        </g>
      )}

      {variant === 'compass' && (
        <polygon
          points="22.5,8 24.8,15.7 32,18 24.8,20.3 22.5,28 20.2,20.3 13,18 20.2,15.7"
          stroke="#9C6FF2"
          strokeWidth="1.8"
          fill="#7D33FF"
          fillOpacity="0.3"
          strokeLinejoin="round"
        />
      )}

      {variant === 'scales' && (
        <g stroke="#9C6FF2" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22.5" y1="8.5" x2="22.5" y2="27" />
          <line x1="15.5" y1="13" x2="29.5" y2="13" />
          <polygon points="16,13 18.8,20 13.2,20" fill="#7D33FF" fillOpacity="0.35" />
          <polygon points="29,13 31.8,20 26.2,20" fill="#7D33FF" fillOpacity="0.35" />
          <line x1="18.5" y1="27" x2="26.5" y2="27" />
        </g>
      )}

      {variant === 'token' && (
        <g stroke="#9C6FF2" strokeWidth="1.9">
          <circle cx="22.5" cy="18" r="7.5" fill="#7D33FF" fillOpacity="0.22" />
          <polygon points="22.5,12.5 26.5,18 22.5,23.5 18.5,18" fill="#B28AFF" stroke="none" />
        </g>
      )}

      {variant === 'capitol' && (
        <g stroke="#9C6FF2" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 16.5C16 12 29 12 29 16.5Z" fill="#7D33FF" fillOpacity="0.3" />
          <line x1="22.5" y1="8.5" x2="22.5" y2="12" />
          <line x1="17.5" y1="17" x2="17.5" y2="25" />
          <line x1="22.5" y1="17" x2="22.5" y2="25" />
          <line x1="27.5" y1="17" x2="27.5" y2="25" />
          <line x1="14.5" y1="26" x2="30.5" y2="26" />
        </g>
      )}
    </svg>
  )
}

// ============================================================================
// 8x8 BAYER ORDERED DITHER MATRIX
// ============================================================================
const BAYER_8X8: number[][] = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

// 6-stop Seer Bayer Dither Palette (RGB tuples from Seer Deep Black #101013 to luminous orb white)
const DITHER_PALETTE: Array<[number, number, number]> = [
  [16, 16, 19],    // 0: Seer Design Kit True Black (#101013)
  [26, 26, 30],    // 1: Seer Design Kit Card Dark (#1A1A1E)
  [47, 39, 67],    // 2: Muted shadow purple (#2F2743)
  [125, 51, 255],  // 3: Seer vibrant purple (#7D33FF)
  [156, 111, 242], // 4: Seer light purple (#9C6FF2)
  [236, 236, 243], // 5: Seer soft white (#ECECF3)
]

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Evaluates the normalized luminance [0..1] of the Seer in front of a Magic Crystal Ball
 * at normalized scene coordinates (nx in [-aspect..aspect], ny in [-1..1]).
 */
function sampleSeerAndMagicBallScene(
  nx: number,
  ny: number,
  timeSec: number,
  focusX: number,
  focusY: number
): number {
  const ax = Math.abs(nx)

  // Center of the Magic Crystal Ball (foreground lower-center)
  const orbCx = focusX * 0.06
  const orbCy = 0.34 + focusY * 0.04
  const orbR = 0.42

  const dxOrb = nx - orbCx
  const dyOrb = ny - orbCy
  const distOrb = Math.sqrt(dxOrb * dxOrb + dyOrb * dyOrb)

  // 1. Ambient radial mystic aura emanating from the crystal ball across the wide banner
  const auraDist = Math.sqrt((nx - orbCx) * (nx - orbCx) * 0.55 + (ny - 0.1) * (ny - 0.1))
  let lum = Math.max(0, 0.32 - auraDist * 0.19)

  // Subtle concentric arcane rings / rays in the background
  const angleToOrb = Math.atan2(ny - orbCy, nx - orbCx)
  const rayWave = Math.sin(angleToOrb * 12 + timeSec * 0.5) * 0.5 + 0.5
  const ringWave = Math.sin(distOrb * 18 - timeSec * 1.2) * 0.5 + 0.5
  if (distOrb > orbR) {
    lum += rayWave * Math.exp(-distOrb * 1.15) * 0.14
    lum += ringWave * Math.exp(-distOrb * 1.4) * 0.08
  }

  // Cathedral / Arcane gothic arch framing far left & right of banner
  const archX = Math.abs(ax - 1.45)
  if (archX < 0.08 && ny > -0.75) {
    lum += (1 - archX / 0.08) * 0.12
  }
  // Distant celestial stars in the upper field
  const starHash = Math.sin(nx * 37.3 + ny * 73.1) * 43758.5453
  const starFrac = starHash - Math.floor(starHash)
  if (starFrac > 0.994 && distOrb > 0.75 && ny < 0.4) {
    lum += 0.45 * (0.6 + 0.4 * Math.sin(timeSec * 2 + nx * 10))
  }

  // 2. THE SEER FIGURE (Hooded Mystic behind the Crystal Ball)
  // Head & Cowl center at (0, -0.34)
  const headCy = -0.34
  // Outer hood profile: pointed peak at ny = -0.92, widening around shoulders
  if (ny >= -0.92 && ny <= 0.95) {
    // Width of the hood & draped cloak as a function of y
    let cloakHalfWidth = 0
    if (ny < -0.15) {
      // Pointed hood curving out from peak (-0.92) to (-0.15)
      const t = (ny - -0.92) / 0.77
      cloakHalfWidth = 0.03 + Math.pow(t, 0.72) * 0.48
    } else {
      // Broadening shoulders and robe sleeves flowing down to table
      const t = (ny - -0.15) / 1.1
      cloakHalfWidth = 0.51 + Math.pow(t, 0.85) * 0.72
    }

    if (ax < cloakHalfWidth) {
      // Inside the Seer's silhouette: base dark cloth with dramatic uplight from the crystal ball!
      const edgeRatio = ax / cloakHalfWidth
      // Rim light along the outer edge of the hood and shoulders
      const outerRim = smoothstep(0.78, 0.98, edgeRatio) * (1 - smoothstep(0.98, 1.0, edgeRatio))
      // Uplight intensity from the crystal ball onto the robe folds
      const uplight = Math.exp(-distOrb * 1.65) * 0.75
      // Draped vertical cloth folds on the cloak and cowl
      const foldWave =
        0.5 +
        0.5 * Math.sin(ax * 26 - ny * 6 + Math.sin(ny * 8) * 0.8)

      let robeLum = 0.06 + outerRim * 0.34 + uplight * (0.28 + 0.42 * foldWave)

      // Inner Cowl Opening (Shadowed Face Recess of the Seer)
      const faceDy = (ny - headCy) / 0.34
      const faceDx = nx / (0.27 * (1 + 0.15 * faceDy))
      const faceDist = Math.sqrt(faceDx * faceDx + faceDy * faceDy)

      // Hood inner rim highlight (cowl edge framing the face)
      if (faceDist >= 0.82 && faceDist <= 1.18) {
        const cowlRim = 1 - Math.abs(faceDist - 1.0) / 0.18
        // Stronger illumination on the lower & side cowl edges facing the orb
        const orbFacing = smoothstep(-0.6, 0.8, faceDy) * 0.65 + 0.35
        robeLum += cowlRim * orbFacing * 0.42
      }

      // Inside the dark hood cavity
      if (faceDist < 0.92) {
        // Deep shadow inside the hood
        robeLum = 0.03

        // Subtle uplight on lower cheeks, nose bridge, and brow from the magic ball below
        // Nose bridge & tip
        if (ax < 0.045 && ny > -0.40 && ny < -0.20) {
          const noseTip = 1 - Math.abs(ny - -0.24) / 0.12
          robeLum += Math.max(0, noseTip) * (1 - ax / 0.045) * 0.38
        }
        // Cheekbones catching orb light
        const cheekDx = Math.abs(ax - 0.11)
        const cheekDy = Math.abs(ny - -0.23)
        if (cheekDx < 0.07 && cheekDy < 0.07) {
          robeLum += (1 - cheekDx / 0.07) * (1 - cheekDy / 0.07) * 0.28
        }

        // THE SEER'S GLOWING ARCANE EYES under the hood brow
        const eyeX = 0.088
        const eyeY = -0.37
        const edX = (ax - eyeX) / 0.046
        const edY = (ny - eyeY) / 0.022
        const eyeDist = Math.sqrt(edX * edX + edY * edY)
        if (eyeDist < 1.35) {
          const eyeGlow = Math.max(0, 1 - eyeDist)
          robeLum = Math.max(robeLum, 0.55 + eyeGlow * 0.55)
        }
      }

      lum = robeLum
    }
  }

  // 3. SEER'S CUPPED HANDS POISED AROUND THE MAGIC BALL
  // Left & Right hands hovering beside the orb at ax ~ 0.48..0.64, ny ~ 0.14..0.54
  const handCenterX = 0.52
  const handCenterY = 0.33
  const hdx = (ax - handCenterX) / 0.13
  const hdy = (ny - handCenterY) / 0.24
  // Curved crescent shape hugging the sphere
  const handArc = Math.sqrt(hdx * hdx + hdy * hdy)
  if (handArc < 1.0 && distOrb > orbR * 0.96) {
    // Articulated fingers (4 horizontal finger ridges)
    const fingerRidge = 0.55 + 0.45 * Math.cos((ny - 0.16) * 42)
    // Inner palm/fingers facing the orb are brightly lit; outer back of hand falls into shadow
    const innerLight = smoothstep(0.62, 0.42, ax)
    const handShape = (1 - handArc * 0.65) * fingerRidge
    lum = Math.max(lum, 0.12 + handShape * (0.25 + innerLight * 0.62))
  }

  // 4. ORNATE PEDESTAL / ALTAR BASE UNDER THE CRYSTAL BALL
  if (ny > orbCy + orbR * 0.72 && ny < 0.96) {
    const pedY = (ny - (orbCy + orbR * 0.72)) / 0.32
    const pedHalfW = 0.28 + pedY * 0.22
    if (ax < pedHalfW) {
      const pedRim = Math.cos((nx / pedHalfW) * Math.PI * 0.5)
      const tierGroove = 0.65 + 0.35 * Math.sin(pedY * Math.PI * 4)
      lum = 0.1 + pedRim * tierGroove * 0.48
    }
  }

  // 5. THE MAGIC CRYSTAL BALL (Foreground Glowing Sphere)
  if (distOrb <= orbR) {
    const rNorm = distOrb / orbR // 0 at center, 1 at edge
    const nz = Math.sqrt(Math.max(0, 1 - rNorm * rNorm))
    const snx = dxOrb / orbR
    const sny = dyOrb / orbR

    // Fresnel glass rim glow around the sphere boundary
    const fresnel = Math.pow(1 - nz, 2.1)

    // Swirling internal mystical nebula / vision vortex inside the crystal ball
    const swirlAngle = Math.atan2(sny, snx) + rNorm * 3.2 - timeSec * 0.85
    const swirl1 = Math.sin(swirlAngle * 3 + rNorm * 7) * 0.5 + 0.5
    const swirl2 = Math.cos(swirlAngle * 2 - rNorm * 9 + timeSec * 0.6) * 0.5 + 0.5
    const innerCore = Math.exp(-rNorm * rNorm * 3.2)

    // Primary upper-left specular highlight on the glass sphere
    const specDx = snx - -0.38
    const specDy = sny - -0.38
    const specDist = Math.sqrt(specDx * specDx + specDy * specDy)
    const primarySpecular = Math.exp(-specDist * specDist * 18)

    // Secondary lower-right caustic bounce inside the crystal
    const bounceDx = snx - 0.32
    const bounceDy = sny - 0.42
    const bounceDist = Math.sqrt(bounceDx * bounceDx + bounceDy * bounceDy)
    const causticBounce = Math.exp(-bounceDist * bounceDist * 10) * 0.45

    const orbLum =
      0.20 +
      innerCore * 0.52 +
      (swirl1 * 0.26 + swirl2 * 0.22) * nz +
      fresnel * 0.62 +
      primarySpecular * 0.85 +
      causticBounce

    lum = Math.min(1.0, orbLum)
  } else if (distOrb < orbR * 1.18) {
    // Immediate outer corona around the magic ball
    const corona = 1 - (distOrb - orbR) / (orbR * 0.18)
    lum = Math.max(lum, corona * corona * 0.48)
  }

  // Vignette fade at far left/right edges of the wide banner
  const edgeVignette = 1 - smoothstep(1.35, 2.35, ax) * 0.55
  return Math.max(0, Math.min(1, lum * edgeVignette))
}

/**
 * Stationary Banner the size of the former carousel space featuring an authentic
 * 8x8 Bayer ordered dither rendering of a Seer in front of a Magic Crystal Ball.
 */
export const SeerBayerDitherBanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let startTime = performance.now()

    // Dither pixel cell size in CSS pixels (3px gives crisp, unmistakable Bayer crosshatch matrix)
    const CELL_SIZE = 3

    const renderFrame = (now: number) => {
      const rect = canvas.getBoundingClientRect()
      const cssW = Math.max(320, Math.floor(rect.width))
      const cssH = Math.max(200, Math.floor(rect.height))

      // Internal low-res grid dimensions where each pixel = 1 Bayer matrix cell
      const cols = Math.floor(cssW / CELL_SIZE)
      const rows = Math.floor(cssH / CELL_SIZE)

      if (canvas.width !== cols || canvas.height !== rows) {
        canvas.width = cols
        canvas.height = rows
      }

      const imgData = ctx.createImageData(cols, rows)
      const data = imgData.data
      const timeSec = (now - startTime) * 0.001
      const aspect = cols / rows
      const maxLevel = DITHER_PALETTE.length - 1

      const fx = mouseRef.current.x
      const fy = mouseRef.current.y

      let ptr = 0
      for (let y = 0; y < rows; y++) {
        const ny = (y / rows) * 2 - 1 // [-1..1]
        const bayerRow = BAYER_8X8[y & 7]

        for (let x = 0; x < cols; x++) {
          const nx = ((x / cols) * 2 - 1) * aspect
          const lum = sampleSeerAndMagicBallScene(nx, ny, timeSec, fx, fy)

          // Ordered 8x8 Bayer threshold in [-0.5 .. +0.5]
          const bayerThreshold = (bayerRow[x & 7] + 0.5) / 64 - 0.5

          // Quantize luminance with Bayer threshold across the Seer palette
          const scaled = lum * maxLevel + bayerThreshold * 0.92
          const level = Math.max(0, Math.min(maxLevel, Math.round(scaled)))
          const [r, g, b] = DITHER_PALETTE[level]

          data[ptr++] = r
          data[ptr++] = g
          data[ptr++] = b
          data[ptr++] = 255
        }
      }

      ctx.putImageData(imgData, 0, 0)
      animId = window.requestAnimationFrame(renderFrame)
    }

    animId = window.requestAnimationFrame(renderFrame)
    return () => window.cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
        mouseRef.current = { x, y }
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: 0, y: 0 }
      }}
      className="relative w-full h-[252px] rounded-[20px] overflow-hidden border border-white/[0.07] bg-[#101013] shadow-[0_18px_44px_rgba(0,0,0,0.75)] select-none"
    >
      {/* Crisp Pixelated 8x8 Bayer Ordered Dither Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}

/**
 * Stationary Hero Container with Toolbar & Bayer Dither Seer Banner (replacing scrolling carousel)
 */
export const BloombergMarketHero: React.FC<{
  markets: MarketItem[]
  onSelectMarket: (market: MarketItem) => void
  children?: React.ReactNode
}> = ({ children }) => {
  return (
    <section className="mb-6 select-none space-y-5">
      {/* Stationary Bayer-Dither Seer & Magic Ball Banner (size of former carousel space) */}
      <SeerBayerDitherBanner />

      {/* Search, Category Pills, Filter & Create Market Toolbar */}
      {children && <div className="pt-1">{children}</div>}
    </section>
  )
}

/**
 * Clean Dark Prediction Market Card:
 * - Top: Varied rounded-square dither icon on left + bold question title on right
 * - Middle: Fixed-size outcome buttons with percentage highlight fill background (like Image #2)
 * - Bottom: Volume · Date · Liquidity on left, Gift & Bookmark icons on right
 */
export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  index = 0,
  onSelectMarket,
  onToggleStar,
}) => {
  // Order outcomes so binary Yes/No always displays Yes on top and No on bottom
  const orderedOutcomes = React.useMemo(() => {
    const list = [...market.outcomes]
    const hasYesNo =
      list.length === 2 &&
      list.some((o) => o.label.trim().toLowerCase() === 'yes') &&
      list.some((o) => o.label.trim().toLowerCase() === 'no')

    if (hasYesNo) {
      return list.sort((a, b) =>
        a.label.trim().toLowerCase() === 'yes'
          ? -1
          : b.label.trim().toLowerCase() === 'yes'
          ? 1
          : 0
      )
    }
    return list.slice(0, 2)
  }, [market.outcomes])

  const primaryOutcome = orderedOutcomes[0]
  const secondaryOutcome = orderedOutcomes[1]

  const formatOutcomeUnit = (outcome: MarketOutcome, isPrimary: boolean) => {
    if (market.type === 'scalar' && isPrimary && market.scalarValue !== undefined) {
      const unit = market.scalarUnit ?? '/10'
      const formattedScalar = unit.startsWith('/')
        ? `${market.scalarValue.toFixed(2)}${unit}`
        : `${market.scalarValue.toFixed(2)} ${unit}`
      return `${formattedScalar} · ${outcome.label}`
    }
    if (market.baseShareCents) {
      const condCents = ((outcome.probability / 100) * market.baseShareCents).toFixed(1)
      return `${outcome.label} ${Math.round(outcome.probability)}% · ${condCents}¢ of ${market.baseShareCents}¢`
    }
    return `${outcome.label} ${Math.round(outcome.probability)}¢`
  }

  return (
    <div
      onClick={() => onSelectMarket(market)}
      className="group relative rounded-[18px] bg-[#1A1A1E] border border-white/[0.06] hover:border-[#7D33FF]/45 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 cursor-pointer select-none shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
    >
      {/* Top Section: Left Varied Dithered Icon Square + Question Title */}
      <div>
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#23232A] border border-white/[0.05] flex items-center justify-center shrink-0">
            <MarketCardDitherIcon market={market} index={index} />
          </div>

          <h3 className="text-[15.5px] font-semibold leading-[1.35] text-[#ECECF3] group-hover:text-white line-clamp-2 pt-0.5">
            {market.question}
          </h3>
        </div>

        {/* Middle Section: Fixed-Size Stacked Outcome Buttons with Percentage Fill Highlight Background */}
        <div className="flex flex-col gap-2.5 my-4">
          {primaryOutcome && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelectMarket(market, primaryOutcome)
              }}
              className="relative w-full h-[46px] rounded-[11px] bg-[#1F1F24] hover:bg-[#25252C] overflow-hidden px-4 flex items-center justify-center transition-colors"
            >
              {/* Percentage-Indicative Highlight Fill Bar */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 rounded-[10px] bg-[#2F2743] group-hover:bg-[#3A2F54] transition-all duration-300"
                style={{
                  width: `${Math.max(6, Math.min(100, primaryOutcome.probability))}%`,
                }}
              />
              <span className="relative z-10 text-[#ECECF3] text-[14px] font-semibold truncate">
                {formatOutcomeUnit(primaryOutcome, true)}
              </span>
            </button>
          )}

          {secondaryOutcome && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelectMarket(market, secondaryOutcome)
              }}
              className="relative w-full h-[46px] rounded-[11px] bg-[#1F1F24] hover:bg-[#25252C] overflow-hidden px-4 flex items-center justify-center transition-colors"
            >
              {/* Percentage-Indicative Highlight Fill Bar */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 rounded-[10px] bg-[#241E33] group-hover:bg-[#2E2642] transition-all duration-300"
                style={{
                  width: `${Math.max(6, Math.min(100, secondaryOutcome.probability))}%`,
                }}
              />
              <span className="relative z-10 text-[#9C6FF2] text-[14px] font-semibold truncate">
                {formatOutcomeUnit(secondaryOutcome, false)}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Metadata Footer: Volume · Date · Liquidity + Right Gift & Bookmark Icons */}
      <div className="pt-1 flex items-center justify-between gap-3">
        <div className="text-[13px] text-[#8A8A94] leading-none truncate">
          <span>{formatVolume(market.volumeUSD)} Vol.</span>
          <span className="mx-1.5">·</span>
          <span>{formatDayMonth(market.endDate)}</span>
          <span className="mx-1.5">·</span>
          <span>{formatLiquidity(market.liquidityUSD)} liq</span>
        </div>

        <div className="flex items-center gap-2.5 text-[#8A8A94] shrink-0">
          <span
            className="inline-flex items-center hover:text-[#BFBFE6] transition-colors"
            title="Market Rewards & Incentives"
          >
            <Gift className="w-4 h-4" />
          </span>

          <button
            type="button"
            onClick={(e) => onToggleStar(market.id, e)}
            className="inline-flex items-center hover:text-[#BFBFE6] transition-colors focus:outline-none"
            title={market.starred ? 'Remove bookmark' : 'Bookmark market'}
          >
            <Bookmark
              className={`w-4 h-4 ${market.starred ? 'text-[#9C6FF2]' : ''}`}
              fill={market.starred ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
