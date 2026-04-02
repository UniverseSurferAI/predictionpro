import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
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
        <div className="mb-12 rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-green-300">
            Last updated: March 30, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">1. Introduction</h2>
            <p className="text-slate-400">
              PredictionPro (&quot;we,&quot; &quot;our,&quot; or &quot;Platform&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use 
              our decentralized prediction market platform built on the Solana blockchain.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">2. Information We Collect</h2>
            <p className="text-slate-400">
              <strong className="text-white">Blockchain Data:</strong> When you connect your Solana wallet 
              to PredictionPro, we may collect:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li>Wallet address (public key)</li>
              <li>Transaction history related to PredictionPro markets</li>
              <li>Token balances (YES/NO tokens)</li>
              <li>Market creation and trading activity on-chain</li>
            </ul>
            <p className="mt-4 text-slate-400">
              <strong className="text-white">Automatically Collected:</strong>
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li>IP address (for security and rate limiting)</li>
              <li>Browser type and version</li>
              <li>Pages visited and features used</li>
              <li>Timestamps of interactions</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">3. How We Use Your Information</h2>
            <p className="text-slate-400">We use collected information to:</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li>Provide and maintain the Platform</li>
              <li>Process market creation and trading transactions</li>
              <li>Calculate and distribute trading fees to market creators</li>
              <li>Detect and prevent fraudulent or prohibited activities</li>
              <li>Improve Platform functionality and user experience</li>
              <li>Respond to user inquiries and support requests</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">4. Cookies & Tracking</h2>
            <p className="text-slate-400">
              We use minimal cookies and tracking:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li><strong className="text-white">Essential cookies:</strong> Required for wallet connection and authentication</li>
              <li><strong className="text-white">Analytics:</strong> Anonymous usage statistics to improve the Platform</li>
              <li><strong className="text-white">No advertising cookies:</strong> We do not use third-party advertising trackers</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">5. Data Sharing</h2>
            <p className="text-slate-400">
              <strong className="text-white">We do NOT sell your personal information.</strong>
            </p>
            <p className="mt-4 text-slate-400">
              We may share data with:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li><strong className="text-white">Bags Protocol:</strong> For token creation and trading (your wallet interacts directly with their smart contracts)</li>
              <li><strong className="text-white">Service providers:</strong> Hosting, analytics, and security services</li>
              <li><strong className="text-white">Legal requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">6. Blockchain Transparency</h2>
            <p className="text-slate-400">
              Important: The Solana blockchain is public and immutable. Your wallet address, all transactions, 
              and market activities are publicly visible on-chain. This data cannot be deleted or modified 
              and is not subject to this Privacy Policy.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">7. Data Security</h2>
            <p className="text-slate-400">
              We implement reasonable security measures to protect your information:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure wallet connection protocols</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
            </ul>
            <p className="mt-4 text-slate-400">
              However, no system is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">8. Your Rights</h2>
            <p className="text-slate-400">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-400">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data (where applicable)</li>
              <li>Object to certain processing activities</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-4 text-slate-400">
              To exercise these rights, contact us through our official channels. Note: On-chain data 
              cannot be modified or deleted as it is stored permanently on the Solana blockchain.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">9. Children&apos;s Privacy</h2>
            <p className="text-slate-400">
              PredictionPro is not intended for users under the age of 18 (or the legal age in your jurisdiction). 
              We do not knowingly collect information from minors. If you believe a minor has provided us with 
              personal information, please contact us immediately.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">10. Changes to This Policy</h2>
            <p className="text-slate-400">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an 
              updated &quot;Last updated&quot; date. Your continued use of the Platform after changes constitutes 
              acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">11. Contact Us</h2>
            <p className="text-slate-400">
              For questions about this Privacy Policy or to report concerns:
            </p>
            <ul className="mt-4 list-inside space-y-2 text-slate-400">
              <li>Twitter: @predictionproio</li>
              <li>Discord: Join our community server</li>
              <li>Website: https://predictionpro.io</li>
            </ul>
          </section>
        </div>

        {/* Agreement */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-sm text-slate-500">
            By using PredictionPro, you acknowledge that you have read and understood this Privacy Policy.
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
