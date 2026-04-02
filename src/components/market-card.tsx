import Link from "next/link";
import { TrendingUp, TrendingDown, Clock, Users, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface Market {
  id: string;
  question: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  liquidity?: number;
  endDate: string;
  category?: string;
  traders: number;
  trending?: boolean;
}

interface MarketCardProps {
  market: Market;
  featured?: boolean;
}

export function MarketCard({ market, featured = false }: MarketCardProps) {
  const yesPercent = Math.round(market.yesPrice * 100);
  const noPercent = Math.round(market.noPrice * 100);
  const isYesLeading = yesPercent > noPercent;

  if (featured) {
    return (
      <Link href={`/market/${market.id}`}>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-solana-cyan/50 hover:shadow-2xl hover:shadow-solana-cyan/10">
          {/* Glow effect */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-solana-purple/20 to-solana-cyan/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
          
          <div className="relative">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <span className="rounded-full bg-solana-cyan/10 px-3 py-1 text-xs font-medium text-solana-cyan">
                {market.category}
              </span>
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="h-4 w-4" />
                <span className="text-xs font-medium">Trending</span>
              </div>
            </div>

            {/* Question */}
            <h3 className="mb-6 text-xl font-bold text-white">
              {market.question}
            </h3>

            {/* Probability bars */}
            <div className="mb-6 space-y-3">
              <div className="group/bar flex items-center gap-3">
                <span className="w-12 text-sm font-bold text-solana-cyan">Yes</span>
                <div className="flex-1">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-solana-cyan to-emerald-400 transition-all duration-500"
                      style={{ width: `${yesPercent}%` }}
                    />
                  </div>
                </div>
                <span className={cn(
                  "w-14 text-right text-lg font-bold",
                  isYesLeading ? "text-solana-cyan" : "text-slate-500"
                )}>
                  {yesPercent}%
                </span>
              </div>

              <div className="group/bar flex items-center gap-3">
                <span className="w-12 text-sm font-bold text-rose-500">No</span>
                <div className="flex-1">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-400 transition-all duration-500"
                      style={{ width: `${noPercent}%` }}
                    />
                  </div>
                </div>
                <span className={cn(
                  "w-14 text-right text-lg font-bold",
                  !isYesLeading ? "text-rose-500" : "text-slate-500"
                )}>
                  {noPercent}%
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-sm">
              <div className="flex items-center gap-4 text-slate-500">
                <span className="flex items-center gap-1">
                  Volume: ${(market.volume / 1000).toFixed(0)}K
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {market.traders}
                </span>
              </div>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="h-4 w-4" />
                {new Date(market.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/market/${market.id}`}>
      <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:bg-slate-800/50">
        {/* Subtle gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-solana-purple/5 to-solana-cyan/5 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="relative">
          {/* Header with category and trending */}
          <div className="mb-3 flex items-start justify-between">
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
              {market.category}
            </span>
            
            {market.trending && (
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Hot</span>
              </div>
            )}
          </div>

          {/* Question */}
          <h3 className="mb-4 text-base font-semibold text-white line-clamp-2">
            {market.question}
          </h3>

          {/* Probability bars */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 text-xs font-bold text-solana-cyan">Yes</span>
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-solana-cyan transition-all"
                    style={{ width: `${yesPercent}%` }}
                  />
                </div>
              </div>
              <span className={cn(
                "w-10 text-right text-sm font-bold",
                isYesLeading ? "text-solana-cyan" : "text-slate-500"
              )}>
                {yesPercent}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-8 text-xs font-bold text-rose-500">No</span>
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-rose-500 transition-all"
                    style={{ width: `${noPercent}%` }}
                  />
                </div>
              </div>
              <span className={cn(
                "w-10 text-right text-sm font-bold",
                !isYesLeading ? "text-rose-500" : "text-slate-500"
              )}>
                {noPercent}%
              </span>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span>${(market.volume / 1000).toFixed(0)}K vol</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {market.traders}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(market.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
