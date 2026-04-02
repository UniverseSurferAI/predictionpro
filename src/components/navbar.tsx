"use client";

import Link from "next/link";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { TrendingUp, PlusCircle, BarChart3, Home, Wallet, Sparkles, BookOpen, Menu, X, Globe, Lightbulb } from "lucide-react";
import { CustomConnectButton } from "./custom-connect-button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/markets", label: "Markets", icon: TrendingUp },
    { href: "/ecosystem", label: "Ecosystem", icon: Globe },
    { href: "/creator-guide", label: "Creator Guide", icon: Lightbulb },
    { href: "/create", label: "Create", icon: PlusCircle },
    { href: "/portfolio", label: "Portfolio", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-white">PredictionPro</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className="flex items-center gap-1.5 px-3 py-2 text-slate-300 hover:text-white text-sm"
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="flex items-center gap-2">
          <CustomConnectButton />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center gap-2 text-slate-300 hover:text-white py-2.5 px-2"
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
