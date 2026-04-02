import { BagsSDK } from '@bagsfm/bags-sdk';
import { Connection, PublicKey } from '@solana/web3.js';

const BAGS_API_KEY = 'bags_prod_uETEmbEsTAPBqFhzfs4dzKAqkCY7ZMIglDXfb6jsw2M';
const SOLANA_RPC = 'https://mainnet.helius-rpc.com/?api-key=2d71e3ac-2ceb-47e4-a7ed-96468cde524f';

export interface TokenLaunchResult {
  success: boolean;
  yesMint?: string;
  noMint?: string;
  error?: string;
}

export async function launchPredictionTokens(
  question: string,
  description: string,
  creatorWallet: PublicKey
): Promise<TokenLaunchResult> {
  try {
    const connection = new Connection(SOLANA_RPC);
    const sdk = new BagsSDK(BAGS_API_KEY, connection, 'confirmed');
    
    // Name must be under 32 chars total
    const questionShort = question.slice(0, 24); // Leave room for "YES: " or "NO: "
    const yesName = `YES:${questionShort}`;
    const noName = `NO:${questionShort}`;
    
    // Create YES token
    const yesResult = await sdk.tokenLaunch.createTokenInfoAndMetadata({
      name: yesName,
      symbol: 'YES',
      description: description || question,
      website: 'https://www.predictionpro.io',
      imageUrl: 'https://i.imgur.com/placeholder.png'
    });
    
    // Create NO token
    const noResult = await sdk.tokenLaunch.createTokenInfoAndMetadata({
      name: noName,
      symbol: 'NO',
      description: description || question,
      website: 'https://www.predictionpro.io',
      imageUrl: 'https://i.imgur.com/placeholder.png'
    });
    
    return {
      success: true,
      yesMint: yesResult.tokenMint,
      noMint: noResult.tokenMint
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Token launch failed'
    };
  }
}
