import config from "@payload-config";
import { getPayload, type Payload } from "payload";
import type { Pool } from "pg";

import { migrations } from "@/payload/migrations";

// The generated migration files type their args per adapter; migrate()
// takes the generic form, the same list prodMigrations would receive.
type MigrationList = NonNullable<NonNullable<Parameters<Payload["db"]["migrate"]>[0]>["migrations"]>;

// Arbitrary key shared by every process that may migrate the database.
const MIGRATION_LOCK = 4_271_903_118;

let ready: Promise<Payload> | null = null;

/**
 * Payload's Local API (no HTTP), shared by every content getter.
 *
 * In production, pending migrations run on first use, under a Postgres
 * advisory lock: `next build` renders pages in several processes at once,
 * and without the lock each would apply the same migrations in parallel.
 * The first process migrates; the others wait, then find nothing to do.
 */
export function cms(): Promise<Payload> {
  ready ??= (async () => {
    const payload = await getPayload({ config });
    if (process.env.NODE_ENV === "production") await migrateOnce(payload);
    return payload;
  })();
  return ready;
}

async function migrateOnce(payload: Payload) {
  const pool = (payload.db as unknown as { pool: Pool }).pool;
  const client = await pool.connect();
  try {
    await client.query("SELECT pg_advisory_lock($1)", [MIGRATION_LOCK]);
    await payload.db.migrate({ migrations: migrations as unknown as MigrationList });
  } finally {
    await client.query("SELECT pg_advisory_unlock($1)", [MIGRATION_LOCK]).catch(() => {});
    client.release();
  }
}

/** URL of an uploaded media document, if the relation is populated. */
export function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === "object" && "url" in value && typeof value.url === "string") return value.url;
  return undefined;
}
