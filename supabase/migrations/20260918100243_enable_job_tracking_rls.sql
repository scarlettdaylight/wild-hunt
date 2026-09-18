-- Row level security for the WH-16 tables.
--
-- Every table is locked down by default: a table with RLS enabled and no
-- matching policy returns nothing and accepts nothing. Each policy below
-- therefore opens exactly one door, and anything not listed stays shut --
-- including every operation for the `anon` role, which gets no policies at all.
--
-- `auth.uid()` is wrapped in a scalar subquery so Postgres evaluates it once
-- per statement rather than once per row.

alter table public.industries enable row level security;
alter table public.platforms enable row level security;
alter table public.companies enable row level security;
alter table public.job_applications enable row level security;
alter table public.job_application_stages enable row level security;

-- Reference tables -----------------------------------------------------------

-- Industries and platforms are a curated list: readable by anyone signed in,
-- writable only through a migration.
create policy "Signed-in users can read industries"
  on public.industries
  for select
  to authenticated
  using (true);

create policy "Signed-in users can read platforms"
  on public.platforms
  for select
  to authenticated
  using (true);

-- Companies are the exception: users add their own as plain text. Adding is
-- allowed, editing and removing are not -- one user must not be able to rewrite
-- or delete a company another user's application points at.
create policy "Signed-in users can read companies"
  on public.companies
  for select
  to authenticated
  using (true);

create policy "Signed-in users can add companies"
  on public.companies
  for insert
  to authenticated
  with check (true);

-- Applications ---------------------------------------------------------------

create policy "Users can read their own applications"
  on public.job_applications
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own applications"
  on public.job_applications
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- `with check` as well as `using`: without it a user could pass ownership of
-- one of their rows to someone else.
create policy "Users can update their own applications"
  on public.job_applications
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own applications"
  on public.job_applications
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Stages have no `user_id` of their own; ownership is inherited from the
-- application they belong to.
create policy "Users can read stages of their own applications"
  on public.job_application_stages
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.job_applications
      where job_applications.id = job_application_stages.job_application_id
        and job_applications.user_id = (select auth.uid())
    )
  );

create policy "Users can create stages on their own applications"
  on public.job_application_stages
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.job_applications
      where job_applications.id = job_application_stages.job_application_id
        and job_applications.user_id = (select auth.uid())
    )
  );

create policy "Users can update stages of their own applications"
  on public.job_application_stages
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.job_applications
      where job_applications.id = job_application_stages.job_application_id
        and job_applications.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.job_applications
      where job_applications.id = job_application_stages.job_application_id
        and job_applications.user_id = (select auth.uid())
    )
  );

create policy "Users can delete stages of their own applications"
  on public.job_application_stages
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.job_applications
      where job_applications.id = job_application_stages.job_application_id
        and job_applications.user_id = (select auth.uid())
    )
  );
