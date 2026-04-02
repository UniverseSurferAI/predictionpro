import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/wallet-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PredictionPro - Predict Anything. Win SOL.",
  description: "Create prediction markets on Solana. Trade YES/NO tokens. Earn fees on every trade.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <WalletContextProvider>
          <div className="relative min-h-screen">
            {/* Background gradient */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            
            <Navbar />
            
            <main className="relative">
              {children}
            </main>
            
            <Footer />
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
