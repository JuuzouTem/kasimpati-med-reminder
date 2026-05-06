"use client";

import { useMedStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function MedStatusCard() {
  const { schedules, takenLogs } = useMedStore();
  const[todayDate, setTodayDate] = useState("");

  // Hydration hatasını önlemek için tarihi client-side'da alıyoruz
  useEffect(() => {
    setTodayDate(new Date().toISOString().split("T")[0]);
  },[]);

  if (!todayDate) return null;

  // Matematiksel hesaplamalar
  const totalMeds = schedules.length;
  const takenMeds = schedules.filter(time => takenLogs[`${todayDate}_${time}`]).length;
  const allTaken = totalMeds > 0 && totalMeds === takenMeds;

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Günlük İlerleme</h2>
        <p className="text-gray-600 font-medium text-sm mt-1">
          {totalMeds === 0 
            ? "Henüz saat eklemedin." 
            : allTaken 
              ? "Harika! Bugünkü tüm ilaçlarını aldın." 
              : `${totalMeds} ilaçtan ${takenMeds} tanesi alındı.`}
        </p>
      </div>
      
      <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
        totalMeds === 0 ? "bg-blue-100" : allTaken ? "bg-green-100" : "bg-amber-100"
      }`}>
        {totalMeds === 0 ? (
          <Info className="w-8 h-8 text-blue-500" />
        ) : allTaken ? (
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        ) : (
          <AlertCircle className="w-8 h-8 text-amber-500" />
        )}
      </div>
    </div>
  );
}