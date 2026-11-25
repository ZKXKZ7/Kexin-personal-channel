import { GrowthNoteText } from './GrowthNoteText';
import { ArrowLeft, ArrowUpRight, Compass, Globe2, Sprout, Workflow } from 'lucide-react';
import { DepthScene } from './DepthScene';

export const thoughtTopics = [
  { id: 'product', title: '产品', label: 'Product', icon: Compass, color: 'text-sky-300', summary: '把“用户能完成什么任务”放在指标之前；增长是结果，不是起点。' },
  { id: 'ai', title: 'AI', label: '人机协作', icon: Workflow, color: 'text-violet-300', summary: '更关注人机协作界面与失败兜底；模型会升级，但责任边界要写得清楚。' },
  { id: 'internationalization', title: '国际化', label: 'Internationalization', icon: Globe2, color: 'text-emerald-300', summary: '文化差异藏在默认值里；用本地用户的“理所当然”反推你的产品假设。' },
  { id: 'growth', title: '思考', label: 'Thoughts', icon: Sprout, color: 'text-amber-300', summary: '记录值得长期练习的能力，以及它们怎样改变日常生活里的选择。' },
];

export function Thoughts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
      <header className="depth-stage mb-10 space-y-3">
        <DepthScene />
        <p className="depth-kicker text-sm font-semibold">思考洞察</p>
        <h1 className="depth-title font-bold">Insights</h1>
      </header>
      <ul className="grid gap-6 sm:grid-cols-2">
        {thoughtTopics.map(({ id, title, label, icon: Icon, color, summary }) => (
          <li key={id}>
            <a href={`#/thoughts/${id}`} className="chapter-cover relief-card flex h-full min-h-72 flex-col gap-4 rounded-3xl border p-6">
              <div className="flex items-center justify-between gap-3">
                <span className={`relief-emblem grid h-14 w-14 place-items-center ${color}`}><Icon size={28} aria-hidden="true" /></span>
                <ArrowUpRight size={20} className={color} aria-hidden="true" />
              </div>
              <div>
                <p className={`text-xs ${color}`}>{label}</p>
                <h2 className="mt-1 text-3xl font-semibold text-slate-50">{title}</h2>
              </div>
              <p className="relief-inset flex-1 p-3 text-sm leading-relaxed text-slate-300">{summary}</p>
              <span className={`text-sm font-medium ${color}`}>进入{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ThoughtDetail({ topic }: { topic: (typeof thoughtTopics)[number] }) {
  const Icon = topic.icon;
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <a href="#/thoughts" className="depth-kicker inline-flex items-center gap-2 text-sm hover:underline">
        <ArrowLeft size={16} aria-hidden="true" />返回 Insights
      </a>
      <header className="depth-stage mb-8 mt-5 space-y-3">
        <DepthScene />
        <p className={`text-sm ${topic.color}`}>{topic.label}</p>
        <h1 className="depth-title font-bold">{topic.title}</h1>
      </header>
      <div className="depth-panel relief-card flex items-start gap-4 rounded-2xl border p-5 sm:p-7">
        <span className={`relief-emblem grid h-12 w-12 shrink-0 place-items-center ${topic.color}`}><Icon size={24} aria-hidden="true" /></span>
        <p className="relief-inset flex-1 p-4 leading-relaxed text-slate-200">{topic.summary}</p>
      </div>
      {topic.id === 'growth' && (
        <>
          <article className="reader-paper relative mt-8 max-w-2xl rounded-sm bg-amber-100 px-6 py-7 text-stone-900 shadow-lg sm:px-8">
            <span aria-hidden="true" className="absolute -top-2 left-8 h-4 w-16 -rotate-3 bg-amber-300/80" />
            <h2 className="text-xl font-bold">为以后还能走远路，今天可以存下什么？</h2>
            <div className="mt-4 space-y-3 leading-relaxed">
              <p>我会为十年后的生活存钱，却很少想，到那时，我还想有力气背着包去旅行。视频里提到的三样东西，让这个愿望具体了起来。</p>
              <p>线粒体参与细胞供能，肌肉让我能拎起行李、踏上台阶，骨密度则是骨骼承重能力的一部分。它们平时很难被察觉，却都关系到我以后能怎样生活。</p>
              <p>下次安排一周的日程，我想给力量训练留一个固定位置。一次练习看不出多少变化，但这件事值得在身体还轻快的时候就开始做。</p>
            </div>
            <a className="mt-5 inline-block text-sm text-stone-700 underline underline-offset-4" href="https://www.xiaohongshu.com/explore/6afebee50000000023013a44?xsec_token=AB1_mhXu0Myo6blLPnVyDS9qVNgjsz7Cb_8E2y8WenDhw%3D&amp;xsec_source=pc_user">灵感来自「治愈果（kakki在说啥）」↗</a>
          </article>
          <GrowthNoteText />
        </>
      )}
    </article>
  );
}
