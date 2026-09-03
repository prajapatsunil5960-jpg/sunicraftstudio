import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { buildWhatsAppLink } from '@/data/products';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, clearCart } = useStore();

  const orderMsg = `Hi SuniCraftStudio! I'd like to order:\n\n${cart
    .map((c) => `• ${c.product.name} x${c.qty} = ₹${c.product.price * c.qty}`)
    .join('\n')}\n\nTotal: ₹${cartTotal}\n\nPlease share customization details and payment info.`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-coral-500" />
            <h2 className="font-bold text-gray-800 text-lg">Your Cart</h2>
            <span className="text-sm text-gray-400">({cart.length})</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <p className="font-semibold text-gray-700 mb-1">Your cart is empty</p>
            <p className="text-sm text-gray-400">Add products to get started.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">{item.product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-200">
                      <button
                        onClick={() => updateQty(item.product.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-coral-600 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold text-gray-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-coral-600 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-800">
                        ₹{item.product.price * item.qty}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-bold text-xl text-gray-800">₹{cartTotal}</span>
            </div>
            <a
              href={buildWhatsAppLink(orderMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold shadow-lg shadow-coral-200 transition-all"
            >
              <MessageCircle size={20} />
              Order on WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
