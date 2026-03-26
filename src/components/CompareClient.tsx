import { useState, useEffect, useMemo, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  slogan: string;
  vendor: string;
  vendorGroup: string;
  platformLabel: string;
  deployType: string;
  price: string;
  priceCategory: string;
  openSource: boolean;
  privacy: string;
  aiModel: string;
  messagePlatforms: string;
  messagePlatformCount: number;
  skills: string;
  difficulty: number;
  features: string[];
  pros: string[];
  cons: string[];
  audience: string[];
  tagCategories: string[];
  status: string;
  logoUrl: string;
  website: string;
  github: string | null;
}

interface Props {
  products: Product[];
}

const VENDOR_COLORS: Record<string, string> = {
  '开源社区': '#636E72', '腾讯系': '#07C160', '阿里系': '#FF6A00',
  '百度系': '#2932E1', '字节系': '#3370FF', 'MiniMax': '#E84393',
  '智谱AI': '#6C5CE7', '月之暗面': '#00B894', '小米': '#FF6900',
  '华为': '#CF0A2C', '万得': '#FDCB6E', '七牛云': '#2D9CDB',
  '阶跃AI': '#A29BFE', '猎豹移动': '#00CEC9', '社区/极客': '#B2BEC3',
  'OPPO': '#1D8348',
};

const PRIVACY_LABELS: Record<string, string> = { local: '本地存储', cloud: '云端存储', hybrid: '混合存储' };

const PRESET_PK = [
  { label: '🔥 腾讯 vs 阿里', ids: ['workbuddy', 'copaw'] },
  { label: '💰 免费三强', ids: ['workbuddy', 'arkclaw', 'duclaw'] },
  { label: '🧠 专业版对决', ids: ['kimi-claw', 'maxclaw', 'windclaw'] },
  { label: '🔧 开源对决', ids: ['openclaw', 'copaw', 'nanoclaw'] },
  { label: '📱 手机端对决', ids: ['miclaw', 'xiaoyi-claw', 'redclaw', 'xiaobu-claw'] },
];

function CompareTable({ products }: { products: Product[] }) {
  if (products.length < 2) return null;

  const rows = [
    { label: '厂商', key: 'vendor' },
    { label: '一句话定位', key: 'slogan' },
    { label: '平台', key: 'platformLabel' },
    { label: '部署方式', key: 'deployType' },
    { label: '价格', key: 'price', highlight: true },
    { label: '难度', key: 'difficulty', isDifficulty: true },
    { label: 'AI模型', key: 'aiModel' },
    { label: '隐私模式', key: 'privacy', isPrivacy: true },
    { label: '消息平台', key: 'messagePlatforms' },
    { label: 'Skills生态', key: 'skills' },
    { label: '核心功能', key: 'features', isList: true },
    { label: '优势', key: 'pros', isList: true, color: '#4ECDC4' },
    { label: '不足', key: 'cons', isList: true, color: '#EF4444' },
    { label: '适合人群', key: 'audience', isTags: true },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#2A2A3A]">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-[#16161F]">
            <th className="text-left p-4 text-sm text-[#5A5A6E] font-medium w-32 sticky left-0 bg-[#16161F] z-10 border-r border-[#2A2A3A]">对比维度</th>
            {products.map(p => (
              <th key={p.id} className="p-4 text-left min-w-[200px]">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{p.logoUrl}</span>
                  <div>
                    <div className="text-sm font-bold text-[#E8E8ED]">{p.name}</div>
                    <div className="text-xs text-[#5A5A6E]">{p.vendor}</div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.key} className={`${ri % 2 === 0 ? 'bg-[#0A0A0F]/50' : 'bg-[#16161F]/50'} ${ri === rows.length - 1 ? '' : 'border-b border-[#2A2A3A]/50'}`}>
              <td className="p-4 text-sm text-[#5A5A6E] font-medium sticky left-0 z-10 border-r border-[#2A2A3A]" style={{ background: ri % 2 === 0 ? '#0A0A0F80' : '#16161F80' }}>
                {row.label}
              </td>
              {products.map(p => {
                const val = (p as any)[row.key];
                return (
                  <td key={p.id} className="p-4 text-sm text-[#9898A6] align-top">
                    {row.isDifficulty ? (
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < val ? 'text-[#FF6B35]' : 'text-[#2A2A3A]'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    ) : row.isPrivacy ? (
                      <span>{PRIVACY_LABELS[val] || val}</span>
                    ) : row.isList ? (
                      <ul className="space-y-1">
                        {(val as string[]).map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span style={{ color: row.color || '#9898A6' }} className="mt-0.5 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : row.isTags ? (
                      <div className="flex flex-wrap gap-1.5">
                        {(val as string[]).map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-[#FF6B35]/10 text-[#FF6B35] text-xs">{tag}</span>
                        ))}
                      </div>
                    ) : row.highlight ? (
                      <span className={`font-medium ${['free', 'open-source'].includes(p.priceCategory) ? 'text-[#4ECDC4]' : 'text-[#FF6B35]'}`}>
                        {val}
                      </span>
                    ) : (
                      <span>{val}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {/* Footer with links */}
        <tfoot>
          <tr className="border-t border-[#2A2A3A] bg-[#16161F]">
            <td className="p-4 text-sm text-[#5A5A6E] font-medium sticky left-0 bg-[#16161F] z-10 border-r border-[#2A2A3A]">操作</td>
            {products.map(p => (
              <td key={p.id} className="p-4">
                <div className="flex gap-2">
                  <a href={`/product/${p.id}`} className="text-xs text-[#FF6B35] hover:underline">查看详情</a>
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-xs text-[#9898A6] hover:text-[#E8E8ED]">官网</a>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-xs text-[#9898A6] hover:text-[#E8E8ED]">GitHub</a>
                  )}
                </div>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function CompareClient({ products }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(true);

  useEffect(() => {
    // Read from localStorage or URL params
    const stored = localStorage.getItem('claw-compare-list');
    if (stored) {
      try { setSelectedIds(JSON.parse(stored)); } catch {}
    }

    // URL params
    const params = new URLSearchParams(window.location.search);
    const ids = params.get('ids');
    if (ids) {
      const idList = ids.split(',').filter(id => products.some(p => p.id === id));
      if (idList.length >= 2) {
        setSelectedIds(prev => [...new Set([...prev, ...idList])].slice(0, 4));
      }
    }

    // Listen for changes
    const handler = () => {
      const s = localStorage.getItem('claw-compare-list');
      if (s) {
        try { setSelectedIds(JSON.parse(s)); } catch {}
      }
    };
    window.addEventListener('compare-changed', handler);
    return () => window.removeEventListener('compare-changed', handler);
  }, [products]);

  useEffect(() => {
    // Sync to URL
    if (selectedIds.length >= 2) {
      const params = new URLSearchParams();
      params.set('ids', selectedIds.join(','));
      window.history.replaceState({}, '', `/compare?${params.toString()}`);
    }
  }, [selectedIds]);

  const selectedProducts = useMemo(() => {
    return selectedIds.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
  }, [selectedIds, products]);

  const addProduct = useCallback((id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id) || prev.length >= 4) return prev;
      const next = [...prev, id];
      localStorage.setItem('claw-compare-list', JSON.stringify(next));
      window.dispatchEvent(new Event('compare-changed'));
      return next;
    });
  }, []);

  const removeProduct = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = prev.filter(x => x !== id);
      localStorage.setItem('claw-compare-list', JSON.stringify(next));
      window.dispatchEvent(new Event('compare-changed'));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedIds([]);
    localStorage.removeItem('claw-compare-list');
    window.dispatchEvent(new Event('compare-changed'));
  }, []);

  const applyPreset = useCallback((ids: string[]) => {
    setSelectedIds(ids);
    localStorage.setItem('claw-compare-list', JSON.stringify(ids));
    window.dispatchEvent(new Event('compare-changed'));
  }, []);

  const availableProducts = useMemo(() => {
    return products.filter(p => !selectedIds.includes(p.id));
  }, [products, selectedIds]);

  if (selectedProducts.length < 2) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Preset PK */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#E8E8ED] mb-4">⚡ 快速对比</h2>
          <div className="flex flex-wrap gap-3">
            {PRESET_PK.map(pk => (
              <button
                key={pk.label}
                onClick={() => applyPreset(pk.ids)}
                className="px-4 py-2 rounded-xl bg-[#16161F] border border-[#2A2A3A] text-sm text-[#9898A6] hover:text-[#E8E8ED] hover:border-[#FF6B35] transition-colors"
              >
                {pk.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected count */}
        {selectedProducts.length > 0 && (
          <div className="bg-[#16161F] rounded-xl border border-[#2A2A3A] p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#9898A6]">
                已选 <span className="text-[#FF6B35] font-bold">{selectedProducts.length}</span>/4 个产品
              </span>
              <button onClick={clearAll} className="text-xs text-[#5A5A6E] hover:text-red-400 transition-colors">清空</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map(p => (
                <div key={p.id} className="flex items-center gap-2 bg-[#0A0A0F] border border-[#2A2A3A] rounded-lg px-3 py-1.5">
                  <span>{p.logoUrl}</span>
                  <span className="text-sm text-[#E8E8ED]">{p.name}</span>
                  <button onClick={() => removeProduct(p.id)} className="text-[#5A5A6E] hover:text-red-400 text-xs ml-1">✕</button>
                </div>
              ))}
              <span className="text-xs text-[#5A5A6E] self-center">还需选择 {2 - selectedProducts.length} 个</span>
            </div>
          </div>
        )}

        {/* Product Grid to select */}
        <h2 className="text-lg font-bold text-[#E8E8ED] mb-4">
          📋 选择产品进行对比
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableProducts.map(p => {
            const vc = VENDOR_COLORS[p.vendorGroup] || '#B2BEC3';
            return (
              <button
                key={p.id}
                onClick={() => addProduct(p.id)}
                disabled={selectedIds.length >= 4}
                className="flex items-center gap-3 bg-[#16161F] rounded-xl border border-[#2A2A3A] p-4 text-left hover:bg-[#1E1E2A] hover:border-[#3A3A4A] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">{p.logoUrl}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-[#E8E8ED] truncate">{p.name}</div>
                  <div className="text-xs text-[#5A5A6E] truncate">{p.slogan}</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: vc }}></span>
                <svg className="w-4 h-4 text-[#5A5A6E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {selectedProducts.map(p => {
            const vc = VENDOR_COLORS[p.vendorGroup] || '#B2BEC3';
            return (
              <div key={p.id} className="flex items-center gap-2 bg-[#16161F] border border-[#2A2A3A] rounded-lg px-3 py-2">
                <span className="w-2 h-2 rounded-full" style={{ background: vc }}></span>
                <span className="text-xl">{p.logoUrl}</span>
                <span className="text-sm font-medium text-[#E8E8ED]">{p.name}</span>
                <button onClick={() => removeProduct(p.id)} className="text-[#5A5A6E] hover:text-red-400 text-xs ml-1">✕</button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="px-3 py-1.5 rounded-lg text-sm text-[#9898A6] border border-[#2A2A3A] hover:border-[#3A3A4A] hover:text-[#E8E8ED] transition-colors"
          >
            {showSelector ? '收起选择器' : '更换产品'}
          </button>
          <button onClick={clearAll} className="px-3 py-1.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors">
            清空对比
          </button>
        </div>
      </div>

      {/* Selector (collapsible) */}
      {showSelector && selectedIds.length < 4 && (
        <div className="mb-6 bg-[#16161F] rounded-xl border border-[#2A2A3A] p-4">
          <div className="text-xs text-[#5A5A6E] mb-3">添加更多产品（最多4个）</div>
          <div className="flex flex-wrap gap-2">
            {availableProducts.map(p => (
              <button
                key={p.id}
                onClick={() => addProduct(p.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[#9898A6] border border-[#2A2A3A] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                <span>{p.logoUrl}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Compare Table */}
      <CompareTable products={selectedProducts} />
    </div>
  );
}
