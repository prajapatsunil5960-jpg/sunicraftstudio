/*
# Create product-images storage bucket

1. Storage
- Creates a public storage bucket `product-images` for uploading product photos.
- Files are publicly readable so the storefront can display them.

2. Policies
- SELECT (read): public — anyone can view product images.
- INSERT (upload): anon + authenticated — the admin page can upload.
- UPDATE: anon + authenticated — allows replacing an image.
- DELETE: anon + authenticated — allows removing an image.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
CREATE POLICY "public_read_product_images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_upload_product_images" ON storage.objects;
CREATE POLICY "anon_upload_product_images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_update_product_images" ON storage.objects;
CREATE POLICY "anon_update_product_images"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_delete_product_images" ON storage.objects;
CREATE POLICY "anon_delete_product_images"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'product-images');
