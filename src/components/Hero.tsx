import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { occasions } from '@/data/products';

export function Hero() {
  return (
    <section id="home" className="relative pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-coral-50 via-white to-white">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-coral-100/60 blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-gold-300/20 blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-coral-100 mb-6">
            <Sparkles size={15} className="text-coral-500" />
            <span className="text-xs font-semibold text-coral-600">Personalized Gifts & Photo Frames</span>
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-800 leading-[1.1] mb-5">
            Turn Your Favourite Photos Into{' '}
            <span className="text-coral-600">Beautiful Memories</span>
          </h1>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            Premium customized photo frames, LED frames, handmade frames, and
            personalized gifts for birthdays, anniversaries, weddings, and every
            special occasion. Made with care using your photos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold shadow-lg shadow-coral-200 transition-all hover:scale-[1.02]"
            >
              Shop Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 transition-colors"
            >
              Browse Categories
            </a>
          </div>

          {/* Trust stats */}
          <div className="flex items-center justify-center lg:justify-start gap-8">
            <div>
              <div className="font-bold text-2xl text-gray-800">10,000+</div>
              <div className="text-xs text-gray-400">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <div className="flex items-center gap-1 font-bold text-2xl text-gray-800">
                4.9
                <Star size={18} className="fill-gold-400 text-gold-400" />
              </div>
              <div className="text-xs text-gray-400">Average Rating</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <div className="font-bold text-2xl text-gray-800">50+</div>
              <div className="text-xs text-gray-400">Unique Designs</div>
            </div>
          </div>
        </div>

        {/* Right: image collage */}
        <div className="relative h-[420px] sm:h-[500px]">
          <div className="absolute top-0 right-0 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl rotate-3 animate-floaty">
            <img
              src="https://images.pexels.com/photos/15585620/pexels-photo-15585620.png?auto=compress&cs=tinysrgb&w=600"
              alt="Wooden photo frame"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden shadow-2xl -rotate-3 animate-floaty" style={{ animationDelay: '1s' }}>
            <img
              src="https://images.pexels.com/photos/9023268/pexels-photo-9023268.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="LED photo frame"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden shadow-2xl rotate-6 animate-floaty" style={{ animationDelay: '2s' }}>
            <img
              src="https://images.pexels.com/photos/4841372/pexels-photo-4841372.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Gift hamper"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute bottom-8 right-2 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 animate-floaty" style={{ animationDelay: '0.5s' }}>
            <div className="w-10 h-10 rounded-full bg-coral-100 flex items-center justify-center">
              <Star size={18} className="fill-coral-500 text-coral-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">Loved by 1k+</div>
              <div className="text-xs text-gray-400">customers in India</div>
            </div>
          </div>
        </div>
      </div>

      {/* Occasions strip */}
      <div className="relative max-w-7xl mx-auto px-6 mt-16">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Perfect for every occasion
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 justify-start lg:justify-center">
          {occasions.map((o) => (
            <span
              key={o}
              className="shrink-0 px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-600 hover:border-coral-300 hover:text-coral-600 transition-colors cursor-default"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
