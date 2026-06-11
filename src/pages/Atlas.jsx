import { useEffect, useRef, useState } from 'react';

const NODES = [
  { id: 'fed', label: 'Federal Reserve', category: 'tradfi', x: 200, y: 300 },
  { id: 'treasury', label: 'US Treasury', category: 'tradfi', x: 280, y: 440 },
  { id: 'banks', label: 'Commercial Banks', category: 'tradfi', x: 150, y: 480 },
  { id: 'usd', label: 'US Dollar (USD)', category: 'tradfi', x: 320, y: 340 },
  { id: 'stocks', label: 'Stock Market', category: 'tradfi', x: 420, y: 250 },
  { id: 'bonds', label: 'Bonds / T-Bills', category: 'tradfi', x: 330, y: 510 },
  { id: 'forex', label: 'Forex Markets', category: 'tradfi', x: 490, y: 410 },
  { id: 'realestate', label: 'Real Estate', category: 'tradfi', x: 120, y: 380 },
  { id: 'life', label: 'Life Insurance', category: 'selfbank', x: 80, y: 560 },
  { id: 'ibc', label: 'Infinite Banking', category: 'selfbank', x: 70, y: 450 },
  { id: 'sdira', label: 'Self-Directed IRA', category: 'selfbank', x: 200, y: 580 },
  { id: 'btc', label: 'Bitcoin (BTC)', category: 'crypto', x: 700, y: 280 },
  { id: 'eth', label: 'Ethereum (ETH)', category: 'crypto', x: 820, y: 360 },
  { id: 'stables', label: 'Stablecoins (USDC)', category: 'crypto', x: 650, y: 430 },
  { id: 'lightning', label: 'Lightning Network', category: 'crypto', x: 760, y: 190 },
  { id: 'btcetf', label: 'Bitcoin ETFs', category: 'crypto', x: 580, y: 290 },
  { id: 'altcoins', label: 'Altcoins (SOL/BNB)', category: 'crypto', x: 900, y: 250 },
  { id: 'rwa', label: 'Real World Assets', category: 'crypto', x: 540, y: 490 },
  { id: 'defilend', label: 'DeFi Lending (Aave)', category: 'defi', x: 920, y: 460 },
  { id: 'dex', label: 'DEX (Uniswap)', category: 'defi', x: 1010, y: 340 },
  { id: 'yield', label: 'Yield Farming', category: 'defi', x: 1020, y: 490 },
  { id: 'liquidity', label: 'Liquidity Pools', category: 'defi', x: 950, y: 570 },
  { id: 'daos', label: 'DAOs', category: 'defi', x: 870, y: 560 },
];

const EDGES = [
  ['fed', 'usd'], ['fed', 'bonds'], ['fed', 'banks'], ['usd', 'stocks'], ['usd', 'forex'],
  ['treasury', 'bonds'], ['banks', 'realestate'], ['banks', 'usd'],
  ['life', 'ibc'], ['ibc', 'btc'], ['ibc', 'realestate'], ['sdira', 'btc'], ['sdira', 'bonds'],
  ['btc', 'lightning'], ['btc', 'btcetf'], ['btcetf', 'stocks'],
  ['eth', 'defilend'], ['eth', 'dex'], ['eth', 'stables'],
  ['stables', 'defilend'], ['stables', 'usd'], ['stables', 'rwa'],
  ['defilend', 'liquidity'], ['dex', 'liquidity'], ['liquidity', 'yield'],
  ['altcoins', 'dex'], ['rwa', 'bonds'], ['rwa', 'realestate'], ['daos', 'defilend'],
  ['btc', 'stables'], ['ibc', 'defilend'],
];

const CAT_COLORS = {
  tradfi: '#64748b',
  crypto: '#00c8ff',
  defi: '#3b82f6',
  selfbank: '#f59e0b',
};

const FILTERS = ['All Nodes', 'Traditional Finance', 'Cryptocurrency', 'DeFi Protocols', 'Self-Banking'];
const FILTER_MAP = { 'All Nodes': null, 'Traditional Finance': 'tradfi', 'Cryptocurrency': 'crypto', 'DeFi Protocols': 'defi', 'Self-Banking': 'selfbank' };

export default function Atlas() {
  const [filter, setFilter] = useState('All Nodes');
  const [selected, setSelected] = useState(null);
  const [pan, setPan] = useState({ x: -60, y: -80 });
  const [zoom, setZoom] = useState(0.75);
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const catFilter = FILTER_MAP[filter];
  const visibleNodes = catFilter ? NODES.filter(n => n.category === catFilter) : NODES;
  const visibleIds = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = EDGES.filter(([a, b]) => visibleIds.has(a) && visibleIds.has(b));
  const selectedNode = NODES.find(n => n.id === selected);
  const connectedIds = selected ? new Set(EDGES.filter(([a, b]) => a === selected || b === selected).flatMap(([a, b]) => [a, b])) : null;

  const handleMouseDown = (e) => { dragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; };
  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    setPan(p => ({ x: p.x + (e.clientX - lastMouse.current.x), y: p.y + (e.clientY - lastMouse.current.y) }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => { dragging.current = false; };
  const handleWheel = (e) => { e.preventDefault(); setZoom(z => Math.max(0.4, Math.min(2, z - e.deltaY * 0.001))); };

  useEffect(() => {
    const el = svgRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">INTERACTIVE VISUALIZATION</div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">The Atlas</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Visualize the connections between cryptocurrency, decentralized finance, traditional banking, insurance vehicles, and the broader global economy.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mr-2">Filter:</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => { setFilter(f); setSelected(null); }}
              className={`px-3 py-1 text-xs rounded border transition-colors ${filter === f ? 'bg-cyan text-black border-cyan font-semibold' : 'border-border text-muted-foreground hover:text-white hover:border-cyan/40'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.entries(CAT_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="capitalize">{cat === 'tradfi' ? 'Traditional Finance' : cat === 'selfbank' ? 'Self-Banking' : cat === 'defi' ? 'DeFi Protocols' : 'Cryptocurrency'}</span>
            </div>
          ))}
        </div>

        {/* SVG Canvas */}
        <div className="border border-border rounded-lg bg-card overflow-hidden relative" style={{ height: '600px' }}>
          <svg
            ref={svgRef}
            width="100%" height="100%"
            className="cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
              {/* Edges */}
              {visibleEdges.map(([a, b]) => {
                const na = NODES.find(n => n.id === a);
                const nb = NODES.find(n => n.id === b);
                const isHighlighted = connectedIds && connectedIds.has(a) && connectedIds.has(b);
                return (
                  <line key={`${a}-${b}`}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={isHighlighted ? '#00c8ff' : 'hsl(0 0% 20%)'}
                    strokeWidth={isHighlighted ? 1.5 : 0.8}
                    strokeDasharray={nb.category === 'defi' ? '4,3' : undefined}
                    opacity={selected && !isHighlighted ? 0.2 : 0.7}
                  />
                );
              })}
              {/* Nodes */}
              {visibleNodes.map(node => {
                const color = CAT_COLORS[node.category];
                const isSelected = node.id === selected;
                const isConnected = connectedIds && connectedIds.has(node.id);
                const dim = selected && !isSelected && !isConnected;
                return (
                  <g key={node.id} transform={`translate(${node.x},${node.y})`}
                    onClick={() => setSelected(selected === node.id ? null : node.id)}
                    className="cursor-pointer">
                    <circle r={isSelected ? 14 : 10} fill={color} opacity={dim ? 0.2 : 0.9}
                      stroke={isSelected ? '#fff' : 'transparent'} strokeWidth={2} />
                    {isSelected && <circle r={20} fill="none" stroke={color} strokeWidth={1} opacity={0.4} />}
                    <text y={22} textAnchor="middle" fontSize={9} fill={dim ? '#444' : '#aaa'}
                      className="font-mono pointer-events-none">
                      {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {!selected && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground bg-black/60 px-3 py-1.5 rounded-full border border-border">
              Click any node to explore connections · Drag to pan · Scroll to zoom
            </div>
          )}

          {selected && selectedNode && (
            <div className="absolute top-4 right-4 w-56 bg-card/95 border border-cyan/40 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-mono text-cyan uppercase tracking-widest">Node</div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-white text-xs">✕</button>
              </div>
              <div className="font-heading font-semibold text-white text-sm">{selectedNode.label}</div>
              <div className="text-xs text-muted-foreground mt-1 capitalize">{selectedNode.category === 'tradfi' ? 'Traditional Finance' : selectedNode.category === 'selfbank' ? 'Self-Banking / Insurance' : selectedNode.category === 'defi' ? 'DeFi Protocols' : 'Cryptocurrency'}</div>
              <div className="mt-3 text-xs text-muted-foreground">
                <span className="text-cyan font-mono">{EDGES.filter(([a, b]) => a === selected || b === selected).length}</span> connections
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}