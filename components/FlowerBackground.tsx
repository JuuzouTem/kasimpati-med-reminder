"use client";

export default function FlowerBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#FFFDF9]">
      {/* Premium Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-chrysanthemum-cream via-[#FFF5E4] to-[#FBE7D4] opacity-80" />
      
      {/* Kasımpatı (Chrysanthemum) Geometrik/Soyut Yaprak Desenleri */}
      <div className="absolute top-[-10%] right-[-10%] w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] opacity-30 animate-[spin_120s_linear_infinite]">
        {/* Çok katmanlı çiçek yaprakları yanılsaması */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 w-[80%] h-[20%] bg-gradient-to-r from-chrysanthemum-purple to-chrysanthemum-pink rounded-[100%] origin-left mix-blend-multiply filter blur-2xl"
            style={{ transform: `translateY(-50%) rotate(${i * 30}deg)` }}
          />
        ))}
      </div>

      {/* Ekstra Atmosfer Işıkları */}
      <div className="absolute bottom-[-10%] left-[-20%] w-96 h-96 bg-chrysanthemum-yellow rounded-full mix-blend-overlay filter blur-[100px] opacity-60 animate-pulse" />
      
      {/* Glassmorphism Doku */}
      <div className="absolute inset-0 backdrop-blur-[50px] bg-white/10" />
    </div>
  );
}