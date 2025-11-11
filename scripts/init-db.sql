-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language VARCHAR(100) NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  words_phrases TEXT NOT NULL,
  definition TEXT NOT NULL,
  context TEXT,
  pronunciation_guide TEXT,
  audio_url TEXT,
  video_url TEXT,
  wallet_address TEXT,
  milsa_score INT DEFAULT 0,
  clarity INT DEFAULT 0,
  pronunciation_accuracy INT DEFAULT 0,
  tempo_consistency INT DEFAULT 0,
  tone_emotion_fit INT DEFAULT 0,
  noise_level INT DEFAULT 0,
  linguistic_purity INT DEFAULT 0,
  quality_status VARCHAR(20) DEFAULT 'pending',
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read access for viewing submissions
CREATE POLICY "Allow public read access" ON submissions
  FOR SELECT USING (true);

-- Allow public insert for submissions
CREATE POLICY "Allow public insert" ON submissions
  FOR INSERT WITH CHECK (true);

-- Allow updates to own submissions
CREATE POLICY "Allow update own submissions" ON submissions
  FOR UPDATE USING (true);

-- Create index for faster queries
CREATE INDEX idx_submissions_language ON submissions(language);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX idx_submissions_quality_status ON submissions(quality_status);
