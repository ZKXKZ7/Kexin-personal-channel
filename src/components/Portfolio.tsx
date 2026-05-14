import { useState } from 'react';
import { portfolioModules, portfolioModuleToTrip } from '../data/content';
import { TravelGalleryModal } from './TravelGalleryModal';
import { BuptChapterModal } from './BuptChapterModal';
import type { PortfolioModule, TravelTrip } from '../data/content';

const cardStarfield =
  'pointer-events-none absolute inset-0 rounded-xl opacity-[0.5] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13)_0.75px,transparent_1.1px)] bg-[length:28px_32px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]';

const cardClass =
  'group relative flex h-full min-h-[11rem] w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition duration-300 will-change-transform hover:-translate-y-0.5 hover:border-sky-400/25 hover:shadow-[0_12px_40px_rgba(56,189,248,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 sm:p-6';

export function Portfolio() {
  const [galleryTrip, setGalleryTrip] = useState<TravelTrip | null>(null);
  const [buptModule, setBuptModule] = useState<PortfolioModule | null>(null);

  return (
    <section id="portfolio" className="border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-12 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-sky-300">工作学习</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Portfolio</h2>
          <p className="text-base leading-relaxed text-slate-400">
            北邮篇章、职业探索与边界之外：三张星空卡片对应不同阶段，点按卡片查看详情。
          </p>
        </header>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {portfolioModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                type="button"
                className={cardClass}
                onClick={() => {
                  if (mod.buptChapterModal) setBuptModule(mod);
                  else setGalleryTrip(portfolioModuleToTrip(mod));
                }}
                aria-haspopup="dialog"
              >
                <div className={cardStarfield} aria-hidden />
                <div className="relative z-[1] flex min-h-[9rem] flex-1 flex-col justify-between gap-4">
                  <div>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/25 bg-white/5 text-sky-300">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{mod.title}</h3>
                  </div>
                  <ul
                    className="flex flex-wrap gap-2 border-t border-white/10 pt-4"
                    aria-label={`${mod.title} 标签`}
                  >
                    {mod.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-200/90"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <TravelGalleryModal trip={galleryTrip} onClose={() => setGalleryTrip(null)} />
      <BuptChapterModal module={buptModule} onClose={() => setBuptModule(null)} />
    </section>
  );
}
