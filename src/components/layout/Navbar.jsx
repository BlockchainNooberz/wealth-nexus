import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import MarketTicker from '@/components/layout/MarketTicker';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'US Crypto', path: '/us-crypto', badge: 'NEW' },
  { label: 'The Atlas', path: '/atlas' },
  { label: 'Learn', path: '/learn' },
  { label: 'Playbook', path: '/playbook' },
  { label: 'Old World → New', path: '/old-world' },
  { label: 'Terminal', path: '/terminal' },
  { label: 'Community', path: '/community' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <MarketTicker />
      <nav className="bg-black/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 gradient-cyan rounded flex items-center justify-center glow-cyan-sm">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <div className="leading-none">
              <div className="text-sm font-bold font-heading text-white tracking-wide">SOVEREIGN<span className="text-cyan">STACK</span></div>
              <div className="text-[9px] text-muted-foreground tracking-widest uppercase font-mono">Generational Wealth Hub</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-sm ${
                  location.pathname === link.path
                    ? 'text-cyan bg-cyan/10'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 px-1 py-0.5 text-[9px] bg-cyan text-black font-bold rounded-sm font-mono">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/community" className="px-4 py-1.5 text-xs font-semibold font-heading bg-cyan text-black rounded hover:opacity-90 transition-opacity glow-cyan-sm">
              JOIN FREE
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-muted-foreground hover:text-white">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t border-border bg-black/95 px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                  location.pathname === link.path
                    ? 'text-cyan bg-cyan/10'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-2 px-1 py-0.5 text-[9px] bg-cyan text-black font-bold rounded font-mono">{link.badge}</span>
                )}
              </Link>
            ))}
            <Link to="/community" onClick={() => setOpen(false)} className="mt-2 px-4 py-2 text-sm font-semibold bg-cyan text-black rounded text-center">
              JOIN FREE
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}