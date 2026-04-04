// server/db/schema/users_custom.ts
import { boolean, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users_custom = pgTable('users_custom', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  avatar: varchar('avatar', { length: 255 }),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  verified: boolean('verified').default(false).notNull(),
  lastLoginAt: timestamp('last_login_at', { mode: 'date' }),
  lastLoginIp: varchar('last_login_ip', { length: 45 }),
  notificationsEnabled: boolean('notifications_enabled').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
