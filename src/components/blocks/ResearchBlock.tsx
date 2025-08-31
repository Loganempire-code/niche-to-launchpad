import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, DollarSign, Target, AlertTriangle } from 'lucide-react';

interface ResearchBlockProps {
  data?: {
    competitors?: string[];
    keywords?: string[];
    painPoints?: string[];
    priceAnchors?: string[];
  };
}

export const ResearchBlock = ({ data }: ResearchBlockProps) => {
  if (!data) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Analyse en attente...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Competitors */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Concurrents Principaux
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.competitors?.map((competitor, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
              {competitor}
            </Badge>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Mots-clés Stratégiques
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.keywords?.map((keyword, index) => (
            <Badge key={index} variant="outline" className="border-green-500/30 text-green-400">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pain Points */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Points de Douleur Identifiés
        </h4>
        <div className="grid gap-2">
          {data.painPoints?.map((pain, index) => (
            <Card key={index} className="p-3 bg-red-500/5 border-red-500/20">
              <p className="text-sm text-red-400">{pain}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Price Anchors */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Ancres de Prix Marché
        </h4>
        <div className="flex gap-3">
          {data.priceAnchors?.map((price, index) => (
            <Card key={index} className="p-4 text-center bg-gradient-primary/5 border-primary/20">
              <p className="text-lg font-bold text-primary">{price}</p>
              <p className="text-xs text-muted-foreground">
                {index === 0 ? 'Entrée' : index === 1 ? 'Moyen' : 'Premium'}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};