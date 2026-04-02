# PredictionPro

Prediction markets with real SPL tokens on Solana blockchain

PredictionPro creates actual YES/NO SPL tokens on Solana for every prediction market, powered by the Bags.fm Hackathon API.

## Live App

https://www.predictionpro.io

## Overview

PredictionPro transforms prediction markets by creating real blockchain tokens on Solana - not database entries.

User creates market → Bags.fm API mints YES/NO tokens

## AI Oracle System

PredictionPro features an autonomous AI Oracle that automatically verifies market outcomes:

### Oracle Registry (Phase 2)

The AI Oracle automatically detects market types and assigns appropriate resolvers:

| Market Type | Resolver | Data Source | Status |
|------------|----------|------------|--------|
| Crypto | CryptoResolver | 4 price feeds | ✅ Live |
| Weather | WeatherResolver | Open-Meteo API (40+ cities) | ✅ Live |
| Sports | SportsResolver | API-Sports | 🔧 Ready |
| General | NLResolver | Web Search | 🔜 Future |

### Price Sources (Crypto Oracle)

- Coinbase
- CryptoCompare
- Binance
- CoinCap

**Auto-resolution:** Oracle resolves markets when 3/4 sources agree within 0.5%

## Architecture

```
┌─────────────────────────────────────────┐
│ FRONTEND (Next.js 16)                  │
│ • Dark theme UI optimized for mobile    │
│ • Wallet integration (Phantom, Solflare)│
│ • AI Oracle price display              │
│ • Market listing, creation, trading UI│
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ BACKEND (Flask + Firebase)              │
│ • REST API for market operations        │
│ • Firebase Firestore for market data   │
│ • Bags.fm API integration               │
│ • AI Oracle Registry                    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ EXTERNAL SERVICES                       │
│ • Bags.fm Hackathon API - Token minting│
│ • Solana RPC - Blockchain operations    │
│ • Firebase - Data persistence           │
│ • Open-Meteo - Weather data (free)      │
│ • API-Sports - Sports data              │
└─────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, Tailwind CSS, TypeScript |
| Backend | Python Flask, Firebase Admin SDK |
| Database | Firebase Firestore |
| Blockchain | Solana (SPL tokens) |
| Token API | Bags.fm Hackathon API |

## Fee Structure

| Fee Type | Amount | Recipient |
|----------|--------|-----------|
| Trading Fee | 2% | Platform |
| Creator Share | 70% of fees | Market Creator |
| Platform Share | 30% of fees | Platform |
| Market Creation | ~$7 (0.05 SOL) | Bags Protocol |

**Creator Earnings Example:** $1,000 volume × 2% fee = $20 total fees → $14 to creator!

## Key Features

### Market Creation

- One-click market creation
- Categories: Crypto, Sports, Weather, Politics, Tech, Custom
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

### 1. Market Creation

User → Creates question → Backend → Bags.fm API
 ↓
 Mints YES + NO tokens
 ↓
 Deposits to liquidity pool
 ↓
 Returns SPL token addresses
 ↓
 User sees market live

### 2. Token Generation (Bags.fm Integration)

```json
POST /api/markets/create
{
 "question": "Will BTC hit $100k by 2026?",
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
| POST | `/api/registry/analyze` | Analyze market type |
| POST | `/api/registry/resolve` | Auto-resolve market |

## Security

- Wallet authentication required for market creation
- Server-side validation for all inputs
- Bags.fm API handles token minting security
- Firebase security rules for data access
- AI Oracle uses multiple independent sources

## Leaderboard

Currently ranked **#48** in the Bags.fm Hackathon with 153 points!

## Links

- Live App: https://www.predictionpro.io
- Blockchain: Solana mainnet
- Token Explorer: Solscan.io

---

*Built with Bags.fm Hackathon API*
