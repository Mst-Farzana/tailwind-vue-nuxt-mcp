<script setup lang="ts">
import { useChat } from '~/composables/useChat';

const {
  messages,
  newMessage,
  loading,
  error,
  touched,
  chatContainer,
  isMessageValid,
  sendMessage,
  clearChat,
  sanitize,
} = useChat();

const handleSubmit = async () => await sendMessage();
const handleBlur = () => (touched.value = true);

const getMessageClass = (role: 'user' | 'assistant') =>
  role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800';
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-12 dark:bg-gray-950 dark:text-gray-100">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">AI Chat</h1>
    </div>

    <div class="overflow-hidden rounded-xl bg-white shadow-lg">
      <div ref="chatContainer" class="h-[80vh] space-y-4 overflow-y-auto p-6">
        <div v-if="messages.length === 0" class="py-8 text-center text-gray-400">
          <p class="text-lg">👋 Start a conversation with our AI assistant</p>
        </div>

        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div class="max-w-[80%] rounded-lg px-4 py-3" :class="getMessageClass(msg.role)">
            <p class="whitespace-pre-line" v-html="sanitize(msg.content)" />
          </div>
        </div>

        <div v-if="loading" class="flex justify-start">
          <div class="rounded-lg bg-gray-100 px-4 py-3">
            <div class="flex space-x-1">
              <div class="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
              <div
                class="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                style="animation-delay: 150ms"
              />
              <div
                class="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                style="animation-delay: 300ms"
              />
            </div>
          </div>
        </div>
      </div>

      <form class="space-y-4 border-t p-6" @submit.prevent="handleSubmit">
        <textarea
          v-model.trim="newMessage"
          rows="4"
          placeholder="Type your message..."
          class="w-full resize-none rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          :class="touched && !isMessageValid() ? 'border-red-300' : 'border-gray-300'"
          :disabled="loading"
          @blur="handleBlur"
          @keydown.enter.exact.prevent="handleSubmit()"
        />
        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 rounded-lg bg-gray-100 py-2.5"
            :disabled="loading"
            @click="clearChat"
          >
            Clear Chat
          </button>
          <button
            type="submit"
            class="flex-1 rounded-lg bg-blue-600 py-2.5 text-white"
            :disabled="loading || !isMessageValid()"
          >
            Send Message
          </button>
        </div>
        <div v-if="error" class="p-2 text-red-600">{{ error }}</div>
      </form>
    </div>
  </section>
</template>
