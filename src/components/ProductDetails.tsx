import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Star, Heart, MessageCircle, Check, Minus, Plus, ShieldCheck, Truck, Package, Loader2, ShoppingCart, Upload, X, Image as ImageIcon, ClipboardList } from 'lucide-react';
import { fetchProductById, type Product } from '@/hooks/useProducts';
import { buildWhatsAppLink } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import { supabase } from '@/lib/supabase';

export function ProductDetails({ productId, onBack }: { productId: string; onBack: () => void }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [areaColony, setAreaColony] = useState('');
  const [orderState, setOrderState] = useState('');
  const [pincode, setPincode] = useState('');
  const [customText, setCustomText] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderImage, setOrderImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setProduct(null);

    fetchProductById(productId).then((p) => {
      if (cancelled) return;
      setProduct(p);
      setLoading(false);
      setSelectedSize(0);
      setSelectedDesign(0);
      setQty(1);
    });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  function resetOrderForm() {
    setOrderName('');
    setOrderPhone('');
    setOrderEmail('');
    setHouseNo('');
    setAreaColony('');
    setOrderState('');
    setPincode('');
    setCustomText('');
    setOrderNotes('');
    setOrderImage(null);
    setOrderError(null);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setOrderError(null);
    try {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('order-images')
        .upload(filePath, file);
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage
        .from('order-images')
        .getPublicUrl(filePath);
      setOrderImage(`${urlData.publicUrl}?t=${Date.now()}`);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handlePlaceOrder() {
    if (!product) return;
    if (!orderName.trim() || !orderPhone.trim()) {
      setOrderError('Please enter your name and phone number.');
      return;
    }
    setPlacing(true);
    setOrderError(null);

    const total = product.price * qty;
    const orderRow = {
      product_id: product.id,
      product_name: product.name,
      customer_name: orderName.trim(),
      phone: orderPhone.trim(),
      email: orderEmail.trim() || null,
      address: [houseNo.trim(), areaColony.trim(), orderState.trim(), pincode.trim()].filter(Boolean).join(', ') || null,
      house_no: houseNo.trim() || null,
      area_colony: areaColony.trim() || null,
      state: orderState.trim() || null,
      pincode: pincode.trim() || null,
      size: sizes[selectedSize],
      design: designs[selectedDesign],
      quantity: qty,
      custom_text: customText.trim() || null,
      image_url: orderImage,
      notes: orderNotes.trim() || null,
      total_price: total,
      status: 'pending',
    };

    const { data, error: dbErr } = await supabase
      .from('orders')
      .insert(orderRow)
      .select()
      .maybeSingle();

    if (dbErr) {
      setOrderError(dbErr.message);
      setPlacing(false);
      return;
    }

    const orderId = data?.id?.slice(0, 8) ?? 'N/A';
    const waMsg = `Hi SuniCraftStudio! New Order #${orderId}

Product: ${product.name}
Size: ${sizes[selectedSize]}
Design: ${designs[selectedDesign]}
Quantity: ${qty}
Total: ₹${total}

Customer: ${orderName.trim()}
Phone: ${orderPhone.trim()}${orderEmail.trim() ? `\nEmail: ${orderEmail.trim()}` : ''}
Address:${houseNo.trim() ? `\n  House/Building: ${houseNo.trim()}` : ''}${areaColony.trim() ? `\n  Area/Colony: ${areaColony.trim()}` : ''}${orderState.trim() ? `\n  State: ${orderState.trim()}` : ''}${pincode.trim() ? `\n  Pincode: ${pincode.trim()}` : ''}
Custom Text: ${customText.trim() || '-'}
Notes: ${orderNotes.trim() || '-'}${orderImage ? `\nCustomization Photo: ${orderImage}` : ''}

Order ID: ${orderId}`;

    setPlacing(false);
    setOrderSuccess(true);
    window.open(buildWhatsAppLink(waMsg), '_blank');
    resetOrderForm();
    setTimeout(() => setOrderSuccess(false), 5000);
  }

  if (loading) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-coral-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Product not found.</p>
          <button onClick={onBack} className="text-coral-600 font-semibold">Back to home</button>
        </div>
      </div>
    );
  }

  const sizes = product.sizes ?? ['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'];
  const designs = product.designs ?? ['Single Photo', 'Collage (2-4 photos)', 'Name + Photo', 'Full Custom'];
  const specs = product.specifications ?? {};

  const orderMsg = `Hi SuniCraftStudio! I'd like to order:

Product: ${product.name}
Size: ${sizes[selectedSize]}
Design: ${designs[selectedDesign]}
Quantity: ${qty}
Price: ₹${product.price * qty}

Please share customization details and payment info.`;

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-coral-600 transition-colors mb-6 mt-4"
        >
          <ArrowLeft size={18} />
          Back to products
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="zoom-container rounded-3xl overflow-hidden shadow-xl bg-white aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-semibold shadow-md">
                {product.badge}
              </span>
            )}
            {product.oldPrice && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-400 text-white text-xs font-bold shadow-md">
                {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-semibold text-coral-500 uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 mt-2 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-bold text-3xl text-gray-800">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.oldPrice}</span>
              )}
              {product.oldPrice && (
                <span className="text-sm font-semibold text-coral-600">
                  Save ₹{product.oldPrice - product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed mb-7">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      selectedSize === i
                        ? 'bg-coral-500 text-white border-coral-500 shadow-md shadow-coral-200'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-coral-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Designs */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose Design</h3>
              <div className="flex flex-wrap gap-2">
                {designs.map((d, i) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDesign(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      selectedDesign === i
                        ? 'bg-coral-500 text-white border-coral-500 shadow-md shadow-coral-200'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-coral-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Order Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowOrderForm((v) => !v)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold shadow-lg transition-all"
              >
                <ClipboardList size={20} />
                Book Order with Customization
              </button>
            </div>

            {/* Order Form */}
            {showOrderForm && (
              <div className="mb-6 bg-white rounded-2xl border-2 border-coral-200 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-800 text-lg">Customize & Book Order</h3>
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400"
                    aria-label="Close form"
                  >
                    <X size={18} />
                  </button>
                </div>

                {orderSuccess && (
                  <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
                    <Check size={20} className="text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700 font-medium">
                      Order placed! We've opened WhatsApp so you can confirm the details with us.
                    </p>
                  </div>
                )}

                {orderError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                    {orderError}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Image upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Your Photo for Customization
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                        e.target.value = '';
                      }}
                    />
                    {orderImage ? (
                      <div className="flex items-center gap-4">
                        <img src={orderImage} alt="Customization" className="w-24 h-24 rounded-xl object-cover border border-gray-200" />
                        <button
                          onClick={() => setOrderImage(null)}
                          className="text-sm text-red-500 hover:text-red-600 font-medium"
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 text-gray-400 hover:border-coral-400 hover:text-coral-500 transition-colors disabled:opacity-50"
                      >
                        {uploading ? (
                          <Loader2 size={24} className="animate-spin" />
                        ) : (
                          <>
                            <Upload size={24} />
                            <span className="text-sm font-medium">Click to upload your photo</span>
                            <span className="text-xs">JPG or PNG, up to 5MB</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Custom text */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Name / Message to Print <span className="text-gray-400 font-normal">optional</span>
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. Happy Anniversary Priya & Raj"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                    />
                  </div>

                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email <span className="text-gray-400 font-normal">optional</span>
                    </label>
                    <input
                      type="email"
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Delivery Address</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          House / Building No.
                        </label>
                        <input
                          type="text"
                          value={houseNo}
                          onChange={(e) => setHouseNo(e.target.value)}
                          placeholder="e.g. 12, Flat 302"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          Area / Colony
                        </label>
                        <input
                          type="text"
                          value={areaColony}
                          onChange={(e) => setAreaColony(e.target.value)}
                          placeholder="e.g. Sector 14, Rohini"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          value={orderState}
                          onChange={(e) => setOrderState(e.target.value)}
                          placeholder="e.g. Maharashtra"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          Pincode
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 400001"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Additional Notes <span className="text-gray-400 font-normal">optional</span>
                    </label>
                    <textarea
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Any special instructions..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 resize-none"
                    />
                  </div>

                  {/* Order summary + submit */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Order Total</span>
                      <span className="font-bold text-xl text-gray-800">₹{product.price * qty}</span>
                    </div>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placing || uploading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-semibold shadow-lg shadow-coral-200 transition-all"
                    >
                      {placing ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          <Check size={20} />
                          Place Order & Send on WhatsApp
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Your order will be saved and sent to us on WhatsApp for confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity + WhatsApp */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-coral-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold text-gray-800">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-coral-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product, { qty, size: sizes[selectedSize], design: designs[selectedDesign] });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold shadow-lg shadow-coral-200 transition-all"
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              <a
                href={buildWhatsAppLink(orderMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-coral-50 text-coral-600 font-semibold border border-coral-200 transition-all"
              >
                <MessageCircle size={20} />
              </a>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted(product.id)
                    ? 'bg-coral-500 border-coral-500 text-white'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-coral-500 hover:border-coral-300'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={20} className={isWishlisted(product.id) ? 'fill-white' : ''} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-white border border-gray-100">
                <ShieldCheck size={20} className="text-coral-500" />
                <span className="text-xs text-gray-500 font-medium">Premium Quality</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-white border border-gray-100">
                <Package size={20} className="text-coral-500" />
                <span className="text-xs text-gray-500 font-medium">Safe Packaging</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-white border border-gray-100">
                <Truck size={20} className="text-coral-500" />
                <span className="text-xs text-gray-500 font-medium">Fast Delivery</span>
              </div>
            </div>

            {/* Specifications */}
            {Object.keys(specs).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <h3 className="font-semibold text-gray-800 px-5 py-4 border-b border-gray-100">
                  Specifications
                </h3>
                <div className="divide-y divide-gray-50">
                  {Object.entries(specs).map(([label, value]) => (
                    <div key={label} className="flex justify-between px-5 py-3 text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-gray-700 font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
