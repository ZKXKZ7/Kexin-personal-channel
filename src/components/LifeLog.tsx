import { useMemo, useState } from 'react';
import { Music2, Footprints } from 'lucide-react';
import { getRunningContributionPattern, travelTrips } from '../data/content';
import { TravelGalleryModal } from './TravelGalleryModal';
import type { TravelTrip } from '../data/content';

const YEAR_GOAL_KM = 3000;
/** Demo YTD — replace with real data */
const YTD_KM = 1288;
const PB_5K = '16:40';

const levelBg = (n: number) => {
  if (n <= 0) return 'bg-white/12';
  if (n === 1) return 'bg-sky-500/35';
  if (n === 2) return 'bg-sky-400/55';
  return 'bg-sky-300';
};

export function LifeLog() {
  const grid = useMemo(() => getRunningContributionPattern(), []);
  const [activeTrip, setActiveTrip] = useState<TravelTrip | null>(null);
  const progress = Math.min(100, Math.round((YTD_KM / YEAR_GOAL_KM) * 100));

  return (
    <section id="life-log" className="border-b border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-12 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-sky-300">生活日志</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Life Log</h2>
          <p className="text-base leading-relaxed text-slate-400">
            节奏感来自身体与音乐的共振；路线图来自脚步与地图的重叠 🎧
          </p>
        </header>

        <div className="grid gap-10 lg:gap-12">
          {/* Music & Dance — running stats (per brief: contribution + annual volume) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/25 bg-white/5 text-sky-300">
                <Music2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Music & Dance · Running</h3>
                <p className="text-sm text-slate-400">用方格记录训练密度，用进度条对齐年度目标</p>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">年跑量目标</p>
                <p className="mt-1 text-2xl font-bold text-slate-50">
                  {YTD_KM}
                  <span className="text-base font-semibold text-slate-500"> / {YEAR_GOAL_KM} km</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <p className="text-xs text-slate-500">5km PB</p>
                <p className="font-mono text-lg font-semibold text-sky-300">{PB_5K}</p>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Footprints className="h-3.5 w-3.5 text-sky-400" strokeWidth={2} aria-hidden />
                训练热力（示意）
              </span>
              <span>少 → 多</span>
            </div>
            <div
              className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.04] p-3"
              role="img"
              aria-label="过去一年跑步训练热力图示意"
            >
              <div className="flex gap-[3px] min-w-max">
                {grid.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-[3px]">
                    {col.map((cell, ri) => (
                      <div
                        key={ri}
                        className={`h-2.5 w-2.5 rounded-[2px] sm:h-3 sm:w-3 ${levelBg(cell)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                <span>年度进度</span>
                <span className="text-sky-300">{progress}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full border border-white/10 bg-slate-950">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400 transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">提示：可将 YTD 与目标改为你的真实数据。</p>
            </div>
          </div>

          {/* Travel */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl" aria-hidden>
                ✈️
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Travel</h3>
                <p className="text-sm text-slate-400">点按每一段旅程，展开相册详情</p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {travelTrips.map((trip) => {
                const Icon = trip.icon;
                return (
                  <li key={trip.id}>
                    <button
                      type="button"
                      onClick={() => setActiveTrip(trip)}
                      className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center transition hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-white/[0.07] hover:shadow-[0_8px_28px_rgba(56,189,248,0.1)]"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/25 bg-white/5 text-sky-300 transition group-hover:scale-105">
                        <Icon className="h-6 w-6" strokeWidth={1.65} aria-hidden />
                      </span>
                      <span className="text-sm font-semibold text-slate-100">{trip.name}</span>
                      <span className="text-xs text-slate-500">{trip.region}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <TravelGalleryModal trip={activeTrip} onClose={() => setActiveTrip(null)} />
    </section>
  );
}
