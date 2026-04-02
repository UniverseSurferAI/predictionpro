"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  History,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample portfolio data
const portfolioData = {
  totalValue: 12.45,
  totalProfit: 3.21,
  profitPercentage: 34.8,
  activePositions: 5,
  resolvedMarkets: 12,
  totalTrades: 47,
};

const activePositions = [
  {
    id: "1",
    market: "Will BTC hit $100K by 2026?",
    position: "YES",
    invested: 2.5,
    currentValue: 3.4,
    profit: 0.9,
    profitPercent: 36,
    endDate: "2025-12-31",
  },
  {
    id: "2",
    market: "Will ETH flip BTC in 2025?",
    position: "NO",
    invested: 1.0,
    currentValue: 1.35,
    profit: 0.35,
    profitPercent: 35,
    endDate: "2025-12-31",
  },
  {
    id: "3",
    market: "Will SOL reach $500 in 2024?",
    position: "YES",
    invested: 0.5,
    currentValue: 0.42,
    profit: -0.08,
    profitPercent: -16,
    endDate: "2024-12-31",
  },
];

const tradeHistory = [
  {
    id: "t1",
    market: "BTC $100K Prediction",
    type: "BUY",
    outcome: "YES",
    amount: 1.5,
    date: "2024-01-15",
    pnl: 0.54,
  },
  {
    id: "t2",
    market: "ETH Flipping BTC",
    type: "SELL",
    outcome: "NO",
    amount: 0.5,
    date: "2024-01-14",
    pnl: 0.18,
  },
  {
    id: "t3",
    market: "SOL $500 Target",
    type: "BUY",
    outcome: "YES",
    amount: 0.25,
    date: "2024-01-13",
    pnl: -0.04,
  },
];

const createdMarkets = [
  {
    id: "m1",
    question: "Will AI replace programmers by 2030?",
    volume: 45600,
    feesEarned: 0.89,
    traders: 234,
    status: "active",
  },
  {
    id: "m2",
    question: "Will Tesla release $25K car in 2024?",
    volume: 123000,
    feesEarned: 2.45,
    traders: 567,
    status: "active",
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"positions" | "history" | "created">(
    "positions"
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Your Portfolio</h1>
        <p className="mt-2 text-slate-400">Track your positions, earnings, and trading history</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Value"
          value={`${portfolioData.totalValue.toFixed(2)} SOL`}
          icon={Wallet}
          trend={`+${portfolioData.profitPercentage}%`}
          positive
        />
        <StatCard
          title="Total Profit"
          value={`+${portfolioData.totalProfit.toFixed(2)} SOL`}
          icon={TrendingUp}
          trend="All time"
          positive
        />
        <StatCard
          title="Active Positions"
          value={portfolioData.activePositions.toString()}
          icon={Award}
          trend={`${portfolioData.resolvedMarkets} resolved`}
        />
        <StatCard
          title="Total Trades"
          value={portfolioData.totalTrades.toString()}
          icon={History}
          trend="Lifetime"
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-slate-800">
        {[
          { id: "positions", label: "Active Positions", count: activePositions.length },
          { id: "history", label: "Trade History", count: tradeHistory.length },
          { id: "created", label: "Created Markets", count: createdMarkets.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-solana-cyan text-solana-cyan"
                : "border-transparent text-slate-500 hover:text-white"
            }`}
          >
            {tab.label}
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
        {activeTab === "positions" && (
          <div className="space-y-4">
            {activePositions.map((position) => (
              <Link key={position.id} href={`/market/${position.id}`}>
                <div className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        position.position === "YES"
                          ? "bg-solana-cyan/20 text-solana-cyan"
                          : "bg-rose-500/20 text-rose-500"
                      }`}
                    >
                      {position.position === "YES" ? (
                        <TrendingUp className="h-6 w-6" />
                      ) : (
                        <TrendingDown className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div>
                      <p className="font-semibold text-white group-hover:text-solana-cyan">
                        {position.market}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span
                          className={
                            position.position === "YES"
                              ? "text-solana-cyan"
                              : "text-rose-500"
                          }
                        >
                          {position.position}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(position.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-white">
                      {position.currentValue.toFixed(2)} SOL
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        position.profit >= 0 ? "text-solana-cyan" : "text-rose-500"
                      }`}
                    >
                      {position.profit >= 0 ? "+" : ""}
                      {position.profit.toFixed(2)} SOL ({position.profitPercent}%)
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-4 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-400">
              <div className="col-span-2">Market</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Date</div>
              <div className="text-right">P&L</div>
            </div>

            {tradeHistory.map((trade) => (
              <div
                key={trade.id}
                className="grid grid-cols-6 items-center gap-4 rounded-lg px-4 py-3 hover:bg-slate-800/30"
              >
                <div className="col-span-2 font-medium text-white">{trade.market}</div>
                <div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      trade.type === "BUY"
                        ? "bg-solana-cyan/20 text-solana-cyan"
                        : "bg-rose-500/20 text-rose-500"
                    }`}
                  >
                    {trade.type} {trade.outcome}
                  </span>
                </div>
                <div className="text-white">{trade.amount} SOL</div>
                <div className="text-slate-400">{trade.date}</div>
                <div
                  className={`text-right font-medium ${
                    trade.pnl >= 0 ? "text-solana-cyan" : "text-rose-500"
                  }`}
                >
                  {trade.pnl >= 0 ? "+" : ""}
                  {trade.pnl.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "created" && (
          <div className="space-y-4">
            {createdMarkets.map((market) => (
              <Link key={market.id} href={`/market/${market.id}`}>
                <div className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700">
                  <div>
                    <p className="font-semibold text-white group-hover:text-solana-cyan">
                      {market.question}
                    </p>
                    <div className="mt-1 flex items-center gap-4 text-sm text-slate-500">
                      <span>${market.volume.toLocaleString()} volume</span>
                      <span>{market.traders} traders</span>
                      <span className="rounded-full bg-solana-cyan/10 px-2 py-0.5 text-xs text-solana-cyan">
                        {market.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-400">Fees earned</p>
                    <p className="text-lg font-bold text-solana-cyan">
                      +{market.feesEarned} SOL
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            <Link href="/create">
              <Button
                variant="outline"
                className="w-full border-dashed border-slate-700 py-8 text-slate-400 hover:border-solana-cyan hover:text-solana-cyan"
              >
                + Create New Market
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  positive,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
      </div>
      
      <p className="text-2xl font-bold text-white">{value}</p>
      
      <p
        className={`mt-1 text-xs ${
          positive ? "text-solana-cyan" : "text-slate-500"
        }`}
      >
        {trend}
      </p>
    </div>
  );
}
