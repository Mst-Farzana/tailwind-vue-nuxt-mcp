import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { b as db, x as members, y as subscriptions, v as saasOrganizations, D as verification, z as session, E as account, F as user } from './nitro.mjs';

const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:3000", process.env.NUXT_PUBLIC_SITE_URL].filter(
    Boolean
  ),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  // Database setup
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
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
          organization,
          user
        }) => {
          try {
            await db.insert(members).values({
              userId: user.id,
              organizationId: organization.id,
              role: "owner",
              joinedAt: /* @__PURE__ */ new Date()
            });
            await db.insert(subscriptions).values({
              organizationId: organization.id,
              plan: "free",
              status: "active"
            });
            console.log("\u2705 Organization setup complete for user:", user.id);
          } catch (err) {
            console.error("\u274C Organization setup error:", err);
          }
        }
      }
    })
  ]
});

export { auth as a };
//# sourceMappingURL=auth.mjs.map
