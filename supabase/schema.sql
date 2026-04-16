-- Genealogy Database Schema
-- Run this in your Supabase SQL editor

-- People table
CREATE TABLE people (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  birth_year INT,
  birth_place TEXT,
  birth_lat DOUBLE PRECISION,
  birth_lng DOUBLE PRECISION,
  death_year INT,
  death_place TEXT,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Relationships table
-- relationship_type: 'parent-child' | 'spouse'
CREATE TABLE relationships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person1_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  person2_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('parent-child', 'spouse')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-generated stories table
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (public read for sharing with family)
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (for family sharing via link)
CREATE POLICY "Public read" ON people FOR SELECT USING (true);
CREATE POLICY "Public read" ON relationships FOR SELECT USING (true);
CREATE POLICY "Public read" ON stories FOR SELECT USING (true);

-- Seed data: Known family members
-- Run this after creating the table, then copy the UUIDs to update relationships

INSERT INTO people (id, first_name, last_name, birth_year, birth_place, birth_lat, birth_lng) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Iris Margarete', 'Mulholland', 1928, 'Berlin, Germany', 52.5200, 13.4050),
  ('00000000-0000-0000-0000-000000000002', 'Dan', 'Mulholland', 1935, 'Chicago, Illinois, USA', 41.8781, -87.6298),
  ('00000000-0000-0000-0000-000000000003', 'Maxwell', 'Mulholland', 1960, 'Belmont, Massachusetts, USA', 42.3959, -71.1786),
  ('00000000-0000-0000-0000-000000000004', 'Gladys Mildred', 'Walker', 1923, 'Boston, Massachusetts, USA', 42.3601, -71.0589),
  ('00000000-0000-0000-0000-000000000005', 'George Vincent', 'Walker', 1919, 'Boston, Massachusetts, USA', 42.3601, -71.0589),
  ('00000000-0000-0000-0000-000000000006', 'Lynn', 'Mulholland', 1956, 'Boston, Massachusetts, USA', 42.3601, -71.0589),
  ('00000000-0000-0000-0000-000000000007', 'Ian', 'Mulholland', 1991, 'Winthrop, Massachusetts, USA', 42.3751, -70.9887),
  ('00000000-0000-0000-0000-000000000008', 'Ross', 'Mulholland', 1996, 'Winthrop, Massachusetts, USA', 42.3751, -70.9887);

INSERT INTO relationships (person1_id, person2_id, relationship_type) VALUES
  -- Iris Margarete + Dan (spouses)
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'spouse'),
  -- Dan is parent of Maxwell
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'parent-child'),
  -- Iris is parent of Maxwell
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'parent-child'),
  -- Gladys + George (spouses)
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', 'spouse'),
  -- George is parent of Lynn
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000006', 'parent-child'),
  -- Gladys is parent of Lynn
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000006', 'parent-child'),
  -- Maxwell + Lynn (spouses)
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000006', 'spouse'),
  -- Maxwell is parent of Ian
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000007', 'parent-child'),
  -- Lynn is parent of Ian
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000007', 'parent-child'),
  -- Maxwell is parent of Ross
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000008', 'parent-child'),
  -- Lynn is parent of Ross
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000008', 'parent-child');
