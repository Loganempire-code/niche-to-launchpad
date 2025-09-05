import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PROMPTS = {
  bloc1: `Vous êtes un agent d'analyse marché + scraping. Sujet = [MOT-CLÉ]. Parcourez web mondial (Google, Google Trends, Amazon/marketplaces, App Stores, YouTube, TikTok, Reddit, forums niche, Facebook Ads Library, pages produit concurrentes, reviews, top articles). Récupérez et synthétisez :
1) Top 30 URLs / sources (titre + URL + 1 phrase résumé).
2) Top 20 mots-clés / requêtes liées (avec intention : info/transactionnelle/navigation) + estimation de volume relatif (high/med/low).
3) Top 10 produits concurrents (titre, prix, USP, format, reviews count, average rating).
4) Top 10 peurs/objections des prospects (phrases textuelles réelles extraites des reviews/postings).
5) Top 10 désirs / bénéfices recherchés.
6) 5 angles marketing récurrents qui performent.
7) 5 exemples d'annonces (texte + image/video description + datapoints si dispo).
8) Signaux viraux (views, shares, comments) pour 5 posts/vidéos/articles.
9) Prix d'ancrage historique (si existant) — range de 197$ à 2800$ ou autre.
10) Recommandation rapide : 3 angles idéaux à tester en priorité.
DONNEZ la sortie strictement en JSON avec les clefs suivantes :
{ "keyword": "...", "top_urls":[{"title":"","url":"","snippet":""},...], "keywords":[{"kw":"","intent":"","relative_volume":""},...], "competitors":[{"name":"","price":"","format":"","USP":"","reviews":""},...], "pain_points":["..."], "desires":["..."], "angles":["..."], "ad_examples":[{"platform":"","copy":"","creative_description":"","metrics_if_any":""},...], "virality_signals":[{"url":"","metric":"views/shares/comments","value":""},...], "pricing_anchor":{"min":"","mid":"","max":""}, "recommendations":{"top_3_angles":["..."], "quick_action":"..."}, "sources":["url1","url2",...] }
Si vous ne pouvez pas accéder au web, indiquez-le clairement et générez la meilleure synthèse à partir de vos connaissances en précisant la date de connaissance.`,

  bloc2: `Tu es un expert copywriter AGORA-style + neuromarketing. Reçois la sortie JSON du Bloc 1 (contexte). Pour le mot-clé [MOT-CLÉ], génère 5 variantes complètes de hook/storytelling.
Pour chaque variante fournis :
{ "id": "hook_1", "title": "Titre commercial court (6–10 mots)", "one_line_tagline": "sous-titre choc (1 phrase)", "origin_story": "récit court (40–90 mots) — mythe/autorité/historique", "proof_of_value": "preuve/valeur choquante (ex: j'ai payé 2800$, réservé à X)", "core_benefit": "bénéfice émotionnel (1 ligne)", "cliffhanger": "ligne qui tease ce qui est dans le doc sans le révéler", "emotional_triggers":[ "curiosity","fear_of_missing_out","status","shame" ], "recommended_thumbnail_text": "5–6 mots", "tone": "ex : dramatique / mystérieux / autoritaire", "recommended_tests":["headlineA / headlineB"] }
Règles :
- Ne pas affirmer de faits historiques impossibles à vérifier; marquer "réclamation non vérifiée" si spéculatif.
- Prioriser angles listés dans bloc1.recommendations.top_3_angles.
- Produire 3 titres alternatifs par hook.`,

  bloc3: `Tu es un head copywriter & content creator. Utilise le hook choisi (HOOK_ID) et le contexte (bloc1 json). Génère :
1) Une page de vente courte (titre, sous-titre, 3 bullets, prix d'appel).
2) Le PDF complet : sections détaillées :
- Avant-propos (150–250 mots) : histoire personnelle + preuve.
- Introduction (200–300 mots) : promesse + transformation.
- Chapitre 1 (800–1200 mots) : mythe/secret expliqué + extrait historique/fiction encadrée.
- Chapitre 2 (800–1200 mots) : explication moderne/scientifique + études/sources (si dispo).
- Chapitre 3 (1200–2000 mots) : méthode étape-par-étape (exercices journaliers, templates, scripts).
- Chapitre 4 (600–1000 mots) : cas pratiques / témoignages (3 exemples).
- Conclusion + plan d'action (200–300 mots).
3) Pour chaque chapitre, fournis :
- Objectif pédagogique
- 5 points clés (bullet)
- 2 exercices précis (avec format, durée)
- Suggestion d'image/graphique + légende
4) Génère aussi une version "copy-paste" prête à l'emploi (texte brut) pour chaque section.
Livrer en JSON :
{ "sales_header":{...}, "pdf":[{"chapter_title":"","word_count":n,"text":"...","key_points":[...],"exercises":[...],"image_suggestion":""},...] }`,

  bloc4: `En te basant sur la structure du PDF (Bloc3), génère 4 bonus complémentaires qui augmentent la valeur perçue et la conversion.
Pour chaque bonus fournis :
{ "id":"bonus1", "title":"", "format":"audio/pdf/video/checklist/journal", "purpose":"quel besoin il couvre", "deliverable_description":"détail précis (durée, nombre de pages, template)", "script_or_transcript":"texte complet si audio/video (ou checklist items)", "filename_suggested":"", "cta_to_pdf":"phrase pour relier vers le produit principal" }
Propose aussi 1 order bump (prix, description) et 1 downsell (si client refuse).`,

  bloc5: `Tu es un consultant pricing & funnel. Pour le produit décrit (résumé envoyé), fournis :
1) 3 options de tarification (entry / core / premium) avec justification (valeur perçue, ancrage, prix concours).
2) Prix d'ancrage (liste de références et phrases d'ancrage ex: "valeur réelle 2400$, aujourd'hui 17$").
3) Structure d'offre : order bump, upsell 1 (ex: coaching 1:1), upsell 2 (mini-cours avancé).
4) Texte exact pour le bandeau prix sur landing (headline + subline).
5) Règles scarcity et scripts (ex : "97 copies", "offre limitée à X heures") — et une version éthique (vérifiable).
6) Suggestion de garantie (days refund + copy) et conditions légales minimales (ex: pas de garanties médicales).
7) 5 idées de tests A/B (variation prix, bonus, headline).
8) Estimation KPI hypothétique (assumptions pour CVR 1%, 3%, 5% pour simulation).
Retour en JSON :
{ "pricing_tiers":[{"name":"","price":"","justification":""},...], "order_bump":{"title":"","price":""}, "upsells":[...], "scarcity_phrases":[...], "guarantee_text":"..." }`,

  bloc6: `Tu es un growth marketer. Avec le hook [HOOK_ID], le PDF (Bloc3) et l'offre (Bloc5), fournis :
1) 3 variantes d'ad copy FB/IG (primary text, headline, description) + 3 propositions de visuels (thumbnail text, image idea).
2) 3 scripts TikTok/YouTube Shorts (30–45s) + plan de scènes (5 cuts).
3) 7 emails : pré-lancement (2), lancement (2), relance (2), dernière chance (1) — objet + corps + CTA.
4) 5 captions instagram + 10 hashtags recommandés (par marché).
5) Brief créatif pour designer (dimensions, accroche, assets à fournir).
6) UTM template examples pour tracking.
7) Checklist technique pour lancer la campagne (pixel, conversion API, landing speed, checkout).
Retour formats : JSON + dossiers texte pour chaque asset.`
};

// Mock data for each bloc when OpenAI is not available
const MOCK_DATA = {
  bloc1: {
    "keyword": "crypto",
    "top_urls": [
      {"title": "Top Crypto Trading Platform", "url": "https://example.com/crypto1", "snippet": "Leading platform for crypto trading"},
      {"title": "Crypto Investment Guide", "url": "https://example.com/crypto2", "snippet": "Complete guide to crypto investing"}
    ],
    "keywords": [
      {"kw": "bitcoin trading", "intent": "transactional", "relative_volume": "high"},
      {"kw": "crypto investment", "intent": "informational", "relative_volume": "high"}
    ],
    "competitors": [
      {"name": "CryptoMax Pro", "price": "$297", "format": "PDF + Video", "USP": "Secret trading signals", "reviews": "4.8/5 (1200 reviews)"}
    ],
    "pain_points": ["Losing money on bad trades", "Don't understand technical analysis"],
    "desires": ["Make consistent profits", "Learn professional trading strategies"],
    "angles": ["Secret insider trading method", "AI-powered trading signals"],
    "ad_examples": [
      {"platform": "Facebook", "copy": "Découvrez les secrets que les pros ne veulent pas que vous sachiez", "creative_description": "Dark trading screen with green profit charts", "metrics_if_any": "CTR 3.2%"}
    ],
    "virality_signals": [
      {"url": "https://youtube.com/crypto-secret", "metric": "views", "value": "2.3M"}
    ],
    "pricing_anchor": {"min": "97", "mid": "297", "max": "997"},
    "recommendations": {
      "top_3_angles": ["Secret method", "AI trading", "Professional signals"],
      "quick_action": "Focus on the mystery/secret angle first"
    },
    "sources": ["coindesk.com", "cointelegraph.com"]
  },
  
  bloc2: [
    {
      "id": "hook_1",
      "title": "Le Secret Crypto des Millionnaires",
      "one_line_tagline": "La méthode cachée que Wall Street ne veut pas révéler",
      "origin_story": "En 2019, j'ai découvert par hasard un document confidentiel abandonné dans un café près de Goldman Sachs. Ce document révélait une stratégie crypto utilisée exclusivement par les grandes institutions.",
      "proof_of_value": "J'ai payé 15,000$ à un trader institutionnel pour ces informations",
      "core_benefit": "Générer des profits constants même dans un marché volatile",
      "cliffhanger": "Ce que vous allez découvrir va changer votre façon de voir le trading crypto pour toujours",
      "emotional_triggers": ["curiosity", "fear_of_missing_out", "status"],
      "recommended_thumbnail_text": "SECRET CRYPTO RÉVÉLÉ",
      "tone": "mystérieux",
      "recommended_tests": ["Le Secret Crypto", "Méthode Wall Street"]
    }
  ],
  
  bloc3: {
    "sales_header": {
      "title": "Le Secret Crypto des Millionnaires",
      "subtitle": "La méthode cachée que Wall Street ne veut pas révéler",
      "bullets": [
        "Découvrez la stratégie secrète des institutions",
        "Générez des profits constants en crypto",
        "Évitez les pièges des traders amateurs"
      ],
      "price": "97€"
    },
    "pdf": [
      {
        "chapter_title": "Introduction : Le Document Confidentiel",
        "word_count": 250,
        "text": "Tout a commencé par hasard dans un café de Manhattan...",
        "key_points": [
          "Découverte du document secret",
          "Validation des informations",
          "Premiers résultats"
        ],
        "exercises": [
          {"title": "Audit de votre portefeuille actuel", "format": "checklist", "duration": "15 min"}
        ],
        "image_suggestion": "Photo d'un document confidentiel sur une table de café"
      }
    ]
  },
  
  bloc4: [
    {
      "id": "bonus1",
      "title": "Calculateur de Risque Crypto",
      "format": "pdf",
      "purpose": "Calculer précisément le risque de chaque trade",
      "deliverable_description": "Template Excel + guide d'utilisation (5 pages)",
      "script_or_transcript": "Guide complet pour utiliser le calculateur...",
      "filename_suggested": "calculateur-risque-crypto.pdf",
      "cta_to_pdf": "Utilisez ce calculateur avec la méthode principale"
    }
  ],
  
  bloc5: {
    "pricing_tiers": [
      {"name": "Essentiel", "price": "67€", "justification": "Prix d'entrée accessible"},
      {"name": "Complet", "price": "97€", "justification": "Valeur optimale rapport qualité/prix"},
      {"name": "Premium", "price": "197€", "justification": "Avec bonus exclusifs"}
    ],
    "order_bump": {"title": "Guide des Altcoins Secrets", "price": "27€"},
    "upsells": [
      {"title": "Coaching 1:1", "price": "497€", "description": "Session personnalisée de 1h"}
    ],
    "scarcity_phrases": ["Seulement 100 copies disponibles", "Offre limitée 48h"],
    "guarantee_text": "Garantie satisfait ou remboursé 30 jours"
  },
  
  bloc6: {
    "ad_copy": [
      {
        "platform": "Facebook",
        "primary_text": "🚨 RÉVÉLATION : Un document confidentiel oublié dans un café révèle le secret crypto des millionnaires...",
        "headline": "Le Secret Crypto que Wall Street Cache",
        "description": "Découvrez la méthode des pros (avant qu'elle soit interdite)"
      }
    ],
    "email_sequence": [
      {
        "type": "pré-lancement",
        "subject": "Le document que j'ai trouvé va vous choquer...",
        "body": "Hier, j'ai hésité à vous envoyer ce message...",
        "cta": "Découvrir le secret"
      }
    ]
  }
};

async function callHuggingFace(prompt: string, keyword: string, context?: any, retries = 2) {
  const fullPrompt = prompt.replace(/\[MOT-CLÉ\]/g, keyword).replace(/\[HOOK_ID\]/g, context?.selectedHook?.id || '');
  
  let systemMessage = "Tu es un expert marketing et copywriter. Réponds UNIQUEMENT en JSON valide selon le format demandé.";
  let userMessage = fullPrompt;
  
  if (context) {
    userMessage += `\n\nContexte précédent: ${JSON.stringify(context)}`;
  }

  const hf = new HfInference(hfToken);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await hf.textGeneration({
        model: 'meta-llama/Llama-3.1-8B-Instruct',
        inputs: `${systemMessage}\n\nUser: ${userMessage}\n\nAssistant:`,
        parameters: {
          max_new_tokens: 4000,
          temperature: 0.7,
          do_sample: true,
        },
      });

      const content = response.generated_text.split('Assistant:')[1]?.trim() || response.generated_text;
      
      // Try to parse as JSON, if it fails return as text
      try {
        const parsed = JSON.parse(content);
        return parsed;
      } catch {
        // Try to extract JSON from the response if it's wrapped in other text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[0]);
          } catch {
            return { raw_content: content };
          }
        }
        return { raw_content: content };
      }
    } catch (error) {
      console.error(`Hugging Face API call failed (attempt ${attempt + 1}/${retries + 1}):`, error);
      if (attempt === retries) {
        // Return mock data as fallback
        const blocNumber = Object.keys(PROMPTS).findIndex(key => PROMPTS[key as keyof typeof PROMPTS] === prompt) + 1;
        const mockKey = `bloc${blocNumber}` as keyof typeof MOCK_DATA;
        console.log(`Using mock data for ${mockKey}`);
        return MOCK_DATA[mockKey] || { error: "No mock data available" };
      }
      // Wait before retry
      const waitTime = Math.pow(2, attempt) * 500;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bloc, keyword, context } = await req.json();
    
    console.log(`Generating bloc ${bloc} for keyword: ${keyword}`);
    
    if (!PROMPTS[`bloc${bloc}` as keyof typeof PROMPTS]) {
      throw new Error(`Invalid bloc: ${bloc}`);
    }

    const prompt = PROMPTS[`bloc${bloc}` as keyof typeof PROMPTS];
    const result = await callHuggingFace(prompt, keyword, context);
    
    console.log(`Generated result for bloc ${bloc}:`, result);
    
    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in generate-pipeline function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});