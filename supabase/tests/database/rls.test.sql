-- WH-16 AC5 and AC6: row level security.
--
-- Two users, each with an application and a stage. Everything below is about
-- what one user can see and do to the other's rows, and what anyone can do to
-- the reference tables.
--
-- Roles are switched with set_config rather than SET LOCAL ROLE so the change
-- survives the DO block it is made in.
begin;
create extension if not exists pgtap with schema extensions;

select plan(32);

-- Fixtures, created as the superuser before any role switching ---------------

insert into auth.users (id, email) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user-a@example.com'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'user-b@example.com');

-- 9201 is referenced by the applications below; 9202 is spare, so the update
-- and delete cases cannot pass for the wrong reason (a foreign key complaint
-- rather than an RLS refusal).
insert into public.industries (id, name) overriding system value
  values (9201, 'Test Industry'), (9202, 'Spare Industry');
insert into public.platforms (id, name, url) overriding system value
  values (9201, 'Test Platform', 'https://example.com'), (9202, 'Spare Platform', 'https://example.org');
insert into public.companies (id, name) overriding system value
  values (9201, 'Test Company'), (9202, 'Spare Company');

insert into public.job_applications (id, user_id, name, company_id, platform_id, industry_id, workplace_type)
overriding system value values
  (9201, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'A Senior Engineer', 9201, 9201, 9201, 'remote'),
  (9202, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'B Staff Engineer', 9201, 9201, 9201, 'hybrid');

insert into public.job_application_stages (id, job_application_id, note) overriding system value values
  (9201, 9201, 'A phone screen'),
  (9202, 9202, 'B phone screen');

-- Every table is locked down -------------------------------------------------

select ok((select relrowsecurity from pg_class where oid = 'public.industries'::regclass), 'RLS is on for industries');
select ok((select relrowsecurity from pg_class where oid = 'public.platforms'::regclass), 'RLS is on for platforms');
select ok((select relrowsecurity from pg_class where oid = 'public.companies'::regclass), 'RLS is on for companies');
select ok((select relrowsecurity from pg_class where oid = 'public.job_applications'::regclass), 'RLS is on for job_applications');
select ok((select relrowsecurity from pg_class where oid = 'public.job_application_stages'::regclass), 'RLS is on for job_application_stages');

-- AC5: a user only ever sees their own applications ---------------------------

do $$ begin
  perform set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","role":"authenticated"}', true);
  perform set_config('role', 'authenticated', true);
end $$;

select is((select count(*) from public.job_applications), 1::bigint, 'A sees exactly one application');
select is((select id from public.job_applications), 9201::bigint, 'the application A sees is their own');
select is((select count(*) from public.job_application_stages), 1::bigint, 'A sees only their own stages');

do $$ begin
  perform set_config('request.jwt.claims', '{"sub":"bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb","role":"authenticated"}', true);
  perform set_config('role', 'authenticated', true);
end $$;

select is((select count(*) from public.job_applications where id = 9201), 0::bigint, 'B cannot see A''s application');
select is((select count(*) from public.job_application_stages where job_application_id = 9201), 0::bigint, 'B cannot see A''s stages');

select throws_ok(
  $$ insert into public.job_applications (user_id, name, company_id, platform_id, industry_id, workplace_type)
     values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Planted', 9201, 9201, 9201, 'remote') $$,
  '42501',
  null,
  'B cannot create an application owned by A'
);

select throws_ok(
  $$ insert into public.job_application_stages (job_application_id, note) values (9201, 'Planted') $$,
  '42501',
  null,
  'B cannot add a stage to A''s application'
);

-- These affect no rows rather than raising: the USING clause filters them out.
update public.job_applications set name = 'Hijacked by B' where id = 9201;
delete from public.job_applications where id = 9201;
update public.job_application_stages set note = 'Hijacked by B' where id = 9201;
delete from public.job_application_stages where id = 9201;

do $$ begin perform set_config('role', 'postgres', true); end $$;

select is((select name from public.job_applications where id = 9201), 'A Senior Engineer', 'B''s update left A''s application alone');
select is((select count(*) from public.job_applications where id = 9201), 1::bigint, 'B''s delete left A''s application alone');
select is((select note from public.job_application_stages where id = 9201), 'A phone screen', 'B''s update left A''s stage alone');
select is((select count(*) from public.job_application_stages where id = 9201), 1::bigint, 'B''s delete left A''s stage alone');

-- AC6: reference tables are readable, and companies are user-extendable -------

do $$ begin
  perform set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","role":"authenticated"}', true);
  perform set_config('role', 'authenticated', true);
end $$;

select ok((select count(*) from public.industries) > 0, 'a signed-in user can read industries');
select ok((select count(*) from public.platforms) > 0, 'a signed-in user can read platforms');
select ok((select count(*) from public.companies) > 0, 'a signed-in user can read companies');

select lives_ok(
  $$ insert into public.companies (name) values ('A company the user typed') $$,
  'a signed-in user can add a company by name alone'
);

select throws_ok(
  $$ insert into public.industries (name) values ('Planted') $$,
  '42501',
  null,
  'a signed-in user cannot add an industry'
);
select throws_ok(
  $$ insert into public.platforms (name, url) values ('Planted', 'https://example.net') $$,
  '42501',
  null,
  'a signed-in user cannot add a platform'
);

update public.companies set name = 'Hijacked' where id = 9202;
delete from public.companies where id = 9202;
update public.industries set name = 'Hijacked' where id = 9202;
delete from public.industries where id = 9202;
update public.platforms set name = 'Hijacked' where id = 9202;
delete from public.platforms where id = 9202;

do $$ begin perform set_config('role', 'postgres', true); end $$;

select is((select name from public.companies where id = 9202), 'Spare Company', 'a company cannot be renamed from the client');
select is((select count(*) from public.companies where id = 9202), 1::bigint, 'a company cannot be deleted from the client');
select is((select name from public.industries where id = 9202), 'Spare Industry', 'an industry cannot be renamed from the client');
select is((select count(*) from public.industries where id = 9202), 1::bigint, 'an industry cannot be deleted from the client');
select is((select name from public.platforms where id = 9202), 'Spare Platform', 'a platform cannot be renamed from the client');
select is((select count(*) from public.platforms where id = 9202), 1::bigint, 'a platform cannot be deleted from the client');

-- Signed out, nothing is visible ----------------------------------------------

do $$ begin
  perform set_config('request.jwt.claims', '{"role":"anon"}', true);
  perform set_config('role', 'anon', true);
end $$;

select is((select count(*) from public.job_applications), 0::bigint, 'a signed-out visitor sees no applications');
select is((select count(*) from public.industries), 0::bigint, 'a signed-out visitor sees no industries');
select is((select count(*) from public.companies), 0::bigint, 'a signed-out visitor sees no companies');
select throws_ok(
  $$ insert into public.companies (name) values ('Planted') $$,
  '42501',
  null,
  'a signed-out visitor cannot add a company'
);

do $$ begin perform set_config('role', 'postgres', true); end $$;

select * from finish();
rollback;
