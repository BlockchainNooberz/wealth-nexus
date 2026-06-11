import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-black/60 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 gradient-cyan rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="font-heading font-bold text-white">SOVEREIGN<span className="text-cyan">STACK</span></span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              The definitive platform for building generational wealth across traditional finance and the decentralized economy.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-4">
              Educational purposes only. Not financial advice.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              {[['Home', '/'], ['US Crypto', '/us-crypto'], ['The Atlas', '/atlas'], ['Learn', '/learn']].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-cyan transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Resources</h4>
            <div className="flex flex-col gap-2">
              {[['Playbook', '/playbook'], ['Old World → New', '/old-world'], ['Terminal', '/terminal'], ['Community', '/community']].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-cyan transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© 2026 SovereignStack. All rights reserved.</span>
          <span className="font-mono text-muted-foreground/60">Generational Wealth Hub — Est. 2026</span>
        </div>
      </div>
    </footer>
  );
}