-- supabase/migrations/20250526120000_create_course_content_table.sql
CREATE TABLE course_details (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  instructor_id uuid references public.profiles(id) on delete cascade,
  description text not null,
  what_you_will_learn jsonb not null,
  requirements jsonb not null,
  who_is_this_course_for jsonb not null,
  chapters jsonb not null,
  created_at timestamp with time zone default now()
);

ALTER TABLE course_details ENABLE ROW LEVEL SECURITY;

-- Allow public read access to courses details
CREATE POLICY "Courses details are viewable by everyone"
  ON course_details
  FOR SELECT
  TO public
  USING (true);

-- Allow instructors to update their own courses details
CREATE POLICY "Instructors can update own courses details"
  ON course_details
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = instructor_id)
  WITH CHECK (auth.uid() = instructor_id);

-- Allow instructors to insert courses details
CREATE POLICY "Instructors can create courses details"
  ON course_details
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'tutor'
    )
  );

-- Allow instructors to delete their own courses details
CREATE POLICY "Instructors can delete own courses details"
  ON course_details
  FOR DELETE
  TO authenticated
  USING (auth.uid() = instructor_id);