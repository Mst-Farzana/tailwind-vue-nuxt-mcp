import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '~/server/db/schemas/index';

// ---------------- DB ----------------
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

// ---------------- Types ----------------
export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type OllamaMessage = {
  role: string;
  content?: string;
};

type OllamaChoice = {
  message?: OllamaMessage;
};

type OllamaResponse = {
  choices?: OllamaChoice[];
};

// ---------------- Ollama Config ----------------
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434/v1/chat/completions';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'gemma3:1b';

// ---------------- Auto Reply ----------------
export async function getAutoReply(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'system',
            content:
              'You are a professional customer support assistant. Reply clearly, politely, and briefly.',
          },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.status}`);
    }

    const data = (await response.json()) as OllamaResponse;

    const reply = data.choices?.[0]?.message?.content?.trim();

    return reply || 'Thank you for your message! Our support team will contact you soon.';
  } catch (error) {
    console.error('Ollama error:', error);

    return 'Sorry, we are unable to respond right now. A human agent will follow up.';
  }
}

// ---------------- Save Ticket ----------------
export async function createConversation(userId?: number, email?: string): Promise<number> {
  const [conversation] = await db
    .insert(schema.supportConversations)
    .values({
      user_id: userId ?? null,
      email: email ?? null,
    })
    .returning({ id: schema.supportConversations.id });

  if (!conversation?.id) {
    throw new Error('Failed to create conversation');
  }

  return conversation.id;
}
