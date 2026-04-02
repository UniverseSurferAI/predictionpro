"use client";

import { useEffect, useState } from "react";
import { checkBackendHealth } from "@/lib/api";
import { Wifi, WifiOff } from "lucide-react";

export function ApiStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    // Check if using mock mode
    setIsMock(process.env.NEXT_PUBLIC_USE_MOCK === "true");

    // Check backend health
    checkBackendHealth().then(setIsOnline);
  }, []);

  if (isOnline === null) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
        Checking API...
      </div>
    );
  }

  if (isMock) {
    return (
      <div className="flex items-center gap-2 text-xs text-amber-500">
        <WifiOff className="h-3 w-3" />
        Mock Mode
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2 text-xs text-amber-500" title="Using mock data - backend not connected">
        <WifiOff className="h-3 w-3" />
        Offline Mode
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-solana-cyan">
      <Wifi className="h-3 w-3" />
      Live API
    </div>
  );
}
