export interface Product {
  id: string;
  name: string;
  shortName: string;
  vendor: string;
  vendorGroup: VendorGroup;
  slogan: string;
  description: string;
  platforms: Platform[];
  platformLabel: string;
  deployType: string;
  deployTypeCategory: DeployTypeCategory;
  price: string;
  priceCategory: PriceCategory;
  openSource: boolean;
  privacy: PrivacyType;
  aiModel: string;
  messagePlatforms: string;
  messagePlatformCount: number;
  skills: string;
  difficulty: number;
  features: string[];
  pros: string[];
  cons: string[];
  audience: string[];
  tags: string[];
  tagCategories: TagCategory[];
  website: string;
  github: string | null;
  color: string;
  logoUrl: string;
  status: Status;
  releaseDate: string;
  updatedAt: string;
}

export type VendorGroup =
  | '开源社区' | '腾讯系' | '阿里系' | '百度系' | '字节系'
  | 'MiniMax' | '智谱AI' | '月之暗面' | '小米' | '华为'
  | '万得' | '七牛云' | '阶跃AI' | '猎豹移动' | '社区/极客' | 'OPPO';

export type Platform = 'desktop' | 'web' | 'mobile' | 'multi';
export type DeployTypeCategory = 'local' | 'cloud' | 'preinstalled';
export type PriceCategory = 'free' | 'open-source' | 'paid' | 'freemium';
export type PrivacyType = 'local' | 'cloud' | 'hybrid';
export type Status = 'active' | 'beta' | 'coming-soon';
export type TagCategory =
  | 'desktop' | 'web' | 'mobile' | 'free' | 'open-source'
  | 'local-deploy' | 'cloud-deploy' | 'enterprise' | 'personal';

export interface NewsItem {
  date: string;
  type: 'release' | 'update' | 'other';
  product: string;
  title: string;
  summary: string;
  source: string;
}

export interface VendorGroupInfo {
  name: VendorGroup;
  color: string;
  products: Product[];
}
