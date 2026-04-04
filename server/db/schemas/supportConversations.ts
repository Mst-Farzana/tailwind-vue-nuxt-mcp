import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const supportConversations = pgTable('support_conversations', {
  id: serial('id').primaryKey(),

  user_id: integer('user_id'),
  email: varchar('email', { length: 255 }),

  status: varchar('status', {
    length: 20,
    enum: ['open', 'pending', 'closed'],
  }).default('open'),

  created_at: timestamp('created_at').defaultNow(),
});
