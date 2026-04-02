"use client";

import { FC, ReactNode, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { isMobile } from "@/lib/mobile";

// Import mobile adapter
import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

interface Props {
  children: ReactNode;
}

export const WalletContextProvider: FC<Props> = ({ children }) => {
  // Mainnet
  const network = WalletAdapterNetwork.Mainnet;

  // Custom RPC endpoint
  const endpoint = useMemo(() => {
    return process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network);
  }, [network]);

  // Wallets - desktop + mobile support
  const wallets = useMemo(() => {
    const adapters: any[] = [
      new PhantomWalletAdapter(),      // Phantom - desktop
      new SolflareWalletAdapter(),     // Solflare - desktop
      new TorusWalletAdapter(),        // Torus - web-based
    ];

    // Add mobile wallet adapter for MWA-compatible wallets (Phantom, Solflare mobile)
    // This handles the deep linking properly
    if (isMobile()) {
      adapters.push(
        new SolanaMobileWalletAdapter({
          addressSelector: createDefaultAddressSelector(),
          appIdentity: {
            name: "PredictionPro",
            uri: "https://www.predictionpro.io",
            icon: "/favicon.ico", // Your app icon
          },
          authorizationResultCache: createDefaultAuthorizationResultCache(),
          cluster: network,
          onWalletNotFound: createDefaultWalletNotFoundHandler(),
        })
      );
    }

    return adapters;
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
