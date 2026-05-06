import { useEffect } from "react";
import { useMedStore } from "@/lib/store";

export const useMedLogic = () => {
  const { schedules, takenLogs, triggerAlert, isAlertActive, lastAlertTime } = useMedStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHourMin = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const todayDate = now.toISOString().split("T")[0];

      // 1. Planlanmış saatleri kontrol et
      schedules.forEach((time) => {
        const timeKey = `${todayDate}_${time}`;
        
        // Eğer bu saatin ilacı henüz ALINMADIYSA
        if (!takenLogs[timeKey]) {
          const [schedHour, schedMin] = time.split(':').map(Number);
          const schedTime = new Date();
          schedTime.setHours(schedHour, schedMin, 0, 0);

          // Eğer şu anki zaman, planlanan zamanı geçtiyse VEYA eşitse
          if (now.getTime() >= schedTime.getTime()) {
            // Hiç alarm çalmadıysa veya son alarmın üzerinden 15 dk (900000 ms) geçtiyse alert ver
            if (!isAlertActive) {
              if (!lastAlertTime || (now.getTime() - lastAlertTime) >= 15 * 60 * 1000) {
                triggerAlert();
              }
            }
          }
        }
      });
    }, 60 * 1000); // Her dakikada bir kontrol et

    return () => clearInterval(interval);
  }, [schedules, takenLogs, triggerAlert, isAlertActive, lastAlertTime]);
};