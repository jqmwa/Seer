import React, { useState } from 'react'
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Coins, Layers } from 'lucide-react'
import { MarketItem, MarketOutcome, MarketType } from '../data/markets'

interface TradeModalProps {
  market: MarketItem
  initialOutcome?: MarketOutcome
  walletBalance: number
  onClose: () => void
  onExecuteTrade: (
    marketId: string,
    outcomeId: string,
    amountSDAI: number,
    mode: 'buy' | 'sell' | 'mint'
  ) => void
}

export const MarketTradeModal: React.FC<TradeModalProps> = ({
  market,
  initialOutcome,
  walletBalance,
  onClose,
  onExecuteTrade,
}) => {
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string>(
    initialOutcome?.id || market.outcomes[0]?.id || ''
  )
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell' | 'mint'>('buy')
  const [amount, setAmount] = useState<string>('100')
  const [txSuccess, setTxSuccess] = useState<string | null>(null)

  const selectedOutcome =
    market.outcomes.find((o) => o.id === selectedOutcomeId) || market.outcomes[0]

  const numericAmount = Math.max(0, parseFloat(amount) || 0)
  const price = Math.max(0.01, (selectedOutcome?.probability || 50) / 100)
  const estimatedShares = tradeMode === 'mint' ? numericAmount : numericAmount / price
  const potentialPayout = estimatedShares * 1.0
  const netReturnPct =
    numericAmount > 0 ? ((potentialPayout - numericAmount) / numericAmount) * 100 : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (numericAmount <= 0) return
    onExecuteTrade(market.id, selectedOutcome.id, numericAmount, tradeMode)
    setTxSuccess(
      `${tradeMode === 'buy' ? 'Bought' : tradeMode === 'sell' ? 'Sold' : 'Minted'} ${estimatedShares.toFixed(
        1
      )} "${selectedOutcome.label}" shares (${numericAmount.toFixed(2)} ${market.collateral})`
    )
    setTimeout(() => setTxSuccess(null), 3500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141223]/65 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="osiris-card w-full max-w-2xl p-6 text-[var(--theme-text-primary)] shadow-2xl"
      >
        {/* Top Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--theme-panel-divider)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="osiris-pill osiris-pill-brand">
                {market.category}
              </span>
              <span className="osiris-pill bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)] text-[var(--theme-text-muted)]">
                {market.chain} · {market.collateral}
              </span>
              {market.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] theme-font-mono text-[var(--theme-text-accent)] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold leading-snug text-[var(--theme-text-primary)]">
              {market.question}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--theme-well-bg)] hover:bg-[#7D33FF]/15 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-card-border)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5">
          {/* Left Column: Outcomes & Resolution Info */}
          <div className="md:col-span-7 flex flex-col justify-between gap-4">
            <div>
              <div className="text-[11px] theme-font-mono uppercase tracking-wider text-[var(--theme-text-muted)] mb-2.5">
                Select Outcome Token
              </div>
              <div className="flex flex-col gap-2">
                {market.outcomes.map((outcome) => {
                  const isSelected = outcome.id === selectedOutcome?.id
                  return (
                    <button
                      key={outcome.id}
                      type="button"
                      onClick={() => setSelectedOutcomeId(outcome.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#7D33FF]/15 border-[#7D33FF] shadow-[0_0_20px_rgba(125,51,255,0.2)]'
                          : 'bg-[var(--theme-well-bg)] border-[var(--theme-card-border)] hover:border-[#8F55F7]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: outcome.color }}
                        />
                        <span className="text-sm font-medium text-[var(--theme-text-primary)] truncate">
                          {outcome.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs theme-font-mono text-[var(--theme-text-muted)]">
                          {(outcome.probability / 100).toFixed(2)} {market.collateral}
                        </span>
                        <span className="text-sm font-bold theme-font-mono text-[var(--theme-text-primary)] bg-[var(--theme-panel-bg)] px-2 py-0.5 rounded border border-[var(--theme-card-border)]">
                          {outcome.probability.toFixed(1)}%
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Market Rules & Oracle Box */}
            <div className="osiris-well p-3.5 text-xs text-[var(--theme-text-muted)] space-y-2">
              <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-text-accent)]" />
                  Reality.eth + Kleros Oracle
                </span>
                <span>Resolves: {market.endDate}</span>
              </div>
              <p className="leading-relaxed text-[var(--theme-text-secondary)] text-[11.5px]">
                {market.description}
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] border-t border-[var(--theme-panel-divider)]">
                <span>Pool Liquidity: ${(market.liquidityUSD / 1000).toFixed(2)}k</span>
                <span>24h Vol: ${(market.volumeUSD / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>

          {/* Right Column: Osiris Trade Box */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-5 osiris-well p-4 flex flex-col justify-between gap-4"
          >
            <div>
              {/* Mode Tabs: Buy / Sell / Mint */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[var(--theme-panel-bg)] border border-[var(--theme-card-border)] mb-4">
                {(['buy', 'sell', 'mint'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTradeMode(m)}
                    className={`py-1.5 rounded-md text-xs theme-font-mono uppercase font-semibold transition-all ${
                      tradeMode === m
                        ? 'bg-[#7D33FF] text-[#FFFFFF] shadow'
                        : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Collateral Input */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[11px] theme-font-mono text-[var(--theme-text-muted)] mb-1.5">
                  <span>Amount ({market.collateral})</span>
                  <span>Bal: {walletBalance.toFixed(0)} sDAI</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] rounded-lg px-3 py-2 text-sm theme-font-mono text-[var(--theme-text-primary)] outline-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {[25, 100, 500].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(String(preset))}
                        className="px-1.5 py-0.5 text-[10px] theme-font-mono rounded bg-[var(--theme-well-bg)] hover:bg-[#7D33FF]/20 text-[var(--theme-text-secondary)] border border-[var(--theme-card-border)]"
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-1.5 text-xs theme-font-mono border-t border-[var(--theme-panel-divider)] pt-3">
                <div className="flex justify-between text-[var(--theme-text-muted)]">
                  <span>Avg Price</span>
                  <span className="text-[var(--theme-text-primary)] font-semibold">{price.toFixed(2)} sDAI</span>
                </div>
                <div className="flex justify-between text-[var(--theme-text-muted)]">
                  <span>Est. Shares</span>
                  <span className="text-[var(--theme-text-primary)] font-semibold">{estimatedShares.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--theme-text-muted)]">
                  <span>Max Payout</span>
                  <span className="text-[var(--theme-text-accent)] font-semibold">
                    {potentialPayout.toFixed(2)} sDAI (+{netReturnPct.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between text-[var(--theme-text-muted)]">
                  <span>Yield (sDAI APY)</span>
                  <span className="text-[var(--theme-text-accent)] font-semibold">~6.5% APY</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {txSuccess && (
                <div className="p-2 rounded-lg bg-[#7D33FF]/15 border border-[#7D33FF] text-[var(--theme-text-primary)] text-[11px] theme-font-mono text-center">
                  ✓ {txSuccess}
                </div>
              )}
              <button
                type="submit"
                className="w-full osiris-btn-primary py-2.5 px-4 rounded-lg text-xs theme-font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Coins className="w-3.5 h-3.5" />
                {tradeMode === 'buy'
                  ? `Buy "${selectedOutcome?.label}"`
                  : tradeMode === 'sell'
                  ? `Sell "${selectedOutcome?.label}"`
                  : 'Mint Complete Set'}
              </button>
              <a
                href="https://app.seer.pm/"
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 text-[11px] theme-font-mono text-[var(--theme-text-muted)] hover:text-[var(--theme-text-accent)] flex items-center justify-center gap-1 transition-colors"
              >
                View on app.seer.pm <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

interface CreateMarketModalProps {
  onClose: () => void
  onCreate: (newMarket: MarketItem) => void
}

export const CreateMarketModal: React.FC<CreateMarketModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState<MarketItem['category']>('Crypto')
  const [type, setType] = useState<MarketType>('binary')
  const [outcomesText, setOutcomesText] = useState('Yes, No')
  const [liquidity, setLiquidity] = useState('2500')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    const palette = ['#7D33FF', '#8F55F7', '#9C6FF2', '#4A4660']
    const labels =
      type === 'binary'
        ? ['Yes', 'No']
        : outcomesText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)

    const safeLabels = labels.length >= 2 ? labels : ['Yes', 'No']
    const equalProb = Number((100 / safeLabels.length).toFixed(1))

    const newMarket: MarketItem = {
      id: `custom-${Date.now()}`,
      question: question.trim(),
      category,
      type,
      avatarType: 'polymarket',
      outcomes: safeLabels.map((label, idx) => ({
        id: `out-${idx}`,
        label,
        probability: idx === 0 ? Number((100 - equalProb * (safeLabels.length - 1)).toFixed(1)) : equalProb,
        color: palette[idx % palette.length],
        price: equalProb / 100,
      })),
      scalarValue: type === 'scalar' ? 25.0 : undefined,
      scalarUnit: type === 'scalar' ? 'INDEX' : undefined,
      scalarMin: type === 'scalar' ? 0 : undefined,
      scalarMax: type === 'scalar' ? 100 : undefined,
      liquidityUSD: Math.max(100, parseFloat(liquidity) || 2500),
      volumeUSD: 0,
      hasIncentive: true,
      verified: true,
      chain: 'Gnosis',
      collateral: 'sDAI',
      endDate: '2026-12-31',
      starred: true,
      description: 'User-created prediction market deployed with sDAI collateral and Reality.eth + Kleros verification.',
    }

    onCreate(newMarket)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141223]/65 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="osiris-card w-full max-w-lg p-6 text-[var(--theme-text-primary)] shadow-2xl"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-panel-divider)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--theme-text-accent)]" />
            <h2 className="text-base font-semibold text-[var(--theme-text-primary)]">
              Create New Seer Market
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-[var(--theme-well-bg)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-card-border)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs theme-font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
              Market Question
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Will Ethereum L1 gas fees average below 5 gwei in Q4 2026?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] rounded-lg px-3 py-2 text-sm text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)]/60 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs theme-font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MarketItem['category'])}
                className="w-full bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] rounded-lg px-3 py-2 text-xs theme-font-mono text-[var(--theme-text-primary)] outline-none"
              >
                <option value="Politics">Politics</option>
                <option value="Crypto">Crypto</option>
                <option value="Geopolitics">Geopolitics</option>
                <option value="Regulation">Regulation</option>
                <option value="Macro">Macro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs theme-font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                Market Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MarketType)}
                className="w-full bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] rounded-lg px-3 py-2 text-xs theme-font-mono text-[var(--theme-text-primary)] outline-none"
              >
                <option value="binary">Binary (Yes / No)</option>
                <option value="categorical">Categorical (Multiple)</option>
                <option value="scalar">Scalar (Range Gauge)</option>
              </select>
            </div>
          </div>

          {type === 'categorical' && (
            <div>
              <label className="block text-xs theme-font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                Outcomes (comma separated)
              </label>
              <input
                type="text"
                value={outcomesText}
                onChange={(e) => setOutcomesText(e.target.value)}
                placeholder="Outcome A, Outcome B, Outcome C"
                className="w-full bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] rounded-lg px-3 py-2 text-xs theme-font-mono text-[var(--theme-text-primary)] outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs theme-font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
              Initial sDAI Liquidity (USD)
            </label>
            <div className="relative">
              <Layers className="w-4 h-4 text-[var(--theme-text-accent)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="100"
                value={liquidity}
                onChange={(e) => setLiquidity(e.target.value)}
                className="w-full bg-[var(--theme-input-bg)] border border-[var(--theme-input-border)] focus:border-[#7D33FF] rounded-lg pl-9 pr-3 py-2 text-sm theme-font-mono text-[var(--theme-text-primary)] outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs theme-font-mono text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-well-bg)] border border-[var(--theme-card-border)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="osiris-btn-primary px-5 py-2 rounded-lg text-xs theme-font-mono uppercase font-semibold"
            >
              Deploy Market
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
