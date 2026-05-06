import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CHRYSANTHEMUM_THEME } from "@/lib/theme";
import ClientLogic from "@/components/ClientLogic";

const inter = Inter({ subsets:["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
  themeColor: CHRYSANTHEMUM_THEME.colors.purple,
};

export const metadata: Metadata = {
  title: "Kasımpatı | Med Reminder",
  description: "Görsel odaklı, sessiz ilaç hatırlatıcısı.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Kasımpatı",
    statusBarStyle: "default",
    // capable: true satırını kaldırdık çünkü artık next-pwa bunu otomatik/modern yolla yapıyor.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-chrysanthemum-cream text-chrysanthemum-purple antialiased overscroll-none`}
      >
        <ClientLogic />
        <main className="min-h-screen w-full flex flex-col relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}