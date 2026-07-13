import { _ as __nuxt_component_0 } from './nuxt-link-BvdDl6Me.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { I as Icon } from './server.mjs';
import { useRouter } from 'vue-router';
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

const defaultAvatar = "https://picsum.photos/seed/default/200/200";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "upload",
  __ssrInlineRender: true,
  setup(__props) {
    const currentAvatar = ref(defaultAvatar);
    const previewUrl = ref("");
    const selectedFile = ref(null);
    ref(null);
    const profile = ref(null);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-2xl p-6" }, _attrs))}><div class="mb-8 flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile",
        class: "text-blue-600 hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "mdi:arrow-left",
              class: "h-6 w-6"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Icon), {
                icon: "mdi:arrow-left",
                class: "h-6 w-6"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold">Upload New Avatar</h1></div><div class="mb-8"><h2 class="mb-4 text-lg font-semibold">Current Avatar</h2><div class="flex items-center gap-6"><img${ssrRenderAttr("src", currentAvatar.value)} alt="Current Avatar" class="h-24 w-24 rounded-full border-2 border-gray-200"><div><p class="text-gray-700">${ssrInterpolate(profile.value?.name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(profile.value?.role)}</p></div></div></div><div class="rounded-lg bg-white p-6 shadow"><h2 class="mb-4 text-lg font-semibold">Choose New Image</h2><div class="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-blue-400"><input type="file" accept="image/*" class="hidden"><div class="flex flex-col items-center justify-center gap-4">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:cloud-upload",
        class: "h-12 w-12 text-gray-400"
      }, null, _parent));
      _push(`<div><p class="font-medium text-gray-700">Click to upload or drag and drop</p><p class="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p></div></div></div>`);
      if (previewUrl.value) {
        _push(`<div class="mt-6"><h3 class="text-md mb-3 font-medium">Preview</h3><img${ssrRenderAttr("src", previewUrl.value)} alt="Preview" class="h-32 w-32 rounded-full border-2 border-gray-200"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-8 flex gap-4">`);
      if (previewUrl.value || currentAvatar.value !== defaultAvatar) {
        _push(`<button class="rounded-lg bg-red-100 px-4 py-2 text-red-700 transition hover:bg-red-200"> Remove Image </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(!selectedFile.value && currentAvatar.value === defaultAvatar) ? " disabled" : ""} class="ml-auto rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"> Save Changes </button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/upload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=upload-BsqZGWof.mjs.map
