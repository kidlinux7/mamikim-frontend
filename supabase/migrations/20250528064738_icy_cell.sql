-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('course-images', 'course-images', true)
on conflict (id) do nothing;

-- Allow tutors to upload files
create policy "Allow tutors to upload course images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'course-images' AND
  (auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'tutor'
  ))
);

-- Allow tutors to update their own files
create policy "Allow tutors to update their own course images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'course-images' AND
  owner = auth.uid() AND
  (auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'tutor'
  ))
);

-- Allow tutors to delete their own files
create policy "Allow tutors to delete their own course images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'course-images' AND
  owner = auth.uid() AND
  (auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'tutor'
  ))
);

-- Allow public access to read files
create policy "Allow public read access to course images"
on storage.objects for select
to public
using (
  bucket_id = 'course-images'
); 