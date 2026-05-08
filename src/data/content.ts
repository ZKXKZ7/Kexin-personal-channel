import type { LucideIcon } from 'lucide-react';
import { Layers, MapPin, Plane, Tent, Train, GraduationCap, Megaphone } from 'lucide-react';

/** 单块 Portfolio 模块卡：在 content 里改文案、标签或 icon 即可 */
export type PortfolioModule = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
};

export const portfolioModules: PortfolioModule[] = [
  {
    title: 'Chapters of BUPT',
    description:
      '在北邮的学科训练与学术轨道：从校园与课程到竞赛、课题与论文导向的探索，把问题定义清楚再动手实现。（可按你的经历改写）',
    tags: ['University', 'Academic Orbit'],
    icon: GraduationCap,
  },
  {
    title: 'Career Exploration',
    description:
      '在百度、字节、保时捷数字产品与产品视角下的迭代与沉淀：需求拆解、实验验证与跨团队推进。（替换为你的岗位与成果描述。）',
    tags: ['Baidu', 'Bytedance', 'Porsche Digital', 'Product'],
    icon: Layers,
  },
  {
    title: 'Beyond the Margin',
    description:
      '在公关与外联方向负责传播叙事与活动落地：把复杂信息讲清楚，把现场办成可记忆的体验。（可按你的学生工作改写）',
    tags: ['Public Relations Department'],
    icon: Megaphone,
  },
];

export type TravelTrip = {
  id: string;
  name: string;
  region: string;
  icon: LucideIcon;
  /** Placeholder gradients — no external image dependency */
  photos: { id: string; label: string; gradient: string }[];
};

export const travelTrips: TravelTrip[] = [
  {
    id: 'kyoto',
    name: '京都慢行',
    region: 'Japan',
    icon: Train,
    photos: [
      { id: '1', label: '清晨町屋', gradient: 'from-[#E8ECF8] to-[#D4DCF0]' },
      { id: '2', label: '竹林小径', gradient: 'from-[#EEF2EA] to-[#DDE5D8]' },
      { id: '3', label: '鸭川黄昏', gradient: 'from-[#F5E8DC] to-[#E8D4C4]' },
    ],
  },
  {
    id: 'alps',
    name: '阿尔卑斯徒步',
    region: 'Europe',
    icon: Tent,
    photos: [
      { id: '1', label: '山脊线', gradient: 'from-[#E3EDF5] to-[#CED9E8]' },
      { id: '2', label: '湖畔营地', gradient: 'from-[#E8F0F6] to-[#D0E0ED]' },
    ],
  },
  {
    id: 'coast',
    name: '海岸线公路',
    region: 'Pacific',
    icon: Plane,
    photos: [
      { id: '1', label: '一号公路', gradient: 'from-[#E5EAF5] to-[#D5DFF0]' },
      { id: '2', label: '海边小镇', gradient: 'from-[#F2EBE3] to-[#E5D9CC]' },
      { id: '3', label: '落日', gradient: 'from-[#F8E8DC] to-[#EDD4C4]' },
    ],
  },
  {
    id: 'city',
    name: '城市漫游',
    region: 'East Asia',
    icon: MapPin,
    photos: [
      { id: '1', label: '夜景', gradient: 'from-[#E6E8F2] to-[#D2D6E8]' },
      { id: '2', label: '咖啡馆一角', gradient: 'from-[#F3EEE6] to-[#E5DDD0]' },
    ],
  },
];

/** Deterministic pseudo-contribution grid (52 weeks x 7 days), values 0–3 */
export function getRunningContributionPattern(): number[][] {
  const cols = 52;
  const rows = 7;
  const out: number[][] = [];
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let c = 0; c < cols; c++) {
    const col: number[] = [];
    for (let r = 0; r < rows; r++) {
      const v = rnd();
      if (v < 0.45) col.push(0);
      else if (v < 0.72) col.push(1);
      else if (v < 0.9) col.push(2);
      else col.push(3);
    }
    out.push(col);
  }
  return out;
}
