import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '@/hooks/useProducts';

export type CartItem = {
  product: Product;
  qty: number;
  size?: string;
  design?: string;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  activeCategory: string | null;
  searchOpen: boolean;
  cartOpen: boolean;
};

type StoreContextValue = StoreState & {
  addToCart: (product: Product, opts?: { qty?: number; size?: string; design?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  setActiveCategory: (category: string | null) => void;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = 'sunicraft-cart';
const WISH_KEY = 'sunicraft-wishlist';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function loadWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [wishlist, setWishlist] = useState<string[]>(loadWishlist);
  const [activeCategory, setActiveCategoryState] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(product: Product, opts?: { qty?: number; size?: string; design?: string }) {
    const qty = opts?.qty ?? 1;
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, qty: c.qty + qty } : c,
        );
      }
      return [...prev, { product, qty, size: opts?.size, design: opts?.design }];
    });
    setCartOpen(true);
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((c) => c.product.id !== productId));
  }

  function updateQty(productId: string, qty: number) {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.product.id === productId ? { ...c, qty } : c)),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(productId: string) {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }

  function isWishlisted(productId: string) {
    return wishlist.includes(productId);
  }

  function setActiveCategory(category: string | null) {
    setActiveCategoryState(category);
    if (category) {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartTotal = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);

  const value: StoreContextValue = {
    cart,
    wishlist,
    activeCategory,
    searchOpen,
    cartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    cartTotal,
    toggleWishlist,
    isWishlisted,
    setActiveCategory,
    setSearchOpen,
    setCartOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
