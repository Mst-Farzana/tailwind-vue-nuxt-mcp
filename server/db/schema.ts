import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  fullName: varchar('full_name'),
  password: varchar('password'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const accounts = pgTable('accounts', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  provider: varchar('provider').notNull(),
  providerAccountId: varchar('provider_account_id').notNull(),
});
