import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    message: {},
    title: {}
  },
  setup(__props) {
    const props = __props;
    const title = props.title || "Unhandled exception";
    const message = props.message || "An Error Occurred";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center bg-linear-to-br from-red-500 via-orange-500 to-yellow-500 p-4" }, _attrs))}><div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"><h2 class="mb-1 text-2xl font-bold text-gray-800">${ssrInterpolate(unref(title))}</h2><p class="mb-6 text-lg text-gray-600">${ssrInterpolate(unref(message))}</p><button class="rounded-lg bg-red-600 px-6 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"> Done </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Error-CBGDDiAJ.mjs.map
