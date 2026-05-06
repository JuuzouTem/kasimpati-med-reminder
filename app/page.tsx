"use client";

import { useState } from "react";
import VisualAlert from "@/components/VisualAlert";
import FlowerBackground from "@/components/FlowerBackground";
import InstallPrompt from "@/components/InstallPrompt";
import MedStatusCard from "@/components/MedStatusCard"; // Eklenen import
import { useMedStore } from "@/lib/store";
import { Plus, Trash2, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function Home() {
  const { schedules, addSchedule, removeSchedule, takenLogs, triggerAlert } = useMedStore();
  const [newTime, setNewTime] = useState("09:00");
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex-1 flex flex-col relative min-h-[100dvh]">
      <FlowerBackground />
      
      <header className="w-full pt-16 pb-8 px-6 relative z-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-chrysanthemum-purple to-chrysanthemum-pink bg-clip-text text-transparent drop-shadow-sm">
          Kasımpatı
        </h1>
        <p className="text-gray-600 font-medium mt-2">Zarif & Sessiz Hatırlatıcı</p>
      </header>

      <main className="flex-1 flex flex-col relative z-10 px-6 overflow-y-auto pb-24">
        
        {/* YENİ: Günlük Özet Kartımız */}
        <MedStatusCard />

        {/* Saat Ekleme Kartı */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-lg font-bold text-chrysanthemum-purple mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            İlaç Saatleri
          </h2>
          
          <div className="flex gap-3 mb-6">
            <input 
              type="time" 
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="flex-1 bg-white/80 border border-gray-200 rounded-2xl px-4 py-3 text-lg font-bold text-gray-700 outline-none focus:ring-2 focus:ring-chrysanthemum-purple/50"
            />
            <button 
              onClick={() => addSchedule(newTime)}
              className="bg-chrysanthemum-purple text-white px-6 rounded-2xl font-bold shadow-md active:scale-95 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {schedules.length === 0 ? (
              <p className="text-center text-gray-400 font-medium py-4">Henüz saat eklenmedi.</p>
            ) : (
              schedules.map((time) => {
                const isTaken = takenLogs[`${todayDate}_${time}`];
                return (
                  <div key={time} className="flex items-center justify-between bg-white/80 p-4 rounded-2xl border border-white">
                    <div className="flex items-center gap-3">
                      {isTaken ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                      )}
                      <div>
                        <p className="text-xl font-bold text-gray-800">{time}</p>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {isTaken ? "Alındı" : "Bekliyor"}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeSchedule(time)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Test Butonu (Development için) */}
        <button 
          onClick={triggerAlert}
          className="text-sm font-bold text-chrysanthemum-purple/50 underline py-4 mt-4"
        >
          Visual Alert Test Et
        </button>

      </main>

      <VisualAlert />
      <InstallPrompt />
    </div>
  );
}