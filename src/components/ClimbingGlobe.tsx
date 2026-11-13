import { useEffect, useRef, useState } from 'react';
import { Map, Marker, NavigationControl } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export type GlobePoint = { name: string; lng: number; lat: number };
type Pin = GlobePoint & { id: string; visits: number; select: () => void };
type Props = {
  city?: GlobePoint;
  point?: GlobePoint | null;
  pins: Pin[];
  onPick: (point: GlobePoint) => void;
  focus?: GlobePoint | null;
};

const globeStyle: StyleSpecification = {
  version: 8,
  projection: { type: 'globe' },
  sky: { 'atmosphere-blend': 0.8, 'sky-color': '#101e3a', 'horizon-color': '#406b96' },
  sources: {
    land: { type: 'geojson', data: import.meta.env.BASE_URL + 'maps/land.geojson', attribution: 'Natural Earth' },
  },
  layers: [
    { id: 'ocean', type: 'background', paint: { 'background-color': '#102745' } },
    { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': '#294857' } },
    { id: 'coast', type: 'line', source: 'land', paint: { 'line-color': '#507582', 'line-width': 0.65 } },
  ],
};

export default function ClimbingGlobe({ city, point, pins, onPick, focus }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const pick = useRef(onPick);
  pick.current = onPick;
  const [failed, setFailed] = useState(false);
  const lng = city?.lng;
  const lat = city?.lat;
  useEffect(() => {
    if (!container.current) return;
    let instance: Map;
    try {
      instance = new Map({
        container: container.current,
        style: lng === undefined ? globeStyle : 'https://tiles.openfreemap.org/styles/liberty',
        center: lng !== undefined && lat !== undefined ? [lng, lat] : [105, 25],
        zoom: lng === undefined ? 0.5 : 11,
        cooperativeGestures: true,
        renderWorldCopies: false,
      });
    } catch {
      setFailed(true);
      return;
    }
    map.current = instance;
    instance.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');
    instance.on('click', ({ lngLat }) => {
      const position = lngLat.wrap();
      pick.current({ name: '', lat: position.lat, lng: position.lng });
    });
    return () => {
      instance.remove();
      map.current = null;
    };
  }, [lng, lat]);

  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const markers = pins.map(pin => {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'atlas-globe-pin';
      element.textContent = pin.name;
      element.title = `${pin.name} · ${pin.visits} 次到访`;
      element.onclick = event => { event.stopPropagation(); pin.select(); };
      return new Marker({ element }).setLngLat([pin.lng, pin.lat]).addTo(instance);
    });
    if (point) {
      const element = document.createElement('span');
      element.className = 'atlas-globe-draft';
      markers.push(new Marker({ element }).setLngLat([point.lng, point.lat]).addTo(instance));
    }
    return () => markers.forEach(marker => marker.remove());
  }, [pins, point, lng, lat]);

  useEffect(() => {
    if (focus) map.current?.easeTo({ center: [focus.lng, focus.lat], zoom: 15 });
  }, [focus]);

  return <div className="relative h-[58svh] min-h-80 lg:h-[70svh]">
    <div ref={container} className="h-full w-full" aria-label={city ? '城市地图' : '可旋转的全球攀岩地球'} />
    {failed && <p role="status" className="absolute inset-0 grid place-items-center bg-slate-950 p-6 text-center">
      当前浏览器无法绘制地图。仍可在侧栏按坐标记录岩馆。
    </p>}
  </div>;
}
