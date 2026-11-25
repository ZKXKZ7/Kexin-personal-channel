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
            <h2 className="text-xl font-bold">三种值得提前积累的健康储备</h2>
            <div className="mt-4 space-y-3 leading-relaxed">
              <p>作者把健康比作储蓄。今天爬楼、拎东西都很轻松，很容易把这种能力当成理所当然。把眼光放到几十年后，就能看见三种值得维护的身体能力。</p>
              <ol className="list-decimal space-y-2 pl-6">
                <li><strong>线粒体与供能。</strong>心脏、大脑和肌肉工作时都需要能量。线粒体参与细胞供能，这解释了作者为什么把它列为第一项。</li>
                <li><strong>肌肉与独立生活。</strong>从椅子上站起来、提着菜上楼，都需要力量。作者强调抗阻训练，因为肌力会影响年长后能否自己完成这些日常动作。</li>
                <li><strong>骨密度与支撑。</strong>走路和负重还要靠骨骼承受压力。骨密度是影响骨骼强度的因素之一，也提醒人们把骨骼健康纳入长期考虑。</li>
              </ol>
              <p><strong>落到日常：</strong>视频结尾提出每周安排两到三次力量训练，并留意饮食中的蛋白质。用未来想保有的活动能力，决定今天愿意坚持的习惯。</p>
            </div>
            <a className="mt-5 inline-block text-sm text-stone-700 underline underline-offset-4" href="https://www.xiaohongshu.com/explore/6afebee50000000023013a44?xsec_token=AB1_mhXu0Myo6blLPnVyDS9qVNgjsz7Cb_8E2y8WenDhw%3D&amp;xsec_source=pc_user">灵感来自「治愈果（kakki在说啥）」↗</a>
          </article>
          <GrowthNoteText />
        </>
      )}
    </article>
  );
}
