/*
# Create orders table for customer customization orders

1. New Tables
- `orders`
  - id (uuid, primary key)
  - product_id (text, references products)
  - product_name (text)
  - customer_name (text)
  - phone (text)
  - email (text, optional)
  - address (text, optional)
  - size (text)
  - design (text)
  - quantity (integer, default 1)
  - custom_text (text, optional — name/message to print)
  - image_url (text, optional — uploaded customization photo)
  - notes (text, optional)
  - total_price (integer)
  - status (text, default 'pending')
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on `orders`.
- Allow anon + authenticated full CRUD (single-tenant, no-auth storefront — customers place orders without login).

3. Notes
- This table stores customer customization orders placed through the website.
- Each order can include an uploaded photo (stored in the order-images storage bucket)
  and custom text (name/message to print on the product).
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text,
  size text,
  design text,
  quantity integer NOT NULL DEFAULT 1,
  custom_text text,
  image_url text,
  notes text,
  total_price integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);
