// server/db/schema.ts
import { integer, jsonb, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  company: text('company').notNull(),
  city: text('city').notNull(),
  progress: integer('progress').default(0),
  created: timestamp('created').defaultNow(),
  avatar: text('avatar').notNull(),
  via: text('via').notNull(),
});

export const financetable = pgTable('financetable', {
  id: serial('id').primaryKey(),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  date: timestamp('date').notNull(),
  via: text('via').notNull(),
  account: text('account').notNull(),
  action: text('action').notNull(),
  icon: text('icon').notNull(),
});

export const financialStats = pgTable('financial_stats', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  value: text('value').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  date: text('date').notNull(),
  tags: text('tags').array().notNull(),
  price: text('price').notNull(),
  avatar: text('avatar').notNull(),
});

export const trendsTable = pgTable('trends_data', {
  id: serial('id').primaryKey(),

  graph: jsonb('graph')
    .$type<{
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    }>()
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});
