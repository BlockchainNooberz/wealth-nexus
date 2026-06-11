import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TRUTHS = [
  {
    num: '01',
    title: 'The Shift Is Happening',
    body: 'The US government, Wall Street, and global banks are moving their infrastructure on-chain. XRP for bank settlements. Stellar for CBDCs. Hedera for government supply chains. Ondo for tokenized Treasuries. This is not speculation — it\'s procurement.',
    link: '/us-crypto',
    linkLabel: 'Read the Integration Report',
  },
  {
    num: '02',
    title: 'Old Money Principles Still Win',
    body: 'Infinite Banking, whole life insurance, self-directed IRAs, and compound growth are not disrupted by crypto — they are amplified by it. The wealthiest families in America use both systems simultaneously. Now you can too.',
    link: '/old-world',
    linkLabel: 'Old World → New World',
  },
  {
    num: '03',
    title: 'Generational, Not Transactional',
    body: 'We reject the casino mindset. Generational wealth is built with systems — asset allocation, tax-advantaged structures, self-custody, and legacy planning — that compound over decades, not days.',
    link: '/playbook',
    linkLabel: 'The Wealth Playbook',
  },
];

export default function ThesisSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">OUR THESIS</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Three Truths About<br /><span className="text-muted-foreground">Modern Wealth</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUTHS.map((t) => (
            <div key={t.num} className="border border-border bg-card rounded-lg p-6 flex flex-col gap-4 hover:border-cyan/40 transition-colors group">
              <span className="text-xs font-mono text-cyan">{t.num}</span>
              <h3 className="font-heading font-bold text-white text-xl">{t.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t.body}</p>
              <Link to={t.link} className="inline-flex items-center gap-1.5 text-cyan text-xs font-medium hover:gap-3 transition-all">
                {t.linkLabel} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 border border-cyan/20 bg-cyan/5 rounded-lg p-8 text-center">
          <blockquote className="text-xl sm:text-2xl font-display text-white italic leading-relaxed max-w-3xl mx-auto">
            "The best time to build wealth was 20 years ago. The second best time is today — with the right infrastructure."
          </blockquote>
          <cite className="block mt-4 text-xs font-mono text-cyan tracking-widest">— SOVEREIGNSTACK</cite>
        </div>
      </div>
    </section>
  );
}