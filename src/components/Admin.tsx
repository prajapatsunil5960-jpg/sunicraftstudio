import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Upload, Loader2, Check, Star, Image as ImageIcon, Save, Plus, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useProducts, type Product } from '@/hooks/useProducts';
import { categories } from '@/data/products';

type EditState = {
  id: string;
  name: string;
  price: string;
  oldPrice: string;
  description: string;
  badge: string;
  category: string;
  rating: string;
  reviews: string;
  image: string;
  bestSeller: boolean;
  newArrival: boolean;
  featured: boolean;
  sizes: string[];
  designs: string[];
  sortOrder: string;
};

const blankEdit: EditState = {
  id: '',
  name: '',
  price: '',
  oldPrice: '',
  description: '',
  badge: '',
  category: categories[0]?.name ?? '',
  rating: '5',
  reviews: '0',
  image: '',
  bestSeller: false,
  newArrival: false,
  featured: true,
  sizes: ['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'],
  designs: ['Single Photo', 'Collage (2-4 photos)', 'Name + Photo', 'Full Custom'],
  sortOrder: '99',
};

function toEditState(p: Product): EditState {
  return {
    id: p.id,
    name: p.name,
    price: String(p.price),
    oldPrice: p.oldPrice ? String(p.oldPrice) : '',
    description: p.description,
    badge: p.badge ?? '',
    category: p.category,
    rating: String(p.rating),
    reviews: String(p.reviews),
    image: p.image,
    bestSeller: p.bestSeller ?? false,
    newArrival: p.newArrival ?? false,
    featured: p.featured ?? false,
    sizes: p.sizes ?? [],
    designs: p.designs ?? [],
    sortOrder: String(p.sortOrder ?? 0),
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

export function Admin({ onBack }: { onBack: () => void }) {
  const { products, loading, error } = useProducts();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNew && products.length > 0 && !selectedId) {
      setSelectedId(products[0].id);
    }
    if (!isNew && selectedId) {
      const p = products.find((x) => x.id === selectedId);
      if (p) setEdit(toEditState(p));
    }
  }, [products, selectedId, isNew]);

  const selectedProduct = products.find((p) => p.id === selectedId);

  function startNew() {
    setIsNew(true);
    setSelectedId(null);
    setEdit({ ...blankEdit });
    setErrorMsg(null);
    setSavedMsg(false);
  }

  function startEdit(id: string) {
    setIsNew(false);
    setSelectedId(id);
    setErrorMsg(null);
    setSavedMsg(false);
  }

  async function handleImageUpload(file: File) {
    if (!edit) return;
    setUploading(true);
    setErrorMsg(null);

    try {
      const productId = edit.id || slugify(edit.name) || `product-${Date.now()}`;
      const ext = file.name.split('.').pop() ?? 'jpg';
      const filePath = `${productId}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { upsert: true });

      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      setEdit((prev) => (prev ? { ...prev, image: publicUrl, id: prev.id || productId } : prev));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!edit) return;
    setSaving(true);
    setSavedMsg(false);
    setErrorMsg(null);

    const id = edit.id || slugify(edit.name);
    if (!id) {
      setErrorMsg('Please enter a product name.');
      setSaving(false);
      return;
    }

    const updates = {
      id,
      name: edit.name,
      category: edit.category,
      price: Number(edit.price) || 0,
      old_price: edit.oldPrice ? Number(edit.oldPrice) : null,
      description: edit.description,
      badge: edit.badge || null,
      rating: Number(edit.rating) || 5,
      reviews: Number(edit.reviews) || 0,
      image: edit.image || 'https://images.pexels.com/photos/17210078/pexels-photo-17210078.jpeg?auto=compress&cs=tinysrgb&w=900',
      is_best_seller: edit.bestSeller,
      is_new_arrival: edit.newArrival,
      is_featured: edit.featured,
      sizes: edit.sizes,
      designs: edit.designs,
      sort_order: Number(edit.sortOrder) || 99,
    };

    const { error: dbErr } = await supabase
      .from('products')
      .upsert(updates);

    setSaving(false);
    if (dbErr) {
      setErrorMsg(dbErr.message);
    } else {
      setSavedMsg(true);
      setIsNew(false);
      setSelectedId(id);
      setTimeout(() => setSavedMsg(false), 3000);
    }
  }

  async function handleDelete() {
    if (!selectedId || isNew) return;
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setSaving(true);
    const { error: dbErr } = await supabase.from('products').delete().eq('id', selectedId);
    setSaving(false);
    if (dbErr) {
      setErrorMsg(dbErr.message);
    } else {
      setSelectedId(null);
      setEdit(null);
    }
  }

  if (loading) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-coral-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-coral-600 transition-colors mb-6 mt-4"
        >
          <ArrowLeft size={18} />
          Back to home
        </button>

        <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 mb-2">
          Manage Products
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Add new products or edit existing ones. Changes go live instantly.
        </p>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Product list sidebar */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-fit">
            <button
              onClick={startNew}
              className={`w-full flex items-center gap-2 px-4 py-3.5 text-left border-b border-gray-100 font-semibold text-sm transition-colors ${
                isNew
                  ? 'bg-coral-50 text-coral-700 border-l-4 border-l-coral-500'
                  : 'text-coral-600 hover:bg-coral-50'
              }`}
            >
              <Plus size={18} />
              Add New Product
            </button>
            <div className="max-h-[560px] overflow-y-auto">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => startEdit(p.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 transition-colors ${
                    !isNew && selectedId === p.id
                      ? 'bg-coral-50 border-l-4 border-l-coral-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400">₹{p.price} · {p.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Edit / Add panel */}
          {edit && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {isNew && (
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral-50 text-coral-600 text-xs font-semibold">
                  <Plus size={14} />
                  Creating New Product
                </div>
              )}

              {/* Image upload section */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Product Image
                </h3>
                <div className="flex items-start gap-6">
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                    {edit.image ? (
                      <img
                        src={edit.image}
                        alt={edit.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Loader2 size={24} className="animate-spin text-coral-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
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
                    <button
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
                    >
                      <Upload size={16} />
                      Upload Image
                    </button>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Upload a photo from your computer. JPG or PNG, up to 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                    placeholder="e.g. LED Photo Frame"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={edit.category}
                    onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={edit.price}
                    onChange={(e) => setEdit({ ...edit, price: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Old Price (₹) <span className="text-gray-400 font-normal">optional</span>
                  </label>
                  <input
                    type="number"
                    value={edit.oldPrice}
                    onChange={(e) => setEdit({ ...edit, oldPrice: e.target.value })}
                    placeholder="For showing discount"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Badge <span className="text-gray-400 font-normal">optional</span>
                  </label>
                  <input
                    type="text"
                    value={edit.badge}
                    onChange={(e) => setEdit({ ...edit, badge: e.target.value })}
                    placeholder="e.g. Bestseller, New, Premium"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={edit.sortOrder}
                    onChange={(e) => setEdit({ ...edit, sortOrder: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      max="5"
                      value={edit.rating}
                      onChange={(e) => setEdit({ ...edit, rating: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                    />
                    <Star size={16} className="text-gold-400 fill-gold-400 flex-shrink-0" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    value={edit.reviews}
                    onChange={(e) => setEdit({ ...edit, reviews: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={edit.description}
                    onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                    placeholder="Describe the product..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 resize-none"
                  />
                </div>

                {/* Sizes */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {edit.sizes.map((s, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700">
                        {s}
                        <button
                          onClick={() => setEdit({ ...edit, sizes: edit.sizes.filter((_, idx) => idx !== i) })}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type a size and press Enter"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          setEdit({ ...edit, sizes: [...edit.sizes, val] });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>

                {/* Designs */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Available Designs
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {edit.designs.map((d, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700">
                        {d}
                        <button
                          onClick={() => setEdit({ ...edit, designs: edit.designs.filter((_, idx) => idx !== i) })}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type a design option and press Enter"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          setEdit({ ...edit, designs: [...edit.designs, val] });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>

                {/* Flags */}
                <div className="sm:col-span-2 flex flex-wrap gap-3">
                  <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${edit.bestSeller ? 'bg-coral-50 border-coral-300 text-coral-700' : 'bg-white border-gray-200 text-gray-500'}`}>
                    <input
                      type="checkbox"
                      checked={edit.bestSeller}
                      onChange={(e) => setEdit({ ...edit, bestSeller: e.target.checked })}
                      className="hidden"
                    />
                    <Star size={15} className={edit.bestSeller ? 'fill-coral-500 text-coral-500' : ''} />
                    Best Seller
                  </label>
                  <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${edit.newArrival ? 'bg-coral-50 border-coral-300 text-coral-700' : 'bg-white border-gray-200 text-gray-500'}`}>
                    <input
                      type="checkbox"
                      checked={edit.newArrival}
                      onChange={(e) => setEdit({ ...edit, newArrival: e.target.checked })}
                      className="hidden"
                    />
                    New Arrival
                  </label>
                  <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${edit.featured ? 'bg-coral-50 border-coral-300 text-coral-700' : 'bg-white border-gray-200 text-gray-500'}`}>
                    <input
                      type="checkbox"
                      checked={edit.featured}
                      onChange={(e) => setEdit({ ...edit, featured: e.target.checked })}
                      className="hidden"
                    />
                    Featured
                  </label>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-semibold transition-colors"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isNew ? 'Create Product' : 'Save Changes'}
                </button>
                {savedMsg && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
                    <Check size={16} />
                    Saved! Changes are live.
                  </span>
                )}
                {errorMsg && (
                  <span className="text-sm text-red-500">{errorMsg}</span>
                )}
                {!isNew && selectedProduct && (
                  <button
                    onClick={handleDelete}
                    disabled={saving}
                    className="ml-auto inline-flex items-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 text-sm font-semibold transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
