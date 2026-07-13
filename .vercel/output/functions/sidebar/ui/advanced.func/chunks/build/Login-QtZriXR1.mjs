import { _ as __nuxt_component_0 } from './nuxt-link-BvdDl6Me.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CFSfgGMr.mjs';
import { b as useRouter, c as useRoute } from './server.mjs';
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
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const email = ref("");
    const password = ref("");
    const remember = ref(false);
    const loading = ref(false);
    const errorMessage = ref("");
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-md rounded-xl bg-white p-5 shadow-lg" }, _attrs))}><h2 class="mb-4 text-xl font-bold">Login</h2><div class="mb-4"><input${ssrRenderAttr("value", email.value)} type="email" placeholder="Enter your email" class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none" required autocomplete="email"></div><div class="mb-4"><input${ssrRenderAttr("value", password.value)} type="password" placeholder="••••••••" class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none" required autocomplete="current-password"></div><div class="mb-6 flex items-center justify-between text-sm"><label class="flex cursor-pointer items-center text-sm"><input${ssrIncludeBooleanAttr(Array.isArray(remember.value) ? ssrLooseContain(remember.value, null) : remember.value) ? " checked" : ""} type="checkbox" class="mr-2 rounded border-gray-300"> Remember me </label>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/forgot-password",
        class: "text-purple-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Forgot password? `);
          } else {
            return [
              createTextVNode(" Forgot password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-3"><button type="submit" class="flex-1 rounded-lg bg-purple-600 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>${ssrInterpolate(loading.value ? "Logging in..." : "Login")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/signup",
        class: "flex-1 rounded-lg border border-purple-600 py-2 text-center text-purple-600 transition hover:bg-purple-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign up `);
          } else {
            return [
              createTextVNode(" Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<p class="mt-4 text-center text-sm text-red-500" role="alert">${ssrInterpolate(errorMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Login-QtZriXR1.mjs.map
