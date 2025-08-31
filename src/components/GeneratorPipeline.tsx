import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ErrorBoundary } from './ErrorBoundary';

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
  const navigate = useNavigate();
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

  const generateBlockContent = async (stepIndex: number, keyword: string, previousData: any = null) => {
    const step = PIPELINE_STEPS[stepIndex];
    
    // Simulate API call with contextual generation
    return new Promise(resolve => {
      setTimeout(() => {
        let result;
        
        switch (step.id) {
          case 'research':
            result = generateResearchData(keyword);
            break;
          case 'hooks':
            result = generateHooksData(keyword, previousData);
            break;
          case 'pdfStructure':
            result = generatePdfStructureData(keyword, previousData);
            break;
          case 'bonus':
            result = generateBonusData(keyword, previousData);
            break;
          case 'pricing':
            result = generatePricingData(keyword, previousData);
            break;
          case 'marketing':
            result = generateMarketingData(keyword, previousData);
            break;
          default:
            result = {};
        }
        
        resolve(result);
      }, 2000 + Math.random() * 1000);
    });
  };

  // Content generation functions based on dedicated prompts
  const generateResearchData = (keyword: string) => {
    const keywordLower = keyword.toLowerCase();
    
    return {
      keyword,
      competitors: [
        `${keyword} Pro Master`,
        `Ultimate ${keyword} Guide`,
        `${keyword} Secrets Revealed`
      ],
      keywords: [
        `${keywordLower} solution`,
        `comment ${keywordLower}`,
        `${keywordLower} méthode`,
        `${keywordLower} résultats`,
        `${keywordLower} transformation`
      ],
      painPoints: [
        `Frustré par le manque de résultats avec ${keywordLower}`,
        `Confusion sur les vraies méthodes qui marchent pour ${keywordLower}`,
        `Perte de temps avec des solutions inefficaces pour ${keywordLower}`
      ],
      priceAnchors: ['47€', '97€', '197€'],
      recommendations: {
        top_3_angles: [
          `Secret peu connu sur ${keyword}`,
          `Méthode rapide ${keyword}`,
          `Transformation ${keyword} garantie`
        ]
      }
    };
  };

  const generateHooksData = (keyword: string, researchData: any) => {
    const angles = researchData?.research?.recommendations?.top_3_angles || [`Solution ${keyword}`];
    
    return [
      {
        id: "hook_1",
        title: `${angles[0]} - Ce que personne ne vous dit`,
        tagline: `Découvrez la vérité cachée sur ${keyword}`,
        story: `Il y a 3 ans, j'étais comme vous, cherchant désespérément une solution pour ${keyword}. Puis j'ai découvert ce secret...`,
        benefit: `Transformez votre approche du ${keyword} en 7 jours`,
        trigger: "FOMO - Méthode limitée",
        tone: "mystérieux"
      },
      {
        id: "hook_2", 
        title: `La méthode ${keyword} que les experts gardent secrète`,
        tagline: `Révélations choquantes sur ${keyword}`,
        story: `Un expert m'a confié cette technique ${keyword} lors d'un événement privé à 2500€...`,
        benefit: `Maîtrisez ${keyword} comme un professionnel`,
        trigger: "Autorité - Méthode d'expert",
        tone: "autoritaire"
      }
    ];
  };

  const generatePdfStructureData = (keyword: string, previousData: any) => {
    const selectedHook = previousData?.hooks?.[0] || {};
    
    return {
      title: `Guide Complet: ${keyword} - Transformation Garantie`,
      introduction: `Ce guide vous révèle tout sur ${keyword}`,
      chapters: [
        {
          title: `Les secrets cachés du ${keyword}`,
          content: `Découvrez les vérités que l'industrie du ${keyword} ne veut pas que vous sachiez...`,
          exercises: [`Exercice d'évaluation ${keyword}`, `Plan d'action personnalisé`]
        },
        {
          title: `Méthode étape par étape ${keyword}`,
          content: `Appliquez cette méthode prouvée pour transformer votre approche du ${keyword}...`,
          exercises: [`Mise en pratique ${keyword}`, `Suivi des résultats`]
        },
        {
          title: `Cas pratiques et résultats ${keyword}`,
          content: `Découvrez comment d'autres ont réussi avec ${keyword}...`,
          exercises: [`Analyse de cas`, `Application personnelle`]
        }
      ],
      conclusion: `Votre transformation ${keyword} commence maintenant`
    };
  };

  const generateBonusData = (keyword: string, previousData: any) => {
    return [
      {
        type: "checklist",
        title: `Checklist ${keyword} - Action Immédiate`,
        description: `Liste de vérification complète pour appliquer ${keyword} dès aujourd'hui`,
        value: "47€",
        deliverable: "PDF 5 pages avec checklist étape-par-étape"
      },
      {
        type: "template",
        title: `Templates ${keyword} Prêts à l'Emploi`,
        description: `5 templates personnalisables pour accélérer vos résultats ${keyword}`,
        value: "97€", 
        deliverable: "Pack de 5 templates éditables"
      },
      {
        type: "video",
        title: `Masterclass ${keyword} Exclusive`,
        description: `Formation vidéo approfondie sur les techniques avancées ${keyword}`,
        value: "197€",
        deliverable: "Vidéo 45min + support de cours"
      }
    ];
  };

  const generatePricingData = (keyword: string, previousData: any) => {
    return {
      mainPrice: "97€",
      originalPrice: "297€",
      orderBump: {
        title: `Consultation ${keyword} Personnalisée`,
        price: "47€",
        description: `Session 1:1 pour optimiser votre stratégie ${keyword}`
      },
      upsells: [
        {
          title: `Coaching ${keyword} VIP`,
          price: "497€",
          description: `Accompagnement personnel sur 30 jours`
        }
      ],
      guarantee: "Garantie 30 jours satisfait ou remboursé",
      scarcity: "Offre limitée - Plus que 48h"
    };
  };

  const generateMarketingData = (keyword: string, previousData: any) => {
    return {
      facebookAds: [
        {
          headline: `${keyword}: La méthode qui change tout`,
          text: `Découvrez pourquoi 97% des gens échouent avec ${keyword} et comment éviter leurs erreurs...`,
          cta: "Découvrir maintenant"
        }
      ],
      instagramAds: [
        {
          caption: `🔥 SECRET ${keyword.toUpperCase()} révélé! Ce que les experts cachent...`,
          hashtags: [`#${keyword.replace(' ', '')}`, "#transformation", "#secret", "#méthode"]
        }
      ],
      tiktokScripts: [
        {
          hook: `Vous faites cette erreur avec ${keyword}`,
          script: `La plupart des gens pensent que ${keyword} c'est compliqué, mais en réalité...`,
          duration: "30s"
        }
      ],
      emailSequence: [
        {
          subject: `[${keyword}] Votre erreur #1`,
          preview: `Cette erreur vous coûte cher...`,
          body: `La majorité des gens font cette erreur avec ${keyword}...`
        }
      ]
    };
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
              >
                <ErrorBoundary>
                  {step.id === 'research' && <ResearchBlock data={blockData} />}
                  {step.id === 'hooks' && <HooksBlock data={blockData} />}
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
                <Button variant="outline" size="lg">
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