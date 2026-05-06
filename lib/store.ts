import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MedState {
  isTaken: boolean;
  isAlertActive: boolean;
  lastTakenDate: string | null; // "YYYY-MM-DD"
  lastAlertTime: number | null; // Zaman damgası (Timestamp)
  markAsTaken: () => void;
  triggerAlert: () => void;
  dismissAlert: () => void;
  resetDailyStatus: () => void;
}

export const useMedStore = create<MedState>()(
  persist(
    (set) => ({
      isTaken: false,
      isAlertActive: false,
      lastTakenDate: null,
      lastAlertTime: null,

      markAsTaken: () => {
        const today = new Date().toISOString().split("T")[0];
        set({ isTaken: true, isAlertActive: false, lastTakenDate: today, lastAlertTime: null });
      },

      triggerAlert: () => set({ isAlertActive: true, lastAlertTime: Date.now() }),
      
      dismissAlert: () => set({ isAlertActive: false }),

      resetDailyStatus: () => set({ isTaken: false, isAlertActive: false, lastAlertTime: null }),
    }),
    {
      name: "med-reminder-storage",
    }
  )
);