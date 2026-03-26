import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  logoUrl: string;
}

interface Props {
  products: Product[];
}

export default function CompareFloatBar({ products }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('claw-compare-list');
    if (stored) {
      try {
        const list = JSON.parse(stored) as string[];
        setSelected(list);
      } catch {}
    }

    const handleStorage = () => {
      const s = localStorage.getItem('claw-compare-list');
      if (s) {
        try { setSelected(JSON.parse(s)); } catch {}
      } else {
        setSelected([]);
      }
    };

    window.addEventListener('compare-changed', handleStorage);
    return () => window.removeEventListener('compare-changed', handleStorage);
  }, []);

  useEffect(() => {
    setVisible(selected.length > 0);
  }, [selected]);

  const removeFromCompare = (id: string) => {
    const next = selected.filter(x => x !== id);
    setSelected(next);
    localStorage.setItem('claw-compare-list', JSON.stringify(next));
    window.dispatchEvent(new Event('compare-changed'));
  };

  const clearAll = () => {
    setSelected([]);
    localStorage.removeItem('claw-compare-list');
    window.dispatchEvent(new Event('compare-changed'));
  };

  const selectedProducts = products.filter(p => selected.includes(p.id));

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#16161F]/95 backdrop-blur-md border-t border-[#2A2A3A] shadow-xl shadow-black/30 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Selected products */}
          <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0">
            <span className="text-sm text-[#9898A6] flex-shrink-0">
              已选 <span className="text-[#FF6B35] font-bold">{selected.length}</span> 个
            </span>
            <div className="flex items-center gap-2">
              {selectedProducts.map(p => (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 bg-[#0A0A0F] border border-[#2A2A3A] rounded-lg px-2.5 py-1 flex-shrink-0"
                >
                  <span className="text-sm">{p.logoUrl}</span>
                  <span className="text-xs text-[#E8E8ED] max-w-[80px] truncate">{p.name}</span>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="text-[#5A5A6E] hover:text-red-400 transition-colors ml-0.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={clearAll}
              className="px-3 py-1.5 rounded-lg text-sm text-[#9898A6] hover:text-[#E8E8ED] border border-[#2A2A3A] hover:border-[#3A3A4A] transition-colors"
            >
              清空
            </button>
            <a
              href="/compare"
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 transition-colors flex items-center gap-1.5"
            >
              开始对比
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
