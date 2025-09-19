import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  User, 
  Search, 
  Brain, 
  FileText, 
  DollarSign, 
  Rocket, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  details: string[];
  color: string;
}

const InteractiveTimeline = () => {
  const [currentStep, setCurrentStep] = useState([2]); // Slider value is an array
  const [autoPlay, setAutoPlay] = useState(false);

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: 'Inscription & Onboarding',
      description: 'Création de compte et configuration initiale',
      icon: User,
      duration: '2 min',
      status: 'completed',
      details: [
        'Inscription sécurisée en 30 secondes',
        'Questionnaire de profil personnalisé',
        'Configuration des préférences',
        'Accès instantané à la plateforme'
      ],
      color: 'cyber-primary'
    },
    {
      id: 2,
      title: 'Première Recherche',
      description: 'Saisie de la niche et lancement de l\'analyse',
      icon: Search,
      duration: '30 sec',
      status: 'current',
      details: [
        'Saisie du mot-clé de niche',
        'Validation automatique du marché',
        'Suggestions de niches alternatives',
        'Lancement de l\'analyse IA'
      ],
      color: 'cyber-secondary'
    },
    {
      id: 3,
      title: 'Génération IA',
      description: 'L\'IA analyse et génère le produit complet',
      icon: Brain,
      duration: '3-5 min',
      status: 'upcoming',
      details: [
        'Analyse concurrentielle approfondie',
        'Génération des hooks émotionnels',
        'Structure PDF professionnelle',
        'Création des bonus et pricing'
      ],
      color: 'cyber-tertiary'
    },
    {
      id: 4,
      title: 'Révision & Personnalisation',
      description: 'Ajustements et personnalisation du contenu',
      icon: FileText,
      duration: '10-15 min',
      status: 'upcoming',
      details: [
        'Révision du contenu généré',
        'Personnalisation des éléments',
        'Ajout de votre branding',
        'Validation finale'
      ],
      color: 'cyber-primary'
    },
    {
      id: 5,
      title: 'Finalisation Prix',
      description: 'Stratégie de pricing et optimisation',
      icon: DollarSign,
      duration: '5 min',
      status: 'upcoming',
      details: [
        'Analyse des prix du marché',
        'Stratégie de pricing optimale',
        'Configuration des offres',
        'Tests A/B automatiques'
      ],
      color: 'cyber-secondary'
    },
    {
      id: 6,
      title: 'Lancement & Suivi',
      description: 'Mise en ligne et tracking des performances',
      icon: Rocket,
      duration: 'Continu',
      status: 'upcoming',
      details: [
        'Déploiement sur vos canaux',
        'Tracking des performances',
        'Optimisation continue',
        'Support et conseils'
      ],
      color: 'cyber-tertiary'
    }
  ];

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev[0] >= timelineSteps.length ? 1 : prev[0] + 1;
          return [next];
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoPlay, timelineSteps.length]);

  const getCurrentStepData = () => {
    return timelineSteps.find(step => step.id === currentStep[0]) || timelineSteps[0];
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep[0]) return 'completed';
    if (stepId === currentStep[0]) return 'current';
    return 'upcoming';
  };

  const currentStepData = getCurrentStepData();
  const StepIcon = currentStepData.icon;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Timeline Header */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold">
          <span className="text-foreground">Journey</span>
          <span className="text-cyber-primary ml-2">Utilisateur</span>
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Suivez le parcours complet d'un nouvel utilisateur, de l'inscription au premier succès
        </p>
      </div>

      {/* Interactive Slider */}
      <Card className="p-6 bg-gradient-glass border border-cyber-primary/20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-cyber-primary">
              Étape du parcours
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className="border-cyber-primary/30 hover:bg-cyber-primary/10"
            >
              {autoPlay ? 'Pause' : 'Auto-Play'}
            </Button>
          </div>
          
          <Slider
            value={currentStep}
            onValueChange={setCurrentStep}
            max={timelineSteps.length}
            min={1}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            {timelineSteps.map((step) => (
              <span key={step.id} className="text-center">
                Étape {step.id}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-primary via-cyber-secondary to-cyber-tertiary opacity-30"></div>
        
        <div className="space-y-8">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);
            const isActive = step.id === currentStep[0];
            
            return (
              <div
                key={step.id}
                className={`relative flex items-start gap-6 transition-all duration-500 ${
                  isActive ? 'scale-105 opacity-100' : 'opacity-70'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  status === 'completed' 
                    ? 'bg-cyber-primary shadow-cyber' 
                    : status === 'current'
                      ? 'bg-gradient-primary shadow-glow animate-pulse-glow'
                      : 'bg-background/20 border border-cyber-primary/30'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    status === 'completed' || status === 'current' 
                      ? 'text-background' 
                      : 'text-muted-foreground'
                  }`} />
                </div>

                {/* Step Content */}
                <Card className={`flex-1 p-6 transition-all duration-500 ${
                  isActive 
                    ? 'bg-gradient-glass border border-cyber-primary/30 shadow-glass' 
                    : 'bg-background/5 border border-transparent'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className={`text-xl font-bold ${
                          isActive ? 'text-cyber-primary' : 'text-foreground'
                        }`}>
                          {step.title}
                        </h4>
                        <Badge variant="outline" className={`${
                          status === 'completed' 
                            ? 'border-cyber-primary text-cyber-primary bg-cyber-primary/10' 
                            : status === 'current'
                              ? 'border-cyber-secondary text-cyber-secondary bg-cyber-secondary/10'
                              : 'border-muted text-muted-foreground'
                        }`}>
                          {status === 'completed' ? 'Complété' : status === 'current' ? 'En cours' : 'À venir'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cyber-primary">
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>

                  {/* Step Details */}
                  {isActive && (
                    <div className="space-y-3 animate-slide-up">
                      <h5 className="font-semibold text-cyber-primary">Détails de l'étape :</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-cyber-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Summary */}
      <Card className="p-6 bg-gradient-primary">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
            <StepIcon className="w-8 h-8 text-background" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-background mb-2">
              Étape {currentStep[0]} : {currentStepData.title}
            </h4>
            <p className="text-background/80 mb-4">
              {currentStepData.description}
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-background/20 text-background border-background/30">
                <Clock className="w-3 h-3 mr-1" />
                {currentStepData.duration}
              </Badge>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
                Voir les détails
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveTimeline;