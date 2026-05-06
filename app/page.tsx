"use client";

import VisualAlert from "@/components/VisualAlert";
import MedStatusCard from "@/components/MedStatusCard";
import FlowerBackground from "@/components/FlowerBackground";
import InstallPrompt from "@/components/InstallPrompt";
import { useMedStore } from "@/lib/store";
import { Bell } from "lucide-react";

export default function Home() {
  const { triggerAlert } = useMedStore();

  return (
    <div className="flex-1 flex flex-col relative min-h-[100dvh]">
      <FlowerBackground />
      
      {/* Header */}
      <header className="w-full pt-12 pb-6 px-6 relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-chrysanthemum-purple">
            Kasımpatı
          </h1>
          <p className="text-chrysanthemum-earth font-medium">
            Günlük Hatırlatıcı
          </p>
        </div>
        
        {/* Test Butonu: Alert'i Manuel Tetikler */}
        <button 
          onClick={triggerAlert}
          className="p-3 bg-white/50 backdrop-blur-md rounded-full text-chrysanthemum-purple shadow-sm active:scale-95"
          aria-label="Test Alert"
        >
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        <MedStatusCard />
      </main>

      {/* Alerts & Prompts */}
      <VisualAlert />
      <InstallPrompt />
    </div>
  );
}