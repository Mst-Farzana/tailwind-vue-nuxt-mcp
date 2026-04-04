// server/db/schemas/index.ts
import { pgTable, real, serial, text } from 'drizzle-orm/pg-core';

export const overview = pgTable('overview', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  value: text('value').notNull(),
  icon: text('icon').notNull(),
  icon_color: text('icon_color').notNull(),
  trend_value: real('trend_value').notNull(),
});

// Frontend interface uses camelCase
export interface OverviewItem {
  id: number;
  title: string;
  value: string;
  icon: string;
  iconColor: string; // 👈 camelCase
  trendValue: number; // 👈 camelCase
  statusText: string;
  statusColor: 'green' | 'red' | 'yellow' | 'blue';
}
