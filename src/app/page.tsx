import Link from "next/link";
import { TrendingUp, Plus, ArrowRight, Zap, Activity, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketCard } from "@/components/market-card";
import { OraclePriceSection } from "@/components/oracle-price-section";

// Sample prediction markets (replace with API)
const featuredMarkets = [
  {
    id: "1",
    question: "Will BTC hit $100,000 before 2026?",
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 245000,
    liquidity: 89000,
    endDate: "2025-12-31",
    category: "Crypto",
    traders: 1234,
    trending: true,
  },
  {
    id: "2",
    question: "Will ETH flip BTC market cap by end of 2025?",
    yesPrice: 0.23,
    noPrice: 0.77,
    volume: 189000,
    liquidity: 67000,
    endDate: "2025-12-31",
    category: "Crypto",
    traders: 892,
    trending: false,
  },
  {
    id: "3",
    question: "Will SOL reach $500 in 2024?",
    yesPrice: 0.41,
    noPrice: 0.59,
    volume: 156000,
    liquidity: 54000,
    endDate: "2024-12-31",
    category: "Crypto",
    traders: 756,
    trending: true,
  },
];

const trendingMarkets = [
  {
    id: "4",
    question: "Will Trump win 2024 US Election?",
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 523000,
    endDate: "2024-11-05",
    category: "Politics",
    traders: 4567,
    trending: true,
  },
  {
    id: "5",
    question: "Will SpaceX land on Mars by 2030?",
    yesPrice: 0.34,
    noPrice: 0.66,
    volume: 98000,
    endDate: "2030-12-31",
    category: "Science",
    traders: 543,
    trending: false,
  },
  {
    id: "6",
    question: "Will Apple release VR headset in 2024?",
    yesPrice: 0.89,
    noPrice: 0.11,
    volume: 134000,
    endDate: "2024-12-31",
    category: "Tech",
    traders: 987,
    trending: true,
  },
];

const bagsTokensCount = 150; // Static for now, can be fetched from API

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-solana-purple/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-solana-cyan/20 blur-[120px] [animation-delay:1s]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left: Text */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-solana-cyan/30 bg-solana-cyan/10 px-4 py-2 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-solana-cyan" />
                <span className="text-sm font-medium text-solana-cyan">Live on Solana Mainnet</span>
              </div>

              <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Predict the
                <br />
                <span className="bg-gradient-to-r from-solana-purple via-solana-cyan to-solana-purple bg-clip-text text-transparent">
                  Future.
                </span>
                <br />
                <span className="text-white">Win SOL.</span>
              </h1>

              <p className="mb-8 max-w-lg text-lg text-slate-400">
                Create prediction markets on anything. Trade YES/NO tokens. 
                Earn fees when others trade. Built on Solana + Bags Protocol.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/create">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-solana-purple to-solana-cyan px-8 py-6 text-lg font-bold text-white shadow-2xl shadow-solana-purple/30 transition-all hover:shadow-solana-cyan/40 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Market
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>

                <Link href="/markets">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-slate-700 bg-slate-900/50 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all hover:border-solana-purple hover:bg-slate-800"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Explore Markets
                  </Button>
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-12 flex gap-8 border-t border-slate-800 pt-8">
                <Stat value="$2.4M" label="Total Volume" />
                <Stat value="156" label="Markets" />
                <Stat value="12.4K" label="Traders" />
              </div>
            </div>

            {/* Right: Featured Market Preview */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-solana-purple/20 to-solana-cyan/20 blur-2xl" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold text-orange-500">Trending Now</span>
                </div>
                <MarketCard market={featuredMarkets[0]} featured />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Markets */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-solana-cyan" />
              <h2 className="text-2xl font-bold text-white">Trending Markets</h2>
            </div>
            <Link 
              href="/markets" 
              className="group flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-solana-cyan"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Oracle Section */}
      <OraclePriceSection />

      {/* Featured Categories */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <Target className="h-6 w-6 text-solana-purple" />
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard 
              name="Crypto" 
              count={45} 
              icon="₿" 
              color="from-orange-500 to-yellow-500"
            />
            <CategoryCard 
              name="Politics" 
              count={23} 
              icon="🏛️" 
              color="from-blue-500 to-cyan-500"
            />
            <CategoryCard 
              name="Sports" 
              count={34} 
              icon="⚽" 
              color="from-green-500 to-emerald-500"
            />
            <CategoryCard 
              name="Tech" 
              count={18} 
              icon="🚀" 
              color="from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* Bags Ecosystem CTA */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-solana-purple/20 to-solana-cyan/20 p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-solana-purple/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-solana-cyan/30 blur-3xl" />
            
            <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                  🎒 Explore Bags Ecosystem
                </h2>
                <p className="text-slate-300">
                  Discover {bagsTokensCount} tokens launched on Bags Protocol. 
                  Create prediction markets on any Bags token.
                </p>
              </div>
              <Link href="/ecosystem">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  Explore Tokens
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">How It Works</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Create markets, trade outcomes, earn fees. All on Solana.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="01"
              title="Create a Market"
              description="Ask any question. Set the end date. Launch YES/NO tokens on Solana."
            />
            <StepCard
              number="02"
              title="Trade Outcomes"
              description="Buy YES or NO tokens based on what you believe. Prices reflect probability."
            />
            <StepCard
              number="03"
              title="Earn Fees"
              description="Market creators earn 70% of trading fees. Forever. Passive income."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  // Validate inputs
  if (!value || typeof value !== 'string') {
    value = '—';
  }
  if (!label || typeof label !== 'string') {
    label = '';
  }
  
  return (
    <div>
      <div className="text-2xl font-black text-white md:text-3xl">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function CategoryCard({ 
  name, 
  count, 
  icon, 
  color 
}: { 
  name: string; 
  count: number; 
  icon: string; 
  color: string;
}) {
  // Validate and sanitize inputs
  if (!name || typeof name !== 'string') {
    return null; // Don't render without valid name
  }
  count = typeof count === 'number' ? count : 0;
  icon = icon || '📊';
  color = color || 'from-slate-500 to-slate-600';
  
  return (
    <Link href={`/markets?category=${encodeURIComponent(name.toLowerCase())}`}>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-800/50">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity group-hover:opacity-10`} />
        <div className="relative">
          <div className="mb-4 text-4xl">{icon}</div>
          <h3 className="mb-1 text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-slate-500">{count} markets</p>
        </div>
      </div>
    </Link>
  );
}

function StepCard({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) {
  // Validate inputs
  if (!number || typeof number !== 'string') {
    number = '?';
  }
  if (!title || typeof title !== 'string') {
    title = 'Step';
  }
  if (!description || typeof description !== 'string') {
    description = '';
  }
  
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-900/30 p-8">
      <div className="mb-4 text-5xl font-black text-slate-800">{number}</div>
      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
