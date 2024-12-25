/*
  # Update RLS policies for authenticated access

  1. Changes
    - Add policies for authenticated users only
    - Remove public access policies
    - Add user_id column for ownership
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Add user_id column
ALTER TABLE employees
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Drop existing public policies
DROP POLICY IF EXISTS "Allow public read access" ON employees;
DROP POLICY IF EXISTS "Allow public insert access" ON employees;
DROP POLICY IF EXISTS "Allow public update access" ON employees;

-- Create new authenticated policies
CREATE POLICY "Users can read own employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own employees"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own employees"
  ON employees
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);