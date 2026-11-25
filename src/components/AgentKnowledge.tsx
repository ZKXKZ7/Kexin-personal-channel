import { useState } from 'react';

const chapters = [
  {
    title: '模型怎样理解任务？',
    rows: [
      ['LLM、Token 与上下文窗口', '语言模型用 token 表示输入和输出，可以分析材料、推理、规划并生成回答。上下文窗口限制一次调用能容纳的信息量。长任务需要挑选相关材料、压缩旧记录，并保留目标、关键决定和未完成事项。'],
      ['Query 与 Prompt', '“这篇论文有什么创新？”是用户的 Query，也可以用于检索。加入“面向系统研究者，按研究问题、已有方法、贡献和证据做表格”，就明确了角色、任务、约束和交付格式。简短的提问本身也可以直接作为 Prompt。'],
      ['系统指令、用户输入与 Context', '产品可以预设学术助手的行为规则，用户再指定这一次要分析的论文。论文 PDF、相关代码、历史消息和刚返回的工具结果共同构成本轮可用的上下文。提示词工程改善任务表达，上下文工程决定每一步应当看到哪些证据。'],
    ],
  },
  {
    title: '怎样复用方法、接入工具与知识？',
    rows: [
      ['Skill 把专业方法保存下来', '论文分析 Skill 可以在 SKILL.md 的元数据里说明名称和适用场景，在正文里约定阅读顺序、评价标准和输出格式。例如逐项区分作者声称的贡献与实验实际支持的结论。它看起来像结构化 Prompt，因为模型确实需要读这些指令。'],
      ['从指令到可复用资源', '同一 Skill 可以附参考指南、分析脚本和评审模板，按需加载。实验分析可以复用基线比较方法，代码审查可以复用并发和恢复检查项，论文写作与证据核查也可以分别封装。脚本可选，实际执行权限由运行系统授予。'],
      ['Tool、Function Calling 与 MCP', '读取文件、执行 Python 或搜索资料是具体工具。通过函数调用，模型按工具声明提出名称和参数，宿主检查权限、执行并返回结果。MCP 是连接外部工具和数据的协议，例如让应用发现并调用代码托管服务提供的能力。'],
      ['Memory 与 RAG', 'Memory 保存跨步骤或跨会话值得复用的信息，如项目决策和用户偏好。RAG 根据当前问题检索外部资料，把相关片段加入上下文后再生成回答。上一轮的实验决定可以来自记忆，这一轮引用的论文段落可以来自检索。'],
    ],
  },
  {
    title: 'Agent 怎样从建议走到交付？',
    rows: [
      ['Agent 与执行循环', '用户给出目标，模型根据当前状态选下一步，工具执行动作，结果回到上下文。Agent Loop 反复进行规划、行动和观察，直到通过验收、遇到需要人决定的事项或达到停止条件。'],
      ['Workflow 与 Multi-Agent', '工作流规定任务的步骤、顺序与分支，例如先提取实验数据，再作图，最后复核。某一步仍可由 Agent 根据反馈动态完成。多智能体则让研究、执行、复核等角色分工，交接时要共享证据和完成标准。'],
      ['同一模型为何会表现不同', '聊天助手可以讨论修复方案，也可以使用工具。仓库型编码助手还能围绕项目文件持续修改、构建、测试并保留执行记录。比较产品时，需要同时考虑模型版本、推理配置、系统指令、工具权限和执行环境。'],
    ],
  },
  {
    title: 'Harness 如何组织长任务？',
    rows: [
      ['能力组成与执行架构', '列出模型、Skill、工具和记忆，可以说明 Agent 具备什么能力。Harness 解释这些能力怎样一起运行：构造下一轮输入、调度工具、保存状态、处理超时与错误、检查权限，并决定继续还是停止。'],
      ['运行框架与执行环境', 'Harness 编排模型与工具之间的循环。Environment 提供操作文件、运行程序所需的数据、依赖与算力，可以在本机、容器、虚拟机或远程服务器上。Sandbox 通过限制文件、网络和系统权限控制影响范围。框架与环境可以分开部署。Agent Runtime 的职责范围因实现而异。'],
      ['Harness Engineering 的六个观察角度', '环境工程准备依赖与可复现实验；上下文工程提供文档、索引与压缩策略；工具工程接入命令、浏览器和业务 API；反馈工程接入测试、静态检查和 CI；控制工程设计权限、审批、恢复与停止条件；评估工程用任务集衡量质量、稳定性、耗时与成本。这是对话采用的学习框架。'],
      ['从一次失败定位系统缺口', '若模型反复修改同一段代码，可以沿执行记录检查：它看到的是旧日志吗？测试命令能运行吗？失败结果是否传回？验收标准能否区分有效修复与偶然通过？这些问题分别指向上下文、环境、反馈和评估。'],
    ],
  },
  {
    title: '如何知道任务真的完成了？',
    rows: [
      ['Feedback Loop 与 Evaluation', '测试结果影响下一步行动，形成反馈闭环。评估则判断结果是否达到预定标准。可用基准任务、带参考答案的样本、人工复核与自动检查评估交付质量，再用回归测试检查改动有没有损害旧能力。'],
      ['Observability 与 Guardrails', '日志记录事件，调用链串起模型和工具步骤，指标汇总延迟、错误与资源消耗。护栏在执行中检查数据范围和操作权限，为敏感操作设置审批，并限制重试次数和预算。'],
      ['产品经理看哪些指标', '模型层看推理、多模态理解与输出质量；任务层看最终完成率、首次成功率、工具成功率、失败恢复率和人工介入率；产品层还要看完成时间、单任务成本、用户满意度和越权事件。比较时使用相同任务集与验收口径。'],
      ['算一笔产品账', '原对话的假设中，A 的完成率为 65%，人工介入率 40%，平均耗时 20 分钟，每次成本 0.5 美元；B 分别为 90%、12%、12 分钟和 0.8 美元。是否值得为 B 多付 0.3 美元，取决于任务价值、人工接手成本和用户愿意等待的时间。'],
    ],
  },
];

const stops = [
  { name: '明确任务', concept: 'Query · Prompt', example: '读者问「这篇论文的创新有证据吗？」这是 Query。要求逐项列出主张、实验和页码，就给出了可验收的 Prompt。', refs: [[0,1],[0,2]] },
  { name: '准备证据', concept: 'Context · RAG · Memory', example: '系统检索与创新点有关的段落，把它们和读者之前约定的评审标准放入本轮上下文。模型据此判断还缺哪张实验表。', refs: [[1,3],[0,0]] },
  { name: '选择行动', concept: 'LLM · Skill · Workflow', example: '模型沿用论文评审 Skill 的方法，把每项贡献与实验逐一配对。若主张缺少依据，下一步就请求读取对应表格。', refs: [[1,0],[1,1],[2,1]] },
  { name: '调用工具', concept: 'Tool · Function Calling · MCP', example: '模型给出文件和页码，运行框架检查权限，再调用读取工具。若论文保存在外部资料库，也可以通过 MCP 接入。', refs: [[1,2],[3,1]] },
  { name: '检验结果', concept: 'Feedback · Evaluation', example: '工具返回表格后，模型检查实验是否支持主张。缺少对照组就继续查附录；证据齐全或资料已查尽，就交付带页码和局限的结论。', refs: [[4,0],[4,1],[4,2],[4,3]] },
  { name: 'Harness', concept: '执行控制层', example: '从读第一段到查完附录，Harness 始终记录已读材料、调度工具、回传结果并判断何时停止。运行环境提供文件与算力，沙箱限制可访问的范围。', refs: [[3,0],[3,1],[3,2],[3,3],[2,0],[2,2]] },
];

export function AgentKnowledge() {
  const [selected, select] = useState(0);
  const stop = stops[selected];
  function node(i: number) {
    const item = stops[i];
    return <button type="button" aria-pressed={selected === i} aria-controls="agent-map-detail" onClick={() => select(i)}
      className={`w-full rounded-xl border px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 ${selected === i ? 'border-violet-400 bg-violet-400/20' : 'border-slate-400/40 hover:border-violet-400'}`}>
      <strong className="block">{item.name}</strong><span className="text-xs opacity-80">{item.concept}</span>
    </button>;
  }
  return (
    <section className="depth-panel relief-card mt-6 rounded-2xl border p-5 sm:p-8">
      <h2 className="text-2xl font-semibold">AI Agent 技术体系知识地图</h2>
      <p className="mb-6 mt-2">一篇论文的创新有证据吗？点选图中节点，看 Agent 怎样找到依据。</p>
      <div className="mx-auto max-w-3xl">
        {node(0)}
        <p className="my-2 text-center text-sm">↓ 目标和验收要求进入执行循环</p>
        <div className="rounded-2xl border border-dashed border-violet-400/70 p-3 sm:p-5">
          {node(5)}
          <p className="my-3 text-center text-sm">↓ 组织每一轮推理与行动</p>
          <div className="grid items-center gap-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {node(1)}<span className="text-center" aria-label="提供信息"><i className="hidden not-italic sm:inline">→</i><i className="not-italic sm:hidden">↓</i></span>
            {node(2)}<span className="text-center" aria-label="请求执行"><i className="hidden not-italic sm:inline">→</i><i className="not-italic sm:hidden">↓</i></span>{node(3)}
          </div>
          <p className="mx-4 mb-3 rounded-b-xl border-x border-b border-violet-400/60 px-2 py-2 text-center text-sm">↶ 工具返回的内容进入下一轮上下文</p>
          {node(4)}
        </div>
        <p className="my-3 text-center text-sm">↻ 缺证据，继续查找　·　↓ 达到停止条件，交付结论</p>
      </div>
      <article id="agent-map-detail" aria-live="polite" className="mt-6 border-t border-slate-400/30 pt-5">
        <h3 className="text-xl font-semibold">{stop.name} · 论文评审中的这一步</h3>
        <p className="my-3 leading-relaxed">{stop.example}</p>
        <details key={selected}><summary className="cursor-pointer">展开相关概念</summary>
          <dl className="mt-3 space-y-3">{stop.refs.map(([chapter,row]) => {
            const [term,description] = chapters[chapter].rows[row];
            return <div key={term}><dt className="font-semibold">{term}</dt><dd className="leading-relaxed">{description}</dd></div>;
          })}</dl>
        </details>
      </article>
    </section>
  );
}
