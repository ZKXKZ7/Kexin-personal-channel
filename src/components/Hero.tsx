import { WavyArrow } from './Decorations';

const stickyNoteClass =
  'rounded-xl border border-white/[0.14] bg-white/[0.07] px-4 py-3 text-sm font-medium leading-snug text-slate-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_4px_16px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.14)] backdrop-blur-xl sm:px-4 sm:py-3.5 sm:text-[0.9375rem]';

/** 宽度随文案，强制单行（不用等分栅格） */
const stickyFitOneLineClass = `${stickyNoteClass} w-max max-w-none shrink-0 whitespace-nowrap`;

const stickyFullRowClass = `${stickyNoteClass} w-full min-w-0`;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="space-y-8">
          <h1 className="text-balance text-4xl font-bold leading-[1.12] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.25rem]">
            <span className="block">Welcome to</span>
            <span className="block">Kexin&apos;s channel! 👋</span>
          </h1>
          <div
            role="region"
            aria-label="个人介绍便签"
            className="flex max-w-xl flex-col gap-3 sm:gap-3.5"
          >
            <div className="flex flex-row flex-wrap gap-3 sm:gap-3.5">
              <div className={stickyFitOneLineClass}>AI赋能，以人为本</div>
              <div className={stickyFitOneLineClass}>
                大模型、海内外社交产品深度使用者
              </div>
            </div>
            <div className={stickyFullRowClass}>
              具备产品洞察、国际化视野和技术实践力的复合能力者
            </div>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-3.5">
              <div className={stickyFitOneLineClass}>ESTJ-A</div>
              <div className={stickyFitOneLineClass}>LION🦁</div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[min(100%,520px)]">
            <div className="absolute -right-4 top-6 hidden text-sky-300/90 sm:block lg:-right-2">
              <WavyArrow className="w-28" />
            </div>
            <div className="animate-drift aspect-[3/2] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-[0_0_40px_rgba(56,189,248,0.06)] will-change-transform">
              <img
                src="/hero-portrait.png"
                alt="在伦敦玛丽女王大学 Graduate Centre 前的留影"
                className="h-full w-full object-cover object-center"
                width={1024}
                height={682}
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Queen Mary University of London · Graduate Centre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
