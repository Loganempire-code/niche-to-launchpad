import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Zap, Shield, Clock, Users } from 'lucide-react';

interface PricingStrategy {
  mainPrice: number;
  originalPrice: number;
  orderBumps: Array<{
    title: string;
    price: number;
    conversionRate: string;
  }>;
  upsells: Array<{
    title: string;
    price: number;
    description: string;
  }>;
  scarcity: {
    type: 'time' | 'quantity';
    value: string;
    message: string;
  };
  guarantee: string;
}

interface PricingBlockProps {
  data?: PricingStrategy;
}

export const PricingBlock = ({ data }: PricingBlockProps) => {
  const mockPricing: PricingStrategy = {
    mainPrice: 97,
    originalPrice: 297,
    orderBumps: [
      {
        title: "Audit Personnalisé 1-to-1 (30 min)",
        price: 47,
        conversionRate: "23%"
      },
      {
        title: "Accès VIP Communauté Privée",
        price: 27,
        conversionRate: "31%"
      }
    ],
    upsells: [
      {
        title: "Coaching Intensif 30 Jours",
        price: 497,
        description: "Suivi personnalisé avec appels hebdomadaires"
      },
      {
        title: "Certification Officielle",
        price: 197,
        description: "Devenez expert certifié dans votre domaine"
      }
    ],
    scarcity: {
      type: 'time',
      value: '48h',
      message: 'Offre limitée : plus que 48h pour profiter de ce prix exceptionnel'
    },
    guarantee: "Garantie satisfait ou remboursé 30 jours - Aucun risque pour vous !"
  };

  const finalData = data || mockPricing;
  const discount = Math.round(((finalData.originalPrice - finalData.mainPrice) / finalData.originalPrice) * 100);

  return (
    <div className="space-y-6">
      {/* Main Pricing */}
      <Card className="p-8 bg-gradient-primary/10 border-primary/30 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-primary" />
            <h4 className="text-xl font-bold text-primary">Prix Psychologique Optimisé</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl text-muted-foreground line-through">{finalData.originalPrice}€</span>
              <Badge variant="destructive" className="text-lg px-3 py-1">
                -{discount}%
              </Badge>
            </div>
            <div className="text-5xl font-bold text-primary">{finalData.mainPrice}€</div>
            <p className="text-sm text-muted-foreground">Prix de lancement exceptionnel</p>
          </div>
        </div>
      </Card>

      {/* Scarcity */}
      <Card className="p-4 bg-red-500/5 border-red-500/30">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-red-400" />
          <div>
            <p className="font-semibold text-red-400">{finalData.scarcity.message}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {finalData.scarcity.type === 'time' ? 'Temps limité' : 'Stock limité'} : {finalData.scarcity.value}
            </p>
          </div>
        </div>
      </Card>

      {/* Order Bumps */}
      <div>
        <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Order Bumps Recommandés
        </h5>
        <div className="space-y-3">
          {finalData.orderBumps.map((bump, index) => (
            <Card key={index} className="p-4 hover:bg-accent/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h6 className="font-medium text-foreground">{bump.title}</h6>
                  <p className="text-sm text-muted-foreground">Conversion estimée : {bump.conversionRate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">+{bump.price}€</p>
                  <Button variant="outline" size="sm">Ajouter</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upsells */}
      <div>
        <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Upsells Stratégiques
        </h5>
        <div className="grid gap-4">
          {finalData.upsells.map((upsell, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-border/50">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h6 className="text-lg font-bold text-foreground">{upsell.title}</h6>
                    <p className="text-sm text-muted-foreground">{upsell.description}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-lg px-3 py-1">
                    {upsell.price}€
                  </Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Configurer l'Upsell
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Guarantee */}
      <Card className="p-6 bg-green-500/5 border-green-500/30">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h6 className="font-semibold text-green-400 mb-2">Garantie Sans Risque</h6>
            <p className="text-sm text-muted-foreground">{finalData.guarantee}</p>
          </div>
        </div>
      </Card>

      {/* A/B Test Ideas */}
      <Card className="p-4 bg-blue-500/5 border-blue-500/20">
        <h6 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Idées de Tests A/B
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <p className="font-medium text-foreground">Prix :</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Tester 97€ vs 127€</li>
              <li>• Ajouter des centimes (97€ → 96,73€)</li>
              <li>• Bundle vs prix séparé</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Scarcité :</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Timer vs stock limité</li>
              <li>• 24h vs 48h vs 72h</li>
              <li>• Urgence douce vs forte</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Revenue Projection */}
      <Card className="p-6 bg-gradient-primary/5 border-primary/30 text-center">
        <h5 className="text-lg font-bold text-primary mb-4">Projection de Revenus</h5>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold text-foreground">2,400€</p>
            <p className="text-sm text-muted-foreground">100 ventes/mois</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">7,200€</p>
            <p className="text-sm text-muted-foreground">Avec order bumps</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">12,000€</p>
            <p className="text-sm text-muted-foreground">Avec upsells</p>
          </div>
        </div>
      </Card>
    </div>
  );
};