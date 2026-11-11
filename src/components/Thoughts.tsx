export function Thoughts() {
  return (
    <section id="thoughts" className="border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-10 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-sky-300">思考洞察</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Thoughts</h2>
          <p className="text-base leading-relaxed text-slate-400">
            像 Notion 页面一样轻：记录问题、假设与下一步实验，而不是“结论包装成真理”。
          </p>
        </header>
        <ul className="space-y-4 text-base leading-relaxed text-slate-300">
          <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-4">
            <span className="text-lg" aria-hidden>
              🧭
            </span>
            <span>
              <span className="font-semibold text-slate-100">产品</span>：把“用户能完成什么任务”放在指标之前；增长是结果，不是起点。
            </span>
          </li>
          <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5 sm:py-4">
            <span className="text-lg" aria-hidden>
              🤝
            </span>
            <span>
              <span className="font-semibold text-slate-100">AI</span>：更关注人机协作界面与失败兜底；模型会升级，但责任边界要写得清楚。
            </span>
          </li>
          <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5 sm:py-4">
            <span className="text-lg" aria-hidden>
              🌍
            </span>
            <span>
              <span className="font-semibold text-slate-100">国际化</span>：文化差异藏在默认值里；用本地用户的“理所当然”反推你的产品假设。
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
