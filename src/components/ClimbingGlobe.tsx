import { useEffect, useRef, useState } from 'react';
import { Map, Marker, NavigationControl } from 'maplibre-gl';
import { nightHemisphere } from '../lib/daylight';
import type { GeoJSONSource, StyleSpecification } from 'maplibre-gl';
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
  sky: { 'atmosphere-blend': 0.32, 'sky-color': '#101e3a', 'horizon-color': '#406b96' },
  sources: {
    night: { type: 'geojson', data: { type: 'FeatureCollection', features: [] }, tolerance: 0 },
    land: { type: 'geojson', data: import.meta.env.BASE_URL + 'maps/land.geojson', attribution: 'Natural Earth' },
  },
  layers: [
    { id: 'ocean', type: 'background', paint: { 'background-color': '#195080' } },
    { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': '#527970' } },
    { id: 'coast', type: 'line', source: 'land', paint: { 'line-color': '#86aaa0', 'line-width': 0.65 } },
    { id: 'night', type: 'fill', source: 'night', paint: { 'fill-color': '#040d22', 'fill-opacity': 0.56, 'fill-antialias': false } },
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
        zoom: lng === undefined ? Math.log2(Math.min(container.current.clientWidth, container.current.clientHeight) / 235) + 0.7 : 11,
        cooperativeGestures: true,
        renderWorldCopies: false,
      });
    } catch {
      setFailed(true);
      return;
    }
    map.current = instance;
    const updateDaylight = () => {
      instance.getSource<GeoJSONSource>('night')?.setData(nightHemisphere(new Date()));
    };
    const daylightTimer = lng === undefined ? window.setInterval(updateDaylight, 30_000) : undefined;
    if (lng === undefined) instance.once('load', updateDaylight);
    instance.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');
    instance.on('click', ({ lngLat }) => {
      const position = lngLat.wrap();
      pick.current({ name: '', lat: position.lat, lng: position.lng });
    });
    return () => {
      window.clearInterval(daylightTimer);
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
