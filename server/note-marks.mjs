import lines from '../src/data/growth-note.json';
const empty = '0'.repeat(lines.flat().join('').length);
const origin = 'https://zkxkz7.github.io';
const headers = {
  'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Cache-Control': 'no-store',
};
const reply = (value, status = 200) => Response.json(value, { headers, status });

export class NoteMarks {
  constructor(ctx) {
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS pens (id INTEGER PRIMARY KEY, owner TEXT UNIQUE, bits TEXT NOT NULL)');
  }
  async fetch(request) {
    if (request.method === 'PUT') {
      const token = request.headers.get('Authorization')?.match(/^Bearer ([0-9a-f-]{36})$/)?.[1];
      if (!token) return reply({}, 401);
      const raw = await request.text();
      if (raw.length > 256) return reply({}, 413);
      let op;
      try { op = JSON.parse(raw); } catch { return reply({}, 400); }
      const { start, end, erase } = op ?? {};
      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > empty.length ||
          end <= start || typeof erase !== 'boolean') return reply({}, 400);
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
      const owner = Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2, '0')).join('');
      // All SQL between this read and write executes synchronously inside the note's Durable Object.
      const row = this.sql.exec('SELECT bits FROM pens WHERE owner = ?', owner).toArray()[0];
      if (row || !erase) {
        const bits = row?.bits ?? empty;
        const next = bits.slice(0, start) + (erase ? '0' : '1').repeat(end - start) + bits.slice(end);
        this.sql.exec('INSERT INTO pens(owner,bits) VALUES(?,?) ON CONFLICT(owner) DO UPDATE SET bits=excluded.bits', owner, next);
      }
    }
    // Merge identical inks so the public payload stays bounded as the readership grows.
    const layers = new Map();
    for (const { id, bits } of this.sql.exec("SELECT id,bits FROM pens WHERE instr(bits,'1') > 0")) {
      const ink = (id - 1) % 24;
      const previous = layers.get(ink);
      layers.set(ink, previous ? Array.from(bits, (b, i) => b === '1' ? b : previous[i]).join('') : bits);
    }
    return reply(Array.from(layers, ([ink,bits]) => ({ ink,bits })));
  }
}

export default {
  fetch(request, env) {
    if (new URL(request.url).pathname !== '/growth/v1') return reply({}, 404);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (!['GET','PUT'].includes(request.method)) return reply({}, 405);
    if (request.method === 'PUT' && request.headers.get('Origin') !== origin) return reply({}, 403);
    return env.NOTES.get(env.NOTES.idFromName('growth-v1')).fetch(request);
  },
};
