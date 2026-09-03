import { useReveal } from '@/hooks/useReveal';
import { MousePointerClick, Upload, MessageCircle, Truck } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Choose Your Product',
    desc: 'Browse our collection and pick the frame or gift that fits your occasion and style.',
  },
  {
    icon: Upload,
    title: 'Upload Your Photo',
    desc: 'Send us your favourite photo and customization details like name, text, and frame size.',
  },
  {
    icon: MessageCircle,
    title: 'Approve Your Preview',
    desc: 'We send a digital preview for your approval before printing. You confirm, we craft.',
  },
  {
    icon: Truck,
    title: 'Receive Your Gift',
    desc: 'We carefully package and ship your personalized gift to your doorstep across India.',
  },
];

export function OurProcess() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-coral-50 to-white">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            Your Gift in 4 Simple Steps
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From photo to doorstep — ordering your personalized gift is easy and
            stress-free.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative text-center">
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                    <Icon size={26} className="text-coral-500" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-coral-500 text-white text-xs font-bold flex items-center justify-center font-sans">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-coral-200">
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                      <path d="M0 6h22m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
