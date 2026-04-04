import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { nextTick, reactive, ref } from 'vue';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useChat() {
  const messages = reactive<Message[]>([]);
  const newMessage = ref('');
  const loading = ref(false);
  const error = ref('');
  const touched = ref(false);
  const conversationId = ref<number | null>(null); // ✅ Track conversation ID

  // Reference to the chat container for auto-scroll
  const chatContainer = ref<HTMLElement | null>(null);

  const isMessageValid = () => newMessage.value.trim().length > 0;

  // ✅ Sanitize markdown HTML
  const sanitize = (text: string) => {
    const html = marked.parse(text);
    return DOMPurify.sanitize(html as string);
  };

  const scrollToBottom = async () => {
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' });
    }
  };

  const sendMessage = async () => {
    touched.value = true;

    if (!isMessageValid()) return;

    const msg = newMessage.value.trim();

    // Add user message
    messages.push({ role: 'user', content: msg });
    newMessage.value = '';
    error.value = '';
    loading.value = true;

    // Add empty assistant message for streaming effect
    const assistantMessage: Message = { role: 'assistant', content: '' };
    messages.push(assistantMessage);

    try {
      // ✅ Send correct format to API
      const res = await $fetch<{ reply?: string; conversationId?: number; error?: string }>(
        '/api/chat',
        {
          method: 'POST',
          body: {
            message: msg, // Single message
            conversationId: conversationId.value, // Existing conversation ID
          },
        },
      );

      if (res.reply) {
        // Assign AI reply
        assistantMessage.content = res.reply;

        // ✅ Update conversation ID
        if (res.conversationId) {
          conversationId.value = res.conversationId;
        }
      } else if (res.error) {
        error.value = res.error;
        assistantMessage.content = res.error;
      }
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : 'Something went wrong';
      error.value = errMsg;
      assistantMessage.content = 'Something went wrong.';
    } finally {
      loading.value = false;
      scrollToBottom();
    }
  };

  const clearChat = () => {
    messages.length = 0;
    newMessage.value = '';
    error.value = '';
    touched.value = false;
    conversationId.value = null; // ✅ Reset conversation ID
  };

  return {
    messages,
    newMessage,
    loading,
    error,
    touched,
    conversationId, // ✅ Export for debugging
    chatContainer,
    isMessageValid,
    sendMessage,
    clearChat,
    sanitize,
  };
}
