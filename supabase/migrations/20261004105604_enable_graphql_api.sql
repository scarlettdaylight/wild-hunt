-- Turns on the GraphQL API that `src/lib/graphql.ts` reads through.
--
-- Supabase stopped enabling pg_graphql on new projects in February 2026, so
-- without this `/graphql/v1` answers every query with "pg_graphql extension is
-- not enabled." Enabling it in the dashboard only covers that one database; this
-- covers local stacks and CI too, and is a no-op where it is already on.
create extension if not exists pg_graphql;

-- pg_graphql returns at most 30 rows per collection unless told otherwise, and
-- the Jobs page lists every application without pagination (WH-20). 1000
-- matches the REST API's `max_rows` in supabase/config.toml.
--
-- Set on the table rather than the schema: a schema comment is where every
-- other pg_graphql directive lives too (inflection, introspection), so changing
-- one there means restating the rest.
comment on table public.job_applications is e'@graphql({"max_rows": 1000})';
