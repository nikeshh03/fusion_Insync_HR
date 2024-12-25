/*
  # Add new employee attributes

  1. New Columns
    - education_level (text)
    - years_of_experience (integer)
    - skills (text[])
    - previous_positions (text[])
    - attendance_rate (numeric)
    - projects_completed (integer)
    - overtime_hours (numeric)
    - satisfaction_score (numeric)
    - last_review_date (date)
    - manager_feedback (text)
    - career_goals (text)

  2. Changes
    - Add constraints for numeric fields
    - Add default values for arrays
*/

-- Add new columns with appropriate constraints
ALTER TABLE employees
ADD COLUMN IF NOT EXISTS education_level text,
ADD COLUMN IF NOT EXISTS years_of_experience integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS skills text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS previous_positions text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS attendance_rate numeric DEFAULT 100 CHECK (attendance_rate >= 0 AND attendance_rate <= 100),
ADD COLUMN IF NOT EXISTS projects_completed integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS overtime_hours numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS satisfaction_score numeric DEFAULT 5 CHECK (satisfaction_score >= 0 AND satisfaction_score <= 5),
ADD COLUMN IF NOT EXISTS last_review_date date,
ADD COLUMN IF NOT EXISTS manager_feedback text,
ADD COLUMN IF NOT EXISTS career_goals text;

-- Update existing RLS policies to include new columns
DROP POLICY IF EXISTS "Allow public read access" ON employees;
DROP POLICY IF EXISTS "Allow public insert access" ON employees;
DROP POLICY IF EXISTS "Allow public update access" ON employees;

CREATE POLICY "Allow public read access"
  ON employees
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON employees
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON employees
  FOR UPDATE
  TO public
  USING (true);