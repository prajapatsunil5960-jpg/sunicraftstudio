import { useState, useRef } from 'react';
import { Star, Quote, Loader2, Check, X, MessageSquarePlus } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useReviews } from '@/hooks/useReviews';
import { supabase } from '@/lib/supabase';
import { reviews as staticReviews, categories } from '@/data/products';

const avatarPool = [
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=120',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=120',
];

function avatarFor(name: string, index: number) {
  return avatarPool[index % avatarPool.length];
}

export function CustomerReviews() {
  const { ref, visible } = useReveal();
  const { reviews: dbReviews, loading } = useReviews();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [product, setProduct] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const allReviews = [
    ...dbReviews.map((r, i) => ({
      id: r.id,
      name: r.customer_name,
      location: r.location ?? '',
      product: r.product_name ?? '',
      rating: r.rating,
      text: r.text,
      image: avatarFor(r.customer_name, i),
      isCustomer: true,
    })),
    ...staticReviews.map((r, i) => ({
      id: `static-${i}`,
      name: r.name,
      location: r.location,
      product: r.product,
      rating: r.rating,
      text: r.text,
      image: r.image,
      isCustomer: false,
    })),
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError('Please enter your name and review.');
      return;
    }
    setSubmitting(true);
    setError(null);

    const { error: dbErr } = await supabase.from('reviews').insert({
      customer_name: name.trim(),
      location: location.trim() || null,
      rating,
      text: text.trim(),
      product_name: product || null,
    });

    setSubmitting(false);
    if (dbErr) {
      setError(dbErr.message);
      return;
    }
    setSubmitted(true);
    setName('');
    setLocation('');
    setRating(5);
    setText('');
    setProduct('');
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 4000);
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
            Customer Love
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 mt-3 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real reviews from real customers who trusted SuniCraftStudio with
            their special moments.
          </p>
        </div>

        {/* Write a review button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => {
              setShowForm((v) => !v);
              setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold text-sm shadow-lg shadow-coral-200 transition-all"
          >
            <MessageSquarePlus size={18} />
            Write a Review
          </button>
        </div>

        {/* Review form */}
        {showForm && (
          <div ref={formRef} className="max-w-2xl mx-auto mb-12 bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-gray-800">Share Your Experience</h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Check size={24} className="text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-700">Thank you for your review!</p>
                  <p className="text-sm text-green-600">It will appear here once approved by our team.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={
                            (hoverRating || rating) >= n
                              ? 'fill-gold-400 text-gold-400'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Location <span className="text-gray-400 font-normal">optional</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai, India"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Product <span className="text-gray-400 font-normal">optional</span>
                  </label>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 bg-white"
                  >
                    <option value="">Select a product (optional)</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 bg-white resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-semibold transition-colors"
                >
                  {submitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Check size={18} />
                  )}
                  Submit Review
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Reviews are moderated and will appear after approval.
                </p>
              </form>
            )}
          </div>
        )}

        {/* Reviews grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={28} className="animate-spin text-coral-400" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allReviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-coral-100/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <Quote size={24} className="text-coral-200" />
                  {r.isCustomer && (
                    <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-400">
                      {r.location ? `${r.location} · ` : ''}{r.product || 'General'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
