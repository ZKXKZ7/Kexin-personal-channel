import { useState } from 'react';
import { lifeInterestTrips, travelTrips } from '../data/content';
import { TravelGalleryModal } from './TravelGalleryModal';
import type { TravelTrip } from '../data/content';

function interestCardStarfield() {
  return (
    <span
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0.75px,transparent_1.1px)] bg-[length:22px_26px] [mask-image:linear-gradient(to_bottom,black_50%,transparent)]"
      aria-hidden
    />
  );
}

export function LifeLog() {
  const [activeGallery, setActiveGallery] = useState<TravelTrip | null>(null);

  return (
    <section id="life-log" className="border-b border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-12 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-sky-300">生活日志</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Life Log</h2>
          <p className="text-base leading-relaxed text-slate-400">
            音乐、运动与语言：和旅行一样，点卡片展开示意详情（文案与色块可在 content 中替换）。
          </p>
        </header>

        <div className="grid gap-10 lg:gap-12">
          {/* Music · Sports · French */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl" aria-hidden>
                🎧
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Music · Sports · French</h3>
                <p className="text-sm text-slate-400">点按卡片查看详情（与下方 Travel 相同交互）</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {lifeInterestTrips.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveGallery(item)}
                      className="group relative flex w-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center transition hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-white/[0.07] hover:shadow-[0_8px_28px_rgba(56,189,248,0.1)]"
                    >
                      {interestCardStarfield()}
                      <span className="relative z-[1] inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/25 bg-white/5 text-sky-300 transition group-hover:scale-105">
                        <Icon className="h-6 w-6" strokeWidth={1.65} aria-hidden />
                      </span>
                      <span className="relative z-[1] text-sm font-semibold text-slate-100">{item.name}</span>
                      <span className="relative z-[1] text-xs text-slate-500">{item.region}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
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
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {travelTrips.map((trip) => {
                const Icon = trip.icon;
                return (
                  <li key={trip.id}>
                    <button
                      type="button"
                      onClick={() => setActiveGallery(trip)}
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

      <TravelGalleryModal trip={activeGallery} onClose={() => setActiveGallery(null)} />
    </section>
  );
}
