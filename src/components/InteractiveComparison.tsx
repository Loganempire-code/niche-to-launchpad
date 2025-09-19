import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  X,
  Check,
  AlertTriangle,
  Brain,
  Rocket,
  Shield
} from 'lucide-react';

interface ComparisonData {
  method: string;
  time: string;
  cost: string;
  success: string;
  difficulty: string;
  pros: string[];
  cons: string[];
  icon: React.ElementType;
  color: string;
}

const InteractiveComparison = () => {
  const [selectedMethod, setSelectedMethod] = useState('ai');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const comparisonData: ComparisonData[] = [
    {
      method: 'Méthode Traditionnelle',
      time: '3-6 mois',
      cost: '€5,000-15,000',
      success: '15-25%',
      difficulty: 'Très difficile',
      pros: [
        'Contrôle total du processus',
        'Apprentissage approfondi',
        'Résultats personnalisés'
      ],
      cons: [
        'Temps de développement très long',
        'Coûts élevés (outils, formations)',
        'Taux d\'échec important',
        'Expertise technique requise',
        'Pas de garantie de résultats'
      ],
      icon: Clock,
      color: 'red-500'
    },
    {
      method: 'Freelances & Agences',
      time: '1-3 mois',
      cost: '€2,000-8,000',
      success: '30-40%',
      difficulty: 'Difficile',
      pros: [
        'Expertise externe',
        'Délégation complète',
        'Résultats professionnels'
      ],
      cons: [
        'Coûts imprévisibles',
        'Dépendance aux prestataires',
        'Communication complexe',
        'Pas de contrôle sur la qualité',
        'Délais souvent dépassés'
      ],
      icon: Users,
      color: 'orange-500'
    },
    {
      method: 'NicheLaunchpad IA',
      time: '5-10 minutes',
      cost: '€79/mois',
      success: '85-95%',
      difficulty: 'Très facile',
      pros: [
        'Génération instantanée',
        'IA spécialisée marketing',
        'Analyse concurrentielle incluse',
        'Prix transparent et fixe',
        'Support communautaire',
        'Mise à jour continue'
      ],
      cons: [
        'Nécessite validation humaine',
        'Personnalisation limitée'
      ],
      icon: Brain,
      color: 'cyber-primary'
    }
  ];

  const metrics = [
    { 
      label: 'Temps de création', 
      icon: Clock, 
      values: ['3-6 mois', '1-3 mois', '5-10 min'],
      colors: ['red', 'orange', 'green']
    },
    { 
      label: 'Coût total', 
      icon: DollarSign, 
      values: ['€5K-15K', '€2K-8K', '€79/mois'],
      colors: ['red', 'orange', 'green']
    },
    { 
      label: 'Taux de succès', 
      icon: TrendingUp, 
      values: ['15-25%', '30-40%', '85-95%'],
      colors: ['red', 'orange', 'green']
    },
    { 
      label: 'Difficulté', 
      icon: Target, 
      values: ['Très difficile', 'Difficile', 'Très facile'],
      colors: ['red', 'orange', 'green']
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold">
          <span className="text-foreground">Comparatif</span>
          <span className="text-cyber-primary ml-2">Intelligent</span>
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Découvrez pourquoi notre IA révolutionne la création de produits digitaux
        </p>
      </div>

      <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-background/20 border border-cyber-primary/20">
          <TabsTrigger value="traditional" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
            Traditionnel
          </TabsTrigger>
          <TabsTrigger value="freelance" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
            Freelances
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-cyber-primary/20 data-[state=active]:text-cyber-primary">
            IA NicheLaunchpad
          </TabsTrigger>
        </TabsList>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {comparisonData.map((data, index) => {
            const Icon = data.icon;
            const isSelected = 
              (selectedMethod === 'traditional' && index === 0) ||
              (selectedMethod === 'freelance' && index === 1) ||
              (selectedMethod === 'ai' && index === 2);
            
            return (
              <Card
                key={data.method}
                className={`p-6 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? index === 2
                      ? 'bg-gradient-primary border-cyber-primary shadow-cyber scale-105'
                      : 'bg-gradient-glass border-orange-500/30 shadow-lg scale-105'
                    : 'bg-background/5 border-transparent hover:border-cyber-primary/20'
                }`}
                onMouseEnter={() => setHoveredCard(data.method)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  if (index === 0) setSelectedMethod('traditional');
                  if (index === 1) setSelectedMethod('freelance');
                  if (index === 2) setSelectedMethod('ai');
                }}
              >
                {/* Animated Background */}
                {isSelected && index === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 via-cyber-secondary/5 to-cyber-tertiary/10 animate-pulse-glow"></div>
                )}

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected && index === 2
                        ? 'bg-background/20'
                        : index === 1
                          ? 'bg-orange-500/20'
                          : 'bg-red-500/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected && index === 2
                          ? 'text-background'
                          : index === 1
                            ? 'text-orange-400'
                            : 'text-red-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${
                        isSelected && index === 2 ? 'text-background' : 'text-foreground'
                      }`}>
                        {data.method}
                      </h4>
                      {index === 2 && (
                        <Badge variant="secondary" className="bg-background/20 text-background text-xs mt-1">
                          RECOMMANDÉ
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        isSelected && index === 2 ? 'text-background/80' : 'text-muted-foreground'
                      }`}>Temps</span>
                      <span className={`font-medium ${
                        isSelected && index === 2 ? 'text-background' : 'text-foreground'
                      }`}>{data.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        isSelected && index === 2 ? 'text-background/80' : 'text-muted-foreground'
                      }`}>Coût</span>
                      <span className={`font-medium ${
                        isSelected && index === 2 ? 'text-background' : 'text-foreground'
                      }`}>{data.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        isSelected && index === 2 ? 'text-background/80' : 'text-muted-foreground'
                      }`}>Succès</span>
                      <span className={`font-medium ${
                        isSelected && index === 2 ? 'text-background' : 'text-foreground'
                      }`}>{data.success}</span>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="space-y-4">
                    <div>
                      <h5 className={`text-sm font-medium mb-2 flex items-center gap-2 ${
                        isSelected && index === 2 ? 'text-background' : 'text-green-400'
                      }`}>
                        <Check className="w-4 h-4" />
                        Avantages
                      </h5>
                      <ul className="space-y-1">
                        {data.pros.slice(0, 3).map((pro, i) => (
                          <li key={i} className={`text-xs flex items-start gap-2 ${
                            isSelected && index === 2 ? 'text-background/80' : 'text-muted-foreground'
                          }`}>
                            <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className={`text-sm font-medium mb-2 flex items-center gap-2 ${
                        isSelected && index === 2 ? 'text-background' : 'text-red-400'
                      }`}>
                        <X className="w-4 h-4" />
                        Inconvénients
                      </h5>
                      <ul className="space-y-1">
                        {data.cons.slice(0, 3).map((con, i) => (
                          <li key={i} className={`text-xs flex items-start gap-2 ${
                            isSelected && index === 2 ? 'text-background/80' : 'text-muted-foreground'
                          }`}>
                            <X className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed View */}
        <TabsContent value="traditional" className="mt-8">
          <Card className="p-6 bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-red-400 mb-2">Méthode Traditionnelle</h4>
                <p className="text-muted-foreground mb-4">
                  Approche classique nécessitant des mois de recherche, développement et tests.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-400 mb-2">✓ Points forts</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Contrôle total du processus</li>
                      <li>• Apprentissage approfondi du marché</li>
                      <li>• Résultats entièrement personnalisés</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-400 mb-2">✗ Défis majeurs</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 3-6 mois de développement minimum</li>
                      <li>• Budget €5K-15K (outils, formations)</li>
                      <li>• Taux d'échec de 75-85%</li>
                      <li>• Expertise technique indispensable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="freelance" className="mt-8">
          <Card className="p-6 bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-orange-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-orange-400 mb-2">Freelances & Agences</h4>
                <p className="text-muted-foreground mb-4">
                  Délégation à des experts externes avec des résultats variables.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-400 mb-2">✓ Avantages</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Expertise externe spécialisée</li>
                      <li>• Délégation complète des tâches</li>
                      <li>• Résultats généralement professionnels</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-400 mb-2">✗ Risques</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Coûts imprévisibles et évolutifs</li>
                      <li>• Dépendance totale aux prestataires</li>
                      <li>• Communication souvent complexe</li>
                      <li>• Délais fréquemment dépassés</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-8">
          <Card className="p-6 bg-gradient-primary">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-background mt-1" />
              <div>
                <h4 className="text-lg font-bold text-background mb-2">NicheLaunchpad IA</h4>
                <p className="text-background/80 mb-4">
                  Intelligence artificielle spécialisée dans la création de produits digitaux rentables.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-background mb-2">🚀 Révolutionnaire</h5>
                    <ul className="space-y-1 text-sm text-background/80">
                      <li>• Génération en 5-10 minutes</li>
                      <li>• IA entraînée sur +10K produits gagnants</li>
                      <li>• Analyse concurrentielle automatique</li>
                      <li>• Taux de succès 85-95%</li>
                      <li>• Prix fixe et transparent</li>
                      <li>• Support communautaire inclus</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-background mb-2">⚡ Résultats</h5>
                    <ul className="space-y-1 text-sm text-background/80">
                      <li>• ROI moyen : 300-500%</li>
                      <li>• Économie : €4K-14K vs traditionnel</li>
                      <li>• Gain de temps : 99% plus rapide</li>
                      <li>• Support 24/7 inclus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveComparison;