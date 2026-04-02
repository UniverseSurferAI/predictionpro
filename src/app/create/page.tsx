"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Plus, Calendar, ImageIcon, AlertCircle, CheckCircle2, ExternalLink, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomConnectButton } from "@/components/custom-connect-button";

export default function CreateMarketPage() {
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    category: "Crypto",
    endDate: "",
    initialLiquidity: 0.1,
    imageUrl: "",
  });
  // Debug state

  const categories = ["Crypto", "Politics", "Sports", "Tech", "Science", "Entertainment", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      alert("Please connect your wallet first");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call real backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://predictionpro-api-752364645771.europe-west1.run.app"}/api/markets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: formData.question,
          description: formData.description,
          endDate: formData.endDate,
          creatorWallet: publicKey.toString(),
          category: formData.category,
          initialLiquidity: formData.initialLiquidity
        }),
      });
      
      const data = await response.json();
      
      if (data.status === "ok") {
        // Success - show debug for 5 seconds then redirect
        router.push("/markets");
      } else {
        alert("API Error: " + data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Error: " + (error instanceof Error ? error.message : String(error)));
      console.error('Error creating market:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">Create Prediction Market</h1>
        <p className="mt-2 text-slate-400">
          Launch a YES/NO market and earn 70% of trading fees
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/ecosystem">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <ExternalLink className="mr-2 h-4 w-4" />
              Explore Bags Ecosystem
            </Button>
          </Link>
          <Link href="https://bags.fm" target="_blank">
            <Button variant="outline" size="sm" className="border-[#14F195]/30 text-[#14F195] hover:bg-[#14F195]/10">
              <ExternalLink className="mr-2 h-4 w-4" />
              Launch on Bags
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step >= s
                  ? "bg-gradient-to-r from-solana-purple to-solana-cyan text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-1 w-12 rounded ${
                  step > s ? "bg-solana-cyan" : "bg-slate-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {!connected && (
          <div className="rounded-2xl border border-violet-600/30 bg-violet-900/20 p-6 text-center">
            <Wallet className="w-10 h-10 mx-auto text-violet-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-slate-400 mb-4">You need to connect your Solana wallet to create a market</p>
            <CustomConnectButton />
          </div>
        )}
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">Market Question</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  What are people predicting? *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g., Will BTC hit $100K by end of 2025?"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-slate-500 focus:border-solana-cyan focus:outline-none focus:ring-1 focus:ring-solana-cyan"
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  Make it specific and verifiable. The outcome must be objectively true or false.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide more context about this prediction..."
                  rows={4}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-slate-500 focus:border-solana-cyan focus:outline-none focus:ring-1 focus:ring-solana-cyan"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category *
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                        formData.category === cat
                          ? "bg-solana-purple text-white"
                          : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.question}
                className="bg-gradient-to-r from-solana-purple to-solana-cyan"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Settings */}
        {step === 2 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">Market Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Resolution Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 pl-12 text-white focus:border-solana-cyan focus:outline-none focus:ring-1 focus:ring-solana-cyan"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  When will the outcome be known? You can resolve the market anytime after this date.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Initial Liquidity (SOL)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.initialLiquidity}
                  onChange={(e) => setFormData({ ...formData, initialLiquidity: parseFloat(e.target.value) })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white focus:border-solana-cyan focus:outline-none focus:ring-1 focus:ring-solana-cyan"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Minimum 0.01 SOL. This seeds the initial liquidity pool.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Market Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.png"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 pl-12 text-white placeholder-slate-500 focus:border-solana-cyan focus:outline-none focus:ring-1 focus:ring-solana-cyan"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                disabled={!formData.endDate}
                className="bg-gradient-to-r from-solana-purple to-solana-cyan"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">Review & Launch</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-800/50 p-4">
                <p className="text-sm text-slate-500">Question</p>
                <p className="text-lg font-semibold text-white">{formData.question}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-800/50 p-4">
                  <p className="text-sm text-slate-500">Category</p>
                  <p className="font-semibold text-white">{formData.category}</p>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-4">
                  <p className="text-sm text-slate-500">Resolution Date</p>
                  <p className="font-semibold text-white">
                    {formData.endDate ? new Date(formData.endDate).toLocaleString() : "Not set"}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-slate-800/50 p-4">
                <p className="text-sm text-slate-500">Initial Liquidity</p>
                <p className="font-semibold text-white">{formData.initialLiquidity} SOL</p>
              </div>

              {/* Fee Structure Info */}
              <div className="rounded-lg border border-solana-cyan/30 bg-solana-cyan/5 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-solana-cyan" />
                  <div>
                    <p className="font-semibold text-solana-cyan">Fee Structure (2%)</p>
                    <p className="text-sm text-slate-400">
                      You earn 70% of all trading fees. Example: $100 bet = $2.00 fee → $1.40 to you, $0.60 to platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cost Info */}
              <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-semibold text-white">Cost Breakdown</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-400">
                      <li>• Initial liquidity: {formData.initialLiquidity} SOL</li>
                      <li>• Transaction fees: ~0.01 SOL</li>
                      <li>• Platform fee: 0 SOL (free during hackathon)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-solana-purple to-solana-cyan"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Launching...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Launch Market
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
      
    </div>
  );
}
