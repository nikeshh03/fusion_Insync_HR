/*
  # Update RLS policies for public access

  1. Changes
    - Update RLS policies to allow public access for the employees table
    - Enable anonymous access for basic CRUD operations

  2. Security Note
    - This is for demonstration purposes
    - In a production environment, proper authentication should be implemented
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read all employees" ON employees;
DROP POLICY IF EXISTS "Users can insert employees" ON employees;
DROP POLICY IF EXISTS "Users can update employees" ON employees;

-- Create new policies for public access
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