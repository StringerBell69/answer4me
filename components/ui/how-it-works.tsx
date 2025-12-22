import { Button } from "@/components/ui/button";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { Phone, BrainCircuit, MessageSquareText, ChevronRight, ArrowRight } from "lucide-react";

const STEPS = [
  {
    id: "step-1",
    title: "Transférez vos appels",
    description:
      "Activez le renvoi d'appel vers le numéro dédié que nous vous fournissons. C'est tout. Compatible avec tous les opérateurs (Orange, SFR, Bouygues, Free).",
    icon: Phone,
    step: "01",
  },
  {
    id: "step-2",
    title: "L'IA s'occupe de tout",
    description:
      "Elle répond instantanément, renseigne sur vos horaires, et prend les messages ou les rendez-vous directement dans votre agenda synchronisé.",
    icon: BrainCircuit,
    step: "02",
  },
  {
    id: "step-3",
    title: "Recevez le résumé",
    description:
      "Vous recevez instantanément un SMS ou un email avec le résumé de l'appel, la transcription complète et les actions prises (RDV noté, urgence, etc.).",
    icon: MessageSquareText,
    step: "03",
  },
];

export function HowItWorks() {
  return (
    <div className="bg-slate-50 text-slate-900" id="how-it-works">
      <div className="container min-h-svh place-content-center px-6 xl:px-12">
        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
          
          <div className="left-0 top-0 md:sticky md:h-svh md:py-24 flex flex-col justify-center">
            <h5 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">
              Comment ça marche
            </h5>
            <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight">
              Installation en <br/>
              <span className="text-primary">5 minutes chrono</span>
            </h2>
            <p className="max-w-prose text-sm md:text-base text-muted-foreground leading-relaxed">
              Aucune compétence technique requise. Nous avons conçu answer4.me pour qu'il s'intègre à votre quotidien sans friction. Votre standardiste virtuel est prêt à l'emploi.
            </p>
            
            <div className="mt-8 flex flex-col gap-4">
               <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">1</div>
                  Renvoi d'appel
               </div>
               <div className="w-[1px] h-4 bg-border ml-3"></div>
               <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">2</div>
                  Configuration IA
               </div>
               <div className="w-[1px] h-4 bg-border ml-3"></div>
               <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">3</div>
                  Pilotage
               </div>
            </div>

            <div className="mt-10">
                <Button size="lg" className="w-full md:w-auto gap-2 shadow-lg shadow-primary/20" onClick={() => window.location.href = "#contact"}>
                    Réserver ma place <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="mt-2 text-xs text-muted-foreground pl-1">Aucun paiement immédiat requis</p>
            </div>
          </div>

          <ContainerScroll className="min-h-[120vh] space-y-8 py-24">
            {STEPS.map((step, index) => (
              <CardSticky
                key={step.id}
                index={index + 1}
                incrementY={50}
                className="rounded-2xl border p-8 shadow-md backdrop-blur-md bg-white/90"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {step.title}
                  </h2>
                  <h3 className="text-2xl font-bold text-primary/20">
                    {step.step}
                  </h3>
                </div>

                <div className="flex gap-4 mb-6">
                   <div className="p-3 bg-primary/5 rounded-xl text-primary h-fit">
                      <step.icon className="w-6 h-6" />
                   </div>
                   <p className="text-muted-foreground leading-relaxed">
                     {step.description}
                   </p>
                </div>
                
                <div className="flex items-center text-primary text-sm font-medium cursor-pointer group">
                   En savoir plus <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </div>
  );
}