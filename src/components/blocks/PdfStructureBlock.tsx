import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, List, Image, ChevronRight } from 'lucide-react';

interface Chapter {
  title: string;
  content: string;
  exercises: string[];
}

interface PdfStructureBlockProps {
  data?: {
    title?: string;
    introduction?: string;
    chapters?: Chapter[];
    conclusion?: string;
    exercises?: string[];
  };
}

export const PdfStructureBlock = ({ data }: PdfStructureBlockProps) => {
  if (!data) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Structure PDF en cours de génération...</p>
      </div>
    );
  }

  const mockData = {
    title: "Guide Complet : Maîtrisez Votre Niche en 30 Jours",
    introduction: "Dans ce guide révolutionnaire, vous allez découvrir les secrets que les experts gardent jalousement...",
    chapters: [
      {
        title: "Chapitre 1 : Les Fondamentaux",
        content: "Apprenez les bases essentielles pour construire votre expertise...",
        exercises: ["Exercice 1.1 : Auto-évaluation", "Exercice 1.2 : Définir ses objectifs"]
      },
      {
        title: "Chapitre 2 : La Méthode Secrète",
        content: "Découvrez la technique que 97% des personnes ignorent...",
        exercises: ["Exercice 2.1 : Test pratique", "Exercice 2.2 : Mise en application"]
      },
      {
        title: "Chapitre 3 : Maximiser Vos Résultats",
        content: "Comment multiplier vos résultats par 10 en appliquant ces principes...",
        exercises: ["Exercice 3.1 : Plan d'action", "Exercice 3.2 : Suivi des progrès"]
      }
    ],
    conclusion: "Vous avez maintenant toutes les clés en main pour transformer votre vie...",
    exercises: ["Bilan final", "Plan d'action 90 jours"]
  };

  const finalData = { ...mockData, ...data };

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <Card className="p-6 bg-gradient-primary/5 border-primary/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-primary mb-2">{finalData.title}</h4>
            <p className="text-sm text-muted-foreground">{finalData.introduction}</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary">PDF Ready</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                {finalData.chapters?.length || 0} Chapitres
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Table of Contents */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <List className="w-4 h-4" />
          Table des Matières
        </h4>
        
        <div className="space-y-3">
          {/* Introduction */}
          <Card className="p-4 hover:bg-accent/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm font-semibold">
                  0
                </span>
                <div>
                  <p className="font-medium">Introduction</p>
                  <p className="text-xs text-muted-foreground">Mise en contexte et objectifs</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card>

          {/* Chapters */}
          {finalData.chapters?.map((chapter, index) => (
            <Card key={index} className="p-4 hover:bg-accent/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-primary/20 text-primary rounded flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{chapter.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{chapter.content}</p>
                    {chapter.exercises && chapter.exercises.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {chapter.exercises.map((exercise, exIndex) => (
                          <Badge key={exIndex} variant="outline" className="text-xs">
                            {exercise}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1" />
              </div>
            </Card>
          ))}

          {/* Conclusion */}
          <Card className="p-4 hover:bg-accent/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded flex items-center justify-center text-sm font-semibold">
                  ✓
                </span>
                <div>
                  <p className="font-medium">Conclusion</p>
                  <p className="text-xs text-muted-foreground">Synthèse et prochaines étapes</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </div>

      {/* Visual Suggestions */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Image className="w-4 h-4" />
          Suggestions Visuelles
        </h4>
        <Card className="p-4 bg-blue-500/5 border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm font-medium text-blue-400">Images recommandées :</p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>• Cover professionnel avec titre en gras</li>
              <li>• Diagrammes explicatifs pour chaque chapitre</li>
              <li>• Infographies pour les statistiques clés</li>
              <li>• Screenshots d'exemples concrets</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Prévisualiser PDF
        </Button>
        <Button className="bg-gradient-primary hover:shadow-glow flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Générer Document Complet
        </Button>
      </div>
    </div>
  );
};