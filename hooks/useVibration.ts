import { useCallback, useEffect } from "react";

export const useVibration = () => {
  const vibrate = useCallback((pattern: number | number[]) => {
    // Sadece tarayıcı ortamında ve API destekleniyorsa çalıştır
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  },[]);

  const stopVibration = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(0); // Titreşimi durdurur
    }
  },[]);

  return { vibrate, stopVibration };
};