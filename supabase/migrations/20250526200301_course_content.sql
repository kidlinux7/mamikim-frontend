-- Create enum for content types
CREATE TYPE content_type AS ENUM ('video', 'document');

-- Create chapters table
CREATE TABLE chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course content table
CREATE TABLE course_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE,
  title text NOT NULL,
  content_type content_type NOT NULL,
  video_url text, -- For YouTube videos
  file_url text, -- For documents
  duration integer, -- Duration in minutes for videos
  pages integer, -- Number of pages for documents
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  -- Ensure either video_url or file_url is present based on content_type
  CONSTRAINT valid_content CHECK (
    (content_type = 'video' AND video_url IS NOT NULL AND file_url IS NULL AND pages IS NULL) OR
    (content_type = 'document' AND file_url IS NOT NULL AND video_url IS NULL AND duration IS NULL)
  )
);

-- Add indexes for better query performance
CREATE INDEX chapters_course_id_idx ON chapters(course_id);
CREATE INDEX course_contents_chapter_id_idx ON course_contents(chapter_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chapters_updated_at
    BEFORE UPDATE ON chapters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_contents_updated_at
    BEFORE UPDATE ON course_contents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 