// server/db/schemas/auth.ts
import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { saasOrganizations } from './saas';

/* ================= USER ================= */
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  avatar: text('avatar'),
  emailVerified: boolean('email_verified').default(false),
  lastLoginAt: timestamp('last_login_at'),
  lastLoginIp: text('last_login_ip'),
  notificationsEnabled: boolean('notifications_enabled').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/* ================= ACCOUNT ================= */
export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),

    accountId: text('account_id').notNull(),

    userId: text('user_id')
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),

    providerId: text('provider_id').notNull(),

    password: text('password'),

    createdAt: timestamp('created_at').defaultNow(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    providerAccountUnique: uniqueIndex('provider_account_unique').on(
      table.providerId,
      table.accountId,
    ),
  }),
);
/* ================= SESSION ================= */
export const session = pgTable('session', {
  id: text('id').primaryKey(),

  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  organizationId: text('organization_id').references(() => saasOrganizations.id),
  token: text('token').notNull(),

  expiresAt: timestamp('expires_at').notNull(),

  ipAddress: text('ip_address'),

  userAgent: text('user_agent'),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at').defaultNow(),
});

/* ================= VERIFICATION ================= */
export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    type: text('type'),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    identifier_idx: index('verification_identifier_idx').on(table.identifier),
    verify_unique: uniqueIndex('verification_unique').on(table.identifier, table.value),
    expires_idx: index('verification_expires_idx').on(table.expiresAt),
  }),
);

/* ================= RELATIONS ================= */
export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));
