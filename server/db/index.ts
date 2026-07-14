import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '~/server/db/schemas/index';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, {
  schema,
});

export function getDb() {
  return db;
}

export { schema };
