/*
# Create products table for SuniCraftStudio

1. New Tables
- `products` — stores all customizable gift and photo frame products.
  - id, name, category, price, old_price, rating, reviews, image, badge,
    is_best_seller, is_new_arrival, is_featured, description,
    sizes (text[]), designs (text[]), specifications (jsonb), sort_order, created_at

2. Security
- Enable RLS on `products`.
- Allow anon + authenticated full CRUD (single-tenant, no-auth storefront — data is intentionally public).

3. Data
- Seeds all 12 existing products with sizes, designs, and specifications.
*/

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price integer NOT NULL,
  old_price integer,
  rating numeric(2,1) DEFAULT 5.0,
  reviews integer DEFAULT 0,
  image text NOT NULL,
  badge text,
  is_best_seller boolean DEFAULT false,
  is_new_arrival boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  description text NOT NULL,
  sizes text[] DEFAULT ARRAY['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'],
  designs text[] DEFAULT ARRAY['Single Photo', 'Collage (2-4 photos)', 'Collage (5-8 photos)', 'Name + Photo', 'Full Custom'],
  specifications jsonb DEFAULT '{}'::jsonb,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO products (id, name, category, price, old_price, rating, reviews, image, badge, is_best_seller, is_new_arrival, is_featured, description, sizes, designs, specifications, sort_order) VALUES
(
  'led-photo-frame', 'LED Photo Frame', 'LED Photo Frames', 599, 999, 4.9, 214,
  'https://images.pexels.com/photos/9023268/pexels-photo-9023268.jpeg?auto=compress&cs=tinysrgb&w=900',
  'Bestseller', true, false, true,
  'Glowing LED photo frame that lights up your favourite memory. Perfect for anniversaries and romantic gifts.',
  ARRAY['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'],
  ARRAY['Single Photo', 'Collage (2-4 photos)', 'Name + Photo', 'Full Custom'],
  '{"Material":"Premium LED + Acrylic","Print Quality":"HD 300 DPI","Light Mode":"Warm White LED","Power":"USB / Battery","Customization":"Photo + Name + Custom Text","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  1
),
(
  'wooden-photo-frame', 'Wooden Photo Frame', 'Wooden Frames', 549, 899, 4.8, 168,
  'https://images.pexels.com/photos/15585620/pexels-photo-15585620.png?auto=compress&cs=tinysrgb&w=900',
  'Premium', true, false, true,
  'Handcrafted wooden frame with a natural finish. Customizable with your photo and engraved name.',
  ARRAY['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'],
  ARRAY['Single Photo', 'Collage (2-4 photos)', 'Name + Photo', 'Full Custom'],
  '{"Material":"Premium MDF Wood","Print Quality":"HD 300 DPI","Finish":"Matte / Glossy (optional)","Customization":"Photo + Name + Custom Text","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  2
),
(
  'acrylic-photo-frame', 'Acrylic Photo Frame', 'Acrylic Frames', 649, 999, 4.7, 132,
  'https://images.pexels.com/photos/17210078/pexels-photo-17210078.jpeg?auto=compress&cs=tinysrgb&w=900',
  NULL, false, true, true,
  'Crystal-clear acrylic frame with a modern, premium look. Scratch-resistant and long-lasting.',
  ARRAY['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'],
  ARRAY['Single Photo', 'Collage (2-4 photos)', 'Name + Photo', 'Full Custom'],
  '{"Material":"Crystal Acrylic","Print Quality":"HD 300 DPI","Finish":"Glossy","Customization":"Photo + Name + Custom Text","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  3
),
(
  'handmade-photo-frame', 'Handmade Photo Frame', 'Handmade Frames', 449, 699, 4.9, 97,
  'https://images.pexels.com/photos/5324352/pexels-photo-5324352.jpeg?auto=compress&cs=tinysrgb&w=900',
  'Handmade', false, false, true,
  'Each frame is handcrafted with love and attention to detail. Unique designs you will not find anywhere else.',
  ARRAY['Small (6x8)', 'Medium (8x10)', 'Large (10x12)', 'XL (12x16)'],
  ARRAY['Single Photo', 'Collage (2-4 photos)', 'Name + Photo', 'Full Custom'],
  '{"Material":"Handcrafted Wood + Resin","Print Quality":"HD 300 DPI","Finish":"Hand-painted","Customization":"Photo + Name + Custom Text","Packaging":"Breakage-safe secure packaging","Dispatch":"3-4 business days","Delivery":"5-7 days across India"}'::jsonb,
  4
),
(
  'photo-collage', 'Photo Collage Frame', 'Customized Frames', 899, 1399, 4.8, 156,
  'https://images.pexels.com/photos/17210070/pexels-photo-17210070.jpeg?auto=compress&cs=tinysrgb&w=900',
  NULL, true, true, false,
  'Turn multiple memories into one beautiful collage. Choose your layout and upload up to 12 photos.',
  ARRAY['Medium (8x10)', 'Large (10x12)', 'XL (12x16)', 'XXL (16x20)'],
  ARRAY['Collage (2-4 photos)', 'Collage (5-8 photos)', 'Collage (9-12 photos)', 'Full Custom'],
  '{"Material":"Premium MDF Wood","Print Quality":"HD 300 DPI","Layout":"Customizable grid","Customization":"Up to 12 photos + Custom Text","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  5
),
(
  'customized-mug', 'Customized Mug', 'Mugs', 299, 499, 4.7, 289,
  'https://images.pexels.com/photos/16033792/pexels-photo-16033792.jpeg?auto=compress&cs=tinysrgb&w=900',
  NULL, true, false, true,
  'Premium ceramic mug printed with your photo or message. Dishwasher and microwave safe.',
  ARRAY['Standard (350ml)', 'Large (450ml)', 'Magic Mug (350ml)'],
  ARRAY['Single Photo', 'Photo + Text', 'Full Wrap Design'],
  '{"Material":"Premium Ceramic","Print Quality":"HD Sublimation","Features":"Dishwasher & Microwave Safe","Customization":"Photo + Message + Full Wrap","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  6
),
(
  'photo-lamp', 'Photo Lamp', 'Photo Lamps', 999, 1599, 4.9, 78,
  'https://images.pexels.com/photos/31149584/pexels-photo-31149584.jpeg?auto=compress&cs=tinysrgb&w=900',
  'New', false, true, true,
  'LED photo lamp that casts a warm glow on your favourite photo. A magical gift for loved ones.',
  ARRAY['Small (15cm)', 'Medium (20cm)', 'Large (25cm)'],
  ARRAY['Single Photo', 'Photo + Name', 'Full Custom'],
  '{"Material":"Acrylic + Wooden Base","Light":"Warm LED","Power":"USB / Battery","Customization":"Photo + Name + Custom Text","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  7
),
(
  'customized-cushion', 'Customized Cushion', 'Cushions', 399, 649, 4.6, 203,
  'https://images.pexels.com/photos/9290601/pexels-photo-9290601.jpeg?auto=compress&cs=tinysrgb&w=900',
  NULL, true, false, false,
  'Soft velvet cushion printed with your photo or custom design. Comes with removable cover.',
  ARRAY['Standard (30x30cm)', 'Large (40x40cm)', 'Heart Shape (35cm)'],
  ARRAY['Single Photo', 'Photo + Text', 'Full Custom'],
  '{"Material":"Soft Velvet","Print Quality":"HD Sublimation","Features":"Removable Cover","Customization":"Photo + Custom Design","Packaging":"Secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  8
),
(
  'customized-keychain', 'Customized Keychain', 'Keychains', 149, 249, 4.7, 342,
  'https://images.pexels.com/photos/3808249/pexels-photo-3808249.jpeg?auto=compress&cs=tinysrgb&w=900',
  NULL, false, true, false,
  'Acrylic keychain with your photo and name. A small gift with a big personal touch.',
  ARRAY['Standard (5cm)', 'Large (7cm)'],
  ARRAY['Single Photo', 'Photo + Name', 'Full Custom'],
  '{"Material":"Premium Acrylic","Print Quality":"HD Sublimation","Features":"Scratch-resistant","Customization":"Photo + Name","Packaging":"Secure packaging","Dispatch":"1-2 business days","Delivery":"5-7 days across India"}'::jsonb,
  9
),
(
  'customized-clock', 'Customized Wall Clock', 'Clocks', 699, 1099, 4.8, 91,
  'https://images.pexels.com/photos/31338022/pexels-photo-31338022.jpeg?auto=compress&cs=tinysrgb&w=900',
  NULL, false, false, false,
  'Personalized wall clock with your family photo or custom design. Silent sweep movement.',
  ARRAY['Medium (10 inch)', 'Large (12 inch)', 'XL (14 inch)'],
  ARRAY['Single Photo', 'Photo + Name', 'Full Custom'],
  '{"Material":"Premium MDF Wood","Movement":"Silent Sweep","Print Quality":"HD 300 DPI","Customization":"Photo + Custom Design","Packaging":"Breakage-safe secure packaging","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  10
),
(
  'resin-photo-frame', 'Resin Photo Frame', 'Handmade Frames', 749, 1199, 4.9, 64,
  'https://images.pexels.com/photos/7827595/pexels-photo-7827595.jpeg?auto=compress&cs=tinysrgb&w=900',
  'Handmade', false, true, false,
  'Elegant resin frame with hand-poured designs. Each piece is unique and made to order.',
  ARRAY['Small (6x8)', 'Medium (8x10)', 'Large (10x12)'],
  ARRAY['Single Photo', 'Photo + Name', 'Full Custom'],
  '{"Material":"Hand-poured Resin","Print Quality":"HD 300 DPI","Finish":"Glossy Resin Coat","Customization":"Photo + Custom Design","Packaging":"Breakage-safe secure packaging","Dispatch":"3-4 business days","Delivery":"5-7 days across India"}'::jsonb,
  11
),
(
  'gift-hamper', 'Gift Hamper Set', 'Gift Sets', 1299, 1999, 5.0, 112,
  'https://images.pexels.com/photos/4841372/pexels-photo-4841372.jpeg?auto=compress&cs=tinysrgb&w=900',
  'Premium', true, false, true,
  'Curated gift hamper with frame, mug, keychain and more. The complete personalized gift package.',
  ARRAY['Small Hamper', 'Medium Hamper', 'Premium Hamper'],
  ARRAY['2-3 Items', '4-6 Items', 'Full Custom'],
  '{"Contents":"Frame + Mug + Keychain + More","Packaging":"Gift Box with Ribbon","Customization":"Multiple Photos + Custom Text","Features":"Complete gift package","Dispatch":"2-3 business days","Delivery":"5-7 days across India"}'::jsonb,
  12
)
ON CONFLICT (id) DO NOTHING;
