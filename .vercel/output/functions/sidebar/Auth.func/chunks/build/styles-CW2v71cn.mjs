import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main$1 = {
  __name: "SidebarDarkModel",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-center text-xl font-medium text-gray-500">Dark mode</h1><div class="mx-auto flex max-w-md justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><button class="${ssrRenderClass([
        "flex items-center gap-2 rounded-md px-4 py-2 font-medium transition",
        isDark.value ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.002 8.002 0 1010.586 10.586z"></path></svg> Toggle light/dark </button></div><div class="mt-10 flex items-center justify-between text-sm text-gray-600"><div> ©2026, <span class="font-medium">JustBoil.me</span> . <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a> version </div><div class="font-serif text-gray-800 italic">JustBoil</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/DarkModel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "styles",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-center text-xl font-medium text-gray-500">Sidebar Colors</h1><div class="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"><div class="flex items-center gap-2"><span class="font-medium text-gray-700">White</span></div><button class="rounded-full bg-gray-500 px-4 py-2 font-medium text-white transition hover:bg-gray-600"> Basic </button><button class="rounded-full bg-slate-500 px-4 py-2 font-medium text-white transition hover:bg-slate-600"> Slate </button><button class="rounded-full bg-zinc-500 px-4 py-2 font-medium text-white transition hover:bg-zinc-600"> Zinc </button><button class="rounded-full bg-neutral-500 px-4 py-2 font-medium text-white transition hover:bg-neutral-600"> Neutral </button><button class="rounded-full bg-stone-500 px-4 py-2 font-medium text-white transition hover:bg-stone-600"> Stone </button><button class="rounded-full bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600"> Emerald </button><button class="rounded-full bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"> Teal </button><button class="rounded-full bg-cyan-500 px-4 py-2 font-medium text-white transition hover:bg-cyan-600"> Cyan </button><button class="rounded-full bg-sky-500 px-4 py-2 font-medium text-white transition hover:bg-sky-600"> Sky </button><button class="rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600"> Blue </button><button class="rounded-full bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-600"> Indigo </button><button class="rounded-full bg-violet-500 px-4 py-2 font-medium text-white transition hover:bg-violet-600"> Violet </button><button class="rounded-full bg-purple-500 px-4 py-2 font-medium text-white transition hover:bg-purple-600"> Purple </button><button class="rounded-full bg-fuchsia-500 px-4 py-2 font-medium text-white transition hover:bg-fuchsia-600"> Fuchsia </button><button class="rounded-full bg-pink-500 px-4 py-2 font-medium text-white transition hover:bg-pink-600"> Pink </button><button class="rounded-full bg-rose-500 px-4 py-2 font-medium text-white transition hover:bg-rose-600"> Rose </button></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="mt-10 flex items-center justify-between text-sm text-gray-600"><div> ©2026, <span class="font-medium">JustBoil.me</span> . <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a> version </div><div class="font-serif text-gray-800 italic">JustBoil</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sidebar/styles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=styles-CW2v71cn.mjs.map
