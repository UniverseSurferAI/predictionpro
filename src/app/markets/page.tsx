"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Clock, Flame } from "lucide-react";

const demoMarkets = [
  { market_id: "demo-btc", question: "Will BTC hit $100,000 before 2026?", yes_price: 0.72, no_price: 0.28, volume: 245000, traders: 2341, end_date: "2025-12-31", category: "Crypto", isHot: true },
  { market_id: "demo-eth", question: "Will ETH hit $5000 by end of 2026?", yes_price: 0.41, no_price: 0.59, volume: 189000, traders: 1234, end_date: "2026-12-31", category: "Crypto", isHot: false },
  { market_id: "demo-meme", question: "Will meme coins survive 2026?", yes_price: 0.65, no_price: 0.35, volume: 156000, traders: 987, end_date: "2026-12-31", category: "Crypto", isHot: false },
  { market_id: "demo-trump", question: "Will Trump win 2024 US Election?", yes_price: 0.58, no_price: 0.42, volume: 523000, traders: 4567, end_date: "2024-11-05", category: "Politics", isHot: true }
];

export default function MarketsPage() {
  const [markets, setMarkets] = useState<any[]>(demoMarkets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchMarkets, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarkets = async () => {
    try {
      const res = await fetch("https://predictionpro-api-752364645771.europe-west1.run.app/api/markets?limit=50");
      const data = await res.json();
      const realMarkets = (data.markets || []).filter((m: any) => m.status === "LIVE");
      // Only show REAL markets - no demo markets
      setMarkets(realMarkets);
    } catch (e) {
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] pb-20">
      <div className="sticky top-0 z-50 bg-[#0a0a1a]/95 border-b border-white/10">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-2xl font-bold text-white">All Markets</h1>
          <p className="text-slate-400 text-sm">{markets.length} active prediction markets</p>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <div className="space-y-4">
          {markets.map((market) => {
            const yesPercent = Math.round((market.yes_price || 0.5) * 100);
            const noPercent = Math.round((market.no_price || 0.5) * 100);
            const isHot = market.isHot || (market.volume || 0) > 200000;
            return (
              <Link key={market.market_id || market.id} href={"/market/" + (market.market_id || market.id)}>
                <div className="bg-[#13132a] rounded-2xl p-5 border border-white/5 hover:border-violet-500/50 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full">{market.category || "Crypto"}</span>
                    {isHot && <span className="flex items-center gap-1 text-xs text-orange-400"><Flame className="w-3 h-3" /> Hot</span>}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-4">{market.question}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 font-medium text-sm w-8">Yes</span>
                      <div className="flex-1 h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{width: yesPercent + "%"}} />
                      </div>
                      <span className="text-green-400 font-bold text-sm w-12 text-right">{yesPercent}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-red-400 font-medium text-sm w-8">No</span>
                      <div className="flex-1 h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full" style={{width: noPercent + "%"}} />
                      </div>
                      <span className="text-red-400 font-bold text-sm w-12 text-right">{noPercent}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <span>${Math.round((market.volume || 100000) / 1000)}K vol</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {(market.traders || 1000).toLocaleString()}</span>
                    </div>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(market.end_date).toLocaleDateString("en-US", {month: "short", day: "numeric"})}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
