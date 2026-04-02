import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DisclaimerPage() {
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
        <div className="mb-12 rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Disclaimer
          </h1>
          <p className="text-lg text-red-300">
            Please read this carefully before using PredictionPro
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Not Financial Advice</h2>
            <p className="text-slate-400">
              PredictionPro is a platform for entertainment and information purposes only. 
              Nothing on this website constitutes financial advice, investment advice, or trading recommendations. 
              All trading decisions are made at your own risk.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Risk of Loss</h2>
            <p className="text-slate-400">
              Prediction markets involve substantial risk. You may lose all or part of your funds. 
              Only participate with money you can afford to lose. Past performance does not guarantee future results.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">No Guarantees</h2>
            <p className="text-slate-400">
              We do not guarantee the accuracy of market resolutions, the availability of the platform, 
              or the solvency of any market. Markets are resolved to the best of our ability based on 
              publicly available information, but errors may occur.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Platform Not Responsible</h2>
            <p className="text-slate-400">
              PredictionPro is not responsible for:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li>Loss of funds due to market volatility</li>
              <li>Incorrect market resolutions</li>
              <li>Technical failures or downtime</li>
              <li>Actions of other users or market creators</li>
              <li>Smart contract bugs or exploits</li>
              <li>Regulatory changes affecting your jurisdiction</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Jurisdiction</h2>
            <p className="text-slate-400">
              You are responsible for ensuring that your use of PredictionPro complies with all applicable 
              laws and regulations in your jurisdiction. Some jurisdictions may prohibit or restrict 
              prediction markets or cryptocurrency transactions.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Experimental Technology</h2>
            <p className="text-slate-400">
              PredictionPro uses experimental blockchain technology. Smart contracts may contain bugs, 
              the platform may experience downtime, and features may change without notice. Use at your own risk.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">Contact</h2>
            <p className="text-slate-400">
              If you have questions or concerns about this disclaimer, please contact us through our 
              official channels before using the platform.
            </p>
          </section>
        </div>

        {/* Agreement */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-sm text-slate-500">
            By using PredictionPro, you acknowledge that you have read, understood, and agree to this disclaimer.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90">
              I Understand - Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
