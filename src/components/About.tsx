import { useReveal } from '@/hooks/useReveal';
import { Target, Eye, HandHeart, Award, Users, Sparkles } from 'lucide-react';

export function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/37827256/pexels-photo-37827256.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Crafting personalized gifts at SuniCraftStudio"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-coral-500 flex items-center justify-center shrink-0">
                <HandHeart size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">Made with love</div>
                <div className="text-xs text-gray-400">Every gift handcrafted in India</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
              About SuniCraftStudio
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-5 leading-tight">
              Crafting memories, one personalized gift at a time
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              SuniCraftStudio is dedicated to creating memorable personalized
              gifts that celebrate life's special moments. Our goal is to provide
              high-quality customized products with creative designs and
              excellent customer service.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              From LED photo frames to handmade resin frames, from customized
              mugs to complete gift hampers — we turn your favourite photos into
              keepsakes you will cherish forever.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-coral-50 rounded-2xl p-5 border border-coral-100">
                <Target size={22} className="text-coral-500 mb-3" />
                <h3 className="font-semibold text-gray-800 text-sm mb-1.5">Our Mission</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  To make every special occasion unforgettable through
                  personalized gifts that preserve precious memories.
                </p>
              </div>
              <div className="bg-gold-300/10 rounded-2xl p-5 border border-gold-300/30">
                <Eye size={22} className="text-gold-500 mb-3" />
                <h3 className="font-semibold text-gray-800 text-sm mb-1.5">Our Vision</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  To become a trusted online destination for customized gifts and
                  photo frames across India.
                </p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-coral-500" />
                <span className="text-sm text-gray-600 font-medium">50+ Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-coral-500" />
                <span className="text-sm text-gray-600 font-medium">1000+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-coral-500" />
                <span className="text-sm text-gray-600 font-medium">18+ Occasions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
