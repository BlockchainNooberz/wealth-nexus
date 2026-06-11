import { useState } from 'react';
import { Clock, ArrowRight, Lock } from 'lucide-react';

const GUIDES = [
  { id: 1, level: 'beginner', topic: 'crypto-basics', title: 'What Is Bitcoin, Really?', desc: 'Strip away the hype and understand the fundamental properties that make Bitcoin a revolutionary financial instrument and digital store of value.', time: 8, premium: false },
  { id: 2, level: 'beginner', topic: 'crypto-basics', title: 'Setting Up Your First Crypto Wallet', desc: 'A step-by-step walkthrough of hardware vs. software wallets, seed phrases, and best security practices for self-custody.', time: 12, premium: false },
  { id: 3, level: 'beginner', topic: 'crypto-basics', title: 'How Blockchain Technology Actually Works', desc: 'From distributed ledgers to consensus mechanisms — understand the architecture that makes cryptocurrency trustless and censorship-resistant.', time: 10, premium: false },
  { id: 4, level: 'intermediate', topic: 'self-banking', title: 'The Infinite Banking Concept Explained', desc: 'Discover how whole life insurance can be used as a personal banking system. The strategy the ultra-wealthy have used for over a century.', time: 14, premium: false, playbook: true },
  { id: 5, level: 'beginner', topic: 'defi', title: 'Introduction to DeFi: Decentralized Finance 101', desc: 'What is DeFi? Explore how decentralized lending, borrowing, and trading protocols work — and why they represent a paradigm shift in finance.', time: 11, premium: false },
  { id: 6, level: 'intermediate', topic: 'defi', title: 'Aave & Compound: DeFi Lending Deep Dive', desc: 'A technical walkthrough of the two leading DeFi lending protocols. Learn how to deposit assets, borrow against collateral, and manage liquidation risk.', time: 18, premium: true },
  { id: 7, level: 'advanced', topic: 'defi', title: 'DeFi Yield Strategies for 2026', desc: 'Liquidity provision, yield farming, and decentralized lending — with risk frameworks and real-world examples for capital preservation.', time: 22, premium: true },
  { id: 8, level: 'intermediate', topic: 'wealth-strategy', title: 'Building a Generational Wealth Portfolio', desc: 'Asset allocation frameworks that combine traditional investments, crypto, insurance vehicles, and alternative assets for long-term wealth accumulation.', time: 16, premium: false, playbook: true },
  { id: 9, level: 'intermediate', topic: 'wealth-strategy', title: 'Self-Directed IRAs and Crypto', desc: 'How to use a self-directed IRA to hold Bitcoin and other crypto assets tax-advantaged. A powerful strategy for retirement wealth building.', time: 13, premium: true },
  { id: 10, level: 'advanced', topic: 'legacy-planning', title: 'Legacy Planning in the Digital Age', desc: 'Estate planning, trusts, digital asset inheritance, and how to ensure your crypto and traditional wealth transfers to the next generation.', time: 20, premium: true, playbook: true },
  { id: 11, level: 'advanced', topic: 'old-world', title: 'Understanding Tokenized Real World Assets', desc: 'Treasury bonds, real estate, and commodities on-chain. RWA tokens are converging TradFi and DeFi — here is what you need to know.', time: 15, premium: true },
  { id: 12, level: 'beginner', topic: 'wealth-strategy', title: 'Dollar-Cost Averaging: The Timeless Strategy', desc: 'Why DCA is the single most powerful strategy for building crypto wealth over time — the math, psychology, and practical implementation.', time: 7, premium: false },
];

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const TOPICS = ['All Topics', 'Crypto Basics', 'DeFi Protocols', 'Self-Banking', 'Wealth Strategy', 'Old World Meets New', 'Legacy Planning'];
const TOPIC_MAP = { 'All Topics': null, 'Crypto Basics': 'crypto-basics', 'DeFi Protocols': 'defi', 'Self-Banking': 'self-banking', 'Wealth Strategy': 'wealth-strategy', 'Old World Meets New': 'old-world', 'Legacy Planning': 'legacy-planning' };

const LEVEL_COLORS = { beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', intermediate: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10', advanced: 'text-red-400 border-red-500/30 bg-red-500/10' };

export default function Learn() {
  const [level, setLevel] = useState('All Levels');
  const [topic, setTopic] = useState('All Topics');

  const filtered = GUIDES.filter(g => {
    const levelOk = level === 'All Levels' || g.level === level.toLowerCase();
    const topicOk = !TOPIC_MAP[topic] || g.topic === TOPIC_MAP[topic];
    return levelOk && topicOk;
  });

  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">EDUCATIONAL PLATFORM</div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">The Ledger</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Structured learning volumes from foundational crypto literacy to advanced generational wealth strategy. Every level, every topic.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mr-2 w-10">Level:</span>
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`px-3 py-1 text-xs rounded border transition-colors ${level === l ? 'bg-cyan text-black border-cyan font-semibold' : 'border-border text-muted-foreground hover:text-white hover:border-cyan/40'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mr-2 w-10">Topic:</span>
            {TOPICS.map(t => (
              <button key={t} onClick={() => setTopic(t)}
                className={`px-3 py-1 text-xs rounded border transition-colors ${topic === t ? 'bg-cyan text-black border-cyan font-semibold' : 'border-border text-muted-foreground hover:text-white hover:border-cyan/40'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-muted-foreground mb-6">{filtered.length} GUIDES FOUND</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(guide => (
            <div key={guide.id} className={`border border-border bg-card rounded-lg p-6 flex flex-col gap-3 hover:border-cyan/40 transition-colors group ${guide.premium ? 'relative overflow-hidden' : ''}`}>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[10px] font-mono border rounded-full ${LEVEL_COLORS[guide.level]}`}>
                  {guide.level}
                </span>
                {guide.playbook && <span className="px-2 py-0.5 text-[10px] font-mono border border-cyan/30 text-cyan bg-cyan/5 rounded-full">Playbook</span>}
                {guide.premium && <Lock className="w-3 h-3 text-muted-foreground ml-auto" />}
              </div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{guide.topic.replace(/-/g, ' ')}</div>
              <h3 className="font-heading font-semibold text-white text-base leading-tight group-hover:text-cyan transition-colors">{guide.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed flex-1">{guide.desc}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {guide.time} min
                </div>
                <button className="flex items-center gap-1 text-xs text-cyan font-medium hover:gap-2 transition-all">
                  {guide.premium ? 'Unlock' : 'Read'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}