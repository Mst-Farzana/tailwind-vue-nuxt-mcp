// 📁 server/api/organization/create.post.ts
import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { members, saasOrganizations, subscriptions } from '~/server/db/schemas/index';

export default defineEventHandler(async event => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readBody(event);
  const orgName = body.name || `${session.user.name}'s Organization`;
  const orgSlug =
    body.slug ||
    orgName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') ||
    `org-${Date.now()}`;

  try {
    // Create organization
    const [org] = await db
      .insert(saasOrganizations)
      .values({ name: orgName, slug: orgSlug })
      .returning();

    // ✅ Check if org was created successfully
    if (!org) {
      throw createError({
        statusCode: 500,
        message: 'Failed to create organization',
      });
    }

    // ✅ Now TypeScript knows org is defined
    await db.insert(members).values({
      userId: session.user.id,
      organizationId: org.id, // ✅ No more error!
      role: 'owner',
      joinedAt: new Date(),
    });

    await db.insert(subscriptions).values({
      organizationId: org.id, // ✅ No more error!
      plan: 'free',
      status: 'active',
    });

    return { success: true, organization: org };
  } catch (error: unknown) {
    console.error('Organization creation failed:', error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to create organization',
    });
  }
});
