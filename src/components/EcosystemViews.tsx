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
} from 'lucide-react'

export type NavSection = 'home' | 'app' | 'deep' | 'futarchy' | 'markets' | 'risk'

interface EcosystemSectionsProps {
  onNavigate: (section: NavSection) => void
}

const ProcessMotionVector: React.FC<{ id: NavSection; accent: string }> = ({
  id,
  accent,
}) => {
  switch (id) {
    case 'app':
      // 01 · Explorer: Multi-stream universal market scanner vector line
      return (
        <div className="my-4 w-full h-12 flex items-center">
          <svg viewBox="0 0 180 48" className="w-full h-full overflow-visible">
            <path
              d="M 4 36 L 176 36"
              fill="none"
              stroke="currentColor"
              className="text-[#BFBFE6]/15"
              strokeWidth="1"
            />
            <path
              d="M 4 14 Q 36 14, 54 24 T 110 18 T 176 22"
              fill="none"
              stroke={accent}
              strokeOpacity="0.28"
              strokeWidth="1.5"
            />
            <path
              d="M 4 30 C 32 30, 44 10, 74 16 C 104 22, 118 34, 146 14 C 158 6, 168 12, 176 10"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="18 10"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="56"
                to="0"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )

    case 'deep':
      // 02 · High-Cardinality: Root vector branching into multiple outcome paths
      return (
        <div className="my-4 w-full h-12 flex items-center">
          <svg viewBox="0 0 180 48" className="w-full h-full overflow-visible">
            <path
              d="M 6 24 L 46 24 C 72 24, 86 8, 174 8"
              fill="none"
              stroke={accent}
              strokeOpacity="0.3"
              strokeWidth="1.4"
            />
            <path
              d="M 6 24 L 46 24 C 72 24, 86 40, 174 40"
              fill="none"
              stroke={accent}
              strokeOpacity="0.3"
              strokeWidth="1.4"
            />
            <path
              d="M 6 24 L 46 24 C 76 24, 92 18, 174 18"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="16 8"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="48"
                to="0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M 6 24 L 46 24 C 76 24, 92 31, 174 31"
              fill="none"
              stroke={accent}
              strokeOpacity="0.65"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="12 10"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="44"
                to="0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )

    case 'futarchy':
      // 03 · Governance: Conditional Pass vs. Fail diverging trajectory curves
      return (
        <div className="my-4 w-full h-12 flex items-center">
          <svg viewBox="0 0 180 48" className="w-full h-full overflow-visible">
            {/* Baseline Fail Trajectory */}
            <path
              d="M 6 28 L 54 28 Q 98 28, 132 35 T 174 38"
              fill="none"
              stroke="currentColor"
              className="text-[#BFBFE6]/30"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Conditional Pass Trajectory */}
            <path
              d="M 6 28 L 54 28 Q 92 28, 120 14 T 174 8"
              fill="none"
              stroke={accent}
              strokeOpacity="0.28"
              strokeWidth="2"
            />
            <path
              d="M 6 28 L 54 28 Q 92 28, 120 14 T 174 8"
              fill="none"
              stroke={accent}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="20 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="64"
                to="0"
                dur="2.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )

    case 'markets':
      // 04 · Curation: Multiple submission streams converging into a selected signal
      return (
        <div className="my-4 w-full h-12 flex items-center">
          <svg viewBox="0 0 180 48" className="w-full h-full overflow-visible">
            <path
              d="M 6 10 C 48 10, 72 24, 108 24 L 174 24"
              fill="none"
              stroke={accent}
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            <path
              d="M 6 38 C 48 38, 72 24, 108 24 L 174 24"
              fill="none"
              stroke={accent}
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            <path
              d="M 6 24 L 174 24"
              fill="none"
              stroke={accent}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="18 10"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="56"
                to="0"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )

    case 'risk':
    default:
      // 05 · Exposure: Comparative protocol risk wave vs benchmark corridor
      return (
        <div className="my-4 w-full h-12 flex items-center">
          <svg viewBox="0 0 180 48" className="w-full h-full overflow-visible">
            <path
              d="M 4 16 Q 28 6, 52 18 T 100 14 T 148 20 T 176 12"
              fill="none"
              stroke="currentColor"
              className="text-[#BFBFE6]/25"
              strokeWidth="1.4"
            />
            <path
              d="M 4 34 Q 44 30, 88 34 T 176 32"
              fill="none"
              stroke={accent}
              strokeOpacity="0.28"
              strokeWidth="2"
            />
            <path
              d="M 4 34 Q 44 30, 88 34 T 176 32"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="22 42"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="64"
                to="0"
                dur="2.7s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M 4 34 Q 44 30, 88 34 T 176 32"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="22 42"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="32"
                to="-32"
                dur="2.7s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )
  }
}

export const HomepageEcosystemSections: React.FC<EcosystemSectionsProps> = ({
  onNavigate,
}) => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-28 space-y-24 select-none">
      {/* Section Header: Seer as the Underlying Protocol */}
      <section className="pt-12 border-t border-[var(--theme-panel-divider)]">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] text-[11px] theme-font-mono text-[var(--theme-text-accent)] uppercase tracking-wider shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>The Seer Protocol Layer</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-medium tracking-[-0.02em] text-[var(--theme-text-primary)] leading-tight">
            Our Underlying{' '}
            <span className="text-[var(--theme-text-accent)]">
              Five Step Protocol
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
            A connected suite of applications. Every surface shares the same conditional token
            standard, yield-bearing sDAI collateral, and Kleros + Reality.eth verification layer.
          </p>
        </div>

        {/* Visual Protocol Architecture Diagram (Osiris Style) */}
        <div className="osiris-card p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
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
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="osiris-subcard p-4 text-left group hover:border-[#7D33FF] transition-all flex flex-col justify-between min-h-[190px]"
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

                  {/* Middle Motion Vector Line Visualizing Process */}
                  <ProcessMotionVector id={item.id} accent={item.accent} />

                  <div>
                    <div className="text-base font-medium text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-1 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
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
              Seer App — Seer’s Equivalent of Etherscan
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
            <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span>UNIVERSAL MARKET INDEX · ALL TYPES</span>
            </div>
            {[
              {
                type: 'CATEGORICAL',
                q: 'Israeli Knesset election 2026 most seats',
                stat: 'Yashar 60.9%',
                liq: '$27.74k',
                badgeClass: 'bg-[#7D33FF]/20 text-[#B8A5FF] border border-[#7D33FF]/40',
                statColor: '#B8A5FF',
                liqColor: '#34D399',
              },
              {
                type: 'BINARY',
                q: "National Rally's candidate wins French presidency",
                stat: 'No 67.9%',
                liq: '$7.54k',
                badgeClass: 'bg-[#F43F5E]/15 text-[#FB7185] border border-[#F43F5E]/35',
                statColor: '#FB7185',
                liqColor: '#38BDF8',
              },
              {
                type: 'SCALAR',
                q: 'Polymarket clarification notes >=25% move',
                stat: '21.23 NOTE',
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
                    className={`text-[10px] theme-font-mono px-1.5 py-0.5 rounded font-semibold mr-2.5 shrink-0 ${row.badgeClass}`}
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
            <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[var(--theme-text-accent)]" />
                AI AGENT GRANT FIELD EVALUATION (142 PROPOSALS)
              </span>
              <span className="text-[#34D399] font-semibold">28 AGENTS TRADING</span>
            </div>
            {[
              {
                id: 'PROP-041',
                name: 'ZK-TLS Oracle Bridge for Conditional Tokens',
                score: '91.4 / 100',
                signal: 'HIGH PRIORITY REVIEW',
                badgeClass: 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/35',
                scoreColor: '#34D399',
                signalColor: '#10B981',
              },
              {
                id: 'PROP-108',
                name: 'Autonomous LMSR Market Maker Vaults',
                score: '87.2 / 100',
                signal: 'CLOSER REVIEW',
                badgeClass: 'bg-[#38BDF8]/15 text-[#7DD3FC] border border-[#38BDF8]/35',
                scoreColor: '#60A5FA',
                signalColor: '#38BDF8',
              },
              {
                id: 'PROP-019',
                name: 'Cross-Chain sDAI Settlement Router',
                score: '83.9 / 100',
                signal: 'CLOSER REVIEW',
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
                    className={`inline-block text-[10px] theme-font-mono px-1.5 py-0.5 rounded font-semibold mb-1 ${p.badgeClass}`}
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
                  <div className="text-[10px] font-medium" style={{ color: p.signalColor }}>
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
              Deep — High-Cardinality Markets for AI Agents
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              Handles questions with many possible outcomes, including markets designed for AI
              agents to trade. For example, agents could forecast how human evaluators would
              assess a large field of grant proposals, giving a funding team a signal about
              which proposals deserve closer review.
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
              Futarchy — Decision-Relevant Signals for DAOs
            </h3>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed">
              Uses conditional markets to forecast what a chosen measure of success might look
              like if a proposal passes versus if it does not. That gives a DAO information to
              consider when making its decision, rather than making the decision for it.
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
            <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span>GIP-114: ALLOCATE 5,000 GNO TO SEER LIQUIDITY</span>
              <span className="text-[#34D399] font-semibold">ADVISORY SIGNAL</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Green Color-Coded Pass Condition Card */}
              <div
                style={{ animationDelay: '0ms' }}
                className="seer-stagger-item p-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/22 shadow-[inset_0_1px_0_rgba(52,211,153,0.12)]"
              >
                <div className="text-[10px] theme-font-mono text-[#34D399] font-semibold uppercase">
                  IF PROPOSAL PASSES
                </div>
                <div className="text-xl font-bold theme-font-mono text-[#ECFDF5] mt-1">
                  $48.2M TVL
                </div>
                <div className="text-[11px] theme-font-mono text-[#10B981] font-medium mt-0.5">
                  +19.3% Projected 90d Impact
                </div>
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-[#141223]/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#059669] to-[#34D399] w-[78%]" />
                </div>
              </div>

              {/* Red Color-Coded Fail Condition Card */}
              <div
                style={{ animationDelay: '220ms' }}
                className="seer-stagger-item p-3.5 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/22 shadow-[inset_0_1px_0_rgba(251,113,133,0.12)]"
              >
                <div className="text-[10px] theme-font-mono text-[#FB7185] font-semibold uppercase">
                  IF PROPOSAL FAILS
                </div>
                <div className="text-xl font-bold theme-font-mono text-[#FFE4E6] mt-1">
                  $40.4M TVL
                </div>
                <div className="text-[11px] theme-font-mono text-[#F43F5E] font-medium mt-0.5">
                  -16.2% vs. Pass Trajectory
                </div>
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-[#141223]/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#FB7185] w-[46%]" />
                </div>
              </div>
            </div>
            <div className="text-[11px] theme-font-mono text-[var(--theme-text-muted)] text-center">
              DAO voters retain final authority · Market provides conditional expectation
            </div>
          </div>
        </section>

        {/* 4. OPPORTUNITY MARKETS (Flipped: Visual Card on Left, Step Number & Title on Right, Distinct Bluish Forecasting Color) */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 osiris-well p-4 space-y-2.5 overflow-hidden">
            <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
              <span className="text-[#7DD3FC]">COHORT SUBMISSIONS · FORECASTING SIGNAL</span>
              <span className="text-[#38BDF8] font-semibold">FINAL DECISION: REVIEW COMMITTEE</span>
            </div>
            {[
              {
                title: 'Submission #14: Privacy-Preserving Orderflow Pool',
                prob: 78.4,
                barGrad: 'from-[#0284C7] via-[#38BDF8] to-[#7DD3FC]',
                textCol: '#38BDF8',
              },
              {
                title: 'Submission #09: Conditional Treasury Hedging SDK',
                prob: 64.1,
                barGrad: 'from-[#1D4ED8] via-[#60A5FA] to-[#93C5FD]',
                textCol: '#60A5FA',
              },
              {
                title: 'Submission #27: Automated Reality.eth Evidence Bot',
                prob: 51.8,
                barGrad: 'from-[#0369A1] via-[#0EA5E9] to-[#38BDF8]',
                textCol: '#7DD3FC',
              },
            ].map((sub, i) => (
              <div
                key={i}
                onClick={() => onNavigate('markets')}
                style={{ animationDelay: `${i * 220}ms` }}
                className="osiris-subcard seer-stagger-item p-3 cursor-pointer space-y-1.5 border-[#38BDF8]/16 hover:border-[#38BDF8]/35"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--theme-text-primary)] font-medium truncate">
                    {sub.title}
                  </span>
                  <span
                    className="theme-font-mono font-bold"
                    style={{ color: sub.textCol }}
                  >
                    {sub.prob}%
                  </span>
                </div>
                <div className="w-full h-1.5 osiris-hp-bar overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${sub.barGrad}`}
                    style={{ width: `${sub.prob}%` }}
                  />
                </div>
              </div>
            ))}
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
              Opportunity Markets — Forecasting Selection Likelihood
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

        {/* 5. RISK PRICING */}
        <section className="osiris-card p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="osiris-pill osiris-pill-brand">
                05 · RISK PRICING
              </span>
              <span className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                COMPARATIVE DEFI EXPOSURE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)] tracking-tight">
              Risk Pricing — Compare Risk Across Protocols
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
            <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] pb-2 border-b border-[var(--theme-panel-divider)]">
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
                  <div className="text-[10px] theme-font-mono text-[var(--theme-text-muted)]">
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

      {/* Centered Call-to-Action Banner with Two Crows on Each Side */}
      <section className="relative osiris-card px-6 py-14 sm:px-12 sm:py-20 overflow-hidden">
        {/* Ambient radial purple glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(65% 80% at 50% 50%, rgba(125, 51, 255, 0.22) 0%, rgba(143, 85, 247, 0.06) 55%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Pair of Seer Crows (Facing Center) */}
          <div className="hidden sm:flex items-center justify-center shrink-0 w-48 lg:w-64 opacity-95">
            <svg
              viewBox="0 0 240 160"
              className="w-full h-auto overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="crowWingLeft1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#B8A5FF" />
                  <stop offset="45%" stopColor="#8F55F7" />
                  <stop offset="100%" stopColor="#7D33FF" />
                </linearGradient>
                <linearGradient id="crowWingLeft2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9C6FF2" />
                  <stop offset="100%" stopColor="#6222D9" />
                </linearGradient>
              </defs>

              {/* Constellation Lines & Stars */}
              <path
                d="M14 38 L58 22 L98 40 L132 18"
                stroke="#8F55F7"
                strokeOpacity="0.32"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle cx="14" cy="38" r="2" fill="#B8A5FF" />
              <circle cx="58" cy="22" r="2.5" fill="#E9E9F5" />
              <circle cx="132" cy="18" r="2" fill="#7D33FF" />
              <path d="M58 16 L60 22 L66 24 L60 26 L58 32 L56 26 L50 24 L56 22 Z" fill="#E9E9F5" fillOpacity="0.8" />

              {/* Crow #1 (Upper Companion Crow Gliding Inward) */}
              <g transform="translate(8, 12) scale(0.78)">
                {/* Spread Wing Feathers */}
                <path
                  d="M12 44 L48 12 L42 26 L64 16 L54 32 L74 24 L60 40 L76 38 L58 50 L44 52 Z"
                  fill="url(#crowWingLeft2)"
                />
                {/* Body, Head & Beak Facing Right */}
                <path
                  d="M40 46 C52 38 68 38 80 42 L96 46 L82 52 C74 58 60 62 46 60 L24 72 L34 56 L18 62 L34 48 Z"
                  fill="#19162B"
                  stroke="#9C6FF2"
                  strokeWidth="1.4"
                />
                {/* Glowing Oracle Eye */}
                <circle cx="77" cy="44.5" r="1.8" fill="#E9E9F5" />
              </g>

              {/* Crow #2 (Foreground Primary Seer Crow Soaring Inward) */}
              <g transform="translate(68, 42)">
                {/* Outer Feather Fan */}
                <path
                  d="M6 26 L58 2 L46 20 L74 10 L58 30 L84 22 L66 40 L88 36 L68 50 L84 50 L62 60 L44 58 Z"
                  fill="url(#crowWingLeft1)"
                />
                {/* Inner Feather Detail */}
                <path
                  d="M24 38 L62 24 L52 38 L72 34 L56 48 L70 48 L52 56 Z"
                  fill="#D5D3F2"
                  fillOpacity="0.35"
                />
                {/* Tail Feathers */}
                <path
                  d="M36 78 L8 96 L26 88 L12 104 L32 94 L22 110 L44 92 L50 82 Z"
                  fill="url(#crowWingLeft1)"
                />
                {/* Dark Raven Body & Head Facing Right */}
                <path
                  d="M44 56 C58 48 76 48 92 53 L112 60 L94 64 C88 74 74 82 58 84 L42 82 C36 74 36 62 44 56 Z"
                  fill="#141223"
                  stroke="#9C6FF2"
                  strokeWidth="1.6"
                />
                {/* Talons */}
                <path
                  d="M62 83 L68 95 L76 97 M68 95 L72 101 M74 81 L82 92 L90 94"
                  stroke="#8F55F7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Glowing Eye */}
                <circle cx="90" cy="57" r="2" fill="#E9E9F5" />
              </g>
            </svg>
          </div>

          {/* Center Banner Text & Start Now CTA */}
          <div className="flex-1 text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[var(--theme-text-primary)] leading-[1.2]">
              Are you ready to take your predictions to the next level?
            </h2>

            <div className="pt-1 flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate('app')}
                className="px-8 py-4 rounded-xl text-sm sm:text-base font-medium text-[#FFFFFF] bg-[#7D33FF] hover:bg-[#8B47FF] active:bg-[#7228F5] shadow-[0_0_28px_rgba(125,51,255,0.45)] inline-flex items-center justify-center transition-all duration-200"
              >
                <span>Start Now</span>
              </button>
            </div>
          </div>

          {/* Right Pair of Seer Crows (Mirrored, Facing Center) */}
          <div className="hidden sm:flex items-center justify-center shrink-0 w-48 lg:w-64 opacity-95">
            <svg
              viewBox="0 0 240 160"
              className="w-full h-auto overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="crowWingRight1" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8A5FF" />
                  <stop offset="45%" stopColor="#8F55F7" />
                  <stop offset="100%" stopColor="#7D33FF" />
                </linearGradient>
                <linearGradient id="crowWingRight2" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9C6FF2" />
                  <stop offset="100%" stopColor="#6222D9" />
                </linearGradient>
              </defs>

              {/* Mirrored Group so Both Crows Face Left Toward the Center CTA */}
              <g transform="translate(240, 0) scale(-1, 1)">
                {/* Constellation Lines & Stars */}
                <path
                  d="M14 38 L58 22 L98 40 L132 18"
                  stroke="#8F55F7"
                  strokeOpacity="0.32"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <circle cx="14" cy="38" r="2" fill="#B8A5FF" />
                <circle cx="58" cy="22" r="2.5" fill="#E9E9F5" />
                <circle cx="132" cy="18" r="2" fill="#7D33FF" />
                <path d="M58 16 L60 22 L66 24 L60 26 L58 32 L56 26 L50 24 L56 22 Z" fill="#E9E9F5" fillOpacity="0.8" />

                {/* Crow #1 (Upper Companion Crow) */}
                <g transform="translate(8, 12) scale(0.78)">
                  <path
                    d="M12 44 L48 12 L42 26 L64 16 L54 32 L74 24 L60 40 L76 38 L58 50 L44 52 Z"
                    fill="url(#crowWingRight2)"
                  />
                  <path
                    d="M40 46 C52 38 68 38 80 42 L96 46 L82 52 C74 58 60 62 46 60 L24 72 L34 56 L18 62 L34 48 Z"
                    fill="#19162B"
                    stroke="#9C6FF2"
                    strokeWidth="1.4"
                  />
                  <circle cx="77" cy="44.5" r="1.8" fill="#E9E9F5" />
                </g>

                {/* Crow #2 (Foreground Primary Seer Crow) */}
                <g transform="translate(68, 42)">
                  <path
                    d="M6 26 L58 2 L46 20 L74 10 L58 30 L84 22 L66 40 L88 36 L68 50 L84 50 L62 60 L44 58 Z"
                    fill="url(#crowWingRight1)"
                  />
                  <path
                    d="M24 38 L62 24 L52 38 L72 34 L56 48 L70 48 L52 56 Z"
                    fill="#D5D3F2"
                    fillOpacity="0.35"
                  />
                  <path
                    d="M36 78 L8 96 L26 88 L12 104 L32 94 L22 110 L44 92 L50 82 Z"
                    fill="url(#crowWingRight1)"
                  />
                  <path
                    d="M44 56 C58 48 76 48 92 53 L112 60 L94 64 C88 74 74 82 58 84 L42 82 C36 74 36 62 44 56 Z"
                    fill="#141223"
                    stroke="#9C6FF2"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M62 83 L68 95 L76 97 M68 95 L72 101 M74 81 L82 92 L90 94"
                    stroke="#8F55F7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="90" cy="57" r="2" fill="#E9E9F5" />
                </g>
              </g>
            </svg>
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

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)] text-[11px] theme-font-mono text-[var(--theme-text-secondary)]">
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
        agentConsensus: 91.4,
        humanEvaluatorForecast: 'Top 5% · Strong Recommend',
        volume: '$18.4k',
        agentsActive: 19,
        rationale:
          'AI evaluator agents forecast a 91.4% likelihood that human grant reviewers score this proposal >=4.5/5 on technical feasibility and ecosystem impact.',
      },
      {
        id: 'GRANT-108',
        title: 'Combinatorial LMSR Automated Market Maker for 100+ Outcome Fields',
        applicant: 'poly-math-dao.eth',
        agentConsensus: 87.2,
        humanEvaluatorForecast: 'Top 10% · Closer Review',
        volume: '$14.2k',
        agentsActive: 16,
        rationale:
          'High agent agreement on mathematical novelty; moderate spread on gas optimization timeline.',
      },
      {
        id: 'GRANT-019',
        title: 'Autonomous Agent SDK for Reality.eth Dispute Evidence Aggregation',
        applicant: 'epistemic-swarm.eth',
        agentConsensus: 83.9,
        humanEvaluatorForecast: 'Top 15% · Closer Review',
        volume: '$11.9k',
        agentsActive: 14,
        rationale:
          'Strong alignment with Kleros arbitration workflows; flagged for priority technical diligence.',
      },
      {
        id: 'GRANT-077',
        title: 'Multi-Chain sDAI Yield Router for Conditional Positions',
        applicant: 'gnosis-router.eth',
        agentConsensus: 76.5,
        humanEvaluatorForecast: 'Top 25% · Standard Review',
        volume: '$9.1k',
        agentsActive: 11,
        rationale:
          'Solid engineering team; overlaps partially with existing bridge infrastructure.',
      },
      {
        id: 'GRANT-132',
        title: 'Social Sentiment Scraper Bot without On-Chain Verification',
        applicant: 'alpha-feed.eth',
        agentConsensus: 22.8,
        humanEvaluatorForecast: 'Bottom Quartile · Low Signal',
        volume: '$6.4k',
        agentsActive: 15,
        rationale:
          'Agents forecast human evaluators will deprioritize due to lack of sybil resistance.',
      },
    ]

    return (
      <div className="space-y-6">
        <div className="osiris-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="osiris-pill osiris-pill-brand">
                DEEP · AI AGENT &amp; MULTI-OUTCOME MARKETS
              </span>
              <span className="text-xs theme-font-mono text-[var(--theme-text-accent)] font-semibold">
                142 OUTCOMES IN FIELD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)]">
              Deep — High-Cardinality Grant Proposal Evaluation
            </h1>
            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
              Handles questions with many possible outcomes, including markets designed for AI
              agents to trade. Here, autonomous agents forecast how human evaluators will
              assess a large field of grant proposals—giving the funding team a clear signal
              about which proposals deserve closer review.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('app')}
            className="osiris-btn-primary px-4 py-2.5 rounded-xl text-xs theme-font-mono uppercase shrink-0"
          >
            View in All-Market Explorer
          </button>
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
                      {p.agentConsensus}%
                    </div>
                    <div className="text-[11px] text-[var(--theme-text-accent)] font-medium">
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
                  {proposals[selectedItem]?.agentConsensus} / 100
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
            <div className="p-3 rounded-lg bg-[#7D33FF]/10 border border-[#8F55F7]/40 text-[11px] theme-font-mono text-[var(--theme-text-secondary)]">
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
      <div className="space-y-6">
        <div className="osiris-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="osiris-pill osiris-pill-brand">
                FUTARCHY · CONDITIONAL GOVERNANCE MARKETS
              </span>
              <span className="text-xs theme-font-mono text-[var(--theme-text-accent)] font-semibold">
                DAO DECISION SUPPORT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)]">
              Futarchy — Conditional Impact Forecasts for DAOs
            </h1>
            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
              Uses conditional markets to forecast what a chosen measure of success might look
              like if a proposal passes versus if it does not. That gives a DAO information to
              consider when making its decision, rather than making the decision for it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('app')}
            className="osiris-btn-primary px-4 py-2.5 rounded-xl text-xs theme-font-mono uppercase shrink-0"
          >
            View Underlying Conditional Markets
          </button>
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

              <div className="text-[11px] theme-font-mono text-[var(--theme-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--theme-panel-divider)]">
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
        selectionProb: 78.4,
        staked: '$19.2k sDAI',
        status: 'High Selection Signal',
      },
      {
        id: 'SUB-09',
        title: 'Conditional Treasury Hedging SDK for DAO Working Groups',
        category: 'Governance Tooling Track',
        selectionProb: 64.1,
        staked: '$14.8k sDAI',
        status: 'Strong Contender',
      },
      {
        id: 'SUB-27',
        title: 'Automated Reality.eth Verification & Citation Indexer',
        category: 'Oracle & Resolution Track',
        selectionProb: 51.8,
        staked: '$11.4k sDAI',
        status: 'In Contention',
      },
      {
        id: 'SUB-03',
        title: 'Mobile Push Notifications for Scalar Market Thresholds',
        category: 'Consumer UX Track',
        selectionProb: 34.2,
        staked: '$7.6k sDAI',
        status: 'Moderate Signal',
      },
    ]

    return (
      <div className="space-y-6">
        <div className="osiris-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="osiris-pill osiris-pill-brand">
                OPPORTUNITY MARKETS · SUBMISSION SELECTION SIGNALS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)]">
              Opportunity Markets — Forecasting Selection Likelihood
            </h1>
            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
              Let traders forecast which submissions are likely to be selected, giving
              reviewers another signal while leaving the final selection to them.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('app')}
            className="osiris-btn-primary px-4 py-2.5 rounded-xl text-xs theme-font-mono uppercase shrink-0"
          >
            Browse All Markets
          </button>
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
                  <div className="text-xl font-bold text-[var(--theme-text-primary)]">
                    {sub.selectionProb}%
                  </div>
                  <div className="text-[10px] text-[var(--theme-text-muted)]">Selection Prob.</div>
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
  const protocols = [
    {
      name: 'Aave v3 (Core Ethereum & Gnosis)',
      category: 'Lending',
      smartContractRisk: 1.2,
      oracleGovernanceRisk: 0.8,
      compositeRisk: 2.0,
      liquidity: '$82.4k',
    },
    {
      name: 'Spark / sDAI Savings Rate Layer',
      category: 'Yield Collateral',
      smartContractRisk: 1.4,
      oracleGovernanceRisk: 0.6,
      compositeRisk: 2.0,
      liquidity: '$74.1k',
    },
    {
      name: 'Uniswap v4 Singleton Hooks Pool',
      category: 'DEX AMM',
      smartContractRisk: 2.3,
      oracleGovernanceRisk: 1.1,
      compositeRisk: 3.4,
      liquidity: '$51.9k',
    },
    {
      name: 'Synthetic Leveraged Restaking Vault',
      category: 'Restaking / Bridge',
      smartContractRisk: 8.7,
      oracleGovernanceRisk: 4.9,
      compositeRisk: 13.6,
      liquidity: '$38.6k',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="osiris-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="osiris-pill osiris-pill-brand">
              RISK PRICING · COMPARATIVE DEFI EXPOSURE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium text-[var(--theme-text-primary)]">
            Risk Pricing — Market Estimates of Protocol Exposure
          </h1>
          <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
            Shows market estimates of risk across protocols; someone assessing DeFi exposure
            can compare those estimates instead of interpreting a single yes-or-no price in
            isolation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('app')}
          className="osiris-btn-primary px-4 py-2.5 rounded-xl text-xs theme-font-mono uppercase shrink-0"
        >
          Trade Underlying Risk Markets
        </button>
      </div>

      <div className="osiris-card p-6 space-y-4">
        <div className="flex items-center justify-between text-xs theme-font-mono text-[var(--theme-text-muted)] pb-3 border-b border-[var(--theme-panel-divider)]">
          <span>SIDE-BY-SIDE PROTOCOL RISK COMPARISON (IMPLIED 12M INCIDENT PROBABILITY)</span>
          <span className="text-[var(--theme-text-accent)] font-semibold">CALIBRATED IN sDAI</span>
        </div>

        <div className="space-y-3">
          {protocols.map((p) => (
            <div
              key={p.name}
              className="osiris-well p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              <div className="md:col-span-4">
                <div className="text-sm font-medium text-[var(--theme-text-primary)]">{p.name}</div>
                <div className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                  {p.category} · Pool {p.liquidity}
                </div>
              </div>

              <div className="md:col-span-5 space-y-1.5">
                <div className="flex justify-between text-xs theme-font-mono">
                  <span className="text-[var(--theme-text-muted)]">
                    Exploit: {p.smartContractRisk}% · Oracle/Peg: {p.oracleGovernanceRisk}%
                  </span>
                  <span className="text-[var(--theme-text-primary)] font-bold">
                    {p.compositeRisk.toFixed(1)}% Total Implied Risk
                  </span>
                </div>
                <div className="w-full h-2 osiris-hp-bar overflow-hidden">
                  <div
                    className={`h-full ${
                      p.compositeRisk < 4
                        ? 'bg-gradient-to-r from-[#7D33FF] to-[#9C6FF2]'
                        : 'bg-gradient-to-r from-[#4A4660] to-[#7D33FF]'
                    }`}
                    style={{ width: `${Math.min(100, p.compositeRisk * 5)}%` }}
                  />
                </div>
              </div>

              <div className="md:col-span-3 flex md:justify-end">
                <span
                  className={`osiris-pill ${
                    p.compositeRisk < 4
                      ? 'osiris-pill-brand'
                      : 'bg-[#4A4660]/20 border border-[#4A4660]/50 text-[var(--theme-text-secondary)]'
                  }`}
                >
                  {p.compositeRisk < 4 ? 'TIER 1 · LOW RELATIVE RISK' : 'ELEVATED RISK EXPOSURE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
