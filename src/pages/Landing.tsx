import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Wand2, 
  TrendingUp, 
  FileText, 
  Gift, 
  DollarSign, 
  Megaphone, 
  ArrowRight, 
  Star, 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  ShoppingCart, 
  Check, 
  Play,
  ChevronDown,
  Plus
} from 'lucide-react';

const Landing = () => {
  const testimonials = [
    { name: "Marie Dubois", avatar: "MD", role: "E-commerce Entrepreneur", revenue: "€50K/mois" },
    { name: "Pierre Martin", avatar: "PM", role: "Dropshipper", revenue: "€25K/mois" },
    { name: "Sophie Chen", avatar: "SC", role: "Digital Marketer", revenue: "€75K/mois" },
    { name: "Alex Rousseau", avatar: "AR", role: "Info-preneur", revenue: "€100K/mois" },
    { name: "Camille Lopez", avatar: "CL", role: "Coach Business", revenue: "€35K/mois" }
  ];

  const winningProducts = [
    { title: "Guide Mindset Millionnaire", price: "€97", sales: "2.5K ventes", image: "📚" },
    { title: "Formation E-commerce", price: "€297", sales: "1.8K ventes", image: "🛒" },
    { title: "Pack Trading Crypto", price: "€197", sales: "3.2K ventes", image: "₿" },
    { title: "Méthode Immobilier", price: "€497", sales: "950 ventes", image: "🏠" }
  ];

  const features = [
    { 
      icon: Target, 
      title: 'Recherche & Analyse Concurrence', 
      desc: 'Scrapez et analysez automatiquement les produits qui cartonnent dans votre niche',
      image: '🎯'
    },
    { 
      icon: Sparkles, 
      title: 'Hooks Émotionnels IA', 
      desc: '5 hooks psychologiques type Agora générés pour maximiser les conversions',
      image: '✨'
    },
    { 
      icon: FileText, 
      title: 'Structure PDF Complète', 
      desc: 'Draft professionnel de votre produit digital avec plan détaillé',
      image: '📄'
    },
    { 
      icon: Gift, 
      title: 'Bonus Irrésistibles', 
      desc: '3-5 bonus complémentaires pour augmenter la valeur perçue',
      image: '🎁'
    },
    { 
      icon: DollarSign, 
      title: 'Pricing Optimisé', 
      desc: 'Stratégie tarifaire data-driven basée sur la psychologie des prix',
      image: '💰'
    },
    { 
      icon: Megaphone, 
      title: 'Assets Marketing Complets', 
      desc: 'Pages de vente, emails, publicités et scripts vidéo prêts à utiliser',
      image: '📢'
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "€29",
      period: "/mois",
      features: [
        "5 produits générés/mois",
        "Analyse concurrence basique", 
        "Templates PDF standards",
        "Support email"
      ],
      popular: false
    },
    {
      name: "Pro", 
      price: "€79",
      period: "/mois",
      features: [
        "25 produits générés/mois",
        "Analyse concurrence avancée",
        "Templates PDF premium", 
        "Assets marketing complets",
        "Support prioritaire",
        "Accès communauté privée"
      ],
      popular: true
    },
    {
      name: "Agency",
      price: "€199", 
      period: "/mois",
      features: [
        "Produits illimités",
        "White-label complet",
        "API access",
        "Formation 1-on-1",
        "Support dédié 24/7",
        "Licence revente"
      ],
      popular: false
    }
  ];

  const teamMembers = [
    { name: "Thomas Leclerc", role: "CEO & Growth Hacker", experience: "15 ans", image: "TL" },
    { name: "Julie Moreau", role: "Head of AI", experience: "12 ans", image: "JM" },
    { name: "Marc Dubois", role: "Marketing Director", experience: "10 ans", image: "MD" },
    { name: "Anaïs Bernard", role: "Product Manager", experience: "8 ans", image: "AB" }
  ];

  const faqs = [
    {
      q: "Comment l'IA génère-t-elle des produits rentables ?",
      a: "Notre IA analyse des milliers de produits performants, identifie les patterns de succès et génère des concepts basés sur des données réelles de marché."
    },
    {
      q: "Puis-je personnaliser les produits générés ?",
      a: "Absolument ! Tous les éléments sont modifiables : contenu, design, prix, bonus. L'IA fournit la base, vous personnalisez selon votre vision."
    },
    {
      q: "Y a-t-il une garantie de résultats ?",
      a: "Nous offrons une garantie 30 jours satisfait ou remboursé. Si vous n'êtes pas satisfait, nous remboursons intégralement."
    },
    {
      q: "L'outil fonctionne-t-il dans toutes les niches ?",
      a: "Oui, notre IA est entraînée sur des données multi-niches : business, santé, développement personnel, tech, lifestyle, etc."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="font-bold">NicheLaunchpad</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Se connecter</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth">Commencer</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero border-b border-border py-24">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Générateur IA de Produits Viraux
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Créez des Produits Viraux
              <br />
              <span className="text-primary">en 3 clics</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              De l'analyse concurrence aux assets marketing : notre IA transforme un simple mot-clé en machine à cash automatisée. Plus de 10,000 entrepreneurs nous font confiance.
            </p>
            
            <div className="flex gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="h-14 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg"
                asChild
              >
                <Link to="/auth">
                  <Play className="w-5 h-5 mr-2" />
                  Commencer Maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-8 text-lg"
              >
                Voir Démo
              </Button>
            </div>

            {/* Product Interface Mockup */}
            <div className="relative mx-auto max-w-4xl">
              <Card className="p-6 bg-card/80 backdrop-blur">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-muted rounded px-3 py-1 text-sm text-muted-foreground text-center">
                    niche-launchpad.com/generator
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {winningProducts.map((product, i) => (
                      <Card key={i} className="p-3 bg-background/50">
                        <div className="text-2xl mb-2">{product.image}</div>
                        <h4 className="font-semibold text-xs mb-1">{product.title}</h4>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600 font-medium">{product.price}</span>
                          <span className="text-muted-foreground">{product.sales}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Avatars */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground mr-4">Ils nous font confiance :</span>
            {testimonials.map((testimonial, i) => (
              <div key={i} className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-green-600">{testimonial.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vos recherches de Produits Gagnants commencent ici
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les produits qui génèrent le plus de revenus dans votre niche
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {winningProducts.map((product, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4 text-center">{product.image}</div>
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                  <Badge variant="secondary">{product.sales}</Badge>
                </div>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline">
              Voir plus de produits gagnants
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Obtenez instantanément toutes les données sur les produits. C'est magique !
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre IA analyse, génère et optimise chaque aspect de votre produit en temps réel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="p-8 bg-background hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl mb-6 text-center">{feature.image}</div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Le moyen le plus rapide de repérer les tendances virales et de passer à l'action
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Notre technologie IA scanne en continu des milliers de sources pour identifier les opportunités avant vos concurrents.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <span>Entrez votre niche ou mot-clé</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <span>L'IA analyse la concurrence automatiquement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <span>Recevez votre produit complet en minutes</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-6 bg-gradient-card">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-16 h-16 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Démonstration en direct</h3>
                <p className="text-sm text-muted-foreground">
                  Regardez comment créer un produit viral en moins de 5 minutes
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Simplify Operations */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simplifiez vos opérations et boostez vos profits avec l'IA
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Analyse Prédictive</h3>
              <p className="text-muted-foreground">
                Prédisez le potentiel viral de vos produits avant le lancement
              </p>
            </Card>
            
            <Card className="p-6">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Génération Ultra-Rapide</h3>
              <p className="text-muted-foreground">
                De l'idée au produit fini : moins de 10 minutes chrono
              </p>
            </Card>
            
            <Card className="p-6">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Ciblage Précis</h3>
              <p className="text-muted-foreground">
                Identifiez votre audience idéale avec une précision chirurgicale
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              L'abonnement que vous n'aurez jamais besoin de résilier
            </h2>
            <p className="text-xl text-muted-foreground">
              Choisissez le plan qui correspond à vos ambitions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`p-8 relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Le plus populaire
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link to="/auth">
                    Commencer maintenant
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Les Experts E-Commerce nous font confiance
            </h2>
            <p className="text-xl text-muted-foreground">
              Une équipe de passionnés qui révolutionne la création de produits digitaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-all">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {member.image}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-1">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.experience} d'expérience</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Questions fréquemment posées
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <Plus className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            La solution préférée de 10,000+ entrepreneurs
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté qui révolutionne la création de produits digitaux
          </p>
          
          <Button 
            size="lg"
            className="h-14 px-12 bg-white text-primary hover:bg-white/90 transition-all duration-300 text-lg"
            asChild
          >
            <Link to="/auth">
              <Sparkles className="w-5 h-5 mr-2" />
              Créer Mon Compte Gratuit
            </Link>
          </Button>
          
          <p className="text-sm text-white/60 mt-4">
            Aucune carte de crédit requise • Essai gratuit 14 jours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className="h-6 w-6 text-primary" />
                <span className="font-bold">NicheLaunchpad</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plateforme IA qui transforme vos idées en produits viraux rentables.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Fonctionnalités</div>
                <div>Tarifs</div>
                <div>API</div>
                <div>Documentation</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>À propos</div>
                <div>Blog</div>
                <div>Carrières</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Centre d'aide</div>
                <div>Communauté</div>
                <div>Statut</div>
                <div>Confidentialité</div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 NicheLaunchpad. Tous droits réservés.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm">Mentions légales</Button>
              <Button variant="ghost" size="sm">CGU</Button>
              <Button variant="ghost" size="sm">Politique de confidentialité</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;