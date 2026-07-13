import { defineComponent, mergeProps, unref, reactive, ref, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

function useChat() {
  const messages = reactive([]);
  const newMessage = ref("");
  const loading = ref(false);
  const error = ref("");
  const touched = ref(false);
  const conversationId = ref(null);
  const chatContainer = ref(null);
  const isMessageValid = () => newMessage.value.trim().length > 0;
  const sanitize = (text) => {
    const html = marked.parse(text);
    return DOMPurify.sanitize(html);
  };
  const scrollToBottom = async () => {
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTo({ top: chatContainer.value.scrollHeight, behavior: "smooth" });
    }
  };
  const sendMessage = async () => {
    touched.value = true;
    if (!isMessageValid()) return;
    const msg = newMessage.value.trim();
    messages.push({ role: "user", content: msg });
    newMessage.value = "";
    error.value = "";
    loading.value = true;
    const assistantMessage = { role: "assistant", content: "" };
    messages.push(assistantMessage);
    try {
      const res = await $fetch(
        "/api/chat",
        {
          method: "POST",
          body: {
            message: msg,
            // Single message
            conversationId: conversationId.value
            // Existing conversation ID
          }
        }
      );
      if (res.reply) {
        assistantMessage.content = res.reply;
        if (res.conversationId) {
          conversationId.value = res.conversationId;
        }
      } else if (res.error) {
        error.value = res.error;
        assistantMessage.content = res.error;
      }
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "Something went wrong";
      error.value = errMsg;
      assistantMessage.content = "Something went wrong.";
    } finally {
      loading.value = false;
      scrollToBottom();
    }
  };
  const clearChat = () => {
    messages.length = 0;
    newMessage.value = "";
    error.value = "";
    touched.value = false;
    conversationId.value = null;
  };
  return {
    messages,
    newMessage,
    loading,
    error,
    touched,
    conversationId,
    // ✅ Export for debugging
    chatContainer,
    isMessageValid,
    sendMessage,
    clearChat,
    sanitize
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      messages,
      newMessage,
      loading,
      error,
      touched,
      isMessageValid,
      sanitize
    } = useChat();
    const getMessageClass = (role) => role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-3xl px-4 py-12" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900">AI Chat</h1></div><div class="overflow-hidden rounded-xl bg-white shadow-lg"><div class="h-[80vh] space-y-4 overflow-y-auto p-6">`);
      if (unref(messages).length === 0) {
        _push(`<div class="py-8 text-center text-gray-400"><p class="text-lg">👋 Start a conversation with our AI assistant</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(messages), (msg, i) => {
        _push(`<div class="${ssrRenderClass([msg.role === "user" ? "justify-end" : "justify-start", "flex"])}"><div class="${ssrRenderClass([getMessageClass(msg.role), "max-w-[80%] rounded-lg px-4 py-3"])}"><p class="whitespace-pre-line">${unref(sanitize)(msg.content) ?? ""}</p></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(loading)) {
        _push(`<div class="flex justify-start"><div class="rounded-lg bg-gray-100 px-4 py-3"><div class="flex space-x-1"><div class="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div><div class="h-2 w-2 animate-bounce rounded-full bg-gray-500" style="${ssrRenderStyle({ "animation-delay": "150ms" })}"></div><div class="h-2 w-2 animate-bounce rounded-full bg-gray-500" style="${ssrRenderStyle({ "animation-delay": "300ms" })}"></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><form class="space-y-4 border-t p-6"><textarea rows="4" placeholder="Type your message..." class="${ssrRenderClass([unref(touched) && !unref(isMessageValid)() ? "border-red-300" : "border-gray-300", "w-full resize-none rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"])}"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(newMessage))}</textarea><div class="flex gap-3"><button type="button" class="flex-1 rounded-lg bg-gray-100 py-2.5"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}> Clear Chat </button><button type="submit" class="flex-1 rounded-lg bg-blue-600 py-2.5 text-white"${ssrIncludeBooleanAttr(unref(loading) || !unref(isMessageValid)()) ? " disabled" : ""}> Send Message </button></div>`);
      if (unref(error)) {
        _push(`<div class="p-2 text-red-600">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sidebar/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-xdH5WM9Z.mjs.map
