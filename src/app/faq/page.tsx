import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is PredictionPro?",
    answer: "PredictionPro is a decentralized prediction market platform built on Solana. Users can create markets about future events and trade YES/NO tokens representing different outcomes."
  },
  {
    question: "What is the AI Oracle?",
    answer: "Our AI Oracle automatically verifies market outcomes using multiple independent data sources. For crypto markets, it checks prices from 4 sources (Coinbase, Binance, CryptoCompare, CoinCap). For weather, it uses Open-Meteo. This ensures fair, accurate resolutions without single points of failure."
  },
  {
    question: "What is Bags Protocol?",
    answer: "Bags Protocol is infrastructure on Solana that enables token creation and trading. PredictionPro uses Bags for YES/NO prediction tokens, enabling fast, low-cost trades with real SPL tokens."
  },
  {
    question: "Why is PredictionPro built on Solana?",
    answer: "Solana offers fast transaction speeds (65,000 TPS), low fees (~$0.001 per transaction), and a robust DeFi ecosystem. This makes prediction markets practical and accessible for everyone."
  },
  {
    question: "How do I create a market?",
    answer: "Connect your wallet, go to the Create page, enter your question, set an end date, and pay the launch fee. Your market will be live immediately on-chain!"
  },
  {
    question: "How much does it cost to create a market?",
    answer: "The total launch cost is ~$7 (0.05 SOL) paid to Bags Protocol for token creation. This is the only cost - there are no hidden fees."
  },
  {
    question: "How do I earn money as a market creator?",
    answer: "You earn 70% of all trading fees in your market. Example: $1,000 volume × 2% fee = $20 total fees → $14 goes to you! Higher volume = higher earnings."
  },
  {
    question: "What happens if no one trades my market?",
    answer: "Your market stays live until the end date. Even with no volume, creators earn tokens and gain visibility. Promote your market to attract traders!"
  },
  {
    question: "Can I edit my market after creating?",
    answer: "The question and end date cannot be changed after creation. This ensures integrity. However, you can always create a new market if your question changes."
  },
  {
    question: "What wallet do I need?",
    answer: "You need a Solana wallet like Phantom or Solflare. Make sure you have some SOL for transaction fees and placing bets."
  },
  {
    question: "How are markets resolved?",
    answer: "Markets are resolved by our AI Oracle when the end date passes. For crypto markets, prices are checked from multiple sources. For other markets, our team verifies the outcome using public information."
  },
  {
    question: "How long does resolution take?",
    answer: "AI-verified markets (crypto prices) resolve automatically within minutes after the end date. Other markets are typically resolved within 24-48 hours."
  },
  {
    question: "What if I disagree with a resolution?",
    answer: "We strive for accurate resolutions based on verifiable facts. If you believe a market was resolved incorrectly, contact us with evidence and we'll review."
  },
  {
    question: "What types of markets can I create?",
    answer: "You can create markets about crypto prices, sports events, politics, entertainment, weather, tech, and more. Markets must have clear, verifiable outcomes."
  },
  {
    question: "Are there any prohibited markets?",
    answer: "Yes. We prohibit markets involving illegal activities, harm to individuals, market manipulation, or purely subjective outcomes. See our Terms for details."
  },
  {
    question: "What fees does the platform charge?",
    answer: "A 2% trading fee is charged on each transaction. 70% goes to the market creator, 30% to platform development."
  },
  {
    question: "Can I lose money?",
    answer: "Yes. Prediction markets involve risk. Only bet what you can afford to lose. The value of your tokens depends on the market outcome."
  },
  {
    question: "How do I withdraw my winnings?",
    answer: "Winning tokens can be redeemed for SOL after market resolution. Connect your wallet and use the portfolio page to claim your winnings."
  },
  {
    question: "Is there a minimum or maximum bet?",
    answer: "There's no minimum bet! You can start with as little as you like. Maximum bets are limited by the liquidity in each market."
  },
  {
    question: "What makes PredictionPro different from other prediction markets?",
    answer: "1) AI Oracle for automated, trustless resolution 2) 70% creator fees (vs industry standard of 1-5%) 3) Built on Solana for speed and low costs 4) Real SPL tokens, not synthetic IOUs"
  },
];

export default function FAQPage() {
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
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-400">
            Everything you need to know about PredictionPro
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-slate-700"
            >
              <h3 className="mb-3 text-lg font-semibold text-white">
                {faq.question}
              </h3>
              <p className="text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Still have questions?</h2>
          <p className="mb-6 text-slate-400">
            Follow us on Twitter for updates and support.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://x.com/predictionproio" target="_blank">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Twitter/X
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
