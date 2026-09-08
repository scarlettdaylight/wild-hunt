import { createClient } from "@/lib/supabase/server";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/**
 * Runs a query against Supabase's built-in GraphQL API (pg_graphql), which is
 * generated from the database schema — there is no server of our own to deploy.
 *
 * The caller's access token is forwarded so Row Level Security decides what
 * comes back; signed out, that is nothing.
 *
 * pg_graphql name inflection is off by default, so the schema mirrors Postgres
 * exactly: a table `things` is queried as `thingsCollection` and columns keep
 * their snake_case names.
 */
export async function graphqlQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(`${supabaseUrl()}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabasePublishableKey(),
      Authorization: `Bearer ${session?.access_token ?? supabasePublishableKey()}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  const payload: GraphQLResponse<T> = await response.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join("; "));
  }
  if (!payload.data) {
    throw new Error("GraphQL response contained no data");
  }

  return payload.data;
}

/** Unwraps pg_graphql's Relay-style `{ edges: [{ node }] }` envelope. */
export function nodes<T>(collection: { edges: { node: T }[] } | null): T[] {
  return collection?.edges.map((edge) => edge.node) ?? [];
}
