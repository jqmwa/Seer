import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Search,
  Filter,
  Plus,
  HelpCircle,
  ArrowRight,
  Wallet,
  Sun,
  Moon,
} from 'lucide-react'
import DotPattern from './components/DotPattern'
import { MarketCard, BloombergMarketHero } from './components/MarketCard'
import { CreateMarketModal } from './components/MarketModal'
import { MarketDetailPage } from './components/MarketDetailPage'
import {
  HomepageEcosystemSections,
  SeerFooter,
  SpecializedSurfaceView,
  NavSection,
} from './components/EcosystemViews'
import { PredictionMarketNodeGraph } from './components/PredictionMarketNodeGraph'
import { HeroBackgroundVideo } from './components/HeroBackgroundVideo'
import { INITIAL_MARKETS, MarketItem, MarketOutcome } from './data/markets'
import { applyTheme } from './theme/applyTheme'
import { getTheme } from './theme/themeRegistry'

const NAV_ITEMS: Array<{ id: NavSection; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'app', label: 'App' },
  { id: 'deep', label: 'Deep' },
  { id: 'futarchy', label: 'Futarchy' },
  { id: 'markets', label: 'Markets' },
  { id: 'risk', label: 'Reactors' },
]

const SEER_APPS_MENU: Array<{
  id: NavSection
  title: string
  domain: string
  renderIcon: (active: boolean) => React.ReactNode
}> = [
  {
    id: 'home',
    title: 'Seer',
    domain: 'seer.pm',
    renderIcon: (active) => (
      <svg
        viewBox="0 0 20 20"
        className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#9C6FF2]'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5.5L16 10L4 14.5L7.2 10L4 5.5Z" />
        <path d="M7.2 10H15.5" />
      </svg>
    ),
  },
  {
    id: 'app',
    title: 'Seer App',
    domain: 'app.seer.pm',
    renderIcon: (active) => (
      <svg
        viewBox="0 0 20 20"
        className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#9C6FF2]'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="4.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="4.5" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="4.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
        <path d="M8.5 7.5H16M8.5 12.5H16M10.8 4.5V15.5M14.2 4.5V15.5" />
      </svg>
    ),
  },
  {
    id: 'deep',
    title: 'Deep',
    domain: 'deep.seer.pm',
    renderIcon: (active) => (
      <svg
        viewBox="0 0 20 20"
        className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#9C6FF2]'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 13.5C5.5 13.5 6.8 6 10 6C13.2 6 14.5 13.5 17 13.5" />
        <path
          d="M5 14.5C7 14.5 8 9.8 10 9.8C12 9.8 13 14.5 15 14.5"
          strokeOpacity="0.65"
        />
      </svg>
    ),
  },
  {
    id: 'futarchy',
    title: 'Futarchy',
    domain: 'futarchy.seer.pm',
    renderIcon: (active) => (
      <svg
        viewBox="0 0 20 20"
        className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#9C6FF2]'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="5.5" cy="10" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="5.5" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="14.5" r="1.6" fill="currentColor" stroke="none" />
        <path d="M6.8 9.3L13.2 6.2M6.8 10.7L13.2 13.8" />
      </svg>
    ),
  },
  {
    id: 'markets',
    title: 'Opportunity Markets',
    domain: 'opportunity.seer.pm',
    renderIcon: (active) => (
      <svg
        viewBox="0 0 20 20"
        className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#9C6FF2]'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4.5 6H15.5" />
        <path d="M4.5 10H12.5" />
        <path d="M4.5 14H9" />
      </svg>
    ),
  },
  {
    id: 'risk',
    title: 'Risk Pricing',
    domain: 'risk.seer.pm',
    renderIcon: (active) => (
      <svg
        viewBox="0 0 20 20"
        className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#9C6FF2]'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="12" height="12" rx="3" />
        <path d="M5.5 14.5L14.5 5.5M5 10L10 5M10 15L15 10" />
      </svg>
    ),
  },
]

export function App() {
  const [section, setSection] = useState<NavSection>('home')
  const [themeId, setThemeId] = useState<string>('seer-osiris')

  // App state
  const [markets, setMarkets] = useState<MarketItem[]>(INITIAL_MARKETS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [onlyStarred, setOnlyStarred] = useState(false)
  const [sortBy, setSortBy] = useState<'liquidity' | 'volume'>('liquidity')

  // Wallet & Active Dedicated Market Page
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletBalance, setWalletBalance] = useState(4250)
  const [activeTrade, setActiveTrade] = useState<{
    market: MarketItem
    outcome?: MarketOutcome
  } | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [appsMenuOpen, setAppsMenuOpen] = useState(false)
  const appsMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const theme = getTheme(themeId)
    applyTheme(theme, themeId)
  }, [themeId])

  useEffect(() => {
    if (!appsMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (appsMenuRef.current && !appsMenuRef.current.contains(e.target as Node)) {
        setAppsMenuOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAppsMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [appsMenuOpen])

  const handleNavigate = (next: NavSection) => {
    setSection(next)
    setActiveTrade(null)
    setAppsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredMarkets = useMemo(() => {
    return markets
      .filter((m) => {
        if (onlyStarred && !m.starred) return false
        if (selectedCategory !== 'All' && m.category !== selectedCategory) return false
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        const inTitle = m.question.toLowerCase().includes(q)
        const inCategory = m.category.toLowerCase().includes(q)
        const inOutcomes = m.outcomes.some((o) => o.label.toLowerCase().includes(q))
        return inTitle || inCategory || inOutcomes
      })
      .sort((a, b) =>
        sortBy === 'liquidity'
          ? b.liquidityUSD - a.liquidityUSD
          : b.volumeUSD - a.volumeUSD
      )
  }, [markets, searchQuery, selectedCategory, onlyStarred, sortBy])

  const handleToggleStar = (marketId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMarkets((prev) =>
      prev.map((m) => (m.id === marketId ? { ...m, starred: !m.starred } : m))
    )
  }

  const handleExecuteTrade = (
    marketId: string,
    outcomeId: string,
    amountSDAI: number,
    mode: 'buy' | 'sell' | 'mint'
  ) => {
    if (mode === 'buy') {
      setWalletBalance((b) => Math.max(0, b - amountSDAI))
    } else if (mode === 'sell') {
      setWalletBalance((b) => b + amountSDAI * 0.98)
    } else {
      setWalletBalance((b) => Math.max(0, b - amountSDAI))
    }

    setMarkets((prev) =>
      prev.map((m) => {
        if (m.id !== marketId) return m
        const deltaProb =
          mode === 'mint'
            ? 0
            : Math.min(8, Math.max(0.4, (amountSDAI / Math.max(500, m.liquidityUSD)) * 18)) *
              (mode === 'buy' ? 1 : -1)

        const updatedOutcomes = m.outcomes.map((o) => {
          if (o.id === outcomeId) {
            const nextP = Math.min(99, Math.max(1, Number((o.probability + deltaProb).toFixed(1))))
            return { ...o, probability: nextP, price: Number((nextP / 100).toFixed(2)) }
          }
          const otherCount = Math.max(1, m.outcomes.length - 1)
          const nextP = Math.min(
            99,
            Math.max(1, Number((o.probability - deltaProb / otherCount).toFixed(1)))
          )
          return { ...o, probability: nextP, price: Number((nextP / 100).toFixed(2)) }
        })

        const updatedMarket: MarketItem = {
          ...m,
          outcomes: updatedOutcomes,
          liquidityUSD: m.liquidityUSD + (mode === 'sell' ? -amountSDAI * 0.25 : amountSDAI * 0.5),
          volumeUSD: m.volumeUSD + amountSDAI,
        }

        if (activeTrade?.market.id === marketId) {
          setActiveTrade({
            market: updatedMarket,
            outcome: updatedOutcomes.find((o) => o.id === outcomeId),
          })
        }
        return updatedMarket
      })
    )
  }

  const isLight = themeId === 'seer-light'

  const renderNavbar = () => (
    <header
      style={{ background: 'var(--theme-header-bg)' }}
      className="sticky top-0 z-30 w-full backdrop-blur-md border-b border-[var(--theme-card-border)] shadow-sm"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Seer Logotype */}
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="flex items-center group text-left focus:outline-none text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors"
          title="Return to Seer Homepage"
        >
          <svg
            className="s-lockup__logo h-7 w-auto"
            viewBox="239 427 521 146"
            fill="currentColor"
            role="img"
            aria-label="Seer"
          >
            <path d="M546.3,451.4c-27.5,0-45.4,21.9-45.4,48.4s18.2,48.6,45.9,48.6,38.9-12.9,43.7-33.2h-20.6c-3.8,9.8-11.8,15.7-22.4,15.7s-25.7-10.5-25.7-24.5h68.7v-6.7c0-25.5-16.6-48.3-44.1-48.3ZM521.8,491.2c0-13,12.7-22.4,24.5-22.4s23.3,9.6,23.3,22.4h-47.8Z"></path>
            <path d="M644.9,451.4c-27.5,0-45.4,21.9-45.4,48.4s18.2,48.6,45.9,48.6,38.9-12.9,43.7-33.2h-20.6c-3.8,9.8-11.8,15.7-22.4,15.7s-25.7-10.5-25.7-24.5h68.7v-6.7c0-26.2-16.6-48.3-44.1-48.3ZM620.4,491.2c0-13,12.7-22.4,24.5-22.4s23.3,9.6,23.3,22.4h-47.8Z"></path>
            <path d="M730.4,453.9c-3,0-5.9.4-8.6,1.3-1.2.4-2.4.8-3.6,1.3-6.5,3-11.8,8.2-14.8,14.8-.5,1.2-1,2.3-1.3,3.6-.8,2.7-1.3,5.6-1.3,8.6v65h21v-73.6h38.1v-21h-29.5Z"></path>
            <path d="M457.2,492.6c-7.9-1.3-27.7-1.7-27.7-13.1s13.4-11.6,20.8-11.6,21.5,3.3,21.5,15h20.6c0-23.4-22.2-31.6-42.3-31.6s-41.2,6.6-41.2,28.5,19.9,24.6,35.8,27.3c7.9,1.3,27.7,1.7,27.7,13.1s-13.4,11.6-20.8,11.6-21.5-3.3-21.5-15h-20.6c0,23.4,22.2,31.6,42.3,31.6s41.2-6.6,41.2-28.5-19.9-24.6-35.8-27.3Z"></path>
            <path d="M384.6,471v25.8c0,2-.8,3.9-2.2,5.3l-68.4,68.4c-1.4,1.4-3.3,2.2-5.3,2.2h-25.8c-4.1,0-7.5-3.3-7.5-7.5v-28.9h34.8c1,0,1.9-.4,2.6-1.1l28.9-28.9c2.3-2.4.7-6.4-2.6-6.4h-27.4l36.4-36.4h28.9c4.1,0,7.5,3.3,7.5,7.5Z"></path>
            <path d="M348.2,434.6v28.9h-34.8c-1,0-1.9.4-2.6,1.1l-28.9,28.9c-2.3,2.3-.7,6.4,2.6,6.4h27.4l-36.4,36.4h-28.9c-4.1,0-7.5-3.3-7.5-7.5v-25.8c0-2,.8-3.9,2.2-5.3l68.4-68.4c1.4-1.4,3.3-2.2,5.3-2.2h25.8c4.1,0,7.5,3.3,7.5,7.5Z"></path>
          </svg>
        </button>

        {/* Top-Center Navbar Links: Home, App, Deep, Futarchy, Markets, Reactors */}
        <nav className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-full bg-[var(--theme-nav-pill-bg)] border border-[var(--theme-card-border)]">
          {NAV_ITEMS.map((item) => {
            const active = section === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#7D33FF] text-[#FFFFFF] shadow-[0_0_14px_rgba(125,51,255,0.4)]'
                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Right: Connect Button + Help + Apps Dropdown */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setWalletConnected((c) => !c)}
            className="osiris-btn-primary px-4 py-2 rounded-lg text-xs theme-font-mono font-semibold flex items-center gap-2"
          >
            <Wallet className="w-3.5 h-3.5" />
            {walletConnected ? (
              <span>0x71C...9A23 · {walletBalance.toFixed(0)} sDAI</span>
            ) : (
              <span>Connect</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="p-2 rounded-lg bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] hover:border-[#7D33FF] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors"
            title="Back to Seer Protocol Homepage"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Apps Button & Dropdown */}
          <div className="relative" ref={appsMenuRef}>
            <button
              type="button"
              onClick={() => setAppsMenuOpen((open) => !open)}
              className={`px-3.5 py-2 rounded-lg bg-[var(--theme-panel-bg)] border transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--theme-text-primary)] ${
                appsMenuOpen
                  ? 'border-[#7D33FF]'
                  : 'border-[var(--theme-card-border)] hover:border-[#7D33FF]'
              }`}
              aria-expanded={appsMenuOpen}
              aria-haspopup="menu"
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 text-[#9C6FF2]"
                fill="currentColor"
              >
                <circle cx="3" cy="3" r="1.35" />
                <circle cx="8" cy="3" r="1.35" />
                <circle cx="13" cy="3" r="1.35" />
                <circle cx="3" cy="8" r="1.35" />
                <circle cx="8" cy="8" r="1.35" />
                <circle cx="13" cy="8" r="1.35" />
                <circle cx="3" cy="13" r="1.35" />
                <circle cx="8" cy="13" r="1.35" />
                <circle cx="13" cy="13" r="1.35" />
              </svg>
              <span>Apps</span>
            </button>

            {appsMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2.5 w-[340px] rounded-2xl bg-[#16161B] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-3.5 z-50 select-none"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-2 pt-1 pb-2.5">
                  <span className="text-[11px] theme-font-mono uppercase tracking-[0.16em] text-[#8A8A94]">
                    SEER APPS
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleNavigate('home')
                      setTimeout(() => {
                        window.scrollTo({
                          top: window.innerHeight - 40,
                          behavior: 'smooth',
                        })
                      }, 60)
                    }}
                    className="text-xs font-medium text-[#9C6FF2] hover:text-[#B48EFF] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>All six, side by side</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Six Seer Apps */}
                <div className="space-y-1">
                  {SEER_APPS_MENU.map((appItem) => {
                    const isHere = section === appItem.id
                    return (
                      <button
                        key={appItem.id}
                        type="button"
                        onClick={() => handleNavigate(appItem.id)}
                        className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                          isHere
                            ? 'bg-[#261B3E] border border-[#7D33FF]/30'
                            : 'hover:bg-white/[0.04] border border-transparent'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isHere
                              ? 'bg-[#7D33FF] text-[#FFFFFF] shadow-[0_0_14px_rgba(125,51,255,0.45)]'
                              : 'bg-[#1F1F26] text-[#9C6FF2]'
                          }`}
                        >
                          {appItem.renderIcon(isHere)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#FFFFFF] truncate">
                              {appItem.title}
                            </span>
                            {isHere && (
                              <span className="text-[10.5px] theme-font-mono uppercase tracking-[0.12em] text-[#9C6FF2] font-medium">
                                YOU ARE HERE
                              </span>
                            )}
                          </div>
                          <div className="text-xs theme-font-mono text-[#8A8A94] truncate mt-0.5">
                            {appItem.domain}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Footer: Theme Toggle + Sample data label */}
                <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 px-1">
                  <button
                    type="button"
                    onClick={() =>
                      setThemeId((prev) =>
                        prev === 'seer-light' ? 'seer-osiris' : 'seer-light'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#1F1F26] hover:bg-[#282832] border border-white/[0.06] text-xs font-medium text-[#FFFFFF] inline-flex items-center gap-2 transition-colors"
                  >
                    {isLight ? (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#9C6FF2]" />
                        <span>Dark theme</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-3.5 h-3.5 text-[#ECECF3]" />
                        <span>Light theme</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11.5px] text-[#8A8A94]">
                    Sample data on every page
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )

  // ============================================================================
  // SEER HOMEPAGE VIEW ('home')
  // ============================================================================
  if (section === 'home') {
    return (
      <div className="relative min-h-screen w-full bg-[#101013] text-[var(--theme-text-primary)] flex flex-col overflow-x-hidden select-none">
        {renderNavbar()}

        {/* First-Viewport Hero + Partner Logo Banner Container (Always Visible Together in Initial View) */}
        <div className="relative z-10 flex flex-col justify-between min-h-[calc(100vh-4rem)] w-full">
          {/* Hero Area with Left & Right Floating Node / Yes-No / Winner Cards */}
          <main className="relative flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-8 w-full text-center overflow-hidden">
            {/* Light-Opacity Cycling Hero Background Video (Politics, Tennis, Space Rocket, Fortune Teller) */}
            <HeroBackgroundVideo isLight={isLight} />

            {/* Floating Left & Right Market Node, Yes/No Outcome, and Winner Cards (No Outer Wrapper Card) */}
            <PredictionMarketNodeGraph onNavigate={handleNavigate} />

            {/* Centered Hero Stack: Logo + Headline + CTAs */}
            <div className="relative z-20 flex flex-col items-center max-w-xl mx-auto">
              {/* Scaled-Down Interactive DotPattern Seer Logo */}
              <div className="w-full max-w-[300px] sm:max-w-[370px] mx-auto mb-5">
                <DotPattern
                  width="100%"
                  dotColor={isLight ? '#1A1A1E' : '#D8D6F2'}
                  highlightColor="#7D33FF"
                  secondaryHighlightColor="#9C6FF2"
                  bgColor="transparent"
                  waveEnabled={false}
                  connectionLinesEnabled={true}
                  gooeyEnabled={false}
                  targetEnabled={true}
                  shape="dot"
                />
              </div>

              {/* Centered Main Heading — One sans; accent phrase is violet, not a serif */}
              <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] max-w-2xl mx-auto leading-[1.14] mb-7">
                <span
                  className={
                    isLight
                      ? 'text-[#101013]'
                      : 'text-[#FFFFFF]'
                  }
                >
                  Prediction Markets For{' '}
                </span>
                <span className="text-[#9C6FF2]">
                  Distilled Human Judgement
                </span>
              </h1>

              {/* Centered Primary + Secondary CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => handleNavigate('app')}
                  className="group px-6 py-3.5 rounded-xl text-sm sm:text-[15px] font-medium text-[#FFFFFF] bg-[#7D33FF] hover:bg-[#8B47FF] active:bg-[#7228F5] inline-flex items-center gap-2.5 transition-colors duration-200"
                >
                  <span>Explore Markets</span>
                  <ArrowRight className="w-4 h-4 text-[#FFFFFF] group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({
                      top: window.innerHeight - 40,
                      behavior: 'smooth',
                    })
                  }
                  className="px-6 py-3.5 rounded-xl text-sm sm:text-[15px] font-medium text-[#D5D3F2] hover:text-[#E9E9F5] bg-[#1A1A1E] hover:bg-[#2E2B47] transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          </main>

          {/* Bottom-of-Viewport Social-Proof Partner & Friend Brands Section (Always Visible in Hero View) */}
          <section className="relative z-20 w-full bg-[#7D33FF] py-7 sm:py-9 px-6 sm:px-10 shrink-0">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              <p className="text-[11.5px] sm:text-xs theme-font-mono uppercase tracking-[0.18em] text-[#E9E9F5] mb-5">
                Trusted &amp; Powered By Ecosystem Partners &amp; Friend Brands
              </p>

              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center text-[#E9E9F5]">
              {/* Gnosis */}
              <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current text-[#E9E9F5]">
                  <path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm0 4.2c4.2 0 7.73 2.95 8.6 6.9h-5.85a3.2 3.2 0 0 0-5.5 0H7.4C8.27 10.15 11.8 7.2 16 7.2zm0 17.6c-4.2 0-7.73-2.95-8.6-6.9h5.85a3.2 3.2 0 0 0 5.5 0h5.85c-.87 3.95-4.4 6.9-8.6 6.9z" />
                </svg>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-[#E9E9F5]">
                  Gnosis
                </span>
              </div>

              {/* Kleros */}
              <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-none stroke-[#E9E9F5]" strokeWidth="2.2">
                  <polygon points="16,3 28,11 24,26 8,26 4,11" />
                  <polygon points="16,9 23,14 20,22 12,22 9,14" />
                </svg>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-[#E9E9F5]">
                  Kleros
                </span>
              </div>

              {/* Reality.eth */}
              <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-none stroke-[#E9E9F5]" strokeWidth="2.2">
                  <rect x="5" y="5" width="22" height="22" rx="5" />
                  <circle cx="16" cy="16" r="4.5" fill="#E9E9F5" />
                </svg>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-[#E9E9F5]">
                  Reality.eth
                </span>
              </div>

              {/* Spark / sDAI */}
              <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current text-[#E9E9F5]">
                  <path d="M16 2L19.4 12.6L30 16L19.4 19.4L16 30L12.6 19.4L2 16L12.6 12.6L16 2Z" />
                </svg>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-[#E9E9F5]">
                  Spark sDAI
                </span>
              </div>

              {/* CoW Protocol */}
              <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-none stroke-[#E9E9F5]" strokeWidth="2.2">
                  <path d="M6 12L10 6H22L26 12V22C26 24.2 24.2 26 22 26H10C7.8 26 6 24.2 6 22V12Z" />
                  <circle cx="12.5" cy="16" r="1.8" fill="#E9E9F5" />
                  <circle cx="19.5" cy="16" r="1.8" fill="#E9E9F5" />
                </svg>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-[#E9E9F5]">
                  CoW Swap
                </span>
              </div>

              {/* Safe */}
              <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-none stroke-[#E9E9F5]" strokeWidth="2.4">
                  <rect x="5" y="5" width="22" height="22" rx="6" />
                  <path d="M12 16H20M16 12V20" strokeLinecap="round" />
                </svg>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-[#E9E9F5]">
                  Safe
                </span>
              </div>
            </div>
          </div>
          </section>
        </div>

        {/* Ecosystem Sections Under the Hero */}
        <HomepageEcosystemSections
          onNavigate={handleNavigate}
          onCreateMarket={() => {
            handleNavigate('app')
            setCreateModalOpen(true)
          }}
        />

        {/* Seer Protocol Footer */}
        <SeerFooter onNavigate={handleNavigate} />
      </div>
    )
  }

  // ============================================================================
  // APPLICATION & SPECIALIZED SURFACE VIEWS ('app', 'deep', 'futarchy', 'markets', 'risk')
  // ============================================================================
  const categories = ['All', 'Politics', 'Crypto', 'Geopolitics', 'Regulation']

  return (
    <div className="min-h-screen w-full bg-[#101013] text-[var(--theme-text-primary)] flex flex-col">
      {renderNavbar()}

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-7">
        {section !== 'app' ? (
          <SpecializedSurfaceView section={section} onNavigate={handleNavigate} />
        ) : activeTrade ? (
          <MarketDetailPage
            market={
              markets.find((m) => m.id === activeTrade.market.id) ||
              activeTrade.market
            }
            allMarkets={markets}
            initialOutcome={activeTrade.outcome}
            walletConnected={walletConnected}
            walletBalance={walletBalance}
            onBack={() => {
              setActiveTrade(null)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSelectMarket={(m, outcome) => {
              setActiveTrade({ market: m, outcome })
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onToggleStar={handleToggleStar}
            onExecuteTrade={handleExecuteTrade}
            onConnectWallet={() => setWalletConnected(true)}
          />
        ) : (
          <>
            {/* Top Toolbar Row underneath Navbar + Scrolling Active Markets Hero */}
            <BloombergMarketHero
              markets={markets}
              onSelectMarket={(m) => {
                setActiveTrade({ market: m })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-[var(--theme-text-accent)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by market, outcome or collection"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] text-sm text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] outline-none shadow-sm transition-colors"
                  />
                </div>

                {/* Category Pills Tucked Between Search and Filter */}
                <div className="flex flex-wrap items-center gap-1.5 px-1.5 py-1 rounded-xl bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] shadow-sm">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`h-8 px-3 rounded-lg text-xs theme-font-mono font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#7D33FF] text-[#FFFFFF] shadow-[0_0_12px_rgba(125,51,255,0.35)]'
                          : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Filter Button (No Dropdown) */}
                <button
                  type="button"
                  onClick={() => {
                    if (!onlyStarred && sortBy === 'liquidity') {
                      setSortBy('volume')
                    } else if (!onlyStarred && sortBy === 'volume') {
                      setOnlyStarred(true)
                      setSortBy('liquidity')
                    } else {
                      setOnlyStarred(false)
                      setSortBy('liquidity')
                    }
                  }}
                  className={`h-11 px-4 rounded-xl border text-sm flex items-center justify-center gap-2 shadow-sm transition-colors shrink-0 ${
                    onlyStarred || sortBy === 'volume'
                      ? 'bg-[#7D33FF]/15 border-[#7D33FF] text-[var(--theme-text-primary)]'
                      : 'bg-[var(--theme-input-bg)] border-[var(--theme-input-border)] hover:border-[#7D33FF] text-[var(--theme-text-secondary)]'
                  }`}
                  title="Cycle filter: Liquidity → Volume → Watchlist"
                >
                  <Filter className="w-4 h-4 text-[var(--theme-text-accent)]" />
                  <span>
                    {onlyStarred
                      ? 'Filter: ★ Watchlist'
                      : sortBy === 'volume'
                      ? 'Filter: Volume'
                      : 'Filter'}
                  </span>
                </button>

                {/* + Create New Market CTA */}
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(true)}
                  className="h-11 px-5 rounded-xl osiris-btn-primary text-sm font-medium flex items-center justify-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Market</span>
                </button>
              </div>
            </BloombergMarketHero>

            {/* Responsive Grid of Prediction Market Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMarkets.map((market, idx) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  index={idx}
                  onSelectMarket={(m, outcome) => {
                    setActiveTrade({ market: m, outcome })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  onToggleStar={handleToggleStar}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Create Market Modal */}
      {createModalOpen && (
        <CreateMarketModal
          onClose={() => setCreateModalOpen(false)}
          onCreate={(newMarket) => setMarkets((prev) => [newMarket, ...prev])}
        />
      )}
    </div>
  )
}

export default App
