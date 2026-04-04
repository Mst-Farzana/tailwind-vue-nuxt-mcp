// server/db/schemas/index.ts
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  company: text('company').notNull(),
  city: text('city').notNull(),
  avatar: text('avatar').notNull(),
  likes: integer('likes').default(0),
  posts: integer('posts').default(0),
  media: integer('media').default(0),
  links: integer('links').default(0),
  files: integer('files').default(0),
});

export const billing = pgTable('billing', {
  id: serial('id').primaryKey(),
  nextPaymentDate: text('next_payment_date').notNull(),
  lastBilledDate: text('last_billed_date').notNull(),
  amountDue: text('amount_due').notNull(),
  status: text('status').notNull(), // "Paid", "Unpaid"
  invoiceUrl: text('invoice_url').notNull(),
});

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  date: text('date').notNull(), // "Thu, Jan 1, 2026"
  amount: text('amount').notNull(), // "$24.99"
  status: text('status').notNull(), // "Paid", "Unpaid"
  invoiceUrl: text('invoice_url').notNull(),
});

export const paymentMethods = pgTable('payment_methods', {
  id: serial('id').primaryKey(),
  cardType: text('card_type').notNull(), // "Visa", "MasterCard"
  lastFour: text('last_four').notNull(), // "0785", "4575"
  expiryDate: text('expiry_date').notNull(), // "06/26", "04/24"
  cardholderName: text('cardholder_name').notNull(), // "JOHN DOE"
  isPrimary: boolean('is_primary').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const security = pgTable('security', {
  id: serial('id').primaryKey(),
  lastLogin: text('last_login').notNull(),
  ip: text('ip').notNull(),
  apiStatus: boolean('api_status').notNull().default(false),
  twoFactorAuth: boolean('two_factor_auth').notNull().default(false),
  passwordChangedAt: text('password_changed_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const profileSettings = pgTable('profile_settings', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar').notNull(),
  notificationsEnabled: boolean('notifications_enabled').notNull().default(false),
  lastLoginAt: timestamp('last_login_at'),
  lastLoginIp: text('last_login_ip'),
  isVerified: boolean('is_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersprofile = pgTable('usersprofile', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  password: text('password').notNull(), // bcrypt hash
  amount: integer('amount').notNull().default(0),
  verified: boolean('verified').notNull().default(false),
  isVerified: boolean('is_verified').notNull().default(false),
  lastLoginAt: timestamp('last_login_at', { mode: 'string' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});
