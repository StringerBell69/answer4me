import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["humain", "rapide", "disponible", "intelligent", "rentable"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
         <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] rounded-full bg-violet-200 blur-3xl" />
         <div className="absolute left-[-10%] bottom-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-200 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex gap-8 py-20 lg:py-32 items-center justify-center flex-col text-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-wide">
              Le Saviez-vous ?
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              <span className="font-bold text-primary">72% des clients</span> préfèrent résoudre leurs problèmes par téléphone plutôt que par chat.
            </span>
          </div>
          
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter font-regular text-slate-900">
              <span className="">Un standard téléphonique</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-primary h-[1.2em]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Ne manquez plus jamais un appel client. Notre IA répond avec une voix naturelle, qualifie les demandes et prend vos rendez-vous, 24h/24 et 7j/7.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Button size="lg" className="gap-2 h-12 px-8 text-base shadow-lg shadow-primary/20" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth'})}>
              <Play className="w-4 h-4 fill-current" /> Tester la démo vocale
            </Button>
            <Button size="lg" className="gap-2 h-12 px-8 text-base" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
              Voir les offres <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          {/* <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden`}>
                       <img src={`https://picsum.photos/100/100?random=${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                ))}
             </div>
             <p>Déjà utilisé par +500 entreprises</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export { Hero };