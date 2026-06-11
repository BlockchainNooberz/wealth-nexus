import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Bot } from 'lucide-react';

const COLUMNS = [
  { id: 'pending', label: 'Pending Review', color: 'text-yellow-400', icon: Clock },
  { id: 'approved', label: 'Approved', color: 'text-gain', icon: CheckCircle },
  { id: 'rejected', label: 'Rejected', color: 'text-loss', icon: XCircle },
];

function PostCard({ post, onApprove, onReject, onAiReview }) {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    await base44.entities.CommunityPost.update(post.id, { status: 'approved' });
    onApprove(post.id);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    await base44.entities.CommunityPost.update(post.id, { status: 'rejected' });
    onReject(post.id);
    setLoading(false);
  };

  const handleAiReview = async () => {
    setAiLoading(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a content moderator for a financial education platform called SovereignStack. Review this community post for quality, accuracy, and appropriateness. The platform covers crypto, DeFi, wealth strategy, and traditional finance.

Post Title: "${post.title}"
Post Content: "${post.content}"
Category: "${post.category}"
Author: "${post.author_name}"

Evaluate on:
1. Factual accuracy (no misinformation about financial products)
2. Community guidelines (respectful, no spam, no pump-and-dump schemes)
3. Relevance to the platform's topics
4. Quality of content (adds value)

Respond with a JSON object.`,
      response_json_schema: {
        type: 'object',
        properties: {
          score: { type: 'number', description: '0-100 quality score' },
          recommendation: { type: 'string', enum: ['approve', 'reject', 'review'] },
          reason: { type: 'string', description: 'Brief explanation of the recommendation' },
          flags: { type: 'array', items: { type: 'string' }, description: 'Any specific issues flagged' },
        }
      }
    });
    await base44.entities.CommunityPost.update(post.id, {
      ai_score: result.score,
      ai_flag_reason: `${result.recommendation.toUpperCase()} (${result.score}/100): ${result.reason}${result.flags?.length ? ' | Flags: ' + result.flags.join(', ') : ''}`,
    });
    onAiReview(post.id, result);
    setAiLoading(false);
  };

  return (
    <div className={`border rounded-lg p-4 bg-card text-sm mb-3 ${post.status === 'pending' ? 'border-yellow-500/30' : post.status === 'approved' ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="font-heading font-semibold text-white text-sm mb-0.5">{post.title}</div>
          <div className="text-[10px] text-muted-foreground font-mono">{post.author_name} · {post.author_email} · {new Date(post.created_date).toLocaleDateString()}</div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 border border-border rounded text-muted-foreground shrink-0">{post.category}</span>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-3">{post.content}</p>

      {post.ai_flag_reason && (
        <div className={`text-[10px] font-mono px-2 py-1.5 rounded mb-3 border ${post.ai_flag_reason.startsWith('APPROVE') ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : post.ai_flag_reason.startsWith('REJECT') ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'}`}>
          <Bot className="w-3 h-3 inline mr-1" /> AI: {post.ai_flag_reason}
        </div>
      )}

      {post.status === 'pending' && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleAiReview} disabled={aiLoading}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono border border-cyan/40 text-cyan rounded hover:bg-cyan/10 transition-colors disabled:opacity-50">
            <Bot className="w-3 h-3" /> {aiLoading ? 'Analyzing...' : 'AI Review'}
          </button>
          <button onClick={handleApprove} disabled={loading}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono border border-emerald-500/40 text-emerald-400 rounded hover:bg-emerald-500/10 transition-colors disabled:opacity-50">
            <CheckCircle className="w-3 h-3" /> Approve
          </button>
          <button onClick={handleReject} disabled={loading}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono border border-red-500/40 text-red-400 rounded hover:bg-red-500/10 transition-colors disabled:opacity-50">
            <XCircle className="w-3 h-3" /> Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default function Moderation() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    const all = await base44.entities.CommunityPost.list('-created_date', 100);
    setPosts(all);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const handleRefresh = () => { setRefreshing(true); loadPosts(); };

  const handleApprove = (id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  const handleReject = (id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
  const handleAiReview = (id, result) => setPosts(prev => prev.map(p => p.id === id ? {
    ...p,
    ai_score: result.score,
    ai_flag_reason: `${result.recommendation.toUpperCase()} (${result.score}/100): ${result.reason}${result.flags?.length ? ' | Flags: ' + result.flags.join(', ') : ''}`
  } : p));

  const byStatus = (status) => posts.filter(p => p.status === status);

  return (
    <div className="min-h-screen bg-background fade-in">
      <div className="border-b border-border bg-black/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-white text-xl">Moderation Dashboard</h1>
          <p className="text-xs text-muted-foreground font-mono">SovereignStack Content Review</p>
        </div>
        <button onClick={handleRefresh} className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded text-xs text-muted-foreground hover:text-white transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-b border-border">
        {COLUMNS.map(col => {
          const Icon = col.icon;
          const count = byStatus(col.id).length;
          return (
            <div key={col.id} className="px-6 py-4 border-r border-border last:border-r-0 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${col.color}`} />
              <div>
                <div className={`text-2xl font-bold font-mono ${col.color}`}>{count}</div>
                <div className="text-xs text-muted-foreground">{col.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border min-h-screen">
          {COLUMNS.map(col => {
            const Icon = col.icon;
            const colPosts = byStatus(col.id);
            return (
              <div key={col.id} className="bg-background p-4">
                <div className={`flex items-center gap-2 mb-4 text-xs font-mono ${col.color} uppercase tracking-widest`}>
                  <Icon className="w-3.5 h-3.5" />
                  {col.label} ({colPosts.length})
                </div>
                {colPosts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-xs font-mono">No posts</div>
                ) : (
                  colPosts.map(post => (
                    <PostCard key={post.id} post={post}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onAiReview={handleAiReview}
                    />
                  ))
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}