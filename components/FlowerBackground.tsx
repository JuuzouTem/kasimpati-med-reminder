export default function FlowerBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {/* Basit soyut çiçek/yaprak desenlerini temsil eden bulanık yuvarlaklar */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-chrysanthemum-pink rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-chrysanthemum-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-20 w-72 h-72 bg-chrysanthemum-purple rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
    </div>
  );
}