import { useEffect } from "react";
import { useMedStore } from "@/lib/store";

export const useMedLogic = () => {
  const { schedules, takenLogs, triggerAlert, isAlertActive, lastAlertTime } = useMedStore();

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const todayDate = now.toISOString().split("T")[0];

      schedules.forEach((time) => {
        const timeKey = `${todayDate}_${time}`;
        
        // Eğer bu saatin ilacı henüz ALINMADIYSA
        if (!takenLogs[timeKey]) {
          const[schedHour, schedMin] = time.split(':').map(Number);
          const schedTime = new Date();
          schedTime.setHours(schedHour, schedMin, 0, 0);

          // Eğer şu anki zaman, planlanan zamanı geçtiyse VEYA tam o ansa
          if (now.getTime() >= schedTime.getTime()) {
            if (!isAlertActive) {
              // 15 Dakika (900000 ms) erteleme mantığı
              if (!lastAlertTime || (now.getTime() - lastAlertTime) >= 15 * 60 * 1000) {
                triggerAlert();
              }
            }
          }
        }
      });
    };

    // 1. Bileşen yüklendiğinde ANINDA kontrol et
    checkAlarms();

    // 2. Ardından her 5 saniyede bir kontrol et (eskiden 60 sn idi)
    const interval = setInterval(checkAlarms, 5 * 1000);

    return () => clearInterval(interval);
  },[schedules, takenLogs, triggerAlert, isAlertActive, lastAlertTime]);
};