import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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

async function callOpenAI(prompt: string, keyword: string, context?: any) {
  const fullPrompt = prompt.replace(/\[MOT-CLÉ\]/g, keyword).replace(/\[HOOK_ID\]/g, context?.selectedHook?.id || '');
  
  let systemMessage = "Tu es un expert marketing et copywriter. Réponds UNIQUEMENT en JSON valide selon le format demandé.";
  let userMessage = fullPrompt;
  
  if (context) {
    userMessage += `\n\nContexte précédent: ${JSON.stringify(context)}`;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse as JSON, if it fails return as text
    try {
      return JSON.parse(content);
    } catch {
      return { raw_content: content };
    }
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
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
    const result = await callOpenAI(prompt, keyword, context);
    
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