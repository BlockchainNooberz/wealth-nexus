import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ASSETS = [
  {
    symbol: 'XRP', name: 'XRP / Ripple', role: 'Payments & Settlement',
    price: '$0.61', mcap: '$34B', status: 'Active — SEC Case Dismissed', statusOk: true,
    usRole: 'US Banking & Payments Rail',
    desc: 'XRP is positioned as the bridge currency for cross-border bank settlements. After a landmark partial SEC legal victory in 2023, Ripple\'s technology is being tested by major US financial institutions and is central to the Federal Reserve\'s exploration of faster payment rails.',
    useCases: ['Cross-border bank settlements via RippleNet', 'FedNow alternative payment rail exploration', 'Treasury and correspondent banking liquidity bridge'],
    institutions: ['JP Morgan (partnership exploration)', 'Bank of America (on RippleNet)', 'Santander (One Pay FX)', '350+ banks globally'],
    regulation: 'SEC partial ruling 2023: XRP is not a security when sold to retail. Ripple continues settlement discussions with SEC for institutional sales.',
    color: 'text-blue-400',
  },
  {
    symbol: 'XLM', name: 'XLM / Stellar', role: 'CBDC & Financial Access',
    price: '$0.12', mcap: '$3.2B', status: 'Active', statusOk: true,
    usRole: 'CBDC Infrastructure & Financial Inclusion',
    desc: 'Stellar\'s network is the backbone for several CBDC pilots globally and provides financial access infrastructure. Its unique fee structure (0.00001 XLM per transaction) makes it ideal for micropayments and CBDC implementation.',
    useCases: ['CBDC issuance and distribution', 'Cross-border micropayments', 'Tokenized asset settlement'],
    institutions: ['IBM World Wire (decommissioned, legacy proven tech)', 'Flutterwave partnership', 'Multiple developing nation CBDC pilots'],
    regulation: 'Not classified as a security. Stellar Development Foundation maintains strong regulatory relationships globally.',
    color: 'text-purple-400',
  },
  {
    symbol: 'HBAR', name: 'HBAR / Hedera', role: 'Enterprise & Government',
    price: '$0.08', mcap: '$3.1B', status: 'Active', statusOk: true,
    usRole: 'Enterprise & Government Infrastructure',
    desc: 'Hedera Hashgraph operates as a governing council of 39 global enterprises including Google, IBM, Boeing, and the London School of Economics. Its aBFT consensus provides bank-grade finality in 3–5 seconds with predictable fees.',
    useCases: ['Supply chain provenance tracking', 'Government data notarization', 'Enterprise tokenization of assets'],
    institutions: ['Google', 'IBM', 'Boeing', 'Deutsche Telekom', 'EFTPOS Australia'],
    regulation: 'Legally structured as a distributed public ledger governed by a council — not a typical crypto project. Strong regulatory standing.',
    color: 'text-cyan',
  },
  {
    symbol: 'ADA', name: 'ADA / Cardano', role: 'Identity & Governance',
    price: '$0.58', mcap: '$20B', status: 'Active', statusOk: true,
    usRole: 'Digital Identity & Governance Infrastructure',
    desc: 'Cardano\'s eUTXO model and peer-reviewed academic approach makes it a candidate for government-grade identity solutions. Active projects in Africa (Atala PRISM) provide a template for US-adjacent use cases in digital identity.',
    useCases: ['Digital identity credentials (Atala PRISM)', 'Voting infrastructure on-chain', 'Academic credential verification'],
    institutions: ['Ethiopian government (digital credentials)', 'IOHK partnerships', 'World Mobile Token integration'],
    regulation: 'Not classified as a security by most regulators. Cardano Foundation maintains proactive regulatory dialogue.',
    color: 'text-blue-300',
  },
  {
    symbol: 'ONDO', name: 'ONDO / Ondo Finance', role: 'RWA & Tokenization',
    price: '$0.93', mcap: '$1.4B', status: 'Active — SEC Compliant', statusOk: true,
    usRole: 'Tokenized Real World Assets (T-Bills, Bonds)',
    desc: 'Ondo Finance tokenizes US Treasury bonds and money market funds, making institutional-grade yields (previously requiring $10M+ minimums) accessible on-chain via OUSG and USDY tokens. BlackRock BUIDL, Franklin Templeton BENJI — this is the RWA wave.',
    useCases: ['Tokenized US T-bills (OUSG)', 'Yield-bearing stablecoins (USDY)', 'DeFi-composable institutional yield'],
    institutions: ['BlackRock (BUIDL fund partner)', 'Franklin Templeton', 'Coinbase institutional'],
    regulation: 'Operating under existing US securities law via KYC/AML compliant access. OUSG is a registered product.',
    color: 'text-emerald-400',
  },
];

const STATS = [
  { value: '$16T', label: 'Projected RWA Market by 2030', sub: 'Boston Consulting Group' },
  { value: '$2B+', label: 'Tokenized Treasuries On-Chain Today', sub: 'RWA.xyz' },
  { value: '350+', label: 'Banks Using Ripple Technology', sub: 'Ripple Q1 2026' },
  { value: '$689B', label: 'CBDC in Active Development', sub: 'Atlantic Council 2026' },
];

const TABS = ['Overview', 'Use Cases', 'Institutions', 'Regulation'];

export default function UsCrypto() {
  const [activeAsset, setActiveAsset] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const asset = ASSETS[activeAsset];

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="relative border-b border-border py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-4">US FINANCIAL INTEGRATION</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
                America's Crypto<br /><span className="text-cyan">Infrastructure Play</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                The US isn't fighting crypto anymore — it's integrating it. From XRP settling bank payments to Ondo tokenizing Treasury bonds, these are the assets reshaping America's financial infrastructure.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {ASSETS.map((a, i) => (
                  <button key={a.symbol} onClick={() => setActiveAsset(i)}
                    className={`px-3 py-1 text-xs font-mono border rounded transition-colors ${activeAsset === i ? 'bg-cyan text-black border-cyan' : 'border-border text-muted-foreground hover:border-cyan/50 hover:text-white'}`}>
                    {a.symbol}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {STATS.map(s => (
                <div key={s.value} className="border border-border bg-card/60 rounded-lg p-4 min-w-[140px]">
                  <div className="text-xl font-bold font-heading text-white">{s.value}</div>
                  <div className="text-[11px] text-foreground/70 font-medium mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asset Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Asset tabs */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-border pb-0">
          {ASSETS.map((a, i) => (
            <button key={a.symbol} onClick={() => { setActiveAsset(i); setActiveTab(0); }}
              className={`px-4 py-2.5 text-xs font-mono border-b-2 transition-colors ${activeAsset === i ? 'border-cyan text-cyan' : 'border-transparent text-muted-foreground hover:text-white'}`}>
              <span className={activeAsset === i ? 'text-cyan font-bold' : ''}>{a.symbol}</span>
              <span className="ml-2 text-muted-foreground">{a.role}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">{asset.name}</h2>
                <div className="text-sm text-muted-foreground">{asset.role}</div>
                <span className={`inline-block mt-2 px-2 py-0.5 text-xs border rounded font-mono ${asset.statusOk ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-red-500/40 text-red-400'}`}>
                  ● {asset.status}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-white">{asset.price}</div>
                <div className="text-xs text-muted-foreground font-mono">MCap: {asset.mcap}</div>
              </div>
            </div>

            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1 border-l-2 border-cyan pl-3">
              Role in US Financial System
            </div>
            <div className="text-lg font-heading font-semibold text-white mb-6 pl-3">{asset.usRole}</div>

            {/* Content tabs */}
            <div className="flex gap-1 mb-6">
              {TABS.map((t, i) => (
                <button key={t} onClick={() => setActiveTab(i)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors ${activeTab === i ? 'bg-cyan text-black font-semibold' : 'text-muted-foreground hover:text-white hover:bg-secondary'}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              {activeTab === 0 && <p className="text-muted-foreground leading-relaxed">{asset.desc}</p>}
              {activeTab === 1 && (
                <ul className="space-y-2">
                  {asset.useCases.map(u => (
                    <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-cyan mt-1">→</span> {u}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 2 && (
                <ul className="space-y-2">
                  {asset.institutions.map(inst => (
                    <li key={inst} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-cyan rounded-full shrink-0" /> {inst}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 3 && <p className="text-muted-foreground leading-relaxed text-sm">{asset.regulation}</p>}
            </div>

            <div className="mt-8 border border-cyan/20 bg-cyan/5 rounded-lg p-5">
              <div className="text-xs font-mono text-cyan tracking-widest mb-2">KEY THEME</div>
              <p className="text-white text-sm leading-relaxed">
                These assets are not speculative bets — they are infrastructure plays. The question is not whether the US financial system goes on-chain. The question is <em>which rails it uses</em>.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="border border-border bg-card rounded-lg p-5">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Asset Overview</div>
              <div className="space-y-3">
                {ASSETS.map((a, i) => (
                  <button key={a.symbol} onClick={() => setActiveAsset(i)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors border ${activeAsset === i ? 'bg-cyan/10 border-cyan/40' : 'border-transparent hover:bg-secondary'}`}>
                    <div>
                      <div className={`text-sm font-bold font-mono ${activeAsset === i ? 'text-cyan' : 'text-white'}`}>{a.symbol}</div>
                      <div className="text-xs text-muted-foreground">{a.role}</div>
                    </div>
                    <div className="text-sm font-mono text-white">{a.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-border bg-card rounded-lg p-5">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Explore Further</div>
              <div className="space-y-2">
                <Link to="/learn" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors">
                  <ArrowRight className="w-3 h-3" /> Learn more in The Ledger
                </Link>
                <Link to="/atlas" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors">
                  <ArrowRight className="w-3 h-3" /> See The Financial Atlas
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RWA Section */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">THE MACRO THESIS</div>
          <h2 className="text-3xl font-display font-bold text-white mb-10">Real World Asset Tokenization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'What Is Tokenization?', body: 'Tokenization converts ownership rights in real-world assets — Treasury bonds, real estate, private equity, commodities — into digital tokens on a blockchain. This makes previously illiquid, high-minimum assets accessible, tradable 24/7, and composable with DeFi protocols.' },
              { title: 'Why Now?', body: 'The convergence of regulatory clarity (2025 US crypto legislation), institutional infrastructure (BlackRock, Fidelity, Franklin Templeton on-chain), and mature blockchain rails has created a perfect storm for mass tokenization adoption.' },
              { title: 'Wealth Opportunity', body: 'Tokenized T-bills (via Ondo\'s OUSG, BlackRock BUIDL) give retail investors institutional-grade yields — previously only accessible with $10M+ minimums. This is the democratization of yield.' },
            ].map(item => (
              <div key={item.title} className="border border-border bg-card rounded-lg p-6">
                <h3 className="font-heading font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}