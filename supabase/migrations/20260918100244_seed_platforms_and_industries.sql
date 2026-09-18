-- Starter rows for the two curated reference tables, so the app has something
-- to show on a fresh database.
--
-- This lives in a migration rather than `supabase/seed.sql` because seed.sql
-- only runs against the local stack on `db reset`; these rows are needed in
-- every environment. `on conflict do nothing` against the unique `name` keeps
-- it safe to re-run and keeps a later re-order of this list from duplicating
-- anything.

insert into public.platforms (name, url) values
  ('LinkedIn', 'https://www.linkedin.com/jobs'),
  ('Indeed', 'https://www.indeed.com'),
  ('Glassdoor', 'https://www.glassdoor.com/Job'),
  ('Otta', 'https://app.otta.com'),
  ('Welcome to the Jungle', 'https://www.welcometothejungle.com'),
  ('Wellfound', 'https://wellfound.com/jobs'),
  ('Hacker News Who Is Hiring', 'https://news.ycombinator.com'),
  ('Reed', 'https://www.reed.co.uk'),
  ('Totaljobs', 'https://www.totaljobs.com'),
  ('CV-Library', 'https://www.cv-library.co.uk')
on conflict (name) do nothing;

insert into public.industries (name) values
  ('Technology'),
  ('Finance'),
  ('Healthcare'),
  ('Education'),
  ('Retail & E-commerce'),
  ('Media & Entertainment'),
  ('Travel & Hospitality'),
  ('Energy & Utilities'),
  ('Manufacturing'),
  ('Transport & Logistics'),
  ('Real Estate & Construction'),
  ('Gaming'),
  ('Consulting & Professional Services'),
  ('Government & Public Sector'),
  ('Non-profit')
on conflict (name) do nothing;
