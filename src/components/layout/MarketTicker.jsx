const ASSETS = [
  { symbol: 'BTC/USD', price: '$67,842', change: '+2.4%', up: true },
  { symbol: 'ETH/USD', price: '$3,541', change: '+1.8%', up: true },
  { symbol: 'SOL/USD', price: '$178.40', change: '+4.2%', up: true },
  { symbol: 'XRP/USD', price: '$0.61', change: '+0.9%', up: true },
  { symbol: 'ADA/USD', price: '$0.58', change: '-1.2%', up: false },
  { symbol: 'BNB/USD', price: '$612', change: '+3.1%', up: true },
  { symbol: 'AVAX/USD', price: '$38.70', change: '+5.3%', up: true },
  { symbol: 'S&P 500', price: '5,487', change: '-0.3%', up: false },
  { symbol: 'GOLD', price: '$2,341', change: '+0.6%', up: true },
  { symbol: 'DOW', price: '39,118', change: '-0.1%', up: false },
  { symbol: 'NASDAQ', price: '17,733', change: '+0.4%', up: true },
  { symbol: 'ONDO', price: '$0.93', change: '+2.1%', up: true },
  { symbol: 'HBAR', price: '$0.08', change: '+1.5%', up: true },
];

export default function MarketTicker() {
  const items = [...ASSETS, ...ASSETS];
  return (
    <div className="bg-black border-b border-border overflow-hidden h-7 flex items-center">
      <div className="flex items-center gap-0 ticker-scroll whitespace-nowrap">
        {items.map((asset, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-4 text-[11px] font-mono border-r border-border/40 h-7">
            <span className="text-muted-foreground">{asset.symbol}</span>
            <span className="text-white font-medium">{asset.price}</span>
            <span className={asset.up ? 'text-gain' : 'text-loss'}>{asset.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}