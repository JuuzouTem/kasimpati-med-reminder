"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMedStore } from "@/lib/store";
import { useVibration } from "@/hooks/useVibration";
import { BellRing, Check, X } from "lucide-react";

export default function VisualAlert() {
  const { isAlertActive, markAsTaken, dismissAlert } = useMedStore();
  const { vibrate, stopVibration } = useVibration();

  // Uyarı aktif olduğunda titreşim döngüsünü başlat
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAlertActive) {
      vibrate([500, 200, 500]); // İlk titreşim
      interval = setInterval(() => {
        vibrate([800, 300, 800, 300, 1000]); // Agresif ama ritmik desen
      }, 4000);
    } else {
      stopVibration();
    }

    return () => {
      clearInterval(interval);
      stopVibration();
    };
  }, [isAlertActive, vibrate, stopVibration]);

  return (
    <AnimatePresence>
      {isAlertActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
        >
          {/* Flaş patlama efekti (Arka plan) */}
          <motion.div
            className="absolute inset-0 bg-chrysanthemum-yellow"
            animate={{
              backgroundColor:["#FFD700", "#702963", "#FFD700"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ rotate:[0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
              className="bg-chrysanthemum-light p-4 rounded-full mb-6"
            >
              <BellRing className="w-12 h-12 text-chrysanthemum-purple" />
            </motion.div>

            <h2 className="text-2xl font-bold text-chrysanthemum-purple mb-2">
              İlaç Vakti!
            </h2>
            <p className="text-gray-600 mb-8 font-medium">
              Lütfen ilacını al ve onaylamak için aşağıdaki butona dokun.
            </p>

            <div className="flex flex-col w-full gap-4">
              <button
                onClick={markAsTaken}
                className="w-full py-4 px-6 bg-chrysanthemum-purple text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
              >
                <Check className="w-6 h-6" />
                Evet, İlacımı Aldım
              </button>
              
              <button
                onClick={dismissAlert}
                className="w-full py-4 px-6 bg-gray-100 text-gray-500 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5" />
                Şimdilik Kapat
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}