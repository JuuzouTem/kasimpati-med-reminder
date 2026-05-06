import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, isSupported as isMessagingSupported, Messaging } from "firebase/messaging";
import { getAnalytics, isSupported as isAnalyticsSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let messaging: Messaging | null = null;
let analytics: Analytics | null = null;

// SADECE projectId varsa başlat, yoksa çökmesini engelle!
if (firebaseConfig.projectId) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);

    if (typeof window !== "undefined") {
      isMessagingSupported().then((supported) => {
        if (supported && app) messaging = getMessaging(app);
      });
      isAnalyticsSupported().then((supported) => {
        if (supported && app) analytics = getAnalytics(app);
      });
    }
  } catch (error) {
    console.error("Firebase başlatma hatası:", error);
  }
} else {
  console.warn("Firebase ayarları eksik. Uygulama sadece yerel (local) modda çalışıyor.");
}

export { app, db, messaging, analytics };