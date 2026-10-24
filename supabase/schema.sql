-- ═══════════════════════════════════════════════════════════════════════
-- CodeWithRichie Portfolio CMS — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ═══════════════════════════════════════════════════════════════════════

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 3. Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  full_description  TEXT,
  category          TEXT NOT NULL DEFAULT 'Web Development',
  client            TEXT,
  completion_date   DATE,
  technologies      TEXT[] DEFAULT '{}',
  featured_image    TEXT,
  gallery_images    TEXT[] DEFAULT '{}',
  live_url          TEXT,
  github_url        TEXT,
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured          BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- 5. is_admin() function (SECURITY DEFINER bypasses RLS to check admin_users)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$;

-- 6. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ═══════════════════════════════════════════════════
-- 7. Row Level Security
-- ═══════════════════════════════════════════════════

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Projects: public can only read published
DROP POLICY IF EXISTS "Public can read published projects" ON public.projects;
CREATE POLICY "Public can read published projects"
  ON public.projects FOR SELECT
  USING (status = 'published' OR public.is_admin());

-- Projects: admins can insert
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (public.is_admin());

-- Projects: admins can update
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  USING (public.is_admin());

-- Projects: admins can delete
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  USING (public.is_admin());

-- Admin users: users can read their own record (to verify admin status)
DROP POLICY IF EXISTS "Users can read own admin record" ON public.admin_users;
CREATE POLICY "Users can read own admin record"
  ON public.admin_users FOR SELECT
  USING (user_id = auth.uid());

-- ═══════════════════════════════════════════════════
-- 8. Storage bucket setup (run separately in Storage tab or SQL)
-- ═══════════════════════════════════════════════════
-- Go to Storage > New Bucket > Name: "project-images" > Public: YES
-- Then add these storage policies:

-- INSERT (authenticated admins can upload):
-- Policy name: "Admins can upload images"
-- Target roles: authenticated
-- Policy: (public.is_admin())

-- SELECT (anyone can view):
-- Policy name: "Public can view images"
-- Target roles: anon, authenticated
-- Policy: true

-- DELETE (admins can delete):
-- Policy name: "Admins can delete images"
-- Target roles: authenticated
-- Policy: (public.is_admin())

-- ═══════════════════════════════════════════════════
-- 9. Seed existing projects
-- ═══════════════════════════════════════════════════
-- After running the schema, go to Admin Dashboard > seed existing projects
-- OR run this INSERT to seed them manually:

INSERT INTO public.projects (title, slug, short_description, category, technologies, live_url, status, featured, sort_order)
VALUES
  ('IGRAO Africa', 'igrao-africa', 'A full-featured website for IGRAO Africa, a pan-African NGO — showcasing their mission, programs, impact stories, partnerships, and donation pathways.', 'NGO Website', ARRAY['WordPress', 'PHP', 'CSS'], 'https://www.igrao-africa.org', 'published', true, 1),
  ('BSF Mixed Ventures Ltd', 'bsf-mixed-ventures', 'A professional corporate website for BSF Mixed Ventures Ltd, showcasing their business portfolio, services, and contact information.', 'Business Website', ARRAY['React', 'TailwindCSS', 'WordPress'], 'https://bsfmixedventuresltd.org/', 'published', false, 2),
  ('Chanong Homes', 'chanong-homes', 'A modern real estate platform for Chanong Homes featuring property listings, virtual tours, and client inquiry management.', 'Real Estate', ARRAY['WordPress', 'Listings', 'PHP'], 'https://chanonghomes.com/', 'published', false, 3),
  ('St. Peter''s High School', 'st-peters-high-school', 'A comprehensive school website for St. Peter''s High School Hoima with news, academics, admissions, and staff portals.', 'Education', ARRAY['WordPress', 'CMS', 'PHP'], 'https://stpetershighhoima.ac.ug/', 'published', false, 4),
  ('Mandela''s Hoima', 'mandelas-hoima', 'Full-featured institutional website for Mandela''s College Hoima with dynamic pages, gallery, and parent portal integration.', 'Education', ARRAY['WordPress', 'CMS', 'PHP'], 'https://www.mandelasshoima.ac.ug/', 'published', false, 5),
  ('African Ocean Consulting', 'african-ocean-consulting', 'A sleek consulting firm website for African Ocean Consulting with service showcases, team profiles, and lead generation.', 'Consulting', ARRAY['WordPress', 'SEO', 'PHP'], 'https://africanoceanconsulting.com/', 'published', false, 6),
  ('Monae Store', 'monae-store', 'A stylish e-commerce fashion store for Monae with full product catalogue, cart, checkout, and payment gateway integration.', 'E-Commerce', ARRAY['WooCommerce', 'WordPress', 'PHP'], 'https://monaestore.com/', 'published', false, 7),
  ('QR By Richie', 'qr-by-richie', 'A clean, fast QR code generation tool — create custom QR codes for links, contacts, and business profiles instantly.', 'Tools / SaaS', ARRAY['React', 'JavaScript', 'Vite'], 'https://qrbyrichie.online/', 'published', false, 8),
  ('SellConnect Uganda', 'sellconnect-uganda', 'A dynamic online marketplace for SellConnect Uganda connecting local vendors and buyers with listings, messaging, and secure checkout.', 'E-Commerce', ARRAY['React', 'Supabase', 'PostgreSQL'], 'https://sellconnectug.com/', 'published', false, 9),
  ('Light Junior School', 'light-junior-school', 'A vibrant, child-friendly school website for Light Junior School with news updates, gallery, admissions, and parent resources.', 'Education', ARRAY['WordPress', 'PHP', 'CMS'], 'https://lightjuniorschool.com/', 'published', false, 10)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════
-- 10. Register yourself as admin
-- ═══════════════════════════════════════════════════
-- After signing up at /admin/login, run this to promote your account:
-- Replace 'your-user-uuid' with your actual user ID from Auth > Users

-- INSERT INTO public.admin_users (user_id, email)
-- VALUES ('your-user-uuid', 'malisrichard@icloud.com');
