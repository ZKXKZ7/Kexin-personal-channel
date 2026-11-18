import type { ReactNode } from 'react';
import { ArrowLeft, Award, BookOpen, FlaskConical, Globe2, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './BuptChapter.css';

const metrics = [
  { label: 'GPA', value: '3.7', detail: '/ 4' },
  { label: '均分', value: '89', detail: '/ 100' },
  { label: '智育排名', value: '6', detail: '/ 180' },
  { label: 'IELTS', value: '7.5', detail: '阅读 9' },
];

const courses = [
  ['运筹学', 96],
  ['概率论与数理统计', 95],
  ['数据结构', 94],
  ['Java 高级语言程序设计', 92],
  ['高等数学', 91],
  ['产品开发与营销', 'A'],
];

function ChapterCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <section className="bupt-card">
      <Icon aria-hidden="true" />
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function BuptChapterDetails() {
  return (
    <>
      <section className="bupt-degree">
        <header className="bupt-degree-header">
          <h2>本科 · 电子商务及法律</h2>
          <p className="bupt-date">2021.09 — 2025.07</p>
        </header>
        <p className="bupt-degree-summary">北京邮电大学国际学院 · 工学与管理学 · 一等荣誉学位</p>
        <dl className="bupt-metrics">
          {metrics.map(({ label, value, detail }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value} <small>{detail}</small></dd>
            </div>
          ))}
        </dl>
        <div className="bupt-grid">
          <ChapterCard icon={Award} title="奖学金与荣誉">
            <ul>
              <li><strong>国家奖学金</strong><p>1 / 180</p></li>
              <li><strong>校一等奖学金</strong></li>
              <li><strong>三好学生</strong><p>连续两年</p></li>
            </ul>
          </ChapterCard>
          <ChapterCard icon={Globe2} title="国际交流">
            <ul>
              <li><strong>伦敦玛丽女王大学奖优交流</strong><p>入选菁英领袖学生代表，单人面试轮排名 1 / 680。</p></li>
              <li><strong>MIC 2023 模拟国际会议</strong><p>主会场第一名</p></li>
              <li><p>CET-4 649 · CET-6 611</p></li>
            </ul>
          </ChapterCard>
          <ChapterCard icon={BookOpen} title="专业课成绩">
            <dl className="bupt-courses">
              {courses.map(([name, grade]) => (
                <div key={name}><dt>{name}</dt><dd>{grade}</dd></div>
              ))}
            </dl>
          </ChapterCard>
          <ChapterCard icon={Users} title="学生工作与校园活动">
            <ul>
              <li><strong>鸿雁青年志愿者协会 · 外联部部长</strong><p>2021.10 — 2023.07</p><p>统筹 ArchSummit 全球架构师峰会、老狼北京演唱会等 14 场校外志愿活动，覆盖超 1,000 名志愿者。</p></li>
              <li><strong>2021 博弈杯辩论赛</strong><p>最佳辩手</p></li>
            </ul>
          </ChapterCard>
        </div>
      </section>

      <section className="bupt-degree">
        <header className="bupt-degree-header">
          <h2>硕士 · 计算机科学与技术</h2>
          <p className="bupt-date">2025.09 — 2028.07</p>
        </header>
        <p className="bupt-degree-summary">北京邮电大学计算机学院（国家示范性软件学院） · 网络与交换技术国家重点实验室</p>
        <ChapterCard icon={Users} title="研究生会 · 文体部负责人">
          <p>2025.09 — 2026.07</p>
          <p>统筹举办北京邮电大学校园歌手大赛、2026 届毕业歌会和研究生篮球赛等校级文体活动。</p>
        </ChapterCard>
      </section>

      <section className="bupt-degree">
        <h2>科研项目</h2>
        <div className="bupt-grid">
          <ChapterCard icon={FlaskConical} title="跨域双活 P2P 模型协作训练与故障经验保持">
            <ul>
              <li><p>设计双数据中心协同训练系统，在跨域数据分布异构、广域网带宽受限时支持正常协同训练和单端故障续训。</p></li>
              <li><strong>通信量节省约 94%</strong><p>在强异构实验中使用 6% 的稀疏通信量。故障续训中，对端知识遗忘度从 28.4% 降至 2.2%。</p></li>
            </ul>
          </ChapterCard>
          <ChapterCard icon={FlaskConical} title="边缘 AIGC 网络中数据共享激励算法">
            <ul>
              <li><p>设计涵盖数据上链、服务请求、定价和交付的九步工作流，建立适用于定制化产品的服务质量评估体系。</p></li>
              <li><strong>两阶段 Stackelberg 博弈</strong><p>用多智能体强化学习与 Actor-Critic 网络学习价格和购买量的动态决策策略。</p></li>
            </ul>
          </ChapterCard>
        </div>
      </section>
    </>
  );
}

export function BuptChapter() {
  return (
    <article className="bupt-page">
      <div className="bupt-content">
        <a className="bupt-back" href="#/portfolio"><ArrowLeft size={16} aria-hidden="true" />返回 Portfolio</a>
        <header className="bupt-hero">
          <div className="bupt-orbit" aria-hidden="true" />
          <div>
            <p className="bupt-kicker">ACADEMIC ORBIT / 2021 — 2028</p>
            <h1>Chapters of <span>BUPT</span></h1>
            <p className="bupt-hero-caption">北京邮电大学 · 学业与科研</p>
          </div>
        </header>
        <BuptChapterDetails />
      </div>
    </article>
  );
}
