import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Test function first - will add AI integration once this works
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Function called successfully');
    const { bloc, keyword, context } = await req.json();
    
    console.log(`=== Processing Bloc ${bloc} ===`);
    console.log(`Keyword: ${keyword}`);
    console.log(`Context keys: ${context ? Object.keys(context) : 'none'}`);
    
    if (!keyword || !keyword.trim()) {
      throw new Error('Mot-clé requis');
    }
    
    if (!bloc || bloc < 1 || bloc > 6) {
      throw new Error('Numéro de bloc invalide (1-6)');
    }

    // For now, return mock data to test the connection
    const mockResponses = {
      1: {
        keyword: keyword,
        market_analysis: {
          market_size: `Marché ${keyword} estimé à 2.5 milliards €`,
          trends: ["Croissance forte", "Adoption massive", "Innovation continue"],
          opportunities: ["Marché émergent", "Peu de concurrence"]
        },
        competitors: [
          {
            name: `${keyword} Pro`,
            price: "297€",
            format: "PDF + Vidéos",
            usp: "Méthode exclusive",
            reviews: "4.8/5 (1200 avis)"
          }
        ],
        target_audience: {
          demographics: "25-45 ans, professionnels actifs",
          pain_points: ["Manque de temps", "Trop de choix", "Pas de résultats"],
          desires: ["Réussir rapidement", "Méthode simple", "Résultats garantis"]
        },
        keywords: [
          {
            keyword: `${keyword} facile`,
            intent: "transactional",
            volume: "high"
          }
        ],
        pricing_anchor: {
          min: "97",
          optimal: "197", 
          premium: "497"
        },
        top_angles: ["Méthode secrète", "Résultats rapides", "Expert reconnu"]
      },
      2: {
        hooks: Array.from({length: 5}, (_, i) => ({
          id: `hook_${i + 1}`,
          title: `Secret ${keyword} Révélé`,
          tagline: "La méthode que personne ne veut révéler",
          origin_story: `En 2019, j'ai découvert une méthode révolutionnaire dans le domaine ${keyword}. Cette découverte a changé ma vie et celle de milliers de personnes.`,
          proof_element: "Validé par 10,000+ utilisateurs",
          core_benefit: "Obtenez des résultats en 30 jours maximum",
          cliffhanger: "Ce que vous allez apprendre va bouleverser votre vision du succès",
          emotional_triggers: ["curiosity", "fear_of_missing_out", "status"],
          tone: "mystérieux"
        }))
      },
      3: {
        sales_page: {
          headline: `Maîtrisez ${keyword} Comme un Pro`,
          subheadline: "La méthode complète pour réussir rapidement",
          bullets: ["Technique exclusive révélée", "Résultats en 30 jours", "Support inclus"],
          price: "197€"
        },
        pdf_structure: {
          title: `Guide Complet ${keyword}`,
          chapters: [
            {
              title: "Introduction au Succès",
              objective: "Comprendre les fondamentaux",
              content_outline: "Histoire, principes de base, préparation mentale",
              word_count: 800,
              key_points: ["Mindset gagnant", "Erreurs courantes", "Plan d'action"],
              exercises: [
                {
                  title: "Auto-évaluation",
                  description: "Évaluez votre niveau actuel",
                  duration: "15 minutes"
                }
              ]
            }
          ]
        }
      },
      4: {
        bonuses: [
          {
            id: "bonus_1",
            title: `Checklist ${keyword} Express`,
            format: "pdf",
            value_proposition: "Gagnez du temps avec cette checklist",
            description: "Liste complète des actions à réaliser quotidiennement",
            deliverable: "PDF de 10 pages avec checklist interactive",
            connection_to_main: "Complément parfait au guide principal"
          }
        ],
        order_bump: {
          title: "Formation Vidéo Bonus",
          price: "47€",
          description: "3 heures de formation vidéo exclusive"
        }
      },
      5: {
        pricing_strategy: {
          main_price: "197€",
          justification: "Prix optimal basé sur la valeur fournie",
          value_stack: [
            "Guide principal (497€)",
            "Bonus checklist (97€)", 
            "Support email (197€)"
          ],
          total_value: "791€",
          savings: "594€"
        },
        scarcity_elements: [
          "Seulement 100 copies disponibles",
          "Offre limitée 72h"
        ],
        guarantee: {
          duration: "30 jours",
          copy: "Satisfait ou 100% remboursé, sans question"
        },
        upsells: [
          {
            title: "Coaching Personnel",
            price: "497€",
            description: "3 sessions de coaching individuel"
          }
        ]
      },
      6: {
        facebook_ads: [
          {
            primary_text: `🚨 RÉVÉLATION: La méthode ${keyword} que tout le monde cache...`,
            headline: `Secret ${keyword} Dévoilé`,
            description: "Découvrez avant que ce soit interdit",
            visual_suggestion: "Image mystérieuse avec texte accrocheur"
          }
        ],
        email_sequence: [
          {
            email_number: 1,
            subject: `Le secret ${keyword} qui change tout...`,
            type: "pré-lancement",
            body: `Bonjour,\n\nJe vais vous révéler quelque chose d'extraordinaire sur ${keyword}...\n\nC'est une méthode que j'ai découverte par hasard et qui a révolutionné ma compréhension du domaine.\n\nÀ demain pour la suite,`,
            cta: "Cliquez ici pour en savoir plus"
          }
        ],
        video_scripts: [
          {
            platform: "TikTok/YouTube Shorts",
            duration: "30 secondes",
            script: `SCÈNE 1: "Personne ne parle de ça..."\nSCÈNE 2: "Voici le vrai secret ${keyword}"\nSCÈNE 3: "Les résultats sont incroyables"\nSCÈNE 4: "Lien en bio pour tout savoir"`,
            scenes: ["Hook mystérieux", "Révélation", "Preuve sociale", "Call-to-action"]
          }
        ],
        landing_page_copy: {
          sections: [
            {
              section: "Hero",
              copy: `Découvrez la méthode ${keyword} qui a changé la vie de milliers de personnes`
            }
          ]
        }
      }
    };
    
    const result = mockResponses[bloc as keyof typeof mockResponses] || { error: "Bloc non trouvé" };
    
    console.log(`=== Bloc ${bloc} completed successfully ===`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: result,
      metadata: {
        bloc: bloc,
        keyword: keyword,
        generated_at: new Date().toISOString(),
        mode: "mock_test"
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('=== Pipeline Error ===', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});