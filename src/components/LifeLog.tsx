import { ArrowUpRight } from 'lucide-react';
import { DepthScene } from './DepthScene';
import { lifeInterestTrips, travelTrips } from '../data/content';

const coverColors = [
  'from-sky-400/25 via-sky-950/30 to-slate-950',
  'from-emerald-400/25 via-emerald-950/30 to-slate-950',
  'from-violet-400/25 via-violet-950/30 to-slate-950',
];
const coverClass = 'chapter-cover group relative flex h-full w-full flex-col items-start overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br p-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 lg:p-9';
const emblemClass = 'relative z-[1] mb-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-sky-200 shadow-[inset_0_1px_0_#ffffff30,0_10px_24px_#02061740]';

function interestCardStarfield() {
  return (
    <span
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0.75px,transparent_1.1px)] bg-[length:22px_26px] [mask-image:linear-gradient(to_bottom,black_50%,transparent)]"
      aria-hidden
    />
  );
}

export function LifeLog() {

  return (
    <section id="life-log" className="border-b border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="depth-stage mb-12 space-y-3">
          <DepthScene />
          <p className="depth-kicker text-sm font-semibold">生活日志</p>
          <h1 className="depth-title font-bold">Life Log</h1>
          <p className="max-w-prose text-base leading-relaxed text-slate-300">
            音乐、运动与语言，还有旅途中的每一段记录。
          </p>
        </header>

        <div className="grid gap-16 lg:gap-20">
          {/* Music · Sports · French */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl" aria-hidden>
                🎧
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-slate-100">Music · Sports · French</h3>
                <p className="text-sm text-slate-400">走进音乐、运动与语言的日常</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-9">
              {lifeInterestTrips.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <a
                      href={`#/life-log/${item.id}`}
                      className={`${coverClass} ${coverColors[index % coverColors.length]} min-h-[320px] lg:min-h-[380px]`}
                    >
                      {interestCardStarfield()}
                      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className={emblemClass}>
                        <Icon className="h-9 w-9" strokeWidth={1.65} aria-hidden />
                      </span>
                      <span className="relative z-[1] mb-4 text-3xl font-semibold tracking-tight text-slate-50 lg:text-4xl">{item.name}</span>
                      <span className="relative z-[1] mb-8 text-base leading-7 text-slate-300">{item.region}</span>
                      <span className="relative z-[1] mt-auto flex w-full items-center justify-between border-t border-white/15 pt-5 text-sm text-slate-200">
                        进入篇章
                        <ArrowUpRight className="h-5 w-5 transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" aria-hidden />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Travel */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl" aria-hidden>
                ✈️
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-slate-100">Travel</h3>
                <p className="text-sm text-slate-400">点按每一段旅程，进入旅行相册</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
              {travelTrips.map((trip, index) => {
                const Icon = trip.icon;
                return (
                  <li key={trip.id}>
                    <a
                      href={`#/life-log/${trip.id}`}
                      className={`${coverClass} ${coverColors[index % coverColors.length]} min-h-[320px] lg:min-h-[380px]`}
                    >
                      <span className={emblemClass}>
                        <Icon className="h-9 w-9" strokeWidth={1.65} aria-hidden />
                      </span>
                      <span className="relative z-[1] mb-4 text-3xl font-semibold tracking-tight text-slate-50 lg:text-4xl">{trip.name}</span>
                      <span className="relative z-[1] mb-8 text-base leading-7 text-slate-300">{trip.region}</span>
                      <span className="relative z-[1] mt-auto flex w-full items-center justify-between border-t border-white/15 pt-5 text-sm text-slate-200">
                        进入篇章
                        <ArrowUpRight className="h-5 w-5 transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" aria-hidden />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>


    </section>
  );
}
