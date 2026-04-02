"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Plus,
  ExternalLink,
  BarChart3,
  Flame,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample Bags ecosystem data (replace with real API calls)
const bagsTokens = [
  {
    id: "bags1",
    name: "Bags Meme Coin",
    symbol: "BAGS",
    image: "https://img.freepik.com/premium-vector/white-abstract-vactor-background-design_665257-153.jpg",
    price: 0.045,
    marketCap: 450000,
    volume24h: 89000,
    holders: 1234,
    creator: "bags_creator_1",
    creatorName: "BagsOfficial",
    createdAt: "2024-03-10",
    change24h: 23.5,
    isNew: true,
    trending: true,
  },
  {
    id: "bags2",
    name: "Solana Summer",
    symbol: "SUMMER",
    image: "https://img.freepik.com/premium-vector/white-abstract-vactor-background-design_665257-153.jpg",
    price: 0.12,
    marketCap: 1200000,
    volume24h: 234000,
    holders: 3456,
    creator: "creator_2",
    creatorName: "SolMaxi",
    createdAt: "2024-03-09",
    change24h: 45.2,
    isNew: false,
    trending: true,
  },
  {
    id: "bags3",
    name: "Crypto Punkz",
    symbol: "PUNKZ",
    image: "https://img.freepik.com/premium-vector/white-abstract-vactor-background-design_665257-153.jpg",
    price: 0.008,
    marketCap: 80000,
    volume24h: 12000,
    holders: 567,
    creator: "creator_3",
    creatorName: "NFTWhale",
    createdAt: "2024-03-12",
    change24h: -12.3,
    isNew: true,
    trending: false,
  },
  {
    id: "bags4",
    name: "AI Revolution",
    symbol: "AIREV",
    image: "https://img.freepik.com/premium-vector/white-abstract-vactor-background-design_665257-153.jpg",
    price: 0.23,
    marketCap: 2300000,
    volume24h: 456000,
    holders: 6789,
    creator: "creator_4",
    creatorName: "AITrader",
    createdAt: "2024-03-08",
    change24h: 67.8,
    isNew: false,
    trending: true,
  },
  {
    id: "bags5",
    name: "DeFi Yield",
    symbol: "YIELD",
    image: "https://img.freepik.com/premium-vector/white-abstract-vactor-background-design_665257-153.jpg",
    price: 0.056,
    marketCap: 560000,
    volume24h: 78000,
    holders: 1890,
    creator: "creator_5",
    creatorName: "YieldFarmer",
    createdAt: "2024-03-11",
    change24h: 15.4,
    isNew: true,
    trending: false,
  },
  {
    id: "bags6",
    name: "Metaverse Land",
    symbol: "LAND",
    image: "https://img.freepik.com/premium-vector/white-abstract-vactor-background-design_665257-153.jpg",
    price: 0.34,
    marketCap: 3400000,
    volume24h: 567000,
    holders: 8901,
    creator: "creator_6",
    creatorName: "MetaBuilder",
    createdAt: "2024-03-07",
    change24h: -5.2,
    isNew: false,
    trending: true,
  },
];

const topCreators = [
  { name: "BagsOfficial", tokens: 12, volume: 2400000, followers: 5678 },
  { name: "SolMaxi", tokens: 8, volume: 1800000, followers: 3456 },
  { name: "AITrader", tokens: 6, volume: 1200000, followers: 2890 },
  { name: "MetaBuilder", tokens: 5, volume: 980000, followers: 2100 },
];

export default function EcosystemPage() {
  const [activeTab, setActiveTab] = useState<"tokens" | "creators" | "analytics">("tokens");
  const [filter, setFilter] = useState<"all" | "new" | "trending">("all");

  const filteredTokens = bagsTokens.filter((token) => {
    if (filter === "new") return token.isNew;
    if (filter === "trending") return token.trending;
    return true;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-solana-purple to-solana-cyan">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Bags Ecosystem</h1>
            <p className="text-slate-400">
              Discover tokens launched on Bags Protocol • {bagsTokens.length} tokens • 
              {formatNumber(bagsTokens.reduce((acc, t) => acc + t.volume24h, 0))} 24h volume
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tokens"
          value={bagsTokens.length.toString()}
          icon={BarChart3}
          trend="+12 this week"
        />
        <StatCard
          title="24h Volume"
          value={formatNumber(bagsTokens.reduce((acc, t) => acc + t.volume24h, 0))}
          icon={DollarSign}
          trend="+23.5%"
          positive
        />
        <StatCard
          title="Total Holders"
          value={bagsTokens.reduce((acc, t) => acc + t.holders, 0).toLocaleString()}
          icon={Users}
          trend="+1,234 today"
          positive
        />
        <StatCard
          title="Active Creators"
          value={topCreators.length.toString()}
          icon={TrendingUp}
          trend="+3 new"
          positive
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-slate-800">
        {[
          { id: "tokens", label: "Tokens", count: bagsTokens.length },
          { id: "creators", label: "Top Creators", count: topCreators.length },
          { id: "analytics", label: "Analytics" },
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
            {tab.count && (
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "tokens" && (
        <>
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Tokens" },
              { id: "new", label: "🔥 New Launches" },
              { id: "trending", label: "📈 Trending" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.id
                    ? "bg-gradient-to-r from-solana-purple to-solana-cyan text-white"
                    : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Tokens Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTokens.map((token) => (
              <TokenCard key={token.id} token={token} formatNumber={formatNumber} />
            ))}
          </div>
        </>
      )}

      {activeTab === "creators" && (
        <div className="space-y-4">
          {topCreators.map((creator, index) => (
            <div
              key={creator.name}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-solana-purple to-solana-cyan text-lg font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{creator.name}</h3>
                  <p className="text-sm text-slate-400">
                    {creator.tokens} tokens • {creator.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-solana-cyan">
                  {formatNumber(creator.volume)}
                </p>
                <p className="text-sm text-slate-400">total volume</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 text-center"
        >
          <BarChart3 className="mx-auto mb-4 h-16 w-16 text-slate-600" />
          <h3 className="mb-2 text-xl font-semibold text-white">
            Analytics Dashboard
          </h3>
          <p className="text-slate-400">
            Real-time Bags ecosystem analytics coming soon.
            <br />
            Track volume, holders, and creator performance.
          </p>
        </div>
      )}
    </div>
  );
}

function TokenCard({
  token,
  formatNumber,
}: {
  token: any;
  formatNumber: (num: number) => string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:bg-slate-800/50"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-solana-purple/10 to-solana-cyan/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={token.image}
              alt={token.name}
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold text-white">{token.symbol}</h3>
              <p className="text-xs text-slate-400">{token.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {token.isNew && (
              <span className="rounded-full bg-solana-cyan/20 px-2 py-0.5 text-xs font-medium text-solana-cyan">
                NEW
              </span>
            )}
            {token.trending && (
              <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-500">
                🔥 TREND
              </span>
            )}
          </div>
        </div>

        {/* Price & Change */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-white">
              ${token.price.toFixed(4)}
            </p>
            <p className="text-sm text-slate-400">
              MC: {formatNumber(token.marketCap)}
            </p>
          </div>
          <span
            className={`text-sm font-bold ${
              token.change24h >= 0 ? "text-solana-cyan" : "text-rose-500"
            }`}
          >
            {token.change24h >= 0 ? "+" : ""}
            {token.change24h}%
          </span>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Volume (24h)</p>
            <p className="font-medium text-white">{formatNumber(token.volume24h)}</p>
          </div>
          <div>
            <p className="text-slate-500">Holders</p>
            <p className="font-medium text-white">{token.holders.toLocaleString()}</p>
          </div>
        </div>

        {/* Creator */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
          <Users className="h-3 w-3" />
          by {token.creatorName}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/market/create?token=${token.symbol}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-solana-purple to-solana-cyan text-xs"
            >
              <Plus className="mr-1 h-3 w-3" />
              Create Market
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="border-slate-700 text-slate-400 hover:bg-slate-800"
            onClick={() => window.open(`https://bags.fm/token/${token.id}`, "_blank")}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
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
