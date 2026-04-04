// 📁 server/api/subscription/upgrade.post.ts
import { and, eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { members, subscriptions } from '~/server/db/schemas/index';

type ValidPlan = 'free' | 'beginner' | 'standard' | 'pro' | 'enterprise'; // ফ্রন্টএন্ড নামগুলো যুক্ত করা হলো
type BillingPeriod = 'monthly' | 'yearly';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ফ্রন্টএন্ড থেকে আসা প্ল্যান নামগুলো ভ্যালিডেট করার তালিকা
const VALID_PLANS: ValidPlan[] = ['free', 'beginner', 'standard', 'pro', 'enterprise'];

export default defineEventHandler(async event => {
  // 🔐 ১. ইউজার চেক (মিডলওয়্যার থেকে)
  const userId = event.context.user?.id;
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  // 📥 . বডি ও ভ্যালিডেশন
  const body = await readBody(event);
  const {
    orgId,
    plan,
    billingPeriod = 'monthly',
  } = body as {
    orgId: string;
    plan: string;
    billingPeriod?: BillingPeriod;
  };

  // UUID চেক
  if (!orgId || !UUID_REGEX.test(orgId)) {
    throw createError({ statusCode: 400, message: 'Invalid organization ID' });
  }

  // Plan চেক
  if (!plan || !VALID_PLANS.includes(plan as ValidPlan)) {
    throw createError({
      statusCode: 400,
      message: `Invalid plan. Must be one of: ${VALID_PLANS.join(', ')}`,
    });
  }

  // 🔐 ৩. পারমিশন চেক (শুধুমাত্র Owner বা Admin পরিবর্তন করতে পারবে)
  const membership = await db.query.members.findFirst({
    where: and(eq(members.userId, userId), eq(members.organizationId, orgId)),
  });

  if (!membership || !['owner', 'admin'].includes(membership.role as string)) {
    throw createError({ statusCode: 403, message: 'Permission denied' });
  }

  // 🔍 ৪. সাবস্ক্রিপশন চেক (না থাকলে তৈরি করবে)
  const existing = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.organizationId, orgId),
  });

  // 📅 ৫. এক্সপায়ারি ডেট ক্যালকুলেশন
  const expires = new Date();
  if (billingPeriod === 'yearly') {
    expires.setFullYear(expires.getFullYear() + 1);
  } else {
    expires.setMonth(expires.getMonth() + 1);
  }

  const updateData = {
    plan: plan as ValidPlan,
    currentPeriodEnd: expires,
    status: 'active' as const,
    updatedAt: new Date(),
  };

  if (!existing) {
    // ❗ যদি সাবস্ক্রিপশন না থাকে, তবে নতুন তৈরি করুন (Insert)
    await db.insert(subscriptions).values({
      organizationId: orgId,
      ...updateData,
      createdAt: new Date(),
    });
    console.log(`Subscription created: Org ${orgId} -> ${plan} (${billingPeriod}) by ${userId}`);
  } else {
    // ✅ যদি থাকে, তবে আপডেট করুন (Update)
    await db.update(subscriptions).set(updateData).where(eq(subscriptions.organizationId, orgId));

    console.log(`Subscription updated: Org ${orgId} -> ${plan} (${billingPeriod}) by ${userId}`);
  }

  return {
    success: true,
  };
});
