"use client";

import { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X } from "lucide-react";

export default function InstallPrompt() {
  const[isStandalone, setIsStandalone] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Sadece tarayıcıda çalıştır
    if (typeof window !== "undefined") {
      // Uygulama zaten "Ana Ekrana Eklenmiş" mi kontrol et
      const isAppMode = window.matchMedia("(display-mode: standalone)").matches || 
                        ("standalone" in window.navigator && (window.navigator as any).standalone === true);
      
      setIsStandalone(isAppMode);

      // Cihazın iOS olup olmadığını kontrol et
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIOSDevice);

      // Eğer uygulama ana ekranda değilse, prompt'u göster
      if (!isAppMode) {
        // Kullanıcıyı hemen bunaltmamak için hafif bir gecikme
        const timer = setTimeout(() => setShowPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
    }
  },[]);

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-8 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-3xl animate-in slide-in-from-bottom-full duration-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-chrysanthemum-purple flex items-center gap-2">
            <Download className="w-5 h-5" />
            Uygulamayı Yükle
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            Daha iyi bir deneyim ve tam ekran bildirimler için Kasımpatı'yı ana ekranına ekle.
          </p>
        </div>
        <button 
          onClick={() => setShowPrompt(false)}
          className="p-2 bg-gray-100 rounded-full text-gray-500 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isIOS ? (
        <div className="bg-chrysanthemum-light/20 p-4 rounded-2xl flex flex-col gap-3">
          <p className="text-sm text-gray-700 flex items-center gap-2">
            1. Alt menüden <Share className="w-5 h-5 text-blue-500" /> (Paylaş) butonuna dokun.
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            2. Listeden <PlusSquare className="w-5 h-5 text-gray-700" /> <strong>Ana Ekrana Ekle</strong>'yi seç.
          </p>
        </div>
      ) : (
        <div className="bg-chrysanthemum-light/20 p-4 rounded-2xl">
          <p className="text-sm text-gray-700">
            Tarayıcı menüsünden <strong>"Uygulamayı Yükle"</strong> (Install App) veya <strong>"Ana Ekrana Ekle"</strong> seçeneğini kullanabilirsin.
          </p>
        </div>
      )}
    </div>
  );
}