"use client";

import { useMedLogic } from "@/hooks/useMedLogic";
import { useFCM } from "@/hooks/useFCM";

export default function ClientLogic() {
  // Bu hooklar uygulama çalıştığı sürece arka planda mantığı işletir
  useMedLogic();
  useFCM();

  return null; // Görsel olarak bir şey render etmez, sadece mantık çalıştırır
}