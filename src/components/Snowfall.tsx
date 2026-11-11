import { useMemo } from 'react';
import type { CSSProperties } from 'react';

type Drift = 1 | 2 | 3 | 4 | 5;

type Flake = {
  id: number;
  left: string;
  size: number;
  opacity: number;
  blur: number;
  durationSec: number;
  delaySec: number;
  drift: Drift;
};

const DRIFT_CLASS: Record<Drift, string> = {
  1: 'sf-flake--1',
  2: 'sf-flake--2',
  3: 'sf-flake--3',
  4: 'sf-flake--4',
  5: 'sf-flake--5',
};

function makeFlakes(count: number): Flake[] {
  const out: Flake[] = [];
  for (let i = 0; i < count; i++) {
    const t = i * 9301 + 49297;
    const r = (n: number) => ((t * n) % 2339) / 2339;
    out.push({
      id: i,
      left: `${(r(1) * 100).toFixed(2)}%`,
      size: 2.5 + r(2) * 4,
      opacity: 0.42 + r(3) * 0.48,
      blur: r(4) < 0.28 ? 0.4 + r(5) * 1.2 : 0,
      durationSec: 18 + r(6) * 32,
      delaySec: r(7) * -40,
      drift: ((i % 5) + 1) as Drift,
    });
  }
  return out;
}

export function Snowfall() {
  const flakes = useMemo(() => makeFlakes(64), []);

  return (
    <div className="sf-layer" aria-hidden>
      <div className="sf-layer__glow" />
      {flakes.map((f) => {
        const style: CSSProperties = {
          left: f.left,
          width: f.size,
          height: f.size,
          opacity: f.opacity,
          ['--sf-dur' as string]: `${f.durationSec}s`,
          ['--sf-delay' as string]: `${f.delaySec}s`,
        };
        if (f.blur > 0) {
          style.filter = `blur(${f.blur}px)`;
        }
        return (
          <span
            key={f.id}
            className={`sf-flake ${DRIFT_CLASS[f.drift]}`}
            style={style}
          />
        );
      })}
    </div>
  );
}
