import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MedState {
  schedules: string[]; // Örn:["09:00", "20:30"]
  isAlertActive: boolean;
  takenLogs: Record<string, boolean>; // "2024-05-12_09:00": true
  lastAlertTime: number | null;
  addSchedule: (time: string) => void;
  removeSchedule: (time: string) => void;
  markAsTaken: (timeKey: string) => void;
  triggerAlert: () => void;
  dismissAlert: () => void;
}

export const useMedStore = create<MedState>()(
  persist(
    (set) => ({
      schedules:[],
      isAlertActive: false,
      takenLogs: {},
      lastAlertTime: null,

      addSchedule: (time) => set((state) => {
        if (!state.schedules.includes(time)) {
          return { schedules: [...state.schedules, time].sort() };
        }
        return state;
      }),

      removeSchedule: (time) => set((state) => ({
        schedules: state.schedules.filter(t => t !== time)
      })),

      markAsTaken: (timeKey) => set((state) => ({
        takenLogs: { ...state.takenLogs, [timeKey]: true },
        isAlertActive: false
      })),

      triggerAlert: () => set({ isAlertActive: true, lastAlertTime: Date.now() }),
      
      dismissAlert: () => set({ isAlertActive: false }),
    }),
    { name: "med-reminder-advanced" }
  )
);