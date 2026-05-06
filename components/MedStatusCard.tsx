"use client";

import { useMedStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, Pill } from "lucide-react";

export default function MedStatusCard() {
  const { isTaken, markAsTaken, lastTakenDate } = useMedStore();

  return (
    <div className="relative z-10 w-full max-w-md mx-auto mt-12 px-6">
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
        {isTaken ? (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Harika!</h2>
            <p className="text-gray-600 font-medium">
              Bugünkü ilacını aldın. <br />
              <span className="text-sm text-gray-400">Son Alınma: {lastTakenDate}</span>
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-chrysanthemum-light/30 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-chrysanthemum-purple" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bekliyor</h2>
            <p className="text-gray-600 font-medium mb-8">
              Bugünkü ilacını henüz almadın.
            </p>
            <button
              onClick={markAsTaken}
              className="w-full py-4 px-6 bg-chrysanthemum-purple text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              <Pill className="w-6 h-6" />
              İlacımı Aldım
            </button>
          </>
        )}
      </div>
    </div>
  );
}