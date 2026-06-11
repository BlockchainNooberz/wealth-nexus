import { useState } from 'react';

const MARKET_DATA = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,842', change: '+2.4%', up: true, mcap: '$1.34T', vol: '$38.2B' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,541', change: '+1.8%', up: true, mcap: '$426B', vol: '$18.1B' },
  { symbol: 'SOL', name: 'Solana', price: '$178.40', change: '+4.2%', up: true, mcap: '$84B', vol: '$5.7B' },
  { symbol: 'BNB', name: 'BNB', price: '$612.30', change: '+3.1%', up: true, mcap: '$90B', vol: '$2.1B' },
  { symbol: 'ADA', name: 'Cardano', price: '$0.58', change: '-1.2%', up: false, mcap: '$20B', vol: '$480M' },
  { symbol: 'XRP', name: 'XRP', price: '$0.61', change: '+0.9%', up: true, mcap: '$34B', vol: '$1.2B' },
  { symbol: 'AVAX', name: 'Avalanche', price: '$38.70', change: '+5.3%', up: true, mcap: '$16B', vol: '$890M' },
  { symbol: 'DOT', name: 'Polkadot', price: '$8.90', change: '-0.7%', up: false, mcap: '$11B', vol: '$320M' },
];

function CompoundCalc() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  let balance = initial;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + rate / 100 / 12) + monthly;
    }
  }
  const totalContrib = initial + monthly * 12 * years;
  const gains = balance - totalContrib;

  return (
    <div className="border border-border bg-card rounded-lg p-6">
      <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-1">Calculator</div>
      <h3 className="font-heading font-semibold text-white mb-5">Compound Growth</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Initial Investment', value: initial, setter: setInitial, prefix: '$' },
          { label: 'Monthly Contribution', value: monthly, setter: setMonthly, prefix: '$' },
          { label: 'Annual Return (%)', value: rate, setter: setRate, suffix: '%' },
          { label: 'Time Horizon (Years)', value: years, setter: setYears, suffix: ' yrs' },
        ].map(({ label, value, setter, prefix, suffix }) => (
          <div key={label}>
            <label className="text-xs text-muted-foreground block mb-1">{label}</label>
            <input type="number" value={value} onChange={e => setter(Number(e.target.value))}
              className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm font-mono focus:outline-none focus:border-cyan transition-colors" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-3 text-center">
          <div className="text-lg font-bold font-mono text-white">${Math.round(balance).toLocaleString()}</div>
          <div className="text-[10px] text-cyan font-mono mt-0.5">Total Portfolio</div>
        </div>
        <div className="bg-muted rounded-lg p-3 text-center">
          <div className="text-base font-bold font-mono text-white">${Math.round(totalContrib).toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Total Contributed</div>
        </div>
        <div className="bg-muted rounded-lg p-3 text-center">
          <div className="text-base font-bold font-mono text-gain">${Math.round(gains).toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Compound Gains</div>
        </div>
      </div>
    </div>
  );
}

function DeFiCalc() {
  const [deposit, setDeposit] = useState(50000);
  const [apy, setApy] = useState(8);
  const [months, setMonths] = useState(12);
  const [compound, setCompound] = useState(true);

  let result;
  if (compound) {
    result = deposit * Math.pow(1 + apy / 100 / 12, months) - deposit;
  } else {
    result = deposit * (apy / 100) * (months / 12);
  }

  return (
    <div className="border border-border bg-card rounded-lg p-6">
      <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-1">Calculator</div>
      <h3 className="font-heading font-semibold text-white mb-5">DeFi Yield Projector</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Deposit Amount</label>
          <input type="number" value={deposit} onChange={e => setDeposit(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm font-mono focus:outline-none focus:border-cyan" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Annual APY (%)</label>
          <input type="number" value={apy} onChange={e => setApy(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm font-mono focus:outline-none focus:border-cyan" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Duration (Months)</label>
          <input type="number" value={months} onChange={e => setMonths(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm font-mono focus:outline-none focus:border-cyan" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={compound} onChange={e => setCompound(e.target.checked)} className="accent-cyan" />
            <span className="text-xs text-muted-foreground">Compound Interest</span>
          </label>
        </div>
      </div>
      <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-4">
        <div className="text-xs text-muted-foreground mb-1">Projected Yield</div>
        <div className="text-2xl font-bold font-mono text-white">${Math.round(result).toLocaleString()}</div>
        <div className="text-xs text-muted-foreground mt-1">Total value: ${(deposit + Math.round(result)).toLocaleString()}</div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-3">⚠ DeFi yields fluctuate. This projection uses a fixed APY for illustration only. Always research protocol risk before depositing.</p>
    </div>
  );
}

function DCACalc() {
  const [weekly, setWeekly] = useState(50);
  const [period, setPeriod] = useState(5);

  const totalInvested = weekly * 52 * period;
  const scenarios = [
    { label: 'Conservative', pct: 30, color: 'text-yellow-400' },
    { label: 'Moderate', pct: 60, color: 'text-cyan' },
    { label: 'Historical', pct: 100, color: 'text-gain', note: 'BTC 2015–2024 avg' },
  ];

  function dcaResult(weeklyAmt, years, annualReturn) {
    const weeklyRate = annualReturn / 52;
    const weeks = years * 52;
    return weeklyAmt * ((Math.pow(1 + weeklyRate, weeks) - 1) / weeklyRate);
  }

  return (
    <div className="border border-border bg-card rounded-lg p-6">
      <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-1">Calculator</div>
      <h3 className="font-heading font-semibold text-white mb-5">Bitcoin DCA Projector</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Weekly Investment</label>
          <input type="number" value={weekly} onChange={e => setWeekly(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm font-mono focus:outline-none focus:border-cyan" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Investment Period (Years)</label>
          <input type="number" value={period} onChange={e => setPeriod(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-white text-sm font-mono focus:outline-none focus:border-cyan" />
        </div>
      </div>
      <div className="text-xs text-muted-foreground mb-3">Total Invested: <span className="text-white font-mono">${totalInvested.toLocaleString()}</span></div>
      <div className="space-y-3">
        {scenarios.map(sc => (
          <div key={sc.label} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-muted-foreground">{sc.label}</span>
              {sc.note && <span className="text-[10px] text-muted-foreground">{sc.note}</span>}
            </div>
            <div className="text-xs text-muted-foreground mb-1">{sc.pct}% avg annual return</div>
            <div className={`text-xl font-bold font-mono ${sc.color}`}>${Math.round(dcaResult(weekly, period, sc.pct / 100)).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-3">Past performance does not guarantee future results. Educational illustration only.</p>
    </div>
  );
}

export default function Terminal() {
  return (
    <div className="fade-in">
      <section className="border-b border-border py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_14%/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_14%/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono text-cyan tracking-widest mb-3">LIVE DATA & CALCULATORS</div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">The Terminal</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Real-time market data, compound growth calculators, DeFi yield projectors, and Bitcoin DCA scenarios — your financial engine room.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Market table */}
        <div className="mb-14">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Live Market Snapshot</div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {['Asset', 'Price', '24h Change', 'Market Cap', 'Volume'].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MARKET_DATA.map((row, i) => (
                  <tr key={row.symbol} className={`border-b border-border/40 hover:bg-secondary/50 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                          {row.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{row.symbol}</div>
                          <div className="text-[10px] text-muted-foreground">{row.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-white">{row.price}</td>
                    <td className="px-4 py-3 text-sm font-mono">
                      <span className={row.up ? 'text-gain' : 'text-loss'}>{row.change}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{row.mcap}</td>
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{row.vol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 font-mono">Data for illustration purposes.</p>
        </div>

        {/* Calculators */}
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Financial Calculators</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CompoundCalc />
          <DeFiCalc />
          <DCACalc />
        </div>
      </section>
    </div>
  );
}