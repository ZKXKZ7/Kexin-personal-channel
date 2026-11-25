import { BookOpen, Brain, CheckCheck, FileQuestion, Layers, RotateCcw, Wrench, ArrowDown, ArrowRight } from 'lucide-react';
import './AgentKnowledge.css';
import { useState } from 'react';

const stops = [
  { name: '明确任务', concept: 'Query · Prompt', example: '读者问「这篇论文的创新有证据吗？」这是 Query。要求逐项列出主张、实验和页码，就给出了可验收的 Prompt。' },
  { name: '准备证据', concept: 'Context · RAG · Memory', example: '系统检索与创新点有关的段落，把它们和读者之前约定的评审标准放入本轮上下文。模型据此判断还缺哪张实验表。' },
  { name: '选择行动', concept: 'LLM · Skill · Workflow', example: '模型沿用论文评审 Skill 的方法，把每项贡献与实验逐一配对。若主张缺少依据，下一步就请求读取对应表格。' },
  { name: '调用工具', concept: 'Tool · Function Calling · MCP', example: '模型给出文件和页码，运行框架检查权限，再调用读取工具。若论文保存在外部资料库，也可以通过 MCP 接入。' },
  { name: '检验结果', concept: 'Feedback · Evaluation', example: '工具返回表格后，模型检查实验是否支持主张。缺少对照组就继续查附录；证据齐全或资料已查尽，就交付带页码和局限的结论。' },
  { name: 'Harness', concept: '执行控制层', example: '从读第一段到查完附录，Harness 始终记录已读材料、调度工具、回传结果并判断何时停止。运行环境提供文件与算力，沙箱限制可访问的范围。' },
];

const guides = [
  {
    question: '怎样把一句提问变成可以验收的任务？',
    terms: [
      ['Query', '提出需求', '读者问「论文提出了哪些创新？」这句话也可以直接用作检索词。'],
      ['Prompt', '约定做法', '用户可以把问题扩写为「逐项列出创新、实验与页码」。系统指令还可以约定引用规则。'],
      ['Context', '提供依据', '模型本轮能看到的指令、问题和论文片段构成上下文。把 PDF 放进资料库后，还需要把相关内容送给模型。'],
    ],
    relation: 'Query 确定要回答的问题，Prompt 约定交付形式，Context 为回答提供材料。',
  },
  {
    question: '论文证据从哪里来，模型这一轮能看到多少？',
    terms: [
      ['RAG', '检索外部材料', '根据问题找到相关段落，将段落和出处放进输入，再让模型据此作答。'],
      ['Memory', '复用历史信息', '从已保存的项目记录中取回读者约定的评审标准，例如每项贡献都要核对基线。'],
      ['Context Window', '限定单轮容量', '模型以 Token 为单位处理输入和输出。窗口有限，要优先保留目标、证据原文和页码，并压缩较早的过程记录。'],
    ],
    relation: '检索带回原文，记忆带回已有约定。两者经筛选后都能进入本轮 Context。',
  },
  {
    question: '谁选择下一步，又依据什么方法？',
    terms: [
      ['LLM', '作出当前判断', '模型对照主张与证据，发现摘要声称性能提升，却还没有看到对照实验。'],
      ['Skill', '复用专业方法', '论文评审 Skill 可以用 SKILL.md 说明适用条件及核查步骤，并附模板、参考指南或脚本。'],
      ['Workflow', '安排先后顺序', '先提取主张，再查证据，最后复核。每个环节仍可依据反馈决定是否补查。'],
      ['Multi-Agent', '分配角色', '复杂评审可以由检索者找原文、复核者查引用。两者交接时要传递页码和判断依据。'],
    ],
    relation: 'Workflow 定位当前环节，Skill 提供核查方法，LLM 据此选择行动。需要分工时可引入多个 Agent。',
  },
  {
    question: '模型想读实验表，谁实际去读？',
    terms: [
      ['Tool', '提供操作能力', '文件读取工具接受文件标识和页码，执行后返回表格内容或错误。'],
      ['Function Calling', '表达调用请求', '模型按工具声明填写名称与参数。宿主程序检查参数和权限，再执行读取。'],
      ['MCP', '连接外部服务', '当论文存放在外部资料库时，应用可通过 MCP 发现并调用该服务开放的检索工具。'],
    ],
    relation: '模型提出请求，宿主调度工具，工具结果回到上下文。工具既可以在本地实现，也可以通过 MCP 接入。',
  },
  {
    question: '怎样区分一次有效调用和一份合格结论？',
    terms: [
      ['Evaluation', '对照验收标准', '文件读取成功只说明拿到了表格。还要检查实验是否支持主张，引用页码是否正确。'],
      ['Feedback Loop', '根据差距行动', '如果表格缺少基线，将这个缺口带回下一轮，继续查附录。查尽资料仍无依据时，交付结论应注明证据不足。'],
      ['Observability', '定位失败步骤', '用日志、工具调用记录和耗时追踪，区分检索遗漏、读取失败与模型误读。'],
      ['产品评估', '比较整体表现', '在同一组任务上记录完成率、首次成功率、恢复率、人工介入率、耗时和成本。用标准样本、人工复核与回归测试跟踪质量变化。'],
    ],
    relation: 'Evaluation 给出判断，Feedback Loop 决定怎么继续。多次任务的执行记录能帮助团队解释质量与成本的变化。',
  },
  {
    question: '谁让这些步骤持续运行，又在哪里执行？',
    terms: [
      ['Harness', '协调执行', '组装上下文，调度模型和工具，保存任务进度，并在超时、失败或达到停止条件时作出处理。'],
      ['Agent Loop', '推进每一轮', '模型选择动作，工具执行，结果返回，再决定继续或结束。Harness 负责驱动这个循环。'],
      ['Environment', '提供工作场所', '本机、容器或远程服务器提供文件、依赖和算力。Sandbox 可以隔离文件、网络和系统权限。'],
      ['Guardrails', '执行行为边界', '读取前检查资料权限，敏感操作需要审批，同时限制重试次数和预算。'],
      ['Harness Engineering', '改进运行系统', '沿环境、上下文、工具、反馈、控制和评估逐项排查。例如反复读取同一页时，先查工具结果是否传回，再查进度是否保存。'],
    ],
    relation: '环境承载动作，护栏限定动作，Harness 组织动作。同一个模型接入不同的工具、状态管理与验证机制，任务结果也会不同。',
  },
];

const icons = [FileQuestion, BookOpen, Brain, Wrench, CheckCheck, Layers];
const outputs = ['一份明确的评审要求', '带出处的论文片段', '读取实验表的请求', '表格数据与页码', '逐项标注证据的评审结论', '可继续执行的任务状态'];

export function AgentKnowledge() {
  const [selected, select] = useState(0);
  const stop = stops[selected];
  const Icon = icons[selected];
  function node(index: number) {
    const NodeIcon = icons[index];
    return <button type="button" className="ak-node" aria-pressed={selected === index} aria-controls="agent-map-detail" onClick={() => select(index)}>
      <NodeIcon size={19} aria-hidden="true" /><strong>{stops[index].name}</strong>
    </button>;
  }
  return <section className="ak-map">
    <header><h2>AI Agent 知识地图</h2><p>从「这篇论文的创新有证据吗？」到一份附有出处的评审结论。</p></header>
    <div className="ak-layout">
      <div className="ak-diagram" aria-label="任务执行流程">
        {node(0)}
        <div className="ak-edge"><ArrowDown size={16}/> 带入目标与验收要求</div>
        <div className="ak-loop">
          <div className="ak-frame">{node(5)}<span>管理整个执行循环</span></div>
          <div className="ak-route">{[1,2,3,4].map((i) => <div key={i}>{node(i)}{i < 4 && <div className="ak-edge"><ArrowDown size={15}/>{['提供背景','发出请求','返回证据'][i-1]}</div>}</div>)}</div>
          <button type="button" className="ak-return" onClick={() => select(1)}><RotateCcw size={15}/> 证据不足，补充上下文再判断</button>
        </div>
        <div className="ak-finish"><ArrowDown size={16}/> 完成核查，交付结论</div>
      </div>
      <article id="agent-map-detail" className="ak-detail" aria-live="polite">
        <Icon className="ak-symbol" size={32}/><h3>{stop.name}</h3>
        <p className="ak-terms">{stop.concept}</p>
        <p>{stop.example}</p>
        <div className="ak-output"><span>这一步的产出</span><strong>{outputs[selected]}</strong></div>
        <details key={selected}><summary>相关概念与分工</summary>
          <h4 className="ak-question">{guides[selected].question}</h4>
          <dl>{guides[selected].terms.map(([term,role,example]) => <div key={term} className="ak-definition">
            <dt>{term}<span>{role}</span></dt><dd>{example}</dd>
          </div>)}</dl>
          <p className="ak-relation">{guides[selected].relation}</p>
        </details>
        <button type="button" className="ak-next" onClick={() => select(selected >= 4 ? 0 : selected + 1)}>{selected >= 4 ? '回到任务起点' : '下一步 · '+stops[selected+1].name}<ArrowRight size={16}/></button>
      </article>
    </div>
  </section>;
}
