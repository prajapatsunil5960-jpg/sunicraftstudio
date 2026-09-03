import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/data/products';

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink('Hi SuniCraftStudio! I would like to know more about your customized gifts and photo frames.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 pl-3 pr-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg shadow-green-900/20 transition-all hover:scale-105 group"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle size={24} className="fill-white" />
      <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">
        Order on WhatsApp
      </span>
    </a>
  );
}
