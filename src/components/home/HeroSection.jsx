import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Globe } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      {/* Glow orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan/30 bg-cyan/5 rounded-full text-cyan text-xs font-mono tracking-widest mb-8">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
            GENERATIONAL WEALTH HUB — EST. 2026
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-6">
            <span className="text-white">BUILD WEALTH</span>
            <br />
            <span className="text-cyan">ACROSS BOTH</span>
            <br />
            <span className="text-white">WORLDS.</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Traditional wealth strategies. Crypto sovereignty. DeFi yield. RWA tokenization. US financial integration. One platform — no gatekeepers.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/us-crypto" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-black font-semibold text-sm rounded hover:opacity-90 transition-all glow-cyan-sm">
              US Crypto Integration <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/learn" className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-white/5 text-white font-semibold text-sm rounded hover:bg-white/10 transition-all">
              Start Learning
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: Globe, value: '$16T', label: 'RWA Market by 2030', sub: 'Boston Consulting Group' },
              { icon: TrendingUp, value: '350+', label: 'Banks on Ripple Rails', sub: 'Ripple Q1 2026' },
              { icon: Shield, value: '100%', label: 'Free — Always', sub: 'Core content' },
            ].map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="border border-border/60 bg-card/60 backdrop-blur-sm rounded-lg p-4">
                <Icon className="w-4 h-4 text-cyan mb-2" />
                <div className="text-2xl font-bold font-heading text-white">{value}</div>
                <div className="text-xs text-foreground/80 font-medium mt-0.5">{label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}