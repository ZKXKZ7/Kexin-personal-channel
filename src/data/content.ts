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

/** 弹窗内单张卡片：渐变占位，或可选 videoSrc（站点根路径，如 /media/foo.mp4） */
export type TripPhoto = {
  id: string;
  label: string;
  gradient: string;
  /** 站点根路径图片，如 /media/margin/margin-1.png */
  imageSrc?: string;
  videoSrc?: string;
  /** 无图、无视频时：在主区域以标签形式展示（如 BUPT 本科卡） */
  bodyTags?: string[];
  /**
   * 标签条在渐变上的底色与边框（Tailwind 片段），与同卡片 `gradient` 同色系时更协调。
   * 省略则使用中性半透明样式。
   */
  bodyTagSurfaceClass?: string;
  /**
   * 从数组开头起若干条各占一行（整宽），其余再按「前两枚并排、后续整宽」展示。
   * 默认 0（即整卡沿用前两枚并排规则）。
   */
  bodyTagsLeadFullWidthCount?: number;
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

/** BUPT 弹窗：硕士段 + 本科段分块（仅 Chapters of BUPT 使用） */
export type BuptChapterModalData = {
  /** 硕士段标题第一行 */
  masterHeadingLine1: string;
  /** 硕士段标题第二行 */
  masterHeadingLine2: string;
  masterCards: TripPhoto[];
  /** 本科段标题第一行 */
  bachelorHeadingLine1: string;
  /** 本科段标题第二行 */
  bachelorHeadingLine2: string;
  bachelorCards: TripPhoto[];
};

/** Portfolio 模块卡 + 弹窗相册（与 Travel 共用 TravelGalleryModal） */
export type PortfolioModule = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  /** 弹窗标题下副标题；省略为 tags 用 · 拼接 */
  modalSubtitle?: string;
  /** 弹窗正文；省略则用 description */
  modalDetail?: string;
  photos: TripPhoto[];
  /** 若存在，打开 BUPT 分章弹窗，不再使用扁平 photos 弹窗 */
  buptChapterModal?: BuptChapterModalData;
};

export function portfolioModuleToTrip(m: PortfolioModule): TravelTrip {
  return {
    id: m.id,
    name: m.title,
    region: m.modalSubtitle ?? m.tags.join(' · '),
    icon: m.icon,
    photos: m.buptChapterModal ? [] : m.photos,
    modalIntro: m.buptChapterModal ? '' : (m.modalDetail ?? m.description).trim(),
  };
}

export const portfolioModules: PortfolioModule[] = [
  {
    id: 'bupt',
    title: 'Chapters of BUPT',
    description:
      '在北邮的学科训练与学术轨道：从校园与课程到竞赛、课题与论文导向的探索，把问题定义清楚再动手实现。（可按你的经历改写）',
    tags: ['University', 'Academic Orbit'],
    icon: GraduationCap,
    photos: [],
    buptChapterModal: {
      masterHeadingLine1: '硕士 · 北京邮电大学  2025.09-2028.07',
      masterHeadingLine2: '计算机学院 （国家示范性软件学院）计算机科学与技术',
      masterCards: [
        { id: 'm1', label: '网络与交换技术国家重点实验室', gradient: 'from-[#1e3a5f] to-[#0f172a]' },
        { id: 'm2', label: '硕士片段二', gradient: 'from-[#312e81] to-[#1e1b4b]' },
        { id: 'm3', label: '硕士片段三', gradient: 'from-[#164e63] to-[#0f766e]' },
      ],
      bachelorHeadingLine1: '本科 · 北京邮电大学  2021.09-2025.07',
      bachelorHeadingLine2: '国际学院 E-commerce Engineering with Law 一等荣誉学位',
      bachelorCards: [
        {
          id: 'b1',
          label: '来时路',
          gradient: 'from-[#1c1917] to-[#44403c]',
          bodyTagSurfaceClass:
            'border border-stone-200/20 bg-stone-950/50 shadow-sm backdrop-blur-[2px]',
          bodyTags: [
            'GPA: 3.7/4',
            '均分: 89/100',
            'Ranking（智育）: 6/180',
            'CET-4: 649    CET-6: 611\nIELTS: 7.5（Reading 9）',
          ],
        },
        {
          id: 'b2',
          label: '本科片段二',
          gradient: 'from-[#4c0519] to-[#831843]',
          bodyTagSurfaceClass:
            'border border-rose-200/15 bg-rose-950/45 shadow-sm backdrop-blur-[2px]',
          bodyTagsLeadFullWidthCount: 2,
          bodyTags: [
            '国家奖学金（1/180）',
            '菁英领袖学生代表（单人面试轮第一名1/680）-赴伦敦玛丽女王大学奖优交流',
            '校一等奖学金',
            '三好学生',
          ],
        },
        { id: 'b3', label: '本科片段三', gradient: 'from-[#0c4a6e] to-[#155e75]' },
        { id: 'b4', label: '本科片段四', gradient: 'from-[#14532d] to-[#166534]' },
        { id: 'b5', label: '本科片段五', gradient: 'from-[#78350f] to-[#92400e]' },
        { id: 'b6', label: '本科片段六', gradient: 'from-[#312e81] to-[#4c1d95]' },
      ],
    },
  },
  {
    id: 'career',
    title: 'Career Exploration',
    description:
      '在百度、字节、保时捷数字产品与产品视角下的迭代与沉淀：需求拆解、实验验证与跨团队推进。（替换为你的岗位与成果描述。）',
    tags: ['Baidu', 'Bytedance', 'Porsche Digital', 'Product'],
    icon: Layers,
    photos: [
      { id: '1', label: 'Baidu', gradient: 'from-[#1e3a5f] to-[#0f172a]' },
      { id: '2', label: 'Bytedance', gradient: 'from-[#134e4a] to-[#0f766e]' },
      { id: '3', label: 'Porsche Digital', gradient: 'from-[#78350f] to-[#92400e]' },
      { id: '4', label: 'Product', gradient: 'from-[#312e81] to-[#4c1d95]' },
    ],
  },
  {
    id: 'margin',
    title: 'Beyond the Margin',
    description: '鸿雁青年志愿者协会 外联部部长 2021.10-2023.6',
    tags: ['Public Relations Department'],
    icon: Megaphone,
    photos: [
      {
        id: 'pr1',
        label: 'ArchSummit 全球架构师峰会北京站',
        gradient: 'from-[#164e63] to-[#0f766e]',
        imageSrc: '/media/margin/margin-3.png',
      },
      {
        id: 'pr2',
        label: '五棵松凯迪拉克中心老狼演唱会',
        gradient: 'from-[#1c1917] to-[#292524]',
        imageSrc: '/media/margin/margin-4.png',
      },
      {
        id: 'pr3',
        label: '国际学院招新宣讲',
        gradient: 'from-[#1e3a5f] to-[#0f172a]',
        imageSrc: '/media/margin/margin-1.png',
      },
      {
        id: 'pr4',
        label: '外联部活动合影',
        gradient: 'from-[#312e81] to-[#1e1b4b]',
        imageSrc: '/media/margin/margin-2.png',
      },
    ],
  },
];

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
        videoSrc: '/media/panyan.mp4',
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
