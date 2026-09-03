import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export type Review = {
  id: string;
  product_id: string | null;
  product_name: string | null;
  customer_name: string;
  location: string | null;
  rating: number;
  text: string;
  created_at: string;
};

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const { data, error: dbErr } = await supabase
        .from('reviews')
        .select('id, product_id, product_name, customer_name, location, rating, text, created_at')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (dbErr) {
        setError(dbErr.message);
      } else {
        setReviews((data as Review[]) ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  return { reviews, loading, error };
}
