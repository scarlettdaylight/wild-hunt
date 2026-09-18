-- The five tables from the WH-16 schema diagram.
--
-- `moddatetime` keeps `updated_at` honest: the client never sets it, so a row
-- cannot be updated without its timestamp moving.
create extension if not exists moddatetime with schema extensions;

-- Reference tables -----------------------------------------------------------

create table public.industries (
  id bigint generated always as identity primary key,
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger industries_set_updated_at
  before update on public.industries
  for each row execute function extensions.moddatetime (updated_at);

create table public.platforms (
  id bigint generated always as identity primary key,
  name text not null unique,
  url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger platforms_set_updated_at
  before update on public.platforms
  for each row execute function extensions.moddatetime (updated_at);

-- Unlike the two above, companies are user-extendable: anyone can add one by
-- typing a name. `name` is therefore not unique and `url` is nullable, because
-- a user typing "Acme" has neither a canonical spelling nor a URL to hand.
-- Deduplication is deferred -- see WH-16.
create table public.companies (
  id bigint generated always as identity primary key,
  name text not null,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger companies_set_updated_at
  before update on public.companies
  for each row execute function extensions.moddatetime (updated_at);

-- Applications ---------------------------------------------------------------

create table public.job_applications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  company_id bigint not null references public.companies (id),
  platform_id bigint not null references public.platforms (id),
  industry_id bigint not null references public.industries (id),
  status public.application_status not null default 'saved',
  workplace_type public.workplace_type not null,
  employment_type public.employment_type not null default 'full_time',
  -- Null until the application is actually sent; a `saved` job has no
  -- submission date.
  submitted_at timestamptz,
  career_url text,
  remark text,
  salary_expectation integer,
  about text,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index job_applications_user_id_idx on public.job_applications (user_id);
create index job_applications_company_id_idx on public.job_applications (company_id);
create index job_applications_platform_id_idx on public.job_applications (platform_id);
create index job_applications_industry_id_idx on public.job_applications (industry_id);

create trigger job_applications_set_updated_at
  before update on public.job_applications
  for each row execute function extensions.moddatetime (updated_at);

-- One row per event in an application's timeline. `stage` is a 1-based ordinal
-- ordering those events; what each one was lives in `note`.
create table public.job_application_stages (
  id bigint generated always as identity primary key,
  job_application_id bigint not null
    references public.job_applications (id) on delete cascade,
  stage integer not null default 1,
  note text,
  scheduled_for timestamptz,
  occurred_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index job_application_stages_job_application_id_idx
  on public.job_application_stages (job_application_id);

create trigger job_application_stages_set_updated_at
  before update on public.job_application_stages
  for each row execute function extensions.moddatetime (updated_at);
