-- Create enrollment table
CREATE TABLE IF NOT EXISTS enrollment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  transaction_id uuid REFERENCES transactions(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE enrollment ENABLE ROW LEVEL SECURITY;

-- -- Allow students to enroll
-- CREATE POLICY "Students can create enrollments"
--   ON enrollment
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM profiles
--       WHERE id = auth.uid()
--       AND role = 'student'
--     )
--   );