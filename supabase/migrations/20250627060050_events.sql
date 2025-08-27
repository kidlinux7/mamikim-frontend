
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  heading text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  cover_photo text NOT NULL,
  youtube_url text NOT NULL,
  twitter_url text NOT NULL,
  facebook_url text NOT NULL,
  instagram_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to courses details
CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create events
CREATE POLICY "Only admins can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );


CREATE TABLE rsvp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  fullname text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  description text NOT NULL,
  paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can make reservations"
  ON rsvp
  FOR INSERT
  TO public
  WITH CHECK (true);


CREATE POLICY "Only Admins can view reservations"
  ON rsvp
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );