import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    const existing = await base44.entities.NewsletterSubscriber.filter({ email });
    if (existing.length === 0) {
      await base44.entities.NewsletterSubscriber.create({ email, name, status: 'active', tier: 'free' });
    }
    setLoading(false);
    setDone(true);
  };

  return (
    <section className="border-t border-border py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-xs font-mono text-cyan tracking-widest mb-3">WEEKLY INSIGHTS</div>
        <h2 className="text-3xl font-display font-bold text-white mb-3">The SovereignStack Brief</h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Weekly wealth insights delivered to your inbox. Market analysis, DeFi updates, strategy deep-dives, and what the smart money is doing — free, every Sunday.
        </p>

        {done ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan/10 border border-cyan/40 rounded-lg text-cyan font-medium">
            <CheckCircle className="w-4 h-4" />
            You're on the list. Welcome to the stack.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="First name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-card border border-border rounded text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan transition-colors"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-[2] px-4 py-2.5 bg-card border border-border rounded text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan text-black font-semibold text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-60 glow-cyan-sm"
            >
              {loading ? 'Joining...' : <><Send className="w-3.5 h-3.5" /> Subscribe</>}
            </button>
          </form>
        )}
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        <p className="text-muted-foreground/60 text-xs mt-3">No spam. Unsubscribe anytime. 100% free.</p>
      </div>
    </section>
  );
}