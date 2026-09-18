-- WH-16 AC7: updated_at maintains itself on every table.
--
-- Each case updates a row while deliberately trying to set updated_at back to
-- the year 2000. The trigger has to win: the column ends up at the current
-- transaction time regardless of what the client asked for, which is the same
-- guarantee as "the client never sets it".
begin;
create extension if not exists pgtap with schema extensions;

select plan(10);

select has_trigger('public', 'industries', 'industries_set_updated_at', 'industries has an updated_at trigger');
select has_trigger('public', 'platforms', 'platforms_set_updated_at', 'platforms has an updated_at trigger');
select has_trigger('public', 'companies', 'companies_set_updated_at', 'companies has an updated_at trigger');
select has_trigger('public', 'job_applications', 'job_applications_set_updated_at', 'job_applications has an updated_at trigger');
select has_trigger('public', 'job_application_stages', 'job_application_stages_set_updated_at', 'job_application_stages has an updated_at trigger');

insert into auth.users (id, email)
values ('22222222-2222-2222-2222-222222222222', 'updated-at-test@example.com');

insert into public.industries (id, name) overriding system value values (9101, 'Test Industry');
insert into public.platforms (id, name, url) overriding system value values (9101, 'Test Platform', 'https://example.com');
insert into public.companies (id, name) overriding system value values (9101, 'Test Company');

insert into public.job_applications (id, user_id, name, company_id, platform_id, industry_id, workplace_type)
overriding system value
values (9101, '22222222-2222-2222-2222-222222222222', 'Senior Engineer', 9101, 9101, 9101, 'remote');

insert into public.job_application_stages (id, job_application_id, note)
overriding system value
values (9101, 9101, 'Phone screen');

update public.industries set name = 'Renamed', updated_at = '2000-01-01' where id = 9101;
update public.platforms set name = 'Renamed', updated_at = '2000-01-01' where id = 9101;
update public.companies set name = 'Renamed', updated_at = '2000-01-01' where id = 9101;
update public.job_applications set name = 'Renamed', updated_at = '2000-01-01' where id = 9101;
update public.job_application_stages set note = 'Renamed', updated_at = '2000-01-01' where id = 9101;

select is(
  (select updated_at from public.industries where id = 9101),
  now(),
  'industries.updated_at ignores the client and uses the current time'
);
select is(
  (select updated_at from public.platforms where id = 9101),
  now(),
  'platforms.updated_at ignores the client and uses the current time'
);
select is(
  (select updated_at from public.companies where id = 9101),
  now(),
  'companies.updated_at ignores the client and uses the current time'
);
select is(
  (select updated_at from public.job_applications where id = 9101),
  now(),
  'job_applications.updated_at ignores the client and uses the current time'
);
select is(
  (select updated_at from public.job_application_stages where id = 9101),
  now(),
  'job_application_stages.updated_at ignores the client and uses the current time'
);

select * from finish();
rollback;
