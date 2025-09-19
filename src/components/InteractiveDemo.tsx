import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Loader2, 
  CheckCircle, 
  FileText, 
  Target, 
  Gift, 
  DollarSign,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: number;
  color: string;
}

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBlocks, setGeneratedBlocks] = useState<string[]>([]);

  const demoSteps: DemoStep[] = [
    {
      id: 'input',
      title: 'Saisie du mot-clé',
      description: 'L\'utilisateur entre sa niche',
      icon: Search,
      duration: 3000,
      color: 'cyber-primary'
    },
    {
      id: 'analyze',
      title: 'Analyse IA en cours',
      description: 'Traitement neuronal des données',
      icon: Brain,
      duration: 4000,
      color: 'cyber-secondary'
    },
    {
      id: 'generate',
      title: 'Génération des blocs',
      description: 'Création automatique du contenu',
      icon: Zap,
      duration: 3000,
      color: 'cyber-tertiary'
    },
    {
      id: 'complete',
      title: 'Produit finalisé',
      description: 'Tous les éléments générés',
      icon: CheckCircle,
      duration: 2000,
      color: 'cyber-primary'
    }
  ];

  const generatedBlocksData = [
    { icon: Target, title: 'Analyse Concurrence', color: 'bg-red-500' },
    { icon: Sparkles, title: 'Hooks Émotionnels', color: 'bg-blue-500' },
    { icon: FileText, title: 'Structure PDF', color: 'bg-green-500' },
    { icon: Gift, title: 'Bonus Irrésistibles', color: 'bg-purple-500' },
    { icon: DollarSign, title: 'Pricing Optimisé', color: 'bg-yellow-500' }
  ];

  const typewriterTexts = [
    'coaching en ligne',
    'formation crypto',
    'guide mindset',
    'méthode dropshipping'
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const currentStepData = demoSteps[currentStep];
      
      if (progress < 100) {
        setProgress(prev => Math.min(prev + (100 / (currentStepData.duration / 100)), 100));
      } else {
        // Reset progress and move to next step
        setProgress(0);
        setCurrentStep(prev => (prev + 1) % demoSteps.length);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentStep, progress, isPlaying]);

  // Typewriter effect for input step
  useEffect(() => {
    if (currentStep === 0 && isPlaying) {
      const text = typewriterTexts[Math.floor(Date.now() / 10000) % typewriterTexts.length];
      let index = 0;
      setInputText('');
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setInputText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentStep, isPlaying]);

  // Loading effect for analyze step
  useEffect(() => {
    setIsLoading(currentStep === 1);
  }, [currentStep]);

  // Blocks generation effect
  useEffect(() => {
    if (currentStep === 2) {
      setGeneratedBlocks([]);
      const blockInterval = setInterval(() => {
        setGeneratedBlocks(prev => {
          if (prev.length < generatedBlocksData.length) {
            return [...prev, generatedBlocksData[prev.length].title];
          }
          clearInterval(blockInterval);
          return prev;
        });
      }, 600);

      return () => clearInterval(blockInterval);
    } else if (currentStep === 3) {
      setGeneratedBlocks(generatedBlocksData.map(block => block.title));
    } else {
      setGeneratedBlocks([]);
    }
  }, [currentStep]);

  const CurrentIcon = demoSteps[currentStep].icon;

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Floating Computer Mockup */}
      <div className="relative perspective-1000">
        <div className="relative transform rotate-x-5 animate-float">
          <Card className="p-8 bg-gradient-glass border border-cyber-primary/30 shadow-glass backdrop-blur-xl overflow-hidden">
            {/* Computer Frame */}
            <div className="relative">
              {/* Screen Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-primary animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                <div className="flex-1 bg-background/20 rounded-lg px-4 py-2 text-sm text-cyber-primary border border-cyber-primary/20">
                  niche-launchpad.ai/generator
                </div>
                <Badge variant="secondary" className="bg-cyber-primary/10 text-cyber-primary border-cyber-primary/20">
                  LIVE DEMO
                </Badge>
              </div>

              {/* Demo Content */}
              <div className="min-h-[400px] space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8">
                  {demoSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={step.id} className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          index === currentStep 
                            ? 'bg-gradient-primary shadow-cyber' 
                            : index < currentStep 
                              ? 'bg-cyber-primary/20 text-cyber-primary' 
                              : 'bg-background/20 text-muted-foreground'
                        }`}>
                          <StepIcon className="w-5 h-5" />
                        </div>
                        {index < demoSteps.length - 1 && (
                          <div className={`w-12 h-0.5 transition-colors duration-500 ${
                            index < currentStep ? 'bg-cyber-primary' : 'bg-background/20'
                          }`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Current Step Display */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <CurrentIcon className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-xl font-bold text-cyber-primary mb-2">
                    {demoSteps[currentStep].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {demoSteps[currentStep].description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <Progress 
                    value={progress} 
                    className="h-2 bg-background/20"
                  />
                </div>

                {/* Step-specific Content */}
                <div className="bg-background/10 rounded-xl p-6 border border-cyber-primary/10">
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <label className="text-sm text-muted-foreground">Entrez votre niche :</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={inputText}
                          readOnly
                          className="w-full p-4 bg-background/20 border border-cyber-primary/20 rounded-lg text-lg focus:border-cyber-primary/50 transition-colors"
                          placeholder="Ex: coaching en ligne..."
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <div className="w-0.5 h-6 bg-cyber-primary animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="text-center space-y-4">
                      <Loader2 className="w-12 h-12 animate-spin text-cyber-primary mx-auto" />
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Analyse en cours...</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-2 bg-cyber-primary/20 rounded animate-pulse"></div>
                          <div className="h-2 bg-cyber-secondary/20 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
                          <div className="h-2 bg-cyber-tertiary/20 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground mb-4">Génération des blocs...</div>
                      <div className="grid grid-cols-1 gap-3">
                        {generatedBlocksData.map((block, index) => {
                          const BlockIcon = block.icon;
                          const isGenerated = generatedBlocks.includes(block.title);
                          return (
                            <div key={block.title} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                              isGenerated 
                                ? 'bg-cyber-primary/10 border border-cyber-primary/30' 
                                : 'bg-background/5 border border-transparent'
                            }`}>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                                isGenerated ? block.color : 'bg-background/20'
                              }`}>
                                <BlockIcon className={`w-4 h-4 ${
                                  isGenerated ? 'text-white' : 'text-muted-foreground'
                                }`} />
                              </div>
                              <span className={`font-medium transition-colors duration-500 ${
                                isGenerated ? 'text-cyber-primary' : 'text-muted-foreground'
                              }`}>
                                {block.title}
                              </span>
                              {isGenerated && (
                                <CheckCircle className="w-4 h-4 text-cyber-primary ml-auto animate-scale-in" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-cyber-primary/10 flex items-center justify-center mx-auto animate-bounce">
                        <CheckCircle className="w-8 h-8 text-cyber-primary" />
                      </div>
                      <div className="text-lg font-semibold text-cyber-primary">
                        Produit Digital Complet Généré !
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tous les éléments sont prêts à être utilisés
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="border-cyber-primary/30 hover:bg-cyber-primary/10"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setCurrentStep(0);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className="border-cyber-primary/30 hover:bg-cyber-primary/10"
                >
                  Restart
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;