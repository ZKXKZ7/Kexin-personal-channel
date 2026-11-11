import { ArrowUpRight, Layers, Compass, PenLine } from 'lucide-react';

const sections = [
  { href: '#/portfolio', number: '01', title: 'Portfolio', subtitle: '实践与探索', description: '从校园到职业探索，记录我的学习、实践与成长。', detail: 'BUPT · Career · Beyond the Margin', icon: Layers, color: 'text-sky-300', background: 'from-sky-400/15' },
  { href: '#/life-log', number: '02', title: 'Life Log', subtitle: '生活的切片', description: '在旅途、音乐与运动之间，发现生活的不同节奏。', detail: 'Travel · Music · Sports · French', icon: Compass, color: 'text-emerald-300', background: 'from-emerald-400/15' },
  { href: '#/thoughts', number: '03', title: 'Thoughts', subtitle: '观察与思考', description: '关于产品、AI 与人的观察，以及仍在探索的问题。', detail: 'Product · AI · Culture', icon: PenLine, color: 'text-violet-300', background: 'from-violet-400/15' },
];

export function HomeSections() {
  return (
    <section aria-labelledby="chapters-title" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">Explore my journal</p>
          <h2 id="chapters-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">从这里，认识我</h2>
        </div>
        <p className="text-sm text-slate-400">三个篇章，随意翻阅。</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {sections.map(({ href, number, title, subtitle, description, detail, icon: Icon, color, background }) => (
          <a key={href} href={href} className={`group relative flex min-h-[310px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${background} to-slate-950/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 motion-reduce:transform-none`}>
            <div className="mb-10 flex items-center justify-between">
              <Icon className={`h-7 w-7 ${color}`} strokeWidth={1.4} aria-hidden />
              <span className="font-mono text-xs tracking-widest text-slate-500">/{number}</span>
            </div>
            <p className={`mb-2 text-xs tracking-widest ${color}`}>{subtitle}</p>
            <h3 className="text-3xl font-semibold tracking-tight text-slate-50">{title}</h3>
            <p className="mb-8 mt-4 text-sm leading-7 text-slate-400">{description}</p>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <span className="text-[11px] leading-5 text-slate-400">{detail}</span>
              <ArrowUpRight className={`h-5 w-5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${color}`} aria-hidden />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
