/*
  # Initial Schema Setup for Crowdfunding Platform

  1. New Tables
    - users (managed by Supabase Auth)
    - campaigns
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - target_amount (numeric)
      - current_amount (numeric)
      - end_date (timestamptz)
      - image_url (text)
      - creator_id (uuid, references auth.users)
      - created_at (timestamptz)
      - category (text)

  2. Security
    - Enable RLS on campaigns table
    - Add policies for:
      - Anyone can view campaigns
      - Only authenticated users can create campaigns
      - Only campaign creators can update their campaigns
*/

-- Create campaigns table
CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  target_amount numeric NOT NULL CHECK (target_amount > 0),
  current_amount numeric NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
  end_date timestamptz NOT NULL,
  image_url text NOT NULL,
  creator_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  category text NOT NULL,
  CHECK (current_amount <= target_amount)
);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view campaigns"
  ON campaigns
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);