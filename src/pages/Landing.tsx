import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2, 
  Filter, 
  Play,
  Star,
  Users,
  Target,
  Zap,
  ChevronRight,
  LogOut,
  User,
  ShoppingCart,
  BarChart3,
  Globe,
  Menu
} from 'lucide-react';

const Landing = () => {
  const { user, signOut } = useAuth();

  const stats = [
    { label: 'Ads Tracked', value: '2.5M+' },
    { label: 'Products Found', value: '850K+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Users', value: '200K+' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Advanced Ad Spy',
      description: 'Track millions of ads across all major platforms with real-time data and analytics.'
    },
    {
      icon: TrendingUp,
      title: 'Winning Products',
      description: 'Discover trending products before they saturate the market with our AI algorithms.'
    },
    {
      icon: Target,
      title: 'Competitor Analysis',
      description: 'Analyze your competitors strategies and find gaps in the market.'
    },
    {
      icon: BarChart3,
      title: 'Sales Tracking',
      description: 'Monitor product performance and sales data across multiple stores.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'E-commerce Entrepreneur',
      avatar: 'SC',
      comment: 'Found 5 winning products in my first week. Revenue increased by 340%!',
      revenue: '$50K/month'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Dropshipper',
      avatar: 'MR',
      comment: 'The ad spy feature is incredible. I can see exactly what my competitors are doing.',
      revenue: '$85K/month'
    },
    {
      name: 'Emma Johnson',
      role: 'Digital Marketer',
      avatar: 'EJ',
      comment: 'Best investment for my business. ROI paid for itself in 2 weeks.',
      revenue: '$120K/month'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$39',
      period: '/month',
      features: [
        '10,000 ad searches/month',
        'Basic product research',
        'Standard filters',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: [
        'Unlimited ad searches',
        'Advanced product research',
        'All filters & sorting',
        'Sales tracking',
        'Priority support',
        'Export data'
      ],
      popular: true
    },
    {
      name: 'Agency',
      price: '$149',
      period: '/month',
      features: [
        'Everything in Professional',
        'White-label access',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Custom reports'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold">Minea</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
                Adspy
              </Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
                Winning Products
              </Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {user.email}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/app">
                    <Globe className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={async () => {
                    await signOut();
                  }}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:shadow-button" asChild>
                  <Link to="/auth">Free Trial</Link>
                </Button>
              </div>
            )}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-hero overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-minea-dark border-0">
              <Star className="w-4 h-4 mr-2 fill-current" />
              #1 All-In-One AI DropShipping Tool
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-minea-dark">
              Launch <span className="text-primary">Winning</span>
              <br />
              Products in <span className="text-primary">3 clicks</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-minea-dark/70 max-w-3xl mx-auto mb-12">
              Minea is an all-in-one solution, designed to help you launch your ecommerce, scale your sales & boost profits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg"
                className="h-14 px-8 bg-minea-dark text-white hover:bg-minea-dark/90 text-lg"
                asChild
              >
                <Link to={user ? "/app" : "/auth"}>
                  Start Now for Free
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-8 text-lg border-minea-dark/20 hover:bg-minea-dark/5"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-minea-dark/60 mb-8">No commitment.</p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Search className="w-4 h-4 mr-2" />
                Browse Ads
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Browse Products
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <BarChart3 className="w-4 h-4 mr-2" />
                Sales Tracker
              </Badge>
            </div>
          </div>
        </div>

        {/* Demo mockup */}
        <div className="container mt-20">
          <div className="max-w-6xl mx-auto">
            <Card className="p-2 bg-white shadow-card">
              <div className="bg-gradient-card rounded-lg overflow-hidden">
                {/* Mock interface header */}
                <div className="bg-white border-b p-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <span className="font-semibold">Minea</span>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <div className="pl-10 pr-4 py-2 bg-muted rounded-md text-sm text-muted-foreground">
                        Search ads, products, shops...
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Filters</span>
                  </div>
                </div>

                {/* Mock ad grid */}
                <div className="p-6 grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-gradient-card relative">
                        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                          New Ad
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          <Eye className="w-3 h-3" />
                          2.4K
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Trending Product #{i}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>5 days running</span>
                          <div className="flex items-center gap-2">
                            <Heart className="w-3 h-3" />
                            <span>124</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-minea-dark text-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-white/80">Approved by over 200,000 e-commerce enthusiasts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to <span className="text-primary">succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools designed to help you find winning products and scale your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-card">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gradient-card">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="text-primary">successful entrepreneurs</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-8 bg-white border-0 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-white font-bold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm font-semibold text-primary">{testimonial.revenue}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current text-primary" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose your <span className="text-primary">plan</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`relative p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-button scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-button' 
                      : 'bg-minea-dark hover:bg-minea-dark/90'
                  }`}
                  asChild
                >
                  <Link to="/auth">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-hero">
        <div className="container text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-minea-dark">
            Ready to find your next
            <br />
            <span className="text-primary">winning product?</span>
          </h2>
          
          <p className="text-xl text-minea-dark/70 max-w-3xl mx-auto mb-12">
            Join thousands of successful entrepreneurs who use Minea to scale their businesses
          </p>
          
          <Button size="lg" className="h-16 px-12 bg-minea-dark text-white hover:bg-minea-dark/90 text-xl" asChild>
            <Link to="/auth">
              Start Your Free Trial
              <ChevronRight className="w-6 h-6 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-minea-dark text-white">
        <div className="container">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold">Minea</span>
            </div>
            <p className="text-white/80 text-center max-w-2xl">
              The leading adspy tool for e-commerce and dropshipping. Discover winning products and successful ad campaigns.
            </p>
            <div className="text-sm text-white/60">
              © 2024 Minea. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;