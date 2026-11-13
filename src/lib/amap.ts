export type Position = [number, number];
export type MapLocation = { getLng(): number; getLat(): number };
export type MapEvent = { lnglat: MapLocation };
export type AMapMarker = { setMap(map: AMapInstance | null): void; on(event: string, callback: () => void): void };
export type AMapInstance = {
  destroy(): void;
  on(event: string, callback: (event: MapEvent) => void): void;
  setZoomAndCenter(zoom: number, center: Position): void;
  addControl(control: unknown): void;
};
export type POI = { id: string; name: string; address?: string; pname?: string; cityname?: string; adname?: string; location?: MapLocation };
type SearchResult = { info?: string; poiList?: { pois: POI[] }; districtList?: { name: string; level: string; center: MapLocation }[] };
export type AMapAPI = {
  Map: new (element: HTMLElement, options: Record<string, unknown>) => AMapInstance;
  Marker: new (options: Record<string, unknown>) => AMapMarker;
  Scale: new () => unknown;
  ToolBar: new (options: Record<string, unknown>) => unknown;
  PlaceSearch: new (options: Record<string, unknown>) => { search(query: string, callback: (status: string, result: SearchResult) => void): void };
  DistrictSearch: new (options: Record<string, unknown>) => { search(query: string, callback: (status: string, result: SearchResult) => void): void };
  convertFrom(points: Position[], type: string, callback: (status: string, result: { locations?: MapLocation[] }) => void): void;
};
declare global {
  interface Window { AMap?: AMapAPI; _AMapSecurityConfig?: { serviceHost: string } }
}
let loading: Promise<AMapAPI> | undefined;

export function loadAMap(): Promise<AMapAPI> {
  if (window.AMap) return Promise.resolve(window.AMap);
  if (loading) return loading;
  const key = import.meta.env.VITE_AMAP_KEY;
  const proxy = import.meta.env.VITE_AMAP_SERVICE_HOST;
  if (!key || !proxy) return Promise.reject(new Error('高德地图服务尚未配置完成。'));
  window._AMapSecurityConfig = { serviceHost: proxy };
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => fail(), 20000);
    function fail() {
      window.clearTimeout(timeout);
      script.remove();
      loading = undefined;
      reject(new Error('高德地图加载失败，请检查网络后重试。'));
    }
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}&plugin=AMap.PlaceSearch,AMap.DistrictSearch,AMap.Scale,AMap.ToolBar`;
    script.onerror = fail;
    script.onload = () => {
      if (!window.AMap) return fail();
      window.clearTimeout(timeout);
      resolve(window.AMap);
    };
    document.head.appendChild(script);
  });
  return loading;
}

function requestService<T>(start: (resolve: (result: T) => void, reject: (error: Error) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('高德服务响应超时，请重试。')), 12000);
    start(result => { window.clearTimeout(timeout); resolve(result); }, error => { window.clearTimeout(timeout); reject(error); });
  });
}

export async function searchPlaces(city: string, query: string): Promise<POI[]> {
  const amap = await loadAMap();
  return requestService((resolve, reject) => {
    new amap.PlaceSearch({ city, citylimit: true, pageSize: 20, extensions: 'base' }).search(query, (status, result) => {
      if (status === 'no_data') return resolve([]);
      if (status !== 'complete') return reject(new Error(`高德地点搜索失败（${result.info || status}），请稍后重试。`));
      resolve((result.poiList?.pois || []).filter(poi => poi.location));
    });
  });
}

export async function searchCity(query: string) {
  const amap = await loadAMap();
  return requestService<{ name: string; lat: number; lng: number; coordinateSystem: 'gcj02' }>((resolve, reject) => {
    new amap.DistrictSearch({ level: 'city', subdistrict: 0, extensions: 'base' }).search(query, (status, result) => {
      const district = result.districtList?.find(item => item.name === query || item.name === `${query}市`) || result.districtList?.[0];
      if (status !== 'complete' || !district?.center) return reject(new Error('未找到该城市，请输入完整城市名称。'));
      resolve({ name: district.name, lat: district.center.getLat(), lng: district.center.getLng(), coordinateSystem: 'gcj02' });
    });
  });
}

export async function convertLegacyPositions(points: Position[]): Promise<Position[]> {
  if (!points.length) return [];
  const amap = await loadAMap();
  return requestService((resolve, reject) => {
    amap.convertFrom(points, 'gps', (status, result) => {
      if (status !== 'complete' || result.locations?.length !== points.length) return reject(new Error('旧记录的地图坐标转换失败，请重试。'));
      resolve(result.locations.map(location => [location.getLng(), location.getLat()]));
    });
  });
}
