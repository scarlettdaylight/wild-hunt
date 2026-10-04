-- WH-20: the GraphQL query behind the Jobs page.
--
-- Runs the page's query through `graphql_public.graphql`, the function the
-- `/graphql/v1` endpoint calls, so what is checked here is what the page gets.
--
-- A has 31 applications -- one more than pg_graphql's default page size of 30 --
-- so a missing `max_rows` override shows up as a short list.
begin;
create extension if not exists pgtap with schema extensions;

select plan(6);

select has_extension('pg_graphql', 'pg_graphql is enabled');

-- Fixtures, created as the superuser before any role switching ---------------

insert into auth.users (id, email) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user-a@example.com'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'user-b@example.com');

insert into public.industries (id, name) overriding system value values (9401, 'Test Industry');
insert into public.platforms (id, name, url) overriding system value values (9401, 'Test Platform', 'https://example.com');
insert into public.companies (id, name) overriding system value values (9401, 'A Company'), (9402, 'B Company');

-- A's applications are a day apart, so "A role 1" is the newest.
insert into public.job_applications (user_id, name, company_id, platform_id, industry_id, workplace_type, location, created_at)
select 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'A role ' || n, 9401, 9401, 9401, 'remote', 'London', now() - make_interval(days => n)
from generate_series(1, 31) as n;

-- B's is newer than all of A's, so it would come first if RLS let it through.
insert into public.job_applications (user_id, name, company_id, platform_id, industry_id, workplace_type)
values ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'B role', 9402, 9401, 9401, 'hybrid');

-- Signed in as A -------------------------------------------------------------

do $$ begin
  perform set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","role":"authenticated"}', true);
  perform set_config('role', 'authenticated', true);
end $$;

create temporary table result on commit drop as
select graphql_public.graphql(query := $$
  {
    job_applicationsCollection(orderBy: [{ created_at: DescNullsLast }, { id: DescNullsLast }]) {
      edges { node { id name status location companies { name } } }
    }
  }
$$) as body;

select is(body -> 'errors', null, 'the query has no errors') from result;

select is(
  jsonb_array_length(body #> '{data,job_applicationsCollection,edges}'),
  31,
  'A gets all 31 applications, past the default page size of 30'
) from result;

select is(
  body #>> '{data,job_applicationsCollection,edges,0,node,name}',
  'A role 1',
  'the newest application comes first'
) from result;

select is(
  body #>> '{data,job_applicationsCollection,edges,0,node,companies,name}',
  'A Company',
  'the company name comes through the foreign key'
) from result;

select ok(
  not (body::text like '%B role%'),
  'A never sees B''s application'
) from result;

select * from finish();
rollback;
