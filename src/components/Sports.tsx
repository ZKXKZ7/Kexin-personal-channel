import OverseasGymSearch from './OverseasGymSearch';
import { PlaceSearch } from './PlaceSearch';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { loadAMap, searchCity, convertLegacyPositions } from '../lib/amap';
import type { AMapInstance, AMapMarker, Position } from '../lib/amap';
import { GalleryFigure } from './GalleryFigure';
import { lifeInterestTrips } from '../data/content';

const ClimbingGlobe = lazy(() => import('./ClimbingGlobe'));

type City = { name: string; lat: number; lng: number; address?: string; placeId?: string; coordinateSystem?: 'gcj02'; global?: boolean };
type Gym = City & { id: string; city: string; note: string; visits?: string[]; cityCenter?: { lng: number; lat: number } };
const cities: City[] = [
  { name: '北京市', lat: 39.9042, lng: 116.4074 }, { name: '上海市', lat: 31.2304, lng: 121.4737 },
  { name: '深圳市', lat: 22.5431, lng: 114.0579 }, { name: '广州市', lat: 23.1291, lng: 113.2644 },
  { name: '成都市', lat: 30.5728, lng: 104.0668 }, { name: '杭州市', lat: 30.2741, lng: 120.1551 },
  { name: '武汉市', lat: 30.5928, lng: 114.3055 }, { name: '西安市', lat: 34.3416, lng: 108.9398 },
];
const key = 'kexin-climbing-gyms-v1';
function visitCount(gym: Gym) {
  return 1 + (Array.isArray(gym.visits) ? gym.visits.length : 0);
}

function footprintIcon(count: number, label: string) {
  const size = count ? Math.min(26, 13 + Math.sqrt(count) * 3) : 12;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `atlas-dot ${count ? 'atlas-dot-lit' : ''}`;
  button.style.width = `${size}px`;
  button.style.height = `${size}px`;
  button.setAttribute('aria-label', label);
  button.title = label;
  return button;
}

function readGyms(): Gym[] {
  try { const data: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(data) ? data.filter((g): g is Gym => g && typeof g.id === 'string' && typeof g.city === 'string' && typeof g.name === 'string' && typeof g.note === 'string' && Number.isFinite(g.lat) && Number.isFinite(g.lng)) : [];
  } catch { return []; }
}
export function Sports({ route }: { route: string }) {
  const part = route.split('/')[2];
  const photos = lifeInterestTrips.find(t => t.id === 'sports')!.photos;
  if (part === 'climbing') return <Climbing />;
  if (part === 'dance') return <div className="mx-auto max-w-5xl px-6 py-12"><a href="#/life-log/sports" className="text-sky-300">← Sports</a><p className="mt-12 text-sm tracking-[.3em] text-sky-300">MOVE TO YOUR OWN RHYTHM</p><h1 className="mb-10 mt-4 text-5xl font-bold">街舞 / Dance</h1><GalleryFigure ph={photos[1]} /></div>;
  return <div className="mx-auto max-w-7xl px-6 py-12"><a href="#/life-log" className="text-sky-300">← Life Log</a><p className="mt-12 text-sm tracking-[.3em] text-sky-300">MOVEMENT & EXPLORATION</p><h1 className="mt-4 text-6xl font-bold">Sports</h1><p className="mt-5 text-slate-400">向上探索，自由律动。</p><div className="mt-12 grid gap-6 md:grid-cols-2">{[{ slug: 'climbing', title: '攀岩', en: 'The climbing atlas', text: '在地图上，收藏每一次向上的旅程。', glyph: '↗' }, { slug: 'dance', title: '街舞', en: 'Find your rhythm', text: '用身体表达，记录每一个节拍。', glyph: '〰' }].map((item, i) => <a key={item.slug} href={`#/life-log/sports/${item.slug}`} className={`group flex min-h-80 flex-col justify-between rounded-3xl border border-white/10 p-9 transition hover:-translate-y-1 hover:border-sky-300/50 ${i ? 'bg-gradient-to-br from-indigo-950 to-slate-950' : 'bg-gradient-to-br from-teal-950 to-slate-950'}`}><span className="text-6xl text-emerald-200">{item.glyph}</span><div><p className="text-xs uppercase tracking-[.25em] text-slate-400">{item.en}</p><h2 className="mt-3 text-3xl font-semibold">{item.title} <span className="float-right text-sky-300">↗</span></h2><p className="mt-4 text-sm text-slate-400">{item.text}</p></div></a>)}</div></div>;
}
function Climbing() {
  const [gyms, setGyms] = useState(readGyms);
  const [city, setCity] = useState<City | null>(null);
  const [point, setPoint] = useState<City | null>(null);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [globalEntry, setGlobalEntry] = useState(false);
  const [coordinates, setCoordinates] = useState('');
  const [overseasQuery, setOverseasQuery] = useState('');
  const [gymCoordinates, setGymCoordinates] = useState('');
  const [focus, setFocus] = useState<City | null>(null);
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');
  const [mapError, setMapError] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [mapAttempt, setMapAttempt] = useState(0);
  const [cityLoading, setCityLoading] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<AMapInstance | null>(null);
  const currentCity = useRef(city); currentCity.current = city;
  const allCities = [...cities, ...gyms.filter(g => !cities.some(c => c.name === g.city)).map(g => ({ name: g.city, lat: g.lat, lng: g.lng, coordinateSystem: g.coordinateSystem, global: g.global, ...g.cityCenter }))].filter((c, i, arr) => arr.findIndex(x => x.name === c.name) === i);
  const useAMap = Boolean(city && !city.global);
  const visibleGyms = gyms.filter(g => g.city === city?.name);
  const pins = city
    ? visibleGyms.map(g => ({ ...g, visits: visitCount(g), select: () => setFocus({ ...g }) }))
    : allCities.flatMap(c => {
        const visits = gyms.filter(g => g.city === c.name).reduce((sum, g) => sum + visitCount(g), 0);
        return visits ? [{ ...c, id: c.name, visits, select: () => setCity(c) }] : [];
      });
  useEffect(() => {
    if (!useAMap) return;
    let cancelled = false;
    let instance: AMapInstance | undefined;
    setMapError('');
    setMapReady(false);
    loadAMap().then(amap => {
      if (cancelled || !container.current) return;
      instance = new amap.Map(container.current, {
        center: [108, 35.5], zoom: 4, zooms: [3, 19], viewMode: '2D',
        mapStyle: 'amap://styles/darkblue', resizeEnable: true,
      });
      map.current = instance;
      instance.addControl(new amap.Scale());
      instance.addControl(new amap.ToolBar({ position: 'RB' }));
      instance.on('click', event => {
        if (currentCity.current) setPoint({ name: '', lat: event.lnglat.getLat(), lng: event.lnglat.getLng(), coordinateSystem: 'gcj02' });
      });
      setMapReady(true);
    }).catch(error => { if (!cancelled) setMapError(error.message); });
    return () => { cancelled = true; instance?.destroy(); map.current = null; };
  }, [mapAttempt, useAMap]);

  useEffect(() => {
    if (!mapReady || !useAMap) return;
    map.current?.setZoomAndCenter(city ? 11 : 4, city ? [city.lng, city.lat] : [108, 35.5]);
  }, [city, mapReady, useAMap]);

  useEffect(() => {
    setPoint(null); setName(''); setNote(''); setFocus(null); setGymCoordinates(''); setOverseasQuery(''); setError('');
  }, [city]);

  useEffect(() => {
    if (!useAMap || !mapReady || !map.current) return;
    let cancelled = false;
    const markers: AMapMarker[] = [];
    const visiblePoints = city ? gyms.filter(g => g.city === city.name) : allCities;
    async function drawMarkers() {
      const amap = await loadAMap();
      const legacy = visiblePoints.filter(item => item.coordinateSystem !== 'gcj02');
      const converted = await convertLegacyPositions(legacy.map(item => [item.lng, item.lat]));
      if (cancelled || !map.current) return;
      visiblePoints.forEach(item => {
        const position: Position = item.coordinateSystem === 'gcj02'
          ? [item.lng, item.lat] : converted[legacy.indexOf(item)];
        const gym = city ? item as Gym : undefined;
        const count = gym ? visitCount(gym) : gyms.filter(g => g.city === item.name).reduce((sum, g) => sum + visitCount(g), 0);
        const label = `${item.name} · ${count} 次到访`;
        const button = footprintIcon(count, label);
        const select = () => {
          if (gym) { setError(''); map.current?.setZoomAndCenter(16, position); }
          else setCity({ ...item, lng: position[0], lat: position[1], coordinateSystem: 'gcj02' });
        };
        button.addEventListener('click', select);
        const marker = new amap.Marker({ map: map.current, position, content: button, anchor: 'center', bubble: false, title: label });
        markers.push(marker);
      });
      if (point) {
        const button = footprintIcon(1, '待保存的位置');
        button.style.background = '#fbbf24'; button.style.borderColor = '#fde68a';
        markers.push(new amap.Marker({ map: map.current, position: [point.lng, point.lat], content: button, anchor: 'center', bubble: false }));
      }
    }
    drawMarkers().catch(error => { if (!cancelled) setError(error.message); });
    return () => { cancelled = true; markers.forEach(marker => marker.setMap(null)); };
  }, [city, gyms, point, mapReady, useAMap]);

  function parseCoordinates(value: string) {
    const parts = value.trim().split(/[,，\s]+/);
    const [lat, lng] = parts.map(Number);
    if (parts.length !== 2 || !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      return null;
    }
    return { lat, lng };
  }

  async function openCity() {
    if (!custom.trim() || cityLoading) return;
    if (globalEntry) {
      const position = parseCoordinates(coordinates);
      if (!position) { setError('请输入有效的纬度和经度，例如 35.68, 139.69。'); return; }
      const existing = allCities.find(item => item.name === custom.trim());
      setCity(existing || { name: custom.trim(), ...position, global: true });
      setCustom(''); setCoordinates('');
      return;
    }
    setCityLoading(true); setError('');
    try { setCity(await searchCity(custom.trim())); setCustom(''); }
    catch (error) { setError(error instanceof Error ? error.message : '城市查询失败'); }
    finally { setCityLoading(false); }
  }

  async function focusGym(gym: Gym) {
    if (city?.global) { setFocus({ ...gym }); return; }
    try {
      const position: Position = gym.coordinateSystem === 'gcj02' ? [gym.lng, gym.lat]
        : (await convertLegacyPositions([[gym.lng, gym.lat]]))[0];
      map.current?.setZoomAndCenter(16, position);
    } catch (error) { setError(error instanceof Error ? error.message : '定位失败'); }
  }
  function save(next: Gym[]) { try { localStorage.setItem(key, JSON.stringify(next)); setGyms(next); setError(''); return true; } catch { setError('保存失败：浏览器存储不可用，请检查存储权限。'); return false; } }
  function logVisit(gym: Gym) {
    const visits = Array.isArray(gym.visits) ? gym.visits : [];
    save(gyms.map(item => item.id === gym.id
      ? { ...item, visits: [...visits, new Date().toISOString()] }
      : item));
  }

  return <div className="px-4 py-8 sm:px-8"><div className="mx-auto max-w-[1600px]"><a href="#/life-log/sports" className="text-sm text-sky-300">← Sports</a><div className="mb-8 mt-8 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs tracking-[.35em] text-emerald-300">THE CLIMBING ATLAS</p><h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{city ? city.name : '全球攀岩足迹'}</h1></div><p className="text-sm text-slate-400"><b className="text-2xl text-emerald-200">{new Set(gyms.map(g => g.city)).size}</b> 点亮城市 <span className="mx-4">/</span><b className="text-2xl text-emerald-200">{gyms.length}</b> 岩馆足迹 <span className="mx-4">/</span><b className="text-2xl text-emerald-200">{gyms.reduce((total, gym) => total + visitCount(gym), 0)}</b> 次到访</p></div><div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#0b141b] lg:grid-cols-[1fr_320px]"><div className="relative min-w-0">{useAMap ? <><p className="pointer-events-none absolute left-14 top-3 z-10 rounded-lg bg-slate-950/85 px-3 py-2 text-xs text-emerald-100">亮点为已到访 · 点越大，到访越多</p><div ref={container} className="z-0 h-[55svh] min-h-96 lg:h-[70svh]" />{!mapReady && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/90 p-8 text-center text-sm text-slate-300">{mapError || '正在加载高德地图…'}{mapError && <button className="rounded-lg border border-emerald-300/40 px-4 py-2 text-emerald-200" onClick={() => setMapAttempt(value => value + 1)}>重新加载</button>}</div>}</> : <><Suspense fallback={<div className="grid h-[58svh] place-items-center">正在加载地图…</div>}><ClimbingGlobe city={city || undefined} pins={pins} point={point} focus={focus} onPick={position => { if (city) {
        setPoint(position);
      } else {
        setGlobalEntry(true);
        setCoordinates(`${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`);
      } }} /></Suspense>{!city && <p className="pointer-events-none absolute left-4 top-4 rounded-lg bg-slate-950/80 px-3 py-2 text-xs text-emerald-100">拖动旋转 · 点击亮点查看岩馆 · 点地球选城市位置</p>}</>}</div><aside className="p-6 lg:max-h-[70svh] lg:overflow-y-auto"><p className="text-xs tracking-[.2em] text-emerald-300">{city ? 'CITY EXPLORER' : 'YOUR FOOTPRINTS'}</p><h2 className="mt-3 text-xl font-semibold">{city ? '收藏一家岩馆' : '选择一座城市'}</h2><p className="mb-6 mt-3 text-sm leading-6 text-slate-400">{city ? (city.global ? '搜索附近岩馆，或在地图上手动选点。' : '搜索岩馆或在地图上选点。') : '添加第一家去过的岩馆，就能点亮这座城市。'}</p>{city ? <><button onClick={() => setCity(null)} className="mb-5 text-sm text-emerald-300">← 返回地球</button>{city.global ? <div className="mb-4 space-y-2">
      <OverseasGymSearch key={city.name} city={city} onSelect={gym => {
        setPoint(gym);
        setName(gym.name);
        setFocus(gym);
        setError('');
      }} />
      <label className="block text-xs text-slate-400">海外岩馆名称
        <input className="atlas-input" value={overseasQuery} onChange={e => setOverseasQuery(e.target.value)} maxLength={100} placeholder="例如：B-PUMP" />
      </label>
      <a className="inline-block text-sm text-emerald-300 underline"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${overseasQuery.trim() || 'climbing gym'} ${city.name}`)}`}
        target="_blank" rel="noreferrer">在 Google 地图搜索 ↗</a>
      <label className="block text-xs text-slate-400">岩馆坐标（纬度, 经度）
        <input className="atlas-input" value={gymCoordinates} onChange={e => setGymCoordinates(e.target.value)} placeholder="35.68, 139.69" />
      </label>
      <button type="button" className="text-sm text-emerald-300" onClick={() => {
        const position = parseCoordinates(gymCoordinates);
        if (!position) { setError('请输入有效的岩馆坐标。'); return; }
        const selected = { name: '', ...position };
        setPoint(selected); setFocus(selected); setError('');
      }}>定位坐标</button>
    </div> : <PlaceSearch key={city.name} city={city} onSelect={place => { setPoint(place); setName(place.name); setError(''); map.current?.setZoomAndCenter(16, [place.lng, place.lat]); }} />}<form onSubmit={e => { e.preventDefault(); if (!point || !name.trim()) return; if (gyms.some(g => (point.placeId && g.placeId === point.placeId) || (g.name === name.trim() && Math.abs(g.lat - point.lat) < 0.00001 && Math.abs(g.lng - point.lng) < 0.00001))) { setError('这家岩馆已经保存过了。'); return; } if (save([...gyms, { ...point, id: crypto.randomUUID(), city: city.name, global: city.global, cityCenter: city.global ? { lng: city.lng, lat: city.lat } : undefined, name: name.trim(), note: note.trim() }])) { setPoint(null); setName(''); setNote(''); } }} className="space-y-4"><p className="text-xs text-amber-200">{point ? `已选位置 ${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}` : '请选择搜索结果，或在地图上点击选点'}</p>{point?.address && <p className="text-xs leading-5 text-slate-400">{point.address}</p>}<label className="block text-sm">岩馆名称<input required maxLength={80} value={name} onChange={e => setName(e.target.value)} className="atlas-input" placeholder="例如：我的第一家岩馆" /></label><label className="block text-sm">笔记<textarea maxLength={500} value={note} onChange={e => setNote(e.target.value)} className="atlas-input" placeholder="日期、线路、难度，或当天的心情" /></label><button disabled={!point || !name.trim()} className="w-full rounded-xl bg-emerald-300 p-3 font-semibold text-slate-950 disabled:opacity-30">保存岩馆 · 点亮城市</button></form><ul className="mt-6 space-y-3">{gyms.filter(g => g.city === city.name).map(g => <li key={g.id} className="rounded-xl border border-white/10 p-3"><button className="text-left text-emerald-200" onClick={() => void focusGym(g)}>{g.name} ↗</button>
                  <p className="mt-2 text-xs text-emerald-200">{visitCount(g)} 次到访</p>
                  {Array.isArray(g.visits) && g.visits.length > 0 && (
                    <details className="mt-2 text-xs text-slate-400">
                      <summary className="cursor-pointer">查看打卡日期</summary>
                      <ul className="mt-2 space-y-1">
                        {[...g.visits].reverse().map((date, index) => (
                          <li key={index}>{new Date(date).toLocaleString('zh-CN')}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <button type="button" className="mt-3 block rounded-lg border border-emerald-300/30 px-3 py-2 text-xs text-emerald-200 hover:bg-emerald-300/10" onClick={() => logVisit(g)}>记录本次到访</button>{g.address && <p className="mt-2 text-xs text-slate-400">{g.address}</p>}<p className="mt-2 whitespace-pre-wrap break-words text-xs text-slate-400">{g.note}</p><button className="mt-3 text-xs text-slate-500" onClick={() => { if (window.confirm(`删除「${g.name}」的记录？`)) save(gyms.filter(x => x.id !== g.id)); }}>删除记录</button></li>)}</ul></> : <><div className="grid grid-cols-2 gap-2">{allCities.map(c => <button key={c.name} onClick={() => setCity(c)} className={`rounded-xl border p-3 text-sm ${gyms.some(g => g.city === c.name) ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200' : 'border-white/10 text-slate-400'}`}>{c.name}</button>)}</div><form className="mt-6 space-y-2" onSubmit={e => { e.preventDefault(); void openCity(); }}>
    <label className="flex gap-2 text-sm text-slate-300"><input type="checkbox" checked={globalEntry} onChange={e => setGlobalEntry(e.target.checked)} /> 用坐标添加全球城市</label><label className="text-xs text-slate-400">{globalEntry ? '城市名称（可附国家）' : '查找中国城市'}<input className="atlas-input" required value={custom} onChange={e => setCustom(e.target.value)} placeholder={globalEntry ? '例如：东京，日本' : '输入城市名称'} maxLength={80} /></label>{globalEntry && <><a className="block text-sm text-emerald-300 underline" href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">在 OpenStreetMap 查找城市</a><label className="block text-xs text-slate-400">城市坐标（纬度, 经度）<input className="atlas-input" required value={coordinates} onChange={e => setCoordinates(e.target.value)} placeholder="35.68, 139.69" /></label></>}<button className="mt-3 text-sm text-emerald-300" disabled={cityLoading || !custom.trim()}>{cityLoading ? '查找中…' : '进入城市 →'}</button></form></>}{error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}<p className="mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-slate-500">记录保存在当前浏览器，不会自动同步到其他设备。清除浏览器数据会移除记录。</p></aside></div></div></div>;
}
