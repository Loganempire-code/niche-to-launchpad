import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Optimized prompts for better AI responses
const PROMPTS = {
  bloc1: `Tu es un expert analyste marché. Analyse le mot-clé "[MOT-CLÉ]" et génère un rapport marketing complet.

STRUCTURE JSON REQUISE (répondre UNIQUEMENT en JSON valide) :
{
  "keyword": "[MOT-CLÉ]",
  "market_analysis": {
    "market_size": "estimation du marché",
    "trends": ["tendance 1", "tendance 2", "tendance 3"],
    "opportunities": ["opportunité 1", "opportunité 2"]
  },
  "competitors": [
    {
      "name": "nom concurrent",
      "price": "prix",
      "format": "format du produit",
      "usp": "proposition de valeur unique",
      "reviews": "4.5/5 (200 avis)"
    }
  ],
  "target_audience": {
    "demographics": "description démographique",
    "pain_points": ["douleur 1", "douleur 2", "douleur 3"],
    "desires": ["désir 1", "désir 2", "désir 3"]
  },
  "keywords": [
    {
      "keyword": "mot-clé",
      "intent": "informational/transactional/navigational",
      "volume": "high/medium/low"
    }
  ],
  "pricing_anchor": {
    "min": "97",
    "optimal": "197", 
    "premium": "497"
  },
  "top_angles": ["angle 1", "angle 2", "angle 3"]
}

Analyse approfondie pour "${keyword}" et fournis des données réalistes basées sur ton expertise.`,

  bloc2: `Tu es un copywriter expert style AGORA. Utilise le contexte de recherche marché pour créer 5 hooks émotionnels.

CONTEXTE DE RECHERCHE: {{RESEARCH_CONTEXT}}

Génère 5 hooks pour le mot-clé "[MOT-CLÉ]":

{
  "hooks": [
    {
      "id": "hook_1",
      "title": "Titre accrocheur (6-8 mots)",
      "tagline": "Sous-titre émotionnel (1 phrase)",
      "origin_story": "Histoire d'origine captivante (60-80 mots)",
      "proof_element": "Élément de preuve/autorité",
      "core_benefit": "Bénéfice principal émotionnel",
      "cliffhanger": "Phrase qui crée du suspense",
      "emotional_triggers": ["curiosity", "fear_of_missing_out", "status"],
      "tone": "dramatique/mystérieux/autoritaire"
    }
  ]
}

Utilise les pain_points et desires du contexte pour créer des hooks émotionnellement impactants.`,

  bloc3: `Tu es un expert en création de produits digitaux. Crée la structure complète du PDF en utilisant le hook sélectionné.

CONTEXTE COMPLET: {{FULL_CONTEXT}}
HOOK SÉLECTIONNÉ: {{SELECTED_HOOK}}

Génère:

{
  "sales_page": {
    "headline": "titre principal basé sur le hook",
    "subheadline": "sous-titre de conversion",
    "bullets": ["bénéfice 1", "bénéfice 2", "bénéfice 3"],
    "price": "prix basé sur l'ancrage du bloc 1"
  },
  "pdf_structure": {
    "title": "titre du PDF",
    "chapters": [
      {
        "title": "Titre du chapitre",
        "objective": "objectif pédagogique",
        "content_outline": "plan détaillé du contenu",
        "word_count": 800,
        "key_points": ["point 1", "point 2", "point 3"],
        "exercises": [
          {
            "title": "nom exercice",
            "description": "description détaillée",
            "duration": "15 minutes"
          }
        ]
      }
    ]
  }
}

Assure-toi que le contenu soit cohérent avec le hook sélectionné et les insights du bloc 1.`,

  bloc4: `Crée 4 bonus complémentaires qui augmentent la valeur perçue du produit principal.

CONTEXTE: {{FULL_CONTEXT}}

{
  "bonuses": [
    {
      "id": "bonus_1",
      "title": "Titre du bonus",
      "format": "pdf/audio/video/checklist",
      "value_proposition": "Pourquoi ce bonus est précieux",
      "description": "Description détaillée (2-3 phrases)",
      "deliverable": "Ce que reçoit exactement le client",
      "connection_to_main": "Comment il complète le produit principal"
    }
  ],
  "order_bump": {
    "title": "Titre de l'order bump",
    "price": "27€",
    "description": "Description courte et impactante"
  }
}`,

  bloc5: `Tu es un consultant pricing. Optimise la stratégie tarifaire basée sur tous les éléments précédents.

CONTEXTE COMPLET: {{FULL_CONTEXT}}

{
  "pricing_strategy": {
    "main_price": "197€",
    "justification": "Pourquoi ce prix est optimal",
    "value_stack": [
      "Produit principal (valeur €)",
      "Bonus 1 (valeur €)",
      "Bonus 2 (valeur €)"
    ],
    "total_value": "997€",
    "savings": "800€"
  },
  "scarcity_elements": [
    "Seulement 100 copies disponibles",
    "Offre limitée 48h"
  ],
  "guarantee": {
    "duration": "30 jours",
    "copy": "Texte de garantie persuasif"
  },
  "upsells": [
    {
      "title": "Upsell 1",
      "price": "97€",
      "description": "Description de l'upsell"
    }
  ]
}`,

  bloc6: `Crée tous les assets marketing pour promouvoir le produit.

CONTEXTE COMPLET: {{FULL_CONTEXT}}

{
  "facebook_ads": [
    {
      "primary_text": "Texte principal Facebook (hook émotionnel)",
      "headline": "Titre publicitaire",
      "description": "Description courte",
      "visual_suggestion": "Suggestion de visuel"
    }
  ],
  "email_sequence": [
    {
      "email_number": 1,
      "subject": "Objet de l'email",
      "type": "pré-lancement/lancement/relance",
      "body": "Corps de l'email (150-200 mots)",
      "cta": "Call-to-action"
    }
  ],
  "video_scripts": [
    {
      "platform": "TikTok/YouTube Shorts",
      "duration": "30 secondes",
      "script": "Script complet avec indications scènes",
      "scenes": ["Scène 1: ...", "Scène 2: ..."]
    }
  ],
  "landing_page_copy": {
    "sections": [
      {
        "section": "Hero",
        "copy": "Texte de la section hero"
      }
    ]
  }
}`
};

async function generateWithAI(prompt: string, keyword: string, context: any = null): Promise<any> {
  if (!hfToken) {
    throw new Error('HUGGING_FACE_ACCESS_TOKEN not configured');
  }

  const hf = new HfInference(hfToken);
  
  // Prepare the complete prompt with context
  let fullPrompt = prompt.replace(/\[MOT-CLÉ\]/g, keyword);
  
  // Inject context into prompt
  if (context) {
    fullPrompt = fullPrompt.replace('{{RESEARCH_CONTEXT}}', JSON.stringify(context.research || {}));
    fullPrompt = fullPrompt.replace('{{SELECTED_HOOK}}', JSON.stringify(context.selectedHook || {}));
    fullPrompt = fullPrompt.replace('{{FULL_CONTEXT}}', JSON.stringify(context));
  }

  const systemMessage = `Tu es un expert marketing et copywriter. Tu DOIS répondre UNIQUEMENT en JSON valide, sans texte avant ou après. Le JSON doit être parsable directement.`;
  
  try {
    console.log(`Generating content for keyword: ${keyword}`);
    console.log(`Prompt length: ${fullPrompt.length}`);
    
    const response = await hf.textGeneration({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
${systemMessage}<|eot_id|><|start_header_id|>user<|end_header_id|>
${fullPrompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
      parameters: {
        max_new_tokens: 3000,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
    });

    let content = response.generated_text;
    
    // Extract content after the assistant header
    const assistantStart = content.lastIndexOf('<|start_header_id|>assistant<|end_header_id|>');
    if (assistantStart !== -1) {
      content = content.substring(assistantStart + '<|start_header_id|>assistant<|end_header_id|>'.length).trim();
    }
    
    // Remove any trailing tokens
    content = content.replace(/<\|eot_id\|>.*$/s, '').trim();
    
    console.log(`Raw AI response: ${content.substring(0, 200)}...`);
    
    // Try to extract and parse JSON
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no JSON found, try to find it in different patterns
      const patterns = [
        /```json\s*(\{[\s\S]*?\})\s*```/,
        /```\s*(\{[\s\S]*?\})\s*```/,
        /(\{[\s\S]*\})/
      ];
      
      for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match) {
          jsonMatch = [match[1]];
          break;
        }
      }
    }
    
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed JSON response');
        return parsed;
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Content to parse:', jsonMatch[0]);
      }
    }
    
    // If JSON parsing fails, create a structured response based on the content
    console.log('Creating fallback structured response');
    return createFallbackResponse(content, keyword);
    
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error(`Erreur génération IA: ${error.message}`);
  }
}

function createFallbackResponse(content: string, keyword: string): any {
  // Create a basic structured response when JSON parsing fails
  return {
    keyword: keyword,
    content: content,
    generated: true,
    note: "Réponse générée par IA - structure adaptée automatiquement"
  };
}

async function processBlock(blockNumber: number, keyword: string, context: any): Promise<any> {
  const prompt = PROMPTS[`bloc${blockNumber}` as keyof typeof PROMPTS];
  
  if (!prompt) {
    throw new Error(`Bloc ${blockNumber} non défini`);
  }
  
  console.log(`Processing bloc ${blockNumber} for keyword: ${keyword}`);
  
  try {
    const result = await generateWithAI(prompt, keyword, context);
    console.log(`Bloc ${blockNumber} processed successfully`);
    return result;
  } catch (error) {
    console.error(`Error processing bloc ${blockNumber}:`, error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    if (!hfToken) {
      throw new Error('API Hugging Face non configurée');
    }

    const result = await processBlock(bloc, keyword.trim(), context);
    
    console.log(`=== Bloc ${bloc} completed successfully ===`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: result,
      metadata: {
        bloc: bloc,
        keyword: keyword,
        generated_at: new Date().toISOString()
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