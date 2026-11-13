import { useEffect, useRef, useState } from 'react';

type Location = { lat: number; lng: number };
type Gym = Location & { name: string; placeId: string };
type Element = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

const endpoint = 'https://overpass-api.de/api/interpreter';

export default function OverseasGymSearch({ city, onSelect }: {
  city: Location;
  onSelect: (gym: Gym) => void;
}) {
  const [results, setResults] = useState<Gym[] | null>(null);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  async function search() {
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setStatus('正在查找附近岩馆…');
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const area = '(around:25000,' + city.lat.toFixed(5) + ',' + city.lng.toFixed(5) + ')';
      const query = '[out:json][timeout:12];nwr' + area +
        '["leisure"~"^(sports_centre|fitness_centre|sports_hall)$"]["sport"~"(^|;)(climbing|bouldering)(;|$)"];out center;';
      const response = await fetch(endpoint + '?' + new URLSearchParams({ data: query }), { signal: controller.signal });
      if (!response.ok) throw new Error('Overpass unavailable');
      const data: { elements: Element[]; remark?: string } = await response.json();
      if (data.remark) throw new Error(data.remark);
      const gyms = data.elements.flatMap(item => {
        const lat = item.center?.lat ?? item.lat;
        const lng = item.center?.lon ?? item.lon;
        const name = item.tags?.name || item.tags?.['name:en'];
        if (!name || lat === undefined || lng === undefined || !Number.isFinite(lat) || !Number.isFinite(lng)) return [];
        return [{ name, lat, lng, placeId: 'osm:' + item.type + ':' + item.id }];
      });
      setResults(gyms.sort((a, b) => a.name.localeCompare(b.name)));
      setStatus('');
    } catch {
      setStatus('暂时无法查询岩馆，请稍后重试，或在地图上手动选点。');
    } finally {
      window.clearTimeout(timer);
      request.current = null;
    }
  }

  const matching = results?.filter(gym => gym.name.normalize('NFKC').toLowerCase()
    .includes(filter.trim().normalize('NFKC').toLowerCase()));

  return <div className="space-y-2 rounded-xl border border-white/10 p-3">
    <button type="button" disabled={Boolean(request.current)} onClick={() => void search()}
      className="text-sm font-semibold text-emerald-300 disabled:opacity-50">查找 25 公里内的岩馆</button>
    {status && <p role="status" className="text-xs text-slate-300">{status}</p>}
    {results && <label className="block text-xs text-slate-400">按岩馆名筛选
      <input className="atlas-input" value={filter} onChange={event => setFilter(event.target.value)} />
    </label>}
    {matching && (matching.length ? <ul className="max-h-52 space-y-1 overflow-y-auto">
      {matching.map(gym => <li key={gym.placeId}>
        <button type="button" onClick={() => onSelect(gym)}
          className="w-full rounded-lg bg-white/5 px-3 py-2 text-left text-sm hover:bg-white/10">{gym.name}</button>
      </li>)}
    </ul> : <p className="text-xs text-slate-400">没有匹配的岩馆，可以手动选点。</p>)}
    <a className="text-xs text-slate-400 underline" href="https://www.openstreetmap.org/copyright"
      target="_blank" rel="noreferrer">© OpenStreetMap 贡献者</a>
  </div>;
}
