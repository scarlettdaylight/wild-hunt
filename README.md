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

No application tables yet — add migrations under `supabase/migrations/`.

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

## Scripts

| Command | Does |
| --- | --- |
| `yarn dev` | Dev server on http://localhost:3000 |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | ESLint |
| `yarn typecheck` | `tsc --noEmit` |

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
supabase/migrations/
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

1. Write a migration in `supabase/migrations/` that creates the table, enables
   Row Level Security, and adds policies. Without policies the table is
   readable by nobody.
2. Query it with `graphqlQuery` — `pg_graphql` picks up the new table
   automatically, no codegen step or server redeploy.

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
