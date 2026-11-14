import { ArrowUpRight } from 'lucide-react';
import { portfolioModules } from '../data/content';

const cardStarfield =
  'pointer-events-none absolute inset-0 rounded-xl opacity-[0.5] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13)_0.75px,transparent_1.1px)] bg-[length:28px_32px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]';

const cardClass =
  'chapter-cover group relative flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br p-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 lg:min-h-[460px] lg:p-9';

const cardColors = [
  'from-sky-400/25 via-sky-950/30 to-slate-950',
  'from-emerald-400/25 via-emerald-950/30 to-slate-950',
  'from-violet-400/25 via-violet-950/30 to-slate-950',
];
const iconColors = ['text-sky-300', 'text-emerald-300', 'text-violet-300'];

export function Portfolio() {

  return (
    <section id="portfolio" className="border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-12 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-sky-300">工作学习</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Portfolio</h2>
          <p className="text-base leading-relaxed text-slate-400">
            北邮篇章、职业探索与边界之外：三张星空卡片对应不同阶段，点按卡片查看详情。
          </p>
        </header>

        <div className="grid items-stretch gap-8 md:grid-cols-3 lg:gap-9">
          {portfolioModules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <a
                key={mod.id}
                className={`${cardClass} ${cardColors[index % cardColors.length]}`}
                href={`#/portfolio/${mod.id}`}
              >
                <div className={cardStarfield} aria-hidden />
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl transition-opacity duration-700 group-hover:opacity-0" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-[1] flex min-h-[18rem] flex-1 flex-col justify-between gap-8">
                  <div>
                    <div className={`mb-14 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[inset_0_1px_0_#ffffff25,0_10px_25px_#02061740] ${iconColors[index % iconColors.length]}`}>
                      <Icon className="h-9 w-9" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="text-3xl font-semibold leading-[1.12] tracking-tight text-slate-50 lg:text-[2.5rem]">{mod.title}</h3>
                  </div>
                  <ul
                    className="flex flex-wrap gap-2 border-t border-white/15 pt-6"
                    aria-label={`${mod.title} 标签`}
                  >
                    {mod.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-slate-200"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center justify-between text-sm font-medium text-slate-200">
                    查看篇章
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-colors group-hover:bg-white/20">
                      <ArrowUpRight className="h-5 w-5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

    </section>
  );
}
