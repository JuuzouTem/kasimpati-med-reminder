// Bu dosya public klasöründe olmalıdır
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// .env'den alamayacağımız için burada manuel olarak Firebase konfigürasyonunu eklemeniz gerekir.
// BURAYI KENDİ FIREBASE BİLGİLERİNİZLE DOLDURUN!
const firebaseConfig = {
  apiKey: "AIzaSyDdBK1ENdgxUxf_QXwfDxut_wVsNTnYGuI",
  authDomain: "kasimpati-med-reminder.firebaseapp.com",
  projectId: "kasimpati-med-reminder",
  storageBucket: "kasimpati-med-reminder.firebasestorage.app",
  messagingSenderId: "78018697820",
  appId: "1:78018697820:web:20911c8cf2c99fe89e6499",
  measurementId: "G-62G3L3RZKF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

// Arka planda gelen mesajlar
messaging.onBackgroundMessage((payload) => {
  console.log("Arka Planda Mesaj Alındı:", payload);

  // Sessiz bir bildirim gösteriyoruz ki tıkladığında uygulamayı ön plana atsın
  const notificationTitle = "İlaç Vakti!";
  const notificationOptions = {
    body: "Lütfen ilacını alıp onaylar mısın?",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    silent: true, // Audio bildirim İSTEMİYORUZ (Rule 4)
    vibrate:[500, 200, 500], // Donanımsal titreşim
    data: { url: "/" } // Tıklanınca ana sayfaya at
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirime tıklandığında uygulamanın açılması için
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});