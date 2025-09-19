import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Play, 
  Pause, 
  Quote,
  TrendingUp,
  DollarSign,
  Clock,
  Zap
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  videoThumbnail: string;
  quote: string;
  results: {
    revenue: string;
    timeToLaunch: string;
    conversionRate: string;
  };
  rating: number;
  isVideoPlaying?: boolean;
  tags: string[];
}

const AnimatedTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      role: 'Entrepreneur E-commerce',
      company: 'MarieShop',
      avatar: 'MD',
      videoThumbnail: '🎥',
      quote: "J'ai créé mon premier produit info en 8 minutes avec NicheLaunchpad. Résultat : €47K de CA en 3 mois. Cette IA a littéralement transformé mon business !",
      results: {
        revenue: '€47,000',
        timeToLaunch: '8 minutes',
        conversionRate: '12.8%'
      },
      rating: 5,
      tags: ['E-commerce', 'Premier succès', 'Beta-user']
    },
    {
      id: '2',
      name: 'Thomas Chen',
      role: 'Coach Business',
      company: 'Success Coaching',
      avatar: 'TC',
      videoThumbnail: '📹',
      quote: "Incroyable ! L'IA a généré un produit sur le mindset entrepreneur qui surperforme tous mes anciens produits. €83K en 4 mois et les ventes continuent !",
      results: {
        revenue: '€83,200',
        timeToLaunch: '12 minutes',
        conversionRate: '15.3%'
      },
      rating: 5,
      tags: ['Coaching', 'Mindset', 'Beta-user']
    },
    {
      id: '3',
      name: 'Sophie Martin',
      role: 'Digital Marketer',
      company: 'Growth Agency',
      avatar: 'SM',
      videoThumbnail: '🎬',
      quote: "Les hooks générés par l'IA sont d'un niveau professionnel inégalé. Mon taux de conversion a doublé ! €156K générés avec 3 produits créés en moins d'1h.",
      results: {
        revenue: '€156,000',
        timeToLaunch: '18 minutes',
        conversionRate: '18.7%'
      },
      rating: 5,
      tags: ['Marketing', 'Conversion', 'Beta-user']
    },
    {
      id: '4',
      name: 'Alexandre Dubois',
      role: 'Info-preneur',
      company: 'Digital Empire',
      avatar: 'AD',
      videoThumbnail: '🎪',
      quote: "J'ai testé toutes les solutions du marché. NicheLaunchpad est de loin la plus performante. €234K sur 6 mois avec 5 produits IA. ROI exceptionnel !",
      results: {
        revenue: '€234,500',
        timeToLaunch: '32 minutes',
        conversionRate: '21.2%'
      },
      rating: 5,
      tags: ['Info-produits', 'Scaling', 'Beta-user']
    }
  ];

  useEffect(() => {
    if (isAutoPlay && !playingVideo) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlay, playingVideo, testimonials.length]);

  const handleVideoPlay = (testimonialId: string) => {
    setPlayingVideo(playingVideo === testimonialId ? null : testimonialId);
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="bg-cyber-primary/10 text-cyber-primary border-cyber-primary/20">
          <Star className="w-4 h-4 mr-2" />
          Beta-Users Testimonials
        </Badge>
        <h3 className="text-3xl font-bold">
          <span className="text-foreground">Ils ont créé leurs</span>
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Premiers Succès</span>
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Découvrez les résultats extraordinaires de nos premiers utilisateurs beta
        </p>
      </div>

      {/* Main Testimonial Display */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Video/Avatar Section */}
        <Card className="relative overflow-hidden bg-gradient-glass border border-cyber-primary/20 p-8">
          <div className="relative aspect-video bg-background/10 rounded-xl overflow-hidden mb-6">
            {/* Video Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl mb-4">{currentTestimonial.videoThumbnail}</div>
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button
                size="lg"
                onClick={() => handleVideoPlay(currentTestimonial.id)}
                className="w-16 h-16 rounded-full bg-gradient-primary hover:shadow-cyber transition-all duration-300"
              >
                {playingVideo === currentTestimonial.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </Button>
            </div>

            {/* Playing Indicator */}
            {playingVideo === currentTestimonial.id && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-red-500 text-white animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  LIVE
                </Badge>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-cyber-primary/30">
              <AvatarFallback className="bg-gradient-primary text-background font-bold text-lg">
                {currentTestimonial.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
              <p className="text-cyber-primary font-medium">{currentTestimonial.role}</p>
              <p className="text-sm text-muted-foreground">{currentTestimonial.company}</p>
            </div>
          </div>
        </Card>

        {/* Quote & Results Section */}
        <div className="space-y-6">
          {/* Quote */}
          <Card className="p-6 bg-gradient-glass border border-cyber-primary/20 relative">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-cyber-primary/30" />
            <div className="pl-12">
              <p className="text-lg leading-relaxed mb-4 text-foreground">
                "{currentTestimonial.quote}"
              </p>
              <div className="flex items-center gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </Card>

          {/* Results Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-glass border border-cyber-primary/10 text-center hover:border-cyber-primary/30 transition-all duration-300">
              <DollarSign className="w-8 h-8 text-cyber-primary mx-auto mb-2" />
              <div className="font-bold text-lg text-cyber-primary">
                {currentTestimonial.results.revenue}
              </div>
              <div className="text-xs text-muted-foreground">Revenus générés</div>
            </Card>

            <Card className="p-4 bg-gradient-glass border border-cyber-primary/10 text-center hover:border-cyber-primary/30 transition-all duration-300">
              <Clock className="w-8 h-8 text-cyber-secondary mx-auto mb-2" />
              <div className="font-bold text-lg text-cyber-secondary">
                {currentTestimonial.results.timeToLaunch}
              </div>
              <div className="text-xs text-muted-foreground">Temps création</div>
            </Card>

            <Card className="p-4 bg-gradient-glass border border-cyber-primary/10 text-center hover:border-cyber-primary/30 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-cyber-tertiary mx-auto mb-2" />
              <div className="font-bold text-lg text-cyber-tertiary">
                {currentTestimonial.results.conversionRate}
              </div>
              <div className="text-xs text-muted-foreground">Taux conversion</div>
            </Card>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {currentTestimonial.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-cyber-primary/30 text-cyber-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="border-cyber-primary/30 hover:bg-cyber-primary/10"
        >
          {isAutoPlay ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isAutoPlay ? 'Pause' : 'Auto'}
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlay(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? 'bg-cyber-primary shadow-cyber'
                  : 'bg-background/20 hover:bg-cyber-primary/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Compact Testimonials Grid */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id}
            className={`p-4 cursor-pointer transition-all duration-300 ${
              index === activeTestimonial
                ? 'bg-gradient-primary border-cyber-primary shadow-cyber'
                : 'bg-gradient-glass border border-cyber-primary/10 hover:border-cyber-primary/30'
            }`}
            onClick={() => setActiveTestimonial(index)}
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`font-bold text-sm ${
                  index === activeTestimonial
                    ? 'bg-background/20 text-background'
                    : 'bg-cyber-primary/10 text-cyber-primary'
                }`}>
                  {testimonial.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className={`font-semibold text-sm ${
                  index === activeTestimonial ? 'text-background' : 'text-foreground'
                }`}>
                  {testimonial.name}
                </div>
                <div className={`text-xs ${
                  index === activeTestimonial ? 'text-background/80' : 'text-muted-foreground'
                }`}>
                  {testimonial.role}
                </div>
              </div>
            </div>
            
            <div className={`text-xl font-bold ${
              index === activeTestimonial ? 'text-background' : 'text-cyber-primary'
            }`}>
              {testimonial.results.revenue}
            </div>
            <div className={`text-xs ${
              index === activeTestimonial ? 'text-background/70' : 'text-muted-foreground'
            }`}>
              en {testimonial.results.timeToLaunch}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTestimonials;