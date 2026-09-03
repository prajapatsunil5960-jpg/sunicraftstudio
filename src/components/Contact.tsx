import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram, Facebook, Send, Check } from 'lucide-react';
import { WHATSAPP_DISPLAY, buildWhatsAppLink } from '@/data/products';

export function Contact() {
  const { ref, visible } = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const change = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-50">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            Let's Create Something Special
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have a question or want to place a custom order? Reach out and we will
            get back to you within a few hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href={buildWhatsAppLink('Hi SuniCraftStudio! I have a question about your products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-coral-200 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 group-hover:bg-coral-500 flex items-center justify-center transition-colors">
                <MessageCircle size={22} className="text-coral-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-xs text-gray-400">WhatsApp / Phone</div>
                <div className="font-semibold text-gray-800">{WHATSAPP_DISPLAY}</div>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center">
                <Mail size={22} className="text-coral-500" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="font-semibold text-gray-800">prajapatsunil@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center">
                <Clock size={22} className="text-coral-500" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Business Hours</div>
                <div className="font-semibold text-gray-800">24/7</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center">
                <MapPin size={22} className="text-coral-500" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Ships Across</div>
                <div className="font-semibold text-gray-800">All India</div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com/sunicraftstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-coral-500 hover:text-white hover:border-coral-500 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-coral-500 hover:text-white hover:border-coral-500 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={buildWhatsAppLink('Hi SuniCraftStudio!')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-coral-500 hover:text-white hover:border-coral-500 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-coral-500 flex items-center justify-center mb-5">
                  <Check size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  Thank you, {form.name.split(' ')[0] || 'there'}!
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Your message has been received. Our team will reach out to you
                  shortly. For faster response, message us on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => change('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral-300 focus:bg-white transition-colors text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => change('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral-300 focus:bg-white transition-colors text-sm"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Email <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => change('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral-300 focus:bg-white transition-colors text-sm"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => change('message', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral-300 focus:bg-white transition-colors text-sm resize-none"
                    placeholder="Tell us about the gift you want to customize..."
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold shadow-lg shadow-coral-200 transition-all"
                >
                  Send Message
                  <Send size={17} className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Or order directly on WhatsApp at {WHATSAPP_DISPLAY}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
