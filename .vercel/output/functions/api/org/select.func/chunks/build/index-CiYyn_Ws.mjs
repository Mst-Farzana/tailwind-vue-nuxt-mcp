import { _ as __nuxt_component_0 } from './nuxt-link-BvdDl6Me.mjs';
import { a as __nuxt_component_1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const menuItems = [
      { to: "/auth/login", label: "Login" },
      { to: "/auth/signup", label: "Signup" },
      { to: "/auth/remind", label: "Remind" },
      { to: "/auth/error", label: "Error" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-linear-to-br from-pink-500 to-purple-600" }, _attrs))}><div class="grid min-h-screen grid-cols-3 items-center p-6"><div class="col-span-2"><div class="mb-6 ml-10 flex gap-2"><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: "transform rounded-full bg-white px-5 py-2 font-bold text-black shadow-md transition hover:scale-105 hover:bg-gray-100",
          "active-class": "ring-2 ring-purple-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="hidden max-w-md text-center text-white md:block"><h1 class="mb-3 text-6xl font-bold">All instances</h1><p class="mb-6 text-xl opacity-90">managed from one place</p><p class="mb-8 text-sm opacity-75">Instagram | Telegram | Teletype</p><div class="font-serif text-3xl tracking-wider">JustBoil</div></div></div><div class="flex items-center justify-center"><div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CiYyn_Ws.mjs.map
