import { DepthScene } from './DepthScene';
export function Thoughts() {
  return (
    <section id="thoughts" className="border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="depth-stage mb-10 space-y-3">
          <DepthScene />
          <p className="depth-kicker text-sm font-semibold">思考洞察</p>
          <h1 className="depth-title font-bold">Thoughts</h1>
          <p className="max-w-prose text-base leading-relaxed text-slate-300">
            像 Notion 页面一样轻：记录问题、假设与下一步实验，而不是“结论包装成真理”。
          </p>
        </header>
        <ul className="space-y-4 text-base leading-relaxed text-slate-300">
          <li className="depth-panel depth-glass relief-card flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-4">
            <span className="relief-emblem grid h-10 w-10 shrink-0 place-items-center text-lg" aria-hidden>
              🧭
            </span>
            <span className="relief-inset min-w-0 flex-1 px-3 py-2">
              <span className="font-semibold text-slate-100">产品</span>：把“用户能完成什么任务”放在指标之前；增长是结果，不是起点。
            </span>
          </li>
          <li className="depth-panel depth-glass relief-card flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5 sm:py-4">
            <span className="relief-emblem grid h-10 w-10 shrink-0 place-items-center text-lg" aria-hidden>
              🤝
            </span>
            <span className="relief-inset min-w-0 flex-1 px-3 py-2">
              <span className="font-semibold text-slate-100">AI</span>：更关注人机协作界面与失败兜底；模型会升级，但责任边界要写得清楚。
            </span>
          </li>
          <li className="depth-panel depth-glass relief-card flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5 sm:py-4">
            <span className="relief-emblem grid h-10 w-10 shrink-0 place-items-center text-lg" aria-hidden>
              🌍
            </span>
            <span className="relief-inset min-w-0 flex-1 px-3 py-2">
              <span className="font-semibold text-slate-100">国际化</span>：文化差异藏在默认值里；用本地用户的“理所当然”反推你的产品假设。
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
