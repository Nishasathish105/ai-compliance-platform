/*
# Create Storage Bucket for Documents

Creates a public storage bucket for document uploads with 5MB size limit.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents');
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'documents');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'documents');