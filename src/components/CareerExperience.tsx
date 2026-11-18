import { AudioLines, Layers3, ScanLine } from 'lucide-react';
import './CareerExperience.css';

const internships = [
  {
    company: '快手',
    tone: 'amber',
    icon: AudioLines,
    team: '生活服务商业化产品部',
    role: '智能互动 AI 策略产品经理',
    period: '2026.06 — 2026.10',
    highlights: [
      { title: '商家智能客服决策', detail: '搭建由业务红线规则和 Planner 模型组成的双层决策体系，定义 7 类拦截规则及问答、追问、留资三类 Agent 指令。接入商家配置、用户画像和进入私信场景等信号，在用户开口前后动态调度营销组件。' },
      { title: '留资转化链路', detail: '推进客服接待前置和消息通道改造，结合商家信息、用户场景和平台链路，优化接待时机、内容承接和策略分发。' },
    ],
    results: [
      { label: '大盘 CVR', value: '+9.64%' },
      { label: '开口 CVR', value: '+10.50%' },
      { label: 'SCVR', value: '+8.787%' },
    ],
  },
  {
    company: '百度',
    tone: 'blue',
    icon: ScanLine,
    team: 'MEG 事业群 · AI 搜索组',
    role: '多模态 AI 产品经理',
    period: '2025.08 — 2025.10',
    highlights: [
      { title: '文心助手多模态体验', detail: '围绕视频通话和拍照问，设计多人设与音色切换时的播报截断逻辑，为医疗多模态问诊等四类垂直场景定义端到端方案和回复策略，并协同语音技术团队优化通话打断过于灵敏的问题。' },
      { title: '入口与功能策略', detail: '定义入口引导、视频通话引导和记忆功能策略，推动语音搜索底部栏全量替换为文心助手底部栏。' },
    ],
  },
  {
    company: '字节跳动',
    tone: 'mint',
    icon: Layers3,
    team: '产品研发与工程架构',
    role: '直播 Tech PMO',
    period: '2025.03 — 2025.06',
    highlights: [
      { title: '需求管理', detail: '设置 Meego 空间需求流程，组织产品需求初评，跟进低代码平台 AI 分身等三个专项需求及直播技术简化项目。' },
      { title: '交付度量', detail: '配置 Meego 的 SQL 计算字段和空间自动化机制，输出定容率、产品需求按期交付率和大颗粒度需求归因等指标。' },
    ],
  },
];

export function CareerExperience() {
  return (
    <section aria-labelledby="internships-title">
      <h2 id="internships-title" className="mb-5 text-2xl font-semibold tracking-tight text-slate-50">实习经历</h2>
      <div className="grid gap-8">
        {internships.map(({ company, tone, icon: Icon, team, role, period, highlights, results }) => (
          <article key={company} className="career-card" data-tone={tone}>
            <header className="career-identity">
              <div className="career-emblem" aria-hidden="true"><Icon size={32} strokeWidth={1.5} /></div>
              <div>
                <h3 className="career-company">{company}</h3>
                <p className="mt-2 font-medium text-slate-100">{role}</p>
                <p className="mt-1 text-sm text-slate-300">{team}</p>
              </div>
              <p className="career-period">{period}</p>
            </header>

            <div className="career-body">
              {results && (
                <div className="career-results">
                  <p className="text-sm text-slate-300">法律行业最优策略实验 · 三项提升均达显著</p>
                  <dl className="career-metrics">
                    {results.map(({ label, value }) => (
                      <div key={label} className="career-tile">
                        <dt className="text-xs text-slate-300">{label}</dt>
                        <dd className="career-number">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <ul className="career-highlights">
                {highlights.map(({ title, detail }) => (
                  <li key={title} className="career-tile">
                    <h4 className="career-highlight-title">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
