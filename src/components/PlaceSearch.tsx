import { useEffect, useRef, useState } from 'react';
import { searchPlaces } from '../lib/amap';

export type Place = {
  name: string;
  lat: number;
  lng: number;
  address: string;
  placeId: string;
  coordinateSystem: 'gcj02';
};
const cache = new Map<string, Place[]>();

export function PlaceSearch({ city, onSelect }: {
  city: { name: string; lat: number; lng: number };
  onSelect: (place: Place) => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const requestId = useRef(0);
  const lastRequest = useRef(0);
  useEffect(() => () => { requestId.current += 1; }, []);

  async function search() {
    if (!query.trim() || loading) return;
    const id = ++requestId.current;
    const cacheKey = `${city.name}:${query.trim()}`;
    setResults([]);
    setMessage('');
    setLoading(true);
    try {
      let found = cache.get(cacheKey);
      if (!found) {
        if (Date.now() - lastRequest.current < 1000) {
          setMessage('请稍等一秒再搜索。');
          return;
        }
        lastRequest.current = Date.now();
        const pois = await searchPlaces(city.name, query.trim());
        found = pois.map(poi => ({
          name: poi.name, lng: poi.location!.getLng(), lat: poi.location!.getLat(),
          placeId: `amap:${poi.id}`, coordinateSystem: 'gcj02',
          address: [poi.pname, poi.cityname, poi.adname, poi.address].filter(value => typeof value === 'string').join(' '),
        }));
        cache.set(cacheKey, found);
      }
      if (id !== requestId.current) return;
      setResults(found);
      setMessage(found.length ? `找到 ${found.length} 个地点，请选择正确的分店。` : '高德未找到匹配地点，试试岩馆全名、品牌名或街道地址。');
    } catch (error) {
      if (id === requestId.current) setMessage(error instanceof Error ? error.message : '搜索失败，请重试。');
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }

  return (
    <section className="mb-6 rounded-xl border border-emerald-300/20 p-4">
      <form onSubmit={event => { event.preventDefault(); void search(); }}>
        <label className="text-sm text-emerald-200">
          搜索岩馆或地址
          <input className="atlas-input" value={query} maxLength={120}
            onChange={event => {
              requestId.current += 1;
              setLoading(false); setQuery(event.target.value); setResults([]); setMessage('');
            }} placeholder="例如：岩时、奥攀、攀岩" />
        </label>
        <button disabled={loading || !query.trim()}
          className="mt-3 w-full rounded-lg border border-emerald-300/40 px-3 py-2 text-sm text-emerald-200 disabled:opacity-40">
          {loading ? '搜索中…' : `搜索${city.name}`}
        </button>
      </form>
      <p role="status" className="mt-3 text-xs leading-5 text-slate-400">{message}</p>
      <ul className="mt-2 max-h-80 space-y-2 overflow-auto">
        {results.map(place => (
          <li key={place.placeId}>
            <button onClick={() => {
              onSelect(place); setResults([]); setMessage(`已定位到${place.name}，保存后点亮。`);
            }} className="w-full rounded-lg bg-white/5 p-3 text-left hover:bg-emerald-300/10">
              <span className="block text-sm text-slate-100">{place.name}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{place.address || '请在地图上核对位置'}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-slate-500">地点搜索由高德地图提供</p>
    </section>
  );
}
