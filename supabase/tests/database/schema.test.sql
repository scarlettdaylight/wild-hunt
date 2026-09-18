-- WH-16 AC1, AC2, AC3, AC4: the shape of the schema.
begin;
create extension if not exists pgtap with schema extensions;

select plan(64);

-- AC1: reference tables -------------------------------------------------------

select has_table('public', 'industries', 'industries exists');
select has_table('public', 'platforms', 'platforms exists');
select has_table('public', 'companies', 'companies exists');

select col_is_pk('public', 'industries', 'id', 'industries.id is the primary key');
select col_is_pk('public', 'platforms', 'id', 'platforms.id is the primary key');
select col_is_pk('public', 'companies', 'id', 'companies.id is the primary key');

select col_type_is('public', 'industries', 'id', 'bigint', 'industries.id is int8');
select col_type_is('public', 'platforms', 'id', 'bigint', 'platforms.id is int8');
select col_type_is('public', 'companies', 'id', 'bigint', 'companies.id is int8');

select col_not_null('public', 'industries', 'name', 'industries.name is required');
select col_not_null('public', 'platforms', 'name', 'platforms.name is required');
select col_not_null('public', 'platforms', 'url', 'platforms.url is required');
select col_not_null('public', 'companies', 'name', 'companies.name is required');

-- A user adds a company by typing a name, so it cannot be made to supply a URL.
select col_is_null('public', 'companies', 'url', 'companies.url is optional');

-- AC2: job_applications -------------------------------------------------------

select has_table('public', 'job_applications', 'job_applications exists');
select col_is_pk('public', 'job_applications', 'id', 'job_applications.id is the primary key');
select col_type_is('public', 'job_applications', 'id', 'bigint', 'job_applications.id is int8');

select col_not_null('public', 'job_applications', 'user_id', 'user_id is required');
select col_not_null('public', 'job_applications', 'name', 'name is required');
select col_not_null('public', 'job_applications', 'company_id', 'company_id is required');
select col_not_null('public', 'job_applications', 'platform_id', 'platform_id is required');
select col_not_null('public', 'job_applications', 'industry_id', 'industry_id is required');
select col_not_null('public', 'job_applications', 'status', 'status is required');
select col_not_null('public', 'job_applications', 'workplace_type', 'workplace_type is required');
select col_not_null('public', 'job_applications', 'employment_type', 'employment_type is required');
select col_not_null('public', 'job_applications', 'created_at', 'created_at is required');
select col_not_null('public', 'job_applications', 'updated_at', 'updated_at is required');

-- A saved job has not been submitted yet, so it has no submission date.
select col_is_null('public', 'job_applications', 'submitted_at', 'submitted_at is optional');
select col_is_null('public', 'job_applications', 'career_url', 'career_url is optional');
select col_is_null('public', 'job_applications', 'remark', 'remark is optional');
select col_is_null('public', 'job_applications', 'salary_expectation', 'salary_expectation is optional');
select col_is_null('public', 'job_applications', 'about', 'about is optional');
select col_is_null('public', 'job_applications', 'location', 'location is optional');

select col_type_is('public', 'job_applications', 'user_id', 'uuid', 'user_id is a uuid');
select col_type_is('public', 'job_applications', 'salary_expectation', 'integer', 'salary_expectation is int4');

select fk_ok(
  'public', 'job_applications', 'user_id',
  'auth', 'users', 'id',
  'job_applications.user_id references auth.users'
);
select fk_ok(
  'public', 'job_applications', 'company_id',
  'public', 'companies', 'id',
  'job_applications.company_id references companies'
);
select fk_ok(
  'public', 'job_applications', 'platform_id',
  'public', 'platforms', 'id',
  'job_applications.platform_id references platforms'
);
select fk_ok(
  'public', 'job_applications', 'industry_id',
  'public', 'industries', 'id',
  'job_applications.industry_id references industries'
);

-- AC3: job_application_stages -------------------------------------------------

select has_table('public', 'job_application_stages', 'job_application_stages exists');
select col_is_pk('public', 'job_application_stages', 'id', 'stages.id is the primary key');
select col_not_null('public', 'job_application_stages', 'job_application_id', 'job_application_id is required');
select col_not_null('public', 'job_application_stages', 'stage', 'stage is required');
select col_is_null('public', 'job_application_stages', 'note', 'note is optional');
select col_is_null('public', 'job_application_stages', 'scheduled_for', 'scheduled_for is optional');
select col_is_null('public', 'job_application_stages', 'occurred_at', 'occurred_at is optional');
select col_type_is('public', 'job_application_stages', 'stage', 'integer', 'stage is int4');
select fk_ok(
  'public', 'job_application_stages', 'job_application_id',
  'public', 'job_applications', 'id',
  'stages reference their application'
);

-- AC4: enum types -------------------------------------------------------------

select enum_has_labels(
  'public', 'application_status',
  array['saved', 'applied', 'interview', 'rejected', 'offer'],
  'application_status covers the whole application lifecycle'
);
select enum_has_labels(
  'public', 'workplace_type',
  array['remote', 'hybrid', 'on_site'],
  'workplace_type covers every working arrangement'
);
select enum_has_labels(
  'public', 'employment_type',
  array['full_time', 'part_time', 'contract', 'temporary'],
  'employment_type covers every contract shape'
);

-- Behaviour -------------------------------------------------------------------

insert into auth.users (id, email)
values ('11111111-1111-1111-1111-111111111111', 'schema-test@example.com');

insert into public.companies (id, name) overriding system value values (9001, 'Test Company');
insert into public.platforms (id, name, url) overriding system value values (9001, 'Test Platform', 'https://example.com');
insert into public.industries (id, name) overriding system value values (9001, 'Test Industry');

insert into public.job_applications (id, user_id, name, company_id, platform_id, industry_id, workplace_type)
overriding system value
values (9001, '11111111-1111-1111-1111-111111111111', 'Senior Engineer', 9001, 9001, 9001, 'remote');

-- AC4: the defaults land on a row that did not ask for them.
select is(
  (select status from public.job_applications where id = 9001),
  'saved'::public.application_status,
  'a new application defaults to saved'
);
select is(
  (select employment_type from public.job_applications where id = 9001),
  'full_time'::public.employment_type,
  'a new application defaults to full_time'
);
select is(
  (select submitted_at from public.job_applications where id = 9001),
  null,
  'a saved application has no submission date'
);

-- AC1 and AC2: the timestamps default to now() rather than being supplied by
-- the client. Inside a transaction now() is the transaction's start time, which
-- is exactly what the column defaults resolve to.
select is(
  (select created_at from public.job_applications where id = 9001),
  now(),
  'a new application stamps its own created_at'
);
select is(
  (select updated_at from public.job_applications where id = 9001),
  now(),
  'a new application stamps its own updated_at'
);
select is(
  (select count(*) from (
    select created_at, updated_at from public.industries where id = 9001
    union all
    select created_at, updated_at from public.platforms where id = 9001
    union all
    select created_at, updated_at from public.companies where id = 9001
  ) as reference_rows where created_at = now() and updated_at = now()),
  3::bigint,
  'a new reference row stamps its own timestamps'
);

-- AC4: a value outside the list is refused.
select throws_ok(
  $$ update public.job_applications set status = 'ghosted' where id = 9001 $$,
  '22P02',
  null,
  'a status outside the enum is rejected'
);
select throws_ok(
  $$ update public.job_applications set workplace_type = 'underwater' where id = 9001 $$,
  '22P02',
  null,
  'a workplace_type outside the enum is rejected'
);
select throws_ok(
  $$ update public.job_applications set employment_type = 'seasonal' where id = 9001 $$,
  '22P02',
  null,
  'an employment_type outside the enum is rejected'
);

-- AC3: stages are removed with their application.
insert into public.job_application_stages (job_application_id, stage, note)
values (9001, 1, 'Phone screen'), (9001, 2, 'Tech test'), (9001, 3, 'Onsite');

select is(
  (select count(*) from public.job_application_stages where job_application_id = 9001),
  3::bigint,
  'the application has three stages'
);
select is(
  (select stage from public.job_application_stages where job_application_id = 9001 and note = 'Phone screen'),
  1,
  'stage is a 1-based ordinal'
);

-- AC3: a stage added without an ordinal is the first one.
insert into public.job_application_stages (job_application_id, note)
values (9001, 'Added without an ordinal');

select is(
  (select stage from public.job_application_stages where note = 'Added without an ordinal'),
  1,
  'a stage defaults to the first one'
);

delete from public.job_applications where id = 9001;

select is(
  (select count(*) from public.job_application_stages where job_application_id = 9001),
  0::bigint,
  'deleting an application deletes its stages'
);

select * from finish();
rollback;
