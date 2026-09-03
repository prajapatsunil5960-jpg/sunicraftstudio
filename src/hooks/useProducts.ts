import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge?: string | null;
  bestSeller?: boolean;
  newArrival?: boolean;
  featured?: boolean;
  description: string;
  sizes?: string[];
  designs?: string[];
  specifications?: Record<string, string>;
  sortOrder?: number;
};

type DbProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  old_price: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  description: string;
  sizes: string[] | null;
  designs: string[] | null;
  specifications: Record<string, string> | null;
  sort_order: number;
};

function mapProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    oldPrice: p.old_price,
    rating: Number(p.rating),
    reviews: p.reviews,
    image: p.image,
    badge: p.badge,
    bestSeller: p.is_best_seller,
    newArrival: p.is_new_arrival,
    featured: p.is_featured,
    description: p.description,
    sizes: p.sizes ?? undefined,
    designs: p.designs ?? undefined,
    specifications: p.specifications ?? undefined,
    sortOrder: p.sort_order,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProducts((data as DbProduct[]).map(mapProduct));
      setLoading(false);
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return null;
  return mapProduct(data as DbProduct);
}
