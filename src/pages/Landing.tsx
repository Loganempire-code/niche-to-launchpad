import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { 
  Wand2, ArrowRight, Star, Users, Crown, CheckCircle, Trophy, Flame, Timer, AlertTriangle, Clock, Rocket, X, Globe, LogOut, User
} from 'lucide-react';

const Landing = () => {
  const { user, signOut } = useAuth();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 32 });
  const [spotsLeft, setSpotsLeft] = useState(23);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    { 
      name: "Marie D.", avatar: "MD", revenue: "€73K en 3 mois",
      quote: "J'ai quitté mon job après 2 semaines. Mes premiers €10K en 15 jours."
    },
    { 
      name: "Pierre M.", avatar: "PM", revenue: "€1.2M cette année",
      quote: "À 22 ans, je gagne plus que mes parents réunis grâce à ce système."
    },
    { 
      name: "Sophie C.", avatar: "SC", revenue: "€45K/mois",
      quote: "Entre les couches, je génère plus que le salaire de mon mari."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-cyber-primary/20 bg-background/10 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Wand2 className="h-8 w-8 text-cyber-primary" />
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              NicheLaunchpad
            </span>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/app">
                  <Globe className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-1" />
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Se connecter</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth">Lancer</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Urgent Banner */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-3 px-4 animate-pulse">
        <div className="container flex items-center justify-center gap-4 text-sm font-bold">
          <AlertTriangle className="w-5 h-5" />
          <span>ALERTE: Plus que {spotsLeft} places disponibles!</span>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
            <Timer className="w-4 h-4" />
            <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container text-center max-w-5xl mx-auto">
          <Badge className="mb-6 bg-red-500 text-white animate-pulse">
            <Flame className="w-4 h-4 mr-2" />
            1,847 entrepreneurs connectés EN CE MOMENT
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-red-500">ARRÊTE</span> de Galérer...
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Génère €10,000+
            </span>
            <br />
            <span className="text-foreground">en 47 Minutes</span>
          </h1>
          
          <div className="mb-12 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
            <p className="text-lg font-semibold text-red-400 mb-4">
              ⚠️ TU ES EN TRAIN DE PERDRE DE L'ARGENT CHAQUE SECONDE
            </p>
            <p className="text-muted-foreground">
              Pendant que tu lis ceci, d'autres génèrent déjà leurs premiers €€€. 
              <span className="font-bold text-yellow-400"> Ne sois pas celui qui regarde les autres réussir.</span>
            </p>
          </div>

          <Button 
            size="lg"
            className="h-20 px-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-black animate-bounce border-2 border-green-400 shadow-2xl mb-8"
            asChild
          >
            <Link to={user ? "/app" : "/auth"}>
              <Crown className="w-8 h-8 mr-4" />
              <div>
                <div>OUI, JE VEUX MES €10K+</div>
                <div className="text-sm font-normal">(Avant qu'il soit trop tard)</div>
              </div>
            </Link>
          </Button>

          <div className="text-xs text-red-400 font-semibold animate-pulse">
            ⚡ ATTENTION: Prix augmente de 50% dans {String(timeLeft.hours).padStart(2, '0')}h{String(timeLeft.minutes).padStart(2, '0')}m
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-glass">
        <div className="container">
          <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">
            Ils Étaient comme TOI...
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Maintenant ils sont RICHES
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-6 bg-gradient-to-b from-green-500/10 to-emerald-500/5 border border-green-500/30">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                  VÉRIFIÉ ✓
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-green-500/50">
                    <AvatarFallback className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>

                <blockquote className="text-sm mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="text-center p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <div className="text-2xl font-black text-white">{testimonial.revenue}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-red-900/20 to-background">
        <div className="container text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-12">
            <span className="text-red-500">DERNIERS</span>
            <br />
            <span className="text-white">AVERTISSEMENTS</span>
          </h2>

          <div className="bg-gradient-to-r from-black/50 to-black/30 p-8 rounded-2xl border border-red-500/30 mb-12">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <X className="w-6 h-6" /> SI TU REFUSES
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Tu continues à perdre de l'argent</li>
                  <li>• Tes concurrents prennent de l'avance</li>
                  <li>• Tu payes plus cher plus tard</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" /> SI TU ACCEPTES
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Tes premiers €10K+ en 47 minutes</li>
                  <li>• Tu domines tes concurrents</li>
                  <li>• Tu économises 98% aujourd'hui</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            size="lg"
            className="h-24 px-20 bg-gradient-to-r from-green-500 to-green-600 text-white text-2xl font-black animate-pulse border-4 border-green-400 shadow-2xl mb-6"
            asChild
          >
            <Link to={user ? "/app" : "/auth"}>
              <Crown className="w-10 h-10 mr-4" />
              <div>
                <div>OUI, JE PRENDS MA PLACE</div>
                <div className="text-lg font-normal">(Avant que ce soit trop tard)</div>
              </div>
            </Link>
          </Button>
          
          <p className="text-sm text-red-400 font-bold animate-pulse">
            ⚡ Plus que {spotsLeft} places • {String(timeLeft.hours).padStart(2, '0')}h{String(timeLeft.minutes).padStart(2, '0')}m{String(timeLeft.seconds).padStart(2, '0')}s
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyber-primary/20 bg-background/50">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 NicheLaunchpad. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;