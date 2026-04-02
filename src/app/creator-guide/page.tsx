import Link from "next/link";
import { ArrowLeft, Coins, Calculator, TrendingUp, Lightbulb, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorGuidePage() {
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
            Market Creator Guide
          </h1>
          <p className="text-lg text-slate-400">
            Everything you need to know about creating and earning from prediction markets
          </p>
        </div>

        {/* Fee Structure Card */}
        <div className="mb-8 rounded-2xl border border-[#9945FF]/30 bg-gradient-to-br from-[#9945FF]/10 to-[#14F195]/10 p-8">
          <div className="mb-4 flex items-center gap-3">
            <Coins className="h-8 w-8 text-[#9945FF]" />
            <h2 className="text-2xl font-bold text-white">Fee Structure</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-slate-900/50 p-6">
              <div className="mb-2 text-3xl font-bold text-[#9945FF]">70%</div>
              <div className="text-lg font-semibold text-white">Creator Share</div>
              <p className="text-sm text-slate-400">You earn 70% of all trading fees in your market</p>
            </div>
            <div className="rounded-xl bg-slate-900/50 p-6">
              <div className="mb-2 text-3xl font-bold text-[#14F195]">30%</div>
              <div className="text-lg font-semibold text-white">Platform Share</div>
              <p className="text-sm text-slate-400">Platform keeps 30% for infrastructure</p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="mb-4 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-[#14F195]" />
            <h2 className="text-2xl font-bold text-white">Launch Cost Breakdown</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400">Token Creation (Bags Protocol)</span>
              <span className="font-semibold text-white">~0.05 SOL (~$7)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400">Platform Fee</span>
              <span className="font-semibold text-[#14F195]">$0 (Free!)</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400">Total Cost</span>
              <span className="font-bold text-[#9945FF]">~$7</span>
            </div>
          </div>
        </div>

        {/* Earnings Example */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="mb-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#9945FF]" />
            <h2 className="text-2xl font-bold text-white">Earnings Example</h2>
          </div>
          <p className="mb-4 text-slate-400">
            If your market reaches <span className="font-semibold text-white">$1,000</span> in trading volume (2% fee):
          </p>
          <div className="rounded-xl bg-slate-950 p-6">
            <div className="mb-2 flex justify-between">
              <span className="text-slate-400">Trading Fees (2%)</span>
              <span className="text-white">$20.00</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-slate-400">Your Share (70%)</span>
              <span className="font-semibold text-[#9945FF]">$14.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Platform Share (30%)</span>
              <span className="text-[#14F195]">$6.00</span>
            </div>
            <div className="mt-4 border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Your Net Profit (after $3.50 cost)</span>
                <span className="text-xl font-bold text-[#14F195]">$10.50</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Break-even: ~25 bets of $10 each!
          </p>
        </div>

        {/* Tips */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="mb-4 flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Tips for Success</h2>
          </div>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-[#14F195]">✓</span>
              <span>Choose <strong className="text-white">hot topics</strong> - crypto prices, sports, elections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#14F195]">✓</span>
              <span>Set a <strong className="text-white">clear end date</strong> when the outcome will be known</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#14F195]">✓</span>
              <span>Write an <strong className="text-white">unambiguous question</strong> - avoid subjective outcomes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#14F195]">✓</span>
              <span><strong className="text-white">Promote your market</strong> on Twitter, Discord, Telegram</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#14F195]">✓</span>
              <span>Start with <strong className="text-white">smaller markets</strong> to learn the system</span>
            </li>
          </ul>
        </div>

        {/* Warning */}
        <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />
            <div>
              <h3 className="mb-2 font-semibold text-yellow-400">Important</h3>
              <p className="text-sm text-slate-300">
                You only earn fees when people trade in your market. If no one bets, you don&apos;t earn. 
                Choose popular topics and promote your market to maximize earnings!
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/create">
            <Button size="lg" className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90">
              Create Your First Market
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
