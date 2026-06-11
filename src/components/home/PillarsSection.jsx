import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const PILLARS = [
  { num: '01', tag: 'NEW', label: 'US Crypto Integration', desc: 'XRP, ADA, XLM, HBAR, Ondo — how America is building its financial infrastructure on blockchain rails. The institutional play explained.', path: '/us-crypto' },
  { num: '02', tag: 'Interactive Map', label: 'The Atlas', desc: 'Force-directed visualization of how Bitcoin, DeFi, traditional banking, insurance, and real estate interconnect. Understand capital flows.', path: '/atlas' },
  { num: '03', tag: 'Education', label: 'The Ledger', desc: 'Structured learning from beginner to advanced. Crypto basics, DeFi protocols, self-banking, legacy planning — at your own pace.', path: '/learn' },
  { num: '04', tag: 'Strategy', label: 'Old World → New', desc: 'Whole life insurance, Infinite Banking, self-directed IRAs, and how they connect to DeFi lending. The hybrid wealth system.', path: '/old-world' },
  { num: '05', tag: 'Master Guide', label: 'Wealth Playbook', desc: 'The complete generational wealth system — mindset, asset architecture, crypto strategy, IBC, and legacy planning in one document.', path: '/playbook' },
  { num: '06', tag: 'Live Tools', label: 'The Terminal', desc: 'Compound growth calculators, DeFi yield projectors, Bitcoin DCA scenarios, and live market data. Your financial engine room.', path: '/terminal' },
  { num: '07', tag: 'Community', label: 'The Forum', desc: 'Discuss wealth strategies, share insights, and connect with fellow builders. Moderated for quality. Free and premium tiers.', path: '/community' },
  { num: '08', tag: 'Resources', label: 'The Vault', desc: 'Vetted directory of exchanges, DeFi protocols, books, tools, and trusted external resources — organized by category and experience level.', path: '/resources' },
];

export default function PillarsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-cyan tracking-widest mb-3">EIGHT PILLARS</div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Everything You Need.<br /><span className="text-muted-foreground">Nothing You Don't.</span></h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {PILLARS.map((p) => (
          <Link
            key={p.num}
            to={p.path}
            className="group relative bg-card hover:bg-secondary/80 transition-colors p-6 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono text-muted-foreground">{p.num}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-cyan/30 text-cyan rounded-full">{p.tag}</span>
            </div>
            <h3 className="font-heading font-semibold text-white text-lg leading-tight group-hover:text-cyan transition-colors">{p.label}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed flex-1">{p.desc}</p>
            <div className="flex items-center gap-1 text-xs text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <ArrowUpRight className="w-3 h-3" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        ))}
      </div>
    </section>
  );
}