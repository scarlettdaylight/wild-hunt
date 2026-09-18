-- Preset value lists from the WH-16 schema diagram, as enum types so the
-- database rejects anything outside them.
--
-- `pending` from the diagram is deliberately absent: it was the default for
-- `status` but never appeared in its own preset list. A new application starts
-- as `saved` -- bookmarked, not yet submitted.

create type public.application_status as enum (
  'saved',
  'applied',
  'interview',
  'rejected',
  'offer'
);

create type public.workplace_type as enum (
  'remote',
  'hybrid',
  'on_site'
);

create type public.employment_type as enum (
  'full_time',
  'part_time',
  'contract',
  'temporary'
);
