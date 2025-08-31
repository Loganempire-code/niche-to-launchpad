import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, CheckCircle, Download, Play, FileText, Headphones } from 'lucide-react';

interface Bonus {
  type: 'checklist' | 'audio' | 'video' | 'template' | 'journal';
  title: string;
  description: string;
  value: string;
  deliverable: string;
}

interface BonusBlockProps {
  data?: Bonus[];
}

const BONUS_ICONS = {
  checklist: CheckCircle,
  audio: Headphones,
  video: Play,
  template: FileText,
  journal: FileText
};

const BONUS_COLORS = {
  checklist: 'green',
  audio: 'blue',
  video: 'purple',
  template: 'orange',
  journal: 'pink'
};

export const BonusBlock = ({ data }: BonusBlockProps) => {
  const mockBonuses: Bonus[] = [
    {
      type: 'checklist',
      title: 'Checklist Ultime des 30 Actions',
      description: 'La liste complète des actions à effectuer quotidiennement pour maximiser vos résultats',
      value: '47€',
      deliverable: 'PDF interactif 12 pages'
    },
    {
      type: 'audio',
      title: 'Méditations Guidées (3 séances)',
      description: 'Sessions audio exclusives pour développer votre mindset de gagnant',
      value: '97€',
      deliverable: '3 fichiers MP3 haute qualité'
    },
    {
      type: 'video',
      title: 'Masterclass Exclusive "Secrets VIP"',
      description: 'Vidéo privée révélant les techniques que j\'utilise personnellement',
      value: '197€',
      deliverable: 'Vidéo HD 45 minutes'
    },
    {
      type: 'template',
      title: 'Templates Notion Pro',
      description: 'Système complet de suivi et d\'organisation pour votre transformation',
      value: '67€',
      deliverable: 'Templates Notion clé-en-main'
    },
    {
      type: 'journal',
      title: 'Journal de Bord 90 Jours',
      description: 'Carnet de suivi quotidien pour ancrer vos nouvelles habitudes',
      value: '37€',
      deliverable: 'PDF imprimable 90 pages'
    }
  ];

  const finalData: Bonus[] = Array.isArray(data) ? data : mockBonuses;
  const totalValue = finalData.reduce((sum, bonus) => {
    const numeric = parseInt(String(bonus.value).replace(/[^0-9]/g, '')) || 0;
    return sum + numeric;
  }, 0);

  if (!finalData.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Bonus en cours de génération...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h4 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Bonus Exclusifs Inclus
        </h4>
        <p className="text-sm text-muted-foreground">
          Valeur totale des bonus : <span className="text-primary font-bold">{totalValue}€</span>
        </p>
      </div>

      {/* Bonus Grid */}
      <div className="grid gap-4">
        {finalData.map((bonus, index) => {
          const Icon = BONUS_ICONS[bonus.type];
          const color = BONUS_COLORS[bonus.type];
          
          return (
            <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}-500/20 group-hover:bg-${color}-500/30 transition-colors`}>
                  <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-foreground mb-1">{bonus.title}</h5>
                      <p className="text-sm text-muted-foreground">{bonus.description}</p>
                    </div>
                    <Badge className={`bg-${color}-500/20 text-${color}-400 border-${color}-500/30 whitespace-nowrap`}>
                      Valeur {bonus.value}
                    </Badge>
                  </div>

                  {/* Deliverable */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Download className="w-3 h-3" />
                      {bonus.deliverable}
                    </div>
                    <Button variant="outline" size="sm" className="opacity-60 group-hover:opacity-100 transition-opacity">
                      Prévisualiser
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Value Proposition */}
      <Card className="p-6 bg-gradient-primary/5 border-primary/30">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            <h5 className="text-lg font-bold text-primary">Package Complet Prêt !</h5>
          </div>
          <p className="text-sm text-muted-foreground">
            Produit principal + {finalData.length} bonus = offre irrésistible de {totalValue}€ de valeur
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline">
              Personnaliser les Bonus
            </Button>
            <Button className="bg-gradient-primary hover:shadow-glow">
              Valider le Package
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggestions */}
      <Card className="p-4 bg-blue-500/5 border-blue-500/20">
        <h6 className="text-sm font-semibold text-blue-400 mb-2">💡 Conseils d'optimisation :</h6>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Limitez à 3-4 bonus pour éviter la paralysie du choix</li>
          <li>• Alternez les formats (PDF, audio, vidéo) pour plus d'attrait</li>
          <li>• Mettez en avant la valeur monétaire de chaque bonus</li>
          <li>• Créez des bonus complémentaires au produit principal</li>
        </ul>
      </Card>
    </div>
  );
};