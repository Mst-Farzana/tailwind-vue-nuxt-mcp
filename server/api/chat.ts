import { desc, eq } from 'drizzle-orm';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';

import { db } from '~/server/db';
import { billing, supportConversations, supportMessages } from '~/server/db/schemas/index';

import { getAutoReply, type ChatMessage } from '~/server/utils/llm';

/* ================= FAQ ================= */
const faqs = [
  { question: /return policy/i, answer: 'Our return policy is 30 days.' },
  { question: /shipping/i, answer: 'We ship worldwide. Delivery takes 3–7 days.' },
];

/* ================= Intent ================= */
type Intent = { type: 'faq'; answer: string } | { type: 'billing_status' } | { type: 'gpt' };

function detectIntent(message: string): Intent {
  for (const faq of faqs) {
    if (faq.question.test(message)) return { type: 'faq', answer: faq.answer };
  }

  if (/billing\s+#?\d+/i.test(message)) return { type: 'billing_status' };
  return { type: 'gpt' };
}

/* ================= Billing Context ================= */
async function fetchBillingContext(message: string) {
  const match = message.match(/billing\s+#?(\d+)/i);
  if (!match) return 'Invalid billing ID.';
  const billingId = Number(match[1]);
  if (Number.isNaN(billingId)) return 'Invalid billing ID.';

  const record = await db.select().from(billing).where(eq(billing.id, billingId)).limit(1);
  if (!record.length) return `Sorry, no billing record found with ID ${billingId}.`;

  const r = record[0]!;

  const formatDate = (value: unknown): string => {
    if (!value) return 'N/A';
    const date = new Date(value as string | number | Date);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-US');
  };

  return `
Billing #${r.id}
Status: ${r.status}
Amount Due: ${r.amountDue}
Next Payment: ${formatDate(r.nextPaymentDate)}
Last Billed: ${formatDate(r.lastBilledDate)}
Invoice URL: ${r.invoiceUrl || 'N/A'}
  `.trim();
}

/* ================= Conversation Memory ================= */
async function getConversationMemory(conversationId: number, limit = 6): Promise<ChatMessage[]> {
  const rows = await db
    .select()
    .from(supportMessages)
    .where(eq(supportMessages.conversation_id, conversationId))
    .orderBy(desc(supportMessages.created_at))
    .limit(limit);

  return rows
    .reverse()
    .filter(row => row.role !== 'agent')
    .map(row => ({ role: row.role as 'user' | 'assistant', content: row.content }));
}

/* ================= API Handler ================= */
export default defineEventHandler(async event => {
  const body = await readBody<{ message?: string; conversationId?: number; email?: string }>(event);

  let message = body?.message?.trim();
  let conversationId = body?.conversationId;

  if (!message) {
    setResponseStatus(event, 400);
    return { error: 'Message is required' };
  }

  if (message.length > 2000) message = message.slice(0, 1997) + '...';

  try {
    /* -------- Ensure Conversation -------- */
    if (!conversationId) {
      const [conv] = await db
        .insert(supportConversations)
        .values({ email: body.email || null })
        .returning({ id: supportConversations.id });

      if (!conv) throw new Error('Failed to create conversation');
      conversationId = conv.id;
    }

    /* -------- Save User Message -------- */
    await db.insert(supportMessages).values({
      conversation_id: conversationId,
      role: 'user',
      content: message,
    });

    /* -------- Intent Detection -------- */
    const intent = detectIntent(message);
    let reply = '';

    if (intent.type === 'faq') {
      reply = intent.answer;
    } else if (intent.type === 'billing_status') {
      reply = await fetchBillingContext(message);
    } else {
      const memory = await getConversationMemory(conversationId);
      reply = await getAutoReply([...memory, { role: 'user', content: message }]);
    }

    /* -------- Save Assistant Reply -------- */
    await db.insert(supportMessages).values({
      conversation_id: conversationId,
      role: 'assistant',
      content: reply,
    });

    return { reply, conversationId };
  } catch (err) {
    console.error('[SUPPORT API ERROR]', err);
    setResponseStatus(event, 500);
    return { error: 'Failed to process message' };
  }
});
