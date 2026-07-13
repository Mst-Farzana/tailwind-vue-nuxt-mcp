import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Sessions",
  __ssrInlineRender: true,
  setup(__props) {
    const sessions = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><h1 class="mb-6 text-2xl font-bold">Active sessions</h1>`);
      if (loading.value) {
        _push(`<div class="text-gray-500">Loading sessions...</div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(sessions.value, (session) => {
          _push(`<div class="flex items-center justify-between rounded-lg bg-white p-4 shadow"><div><div class="font-semibold">${ssrInterpolate(session.device)} · ${ssrInterpolate(session.browser)} `);
          if (session.current) {
            _push(`<span class="ml-2 text-xs text-green-600">(Current)</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-sm text-gray-500"> IP: ${ssrInterpolate(session.ip)} · Last active: ${ssrInterpolate(session.lastActive)}</div></div>`);
          if (!session.current) {
            _push(`<button class="rounded bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-600"> Logout </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/security/Sessions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Sessions-rwb9Zqcz.mjs.map
