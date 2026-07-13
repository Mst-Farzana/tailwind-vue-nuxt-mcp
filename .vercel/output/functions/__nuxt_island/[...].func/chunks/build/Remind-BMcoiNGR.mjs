import { _ as __nuxt_component_0 } from './nuxt-link-BvdDl6Me.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Remind",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const message = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center bg-linear-to-br from-orange-400 via-yellow-400 to-blue-400 p-4" }, _attrs))}><div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"><h2 class="mb-4 text-xl font-bold">Username</h2><input${ssrRenderAttr("value", username.value)} type="text" placeholder="johndoe" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">`);
      if (error.value) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<p class="mt-1 text-sm text-gray-500">Please enter your username</p>`);
      }
      _push(`<div class="mt-6 flex items-center justify-between"><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50">${ssrInterpolate(loading.value ? "Sending..." : "Remind")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-sm text-gray-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back to login `);
          } else {
            return [
              createTextVNode(" Back to login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (message.value) {
        _push(`<p class="mt-4 text-sm text-green-500">${ssrInterpolate(message.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/Remind.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Remind-BMcoiNGR.mjs.map
