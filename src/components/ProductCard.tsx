import { Star, Heart, MessageCircle, ShoppingCart, Check } from 'lucide-react';
import type { Product } from '@/hooks/useProducts';
import { buildWhatsAppLink } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import { useState } from 'react';

export function ProductCard({ product, onSelect }: { product: Product; onSelect: (id: string) => void }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = useState(false);
  const orderMsg = `Hi SuniCraftStudio! I'd like to order: ${product.name} (₹${product.price}). Please share customization details.`;

  const wishlisted = isWishlisted(product.id);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleHeart(e: React.MouseEvent) {
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-coral-200 hover:shadow-xl hover:shadow-coral-100/40 transition-all duration-300">
      <div
        className="relative zoom-container aspect-square bg-gray-50 cursor-pointer"
        onClick={() => onSelect(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-semibold shadow-md">
            {product.badge}
          </span>
        )}
        <button
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all shadow-sm ${
            wishlisted
              ? 'bg-coral-500 text-white'
              : 'bg-white/90 text-gray-400 hover:text-coral-500 hover:bg-white'
          }`}
          aria-label="Add to wishlist"
          onClick={handleHeart}
        >
          <Heart size={17} className={wishlisted ? 'fill-white' : ''} />
        </button>
        {product.oldPrice && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-gold-400 text-white text-xs font-bold">
            {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2">
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>

        <h3
          className="font-semibold text-gray-800 text-sm sm:text-base mb-1 line-clamp-1 cursor-pointer hover:text-coral-600 transition-colors"
          onClick={() => onSelect(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-gray-800">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-coral-500 hover:bg-coral-600 text-white text-xs font-semibold transition-all"
            >
              {added ? (
                <>
                  <Check size={14} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  Add
                </>
              )}
            </button>
            <a
              href={buildWhatsAppLink(orderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-coral-50 hover:bg-coral-500 text-coral-600 hover:text-white text-xs font-semibold transition-all border border-coral-200 hover:border-coral-500"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
