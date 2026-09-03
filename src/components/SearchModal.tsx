import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useProducts } from '@/hooks/useProducts';

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false);
    }
    if (searchOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    : [];

  function openProduct(id: string) {
    setSearchOpen(false);
    window.location.hash = `product/${id}`;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setSearchOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Search bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for frames, mugs, gifts..."
            className="flex-1 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-gray-400">Start typing to search products</p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-gray-400">
                No products found for "{query}"
              </p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openProduct(p.id)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 flex-shrink-0">
                    ₹{p.price}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
