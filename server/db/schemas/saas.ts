// server/db/schemas/saas.ts
import crypto from 'crypto';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { user } from './auth';

/* ================= ORGANIZATIONS ================= */
export const saasOrganizations = pgTable('organizations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const members = pgTable(
  'members',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    organizationId: text('organization_id')
      .notNull()
      .references(() => saasOrganizations.id, { onDelete: 'cascade' }),
    role: text('role', { enum: ['owner', 'admin', 'member', 'viewer'] }).default('member'),
    joinedAt: timestamp('joined_at').defaultNow(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    userOrgUnique: uniqueIndex('members_user_org_unique').on(table.userId, table.organizationId),
  }),
);

export const subscriptions = pgTable('subscriptions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id')
    .notNull()
    .references(() => saasOrganizations.id, { onDelete: 'cascade' }),
  tranId: text('tran_id').unique(),
  plan: text('plan', { enum: ['free', 'beginner', 'standard', 'pro', 'enterprise'] }).default(
    'free',
  ),
  status: text('status', {
    enum: ['active', 'inactive', 'cancelled', 'past_due', 'trialing'],
  }).default('active'),
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});
/* ================= RELATIONS ================= */
export const organizationsRelations = relations(saasOrganizations, ({ many }) => ({
  members: many(members),
  subscriptions: many(subscriptions),
}));

export const membersRelations = relations(members, ({ one }) => ({
  user: one(user, {
    fields: [members.userId],
    references: [user.id],
  }),
  organization: one(saasOrganizations, {
    fields: [members.organizationId],
    references: [saasOrganizations.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  organization: one(saasOrganizations, {
    fields: [subscriptions.organizationId],
    references: [saasOrganizations.id],
  }),
}));
