import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Zap, Star } from 'lucide-react';

interface Hook {
  title: string;
  tagline: string;
  story: string;
  benefit: string;
  trigger: string;
}

interface HooksBlockProps {
  data?: Hook[];
}

export const HooksBlock = ({ data }: HooksBlockProps) => {
  const [selectedHook, setSelectedHook] = useState<number | null>(null);

  if (!data || !Array.isArray(data)) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Hooks en cours de génération...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Hooks Émotionnels Générés
        </h4>
        {selectedHook !== null && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Hook {selectedHook + 1} sélectionné
          </Badge>
        )}
      </div>

      <div className="grid gap-4">
        {data.map((hook, index) => (
          <Card 
            key={index}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-glow ${
              selectedHook === index 
                ? 'ring-2 ring-primary/50 bg-primary/5' 
                : 'hover:bg-accent/30'
            }`}
            onClick={() => setSelectedHook(selectedHook === index ? null : index)}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <Button
                  variant={selectedHook === index ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHook(index);
                  }}
                >
                  {selectedHook === index ? 'Sélectionné' : 'Sélectionner'}
                </Button>
              </div>

              {/* Title */}
              <div>
                <h5 className="text-lg font-bold text-foreground mb-2 flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  {hook.title}
                </h5>
                <p className="text-primary font-medium">{hook.tagline}</p>
              </div>

              {/* Story Preview */}
              <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary/30">
                <p className="text-sm text-muted-foreground italic">"{hook.story}"</p>
              </div>

              {/* Benefit & Trigger */}
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {hook.benefit}
                </Badge>
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                  {hook.trigger}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedHook !== null && (
        <Card className="p-6 bg-gradient-primary/5 border-primary/30">
          <div className="text-center space-y-3">
            <h5 className="text-lg font-semibold text-primary">Hook sélectionné !</h5>
            <p className="text-sm text-muted-foreground">
              Ce hook sera utilisé pour générer automatiquement la structure PDF et les autres blocs.
            </p>
            <Button className="bg-gradient-primary hover:shadow-glow">
              Continuer avec ce Hook
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};