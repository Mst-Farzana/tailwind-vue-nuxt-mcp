import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Change-Password",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const message = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto min-h-screen max-w-lg bg-gray-50 p-6" }, _attrs))}><h1 class="mb-6 text-2xl font-bold">Change password</h1><form class="space-y-4 rounded-lg bg-white p-6 shadow"><input${ssrRenderAttr("value", currentPassword.value)} type="password" placeholder="Current password" required class="w-full rounded border px-3 py-2"><input${ssrRenderAttr("value", newPassword.value)} type="password" placeholder="New password" required class="w-full rounded border px-3 py-2"><input${ssrRenderAttr("value", confirmPassword.value)} type="password" placeholder="Confirm new password" required class="w-full rounded border px-3 py-2">`);
      if (message.value) {
        _push(`<p class="text-center text-sm text-red-500">${ssrInterpolate(message.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50">${ssrInterpolate(loading.value ? "Updating..." : "Change password")}</button></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/security/Change-Password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Change-Password-DIDdMUOg.mjs.map
