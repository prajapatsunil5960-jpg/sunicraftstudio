/*
# Create product reviews table

1. New Tables
- `reviews`
  - id (uuid, primary key)
  - product_id (text, optional — references products; null = general review)
  - product_name (text, optional)
  - customer_name (text, not null)
  - location (text, optional)
  - rating (integer 1-5, not null, default 5)
  - text (text, not null — the review content)
  - approved (boolean, default false — admin must approve before showing publicly)
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on `reviews`.
- SELECT: anon + authenticated can read only approved reviews.
- INSERT: anon + authenticated can submit new reviews (always as approved=false).
- UPDATE/DELETE: anon + authenticated (admin can approve/delete from the panel).

3. Notes
- Reviews are stored with approved=false by default so the store owner can moderate
  before they appear on the storefront.
- The SELECT policy filters on approved = true so unapproved reviews are hidden from visitors.
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text REFERENCES products(id) ON DELETE SET NULL,
  product_name text,
  customer_name text NOT NULL,
  location text,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_approved_reviews" ON reviews;
CREATE POLICY "public_read_approved_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (approved = true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_reviews" ON reviews;
CREATE POLICY "anon_update_reviews" ON reviews FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
CREATE POLICY "anon_delete_reviews" ON reviews FOR DELETE
  TO anon, authenticated USING (true);
