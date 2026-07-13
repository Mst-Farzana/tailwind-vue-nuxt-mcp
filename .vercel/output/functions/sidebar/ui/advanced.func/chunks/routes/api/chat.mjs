import { eq, desc } from 'drizzle-orm';
import { d as defineEventHandler, r as readBody, s as setResponseStatus, b as db, e as supportConversations, f as supportMessages, h as getAutoReply, i as billing } from '../../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'zod';
import 'drizzle-orm/pg-core';
import 'crypto';
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

const faqs = [
  { question: /return policy/i, answer: "Our return policy is 30 days." },
  { question: /shipping/i, answer: "We ship worldwide. Delivery takes 3\u20137 days." }
];
function detectIntent(message) {
  for (const faq of faqs) {
    if (faq.question.test(message)) return { type: "faq", answer: faq.answer };
  }
  if (/billing\s+#?\d+/i.test(message)) return { type: "billing_status" };
  return { type: "gpt" };
}
async function fetchBillingContext(message) {
  const match = message.match(/billing\s+#?(\d+)/i);
  if (!match) return "Invalid billing ID.";
  const billingId = Number(match[1]);
  if (Number.isNaN(billingId)) return "Invalid billing ID.";
  const record = await db.select().from(billing).where(eq(billing.id, billingId)).limit(1);
  if (!record.length) return `Sorry, no billing record found with ID ${billingId}.`;
  const r = record[0];
  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-US");
  };
  return `
Billing #${r.id}
Status: ${r.status}
Amount Due: ${r.amountDue}
Next Payment: ${formatDate(r.nextPaymentDate)}
Last Billed: ${formatDate(r.lastBilledDate)}
Invoice URL: ${r.invoiceUrl || "N/A"}
  `.trim();
}
async function getConversationMemory(conversationId, limit = 6) {
  const rows = await db.select().from(supportMessages).where(eq(supportMessages.conversation_id, conversationId)).orderBy(desc(supportMessages.created_at)).limit(limit);
  return rows.reverse().filter((row) => row.role !== "agent").map((row) => ({ role: row.role, content: row.content }));
}
const chat = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  let message = (_a = body == null ? void 0 : body.message) == null ? void 0 : _a.trim();
  let conversationId = body == null ? void 0 : body.conversationId;
  if (!message) {
    setResponseStatus(event, 400);
    return { error: "Message is required" };
  }
  if (message.length > 2e3) message = message.slice(0, 1997) + "...";
  try {
    if (!conversationId) {
      const [conv] = await db.insert(supportConversations).values({ email: body.email || null }).returning({ id: supportConversations.id });
      if (!conv) throw new Error("Failed to create conversation");
      conversationId = conv.id;
    }
    await db.insert(supportMessages).values({
      conversation_id: conversationId,
      role: "user",
      content: message
    });
    const intent = detectIntent(message);
    let reply = "";
    if (intent.type === "faq") {
      reply = intent.answer;
    } else if (intent.type === "billing_status") {
      reply = await fetchBillingContext(message);
    } else {
      const memory = await getConversationMemory(conversationId);
      reply = await getAutoReply([...memory, { role: "user", content: message }]);
    }
    await db.insert(supportMessages).values({
      conversation_id: conversationId,
      role: "assistant",
      content: reply
    });
    return { reply, conversationId };
  } catch (err) {
    console.error("[SUPPORT API ERROR]", err);
    setResponseStatus(event, 500);
    return { error: "Failed to process message" };
  }
});

export { chat as default };
//# sourceMappingURL=chat.mjs.map
