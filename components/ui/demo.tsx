import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Mic, Volume2, Play, Pause, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const scenarios = [
  {
    id: "info",
    title: "Demande d'information",
    description: "Un client demande vos horaires et services",
    conversation: [
      { speaker: "ai", text: "Bonjour ! Cabinet Dupont & Associés, je suis l'assistante vocale. Comment puis-je vous aider ?", audio: "/audio_v2/info_ai_1.mp3" },
      { speaker: "client", text: "Bonjour, je voudrais connaître vos horaires d'ouverture.", audio: "/audio_v2/info_client_1.mp3" },
      { speaker: "ai", text: "Bien sûr ! Nous sommes ouverts du lundi au vendredi de 9h à 18h, et le samedi matin de 9h à 12h. Souhaitez-vous prendre rendez-vous ?", audio: "/audio_v2/info_ai_2.mp3" },
      { speaker: "client", text: "Oui, ce serait possible demain matin ?", audio: "/audio_v2/info_client_2.mp3" },
      { speaker: "ai", text: "Parfait, j'ai un créneau disponible demain à 10h30. Puis-je avoir votre nom pour confirmer le rendez-vous ?", audio: "/audio_v2/info_ai_3.mp3" },
    ],
  },
  {
    id: "closed",
    title: "Entreprise fermée",
    description: "Un appel reçu en dehors des horaires",
    conversation: [
      { speaker: "ai", text: "Bonsoir ! Vous êtes bien chez Martin Plomberie. Nous sommes actuellement fermés, mais je peux vous aider.", audio: "/audio_v2/closed_ai_1.mp3" },
      { speaker: "client", text: "J'ai une fuite d'eau urgente !", audio: "/audio_v2/closed_client_1.mp3" },
      { speaker: "ai", text: "Je comprends, c'est urgent. Je vais transmettre immédiatement votre demande à notre plombier de garde. Pouvez-vous me donner votre adresse ?", audio: "/audio_v2/closed_ai_2.mp3" },
      { speaker: "client", text: "15 rue des Lilas à Bordeaux.", audio: "/audio_v2/closed_client_2.mp3" },
      { speaker: "ai", text: "C'est noté. Notre technicien vous rappellera dans les 10 minutes. En attendant, si possible, fermez l'arrivée d'eau principale. Y a-t-il autre chose ?", audio: "/audio_v2/closed_ai_3.mp3" },
    ],
  },
  {
    id: "escalation",
    title: "Escalade vers humain",
    description: "Une demande complexe nécessitant un transfert",
    conversation: [
      { speaker: "ai", text: "Bonjour ! Agence Immo Plus, que puis-je faire pour vous ?", audio: "/audio_v2/escalation_ai_1.mp3" },
      { speaker: "client", text: "Je souhaite faire une offre sur un bien que j'ai visité hier.", audio: "/audio_v2/escalation_client_1.mp3" },
      { speaker: "ai", text: "Excellent ! Quel est le bien concerné, s'il vous plaît ?", audio: "/audio_v2/escalation_ai_2.mp3" },
      { speaker: "client", text: "L'appartement T3 rue de la République.", audio: "/audio_v2/escalation_client_2.mp3" },
      { speaker: "ai", text: "Parfait, je vois le dossier. Pour une offre d'achat, je vais vous mettre en relation avec Mme Durand, notre conseillère en charge. Un instant, je vous transfère avec le contexte de votre demande...", audio: "/audio_v2/escalation_ai_3.mp3" },
    ],
  },
];

export function Demo() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  const playAudio = (audioSrc: string) => {
    return new Promise<void>((resolve) => {
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
        audioRef.current.onended = () => resolve();
        audioRef.current.onerror = () => resolve();
        audioRef.current.play().catch(() => resolve());
      } else {
        resolve();
      }
    });
  };

  const handlePlay = async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    setCurrentMessage(0);

    // Play through all messages with audio
    for (let i = 0; i < activeScenario.conversation.length; i++) {
      if (!isPlayingRef.current) break; // Check if stopped using ref
      
      setCurrentMessage(i);
      const msg = activeScenario.conversation[i];
      
      if (msg.audio) {
        await playAudio(msg.audio);
      } else {
        // Fallback delay if no audio
        await new Promise(resolve => setTimeout(resolve, 2500));
      }
    }

    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  // Cleanup on unmount or scenario change
  useEffect(() => {
    return () => stopPlayback();
  }, [activeScenario]);

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      {/* Hidden audio element */}
      <audio ref={audioRef} />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Écoutez la <span className="gradient-text">différence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez comment notre IA gère différents types d'appels avec naturel et efficacité.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scenario selector */}
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <motion.button
                key={scenario.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  stopPlayback();
                  setActiveScenario(scenario);
                  setCurrentMessage(0);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeScenario.id === scenario.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                <h4 className="font-semibold mb-1">{scenario.title}</h4>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Conversation display */}
          <div className="lg:col-span-2 bg-background rounded-2xl border border-border p-6">
            {/* Phone header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Appel en cours</p>
                  <p className="text-sm text-muted-foreground">{activeScenario.title}</p>
                </div>
              </div>
              <Button
                variant={isPlaying ? "secondary" : "gradient"}
                size="sm"
                onClick={handlePlay}
                className="gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Écouter"}
              </Button>
            </div>

            {/* Messages */}
            <div className="space-y-4 min-h-[300px]">
              <AnimatePresence mode="popLayout">
                {activeScenario.conversation.slice(0, currentMessage + 1).map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.speaker === "ai" ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.speaker === "ai"
                          ? "bg-gradient-to-br from-primary to-accent"
                          : "bg-secondary"
                      }`}
                    >
                      {msg.speaker === "ai" ? (
                        <Mic className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <User className="w-4 h-4 text-secondary-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.speaker === "ai"
                          ? "bg-primary/10 rounded-tl-sm"
                          : "bg-secondary rounded-tr-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      {msg.speaker === "ai" && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Volume2 className="w-3 h-3" />
                          <span>Voix IA naturelle</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
            <div className="inline-block p-1 rounded-full bg-slate-100 mb-6">
                 <div className="px-4 py-1 rounded-full bg-white border shadow-sm flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Sparkles className="w-4 h-4 text-primary" />
                    + de 50 voix et langues disponibles
                 </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Convaincu par la démonstration ?</h3>
            <div className="flex justify-center">
                <Button size="lg" className="px-8 shadow-md" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth'})}>
                    Rejoindre la liste d'attente
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}