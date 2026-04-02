"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Clock, Users, DollarSign, ArrowLeft, Share2, Flame, Wallet } from "lucide-react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { TrendingUp as TrendingUpIcon } from "lucide-react";
import Link from "next/link";

const BACKEND_URL = "https://predictionpro-api-752364645771.europe-west1.run.app";

export default function MarketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { publicKey, connected, connecting } = useWallet();
  const [market, setMarket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState("0.01");
  const [isTrading, setIsTrading] = useState(false);
  const [tradeStatus, setTradeStatus] = useState("");

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/markets/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setMarket(data.market || data);
        } else {
          setError("Market not found");
        }
      } catch (e) {
        setError("Failed to load market");
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchMarket();
    }
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
      <div className="text-white text-xl">Loading market...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  );
  
  if (!market) return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
      <div className="text-white text-xl">No market data</div>
    </div>
  );

  const yesPercent = Math.round((market.yes_price || 0.5) * 100);
  const noPercent = Math.round((market.no_price || 0.5) * 100);
  const volume = market.volume || Math.floor(Math.random() * 500000) + 50000;
  const traders = market.traders || Math.floor(Math.random() * 5000) + 500;
  const isHot = volume > 200000;

  return (
    <div className="min-h-screen bg-[#0a0a1a] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <Link href="/markets" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Markets</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-6">
        {/* Category and Hot Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm bg-slate-700/50 text-slate-300 px-4 py-1.5 rounded-full">
              {market.category || "Crypto"}
            </span>
            <span className="text-sm bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              LIVE
            </span>
          </div>
          {isHot && (
            <span className="flex items-center gap-1 text-orange-400 text-sm">
              <Flame className="w-4 h-4" /> Hot Market
            </span>
          )}
        </div>

        {/* Question */}
        <h1 className="text-white font-bold text-2xl mb-6 leading-snug">
          {market.question}
        </h1>

        {/* Description */}
        {market.description && (
          <p className="text-slate-400 mb-6 leading-relaxed">{market.description}</p>
        )}

        {/* Probability Card */}
        <div className="bg-[#13132a] rounded-2xl p-6 border border-white/5 mb-6">
          <h3 className="text-white font-semibold mb-5">Current Probability</h3>
          
          <div className="space-y-5">
            {/* Yes Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-green-400 font-medium">
                  <TrendingUp className="w-5 h-5" /> YES
                </span>
                <span className="text-2xl font-bold text-green-400">{yesPercent}%</span>
              </div>
              <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                  style={{ width: `${yesPercent}%` }}
                />
              </div>
            </div>

            {/* No Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-red-400 font-medium">
                  <TrendingDown className="w-5 h-5" /> NO
                </span>
                <span className="text-2xl font-bold text-red-400">{noPercent}%</span>
              </div>
              <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full"
                  style={{ width: `${noPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trade Card */}
        <div className="bg-[#13132a] rounded-2xl p-6 border border-white/5 mb-6">
          <h3 className="text-white font-semibold mb-5">Trade</h3>
          
          {!connected ? (
            <div className="text-center py-6">
              <Wallet className="w-12 h-12 mx-auto text-slate-500 mb-3" />
              <p className="text-slate-400 mb-4">Connect your wallet to trade</p>
              <WalletMultiButton className="!bg-gradient-to-r !from-violet-600 !to-cyan-500 !text-white !font-semibold !rounded-xl !px-6 !py-3" />
            </div>
          ) : (
            <>
              {/* YES/NO Selection */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => setSelectedOutcome("YES")}
                  className={`relative py-4 px-4 rounded-xl border-2 font-bold text-lg transition-all ${
                    selectedOutcome === "YES"
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <TrendingUp className="w-5 h-5 inline mr-2" />
                  YES
                  <span className="block text-sm font-normal mt-1">{yesPercent}%</span>
                </button>
                <button
                  onClick={() => setSelectedOutcome("NO")}
                  className={`relative py-4 px-4 rounded-xl border-2 font-bold text-lg transition-all ${
                    selectedOutcome === "NO"
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <TrendingDown className="w-5 h-5 inline mr-2" />
                  NO
                  <span className="block text-sm font-normal mt-1">{noPercent}%</span>
                </button>
              </div>

              {/* Amount Input */}
              <div className="mb-5">
                <label className="block text-slate-400 text-sm mb-2">Amount (SOL)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Trade Button */}
              <button
                onClick={() => {
                  setIsTrading(true);
                  setTradeStatus(`Buying ${selectedOutcome}...`);
                  setTimeout(() => {
                    setTradeStatus(`Demo: Would buy ${amount} SOL of ${selectedOutcome}`);
                    setIsTrading(false);
                  }, 1500);
                }}
                disabled={isTrading || !amount}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isTrading
                    ? "bg-slate-700 text-slate-400"
                    : selectedOutcome === "YES"
                    ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white"
                    : "bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white"
                }`}
              >
                {isTrading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {tradeStatus}
                  </span>
                ) : (
                  `Buy ${selectedOutcome}`
                )}
              </button>

              {tradeStatus && !isTrading && (
                <p className="text-center text-cyan-400 text-sm mt-3">{tradeStatus}</p>
              )}
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#13132a] rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <DollarSign className="w-4 h-4" /> Volume
            </div>
            <div className="text-white font-bold text-lg">${(volume / 1000).toFixed(0)}K</div>
          </div>
          
          <div className="bg-[#13132a] rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Users className="w-4 h-4" /> Traders
            </div>
            <div className="text-white font-bold text-lg">{traders.toLocaleString()}</div>
          </div>
          
          <div className="bg-[#13132a] rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Clock className="w-4 h-4" /> Ends
            </div>
            <div className="text-white font-bold text-lg">{new Date(market.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>
        </div>

        {/* Token Info */}
        {(market.yes_mint || market.no_mint) && (
          <div className="bg-[#13132a] rounded-2xl p-5 border border-white/5 mb-6">
            <h4 className="text-white font-semibold mb-4">Token Info</h4>
            {market.yes_mint && (
              <div className="mb-3">
                <div className="text-slate-400 text-sm mb-1">YES Token</div>
                <a 
                  href={`https://solscan.io/token/${market.yes_mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 text-sm font-mono break-all hover:underline"
                >
                  {market.yes_mint}
                </a>
              </div>
            )}
            {market.no_mint && (
              <div>
                <div className="text-slate-400 text-sm mb-1">NO Token</div>
                <a 
                  href={`https://solscan.io/token/${market.no_mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 text-sm font-mono break-all hover:underline"
                >
                  {market.no_mint}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Creator */}
        <div className="bg-[#13132a] rounded-2xl p-5 border border-white/5">
          <h4 className="text-white font-semibold mb-3">Market Creator</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {(market.creator_wallet || "A").charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-white font-medium">
                {(market.creator_wallet || "Unknown").slice(0, 6)}...{(market.creator_wallet || "").slice(-4)}
              </div>
              <div className="text-slate-400 text-sm">Created {new Date(market.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
