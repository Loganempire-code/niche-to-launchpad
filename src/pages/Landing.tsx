import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Wand2, TrendingUp, FileText, Gift, DollarSign, Megaphone, ArrowRight } from 'lucide-react';

const Landing = () => {
  const features = [
    { icon: TrendingUp, title: 'Recherche & Scraping', desc: 'Analyse automatique de la concurrence' },
    { icon: Sparkles, title: 'Hooks Émotionnels', desc: '5 hooks type Agora générés par IA' },
    { icon: FileText, title: 'Structure PDF', desc: 'Draft complet du produit digital' },
    { icon: Gift, title: 'Bonus', desc: '3-5 bonus complémentaires' },
    { icon: DollarSign, title: 'Pricing Optimisé', desc: 'Stratégie tarifaire data-driven' },
    { icon: Megaphone, title: 'Assets Marketing', desc: 'Ads, emails, scripts vidéo prêts' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero border-b border-border">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
              <Wand2 className="w-4 h-4" />
              Générateur IA de Produits Viraux
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              De l'idée au produit viral
              <br />
              <span className="text-primary">en 1 clic</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transformez un simple mot-clé en produit digital complet : PDF, bonus, stratégie pricing et assets marketing. 
              L'IA s'occupe de tout, vous n'avez qu'à récolter les bénéfices.
            </p>
            
            <div className="flex gap-4 justify-center mt-8">
              <Button 
                asChild
                size="lg"
                className="h-14 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg"
              >
                <Link to="/auth">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Commencer Gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-8 text-lg"
                asChild
              >
                <Link to="/auth">
                  Se Connecter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin pour créer un produit viral
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Notre IA analyse, génère et optimise chaque aspect de votre produit pour maximiser vos ventes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-gradient-card border-border/50 hover:shadow-card-custom transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à créer votre premier produit viral ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'entrepreneurs qui utilisent déjà notre IA pour générer des revenus passifs
          </p>
          
          <Button 
            asChild
            size="lg"
            className="h-14 px-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg"
          >
            <Link to="/auth">
              <Sparkles className="w-5 h-5 mr-2" />
              Créer Mon Compte Gratuit
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Aucune carte de crédit requise • Démarrez en 30 secondes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;