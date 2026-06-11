import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const COMPARISONS = {
  Banking: {
    old: { title: 'Commercial Bank Savings', points: ['0.5–2% APY on savings', 'Bank controls your funds', 'FDIC insured up to $250K', 'Business hours only', 'Credit score required', 'Transaction monitoring'] },
    new: { title: 'DeFi Stablecoin Lending (Aave)', points: ['4–8% APY on stablecoins', 'You control your funds', 'Smart contract risk', '24/7/365 access', 'No credit score', 'Fully transparent on-chain'] },
    hybrid: 'Use your bank for operating expenses, fiat on/off ramps, and FDIC-insured reserves. Use DeFi for yield on savings above your emergency fund. Bridge: Stablecoins (USDC) give you the best of both — dollar stability, DeFi yield.',
  },
  Lending: {
    old: { title: 'Bank Personal Loan', points: ['7–25% APR', 'Credit check required', 'Fixed repayment schedule', 'Bank can call the loan', '2–4 weeks to fund', 'Limited collateral options'] },
    new: { title: 'DeFi Collateralized Loan', points: ['2–8% APR (variable)', 'No credit check', 'Flexible repayment', 'Your collateral backs it', 'Instant funding', 'Crypto collateral accepted'] },
    hybrid: 'Use traditional loans for fiat-denominated purchases (real estate, business). Use DeFi loans to access liquidity from crypto holdings without selling — preserving long-term upside.',
  },
  'Insurance as Wealth Vehicle': {
    old: { title: 'Term Life Insurance', points: ['Pure death benefit', 'No cash value built', 'Expires at term end', 'Premium increases with age', 'No borrowing capability', 'Lowest cost short-term'] },
    new: { title: 'Infinite Banking (Whole Life)', points: ['Guaranteed cash value growth', 'Tax-free policy loans', 'Never expires', 'Level premium for life', 'Private banking capability', 'Compound growth engine'] },
    hybrid: 'Use term insurance for pure income replacement during wealth-building years. Simultaneously fund a whole life policy for IBC. At the policy\'s maturity point, term insurance becomes redundant as the whole life policy\'s death benefit exceeds your needs.',
  },
  'Investment Vehicles': {
    old: { title: 'Traditional Brokerage (401k/IRA)', points: ['Tax-advantaged growth', 'Limited asset selection', 'Employer match (401k)', 'Penalties for early withdrawal', 'Market-only exposure', 'Custodian controls access'] },
    new: { title: 'Self-Directed IRA + Crypto', points: ['Tax-advantaged growth', 'Bitcoin, real estate, private equity', 'No employer match', 'Same early withdrawal rules', 'Alternative asset exposure', 'Custodian controls access'] },
    hybrid: 'Max out employer 401k match (free money), then route additional retirement savings to a Self-Directed IRA for Bitcoin and real estate exposure. Combine with a Roth for tax-free growth on high-appreciation crypto assets.',
  },
};

const IBC_STEPS = [
  { num: '01', title: 'Purchase a Whole Life Policy', desc: 'From a mutual insurance company (Penn Mutual, Mass Mutual, Guardian). Structure it with a Paid-Up Additions (PUA) rider to maximize cash value over premium.' },
  { num: '02', title: 'Fund the Policy', desc: 'Pay premiums for 5–10 years. During this phase, your cash value grows conservatively. Think of it as filling the tank.' },
  { num: '03', title: 'Take a Policy Loan', desc: 'Borrow against your cash value (not from it). The insurance company loans you money at favorable rates. Your cash value continues growing.' },
  { num: '04', title: 'Deploy the Capital', desc: 'Use the loan proceeds to invest — real estate down payment, Bitcoin acquisition during bear markets, business investment.' },
  { num: '05', title: 'Repay Yourself', desc: 'Pay back the policy loan on your own schedule. There is no bank chasing you. You are paying interest to yourself, keeping wealth in your ecosystem.' },
  { num: '06', title: 'Repeat Infinitely', desc: 'As cash value grows and policy loans are repaid, the cycle compounds. Over decades, this becomes your most powerful wealth engine.' },
];

export default function OldWorld() {
  const [activeComp, setActiveComp] = useState('Banking');

  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">HYBRID STRATEGIES</div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-4">
            <span className="text-white">Old World</span><br /><span className="text-cyan">Meets New</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            The most powerful wealth strategies don't choose between traditional finance and crypto — they use both in concert.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-xl">
            {['Infinite Banking', 'DeFi Lending', 'Self-Directed IRA', 'Hybrid Portfolios'].map(t => (
              <div key={t} className="border border-border bg-card/60 rounded px-3 py-2 text-center text-xs text-muted-foreground font-mono">{t}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Comparison tabs */}
        <div className="text-xs font-mono text-cyan tracking-widest mb-4">HEAD-TO-HEAD COMPARISONS</div>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Traditional vs. Decentralized</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(COMPARISONS).map(k => (
            <button key={k} onClick={() => setActiveComp(k)}
              className={`px-4 py-1.5 text-xs rounded border font-mono transition-colors ${activeComp === k ? 'bg-cyan text-black border-cyan font-bold' : 'border-border text-muted-foreground hover:text-white hover:border-cyan/40'}`}>
              {k}
            </button>
          ))}
        </div>

        {(() => {
          const comp = COMPARISONS[activeComp];
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border border-border bg-card rounded-lg p-6">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Old World</div>
                <h3 className="font-heading font-semibold text-white mb-4">{comp.old.title}</h3>
                <ul className="space-y-2">
                  {comp.old.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-border mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-cyan/30 bg-cyan/5 rounded-lg p-6">
                <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-3">New World</div>
                <h3 className="font-heading font-semibold text-white mb-4">{comp.new.title}</h3>
                <ul className="space-y-2">
                  {comp.new.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-cyan mt-0.5">→</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2 border border-border bg-muted/30 rounded-lg p-5">
                <div className="text-xs font-mono text-cyan uppercase tracking-widest mb-2">The Hybrid Strategy</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{comp.hybrid}</p>
              </div>
            </div>
          );
        })()}

        {/* IBC Cycle */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">STEP-BY-STEP PROCESS</div>
          <h2 className="text-2xl font-display font-bold text-white mb-10">The IBC Wealth Cycle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IBC_STEPS.map(step => (
              <div key={step.num} className="border border-border bg-card rounded-lg p-5 hover:border-cyan/40 transition-colors">
                <div className="text-2xl font-mono font-bold text-cyan/30 mb-3">{step.num}</div>
                <h3 className="font-heading font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="/playbook" className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all">
              Read the Full IBC Chapter in the Playbook <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}