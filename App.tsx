
import React, { useState } from 'react';
import { Hero } from "@/components/ui/animated-hero";
import { Pricing } from "@/components/ui/pricing";
import { Demo } from "@/components/ui/demo";
import { HowItWorks } from "@/components/ui/how-it-works";
import { Footer } from "@/components/ui/footer";
import { CheckCircle2, Send, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// --- Data Configuration ---

const pricingPlans = [
  {
    name: "STARTER",
    price: "149",
    yearlyPrice: "119",
    period: "/mois HT",
    features: [
      "500 minutes d'appels* (~150 appels)",
      "1 numéro de téléphone",
      "1 assistant vocal",
      "Configuration de base (FAQ, horaires)",
      "Transfert d'appel simple",
      "Dashboard basique & Support email",
      "Minute sup. : 0,40€",
    ],
    description: "Artisans, micro-entreprises, cabinets individuels.",
    buttonText: "Rejoindre la liste d'attente",
    href: "#waitlist",
    isPopular: false,
  },
  {
    name: "BUSINESS",
    price: "349",
    yearlyPrice: "279",
    period: "/mois HT",
    features: [
      "1500 minutes d'appels* (~500 appels)",
      "2 numéros de téléphone",
      "2 assistants personnalisables",
      "RAG avancé (upload documents)",
      "Transfert intelligent multi-lignes",
      "Analytics, Reporting & Webhooks",
      "Support prioritaire",
      "Minute sup. : 0,30€",
    ],
    description: "PME, agences, cabinets multi-associés.",
    buttonText: "Rejoindre la liste d'attente",
    href: "#waitlist",
    isPopular: true,
  },
  {
    name: "PREMIUM",
    price: "799",
    yearlyPrice: "639",
    period: "/mois HT",
    features: [
      "5000 minutes d'appels* (~1665 appels)",
      "Numéros & Assistants illimités",
      "Personnalisation voix avancée",
      "Intégrations CRM (HubSpot, Pipedrive)",
      "API complète & Exports",
      "Support téléphone dédié & SLA 99,9%",
      "Minute sup. : 0,20€",
    ],
    description: "Grandes PME, multi-sites, centres d'appels.",
    buttonText: "Rejoindre la liste d'attente",
    href: "#waitlist",
    isPopular: false,
  },
];

const sectors = [
  "Immobilier",
  "Santé / Médical",
  "Juridique (Avocat, Notaire)",
  "Artisanat / BTP",
  "Commerce / E-commerce",
  "Services aux entreprises",
  "Autre"
];

export default function App() {
  const [step, setStep] = useState(0); // 0: Email + Sector, 1: Problem, 2: Success
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [problem, setProblem] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email && sector) {
        setStep(1);
    }
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Ici, envoi final des données au backend
  }

  const resetForm = () => {
    setStep(0);
    setEmail("");
    setSector("");
    setProblem("");
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Hero />
      
      <Demo />
      
      <HowItWorks />

      <section id="contact" className="py-20 bg-primary/5 container px-4 rounded-3xl my-12 mx-auto max-w-6xl transition-all duration-500">
          <div className="animate-in fade-in zoom-in-95 duration-700">
             
             {/* Pricing Section (Indicative) */}
             <Pricing 
                plans={pricingPlans} 
                title="Tarifs envisagés"
                description="Nos offres sont en cours de finalisation. Inscrivez-vous pour être informé du lancement et bénéficier d'une remise exclusive."
             />

             {/* Waitlist Section */}
             <div id="waitlist" className="mt-16 max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-primary/10 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center">
                   
                   {step === 0 && (
                     <>
                       <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                          <Sparkles className="w-6 h-6 text-primary" />
                       </div>
                       
                       <h3 className="text-3xl font-bold mb-4 tracking-tight">Accès Bêta Restreint</h3>
                       <p className="text-muted-foreground mb-8 text-lg">
                          Nous ouvrons les accès progressivement pour garantir une qualité de service irréprochable. 
                          <br className="hidden md:block"/>
                          Rejoignez les <span className="font-bold text-primary">13 entreprises</span> en file d'attente.
                       </p>
                       
                       <form onSubmit={handleStep1Submit} className="flex flex-col gap-4 max-w-md mx-auto">
                           <div className="space-y-1 text-left">
                               <Label htmlFor="email" className="sr-only">Email professionnel</Label>
                               <Input 
                                   id="email"
                                   type="email" 
                                   placeholder="votre@email.pro" 
                                   required 
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-all shadow-sm"
                               />
                           </div>

                           <div className="space-y-1 text-left relative">
                               <Label htmlFor="sector" className="sr-only">Secteur d'activité</Label>
                               <div className="relative">
                                   <select
                                       id="sector"
                                       required
                                       value={sector}
                                       onChange={(e) => setSector(e.target.value)}
                                       className="flex h-12 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-base shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-slate-900"
                                   >
                                       <option value="" disabled className="text-muted-foreground">Sélectionnez votre activité</option>
                                       {sectors.map((s) => (
                                           <option key={s} value={s}>{s}</option>
                                       ))}
                                   </select>
                                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
                               </div>
                           </div>

                           <Button type="submit" size="lg" className="h-12 w-full font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]">
                               M'inscrire <Send className="w-4 h-4 ml-2" />
                           </Button>
                       </form>
                     </>
                   )}

                   {step === 1 && (
                     <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-left max-w-md mx-auto">
                        <div className="mb-6 text-center">
                           <h3 className="text-2xl font-bold mb-2">Une dernière question</h3>
                           <p className="text-muted-foreground">Pour personnaliser votre expérience.</p>
                        </div>

                        <form onSubmit={handleStep2Submit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="problem" className="text-base font-medium">Quel problème aimeriez-vous résoudre avec un répondeur IA vocal ? <span className="text-muted-foreground font-normal text-sm">(Optionnel)</span></Label>
                                <Textarea 
                                    id="problem"
                                    placeholder="Ex: Je perds trop de temps au téléphone, je rate des appels le week-end, je veux filtrer le démarchage..." 
                                    value={problem}
                                    onChange={(e) => setProblem(e.target.value)}
                                    className="bg-slate-50 min-h-[120px] text-base resize-none"
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full h-12 text-base shadow-md">
                                Valider mon inscription <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                     </div>
                   )}

                   {step === 2 && (
                       <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <div className="p-3 bg-green-100 rounded-full shadow-sm">
                              <CheckCircle2 className="w-10 h-10 text-green-600" />
                           </div>
                           <h4 className="font-bold text-2xl">Inscription validée !</h4>
                           <p className="text-green-700/80 text-center max-w-sm">
                             Merci pour ces détails. Nous avons bien reçu votre demande et nous vous contacterons très prochainement.
                           </p>
                           <Button variant="ghost" size="sm" onClick={resetForm} className="mt-4 text-green-700 hover:text-green-800 hover:bg-green-100">
                              Inscrire une autre entreprise
                           </Button>
                       </div>
                   )}
                   
                   {step === 0 && (
                     <p className="text-xs text-muted-foreground mt-6 opacity-70">
                         Promis, nous ne spammons pas. Vos données restent confidentielles.
                     </p>
                   )}
                </div>
             </div>

          </div>
      </section>

      <Footer />
    </div>
  );
}
