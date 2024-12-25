/*
  # Create employees table for HR Analytics

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `department` (text)
      - `position` (text)
      - `joining_date` (date)
      - `salary` (numeric)
      - `performance_score` (numeric)
      - `training_completed` (jsonb)
      - `certifications` (jsonb)
      - `last_promotion_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `employees` table
    - Add policies for authenticated users to manage employee data
*/

CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  department text NOT NULL,
  position text NOT NULL,
  joining_date date NOT NULL,
  salary numeric NOT NULL,
  performance_score numeric CHECK (performance_score >= 0 AND performance_score <= 5),
  training_completed jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  last_promotion_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert employees"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();