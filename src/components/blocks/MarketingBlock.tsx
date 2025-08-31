import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Megaphone, 
  Facebook, 
  Instagram, 
  Mail, 
  Video, 
  Hash, 
  Target,
  Copy,
  Check,
  BarChart
} from 'lucide-react';

interface MarketingAssets {
  facebookAds: string[];
  instagramAds: string[];
  tiktokScripts: string[];
  emailSequence: string[];
  hashtags: string[];
  creativeBrief: string;
  utmTemplates: string[];
}

interface MarketingBlockProps {
  data?: MarketingAssets;
}

export const MarketingBlock = ({ data }: MarketingBlockProps) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const mockData: MarketingAssets = {
    facebookAds: [
      "🔥 STOP ! Si vous lisez ceci, c'est que vous voulez VRAIMENT changer votre vie...\n\n✅ Découvrez la méthode qui a transformé + de 10,000 personnes\n✅ Résultats visibles en seulement 7 jours\n✅ Garantie 100% satisfait ou remboursé\n\n👆 Cliquez pour accéder au guide complet (Offre limitée)",
      
      "La vérité que personne ne vous dira sur [VOTRE NICHE] 😱\n\nPendant que tout le monde fait ça... les VRAIS experts font exactement l'OPPOSÉ.\n\nRésultat ? Ils obtiennent 10x plus de résultats en 2x moins de temps.\n\n🎯 Découvrez leur secret dans ce guide exclusif\n⏰ Plus que 48h pour le récupérer au prix de lancement",
      
      "❌ ERREUR : 97% des gens font cette erreur fatale...\n\nEt ça les empêche d'atteindre leurs objectifs pendant des ANNÉES.\n\n✅ La solution ? Cette méthode révolutionnaire utilisée par les PROs\n\n📈 Résultats garantis en 30 jours\n🔒 Accès immédiat et à vie\n\n👇 Téléchargez maintenant (prix exceptionnel)"
    ],
    
    instagramAds: [
      "POV: Tu découvres enfin la méthode qui FONCTIONNE 🤯\n\n• Méthode validée par +10,000 personnes\n• Résultats en 7 jours chrono ⏰\n• 0 stress, 100% efficace ✨\n\nLink in bio pour accéder au guide 👆\n\n#transformation #méthode #résultats",
      
      "Ce qu'on ne vous dit PAS sur [VOTRE NICHE] 👀\n\nLes experts gardent ces secrets jalousement...\nMais aujourd'hui, tout est révélé 🔓\n\n✅ Technique #1 : [Secret]\n✅ Technique #2 : [Secret]\n✅ Technique #3 : [Secret]\n\nGuide complet dispo maintenant 📲",
      
      "Plot twist: La solution était sous votre nez 🤔\n\nPendant que vous cherchez compliqué...\nLa vraie méthode est ultra SIMPLE\n\n🎯 5 étapes seulement\n⚡ Résultats immédiats\n🔒 Garanti ou remboursé\n\nStory pour le lien direct ➡️"
    ],
    
    tiktokScripts: [
      "Script 1 - Pattern Interrupt:\n\n[Hook visuel fort - 0-2s]\n'Arrêtez tout ce que vous faites...'\n\n[Révélation - 2-10s]\n'Cette méthode a changé ma vie en 30 jours'\n\n[Preuve sociale - 10-20s]\n'Plus de 10,000 personnes l'utilisent déjà'\n\n[CTA - 20-30s]\n'Lien dans ma bio pour la découvrir'",
      
      "Script 2 - Before/After:\n\n[Avant - 0-5s]\n'Il y a 6 mois, j'étais exactement comme vous...'\n\n[Transformation - 5-15s]\n'Puis j'ai découvert CETTE méthode'\n\n[Après - 15-25s]\n'Regardez ce qui s'est passé...'\n\n[CTA - 25-30s]\n'Vous voulez la même chose ? Guide gratuit en bio'",
      
      "Script 3 - Liste rapide:\n\n[Hook - 0-3s]\n'3 erreurs qui vous empêchent de réussir :'\n\n[Énumération rapide - 3-20s]\n'1. Vous faites ça...\n2. Vous pensez que...\n3. Vous ne savez pas que...'\n\n[Solution - 20-30s]\n'La solution dans mon guide gratuit ⬇️'"
    ],
    
    emailSequence: [
      "Email 1 - Bienvenue:\nObjet: Votre guide est prêt ! (+ surprise à l'intérieur)\n\nSalut [Prénom],\n\nFélicitations ! Vous venez de faire le premier pas vers votre transformation.\n\nVotre guide est maintenant accessible, mais avant de le découvrir, laissez-moi vous raconter pourquoi cette méthode fonctionne quand tout le reste échoue...",
      
      "Email 2 - Histoire personnelle:\nObjet: Mon échec de 50,000€ (et ce que j'en ai appris)\n\nSalut [Prénom],\n\nIl y a 3 ans, j'ai perdu 50,000€ en suivant les 'conseils d'experts'...\n\nCette erreur a failli me coûter ma maison, ma famille, ma santé mentale.\n\nMais paradoxalement, cet échec m'a menée à la découverte la plus importante de ma vie...",
      
      "Email 3 - Objection handling:\nObjet: 'Ça ne marchera jamais pour moi' (vraiment ?)\n\nSalut [Prénom],\n\nJe reçois souvent ce message : 'Votre méthode a l'air géniale, mais ça ne marchera jamais pour moi car [excuse]'\n\nEt je comprends parfaitement cette peur...\n\nMoi aussi j'ai pensé être 'différent', 'trop vieux', 'pas assez doué'...\n\nMais voici ce qui a tout changé..."
    ],
    
    hashtags: [
      "#transformation #développementpersonnel #méthode #résultats #motivation #changement #objectifs #succès #mindset #efficacité",
      "#entrepreneur #business #freelance #argent #liberté #indépendance #revenus #investissement #stratégie #croissance",
      "#bienêtre #santé #forme #énergie #habitudes #lifestyle #équilibre #zen #confiance #positivité"
    ],
    
    creativeBrief: "Brief Créatif - Visuels recommandés:\n\n1. COULEURS PRINCIPALES:\n- Bleu confiance (#3B82F6)\n- Vert succès (#10B981)\n- Orange urgence (#F59E0B)\n\n2. STYLE VISUEL:\n- Moderne et épuré\n- Typographies bold pour les titres\n- Contraste élevé pour la lisibilité\n- Éléments géométriques subtils\n\n3. IMAGES TYPES:\n- Personnes souriantes et confiantes\n- Graphiques de croissance\n- Before/After visuels\n- Screenshots de résultats\n\n4. FORMATS PRIORITAIRES:\n- Carré 1080x1080 (Instagram)\n- Stories 1080x1920\n- Paysage 1200x630 (Facebook)\n- Vertical 1080x1350 (TikTok)",
    
    utmTemplates: [
      "Facebook Ads: ?utm_source=facebook&utm_medium=social&utm_campaign=guide_launch&utm_content=ad_variant_1",
      "Instagram Stories: ?utm_source=instagram&utm_medium=stories&utm_campaign=guide_launch&utm_content=story_swipe",
      "Email Marketing: ?utm_source=email&utm_medium=newsletter&utm_campaign=guide_launch&utm_content=cta_button",
      "TikTok Bio: ?utm_source=tiktok&utm_medium=bio_link&utm_campaign=guide_launch&utm_content=bio_cta"
    ]
  };

  const finalData = data || mockData;

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const CopyButton = ({ content, id }: { content: string; id: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleCopy(content, id)}
      className="opacity-60 hover:opacity-100"
    >
      {copiedIndex === id ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h4 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          Marketing Assets Complets
        </h4>
        <p className="text-sm text-muted-foreground">
          Tout ce dont vous avez besoin pour lancer votre campagne marketing
        </p>
      </div>

      <Tabs defaultValue="ads" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ads" className="flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            Ads
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="creative" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Créatif
          </TabsTrigger>
        </TabsList>

        {/* Facebook/Instagram Ads */}
        <TabsContent value="ads" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Facebook Ads */}
            <div>
              <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Facebook className="w-5 h-5 text-blue-500" />
                Facebook Ads Copy
              </h5>
              <div className="space-y-3">
                {finalData.facebookAds.map((ad, index) => (
                  <Card key={index} className="p-4 hover:bg-accent/30 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">Variant {index + 1}</Badge>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{ad}</p>
                      </div>
                      <CopyButton content={ad} id={`fb-${index}`} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Instagram Ads */}
            <div>
              <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                Instagram Ads Copy
              </h5>
              <div className="space-y-3">
                {finalData.instagramAds.map((ad, index) => (
                  <Card key={index} className="p-4 hover:bg-accent/30 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">Post {index + 1}</Badge>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{ad}</p>
                      </div>
                      <CopyButton content={ad} id={`ig-${index}`} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Social Content */}
        <TabsContent value="social" className="space-y-6">
          {/* TikTok Scripts */}
          <div>
            <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-500" />
              Scripts TikTok/Shorts
            </h5>
            <div className="grid gap-4">
              {finalData.tiktokScripts.map((script, index) => (
                <Card key={index} className="p-6 bg-gradient-card border-border/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-3">
                        Script Viral #{index + 1}
                      </Badge>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{script}</pre>
                    </div>
                    <CopyButton content={script} id={`tiktok-${index}`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-500" />
              Hashtags Stratégiques
            </h5>
            <div className="space-y-3">
              {finalData.hashtags.map((hashtagGroup, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        Catégorie {index + 1}
                      </Badge>
                      <p className="text-sm text-primary">{hashtagGroup}</p>
                    </div>
                    <CopyButton content={hashtagGroup} id={`hashtags-${index}`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Email Sequence */}
        <TabsContent value="email" className="space-y-4">
          <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-500" />
            Séquence Email 7 Jours
          </h5>
          <div className="space-y-4">
            {finalData.emailSequence.map((email, index) => (
              <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Jour {index + 1}
                      </Badge>
                      <Badge variant="outline">
                        Taux d'ouverture estimé: {Math.floor(45 - index * 3)}%
                      </Badge>
                    </div>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{email}</pre>
                  </div>
                  <CopyButton content={email} id={`email-${index}`} />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Creative Brief */}
        <TabsContent value="creative" className="space-y-6">
          {/* Brief Créatif */}
          <div>
            <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Brief Créatif Complet
            </h5>
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start justify-between gap-3">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans flex-1">
                  {finalData.creativeBrief}
                </pre>
                <CopyButton content={finalData.creativeBrief} id="creative-brief" />
              </div>
            </Card>
          </div>

          {/* UTM Templates */}
          <div>
            <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-blue-500" />
              Templates UTM Tracking
            </h5>
            <div className="space-y-2">
              {finalData.utmTemplates.map((utm, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-xs text-muted-foreground bg-muted/50 p-2 rounded flex-1">
                      {utm}
                    </code>
                    <CopyButton content={utm} id={`utm-${index}`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Performance Metrics */}
      <Card className="p-6 bg-gradient-primary/5 border-primary/30">
        <h5 className="text-lg font-bold text-primary mb-4 text-center">Métriques de Performance Estimées</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">2.4%</p>
            <p className="text-sm text-muted-foreground">CTR Facebook</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">18%</p>
            <p className="text-sm text-muted-foreground">Engagement IG</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">23%</p>
            <p className="text-sm text-muted-foreground">Open Rate Email</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">3.7%</p>
            <p className="text-sm text-muted-foreground">Conversion Landing</p>
          </div>
        </div>
      </Card>
    </div>
  );
};