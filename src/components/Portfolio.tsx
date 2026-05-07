import { projects } from '../data/content';

export function Portfolio() {
  return (
    <section id="portfolio" className="border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-12 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-sky-300">工作学习</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Portfolio</h2>
          <p className="text-base leading-relaxed text-slate-400">
            一些我在产品、AI 与体验设计交叉点上做过或正在做的方向 —— 留白多一点，信息更清楚一点。
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition duration-300 will-change-transform hover:-translate-y-0.5 hover:border-sky-400/25 hover:shadow-[0_12px_40px_rgba(56,189,248,0.08)] sm:p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/25 bg-white/5 text-sky-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-400"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
