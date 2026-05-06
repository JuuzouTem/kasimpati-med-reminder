import { useEffect, useState } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useMedStore } from "@/lib/store";

export const useFCM = () => {
  const[fcmToken, setFcmToken] = useState<string | null>(null);
  const { triggerAlert } = useMedStore();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        if (!messaging) return;

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            // VAPID KEY'inizi .env dosyanıza eklemeniz gerekecek.
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          setFcmToken(token);
          // Gerçek senaryoda bu token'ı veritabanına (Firestore) kaydetmelisiniz.
          console.log("FCM Token:", token);
        }
      } catch (error) {
        console.error("FCM İzin/Token Hatası:", error);
      }
    };

    requestPermission();

    // Uygulama Ön Plandayken (Foreground) gelen bildirimi dinle ve Alarmı Tetikle
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Ön Planda Mesaj Alındı: ", payload);
        // Arka planda Firebase den bir trigger geldiğinde görsel uyarıyı patlat
        triggerAlert();
      });
      return () => unsubscribe();
    }
  }, [triggerAlert]);

  return { fcmToken };
};