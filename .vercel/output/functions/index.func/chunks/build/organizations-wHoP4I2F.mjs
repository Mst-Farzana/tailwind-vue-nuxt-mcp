import { ad as getRequestHeaders } from '../_/nitro.mjs';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { z } from 'zod';
import { pgTable, timestamp, text, uniqueIndex, index, boolean, integer, serial, varchar, jsonb, real, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import crypto from 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const SignupSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(255)
});
const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required")
});
const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email")
});
const UserPublicSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  verified: z.boolean(),
  notificationsEnabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
const ProfileUpdateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  avatar: z.string().max(255).nullable().optional(),
  notificationsEnabled: z.boolean().optional()
});
const overview = pgTable("overview", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  value: text("value").notNull(),
  icon: text("icon").notNull(),
  icon_color: text("icon_color").notNull(),
  trend_value: real("trend_value").notNull()
});
const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  phone: text("phone"),
  currency: text("currency").default("USD"),
  ip: text("ip"),
  dropdown: text("dropdown"),
  customDropdown: text("custom_dropdown"),
  date: text("date"),
  textarea: text("textarea"),
  checkbox: text("checkbox").array(),
  radio: text("radio"),
  radioWarning: text("radio_warning"),
  switchOne: boolean("switch_one").default(true),
  switchTwo: boolean("switch_two").default(false),
  switchDangerOne: boolean("switch_danger_one").default(true),
  switchDangerTwo: boolean("switch_danger_two").default(false),
  file: text("file"),
  emailState: text("email_state").default("normal"),
  textareaState: text("textarea_state").default("normal"),
  createdAt: timestamp("created_at").defaultNow()
});
const saasOrganizations = pgTable("organizations", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
});
const members = pgTable(
  "members",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    organizationId: text("organization_id").notNull().references(() => saasOrganizations.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["owner", "admin", "member", "viewer"] }).default("member"),
    joinedAt: timestamp("joined_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
  },
  (table) => ({
    userOrgUnique: uniqueIndex("members_user_org_unique").on(table.userId, table.organizationId)
  })
);
const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").notNull().references(() => saasOrganizations.id, { onDelete: "cascade" }),
  tranId: text("tran_id").unique(),
  plan: text("plan", { enum: ["free", "beginner", "standard", "pro", "enterprise"] }).default(
    "free"
  ),
  status: text("status", {
    enum: ["active", "inactive", "cancelled", "past_due", "trialing"]
  }).default("active"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
});
const organizationsRelations = relations(saasOrganizations, ({ many }) => ({
  members: many(members),
  subscriptions: many(subscriptions)
}));
const membersRelations = relations(members, ({ one }) => ({
  user: one(user, {
    fields: [members.userId],
    references: [user.id]
  }),
  organization: one(saasOrganizations, {
    fields: [members.organizationId],
    references: [saasOrganizations.id]
  })
}));
const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  organization: one(saasOrganizations, {
    fields: [subscriptions.organizationId],
    references: [saasOrganizations.id]
  })
}));
const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  avatar: text("avatar"),
  emailVerified: boolean("email_verified").default(false),
  lastLoginAt: timestamp("last_login_at"),
  lastLoginIp: text("last_login_ip"),
  notificationsEnabled: boolean("notifications_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    providerId: text("provider_id").notNull(),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
  },
  (table) => ({
    providerAccountUnique: uniqueIndex("provider_account_unique").on(
      table.providerId,
      table.accountId
    )
  })
);
const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  organizationId: text("organization_id").references(() => saasOrganizations.id),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    type: text("type"),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
  },
  (table) => ({
    identifier_idx: index("verification_identifier_idx").on(table.identifier),
    verify_unique: uniqueIndex("verification_unique").on(table.identifier, table.value),
    expires_idx: index("verification_expires_idx").on(table.expiresAt)
  })
);
const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session)
}));
const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}));
const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}));
const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  city: text("city").notNull(),
  progress: integer("progress").default(0),
  created: timestamp("created").defaultNow(),
  avatar: text("avatar").notNull(),
  via: text("via").notNull()
});
const financetable = pgTable("financetable", {
  id: serial("id").primaryKey(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  via: text("via").notNull(),
  account: text("account").notNull(),
  action: text("action").notNull(),
  icon: text("icon").notNull()
});
const financialStats = pgTable("financial_stats", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull()
});
const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  tags: text("tags").array().notNull(),
  price: text("price").notNull(),
  avatar: text("avatar").notNull()
});
const trendsTable = pgTable("trends_data", {
  id: serial("id").primaryKey(),
  graph: jsonb("graph").$type().notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  city: text("city").notNull(),
  avatar: text("avatar").notNull(),
  likes: integer("likes").default(0),
  posts: integer("posts").default(0),
  media: integer("media").default(0),
  links: integer("links").default(0),
  files: integer("files").default(0)
});
const billing = pgTable("billing", {
  id: serial("id").primaryKey(),
  nextPaymentDate: text("next_payment_date").notNull(),
  lastBilledDate: text("last_billed_date").notNull(),
  amountDue: text("amount_due").notNull(),
  status: text("status").notNull(),
  // "Paid", "Unpaid"
  invoiceUrl: text("invoice_url").notNull()
});
const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  // "Thu, Jan 1, 2026"
  amount: text("amount").notNull(),
  // "$24.99"
  status: text("status").notNull(),
  // "Paid", "Unpaid"
  invoiceUrl: text("invoice_url").notNull()
});
const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  cardType: text("card_type").notNull(),
  // "Visa", "MasterCard"
  lastFour: text("last_four").notNull(),
  // "0785", "4575"
  expiryDate: text("expiry_date").notNull(),
  // "06/26", "04/24"
  cardholderName: text("cardholder_name").notNull(),
  // "JOHN DOE"
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
const security = pgTable("security", {
  id: serial("id").primaryKey(),
  lastLogin: text("last_login").notNull(),
  ip: text("ip").notNull(),
  apiStatus: boolean("api_status").notNull().default(false),
  twoFactorAuth: boolean("two_factor_auth").notNull().default(false),
  passwordChangedAt: text("password_changed_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
const profileSettings = pgTable("profile_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
  notificationsEnabled: boolean("notifications_enabled").notNull().default(false),
  lastLoginAt: timestamp("last_login_at"),
  lastLoginIp: text("last_login_ip"),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
const usersprofile = pgTable("usersprofile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  password: text("password").notNull(),
  // bcrypt hash
  amount: integer("amount").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),
  lastLoginAt: timestamp("last_login_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow()
});
const supportConversations = pgTable("support_conversations", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  email: varchar("email", { length: 255 }),
  status: varchar("status", {
    length: 20,
    enum: ["open", "pending", "closed"]
  }).default("open"),
  created_at: timestamp("created_at").defaultNow()
});
const supportMessages = pgTable(
  "support_messages",
  {
    id: serial("id").primaryKey(),
    conversation_id: integer("conversation_id").notNull().references(() => supportConversations.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 20, enum: ["system", "user", "assistant", "agent"] }).notNull(),
    content: text("content").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
  },
  (table) => ({
    conversationIdx: index("conversation_id_idx").on(table.conversation_id)
  })
);
const users_custom = pgTable("users_custom", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  verified: boolean("verified").default(false).notNull(),
  lastLoginAt: timestamp("last_login_at", { mode: "date" }),
  lastLoginIp: varchar("last_login_ip", { length: 45 }),
  notificationsEnabled: boolean("notifications_enabled").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ForgotPasswordSchema,
  LoginSchema,
  ProfileUpdateSchema,
  SignupSchema,
  UserPublicSchema,
  account,
  accountRelations,
  billing,
  clients,
  financetable,
  financialStats,
  formSubmissions,
  invoices,
  members,
  membersRelations,
  organizationsRelations,
  overview,
  paymentMethods,
  products,
  profile,
  profileSettings,
  saasOrganizations,
  security,
  session,
  sessionRelations,
  subscriptions,
  subscriptionsRelations,
  supportConversations,
  supportMessages,
  trendsTable,
  user,
  userRelations,
  users_custom,
  usersprofile,
  verification
}, Symbol.toStringTag, { value: "Module" }));
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});
const db = drizzle(pool, {
  schema
});
const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:3000", process.env.NUXT_PUBLIC_SITE_URL].filter(
    Boolean
  ),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: "production" === "production"
  },
  // Database setup
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
      organization: saasOrganizations,
      member: members
    }
  }),
  // Organization plugin
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      // ✅ frontend must provide org name
      // 📁 server/auth.ts
      organizationCreation: {
        afterCreate: async ({
          organization: organization2,
          user: user2
        }) => {
          try {
            await db.insert(members).values({
              userId: user2.id,
              organizationId: organization2.id,
              role: "owner",
              joinedAt: /* @__PURE__ */ new Date()
            });
            await db.insert(subscriptions).values({
              organizationId: organization2.id,
              plan: "free",
              status: "active"
            });
            console.log("✅ Organization setup complete for user:", user2.id);
          } catch (err) {
            console.error("❌ Organization setup error:", err);
          }
        }
      }
    })
  ]
});
const getUser = async (event) => {
  const headers = getRequestHeaders(event);
  const session2 = await auth.api.getSession({
    headers
    // ✅ Type assertion যোগ করুন
  });
  return session2?.user || null;
};

export { getUser };
//# sourceMappingURL=organizations-wHoP4I2F.mjs.map
