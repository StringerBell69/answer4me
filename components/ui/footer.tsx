import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/40 bg-white/10 backdrop-blur-xl backdrop-saturate-150 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Effet de brillance "liquid" overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />
      
      <div className="container px-6 py-8 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm relative z-10">
        
        <div className="flex items-center gap-3">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-fuchsia-600 text-lg">answer4.me</span>
          <span className="text-slate-300/80">|</span>
          <p className="text-slate-500 font-medium">© {currentYear}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/40 border border-white/60 shadow-sm px-4 py-1.5 rounded-full backdrop-blur-md hover:bg-white/60 transition-colors cursor-default">
          <span>Conçu avec</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>en France</span>
        </div>
      </div>
    </footer>
  );
}