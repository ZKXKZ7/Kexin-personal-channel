import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Globe2,
  Layers,
  Sparkles,
  MapPin,
  Plane,
  Tent,
  Train,
} from 'lucide-react';

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
};

export const projects: ProjectItem[] = [
  {
    title: 'LLM Product Lab',
    description: '从用户旅程出发，探索大模型在内容创作与协作场景中的可落地形态。',
    tags: ['University', 'Research'],
    icon: Sparkles,
  },
  {
    title: 'Global Social Insights',
    description: '长期深度使用海内外社交产品，沉淀跨文化产品洞察与增长假设。',
    tags: ['Bytedance Intern', 'Product'],
    icon: Globe2,
  },
  {
    title: 'AI Workflow Toolkit',
    description: '把 AI 嵌入日常工作流：提示工程、评测与轻量自动化的一体化实践。',
    tags: ['AI', 'Engineering'],
    icon: Bot,
  },
  {
    title: 'Design Systems Play',
    description: '组件化思维 + 高留白排版，让复杂信息在页面里依然“呼吸”。',
    tags: ['UX', 'Frontend'],
    icon: Layers,
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
