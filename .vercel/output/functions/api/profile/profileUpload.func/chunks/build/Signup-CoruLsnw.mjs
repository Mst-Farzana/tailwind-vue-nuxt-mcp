import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-CFSfgGMr.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm';
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
import 'pinia';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Signup",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({ name: "", email: "", password: "", confirm: "" });
    const loading = ref(false);
    const error = ref("");
    useAuth();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-sm" }, _attrs))} data-v-7e75d837><form class="space-y-4" data-v-7e75d837><h2 class="text-2xl font-bold" data-v-7e75d837>Create Account</h2><input${ssrRenderAttr("value", form.value.name)} placeholder="Full Name" class="input w-full" required data-v-7e75d837><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="Email" class="input w-full" required data-v-7e75d837><input${ssrRenderAttr("value", form.value.password)} type="password" placeholder="Password" class="input w-full" required data-v-7e75d837><input${ssrRenderAttr("value", form.value.confirm)} type="password" placeholder="Confirm Password" class="input w-full" required data-v-7e75d837>`);
      if (error.value) {
        _push(`<p class="error" data-v-7e75d837>${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-7e75d837>${ssrInterpolate(loading.value ? "Creating..." : "Sign Up")}</button></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/Signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e75d837"]]);

export { Signup as default };
//# sourceMappingURL=Signup-CoruLsnw.mjs.map
