import { useState, useEffect, useMemo, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  slogan: string;
  vendor: string;
  vendorGroup: string;
  platformLabel: string;
  price: string;
  priceCategory: string;
  difficulty: number;
  logoUrl: string;
  tagCategories: string[];
  status: string;
  features: string[];
}

interface Props {
  products: Product[];
}

const FILTER_CATS = [
  { key: 'desktop', label: '桌面端' },
  { key: 'web', label: '网页端' },
  { key: 'mobile', label: '手机端' },
  { key: 'free', label: '免费' },
  { key: 'open-source', label: '开源' },
  { key: 'local-deploy', label: '本地部署' },
  { key: 'cloud-deploy', label: '云端部署' },
];

const VENDOR_GROUPS = [
  '全部', '开源社区', '腾讯系', '阿里系', '百度系', '字节系',
  'MiniMax', '智谱AI', '月之暗面', '小米', '华为', '万得',
  '七牛云', '阶跃AI', '猎豹移动', '社区/极客', 'OPPO'
];

const VENDOR_COLORS: Record<string, string> = {
  '开源社区': '#636E72', '腾讯系': '#07C160', '阿里系': '#FF6A00',
  '百度系': '#2932E1', '字节系': '#3370FF', 'MiniMax': '#E84393',
  '智谱AI': '#6C5CE7', '月之暗面': '#00B894', '小米': '#FF6900',
  '华为': '#CF0A2C', '万得': '#FDCB6E', '七牛云': '#2D9CDB',
  '阶跃AI': '#A29BFE', '猎豹移动': '#00CEC9', '社区/极客': '#B2BEC3',
  'OPPO': '#1D8348',
};

const TAG_LABELS: Record<string, string> = {
  'desktop': '桌面端', 'web': '网页端', 'mobile': '手机端', 'multi': '多端',
  'free': '免费', 'open-source': '开源', 'local-deploy': '本地部署',
  'cloud-deploy': '云端部署', 'enterprise': '企业级', 'personal': '个人版',
};

export default function HomeClient({ products }: Props) {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeVendor, setActiveVendor] = useState('全部');
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('claw-compare-list');
    if (stored) {
      try { setCompareList(JSON.parse(stored)); } catch {}
    }
  }, []);

  const toggleFilter = useCallback((key: string) => {
    setActiveFilters(prev => {
      const next = prev.includes(key)
        ? prev.filter(x => x !== key)
        : [...prev, key];
      if (next.length > 0) {
        // remove 'all' if exists
        return next.filter(x => x !== 'all');
      }
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const match = p.name.toLowerCase().includes(q)
          || p.vendor.toLowerCase().includes(q)
          || p.slogan.toLowerCase().includes(q)
          || p.features.some(f => f.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Category filters (AND)
      if (activeFilters.length > 0) {
        const hasAll = activeFilters.every(f => p.tagCategories.includes(f));
        if (!hasAll) return false;
      }

      // Vendor filter
      if (activeVendor !== '全部' && p.vendorGroup !== activeVendor) return false;

      return true;
    });
  }, [products, search, activeFilters, activeVendor]);

  const toggleCompare = useCallback((id: string) => {
    setCompareList(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 6 ? [...prev, id] : prev;
      localStorage.setItem('claw-compare-list', JSON.stringify(next));
      window.dispatchEvent(new Event('compare-changed'));
      return next;
    });
  }, []);

  return (
    <>
      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A5A6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="搜索产品名称、厂商或关键词..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#16161F] border border-[#2A2A3A] rounded-xl pl-12 pr-4 py-3 text-sm text-[#E8E8ED] placeholder-[#5A5A6E] focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {FILTER_CATS.map(f => (
          <button
            key={f.key}
            onClick={() => toggleFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilters.includes(f.key)
                ? 'bg-[#FF6B35] text-white'
                : 'bg-[#16161F] text-[#9898A6] border border-[#2A2A3A] hover:text-[#E8E8ED] hover:border-[#3A3A4A]'
            }`}
          >
            {f.label}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#FF6B35] hover:bg-[#FF6B35]/10 transition-colors"
          >
            重置
          </button>
        )}
      </div>

      {/* Vendor Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {VENDOR_GROUPS.map(v => (
          <button
            key={v}
            onClick={() => setActiveVendor(v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeVendor === v
                ? 'bg-[#16161F] text-[#E8E8ED] border border-[#FF6B35]'
                : 'bg-transparent text-[#9898A6] hover:text-[#E8E8ED]'
            }`}
          >
            {v !== '全部' && (
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: VENDOR_COLORS[v] || '#B2BEC3' }}></span>
            )}
            {v}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-[#9898A6]">
        找到 <span className="text-[#FF6B35] font-bold">{filtered.length}</span> 个产品
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {filtered.map(p => {
            const vendorColor = VENDOR_COLORS[p.vendorGroup] || '#B2BEC3';
            const isCompared = compareList.includes(p.id);
            return (
              <div
                key={p.id}
                className={`bg-[#16161F] rounded-xl border p-5 transition-all duration-300 cursor-pointer hover:bg-[#1E1E2A] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 group ${
                  isCompared ? 'border-[#FF6B35]/50' : 'border-[#2A2A3A]'
                }`}
                onClick={() => window.location.href = `/product/${p.id}`}
              >
                {/* Color bar */}
                <div className="h-1 w-full rounded-full mb-4" style={{ background: vendorColor }}></div>

                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl flex-shrink-0">{p.logoUrl}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-[#E8E8ED] group-hover:text-[#FF6B35] transition-colors truncate">{p.name}</h3>
                    <p className="text-sm text-[#9898A6] truncate">{p.slogan}</p>
                  </div>
                </div>

                {/* Vendor */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: vendorColor }}></span>
                  <span className="text-xs text-[#5A5A6E]">{p.vendor}</span>
                  {p.status === 'beta' && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-medium">Beta</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tagCategories.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ['free', 'open-source'].includes(tag)
                          ? 'bg-[#FF6B35]/15 text-[#FF6B35]'
                          : 'bg-[#2A2A3A]/50 text-[#9898A6]'
                      }`}
                    >
                      {TAG_LABELS[tag] || tag}
                    </span>
                  ))}
                </div>

                {/* Difficulty */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-[#5A5A6E]">难度</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < p.difficulty ? 'text-[#FF6B35]' : 'text-[#2A2A3A]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className={`text-sm font-medium ${
                    ['free', 'open-source'].includes(p.priceCategory) ? 'text-[#4ECDC4]' : 'text-[#FF6B35]'
                  }`}>
                    {p.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#2A2A3A]">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompare(p.id); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                      isCompared
                        ? 'border-[#FF6B35] text-[#FF6B35] bg-[#FF6B35]/10'
                        : 'border-[#2A2A3A] text-[#9898A6] hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FF6B35]/10'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCompared ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                    </svg>
                    <span>{isCompared ? '已加入' : '加入对比'}</span>
                  </button>
                  <span className="text-sm text-[#FF6B35] flex items-center gap-1 group-hover:underline">
                    查看详情
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-4xl mb-4 block">🔍</span>
          <p className="text-[#9898A6] text-lg">没有找到匹配的产品</p>
          <p className="text-[#5A5A6E] text-sm mt-2">试试调整筛选条件或搜索关键词</p>
          <button
            onClick={() => { setSearch(''); setActiveFilters([]); setActiveVendor('全部'); }}
            className="mt-4 px-4 py-2 rounded-lg text-sm text-[#FF6B35] hover:bg-[#FF6B35]/10 transition-colors"
          >
            重置所有筛选
          </button>
        </div>
      )}
    </>
  );
}
