import React, { useState, useEffect, useMemo } from 'react'
import {
  Search,
  Filter,
  Plus,
  HelpCircle,
  ArrowRight,
  Wallet,
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

  useEffect(() => {
    const theme = getTheme(themeId)
    applyTheme(theme, themeId)
  }, [themeId])

  const handleNavigate = (next: NavSection) => {
    setSection(next)
    setActiveTrade(null)
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

  // ============================================================================
  // SEER HOMEPAGE VIEW ('home')
  // ============================================================================
  if (section === 'home') {
    return (
      <div className="relative min-h-screen w-full bg-[var(--theme-app-bg)] text-[var(--theme-text-primary)] flex flex-col overflow-x-hidden seer-grid-backdrop select-none">
        {/* Top Navbar: Left Logo in Backdrop + Center Links */}
        <header
          style={{ background: 'var(--theme-header-bg)' }}
          className="sticky top-0 z-30 w-full backdrop-blur-md border-b border-[var(--theme-card-border)]"
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
            {/* Top-Left Seer Logo inside Backdrop */}
            <button
              type="button"
              onClick={() => handleNavigate('home')}
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
              <span className="text-lg font-medium tracking-tight text-[var(--theme-text-primary)]">
                seer
              </span>
            </button>

            {/* Top-Center Navbar Links */}
            <nav className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 rounded-full bg-[var(--theme-nav-pill-bg)] border border-[var(--theme-card-border)] shadow-inner">
              {NAV_ITEMS.map((item) => {
                const active = section === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      active
                        ? 'bg-[#7D33FF] text-[#FFFFFF] shadow-[0_0_16px_rgba(125,51,255,0.45)]'
                        : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            {/* Right Spacer to keep Navbar Links centered */}
            <div className="flex w-[88px] justify-end" />
          </div>
        </header>

        {/* First-Viewport Hero + Partner Logo Banner Container (Always Visible Together in Initial View) */}
        <div className="relative z-10 flex flex-col justify-between min-h-[calc(100vh-5rem)] w-full">
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
                  dotColor={isLight ? '#242238' : '#D8D6F2'}
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

              {/* Centered Main Heading */}
              <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] max-w-2xl mx-auto leading-[1.14] mb-7">
                <span
                  className={
                    isLight
                      ? 'text-[#141223]'
                      : 'text-transparent bg-clip-text bg-gradient-to-b from-[#F4F3FF] to-[#D5D3F2]'
                  }
                >
                  Prediction Markets For{' '}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5D3F2] via-[#B8A5FF] to-[#9358FF]">
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
                  <span>Start Predicting</span>
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
                  className="px-6 py-3.5 rounded-xl text-sm sm:text-[15px] font-medium text-[#D5D3F2] hover:text-[#E9E9F5] bg-[#242238] hover:bg-[#2E2B47] transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          </main>

          {/* Bottom-of-Viewport Social-Proof Partner & Friend Brands Section (Always Visible in Hero View) */}
          <section className="relative z-20 w-full bg-[#7D33FF] py-7 sm:py-9 px-6 sm:px-10 shrink-0">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              <p className="text-[11px] sm:text-xs theme-font-mono uppercase tracking-[0.18em] text-[#E9E9F5]/85 mb-5">
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
        <HomepageEcosystemSections onNavigate={handleNavigate} />

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
    <div className="min-h-screen w-full bg-[var(--theme-app-bg)] text-[var(--theme-text-primary)] flex flex-col seer-grid-backdrop">
      {/* Main Seer Header with Top-Center Navbar Links */}
      <header
        style={{ background: 'var(--theme-header-bg)' }}
        className="sticky top-0 z-30 w-full backdrop-blur-md border-b border-[var(--theme-card-border)] shadow-sm"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Seer Logo inside top-left backdrop */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
            title="Return to Seer Homepage"
          >
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src="/branding/seer-backdrop.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src="/branding/seer-logo.png"
                alt="SEER"
                className="relative z-10 w-5 h-5 object-contain"
              />
            </div>
            <span className="text-xl font-semibold tracking-[0.12em] uppercase italic text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors">
              SEER
            </span>
          </button>

          {/* Top-Center Navbar Links: Home, App, Deep, Futarchy, Markets, Risk */}
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

          {/* Right: Connect Button + Help */}
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
          </div>
        </div>
      </header>

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
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] text-sm text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)]/70 outline-none shadow-sm transition-colors"
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

            {/* Full-Width 50px Height Seer Ravens & Logo Pattern Divider */}
            <div
              role="separator"
              aria-label="Seer Ravens and Logo Pattern Divider"
              className="relative w-full h-[50px] my-5 rounded-xl overflow-hidden border border-[var(--theme-card-border)] shadow-sm select-none"
              style={{
                backgroundColor: '#141223',
                backgroundImage: 'url(/branding/seer-raven-divider.png)',
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'auto 50px',
                backgroundPosition: 'center',
              }}
            >
              {/* Subtle Purple Top & Bottom Accent Hairlines */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#7D33FF]/70 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#8F55F7]/70 to-transparent" />
            </div>

            {/* Responsive Grid of Fluid Prediction Market Cards */}
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
