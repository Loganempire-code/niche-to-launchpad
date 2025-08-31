import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wand2, TrendingUp, FileText, Gift, DollarSign, Megaphone } from 'lucide-react';
import { BlockContainer } from './BlockContainer';
import { ResearchBlock } from './blocks/ResearchBlock';
import { HooksBlock } from './blocks/HooksBlock';
import { PdfStructureBlock } from './blocks/PdfStructureBlock';
import { BonusBlock } from './blocks/BonusBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { MarketingBlock } from './blocks/MarketingBlock';

interface PipelineState {
  isGenerating: boolean;
  currentStep: number;
  keyword: string;
  blocks: {
    research: any;
    hooks: any;
    pdfStructure: any;
    bonus: any;
    pricing: any;
    marketing: any;
  };
}

const PIPELINE_STEPS = [
  { id: 'research', name: 'Recherche & Scraping', icon: TrendingUp, description: 'Analyse de la concurrence et des tendances' },
  { id: 'hooks', name: 'Storytelling & Hooks', icon: Sparkles, description: '5 hooks émotionnels type Agora' },
  { id: 'pdfStructure', name: 'Structure PDF', icon: FileText, description: 'Draft complet du produit digital' },
  { id: 'bonus', name: 'Bonus', icon: Gift, description: '3-5 bonus complémentaires' },
  { id: 'pricing', name: 'Pricing & Offre', icon: DollarSign, description: 'Stratégie tarifaire optimisée' },
  { id: 'marketing', name: 'Marketing Assets', icon: Megaphone, description: 'Ads, emails, scripts vidéo' }
];

export const GeneratorPipeline = () => {
  const { toast } = useToast();
  const [state, setState] = useState<PipelineState>({
    isGenerating: false,
    currentStep: -1,
    keyword: '',
    blocks: {
      research: null,
      hooks: null,
      pdfStructure: null,
      bonus: null,
      pricing: null,
      marketing: null
    }
  });

  const simulateGeneration = async (stepIndex: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = {
          research: {
            competitors: ['Concurrent A', 'Concurrent B'],
            keywords: ['mot-clé 1', 'mot-clé 2'],
            painPoints: ['Problème 1', 'Problème 2'],
            priceAnchors: ['49€', '97€', '197€']
          },
          hooks: [
            {
              title: "La méthode secrète que les experts ne veulent pas que vous connaissiez",
              tagline: "Découvrez comment transformer votre passion en revenus passifs",
              story: "Il y a 3 ans, Sarah était comme vous...",
              benefit: "Générez 5000€/mois en automatique",
              trigger: "FOMO - Plus que 48h"
            }
          ]
        };
        resolve(mockData[PIPELINE_STEPS[stepIndex].id as keyof typeof mockData] || {});
      }, 2000 + Math.random() * 1000);
    });
  };

  const handleGenerate = async () => {
    if (!state.keyword.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un mot-clé",
        variant: "destructive"
      });
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true, currentStep: 0 }));

    try {
      for (let i = 0; i < PIPELINE_STEPS.length; i++) {
        setState(prev => ({ ...prev, currentStep: i }));
        
        const result = await simulateGeneration(i);
        const stepKey = PIPELINE_STEPS[i].id as keyof typeof state.blocks;
        
        setState(prev => ({
          ...prev,
          blocks: {
            ...prev.blocks,
            [stepKey]: result
          }
        }));
      }

      toast({
        title: "Génération terminée !",
        description: "Votre produit digital est prêt à être exporté"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite durant la génération",
        variant: "destructive"
      });
    } finally {
      setState(prev => ({ ...prev, isGenerating: false, currentStep: -1 }));
    }
  };

  const progress = state.isGenerating ? ((state.currentStep + 1) / PIPELINE_STEPS.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero border-b border-border">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
              <Wand2 className="w-4 h-4" />
              Générateur IA de Produits Viraux
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              De l'idée au produit viral
              <br />
              <span className="text-primary">en 1 clic</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformez un simple mot-clé en produit digital complet : PDF, bonus, stratégie pricing et assets marketing.
            </p>
            
            {/* Input Section */}
            <div className="max-w-2xl mx-auto mt-8 space-y-4">
              <div className="flex gap-4">
                <Input
                  value={state.keyword}
                  onChange={(e) => setState(prev => ({ ...prev, keyword: e.target.value }))}
                  placeholder="Ex: développement personnel, crypto, fitness..."
                  className="flex-1 h-12 text-lg bg-card/50 border-border/50 focus:border-primary/50 focus:bg-card"
                  disabled={state.isGenerating}
                />
                <Button
                  onClick={handleGenerate}
                  disabled={state.isGenerating}
                  size="lg"
                  className="h-12 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {state.isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Générer
                    </>
                  )}
                </Button>
              </div>

              {state.isGenerating && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2 bg-muted" />
                  <p className="text-sm text-muted-foreground text-center">
                    {PIPELINE_STEPS[state.currentStep]?.name}... ({Math.round(progress)}%)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8">
          {PIPELINE_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = state.currentStep === index;
            const isCompleted = state.currentStep > index || state.blocks[step.id as keyof typeof state.blocks];
            const blockData = state.blocks[step.id as keyof typeof state.blocks];

            return (
              <BlockContainer
                key={step.id}
                title={step.name}
                description={step.description}
                icon={<StepIcon className="w-5 h-5" />}
                isActive={isActive}
                isCompleted={isCompleted}
                step={index + 1}
              >
                {step.id === 'research' && <ResearchBlock data={blockData} />}
                {step.id === 'hooks' && <HooksBlock data={blockData} />}
                {step.id === 'pdfStructure' && <PdfStructureBlock data={blockData} />}
                {step.id === 'bonus' && <BonusBlock data={blockData} />}
                {step.id === 'pricing' && <PricingBlock data={blockData} />}
                {step.id === 'marketing' && <MarketingBlock data={blockData} />}
              </BlockContainer>
            );
          })}
        </div>

        {/* Export Section */}
        {Object.values(state.blocks).some(block => block) && (
          <Card className="mt-12 p-8 bg-gradient-card border-border/50 shadow-card-custom">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold">Prêt à exporter ?</h3>
              <p className="text-muted-foreground">
                Téléchargez votre produit digital complet avec tous les assets marketing
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="lg">
                  Export JSON
                </Button>
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Package Complet
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};