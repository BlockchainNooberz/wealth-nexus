import { ExternalLink } from 'lucide-react';

const RESOURCES = [
  {
    category: 'Crypto Exchanges',
    items: [
      { name: 'Coinbase', desc: 'Best US-regulated exchange for beginners. FDIC insured USD balances.', level: 'Beginner', url: 'https://coinbase.com' },
      { name: 'Kraken', desc: 'Low fees, strong security, wide asset selection. Excellent for intermediate users.', level: 'Intermediate', url: 'https://kraken.com' },
      { name: 'Binance.US', desc: 'Highest liquidity, lowest fees for active traders.', level: 'Advanced', url: 'https://binance.us' },
    ]
  },
  {
    category: 'DeFi Protocols',
    items: [
      { name: 'Aave', desc: 'Leading decentralized lending protocol. Borrow and lend crypto with transparent rates.', level: 'Intermediate', url: 'https://aave.com' },
      { name: 'Uniswap', desc: 'The original decentralized exchange. Swap tokens without a central party.', level: 'Intermediate', url: 'https://uniswap.org' },
      { name: 'Ondo Finance', desc: 'Tokenized US T-bills on-chain. Institutional yield for DeFi wallets.', level: 'Advanced', url: 'https://ondo.finance' },
    ]
  },
  {
    category: 'Self-Custody',
    items: [
      { name: 'Ledger', desc: 'Industry-leading hardware wallet. Store your private keys offline.', level: 'Beginner', url: 'https://ledger.com' },
      { name: 'Trezor', desc: 'Open-source hardware wallet with strong community trust.', level: 'Intermediate', url: 'https://trezor.io' },
      { name: 'Rabby Wallet', desc: 'Best browser wallet for DeFi. Multi-chain, transaction simulation.', level: 'Intermediate', url: 'https://rabby.io' },
    ]
  },
  {
    category: 'Research & Data',
    items: [
      { name: 'CoinGecko', desc: 'Comprehensive crypto market data, portfolios, and research tools.', level: 'Beginner', url: 'https://coingecko.com' },
      { name: 'DeFiLlama', desc: 'Protocol TVL, yield rates, and DeFi analytics without ads.', level: 'Intermediate', url: 'https://defillama.com' },
      { name: 'RWA.xyz', desc: 'Real World Asset tokenization data and market tracking.', level: 'Advanced', url: 'https://rwa.xyz' },
    ]
  },
  {
    category: 'Books',
    items: [
      { name: 'The Bitcoin Standard', desc: 'Saifedean Ammous. The definitive case for Bitcoin as sound money.', level: 'Beginner', url: '#' },
      { name: 'Becoming Your Own Banker', desc: 'R. Nelson Nash. The original text on Infinite Banking Concept.', level: 'Intermediate', url: '#' },
      { name: 'The Intelligent Investor', desc: 'Benjamin Graham. Timeless value investing principles that apply across all markets.', level: 'Beginner', url: '#' },
    ]
  },
  {
    category: 'IBC / Insurance',
    items: [
      { name: 'Penn Mutual', desc: 'Top-rated mutual insurance company. Strong dividend history for IBC policies.', level: 'Advanced', url: 'https://pennmutual.com' },
      { name: 'Mass Mutual', desc: 'One of the oldest mutual life insurers. Excellent whole life dividend performance.', level: 'Advanced', url: 'https://massmutual.com' },
      { name: 'NIFB', desc: 'Nelson Nash Institute — the original source for IBC education and practitioners.', level: 'Advanced', url: 'https://infinitebanking.org' },
    ]
  },
];

const LEVEL_COLORS = {
  Beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Intermediate: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  Advanced: 'text-red-400 border-red-500/30 bg-red-500/10',
};

export default function Resources() {
  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">RESOURCES</div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">The Vault</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Vetted directory of exchanges, DeFi protocols, books, tools, and trusted external resources — organized by category and experience level.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-12">
          {RESOURCES.map(section => (
            <div key={section.category}>
              <h2 className="text-sm font-mono text-cyan uppercase tracking-widest mb-4 border-b border-border pb-2">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {section.items.map(item => (
                  <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="group border border-border bg-card rounded-lg p-5 hover:border-cyan/40 transition-colors flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-heading font-semibold text-white group-hover:text-cyan transition-colors">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 text-[9px] font-mono border rounded-full ${LEVEL_COLORS[item.level]}`}>{item.level}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-cyan transition-colors shrink-0" />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-cyan/20 bg-cyan/5 rounded-lg p-6 text-center">
          <div className="text-xs font-mono text-cyan uppercase tracking-widest mb-2">Disclaimer</div>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            SovereignStack does not have affiliate relationships with any listed resources. This is an editorial selection based on community trust, track record, and educational value. Always do your own research before using any financial product or service.
          </p>
        </div>
      </section>
    </div>
  );
}