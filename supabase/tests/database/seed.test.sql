-- WH-16 AC8: the starter reference data ships with the schema, and re-running
-- the seed changes nothing.
begin;
create extension if not exists pgtap with schema extensions;

select plan(7);

select ok((select count(*) from public.platforms) > 0, 'a fresh database has platforms to choose from');
select ok((select count(*) from public.industries) > 0, 'a fresh database has industries to choose from');

-- Every seeded platform is usable as a link, not just a label.
select is(
  (select count(*) from public.platforms where url is null or url = ''),
  0::bigint,
  'every seeded platform has a URL'
);

-- The unique constraint on `name` is what lets the seed use `on conflict do
-- nothing`; without it the migration would duplicate rows on every replay.
select col_is_unique('public', 'platforms', 'name', 'platforms.name is unique');
select col_is_unique('public', 'industries', 'name', 'industries.name is unique');

create temporary table seed_counts on commit drop as select
  (select count(*) from public.platforms) as platforms,
  (select count(*) from public.industries) as industries;

-- Replay a row the seed migration already inserted.
insert into public.platforms (name, url) values ('LinkedIn', 'https://www.linkedin.com/jobs')
on conflict (name) do nothing;
insert into public.industries (name) values ('Technology')
on conflict (name) do nothing;

select is(
  (select count(*) from public.platforms),
  (select platforms from seed_counts),
  're-seeding a platform adds nothing'
);
select is(
  (select count(*) from public.industries),
  (select industries from seed_counts),
  're-seeding an industry adds nothing'
);

select * from finish();
rollback;
