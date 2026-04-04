// 📁 server/api/organization/select.post.ts
import { and, eq } from 'drizzle-orm';
import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { members, session as sessionTable } from '~/server/db/schemas/index';

export default defineEventHandler(async event => {
  const userSession = await auth.api.getSession({ headers: event.headers });
  if (!userSession?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readBody(event);
  const { organizationId } = body;

  if (!organizationId) {
    throw createError({ statusCode: 400, message: 'organizationId is required' });
  }

  // 🔐 SECURITY: Verify user is actually a member of this org
  const membership = await db.query.members.findFirst({
    where: and(eq(members.userId, userSession.user.id), eq(members.organizationId, organizationId)),
  });

  if (!membership) {
    throw createError({
      statusCode: 403,
      message: 'Access denied: You are not a member of this organization',
    });
  }

  // ✅ CORRECT: Use sessionTable (the schema) + correct field name
  await db
    .update(sessionTable) // ✅ Table reference (aliased)
    .set({ organizationId: organizationId }) // ✅ Field is 'organizationId', not 'currentOrganizationId'
    .where(eq(sessionTable.id, userSession.session.id)); // ✅ Use sessionTable.id

  return {
    success: true,
    organizationId,
    role: membership.role,
  };
});
