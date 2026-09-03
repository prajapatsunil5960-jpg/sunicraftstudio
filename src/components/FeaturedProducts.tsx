import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useStore } from '@/store/StoreContext';
import { Loader2 } from 'lucide-react';

const tabs = [
  { key: 'featured', label: 'Featured' },
  { key: 'bestseller', label: 'Best Sellers' },
  { key: 'new', label: 'New Arrivals' },
];

export function FeaturedProducts({ onSelect }: { onSelect: (id: string) => void }) {
  const { ref, visible } = useReveal();
  const [active, setActive] = useState('featured');
  const { products, loading } = useProducts();
  const { activeCategory, setActiveCategory } = useStore();

  const filtered = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (active === 'featured') return p.featured;
    if (active === 'bestseller') return p.bestSeller;
    if (active === 'new') return p.newArrival;
    return true;
  });

  return (
    <section id="products" className="py-16 lg:py-24 bg-gray-50">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            Our Collection
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            {activeCategory ? activeCategory : 'Featured Products'}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Handcrafted personalized gifts and photo frames, made with your
            precious memories. Choose your favourite and order on WhatsApp.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === t.key
                  ? 'bg-coral-500 text-white shadow-md shadow-coral-200'
                  : 'bg-white text-gray-600 hover:text-coral-600 border border-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin text-coral-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No products found in this category yet.</p>
            <button
              onClick={() => setActiveCategory(null)}
              className="text-coral-600 font-semibold hover:text-coral-700 transition-colors"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={onSelect} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="#categories"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 transition-colors"
          >
            View All Categories
          </a>
        </div>
      </div>
    </section>
  );
}
