import type { FeatureCollection, Polygon } from 'geojson';

const day = 86_400_000;
const radians = Math.PI / 180;

export function nightHemisphere(now: Date): FeatureCollection<Polygon> {
  const year = now.getUTCFullYear();
  const start = Date.UTC(year, 0, 1);
  const days = (Date.UTC(year + 1, 0, 1) - start) / day;
  const angle = 2 * Math.PI * ((now.getTime() - start) / day - 0.5) / days;
  // NOAA General Solar Position Calculations.
  const equationOfTime = 229.18 * (
    0.000075 + 0.001868 * Math.cos(angle) - 0.032077 * Math.sin(angle)
    - 0.014615 * Math.cos(2 * angle) - 0.040849 * Math.sin(2 * angle)
  );
  const declination = 0.006918 - 0.399912 * Math.cos(angle) + 0.070257 * Math.sin(angle)
    - 0.006758 * Math.cos(2 * angle) + 0.000907 * Math.sin(2 * angle)
    - 0.002697 * Math.cos(3 * angle) + 0.00148 * Math.sin(3 * angle);
  const utcMinutes = (now.getTime() % day) / 60_000;
  const solarLongitude = 180 - (utcMinutes + equationOfTime) / 4;
  const darkPole = declination >= 0 ? -90 : 90;
  const slope = Math.tan(declination) || Number.EPSILON;

  return {
    type: 'FeatureCollection',
    features: Array.from({ length: 4 }, (_, index) => {
      const west = -180 + index * 90;
      const east = west + 90;
      const edge = Array.from({ length: 181 }, (_, step) => {
        const longitude = west + step / 2;
        const latitude = Math.atan(-Math.cos((longitude - solarLongitude) * radians) / slope) / radians;
        return [longitude, latitude];
      });
      const ring = [[west, darkPole], [east, darkPole], ...edge.reverse(), [west, darkPole]];
      return {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [darkPole < 0 ? ring : ring.reverse()] },
      };
    }),
  };
}
