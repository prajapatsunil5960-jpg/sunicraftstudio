import { useEffect, useState } from 'react';
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#products' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, setSearchOpen, setCartOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
          : 'bg-white/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: mobile menu + nav */}
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden text-coral-600 p-1"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 3).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-gray-600 hover:text-coral-600 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-coral-200">
              S
            </div>
            <div className="leading-tight">
              <div className="font-bold text-gray-800 text-base sm:text-lg tracking-tight">
                SuniCraft<span className="text-coral-600">Studio</span>
              </div>
              <div className="text-[10px] text-gray-400 -mt-0.5 hidden sm:block">
                Customized Gifts & Frames
              </div>
            </div>
          </a>

          {/* Right: nav + actions */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(3).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-gray-600 hover:text-coral-600 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-500 hover:text-coral-600 transition-colors p-1"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <a
              href="#products"
              className="relative text-gray-500 hover:text-coral-600 transition-colors p-1 hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 text-white text-[10px] font-semibold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-gray-500 hover:text-coral-600 transition-colors p-1"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral-500 text-white text-[10px] font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-4 bg-white border-t border-gray-100">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-gray-700 font-medium border-b border-gray-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
