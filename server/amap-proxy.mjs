// Cloudflare Worker. Store AMAP_SECURITY_CODE as a secret in the host dashboard.
const allowedPaths = /^\/(?:v3\/(?:place\/(?:text|around|detail)|assistant\/inputtips|config\/district|assistant\/coordinate\/convert)|v4\/map\/styles)$/;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const referer = request.headers.get('Referer');
    const permitted = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim());
    let requestingOrigin = origin;
    if (!requestingOrigin && referer) {
      try { requestingOrigin = new URL(referer).origin; } catch { return new Response('Forbidden', { status: 403 }); }
    }
    if (!requestingOrigin || !permitted.includes(requestingOrigin)) return new Response('Forbidden', { status: 403 });
    const headers = { 'Access-Control-Allow-Origin': requestingOrigin, 'Vary': 'Origin', 'Cache-Control': 'no-store' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, OPTIONS' } });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers });
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/_AMapService/, '');
    if (!url.pathname.startsWith('/_AMapService/') || !allowedPaths.test(path)) return new Response('Not found', { status: 404, headers });
    if (!env.AMAP_SECURITY_CODE || !env.AMAP_KEY) return new Response('Map service not configured', { status: 503, headers });
    const upstream = new URL(path, path === '/v4/map/styles' ? 'https://webapi.amap.com' : 'https://restapi.amap.com');
    upstream.search = url.search;
    upstream.searchParams.set('key', env.AMAP_KEY);
    upstream.searchParams.set('jscode', env.AMAP_SECURITY_CODE);
    try {
      const response = await fetch(upstream, { headers: { Referer: `${requestingOrigin}/` }, signal: AbortSignal.timeout(10000) });
      return new Response(response.body, { status: response.status, headers: { ...headers, 'Content-Type': response.headers.get('Content-Type') || 'application/json' } });
    } catch { return new Response('Map service temporarily unavailable', { status: 502, headers }); }
  },
};
