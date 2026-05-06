import { useEffect } from "react";
import { useMedStore } from "@/lib/store";

export const useMedLogic = () => {
  const { 
    isTaken, 
    lastTakenDate, 
    resetDailyStatus, 
    triggerAlert, 
    isAlertActive, 
    lastAlertTime 
  } = useMedStore();

  useEffect(() => {
    // 1. Ertesi Gün Sıfırlama Kontrolü (Next Day Reset)
    const today = new Date().toISOString().split("T")[0];
    if (lastTakenDate && lastTakenDate !== today) {
      resetDailyStatus();
    }

    // 2. Israrcı Hatırlatma Mantığı (Her 15 Dakikada Bir)
    // Test etmek isterseniz 15 * 60 * 1000 yerine 1 * 60 * 1000 (1 dakika) yapabilirsiniz.
    const REMINDER_INTERVAL_MS = 15 * 60 * 1000; 

    const interval = setInterval(() => {
      if (!isTaken && !isAlertActive) {
        const now = Date.now();
        // Eğer hiç alarm çalmadıysa VEYA son alarmın üzerinden 15 dk geçtiyse
        if (!lastAlertTime || (now - lastAlertTime) >= REMINDER_INTERVAL_MS) {
          triggerAlert();
        }
      }
    }, 60 * 1000); // Kontrolü her 1 dakikada bir yap (CPU'yu yormamak için)

    return () => clearInterval(interval);
  },[isTaken, lastTakenDate, resetDailyStatus, triggerAlert, isAlertActive, lastAlertTime]);
};