import { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Send, ArrowUp } from 'lucide-react';
import { WHATSAPP_DISPLAY, buildWhatsAppLink } from '@/data/products';

const cols = [
  {
    title: 'Sunicraftstudio store',
    links: ['LED Photo Frames', 'Wooden Frames', 'Handmade Frames', 'Customized Mugs', 'Gift Hampers', 'New Arrivals'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Our Process', 'Customer Reviews', 'Contact Us', 'FAQs'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Refund Policy'],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-coral-500 to-coral-600 rounded-3xl p-8 sm:p-10 mb-16 -mt-32 shadow-2xl shadow-coral-900/30 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full bg-white/5" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-bold text-2xl text-white mb-2">
                Get festive offers & new arrivals
              </h3>
              <p className="text-white/80 text-sm">
                Subscribe to our newsletter for exclusive discounts on personalized gifts.
              </p>
            </div>
            <form onSubmit={subscribe} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/95 text-gray-800 placeholder:text-gray-400 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-colors inline-flex items-center gap-2 shrink-0"
              >
                {done ? 'Subscribed!' : 'Subscribe'}
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white text-lg">
                  SuniCraft<span className="text-coral-400">Studio</span>
                </div>
                <div className="text-[10px] text-gray-500 -mt-0.5">
                  Customized Gifts & Frames
                </div>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              We create beautiful customized photo frames and personalized gifts
              that turn your precious memories into lasting keepsakes for every
              special occasion.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/sunicraftstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-coral-500 hover:text-white hover:border-coral-500 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-coral-500 hover:text-white hover:border-coral-500 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={buildWhatsAppLink('Hi SuniCraftStudio!')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-coral-500 hover:text-white hover:border-coral-500 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-400 hover:text-coral-400 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 SuniCraftStudio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#admin" className="hover:text-coral-400 transition-colors">
              Manage Products
            </a>
            <div className="flex items-center gap-2">
              <MessageCircle size={15} className="text-coral-400" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#home"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center shadow-lg shadow-coral-900/30 transition-all hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
}
