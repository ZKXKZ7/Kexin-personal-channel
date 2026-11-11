import { ArrowRight, Layers, Compass, PenLine } from 'lucide-react';

const sections = [
  { href: '#/portfolio', number: '01', title: 'Portfolio', subtitle: '实践与探索', description: '从校园到职业探索，记录我的学习、实践与成长。', detail: 'BUPT · Career · Beyond the Margin', icon: Layers, color: 'text-sky-300', background: 'from-sky-400/25' },
  { href: '#/life-log', number: '02', title: 'Life Log', subtitle: '生活的切片', description: '在旅途、音乐与运动之间，发现生活的不同节奏。', detail: 'Travel · Music · Sports · French', icon: Compass, color: 'text-emerald-300', background: 'from-emerald-400/25' },
  { href: '#/thoughts', number: '03', title: 'Thoughts', subtitle: '观察与思考', description: '关于产品、AI 与人的观察，以及仍在探索的问题。', detail: 'Product · AI · Culture', icon: PenLine, color: 'text-violet-300', background: 'from-violet-400/25' },
];

export function HomeSections() {
  return (
    <section aria-labelledby="chapters-title" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">Explore my journal</p>
          <h2 id="chapters-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">从这里，认识我</h2>
        </div>
        <p className="text-sm text-slate-400">三个篇章，随意翻阅。</p>
      </div>
      <div className="grid gap-7 md:grid-cols-3 lg:gap-9">
        {sections.map(({ href, number, title, subtitle, description, detail, icon: Icon, color, background }) => (
          <a key={href} href={href} className={`chapter-cover group relative flex min-h-[320px] flex-col rounded-3xl border border-white/20 bg-gradient-to-br ${background} to-slate-950 p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 lg:min-h-[420px] lg:p-10`}>
            <div className="mb-12 flex items-center justify-between">
              <Icon className={`h-10 w-10 drop-shadow-lg ${color}`} strokeWidth={1.4} aria-hidden />
              <span className="font-mono text-xs tracking-widest text-slate-500">/{number}</span>
            </div>
            <p className={`mb-2 text-xs tracking-widest ${color}`}>{subtitle}</p>
            <h3 className="text-3xl font-semibold tracking-tight lg:text-5xl text-slate-50">{title}</h3>
            <p className="mb-8 mt-4 text-sm leading-7 text-slate-300 lg:text-base">{description}</p>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <span className="text-xs leading-5 text-slate-400">{detail}</span>
              <span className={`flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold transition group-hover:bg-white/20 group-active:bg-white/30 ${color}`}>
                进入 <ArrowRight className="h-4 w-4 transition motion-safe:group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
