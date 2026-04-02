// API client for connecting to Flask backend
// Uses mock data as fallback if backend is not available

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// Mock data for fallback
const mockMarkets = [
  // 🏆 HACKATHON META MARKETS (Featured)
  {
    id: "hackathon-1",
    market_id: "hackathon-1",
    question: "🏆 Will PredictionPro win Bags Hackathon 2026?",
    description: "This market resolves to YES if PredictionPro is declared a winner at the Bags Hackathon 2026. Let's show some confidence! 🚀",
    yes_price: 0.85,
    no_price: 0.15,
    volume: 15600,
    liquidity: 5200,
    end_date: "2026-03-15T18:00:00Z",
    category: "Hackathon",
    traders: 89,
    status: "LIVE",
    trending: true,
    created_at: "2026-03-13T10:00:00Z",
  },
  {
    id: "hackathon-2",
    market_id: "hackathon-2",
    question: "🎤 Which track gets the most votes? AI Agents vs DeFi",
    description: "Will the AI Agents track receive more community votes than DeFi at the hackathon?",
    yes_price: 0.62,
    no_price: 0.38,
    volume: 8900,
    liquidity: 3100,
    end_date: "2026-03-15T18:00:00Z",
    category: "Hackathon",
    traders: 56,
    status: "LIVE",
    trending: true,
    created_at: "2026-03-13T09:00:00Z",
  },
  {
    id: "hackathon-3",
    market_id: "hackathon-3",
    question: "😅 Will there be a live demo fail during presentations?",
    description: "Will ANY team experience a technical issue or demo fail during their live presentation?",
    yes_price: 0.73,
    no_price: 0.27,
    volume: 12400,
    liquidity: 4500,
    end_date: "2026-03-15T17:00:00Z",
    category: "Hackathon",
    traders: 167,
    status: "LIVE",
    trending: true,
    created_at: "2026-03-13T08:00:00Z",
  },
  {
    id: "hackathon-4",
    market_id: "hackathon-4",
    question: "💰 Will total hackathon prize pool exceed $50,000?",
    description: "Will the combined prize pool across all tracks exceed $50,000 USD?",
    yes_price: 0.45,
    no_price: 0.55,
    volume: 6700,
    liquidity: 2300,
    end_date: "2026-03-15T18:00:00Z",
    category: "Hackathon",
    traders: 43,
    status: "LIVE",
    created_at: "2026-03-13T07:00:00Z",
  },
  // Original markets
  {
    id: "1",
    market_id: "1",
    question: "Will BTC hit $100,000 before 2026?",
    description: "This market resolves to YES if Bitcoin reaches or exceeds $100,000 USD on any major exchange before January 1, 2026.",
    yes_price: 0.72,
    no_price: 0.28,
    volume: 245000,
    liquidity: 89000,
    end_date: "2025-12-31T23:59:59Z",
    category: "Crypto",
    traders: 1234,
    status: "LIVE",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    market_id: "2",
    question: "Will ETH flip BTC market cap by end of 2025?",
    description: "Will Ethereum's market capitalization exceed Bitcoin's at any point before 2026?",
    yes_price: 0.23,
    no_price: 0.77,
    volume: 189000,
    liquidity: 67000,
    end_date: "2025-12-31T23:59:59Z",
    category: "Crypto",
    traders: 892,
    status: "LIVE",
    created_at: "2024-01-14T10:00:00Z",
  },
  {
    id: "3",
    market_id: "3",
    question: "Will SOL reach $500 in 2024?",
    description: "Will Solana's price hit $500 or higher before the end of 2024?",
    yes_price: 0.41,
    no_price: 0.59,
    volume: 156000,
    liquidity: 54000,
    end_date: "2024-12-31T23:59:59Z",
    category: "Crypto",
    traders: 756,
    status: "LIVE",
    created_at: "2024-01-13T10:00:00Z",
  },
  {
    id: "4",
    market_id: "4",
    question: "Will Trump win 2024 US Election?",
    description: "Will Donald Trump win the 2024 US Presidential Election?",
    yes_price: 0.58,
    no_price: 0.42,
    volume: 523000,
    liquidity: 180000,
    end_date: "2024-11-05T23:59:59Z",
    category: "Politics",
    traders: 4567,
    status: "LIVE",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "5",
    market_id: "5",
    question: "Will SpaceX land on Mars by 2030?",
    description: "Will SpaceX successfully land humans on Mars before January 1, 2030?",
    yes_price: 0.34,
    no_price: 0.66,
    volume: 98000,
    liquidity: 32000,
    end_date: "2029-12-31T23:59:59Z",
    category: "Science",
    traders: 543,
    status: "LIVE",
    created_at: "2024-01-08T10:00:00Z",
  },
  {
    id: "6",
    market_id: "6",
    question: "Will Apple release VR headset in 2024?",
    description: "Will Apple release a virtual reality headset in 2024?",
    yes_price: 0.89,
    no_price: 0.11,
    volume: 134000,
    liquidity: 48000,
    end_date: "2024-12-31T23:59:59Z",
    category: "Tech",
    traders: 987,
    status: "LIVE",
    created_at: "2024-01-05T10:00:00Z",
  },
];

// Helper function for API calls with fallback
async function apiCall(endpoint: string, options: RequestInit = {}, mockData?: any) {
  // If explicitly using mock, return mock data
  if (USE_MOCK && mockData) {
    console.log(`[MOCK] ${endpoint}`);
    return mockData;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.warn(`API call failed (${endpoint}), using mock data:`, error);
    
    // Return mock data if API fails
    if (mockData) {
      return mockData;
    }
    
    throw error;
  }
}

// Markets API
export const marketsApi = {
  // Get all markets
  getMarkets: async (params?: { status?: string; category?: string }) => {
    const mockResponse = {
      status: "ok",
      markets: mockMarkets,
      pagination: {
        page: 1,
        limit: 20,
        total: mockMarkets.length,
        has_more: false,
      },
    };

    // Filter by category if provided
    if (params?.category && params.category !== "All") {
      mockResponse.markets = mockMarkets.filter(
        (m) => m.category === params.category
      );
    }

    return apiCall(
      `/api/markets?${new URLSearchParams(params).toString()}`,
      {},
      mockResponse
    );
  },

  // Get single market
  getMarket: async (id: string) => {
    const mockMarket = mockMarkets.find((m) => m.id === id) || mockMarkets[0];
    return apiCall(
      `/api/markets/${id}`,
      {},
      {
        status: "ok",
        market: mockMarket,
      }
    );
  },

  // Create market (always tries real API first)
  createMarket: async (data: {
    question: string;
    endDate: string;
    creatorWallet: string;
  }) => {
    return apiCall("/api/markets/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Resolve market (admin only)
  resolveMarket: async (
    id: string,
    data: { outcome: "YES" | "NO"; admin_password: string }
  ) => {
    return apiCall(`/api/markets/${id}/resolve`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Token Launch API
export const launchApi = {
  launchToken: async (data: {
    name: string;
    symbol: string;
    description: string;
    image_url?: string;
    initial_buy_sol?: number;
    creator_wallet: string;
  }) => {
    return apiCall("/api/launch-token", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Portfolio API
export const portfolioApi = {
  getPortfolio: async (walletAddress: string) => {
    const mockPortfolio = {
      status: "ok",
      wallet: walletAddress,
      total_value: 12.45,
      total_profit: 3.21,
      profit_percentage: 34.8,
      active_positions: [
        {
          id: "1",
          market: "Will BTC hit $100K by 2026?",
          position: "YES",
          invested: 2.5,
          current_value: 3.4,
          profit: 0.9,
          profit_percent: 36,
        },
      ],
      resolved_markets: [],
      created_markets: [],
    };

    return apiCall(
      `/api/user/${walletAddress}/portfolio`,
      {},
      mockPortfolio
    );
  },
};

// Helper to check if backend is available
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch {
    return false;
  }
}
