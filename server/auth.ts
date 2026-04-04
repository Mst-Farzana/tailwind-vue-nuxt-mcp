// 📁 server/auth.ts
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization as organizationPlugin } from 'better-auth/plugins';
import { db } from '~/server/db';
import {
  account,
  members,
  saasOrganizations,
  session,
  subscriptions,
  user as userTable,
  verification,
} from '~/server/db/schemas/index';

// ------------------------------
// BetterAuth Setup
// ------------------------------
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  trustedOrigins: ['http://localhost:3000', process.env.NUXT_PUBLIC_SITE_URL].filter(
    Boolean,
  ) as string[],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.NODE_ENV === 'production',
  },

  // Database setup
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userTable,
      account,
      session,
      verification,
      organization: saasOrganizations,
      member: members,
    },
  }),

  // Organization plugin
  plugins: [
    organizationPlugin({
      allowUserToCreateOrganization: true, // ✅ frontend must provide org name

      // 📁 server/auth.ts
      organizationCreation: {
        afterCreate: async ({
          organization,
          user,
        }: {
          organization: {
            id: string;
            name: string;
            slug?: string | null;
            logo?: string | null;
            createdAt: Date;
            updatedAt: Date;
          };
          user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            emailVerified?: boolean;
            createdAt: Date;
            updatedAt: Date;
          };
        }) => {
          try {
            // Add user as owner
            await db.insert(members).values({
              userId: user.id,
              organizationId: organization.id,
              role: 'owner',
              joinedAt: new Date(),
            });

            // Create default free subscription
            await db.insert(subscriptions).values({
              organizationId: organization.id,
              plan: 'free',
              status: 'active',
            });

            console.log('✅ Organization setup complete for user:', user.id);
          } catch (err) {
            console.error('❌ Organization setup error:', err);
          }
        },
      },
    }),
  ],
});

// Dev-only debug logs
if (process.env.NODE_ENV !== 'production') {
  console.log('🔹 BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL);
  console.log('🔹 BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? 'SET ✓' : 'NOT SET ⚠️');
}
