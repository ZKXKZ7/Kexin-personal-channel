import { WavyArrow } from './Decorations';

const journalTags = [
  { text: 'AI赋能，以人为本', delay: '-1s' },
  { text: '大模型、海内外社交产品深度使用者', delay: '-4s' },
  { text: '具备产品洞察、国际化视野和技术实践力的复合能力者', delay: '-7s', wide: true },
  { text: 'LION🦁', delay: '-10s' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="space-y-8">
          <h1 className="text-balance text-[clamp(2.75rem,6vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.065em] text-slate-50">
            Xyn&apos;s Journal
          </h1>
          <ul aria-label="个人介绍" className="flex max-w-xl flex-wrap gap-x-4 gap-y-5">
            {journalTags.map(({ text, delay, wide }) => (
              <li
                key={text}
                className={`min-w-0 max-w-full [perspective:650px] ${wide ? 'basis-full' : ''}`}
              >
                <div className="motion-safe:animate-drift" style={{ animationDelay: delay }}>
                  <div className="relative isolate overflow-hidden rounded-xl border border-sky-200/30 bg-gradient-to-br from-[#284562] via-[#16283e] to-[#0c172a] px-4 py-3 text-sm font-medium leading-snug text-sky-50 shadow-[0_4px_0_#080f20,0_5px_0_#2b455e,0_14px_28px_-10px_#020617,inset_0_1px_0_#bae6fd66] [transform:rotateX(8deg)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(118deg,#bae6fd2b,transparent_43%,transparent_65%,#7dd3fc17)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:[transform:translateZ(24px)_rotateX(-11deg)_rotateY(-7deg)] sm:py-3.5 sm:text-[0.9375rem]">
                    {text}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[min(100%,520px)]">
            <div className="absolute -right-4 top-6 hidden text-sky-300/90 sm:block lg:-right-2">
              <WavyArrow className="w-28" />
            </div>
            <div className="animate-drift aspect-[3/2] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-[0_0_40px_rgba(56,189,248,0.06)] will-change-transform">
              <img
                src={`${import.meta.env.BASE_URL}hero-portrait.png`}
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
