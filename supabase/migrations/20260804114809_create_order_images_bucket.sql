/*
# Create order-images storage bucket

1. Storage
- Creates a public storage bucket `order-images` for uploading customer customization photos.

2. Policies
- SELECT (read): public — anyone can view order images.
- INSERT (upload): anon + authenticated — customers can upload their customization photo.
- UPDATE: anon + authenticated.
- DELETE: anon + authenticated.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('order-images', 'order-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_order_images" ON storage.objects;
CREATE POLICY "public_read_order_images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'order-images');

DROP POLICY IF EXISTS "anon_upload_order_images" ON storage.objects;
CREATE POLICY "anon_upload_order_images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'order-images');

DROP POLICY IF EXISTS "anon_update_order_images" ON storage.objects;
CREATE POLICY "anon_update_order_images"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'order-images')
WITH CHECK (bucket_id = 'order-images');

DROP POLICY IF EXISTS "anon_delete_order_images" ON storage.objects;
CREATE POLICY "anon_delete_order_images"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'order-images');
