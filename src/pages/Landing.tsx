import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
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
  Plus,
  LogOut,
  User,
  Cpu,
  Atom,
  Layers,
  Brain,
  Orbit,
  Lightbulb,
  Rocket,
  Shield,
  Globe
} from 'lucide-react';

const Landing = () => {
  const { user, signOut } = useAuth();

  const testimonials = [
    { name: "Marie Dubois", avatar: "MD", role: "E-commerce Entrepreneur", revenue: "€50K/mois" },
    { name: "Pierre Martin", avatar: "PM", role: "Dropshipper", revenue: "€25K/mois" },
    { name: "Sophie Chen", avatar: "SC", role: "Digital Marketer", revenue: "€75K/mois" },
    { name: "Alex Rousseau", avatar: "AR", role: "Info-preneur", revenue: "€100K/mois" },
    { name: "Camille Lopez", avatar: "CL", role: "Coach Business", revenue: "€35K/mois" }
  ];

  const winningProducts = [
    { title: "Guide Mindset Millionnaire", price: "€97", sales: "2.5K ventes", image: "🧠" },
    { title: "Formation E-commerce", price: "€297", sales: "1.8K ventes", image: "🚀" },
    { title: "Pack Trading Crypto", price: "€197", sales: "3.2K ventes", image: "⚡" },
    { title: "Méthode Immobilier", price: "€497", sales: "950 ventes", image: "🌟" }
  ];

  const features = [
    { 
      icon: Brain, 
      title: 'IA Neuro-Analytique', 
      desc: 'Analyse quantique des tendances avec réseaux de neurones avancés',
      color: 'cyber-primary'
    },
    { 
      icon: Atom, 
      title: 'Génération Atomique', 
      desc: 'Création moléculaire de contenu viral par assemblage quantique',
      color: 'cyber-secondary'
    },
    { 
      icon: Orbit, 
      title: 'Orchestrateur Viral', 
      desc: 'Système orbital de propagation automatique multi-plateforme',
      color: 'cyber-tertiary'
    },
    { 
      icon: Cpu, 
      title: 'Processeur Marketing', 
      desc: 'Unité de traitement parallèle pour campagnes omni-canal',
      color: 'cyber-primary'
    },
    { 
      icon: Layers, 
      title: 'Architecture Multi-Couches', 
      desc: 'Stack technologique pour déploiement instantané',
      color: 'cyber-secondary'
    },
    { 
      icon: Shield, 
      title: 'Cybersécurité Intégrée', 
      desc: 'Protection quantique contre la concurrence déloyale',
      color: 'cyber-tertiary'
    }
  ];

  const pricingPlans = [
    {
      name: "Neural Starter",
      price: "€29",
      period: "/mois",
      features: [
        "5 produits générés/mois",
        "Analyse neuronale basique", 
        "Templates quantiques standards",
        "Support holographique"
      ],
      popular: false
    },
    {
      name: "Cyber Pro", 
      price: "€79",
      period: "/mois",
      features: [
        "25 produits générés/mois",
        "Analyse prédictive IA avancée",
        "Templates premium quantum", 
        "Assets marketing complets",
        "Support prioritaire 24/7",
        "Accès laboratoire cyber"
      ],
      popular: true
    },
    {
      name: "Quantum Agency",
      price: "€199", 
      period: "/mois",
      features: [
        "Génération illimitée",
        "White-label complet",
        "API quantique access",
        "Formation neuro-marketing",
        "Support dédié omni-dimensionnel",
        "Licence multiverse"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-primary rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyber-secondary rounded-full animate-float opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-cyber-tertiary rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-1.5 h-1.5 bg-cyber-primary rounded-full animate-float opacity-70" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-cyber-secondary rounded-full animate-float opacity-50" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--cyber-primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--cyber-primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-cyber-primary/20 bg-background/10 backdrop-blur-xl supports-[backdrop-filter]:bg-background/5">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2 group">
              <div className="relative">
                <Wand2 className="h-8 w-8 text-cyber-primary group-hover:animate-cyber-pulse transition-all duration-300" />
                <div className="absolute inset-0 h-8 w-8 bg-cyber-primary/20 rounded-full blur-md group-hover:animate-pulse-glow"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                NicheLaunchpad
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
                    <User className="w-4 h-4" />
                    {user.email}
                  </div>
                  <Button variant="ghost" size="sm" asChild className="hover:bg-cyber-primary/10">
                    <Link to="/app">
                      <Globe className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={async () => {
                      await signOut();
                    }}
                    className="hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild className="hover:bg-cyber-primary/10">
                    <Link to="/auth">Se connecter</Link>
                  </Button>
                  <Button size="sm" asChild className="bg-gradient-primary hover:shadow-cyber transition-all duration-300">
                    <Link to="/auth">
                      <Rocket className="w-4 h-4 mr-2" />
                      Lancer
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-8 animate-slide-up">
              <Badge variant="secondary" className="mb-6 bg-gradient-glass border border-cyber-primary/30 text-cyber-primary backdrop-blur-sm shadow-glass">
                <Atom className="w-4 h-4 mr-2 animate-neon-flicker" />
                Générateur IA Quantique
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                L'Avenir
              </span>
              <br />
              <span className="text-foreground">du Marketing</span>
              <br />
              <span className="text-cyber-primary animate-neon-flicker">
                est Quantique
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
              Technologie de prochaine génération : IA neuronale, analyse quantique et orchestration virale pour créer l'empire digital de demain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <Button 
                size="lg"
                className="h-16 px-12 bg-gradient-primary hover:shadow-cyber transition-all duration-500 text-lg group relative overflow-hidden"
                asChild
              >
                <Link to={user ? "/app" : "/auth"}>
                  <div className="absolute inset-0 bg-cyber-primary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <Brain className="w-6 h-6 mr-3 z-10 relative" />
                  <span className="z-10 relative">{user ? "Accéder au Lab" : "Initialiser"}</span>
                  <ArrowRight className="w-6 h-6 ml-3 z-10 relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-16 px-12 text-lg border-cyber-primary/30 hover:bg-cyber-primary/5 backdrop-blur-sm"
              >
                <Play className="w-6 h-6 mr-3" />
                Neural Demo
              </Button>
            </div>

            {/* Futuristic Interface Mockup */}
            <div className="relative mx-auto max-w-6xl animate-slide-up" style={{animationDelay: '0.8s'}}>
              <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-cyber-primary/20 shadow-glass relative overflow-hidden">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/20 to-cyber-primary/0 translate-x-[-100%] animate-[slide-right_3s_ease-in-out_infinite]"></div>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-destructive animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-4 h-4 rounded-full bg-cyber-primary animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  <div className="flex-1 bg-background/20 rounded-xl px-4 py-2 text-sm text-cyber-primary text-center border border-cyber-primary/20">
                    quantum://niche-launchpad.nexus/neural-generator
                  </div>
                  <div className="text-cyber-primary text-sm">Status: <span className="text-green-400">ONLINE</span></div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {winningProducts.map((product, i) => (
                      <Card key={i} className="p-4 bg-gradient-glass border border-cyber-primary/10 hover:border-cyber-primary/30 transition-all duration-300 group">
                        <div className="text-3xl mb-3 text-center group-hover:animate-float">{product.image}</div>
                        <h4 className="font-semibold text-sm mb-2 text-center">{product.title}</h4>
                        <div className="flex justify-between text-xs">
                          <span className="text-cyber-primary font-bold">{product.price}</span>
                          <span className="text-cyber-secondary">{product.sales}</span>
                        </div>
                        <div className="mt-2 h-1 bg-background/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-primary animate-[width_2s_ease-in-out_infinite]" style={{width: `${60 + (i * 10)}%`}}></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Floating Tech Elements */}
        <div className="absolute top-20 left-10 animate-float opacity-30">
          <Cpu className="w-16 h-16 text-cyber-primary" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float opacity-20" style={{animationDelay: '1s'}}>
          <Atom className="w-20 h-20 text-cyber-secondary" />
        </div>
        <div className="absolute top-1/2 left-5 animate-float opacity-25" style={{animationDelay: '2s'}}>
          <Orbit className="w-12 h-12 text-cyber-tertiary" />
        </div>
      </section>

      {/* Social Proof with Cyber Style */}
      <section className="py-12 border-y border-cyber-primary/20 bg-gradient-glass backdrop-blur-xl">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-sm text-cyber-primary mr-4 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Réseau Neural Certifié :
            </span>
            {testimonials.map((testimonial, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gradient-glass border border-cyber-primary/10 hover:border-cyber-primary/30 transition-all duration-300">
                <Avatar className="h-12 w-12 border-2 border-cyber-primary/20">
                  <AvatarFallback className="bg-gradient-primary text-background font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-cyber-primary font-bold">{testimonial.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features with Immersive Cards */}
      <section className="py-32 relative">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Architecture</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Neuro-Quantique</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technologies de rupture pour l'économie numérique de demain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="group p-8 bg-gradient-glass border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all duration-500 hover:shadow-cyber relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/0 via-cyber-primary/5 to-cyber-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse-glow">
                      <Icon className="w-8 h-8 text-background" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-center group-hover:text-cyber-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {feature.desc}
                    </p>
                    
                    {/* Cyber accent line */}
                    <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing with Quantum Style */}
      <section className="py-32 bg-gradient-glass relative">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Plans</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Quantiques</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Accès aux dimensions parallèles du marketing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`relative p-8 transition-all duration-500 overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-primary border-cyber-primary shadow-cyber scale-105' 
                  : 'bg-gradient-glass border-cyber-primary/20 hover:border-cyber-primary/40'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-tertiary"></div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-background' : 'text-foreground'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-background' : 'text-cyber-primary'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-background/70' : 'text-muted-foreground'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 ${plan.popular ? 'text-background' : 'text-cyber-primary'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-background/90' : 'text-muted-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 ${
                    plan.popular 
                      ? 'bg-background text-primary hover:bg-background/90' 
                      : 'bg-gradient-primary hover:shadow-cyber'
                  } transition-all duration-300`}
                  asChild
                >
                  <Link to="/auth">
                    <Rocket className="w-4 h-4 mr-2" />
                    Activer {plan.name}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Immersive Effect */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cosmic opacity-80"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-foreground">Rejoignez la</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-neon-flicker">
              Révolution Quantique
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            L'avenir appartient à ceux qui maîtrisent l'IA. Commencez votre ascension dès maintenant.
          </p>
          
          <Button size="lg" className="h-20 px-16 bg-gradient-primary hover:shadow-cyber text-xl transition-all duration-500 group" asChild>
            <Link to="/auth">
              <Brain className="w-8 h-8 mr-4 group-hover:animate-cyber-pulse" />
              Initialiser la Séquence
              <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-cyber-primary/20 bg-gradient-glass backdrop-blur-xl">
        <div className="container">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center space-x-3">
              <Wand2 className="h-8 w-8 text-cyber-primary animate-neon-flicker" />
              <span className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
                NicheLaunchpad
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-2xl">
              Plateforme de génération IA nouvelle génération. Propulsé par l'intelligence artificielle quantique et l'analyse prédictive avancée.
            </p>
            <div className="text-xs text-muted-foreground">
              © 2024 NicheLaunchpad. Tous droits réservés dans toutes les dimensions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;