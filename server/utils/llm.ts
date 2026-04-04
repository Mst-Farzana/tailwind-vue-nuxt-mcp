export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

interface OllamaResponse {
  choices?: Array<{
    message?: { role?: string; content?: string };
  }>;
}

export async function getAutoReply(messages: ChatMessage[]): Promise<string> {
  try {
    console.log('[LLM] Checking Ollama status...');
    const config = useRuntimeConfig();
    const OLLAMA_URL = config.OLLAMA_URL;

    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:1b',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional customer support assistant. Reply politely and briefly. If unsure, say a human agent will follow up.',
          },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      console.error('[OLLAMA HTTP ERROR]', response.status, await response.text());
      return 'Sorry, we are unable to respond right now.';
    }

    const data: OllamaResponse = await response.json();

    return (
      data.choices?.[0]?.message?.content?.trim() ||
      'Thanks for your message. A human agent will follow up shortly.'
    );
  } catch (err) {
    console.error('[OLLAMA ERROR]', err);
    return 'Sorry, we are unable to respond right now.';
  }
}
