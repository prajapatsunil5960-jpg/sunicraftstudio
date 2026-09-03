import { useReveal } from '@/hooks/useReveal';
import { ShieldCheck, IndianRupee, HandHeart, Zap, Package, BadgeCheck, SlidersHorizontal, Smile } from 'lucide-react';

const reasons = [
  { icon: ShieldCheck, title: 'Premium Quality Materials', desc: 'We use only high-grade wood, acrylic, resin, and printing materials for lasting keepsakes.' },
  { icon: IndianRupee, title: 'Affordable Prices', desc: 'Premium personalization at prices that fit your budget, with regular festive offers.' },
  { icon: HandHeart, title: 'Unique Handmade Designs', desc: 'Every frame is crafted by hand with attention to detail you will not find in mass production.' },
  { icon: Zap, title: 'Fast Order Processing', desc: 'Most orders are dispatched within 2-3 business days so your gift arrives on time.' },
  { icon: Package, title: 'Safe Packaging', desc: 'Breakable-safe packaging ensures your personalized gift reaches you in perfect condition.' },
  { icon: BadgeCheck, title: 'Trusted Service', desc: '10,000+ happy customers across India trust SuniCraftStudio for their special moments.' },
  { icon: SlidersHorizontal, title: 'Easy Customization', desc: 'Upload your photo, add your text, pick your size and color — we handle the rest.' },
  { icon: Smile, title: 'Customer Satisfaction', desc: 'We send a preview before printing and will not ship until you are happy with the design.' },
];

export function WhyChooseUs() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            Why SuniCraftStudio
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            The SuniCraftStudio Difference
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We do not just print photos — we craft memories with care, quality,
            and a personal touch that makes every gift unforgettable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-coral-200 hover:shadow-lg hover:shadow-coral-100/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-coral-50 group-hover:bg-coral-500 flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon size={22} className="text-coral-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{r.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
