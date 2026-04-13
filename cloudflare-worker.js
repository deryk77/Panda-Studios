/**
 * Panda Studios — Brand Audit API Proxy
 * ──────────────────────────────────────
 * Deploy this file as a Cloudflare Worker (see README below).
 * Your Anthropic API key is stored as a Worker Secret — never in code.
 *
 * HOW TO DEPLOY (5 minutes, no CLI needed):
 *
 *  1. Go to https://dash.cloudflare.com → Workers & Pages → Create
 *  2. Choose "Create Worker", give it a name e.g. "panda-audit"
 *  3. Click "Edit code", paste the entire contents of this file, Save & Deploy
 *  4. Go to Settings → Variables → "Add variable" (as SECRET):
 *       Name:  ANTHROPIC_API_KEY
 *       Value: sk-ant-api03-... (your real key — paste it here, never in code)
 *  5. Copy your Worker URL, e.g. https://panda-audit.YOUR_NAME.workers.dev
 *  6. Paste that URL into brand-audit.html where it says WORKER_URL_HERE
 *
 * ORIGIN RESTRICTION:
 *  Only requests from pandastudios.co are forwarded. All other origins get 403.
 */

const ALLOWED_ORIGINS = [
  'https://www.pandastudios.co',
  'https://pandastudios.co',
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowed ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Block any origin that isn't pandastudios.co
    if (!allowed) {
      return new Response('Forbidden', { status: 403 });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Bad Request', { status: 400 });
    }

    // Forward to Anthropic — key stays server-side
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const responseText = await upstream.text();
    return new Response(responseText, {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  },
};
