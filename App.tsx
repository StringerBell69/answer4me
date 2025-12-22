import React, { useState } from 'react';
import { Hero } from "@/components/ui/animated-hero";
import { Pricing } from "@/components/ui/pricing";
import { Button } from "@/components/ui/button";
import { WhyVoice } from "@/components/ui/why-voice";
import { Demo } from "@/components/ui/demo";
import { HowItWorks } from "@/components/ui/how-it-works";
import { Footer } from "@/components/ui/footer";
import { Check, ArrowRight, Lock, CreditCard, ShieldCheck, Flame } from "lucide-react";

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
    buttonText: "Sélectionner ce plan",
    href: "#",
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
    buttonText: "Sélectionner ce plan",
    href: "#",
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
    buttonText: "Nous contacter",
    href: "#",
    isPopular: false,
  },
];

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    // Small delay to allow render then scroll if needed, though replacing content keeps scroll position mostly
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Hero />
      
      <Demo />
      
      <WhyVoice />

      <HowItWorks />

      <section id="contact" className="py-20 bg-primary/5 container px-4 rounded-3xl my-12 mx-auto max-w-6xl transition-all duration-500">
        {!isRegistered ? (
          <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
                <h2 className="text-3xl font-bold mb-4">Découvrez nos tarifs exclusifs</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  L'accès à nos offres de lancement est réservé aux membres de la liste d'attente.
                  Inscrivez-vous pour débloquer immédiatement la grille tarifaire et bénéficier des frais de mise en service offerts.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Lock className="w-4 h-4" /></div>
                     <span>Accès immédiat aux tarifs</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Check className="w-4 h-4" /></div>
                     <span>Installation offerte (valeur 299€)</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Check className="w-4 h-4" /></div>
                     <span>Support VIP français</span>
                  </li>
                </ul>
             </div>
             <div className="bg-background p-8 rounded-2xl shadow-lg border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Lock className="w-24 h-24 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Accès Anticipé</h3>
                <form className="space-y-4 relative z-10" onSubmit={handleRegister}>
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Email professionnel</label>
                      <input required type="email" placeholder="contact@entreprise.com" className="w-full p-3 rounded-md border bg-slate-50 focus:ring-2 focus:ring-primary outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Secteur d'activité</label>
                      <select className="w-full p-3 rounded-md border bg-slate-50 focus:ring-2 focus:ring-primary outline-none">
                         <option>Santé / Médical</option>
                         <option>Juridique</option>
                         <option>Artisanat / BTP</option>
                         <option>Immobilier</option>
                         <option>Autre</option>
                      </select>
                   </div>
                   <Button className="w-full text-lg h-12 shadow-primary/25 shadow-lg">
                     Voir les tarifs <ArrowRight className="ml-2 w-4 h-4" />
                   </Button>
                   <p className="text-xs text-center text-muted-foreground">Places limitées pour la bêta.</p>
                </form>
             </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-700">
             <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 shadow-sm animate-pulse">
                    <CreditCard className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Dernière étape !</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Votre profil a été pré-créé. Sélectionnez maintenant votre offre ci-dessous pour finaliser votre inscription.
                </p>

                {/* Scarcity Banner - Matte Design */}
                <div className="max-w-md mx-auto bg-amber-50 border border-amber-200 p-5 rounded-lg shadow-sm text-left">
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                         <div className="p-1.5 bg-white rounded-md border border-amber-200">
                            <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
                         </div>
                         <span className="text-sm font-bold text-amber-950">Offre Lancement Bêta</span>
                      </div>
                      <span className="text-xs font-bold text-amber-800 bg-amber-200/50 px-2 py-1 rounded-md">
                         Plus que 13 dispos
                      </span>
                   </div>
                   
                   <div className="w-full bg-amber-100 rounded-full h-3 mb-3">
                      <div 
                          className="bg-amber-500 h-full rounded-full" 
                          style={{ width: '57%' }}
                      ></div>
                   </div>
                   
                   <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-amber-900">
                         ✅ <strong>17</strong> places validées aujourd'hui
                      </span>
                      <span className="text-amber-700">
                         13 places restantes
                      </span>
                   </div>
                </div>

             </div>
             <Pricing 
                plans={pricingPlans} 
                title="Choisissez votre abonnement"
                description="Activez votre ligne immédiatement. Satisfait ou remboursé sous 30 jours."
             />
             <div className="mt-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white rounded-full border shadow-sm">
                   <ShieldCheck className="w-4 h-4 text-green-600" />
                   <span>Paiement sécurisé par Stripe (SSL)</span>
                </div>
                <p className="text-xs opacity-70">Les prix sont affichés HT. TVA applicable au paiement. Une facture récupérable vous sera envoyée.</p>
             </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}