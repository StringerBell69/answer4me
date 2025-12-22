"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Tarifs simples et transparents",
  description = "Choisissez le plan adapté à votre activité. Sans engagement.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20" id="pricing">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          Facturation annuelle <span className="text-primary">(-20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative shadow-sm hover:shadow-md transition-shadow`,
              plan.isPopular ? "border-primary border-2 shadow-xl" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              "z-10"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-1 px-3 rounded-bl-xl rounded-tr-lg flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold text-sm">
                  Populaire
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-lg font-bold text-primary text-left uppercase tracking-wider">
                {plan.name}
              </p>
              <div className="mt-4 flex items-end justify-start gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== "Unique" && (
                  <span className="text-sm font-semibold mb-2 leading-6 tracking-wide text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground text-left mt-1">
                {isMonthly ? "facturé mensuellement" : "facturé annuellement"}
              </p>
              
              <p className="mt-4 text-sm text-muted-foreground text-left border-b pb-4">
                {plan.description}
              </p>

              <ul className="mt-6 gap-3 flex flex-col mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-left">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  className={cn(
                    buttonVariants({
                      variant: plan.isPopular ? "default" : "outline",
                      size: "lg"
                    }),
                    "w-full font-semibold tracking-tight shadow-sm"
                  )}
                  onClick={(e) => {
                     if (plan.href === '#') e.preventDefault();
                     else window.location.href = plan.href;
                  }}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
         <p className="text-sm text-muted-foreground">* pour un appel de 3 minutes</p>
      </div>
    </div>
  );
}