"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OraclePriceData {
  symbol: string;
  prices: {
    coincap: number | null;
    cryptocompare: number | null;
    binance: number | null;
    coinbase: number | null;
  };
  prices_count: number;
  consensus: number | null;
  confidence: number;
  timestamp: string;
}

const COINS = [
  { symbol: "SOL", name: "Solana", icon: "◎" },
  { symbol: "BTC", name: "Bitcoin", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  { symbol: "BNB", name: "BNB", icon: "◻" },
  { symbol: "ADA", name: "Cardano", icon: "₳" },
  { symbol: "XRP", name: "Ripple", icon: "✕" },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð" },
];

const API_URL = "https://predictionpro-api-752364645771.europe-west1.run.app";

export function OraclePriceSection() {
  const [priceData, setPriceData] = useState<Record<string, OraclePriceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const promises = COINS.map(coin =>
        fetch(`${API_URL}/api/oracle/price/${coin.symbol}`)
          .then(res => res.ok ? res.json() : null)
          .catch(() => null)
      );
      
      const results = await Promise.all(promises);
      const newData: Record<string, OraclePriceData> = {};
      
      results.forEach((data, i) => {
        if (data) {
          newData[COINS[i].symbol] = data;
        }
      });
      
      setPriceData(newData);
    } catch (err) {
      setError("Oracle temporarily unavailable");
      console.error("Oracle fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number | null) => {
    if (price === null) return "—";
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-400";
    if (confidence >= 85) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-white">AI Oracle</h2>
            <p className="text-slate-400">
              Quadruple-verified prices from 4 independent sources. Auto-refreshes every 30 seconds.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPrices}
            disabled={loading}
            className="border-slate-700 bg-slate-900/50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {error ? (
          <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-6">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COINS.map((coin) => {
              const data = priceData[coin.symbol];
              const isLoading = loading && !data;
              
              return (
                <div
                  key={coin.symbol}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                      <span className="text-2xl">{coin.icon}</span>
                      {coin.name} ({coin.symbol})
                    </h3>
                    {data?.confidence && data.confidence >= 85 && (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    )}
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-solana-cyan" />
                    </div>
                  ) : data ? (
                    <>
                      <div className="mb-4 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {formatPrice(data.consensus)}
                        </span>
                        <span className={`text-sm font-medium ${getConfidenceColor(data.confidence)}`}>
                          {data.confidence.toFixed(1)}% confidence
                        </span>
                      </div>

                      <div className="space-y-2 rounded-lg bg-slate-950/50 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Coinbase</span>
                          <span className={data.prices.coinbase ? "text-white" : "text-slate-600"}>
                            {formatPrice(data.prices.coinbase)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">CryptoCompare</span>
                          <span className="text-white">{formatPrice(data.prices.cryptocompare)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Binance</span>
                          <span className="text-white">{formatPrice(data.prices.binance)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">CoinCap</span>
                          <span className={data.prices.coincap ? "text-white" : "text-slate-600"}>
                            {formatPrice(data.prices.coincap)}
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-slate-500">
                        Updated: {new Date(data.timestamp).toLocaleTimeString()}
                      </p>
                    </>
                  ) : (
                    <div className="py-4 text-center text-slate-500">
                      Price unavailable
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Sources: Coinbase, CryptoCompare, Binance, CoinCap. Auto-resolves markets when 3/4 sources agree.
          </p>
        </div>
      </div>
    </section>
  );
}
