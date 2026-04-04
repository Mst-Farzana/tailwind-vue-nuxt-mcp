import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  amount: integer('amount').notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  label: varchar('label', { length: 100 }),
  time: text('time').notNull(),
  via: varchar('via', { length: 100 }),
  account: varchar('account', { length: 100 }),
  icon: varchar('icon', { length: 150 }),
  icon_bg: varchar('icon_bg', { length: 150 }),
  created_at: timestamp('created_at').defaultNow(),
});
