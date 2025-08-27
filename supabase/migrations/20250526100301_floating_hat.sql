/*
  # Create courses table

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text,  NOT NULL)
      - `description` (text)
      - `image_url` (text)
      - `instructor_id` (uuid, references profiles)
      - `price` (decimal,  NOT NULL)
      - `hours` (decimal,  NOT NULL)
      - `level` (text)
      - `rating` (decimal)
      - `students_count` (integer)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on courses table
    - Add policies for public read access
    - Add policies for instructor updates
*/

CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  image_url text,
  introduction_video text NOT NULL,
  instructor_id uuid REFERENCES profiles(id),
  price decimal NOT NULL DEFAULT 0,
  hours decimal NOT NULL DEFAULT 0,
  level text DEFAULT 'beginner',
  description text NOT NULL,
  what_you_will_learn jsonb  NOT NULL,
  requirements jsonb  NOT NULL,
  who_is_this_course_for jsonb  NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to courses
CREATE POLICY "Courses are viewable by everyone"
  ON courses
  FOR SELECT
  TO public
  USING (true);

-- Allow instructors to update their own courses
CREATE POLICY "Instructors can update own courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = instructor_id)
  WITH CHECK (auth.uid() = instructor_id);

-- Allow instructors to insert courses
CREATE POLICY "Instructors can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'tutor'
    )
  );

-- Allow instructors to delete their own courses
CREATE POLICY "Instructors can delete own courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = instructor_id);