-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

-- Allow admin to upload files
create policy "Allow admins to upload event images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'event-images' AND
  (auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'admin'
  ))
);

-- Allow admins to update their own files
create policy "Allow admins to update their own event images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'event-images' AND
  owner = auth.uid() AND
  (auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'admin'
  ))
);

-- Allow admins to delete their own files
create policy "Allow admins to delete their own event images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'event-images' AND
  owner = auth.uid() AND
  (auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'admin'
  ))
);