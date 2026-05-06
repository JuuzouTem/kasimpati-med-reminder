"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMedStore } from "@/lib/store";
import { useVibration } from "@/hooks/useVibration";
import { BellRing, Check, X } from "lucide-react";

export default function VisualAlert() {
  const { isAlertActive, dismissAlert, schedules, takenLogs, markAsTaken } = useMedStore();
  const { vibrate, stopVibration } = useVibration();
  const [pendingTime, setPendingTime] = useState<string | null>(null);

  useEffect(() => {
    if (isAlertActive) {
      const todayDate = new Date().toISOString().split("T")[0];
      const now = new Date();
      
      const pending = schedules.find(time => {
        if (takenLogs[`${todayDate}_${time}`]) return false;
        const [h, m] = time.split(':').map(Number);
        const schedTime = new Date();
        schedTime.setHours(h, m, 0, 0);
        return now.getTime() >= schedTime.getTime();
      });

      setPendingTime(pending || "Bilinmiyor");
    }
  },[isAlertActive, schedules, takenLogs]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAlertActive) {
      // Boş catch bloğu hatasını çözmek için console.debug eklendi
      try { vibrate([500, 200, 500]); } catch (error) { console.debug("Vibration blocked", error); }
      interval = setInterval(() => {
        try { vibrate([800, 300, 800, 300, 1000]); } catch (error) { console.debug("Vibration blocked", error); }
      }, 4000);
    } else {
      stopVibration();
    }
    return () => { clearInterval(interval); stopVibration(); };
  },[isAlertActive, vibrate, stopVibration]);

  const handleTake = () => {
    if (pendingTime) {
      const todayDate = new Date().toISOString().split("T")[0];
      markAsTaken(`${todayDate}_${pendingTime}`);
    } else {
      dismissAlert();
    }
  };

  return (
    <AnimatePresence>
      {isAlertActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 backdrop-blur-md"
        >
          <motion.div
            className="absolute inset-0 bg-chrysanthemum-yellow mix-blend-color-burn"
            animate={{ opacity:[0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8 flex flex-col items-center text-center border border-white"
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              className="bg-gradient-to-br from-chrysanthemum-purple to-chrysanthemum-pink p-5 rounded-full mb-6 shadow-lg shadow-chrysanthemum-purple/30"
            >
              <BellRing className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-black text-gray-800 mb-2">İlaç Vakti!</h2>
            <p className="text-chrysanthemum-purple font-bold text-xl mb-4 bg-chrysanthemum-purple/10 px-4 py-2 rounded-xl">
              Saat: {pendingTime}
            </p>
            <p className="text-gray-500 mb-8 font-medium">
              Lütfen ilacını al ve onaylamak için aşağıdaki butona dokun. 15 dakika sonra tekrar soracağım.
            </p>

            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleTake}
                className="w-full py-4 px-6 bg-gradient-to-r from-chrysanthemum-purple to-chrysanthemum-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-chrysanthemum-purple/20 active:scale-95 transition-transform"
              >
                <Check className="w-6 h-6" /> Evet, Aldım
              </button>
              
              <button
                onClick={dismissAlert}
                className="w-full py-4 px-6 bg-gray-100/80 text-gray-500 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5" /> 15 Dakika Ertele
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}