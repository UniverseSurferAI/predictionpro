import Link from "next/link";
import { ArrowLeft, Wallet, Search, CheckCircle, TrendingUp, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-slate-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            How PredictionPro Works
          </h1>
          <p className="text-lg text-slate-400">
            Your complete guide to predicting and winning
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">1. Connect Your Wallet</h2>
            <p className="text-slate-400">
              Connect your Phantom or Solflare wallet to get started. You&apos;ll need some SOL for transaction fees and to place bets.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">2. Browse Markets</h2>
            <p className="text-slate-400">
              Explore prediction markets across crypto, sports, politics, and more. Each market has YES and NO tokens representing different outcomes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">3. Buy YES or NO Tokens</h2>
            <p className="text-slate-400">
              Buy tokens representing your prediction. If you think the event will happen, buy YES tokens. If not, buy NO tokens. Prices change based on market sentiment.
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">4. Market Resolves</h2>
            <p className="text-slate-400">
              When the event outcome is determined, the market resolves to YES or NO. Winning token holders can redeem their tokens for SOL.
            </p>
          </div>

          {/* Step 5 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">5. Claim Winnings</h2>
            <p className="text-slate-400">
              If you held winning tokens, claim your share of the prize pool. The more tokens you held, the bigger your winnings!
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/markets">
            <Button size="lg" className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90">
              Start Predicting
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
