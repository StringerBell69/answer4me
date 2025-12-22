import { motion } from "framer-motion";
import { Check, X, Mic, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const comparisons = [
  {
    aspect: "Temps de réponse",
    voice: "Instantané, naturel",
    chat: "Attente de lecture/écriture",
  },
  {
    aspect: "Complexité des demandes",
    voice: "Gère les nuances vocales",
    chat: "Limité au texte",
  },
  {
    aspect: "Accessibilité",
    voice: "Main-libre, en déplacement",
    chat: "Requiert un écran",
  },
  {
    aspect: "Connexion émotionnelle",
    voice: "Ton, empathie perceptibles",
    chat: "Froid, impersonnel",
  },
  {
    aspect: "Personnes âgées",
    voice: "Naturel et intuitif",
    chat: "Barrière technologique",
  },
];

export function WhyVoice() {
  return (
    <section id="why-voice" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            answer4.me : la <span className="gradient-text">différence</span> par la voix
          </h2>
          <p className="text-lg text-muted-foreground">
            Un chatbot lit et écrit. answer4.me écoute et parle. 
            La différence est fondamentale pour l'expérience client.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-1"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 bg-primary/10 rounded-xl py-3"
            >
              <Mic className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">answer4.me</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-2 bg-muted rounded-xl py-3"
            >
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-muted-foreground">Chatbot</span>
            </motion.div>
          </div>

          {/* Comparison rows */}
          {comparisons.map((item, index) => (
            <motion.div
              key={item.aspect}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-3 gap-4 py-4 border-b border-border last:border-0"
            >
              <div className="font-medium text-foreground flex items-center">
                {item.aspect}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{item.voice}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <X className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-muted-foreground">{item.chat}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg font-medium">
            <span className="gradient-text font-bold">72% des clients</span> préfèrent résoudre leurs problèmes par téléphone plutôt que par chat.
          </p>
          <p className="text-sm text-muted-foreground mt-2 mb-6">
            Source : Étude Microsoft Customer Service
          </p>
          <Button variant="default" className="gap-2" onClick={() => window.location.href = "#demo"}>
             Tester avec la démo <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}