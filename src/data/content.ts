import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  MapPin,
  Plane,
  Tent,
  Train,
  GraduationCap,
  Megaphone,
  Music,
  Activity,
  Languages,
} from 'lucide-react';

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

/** 弹窗内单张卡片：渐变占位，或可选 videoSrc（站点根路径，如 /media/foo.mp4） */
export type TripPhoto = {
  id: string;
  label: string;
  gradient: string;
  videoSrc?: string;
};

export type TravelTrip = {
  id: string;
  name: string;
  region: string;
  icon: LucideIcon;
  photos: TripPhoto[];
  /** 弹窗顶部说明；省略则用旅程默认文案；设为空字符串则不显示该段 */
  modalIntro?: string;
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

/** Music / Sports / French — 与 Travel 同结构，供 Life Log 与弹窗复用 */
export const lifeInterestTrips: TravelTrip[] = [
  {
    id: 'music',
    name: 'Music',
    region: 'Hiphop · R&B',
    icon: Music,
    modalIntro:
      '记录常听的流派、练耳与现场：下面是示意卡片，可在 content 中替换为你的歌单、演出或练习笔记。',
    photos: [
      { id: '1', label: '歌单快照', gradient: 'from-[#1e293b] to-[#334155]' },
      { id: '2', label: '现场氛围', gradient: 'from-[#312e81] to-[#4c1d95]' },
      { id: '3', label: '练习片段', gradient: 'from-[#0f172a] to-[#1e3a5f]' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    region: 'Rock climbing · Dancing',
    icon: Activity,
    modalIntro: '',
    photos: [
      {
        id: '1',
        label: '攀岩',
        gradient: 'from-[#134e4a] to-[#115e59]',
        videoSrc: '/media/WeChat_20260511231321.mp4',
      },
      { id: '2', label: '街舞', gradient: 'from-[#164e63] to-[#155e75]' },
    ],
  },
  {
    id: 'french',
    name: 'French',
    region: 'Study · Immersion',
    icon: Languages,
    modalIntro:
      '法语学习与应用场景：听力、口语与阅读材料可替换为你在 content 中配置的标签与说明。',
    photos: [
      { id: '1', label: '词汇本', gradient: 'from-[#4c0519] to-[#831843]' },
      { id: '2', label: '听力材料', gradient: 'from-[#1c1917] to-[#44403c]' },
      { id: '3', label: '口语练习', gradient: 'from-[#292524] to-[#57534e]' },
    ],
  },
];
