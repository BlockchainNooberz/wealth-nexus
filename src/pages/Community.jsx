import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MessageSquare, ThumbsUp, Plus, X, ChevronDown, ChevronUp, Send, Clock } from 'lucide-react';

const CATEGORIES = ['All', 'crypto-basics', 'defi', 'us-crypto', 'wealth-strategy', 'old-world', 'general'];
const CAT_LABELS = { 'crypto-basics': 'Crypto Basics', 'defi': 'DeFi', 'us-crypto': 'US Crypto', 'wealth-strategy': 'Wealth Strategy', 'old-world': 'Old World', 'general': 'General' };

function PostCard({ post, onReply }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-border bg-card rounded-lg p-5 hover:border-cyan/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
          {post.author_name?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className="text-sm font-medium text-white">{post.author_name}</span>
            {post.category && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono border border-cyan/30 text-cyan bg-cyan/5 rounded">
                {CAT_LABELS[post.category] || post.category}
              </span>
            )}
            {post.is_pinned && <span className="text-[10px] font-mono text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded">📌 PINNED</span>}
            <span className="text-[10px] text-muted-foreground font-mono ml-auto flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {new Date(post.created_date).toLocaleDateString()}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-white mb-1">{post.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {expanded ? post.content : post.content?.slice(0, 200)}
            {post.content?.length > 200 && (
              <button onClick={() => setExpanded(!expanded)} className="text-cyan ml-1 text-xs">
                {expanded ? 'less' : '...more'}
              </button>
            )}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-cyan transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" /> {post.upvotes || 0}
            </button>
            <button onClick={() => onReply(post)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-cyan transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> {post.reply_count || 0} {post.reply_count === 1 ? 'reply' : 'replies'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewPostForm({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.CommunityPost.create({ title, content, author_name: authorName, author_email: authorEmail, category, status: 'pending' });
    setLoading(false);
    setDone(true);
    setTimeout(() => { onClose(); onSubmit(); }, 2000);
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
        <div className="bg-card border border-cyan/40 rounded-xl p-8 max-w-sm text-center">
          <div className="text-3xl mb-3">✓</div>
          <h3 className="font-heading font-bold text-white mb-2">Post Submitted!</h3>
          <p className="text-muted-foreground text-sm">Your post is pending moderation review and will appear once approved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-bold text-white">New Post</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Your Name *</label>
              <input required value={authorName} onChange={e => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm focus:outline-none focus:border-cyan" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Email *</label>
              <input required type="email" value={authorEmail} onChange={e => setAuthorEmail(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm focus:outline-none focus:border-cyan" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm focus:outline-none focus:border-cyan">
              {Object.entries(CAT_LABELS).map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Title *</label>
            <input required value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm focus:outline-none focus:border-cyan" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Content *</label>
            <textarea required value={content} onChange={e => setContent(e.target.value)} rows={5}
              className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm focus:outline-none focus:border-cyan resize-none" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-border rounded text-sm text-muted-foreground hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan text-black font-semibold text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-60">
              <Send className="w-3.5 h-3.5" /> {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">Posts are reviewed by our moderation team before publishing.</p>
        </form>
      </div>
    </div>
  );
}

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [replyPost, setReplyPost] = useState(null);

  const loadPosts = async () => {
    const all = await base44.entities.CommunityPost.filter({ status: 'approved' }, '-created_date', 50);
    setPosts(all);
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">COMMUNITY FORUM</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">The Forum</h1>
              <p className="text-muted-foreground text-lg max-w-xl">Discuss wealth strategies, share insights, and connect with fellow builders. Every post reviewed by our moderation team.</p>
            </div>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan text-black font-semibold text-sm rounded hover:opacity-90 transition-opacity glow-cyan-sm shrink-0">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs rounded border font-mono transition-colors ${activeCategory === cat ? 'bg-cyan text-black border-cyan font-bold' : 'border-border text-muted-foreground hover:text-white hover:border-cyan/40'}`}>
              {cat === 'All' ? 'All Topics' : CAT_LABELS[cat]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 border border-border bg-card rounded-lg animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💬</div>
            <div className="text-muted-foreground">No posts yet in this category.</div>
            <button onClick={() => setShowForm(true)} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cyan text-black font-semibold text-sm rounded">
              <Plus className="w-3.5 h-3.5" /> Be the first to post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} onReply={setReplyPost} />
            ))}
          </div>
        )}
      </section>

      {showForm && <NewPostForm onClose={() => setShowForm(false)} onSubmit={loadPosts} />}
    </div>
  );
}