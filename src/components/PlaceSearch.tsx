import { useEffect, useRef, useState } from 'react';
export type Place = { name: string; lat: number; lng: number; address: string; placeId: string };
type Feature = { properties?: Record<string, unknown>; geometry?: { coordinates?: number[] } };
const cache = new Map<string, Place[]>();
export function PlaceSearch({ city, onSelect }: { city: { name: string; lat: number; lng: number }; onSelect: (place: Place) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const pending = useRef<AbortController>();
  const lastRequest = useRef(0);
  useEffect(() => () => pending.current?.abort(), []);
  async function search() {
    if (!query.trim() || loading || Date.now() - lastRequest.current < 1100) return;
    const params = new URLSearchParams({ q: query.trim(), lat: String(city.lat), lon: String(city.lng), limit: '10', bbox: `${city.lng - 1.5},${city.lat - 1.2},${city.lng + 1.5},${city.lat + 1.2}` });
    const requestKey = params.toString();
    const cached = cache.get(requestKey);
    if (cached) { setResults(cached); setMessage(cached.length ? '' : '附近没有找到该地点，试试完整名称、分店名或地址，也可以手动选点。'); return; }
    lastRequest.current = Date.now();
    const controller = new AbortController(); pending.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    setLoading(true); setResults([]); setMessage('');
    try {
      const response = await fetch(`https://photon.komoot.io/api/?${params}`, { signal: controller.signal });
      if (!response.ok) throw new Error('search failed');
      const data = await response.json();
      if (!Array.isArray(data.features)) throw new Error('invalid response');
      const found: Place[] = data.features.flatMap((feature: Feature) => {
        const p = feature.properties; const coords = feature.geometry?.coordinates;
        if (!p || !coords || !Number.isFinite(coords[0]) || !Number.isFinite(coords[1]) || typeof p.name !== 'string') return [];
        return [{ name: p.name, lng: coords[0], lat: coords[1], placeId: `${p.osm_type}:${p.osm_id}`, address: [...new Set([p.country, p.state, p.city, p.district, p.street, p.housenumber].filter(v => typeof v === 'string'))].join(' · ') }];
      });
      cache.set(requestKey, found); setResults(found);
      setMessage(found.length ? '请选择正确的分店，并在地图上核对位置。' : '附近没有找到该地点，试试完整名称、分店名或地址，也可以手动选点。');
    } catch { if (pending.current === controller) setMessage('地点搜索暂时无法连接，请稍后重试，或在地图上手动选点。'); }
    finally { window.clearTimeout(timeout); if (pending.current === controller) setLoading(false); }
  }
  return <section className="mb-6 rounded-xl border border-emerald-300/20 p-4"><form onSubmit={e => { e.preventDefault(); void search(); }}><label className="text-sm text-emerald-200">搜索真实岩馆<input className="atlas-input" value={query} maxLength={120} onChange={e => { pending.current?.abort(); pending.current = undefined; setLoading(false); setQuery(e.target.value); setResults([]); setMessage(''); }} placeholder="岩馆名称、分店名或地址" /></label><button disabled={loading || !query.trim()} className="mt-3 w-full rounded-lg border border-emerald-300/40 px-3 py-2 text-sm text-emerald-200 disabled:opacity-40">{loading ? '搜索中…' : `搜索 ${city.name} 附近`}</button></form><p role="status" className="mt-3 text-xs leading-5 text-slate-400">{message}</p><ul className="mt-2 max-h-72 space-y-2 overflow-auto">{results.map(place => <li key={place.placeId}><button onClick={() => { onSelect(place); setResults([]); setMessage(`已定位：${place.name}，保存后点亮岩馆。`); }} className="w-full rounded-lg bg-white/5 p-3 text-left hover:bg-emerald-300/10"><span className="block text-sm text-slate-100">{place.name}</span><span className="mt-1 block text-xs leading-5 text-slate-400">{place.address || '未提供详细地址，请核对地图位置'}</span></button></li>)}</ul><p className="mt-3 text-[11px] text-slate-500">地点数据：<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline">© OpenStreetMap</a> / Photon。部分岩馆可能尚未收录。</p></section>;
}
