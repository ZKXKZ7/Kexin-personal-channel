import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  GraduationCap,
  Megaphone,
  Music,
  Activity,
  Languages,
  Landmark,
  Mountain,
  Wine,
  Snowflake,
  Pizza,
  TreePalm,
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
    id: 'uk',
    name: '英国',
    region: 'United Kingdom',
    icon: Landmark,
    photos: [
      { id: '1', label: 'London', gradient: 'from-[#1e293b] to-[#334155]' },
      { id: '2', label: 'Countryside', gradient: 'from-[#1c1917] to-[#44403c]' },
    ],
  },
  {
    id: 'xinjiang',
    name: '新疆',
    region: 'Xinjiang',
    icon: Mountain,
    photos: [
      { id: '1', label: 'Desert & peaks', gradient: 'from-[#78350f] to-[#92400e]' },
      { id: '2', label: 'Highway', gradient: 'from-[#0c4a6e] to-[#075985]' },
    ],
  },
  {
    id: 'france',
    name: '法国',
    region: 'France',
    icon: Wine,
    photos: [
      { id: '1', label: 'Paris', gradient: 'from-[#312e81] to-[#4c1d95]' },
      { id: '2', label: 'Vineyards', gradient: 'from-[#14532d] to-[#166534]' },
    ],
  },
  {
    id: 'switzerland',
    name: '瑞士',
    region: 'Switzerland',
    icon: Snowflake,
    photos: [
      { id: '1', label: 'Alps', gradient: 'from-[#164e63] to-[#155e75]' },
      { id: '2', label: 'Lakes', gradient: 'from-[#0e7490] to-[#0891b2]' },
    ],
  },
  {
    id: 'italy',
    name: '意大利',
    region: 'Italy',
    icon: Pizza,
    photos: [
      { id: '1', label: 'Rome', gradient: 'from-[#7c2d12] to-[#9a3412]' },
      { id: '2', label: 'Coast', gradient: 'from-[#0c4a6e] to-[#0369a1]' },
    ],
  },
  {
    id: 'indonesia',
    name: '印尼',
    region: 'Indonesia',
    icon: TreePalm,
    photos: [
      { id: '1', label: 'Islands', gradient: 'from-[#134e4a] to-[#115e59]' },
      { id: '2', label: 'Beach', gradient: 'from-[#1e3a8a] to-[#1d4ed8]' },
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
      {
        id: '2',
        label: '街舞',
        gradient: 'from-[#164e63] to-[#155e75]',
        videoSrc: '/media/WeChat_20260511234357.mp4',
      },
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
