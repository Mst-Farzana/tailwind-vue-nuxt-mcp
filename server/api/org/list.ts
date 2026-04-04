// 📁 server/api/organization/list.get.ts
import { eq } from 'drizzle-orm';
import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { members } from '~/server/db/schemas/index'; // ← Only import what you use

export default defineEventHandler(async event => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const userMemberships = await db.query.members.findMany({
    where: eq(members.userId, session.user.id),
    with: {
      organization: {
        with: { subscriptions: true },
      },
    },
  });

  const organizations = userMemberships.map(m => ({
    id: m.organization.id,
    name: m.organization.name,
    slug: m.organization.slug,
    role: m.role,
    subscription: m.organization.subscriptions?.find(s => s.status === 'active') || null,
  }));

  return organizations;
});
