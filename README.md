# PredictionPro

**AI-powered prediction markets with real SPL tokens on Solana blockchain**

PredictionPro creates actual YES/NO SPL tokens on Solana for every prediction market, powered by the Bags.fm API. Features an **AI Research Assistant** that generates market descriptions, pulls real-time data, and suggests probabilities automatically.

## Live App

https://www.predictionpro.io

## What's New: AI Research Assistant ✨

Create prediction markets in seconds with AI-powered assistance:

1. **Type your question** (e.g., "Will BTC hit $100k by end of 2026?")
2. **Click AI Assist** - our AI instantly:
   - Generates a professional market description
   - Pulls real-time data (prices, weather, sports scores)
   - Suggests probability based on current news and data
   - Finds relevant news articles about your topic
3. **Launch your market** - done!

### Supported Categories

| Category | Data Source | Features |
|----------|-------------|----------|
| 🪙 **Crypto** | Binance, Coinbase, CryptoCompare, CoinCap | Multi-source price verification |
| 🌤️ **Weather** | Open-Meteo (free API) | Real weather data for any location |
| ⚽ **Sports** | API-Sports | Scores, fixtures, team data |
| 📰 **Politics/Tech** | Google News RSS | Live news search for any topic |
| 🎬 **Entertainment** | Google News RSS | Celebrity, music, movie news |

## Overview

PredictionPro transforms prediction markets by creating real blockchain tokens on Solana - not database entries.

User creates market → AI Research → Bags.fm API mints YES/NO tokens

## AI Research Agent

The AI Research Agent helps users create better prediction markets by providing instant analysis:

### Features

| Feature | Description |
|---------|-------------|
| **Description Generator** | AI creates professional market descriptions |
| **Probability Suggester** | AI analyzes news and data for probability estimates |
| **News Search** | Google News integration for any topic |
| **Data Puller** | Crypto prices, weather, sports - automatically |

### How AI Research Works

**For Crypto Markets:**
- Pulls live prices from 4 exchanges (Coinbase, CryptoCompare, Binance, CoinCap)
- Calculates average price across sources
- Generates informed probability based on price targets

**For Weather Markets:**
- Extracts location from question
- Fetches current weather via Open-Meteo (free, no API key)
- Real temperature, conditions, wind data

**For Sports Markets:**
- Identifies teams from question
- Searches for upcoming matches
- Provides context for prediction

**For News/Politics Markets:**
- Searches Google News with full question (no API key needed)
- Analyzes sentiment from headlines
- Generates probability based on news context

### AI Oracle System (Auto-Resolution)

PredictionPro also features an autonomous AI Oracle that automatically verifies market outcomes:

| Market Type | Resolver | Data Source | Status |
|------------|----------|------------|--------|
| Crypto | CryptoResolver | 4 price feeds | ✅ Live |
| Weather | WeatherResolver | Open-Meteo API | ✅ Live |
| Sports | SportsResolver | API-Sports | ✅ Ready |
| General | NLResolver | Web Search | 🔜 Future |

**Auto-resolution:** Oracle resolves markets when 3/4 sources agree within 0.5%

## Architecture

```
┌─────────────────────────────────────────┐
│ FRONTEND (Next.js 16)                  │
│ • Dark theme UI optimized for mobile    │
│ • AI Research Assistant (one-click)     │
│ • Wallet integration (Phantom, Solflare, Backpack)│
│ • AI Oracle price display              │
│ • Market listing, creation, trading UI │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ BACKEND (Flask + Firebase)              │
│ • REST API for market operations        │
│ • AI Research Agent (MiniMax M2.7)      │
│ • AI Oracle Registry                    │
│ • Firebase Firestore for market data   │
│ • Bags.fm API integration               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ EXTERNAL SERVICES                       │
│ • Bags.fm API - Token minting          │
│ • Solana RPC - Blockchain operations     │
│ • Firebase - Data persistence           │
│ • Google News - News search (free)     │
│ • Open-Meteo - Weather data (free)     │
│ • API-Sports - Sports data             │
└─────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, Tailwind CSS, TypeScript |
| Backend | Python Flask, Firebase Admin SDK |
| AI | MiniMax M2.7 (Research Agent + Oracle) |
| Database | Firebase Firestore |
| Blockchain | Solana (SPL tokens) |
| Token API | Bags.fm API |

## Fee Structure

| Fee Type | Amount | Recipient |
|----------|--------|-----------|
| Trading Fee | 2% | Platform |
| Creator Share | 70% of fees | Market Creator |
| Platform Share | 30% of fees | Platform |
| Market Creation | ~$7 (0.05 SOL) | Bags Protocol |

**Creator Earnings Example:** $1,000 volume × 2% fee = $20 total fees → $14 to creator!

## Key Features

### AI Research Assistant
- One-click market analysis
- Automatic description generation
- Real-time data integration (crypto, weather, sports)
- Probability suggestions based on news sentiment
- Multi-source verification

### Market Creation

- AI-assisted or manual market creation
- Categories: Crypto, Sports, Weather, Politics, Tech, Entertainment
- Creator funds initial liquidity pool
- Instant token minting via Bags.fm
- ~$7 total cost (no hidden fees)

### AI Oracle

- Quadruple-verified crypto prices
- 7 crypto assets: SOL, BTC, ETH, BNB, ADA, XRP, DOGE
- 40+ cities weather tracking
- Sports result tracking ready
- Auto-resolution for crypto markets

### Trading Interface

- YES/NO probability bars
- Real-time price display
- Solana wallet integration
- View tokens in any Solana wallet

### Token Verification

- All YES/NO tokens viewable on Solscan
- Real SPL tokens on Solana mainnet
- Tradeable on Solana DEXes

## System Flow

### 1. Market Creation with AI Assist

```
User → Types question → Clicks AI Assist
         ↓
   AI Research Agent:
   • Generates description
   • Pulls relevant data
   • Suggests probability
   • Finds related news
         ↓
User reviews & edits
         ↓
Backend → Bags.fm API
         ↓
Mints YES + NO tokens
         ↓
Deposits to liquidity pool
         ↓
Returns SPL token addresses
         ↓
User sees market live
```

### 2. Token Generation (Bags.fm Integration)

```json
POST /api/markets/create
{
 "question": "Will BTC hit $100k by 2026?",
 "description": "AI-generated or custom description",
 "initialLiquidity": 1.0,
 "category": "Crypto"
}

# Bags.fm response:
{
 "status": "success",
 "yesToken": ".sol_token_address",
 "noToken": ".sol_token_address",
 "marketId": "uuid"
}
```

### 3. AI Oracle Resolution

```
Market end date reached
         ↓
Oracle checks 4 price sources
         ↓
3/4 sources agree within 0.5%
         ↓
Auto-resolve with median price
         ↓
Winners determined
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/markets` | List all markets |
| GET | `/api/markets/<id>` | Get specific market |
| POST | `/api/markets` | Create new market |
| POST | `/api/markets/<id>/resolve` | Resolve market |
| GET | `/api/oracle/price/<symbol>` | Get crypto price |
| POST | `/api/research` | AI Research Agent |
| POST | `/api/registry/analyze` | Analyze market type |
| POST | `/api/registry/resolve` | Auto-resolve market |

## Security

- Wallet authentication required for market creation
- Server-side validation for all inputs
- Bags.fm API handles token minting security
- Firebase security rules for data access
- AI Research uses trusted external APIs (Google News, Open-Meteo)

## Leaderboard

Currently ranked in the Bags.fm Hackathon!

## Links

- Live App: https://www.predictionpro.io
- Blockchain: Solana mainnet
- Token Explorer: Solscan.io

---

*Built with Bags.fm API | Powered by Solana*
