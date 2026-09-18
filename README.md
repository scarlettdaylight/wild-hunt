# Wild Hunt

Next.js 16 (App Router, React 19) + Supabase starter.

## Architecture

There is no backend service to run. Supabase supplies the whole data tier:

| Concern | Provided by |
| --- | --- |
| Storage | Supabase Postgres |
| GraphQL API | `pg_graphql`, auto-generated from the schema at `/graphql/v1` |
| Auth | Supabase Auth, session in cookies via `@supabase/ssr` |
| Authorization | Row Level Security policies on each table |

The database schema *is* the API. Adding a column adds it to the GraphQL
schema, and the only place authorization lives is the RLS policies on the table.

## What's here

- Email/password auth — sign up, sign in, sign out.
- Password reset: request a link, then set a new password.
- `/account/confirm` handles every emailed auth link (signup + recovery) by
  exchanging the one-time token for a session.
- Cookie-based sessions refreshed on every request in `src/proxy.ts`.
- Route gating: anything outside `PUBLIC_ROUTES` requires a session.
- A typed `pg_graphql` client (`src/lib/graphql.ts`) for reads.
- Four placeholder sections to build on: dashboard, jobs, documents, settings.

- Job tracking schema: applications, their companies, platforms, industries
  and interview stages, with RLS policies and pgTAP tests.

## Setup

1. Create a project at [supabase.com](https://supabase.com).

2. Copy the env template and fill it in from **Project settings → Data API**:

   ```bash
   cp .env.example .env.local
   ```

   Both values are public — the publishable key grants only what RLS allows.
   Never put the secret (service-role) key in a `NEXT_PUBLIC_` variable.

   In the Supabase dashboard, add `<your-origin>/account/confirm` to
   **Authentication → URL Configuration → Redirect URLs**, or the emailed links
   will be rejected.

3. Install and run:

   ```bash
   yarn install
   yarn dev
   ```

4. For schema work, run the database locally. This needs **Docker Desktop
   installed and running** — the CLI talks to the Docker daemon and will not
   install it for you (https://docs.docker.com/desktop/). There is no
   `supabase init` step: `supabase/config.toml` is committed.

   ```bash
   yarn db:start   # first run pulls a few GB of images
   ```

   `db:start` prints the local URL and keys. Point `.env.local` at those to
   develop against local data instead of the hosted project, and restart
   `yarn dev` — `NEXT_PUBLIC_` variables are inlined at build time.

   Studio, a browser UI for the tables, runs at http://127.0.0.1:54323. It
   connects as superuser and so bypasses RLS: it shows every row, not what a
   signed-in user would see. Only the pgTAP tests check the policies.

   Note that `db:start` applies migrations **only when creating the database**.
   Once it exists, new migrations pulled from git need `yarn db:up`.

## Scripts

| Command | Does |
| --- | --- |
| `yarn dev` | Dev server on http://localhost:3000 |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | ESLint |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn db:start` | Start the local Supabase stack (needs Docker) |
| `yarn db:stop` | Stop it again |
| `yarn db:up` | Apply migrations that exist as files but not yet in the local database |
| `yarn db:reset` | Drop the local database and replay every migration |
| `yarn db:test` | Run the pgTAP tests in `supabase/tests/database/` |

## Layout

Route groups split the app by access, not by URL. Folders wrapped in
parentheses are organisational only — they never appear in the path, so
`(auth)/login/page.tsx` serves `/login`.

```
src/
  app/
    layout.tsx      Document shell only — html/body, no chrome
    (public)/       No session required
      layout.tsx      SiteHeader across the top
      page.tsx        /
      (auth)/       Sign in/up, password reset
        account/confirm/  /account/confirm — emailed-link landing
    (protected)/    Session-gated
      layout.tsx      Full-height sidebar beside the header
                      (an overlay drawer below `md`)
      dashboard/      /dashboard
      jobs/           /jobs
      documents/      /documents
      settings/       /settings
  components/
  lib/
    auth/actions.ts Server actions for sign in/up/out and password reset
    routes.ts       Every URL in one map, plus the public-route list
    sidebar.ts      Cookie name shared by the layout and the Sidebar
    graphql.ts      pg_graphql client
    safe-path.ts    Same-origin guard for redirect targets
    supabase/       Browser, server and proxy clients
  proxy.ts          Refreshes the session, gates protected routes
supabase/
  migrations/     Schema, applied in filename order
  tests/database/ pgTAP tests, run with `yarn db:test`
  config.toml     Local stack settings
```

## Deploying to Vercel

Import the repo at [vercel.com/new](https://vercel.com/new). Framework, build
command and output are all detected — nothing to configure.

Two things do need doing by hand:

1. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   under **Settings → Environment Variables**, for every environment you want
   to build (Production, Preview, Development).

2. In Supabase, under **Authentication → URL Configuration**:
   - set **Site URL** to your production domain;
   - add `https://your-domain/account/confirm` to **Redirect URLs**.

   To let preview deployments log in too, also add a wildcard such as
   `https://your-project-*.vercel.app/**`.

Emailed links point at the production domain rather than the per-deployment
hostname — see `origin()` in `src/lib/auth/actions.ts`. Override it with
`NEXT_PUBLIC_SITE_URL` if you serve from a custom domain.

## Adding data

1. `yarn supabase migration new <name>` for a timestamped file in
   `supabase/migrations/`. Create the table, enable Row Level Security, and add
   policies. Without policies the table is readable by nobody.
2. `yarn db:reset` replays every migration from scratch, which is the only way
   to know the whole set still applies in order.
3. Cover the policies with a pgTAP test in `supabase/tests/database/` and run
   `yarn db:test`. RLS mistakes are invisible until someone sees another user's
   rows, so they are worth a test even when nothing else is.
4. Query it with `graphqlQuery` — `pg_graphql` picks up the new table
   automatically, no codegen step or server redeploy.

Reference data that every environment needs (the platform and industry lists,
for instance) goes in a migration with `on conflict do nothing`, not in
`supabase/seed.sql` — seed.sql only runs locally, and only on reset. Loading
seed.sql is switched off in `config.toml` for that reason.

Migrations are forward-only: there are no down files to write. `supabase
migration down` is not a rollback — it replays from scratch up to an earlier
version and drops your local data doing it. To undo a migration that has already
been pushed, write a new one that reverses it. Locally, deleting the file and
running `yarn db:reset` is simpler.

After pulling someone else's migrations, `yarn db:up` applies the new ones and
keeps your local data; `yarn db:reset` throws the data away and replays
everything from the first migration.

Reads go through GraphQL; writes are usually terser through `supabase-js`
(`createClient().from(...)`), which enforces the same policies.

## Notes

Next 16 renamed the `middleware` file convention to `proxy` — the session
refresh lives in `src/proxy.ts`, and `src/lib/supabase/proxy.ts` holds the
logic.

Route groups are invisible at runtime, so the proxy cannot tell a `(public)`
page from a `(protected)` one by its path. `PUBLIC_ROUTES` in
`src/lib/routes.ts` mirrors the split by hand — add a page to the `(public)`
group and you must list it there too, or it will redirect to sign-in.

Redirect targets from query strings (`?redirect=`, `?next=`) go through
`safePath`, which resolves them against a throwaway origin instead of
string-matching — browsers normalise backslashes to slashes, so `/\/evil.com`
is protocol-relative in practice and a `startsWith("//")` check would let it
through.
