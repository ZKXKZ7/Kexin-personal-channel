import { ArrowLeft, ArrowUpRight, Headphones, Plane } from 'lucide-react';
import { lifeInterestTrips, travelTrips } from '../data/content';
import { DepthScene } from './DepthScene';

const coverColors = [
  'from-sky-400/25 via-sky-950/30 to-slate-950',
  'from-emerald-400/25 via-emerald-950/30 to-slate-950',
  'from-violet-400/25 via-violet-950/30 to-slate-950',
];
const coverClass = 'chapter-cover group relative flex h-full w-full flex-col items-start overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br p-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 lg:p-9';
const emblemClass = 'relative z-[1] mb-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-sky-200 shadow-[inset_0_1px_0_#ffffff30,0_10px_24px_#02061740]';

const chapters = [
  { id: 'music', title: 'Music', description: 'Hiphop · R&B', icon: Headphones, color: 'text-violet-300' },
  { id: 'travel', title: 'Travel', description: '按目的地浏览旅行相册', icon: Plane, color: 'text-emerald-300' },
];

export function LifeLog() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
      <header className="depth-stage mb-10 space-y-3">
        <DepthScene />
        <p className="depth-kicker text-sm font-semibold">生活日志</p>
        <h1 className="depth-title font-bold">Life Log</h1>
      </header>
      <ul className="grid gap-6 sm:grid-cols-2">
        {chapters.map(({ id, title, description, icon: Icon, color }) => (
          <li key={id}>
            <a href={`#/life-log/${id}`} className="chapter-cover relief-card flex h-full min-h-64 flex-col gap-5 rounded-3xl border p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className={`relief-emblem grid h-16 w-16 place-items-center ${color}`}><Icon size={30} aria-hidden="true" /></span>
                <ArrowUpRight size={22} className={color} aria-hidden="true" />
              </div>
              <h2 className="text-4xl font-semibold text-slate-50">{title}</h2>
              <p className="relief-inset mt-auto p-3 text-sm text-slate-300">{description}</p>
            </a>
          </li>
        ))}
      </ul>
      <nav aria-label="其他生活记录" className="mt-8 flex flex-wrap gap-3">
        {lifeInterestTrips.filter(item => item.id !== 'music').map(({ id, name, icon: Icon }) => (
          <a key={id} href={`#/life-log/${id}`} className="depth-link depth-panel relief-card inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm">
            <Icon size={16} aria-hidden="true" />{name}
          </a>
        ))}
      </nav>
    </section>
  );
}

export function TravelLog() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <a href="#/life-log" className="depth-kicker inline-flex items-center gap-2 text-sm hover:underline">
        <ArrowLeft size={16} aria-hidden="true" />返回 Life Log
      </a>
      <header className="depth-stage mb-8 mt-5 space-y-3">
        <DepthScene />
        <p className="depth-kicker text-sm font-semibold">旅行相册</p>
        <h1 className="depth-title font-bold">Travel</h1>
      </header>
      <ul className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-9">
        {travelTrips.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <a
                href={`#/life-log/${item.id}`}
                className={`${coverClass} ${coverColors[index % coverColors.length]} min-h-[320px] lg:min-h-[380px]`}
              >
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
    </section>
  );
}
