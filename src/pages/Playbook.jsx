import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const CHAPTERS = [
  {
    num: 1, tag: 'FOUNDATION', title: 'The Wealth Mindset',
    subtitle: 'Rewiring How You Think About Money',
    body: 'Before any strategy, system, or asset class — your relationship with money must be examined and rebuilt. This chapter dismantles the scarcity mindset instilled by traditional financial systems and replaces it with an abundance framework rooted in ownership, leverage, and legacy.',
    sections: ['From Employee to Investor', 'The Three Enemies of Wealth', 'Building Your Wealth Philosophy'],
  },
  {
    num: 2, tag: 'STRATEGY', title: 'The Architecture of Assets',
    subtitle: 'Designing Your Wealth System',
    body: 'Wealth is not built by picking the right stock or crypto token — it is built by designing a system of assets that work together. This chapter covers asset classes, allocation frameworks, the 4-bucket model, and how Bitcoin, real estate, insurance, and cash-flowing businesses fit together.',
    sections: ['The 4-Bucket Wealth Model', 'Asset Class Deep Dive', 'Correlation and Diversification', 'Building Your Allocation Framework'],
  },
  {
    num: 3, tag: 'ADVANCED', title: 'Self-Banking with Insurance',
    subtitle: 'The Infinite Banking Concept',
    body: 'The ultra-wealthy don\'t bank at commercial banks — they ARE the bank. Using dividend-paying whole life insurance policies from mutual companies, you can create a private banking system that grows tax-free, provides liquidity on demand, and compounds without interruption.',
    sections: ['What Is a Mutual Insurance Company?', 'Policy Design for IBC', 'Taking and Repaying Policy Loans', 'The IBC Wealth Cycle', 'Combining IBC with DeFi'],
  },
  {
    num: 4, tag: 'ADVANCED', title: 'DeFi as a Wealth Engine',
    subtitle: 'Putting Your Capital to Work On-Chain',
    body: 'Decentralized Finance is not speculation — it is a parallel financial system where your assets generate yield, provide collateral, and earn protocol rewards 24/7. This chapter covers the safest yield strategies for capital preservation.',
    sections: ['Understanding Smart Contract Risk', 'Stablecoin Yield: The Base Layer', 'Lending Protocols (Aave, Compound)', 'Liquidity Provision Fundamentals', 'Bridging IBC Cash Value to DeFi'],
  },
  {
    num: 5, tag: 'LEGACY', title: 'Legacy Planning',
    subtitle: 'Building Wealth That Outlasts You',
    body: 'Generational wealth fails at the transition. 70% of family wealth is lost by the second generation. This chapter covers the legal, financial, and philosophical frameworks for ensuring your wealth compounds across generations — including digital asset inheritance.',
    sections: ['Trusts and Legal Structures', 'Digital Asset Inheritance', 'Teaching Wealth to the Next Generation', 'The Family Constitution', 'Coordinating IBC, Crypto, and Real Estate in an Estate Plan'],
  },
];

export default function Playbook() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapter = CHAPTERS[activeChapter];

  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">CORNERSTONE CONTENT</div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-tight mb-4">
            Generational<br />Wealth<br /><span className="text-cyan">Playbook</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            The complete framework for building, protecting, and transferring wealth across generations. Old-world wisdom. New-world tools.
          </p>
          <div className="flex gap-6 mt-6">
            {[['5', 'Chapters'], ['20+', 'Strategies'], ['∞', 'Potential']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-2xl font-bold font-heading text-cyan">{val}</div>
                <div className="text-xs text-muted-foreground font-mono">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter list */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Chapters</div>
            {CHAPTERS.map((c, i) => (
              <button key={c.num} onClick={() => setActiveChapter(i)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${activeChapter === i ? 'border-cyan bg-cyan/10 text-white' : 'border-border text-muted-foreground hover:border-cyan/40 hover:text-white'}`}>
                <div className="text-[10px] font-mono mb-0.5 opacity-70">CHAPTER {c.num}</div>
                <div className="text-sm font-medium">{c.title}</div>
              </button>
            ))}
          </div>

          {/* Chapter content */}
          <div className="lg:col-span-3">
            <div className="border border-cyan/20 bg-cyan/5 rounded-sm px-4 py-1.5 inline-block mb-4">
              <span className="text-xs font-mono text-cyan">{chapter.tag}</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground mb-1">CHAPTER {chapter.num}</div>
            <h2 className="text-3xl font-display font-bold text-white mb-1">{chapter.title}</h2>
            <h3 className="text-lg text-muted-foreground mb-6">{chapter.subtitle}</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">{chapter.body}</p>

            <div className="border-t border-border pt-6 mb-8">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">In This Chapter</div>
              <div className="space-y-2">
                {chapter.sections.map((s, i) => (
                  <div key={s} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer group">
                    <span className="text-[10px] font-mono text-cyan/60 w-4">{String(i + 1).padStart(2, '0')}</span>
                    <ChevronRight className="w-3 h-3 text-cyan/40 group-hover:text-cyan transition-colors" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {activeChapter < CHAPTERS.length - 1 && (
              <button onClick={() => setActiveChapter(activeChapter + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-cyan/50 rounded-lg text-sm text-muted-foreground hover:text-white transition-colors">
                Next Chapter: {CHAPTERS[activeChapter + 1].title} <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}