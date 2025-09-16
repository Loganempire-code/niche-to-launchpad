import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Wand2, TrendingUp, FileText, Gift, DollarSign, Megaphone, LogOut, User } from 'lucide-react';
import { BlockContainer } from './BlockContainer';
import { ResearchBlock } from './blocks/ResearchBlock';
import { HooksBlock } from './blocks/HooksBlock';
import { PdfStructureBlock } from './blocks/PdfStructureBlock';
import { BonusBlock } from './blocks/BonusBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { MarketingBlock } from './blocks/MarketingBlock';
import { ErrorBoundary } from './ErrorBoundary';
import { supabase } from '@/integrations/supabase/client';

interface PipelineState {
  isGenerating: boolean;
  currentStep: number;
  keyword: string;
  selectedHookIndex: number | null;
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
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [state, setState] = useState<PipelineState>({
    isGenerating: false,
    currentStep: -1,
    keyword: '',
    selectedHookIndex: null,
    blocks: {
      research: null,
      hooks: null,
      pdfStructure: null,
      bonus: null,
      pricing: null,
      marketing: null
    }
  });

  const generateBlockContent = async (stepIndex: number, keyword: string, context: any = null) => {
    try {
      const blocNumber = stepIndex + 1;
      
      // Build context for the API call
      const apiContext = {
        ...context,
        selectedHook: state.selectedHookIndex !== null && context?.hooks ? 
          context.hooks[state.selectedHookIndex] : null
      };
      
      console.log(`Calling backend for bloc ${blocNumber} with keyword: ${keyword}`);
      
      const { data, error } = await supabase.functions.invoke('generate-pipeline', {
        body: {
          bloc: blocNumber,
          keyword,
          context: apiContext
        }
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Erreur lors de l\'appel à l\'API');
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur inconnue du backend');
      }
      
      console.log(`Successfully generated bloc ${blocNumber}:`, data.data);
      return data.data;
      
    } catch (error) {
      console.error('Error generating block content:', error);
      throw error;
    }
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
      let accumulatedData = {
        research: null,
        hooks: null,
        pdfStructure: null,
        bonus: null,
        pricing: null,
        marketing: null
      };
      
      for (let i = 0; i < PIPELINE_STEPS.length; i++) {
        setState(prev => ({ ...prev, currentStep: i }));
        
        const result = await generateBlockContent(i, state.keyword, accumulatedData);
        const stepKey = PIPELINE_STEPS[i].id as keyof typeof state.blocks;
        
        // Update accumulated data for next step
        accumulatedData[stepKey] = result;
        
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
      console.error('Generation error:', error);
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite durant la génération";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setState(prev => ({ ...prev, isGenerating: false, currentStep: -1 }));
    }
  };

  const handleViewReport = () => {
    navigate('/report', { 
      state: { 
        keyword: state.keyword, 
        blocks: state.blocks 
      } 
    });
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Déconnexion",
        description: "À bientôt !"
      });
    }
  };

  const progress = state.isGenerating ? ((state.currentStep + 1) / PIPELINE_STEPS.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Button variant="ghost" asChild>
              <Link to="/" className="mr-6 flex items-center space-x-2">
                <Wand2 className="h-6 w-6 text-primary" />
                <span className="font-bold">NicheLaunchpad</span>
              </Link>
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {user?.email}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

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
                    {PIPELINE_STEPS[state.currentStep]?.name || 'Génération en cours'}... ({Math.round(progress)}%)
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
                onCopy={blockData ? async () => {
                  try {
                    await navigator.clipboard.writeText(JSON.stringify(blockData, null, 2));
                    toast({ title: 'Copié !', description: `${step.name} copié dans le presse-papiers` });
                  } catch {
                    toast({ title: 'Erreur', description: 'Impossible de copier', variant: 'destructive' });
                  }
                } : undefined}
              >
                <ErrorBoundary>
                  {step.id === 'research' && <ResearchBlock data={blockData} />}
                  {step.id === 'hooks' && (
                    <HooksBlock 
                      data={blockData}
                      selectedIndex={state.selectedHookIndex}
                      onSelect={(i) => setState(prev => ({ ...prev, selectedHookIndex: i }))}
                    />
                  )}
                  {step.id === 'pdfStructure' && <PdfStructureBlock data={blockData} />}
                  {step.id === 'bonus' && <BonusBlock data={blockData} />}
                  {step.id === 'pricing' && <PricingBlock data={blockData} />}
                  {step.id === 'marketing' && <MarketingBlock data={blockData} />}
                </ErrorBoundary>
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
                <Button variant="outline" size="lg" onClick={() => {
                  const data = { keyword: state.keyword, selectedHookIndex: state.selectedHookIndex, blocks: state.blocks };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${state.keyword.replace(/\s+/g, '_')}_rapport.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  toast({ title: 'Export réussi !', description: 'Le JSON a été téléchargé' });
                }}>
                  Export JSON
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow"
                  onClick={handleViewReport}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Voir le Rapport
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};