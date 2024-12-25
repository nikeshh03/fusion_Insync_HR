/*
  # Add missing employee columns

  1. New Columns
    - certifications (text[]) - Array of employee certifications
    - training_completed (text[]) - Array of completed training courses

  2. Changes
    - Add default empty arrays for both columns
*/

ALTER TABLE employees
ADD COLUMN IF NOT EXISTS certifications text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS training_completed text[] DEFAULT ARRAY[]::text[];

-- Recreate policies to ensure they cover new columns
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