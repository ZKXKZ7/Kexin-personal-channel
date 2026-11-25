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
      { title: '构建商家客服双层决策体系', points: [['规则与模型', '用 7 类业务红线规则约束 Planner 模型，定义问答、追问和留资三类 Agent 指令。'], ['触发时机', '结合商家配置、用户画像和私信来源，在用户开口前后调度营销组件。']] },
      { title: '把客服接待前移到留资环节', points: [['接待链路', '推进接待前置和消息通道改造。'], ['策略分发', '根据商家信息、用户场景和平台链路，调整接待时机及承接内容。']] },
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
      { title: '为四类垂直场景设计多模态回复', points: [['场景方案', '围绕视频通话和拍照问，为医疗问诊等四类场景定义端到端方案。'], ['语音交互', '设计切换人设、音色时的播报截断逻辑，并与语音团队优化通话打断过于灵敏的问题。']] },
      { title: '推动文心助手底部栏全量替换', points: [['上线范围', '将语音搜索底部栏全量替换为文心助手底部栏。'], ['使用引导', '定义入口引导、视频通话引导和记忆功能策略。']] },
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
      { title: '跟进三个专项需求与直播技术简化项目', points: [['需求初评', '在 Meego 搭建需求流程，组织产品需求初评。'], ['项目跟进', '跟进低代码平台 AI 分身等三个专项需求，以及直播技术简化项目。']] },
      { title: '建立直播研发交付度量', points: [['指标配置', '配置 Meego 的 SQL 计算字段与空间自动化机制。'], ['交付分析', '输出定容率、产品需求按期交付率，并对大颗粒度需求做归因。']] },
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
                {highlights.map(({ title, points }) => (
                  <li key={title} className="career-tile">
                    <h4 className="career-highlight-title">{title}</h4>
                    <dl className="career-points">
                      {points.map(([label, description]) => (
                        <div key={label}><dt>{label}</dt><dd>{description}</dd></div>
                      ))}
                    </dl>
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
