"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState, useCallback } from "react";
import { isMobile, isPhantomInstalled, openPhantomMobile, openSolflareMobile } from "@/lib/mobile";
import { Wallet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomConnectButton() {
  const { wallets, select, connect, connecting, connected, disconnect, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Clear stuck wallet adapter state on mobile if app not installed
    if (typeof window !== 'undefined' && isMobile() && !isPhantomInstalled()) {
      const savedWallet = localStorage.getItem("walletName");
      if (savedWallet?.includes("Phantom")) {
        localStorage.removeItem("walletName");
        localStorage.removeItem("walletAdapter");
      }
    }
  }, []);

  // Handle wallet selection (works for both mobile and desktop)
  const handleWalletSelect = useCallback(async (walletType: 'phantom' | 'solflare' | 'mobile') => {
    if (walletType === 'phantom') {
      const phantomWallet = wallets.find(w => w.adapter.name.toLowerCase().includes('phantom'));
      if (phantomWallet) {
        try {
          await select(phantomWallet.adapter.name);
          await connect();
          setShowWalletOptions(false);
        } catch (e) {
          console.error("Phantom connection failed:", e);
          if (isMobile()) openPhantomMobile();
        }
      } else if (isMobile()) {
        openPhantomMobile();
      }
    } else if (walletType === 'solflare') {
      if (isMobile()) {
        openSolflareMobile();
      } else {
        const solflareWallet = wallets.find(w => w.adapter.name.toLowerCase().includes('solflare'));
        if (solflareWallet) {
          try {
            await select(solflareWallet.adapter.name);
            await connect();
            setShowWalletOptions(false);
          } catch (e) {
            console.error("Solflare connection failed:", e);
          }
        }
      }
    } else if (walletType === 'mobile') {
      const mobileWallet = wallets.find(w => 
        w.adapter.name.includes('Mobile') || 
        w.adapter.name === 'Solana Mobile Wallet'
      );
      
      if (mobileWallet) {
        try {
          await select(mobileWallet.adapter.name);
          await connect();
          setShowWalletOptions(false);
        } catch (e) {
          console.error("Mobile wallet connection failed:", e);
          alert("Mobile wallet connection failed. Please try Phantom or Solflare instead.");
        }
      } else {
        alert("Mobile wallet adapter not found. Please try Phantom or Solflare.");
      }
    }
  }, [connect, select, wallets]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showWalletOptions) {
        setShowWalletOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showWalletOptions]);

  if (!mounted) {
    return (
      <Button disabled className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white opacity-50">
        <Wallet className="mr-2 h-4 w-4" />
        Connect
      </Button>
    );
  }

  // Connected state
  if (connected && publicKey) {
    return (
      <Button 
        onClick={() => disconnect()}
        className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
      </Button>
    );
  }

  // Show wallet options dropdown (both mobile and desktop)
  return (
    <div className="relative">
      {showWalletOptions ? (
        <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWalletSelect('phantom');
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-white hover:bg-slate-800"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#9945FF] text-xs">👻</span>
            Phantom
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWalletSelect('solflare');
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-white hover:bg-slate-800"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14F195] text-xs">☀️</span>
            Solflare
          </button>
          {isMobile() && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWalletSelect('mobile');
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-white hover:bg-slate-800"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-xs">📱</span>
              Mobile Wallet
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowWalletOptions(false);
            }}
            className="mt-2 w-full rounded-lg border border-slate-700 py-2 text-sm text-slate-400 hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      ) : null}
      
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setShowWalletOptions(true);
        }}
        disabled={connecting}
        className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90"
      >
        {connecting ? (
          <span className="mr-2 animate-spin">⚡</span>
        ) : (
          <Wallet className="mr-2 h-4 w-4" />
        )}
        {connecting ? "Connecting..." : "Connect Wallet"}
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
