import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Sparkles, ArrowLeft, Wand2 } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/app', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message === 'Invalid login credentials') {
            toast({
              title: "Erreur de connexion",
              description: "Email ou mot de passe incorrect",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Erreur de connexion",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue !"
          });
          navigate('/app', { replace: true });
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message === 'User already registered') {
            toast({
              title: "Compte déjà existant",
              description: "Un compte avec cet email existe déjà. Connectez-vous.",
              variant: "destructive"
            });
            setIsLogin(true);
          } else {
            toast({
              title: "Erreur d'inscription",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Inscription réussie",
            description: "Vérifiez votre email pour confirmer votre compte (ou connectez-vous directement si la confirmation est désactivée)"
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 p-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">NicheLaunchpad</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              Générateur IA de Produits Viraux
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Connectez-vous pour accéder à vos produits' 
              : 'Créez un compte pour commencer'
            }
          </p>
        </div>

        {/* Auth Form */}
        <Card className="p-8 bg-gradient-card border-border/50 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                disabled={loading}
                className="h-11 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="h-11 bg-card/50 border-border/50 focus:border-primary/50 pr-11 transition-colors"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="h-11 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  {isLogin ? 'Connexion...' : 'Inscription...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLogin ? 'Se connecter' : "S'inscrire"}
                </>
              )}
            </Button>
          </form>

          {/* Toggle between login/signup */}
          <Separator className="my-6" />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            </p>
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword('');
                setConfirmPassword('');
              }}
              disabled={loading}
              className="text-primary hover:text-primary/80 font-medium"
            >
              {isLogin ? "Créer un compte" : "Se connecter"}
            </Button>
          </div>
        </Card>

        {/* Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            En vous {isLogin ? 'connectant' : 'inscrivant'}, vous acceptez nos{' '}
            <Button variant="link" className="p-0 h-auto text-sm text-primary hover:underline">
              conditions d'utilisation
            </Button>
            {' '}et notre{' '}
            <Button variant="link" className="p-0 h-auto text-sm text-primary hover:underline">
              politique de confidentialité
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;