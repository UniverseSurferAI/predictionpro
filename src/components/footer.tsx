import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195]">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-lg font-bold text-transparent">
                PredictionPro
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-500">
              Predict Anything. Win SOL.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-slate-400 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/creator-guide" className="text-sm text-slate-400 hover:text-white">
                  Creator Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/markets" className="text-sm text-slate-400 hover:text-white">
                  Markets
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-sm text-slate-400 hover:text-white">
                  Create Market
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="text-sm text-slate-400 hover:text-white">
                  Ecosystem
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/disclaimer" className="text-sm text-slate-400 hover:text-white">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 PredictionPro. Built on Solana with Bags Protocol.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/predictionproio" target="_blank" className="text-slate-400 hover:text-white">
                Twitter
              </a>
              <a href="https://github.com/UniverseSurferAI/predictionpro" target="_blank" className="text-slate-400 hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
