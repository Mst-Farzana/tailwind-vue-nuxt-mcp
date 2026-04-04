import { index, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { supportConversations } from './supportConversations';

export const supportMessages = pgTable(
  'support_messages',
  {
    id: serial('id').primaryKey(),
    conversation_id: integer('conversation_id')
      .notNull()
      .references(() => supportConversations.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 20, enum: ['system', 'user', 'assistant', 'agent'] }).notNull(),
    content: text('content').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
  },
  table => ({
    conversationIdx: index('conversation_id_idx').on(table.conversation_id),
  }),
);
