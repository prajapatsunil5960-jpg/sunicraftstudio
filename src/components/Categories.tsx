import { useReveal } from '@/hooks/useReveal';
import { categories } from '@/data/products';
import { useStore } from '@/store/StoreContext';

export function Categories() {
  const { ref, visible } = useReveal();
  const { activeCategory, setActiveCategory } = useStore();

  return (
    <section id="categories" className="py-16 lg:py-24 bg-white">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            Shop by Category
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            Find the Perfect Gift
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our range of customized photo frames and personalized gifts
            for every occasion and every special person in your life.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() =>
                setActiveCategory(activeCategory === c.name ? null : c.name)
              }
              className={`group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 aspect-square ${
                activeCategory === c.name
                  ? 'bg-coral-50 border-coral-400 shadow-md shadow-coral-100'
                  : 'bg-gray-50 hover:bg-coral-50 border-transparent hover:border-coral-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 shadow-sm ${
                  activeCategory === c.name
                    ? 'bg-coral-500 text-white'
                    : 'bg-white group-hover:bg-coral-500 text-coral-500 group-hover:text-white'
                }`}
              >
                {c.icon}
              </div>
              <div className="text-center">
                <div
                  className={`text-sm font-semibold transition-colors ${
                    activeCategory === c.name
                      ? 'text-coral-700'
                      : 'text-gray-700 group-hover:text-coral-700'
                  }`}
                >
                  {c.name}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{c.count} products</div>
              </div>
            </button>
          ))}
        </div>

        {activeCategory && (
          <div className="text-center mt-8">
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors"
            >
              Clear filter: {activeCategory}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
