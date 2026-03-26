// 厂商阵营配色映射
export const VENDOR_COLORS: Record<string, string> = {
  '开源社区': '#636E72',
  '腾讯系': '#07C160',
  '阿里系': '#FF6A00',
  '百度系': '#2932E1',
  '字节系': '#3370FF',
  'MiniMax': '#E84393',
  '智谱AI': '#6C5CE7',
  '月之暗面': '#00B894',
  '小米': '#FF6900',
  '华为': '#CF0A2C',
  '万得': '#FDCB6E',
  '七牛云': '#2D9CDB',
  '阶跃AI': '#A29BFE',
  '猎豹移动': '#00CEC9',
  '社区/极客': '#B2BEC3',
  'OPPO': '#1D8348',
};

// 标签中英文映射
export const TAG_LABELS: Record<string, string> = {
  'desktop': '桌面端',
  'web': '网页端',
  'mobile': '手机端',
  'multi': '多端',
  'free': '免费',
  'open-source': '开源',
  'local-deploy': '本地部署',
  'cloud-deploy': '云端部署',
  'enterprise': '企业级',
  'personal': '个人版',
};

// 部署方式映射
export const DEPLOY_TYPE_LABELS: Record<string, string> = {
  'local': '本地部署',
  'cloud': '云端部署',
  'preinstalled': '系统预装',
};

// 价格分类映射
export const PRICE_LABELS: Record<string, string> = {
  'free': '免费',
  'open-source': '免费开源',
  'paid': '付费',
  'freemium': '免费+增值',
};

// 状态映射
export const STATUS_LABELS: Record<string, string> = {
  'active': '活跃',
  'beta': '公测中',
  'coming-soon': '即将上线',
};

// 筛选分类
export const FILTER_CATEGORIES = [
  { key: 'desktop', label: '桌面端' },
  { key: 'web', label: '网页端' },
  { key: 'mobile', label: '手机端' },
  { key: 'free', label: '免费' },
  { key: 'open-source', label: '开源' },
  { key: 'local-deploy', label: '本地部署' },
  { key: 'cloud-deploy', label: '云端部署' },
] as const;

// 厂商筛选
export const VENDOR_GROUPS = [
  '全部', '开源社区', '腾讯系', '阿里系', '百度系', '字节系', 'MiniMax', '智谱AI', '月之暗面', '小米', '华为', '万得', '七牛云', '阶跃AI', '猎豹移动', '社区/极客', 'OPPO'
] as const;

export const SITE_NAME = 'Claw Navigator';
export const SITE_DESCRIPTION = '🦞 Claw/龙虾 AI Agent 生态导航 — 一站式发现、对比、选择最适合你的智能体';
