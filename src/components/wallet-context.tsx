"use client";

import { createContext, useContext, ReactNode } from "react";

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WalletContext.Provider value={{ connected: false, publicKey: null }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWalletContext = () => useContext(WalletContext);
