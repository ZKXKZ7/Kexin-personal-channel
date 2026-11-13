// Bind a dedicated D1 database as DB and apply shared-climbing.sql before deployment.
export default {
  async fetch(request, { DB }) {
    const origin = 'https://zkxkz7.github.io';
    const headers = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Cache-Control': 'no-store',
    };
    const reply = (data, status = 200) => Response.json(data, { status, headers });
    if (new URL(request.url).pathname !== '/footprints') return reply({}, 404);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method === 'GET') {
      const { results } = await DB.prepare('SELECT id, name, avatar, gyms FROM members ORDER BY name, id').all();
      return reply(results.map(row => ({ ...row, gyms: JSON.parse(row.gyms) })));
    }
    if (request.method !== 'PUT') return reply({}, 405);
    if (request.headers.get('Origin') !== origin) return reply({}, 403);
    const token = request.headers.get('Authorization')?.match(/^Bearer ([a-f0-9-]{36})$/)?.[1];
    if (!token) return reply({}, 401);
    const raw = await request.text();
    if (raw.length > 100_000) return reply({}, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return reply({}, 400); }
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    if (!name || name.length > 32 || !Array.isArray(body.gyms) || body.gyms.length > 200) return reply({}, 400);
    const avatar = ['🧗', '⛰️', '🦊', '🐈', '🐼', '🌙'].includes(body.avatar) ? body.avatar : '🧗';
    const gyms = [];
    for (const gym of body.gyms) {
      if (!gym || !['id','name','city'].every(key => typeof gym[key] === 'string' && gym[key].trim() && gym[key].length <= 100)
        || !Number.isFinite(gym.lat) || Math.abs(gym.lat) > 90 || !Number.isFinite(gym.lng) || Math.abs(gym.lng) > 180) return reply({}, 400);
      gyms.push({
        id: gym.id, name: gym.name, city: gym.city, lat: gym.lat, lng: gym.lng,
        global: gym.global === true, coordinateSystem: gym.coordinateSystem === 'gcj02' ? 'gcj02' : undefined,
        address: typeof gym.address === 'string' ? gym.address.slice(0, 250) : undefined,
        note: '',
        visits: Array.isArray(gym.visits) ? gym.visits.filter(date => typeof date === 'string' && Number.isFinite(Date.parse(date))).slice(0, 100) : [],
      });
    }
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    const credential = Array.from(new Uint8Array(hash), value => value.toString(16).padStart(2, '0')).join('');
    await DB.prepare(`INSERT INTO members (id, credential, name, avatar, gyms) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(credential) DO UPDATE SET name = excluded.name, avatar = excluded.avatar, gyms = excluded.gyms`)
      .bind(crypto.randomUUID(), credential, name, avatar, JSON.stringify(gyms)).run();
    const member = await DB.prepare('SELECT id FROM members WHERE credential = ?').bind(credential).first();
    return reply({ id: member.id });
  },
};
