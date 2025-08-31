import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Copy, FileText, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
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

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const data = location.state as ReportData;

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Aucune donnée disponible</h2>
          <p className="text-muted-foreground mb-4">
            Veuillez d'abord générer du contenu depuis la page principale.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      toast({
        title: "Copié !",
        description: `${type} copié dans le presse-papiers`
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le contenu",
        variant: "destructive"
      });
    }
  };

  const handleExportPDF = () => {
    // Simulation export PDF
    toast({
      title: "Export PDF",
      description: "Fonctionnalité en développement"
    });
  };

  const handleExportJSON = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.keyword.replace(/\s+/g, '_')}_rapport.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export réussi !",
      description: "Le fichier JSON a été téléchargé"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Rapport Complet</h1>
                <p className="text-muted-foreground">
                  Produit digital généré pour: <Badge variant="secondary">{data.keyword}</Badge>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExportPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={handleExportJSON}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Executive Summary */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Résumé Exécutif
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Niche Analysée</h3>
              <p className="text-sm text-muted-foreground mb-4">{data.keyword}</p>
              
              <h3 className="font-medium mb-2">Concurrents Identifiés</h3>
              <div className="flex flex-wrap gap-2">
                {data.blocks.research?.competitors?.map((comp: string, i: number) => (
                  <Badge key={i} variant="outline">{comp}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Prix Recommandé</h3>
              <p className="text-2xl font-bold text-primary mb-4">
                {data.blocks.pricing?.mainPrice || '97€'}
              </p>
              
              <h3 className="font-medium mb-2">Hooks Générés</h3>
              <p className="text-sm text-muted-foreground">
                {data.blocks.hooks?.length || 0} hooks émotionnels créés
              </p>
            </div>
          </div>
        </Card>

        {/* Research Section */}
        {data.blocks.research && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">1. Recherche & Analyse</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopy(data.blocks.research, 'Recherche')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Mots-clés stratégiques</h3>
                <div className="flex flex-wrap gap-2">
                  {data.blocks.research.keywords?.map((kw: string, i: number) => (
                    <Badge key={i} variant="secondary">{kw}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Points de douleur identifiés</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {data.blocks.research.painPoints?.map((pain: string, i: number) => (
                    <li key={i}>{pain}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Hooks Section */}
        {data.blocks.hooks && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">2. Hooks & Storytelling</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopy(data.blocks.hooks, 'Hooks')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {data.blocks.hooks.map((hook: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{hook.title}</h3>
                  <p className="text-sm text-primary mb-2">{hook.tagline}</p>
                  <p className="text-sm text-muted-foreground">{hook.story}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* PDF Structure Section */}
        {data.blocks.pdfStructure && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">3. Structure PDF</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopy(data.blocks.pdfStructure, 'Structure PDF')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Titre du produit</h3>
                <p className="text-lg">{data.blocks.pdfStructure.title}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Chapitres ({data.blocks.pdfStructure.chapters?.length || 0})</h3>
                <div className="space-y-2">
                  {data.blocks.pdfStructure.chapters?.map((chapter: any, i: number) => (
                    <div key={i} className="p-3 border rounded text-sm">
                      <h4 className="font-medium">{chapter.title}</h4>
                      <p className="text-muted-foreground mt-1">{chapter.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Bonus Section */}
        {data.blocks.bonus && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">4. Bonus</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopy(data.blocks.bonus, 'Bonus')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid gap-4">
              {data.blocks.bonus.map((bonus: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{bonus.title}</h3>
                    <Badge variant="secondary">{bonus.value}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{bonus.description}</p>
                  <p className="text-xs text-muted-foreground">{bonus.deliverable}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Pricing Section */}
        {data.blocks.pricing && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">5. Pricing & Offre</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopy(data.blocks.pricing, 'Pricing')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center p-6 border rounded-lg bg-primary/5">
                <p className="text-3xl font-bold text-primary">{data.blocks.pricing.mainPrice}</p>
                <p className="text-muted-foreground line-through">{data.blocks.pricing.originalPrice}</p>
                <p className="text-sm text-primary mt-2">{data.blocks.pricing.scarcity}</p>
              </div>
              
              {data.blocks.pricing.orderBump && (
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Order Bump</h3>
                  <p className="text-sm">{data.blocks.pricing.orderBump.title} - {data.blocks.pricing.orderBump.price}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Marketing Section */}
        {data.blocks.marketing && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">6. Assets Marketing</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopy(data.blocks.marketing, 'Marketing')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Facebook Ads */}
              {data.blocks.marketing.facebookAds && (
                <div>
                  <h3 className="font-medium mb-3">Publicités Facebook</h3>
                  <div className="space-y-3">
                    {data.blocks.marketing.facebookAds.map((ad: any, i: number) => (
                      <div key={i} className="p-3 border rounded text-sm">
                        <h4 className="font-medium">{ad.headline}</h4>
                        <p className="text-muted-foreground mt-1">{ad.text}</p>
                        <Badge variant="outline" className="mt-2">{ad.cta}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Email Sequence */}
              {data.blocks.marketing.emailSequence && (
                <div>
                  <h3 className="font-medium mb-3">Séquence Email</h3>
                  <div className="space-y-3">
                    {data.blocks.marketing.emailSequence.map((email: any, i: number) => (
                      <div key={i} className="p-3 border rounded text-sm">
                        <h4 className="font-medium">{email.subject}</h4>
                        <p className="text-xs text-muted-foreground">{email.preview}</p>
                        <p className="text-sm mt-2">{email.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Report;