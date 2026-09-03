import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data/products';

export function FAQ() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-gray-50">
      <div ref={ref} className={`max-w-3xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            Got Questions?
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Everything you need to know about ordering your personalized gift.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base">{f.q}</span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-coral-50 flex items-center justify-center text-coral-500">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
