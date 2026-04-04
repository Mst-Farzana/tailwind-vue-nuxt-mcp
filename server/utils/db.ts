// server/utils/db.ts
import { useRuntimeConfig } from '#imports';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Singleton type
const globalForDb = globalThis as {
  pool?: Pool;
  db?: ReturnType<typeof drizzle>;
};

export function getDb() {
  if (!globalForDb.db) {
    const config = useRuntimeConfig();
    const connectionString = config.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is missing in runtime config');
    }

    const pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    globalForDb.pool = pool;
    globalForDb.db = drizzle(pool);
  }

  return globalForDb.db;
}
