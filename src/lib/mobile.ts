"use client";

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isIOS = (): boolean => {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
};

export const isFirefox = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Firefox/i.test(navigator.userAgent);
};

export const isChrome = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Chrome/i.test(navigator.userAgent) && !/Edg|OPR/i.test(navigator.userAgent);
};

export const isPhantomInstalled = (): boolean => {
  if (typeof window === "undefined") return false;
  // @ts-ignore
  return window?.phantom?.solana?.isPhantom === true;
};

export const openPhantomMobile = () => {
  const url = encodeURIComponent("https://www.predictionpro.io");
  const ref = encodeURIComponent("https://www.predictionpro.io");
  
  if (isIOS()) {
    // iOS deep link
    window.location.href = `phantom://browse/${url}?ref=${ref}`;
    // Fallback to app store after delay
    setTimeout(() => {
      window.location.href = "https://apps.apple.com/us/app/phantom-crypto-wallet/id1598432977";
    }, 2000);
  } else if (isAndroid()) {
    // Android deep link
    window.location.href = `phantom://browse/${url}?ref=${ref}`;
    // Fallback to play store after delay
    setTimeout(() => {
      window.location.href = "https://play.google.com/store/apps/details?id=app.phantom";
    }, 2000);
  }
};

export const openSolflareMobile = () => {
  const url = encodeURIComponent("https://www.predictionpro.io");
  
  if (isIOS()) {
    window.location.href = `solflare://browse/${url}`;
    setTimeout(() => {
      window.location.href = "https://apps.apple.com/us/app/solflare-wallet/id1580902717";
    }, 2000);
  } else if (isAndroid()) {
    window.location.href = `solflare://browse/${url}`;
    setTimeout(() => {
      window.location.href = "https://play.google.com/store/apps/details?id=com.solflare.mobile";
    }, 2000);
  }
};
