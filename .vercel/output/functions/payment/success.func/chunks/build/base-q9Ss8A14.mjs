import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "base",
  __ssrInlineRender: true,
  setup(__props) {
    const formData = ref({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "",
      category: "Business development",
      question: "",
      checkbox: ["Lorem"],
      radio: "One",
      switch1: true,
      switch2: false
    });
    const errors = ref({});
    const loading = ref(false);
    const success = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-8 flex items-center justify-between"><h1 class="text-2xl font-bold">Forms example</h1><button class="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"> Buy dashboard </button></div><form class="space-y-6"><div><h3 class="mb-2 font-medium">Grouped with icons</h3><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div class="relative"><input${ssrRenderAttr("value", formData.value.name)} type="text" placeholder="John Doe" class="w-full rounded-lg border p-3 pl-10"><span class="absolute top-3.5 left-3 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></span></div><div class="relative"><input${ssrRenderAttr("value", formData.value.email)} type="email" placeholder="john.doe@example.com" class="w-full rounded-lg border p-3 pl-10"><span class="absolute top-3.5 left-3 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14v-2H5v2z"></path></svg></span></div></div></div><div><h3 class="mb-2 font-medium">With help line</h3><div class="relative"><input${ssrRenderAttr("value", formData.value.phone)} type="text" placeholder="Your phone number" class="${ssrRenderClass([{ "border-red-500": errors.value.phone }, "w-full rounded-lg border p-3"])}">`);
      if (errors.value.phone) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mt-1 text-sm text-gray-500">Do not enter the leading zero</p></div></div><div><h3 class="mb-2 font-medium">Dropdown</h3><select class="w-full rounded-lg border p-3"><option value="Business development"${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, "Business development") : ssrLooseEqual(formData.value.category, "Business development")) ? " selected" : ""}>Business development</option><option value="Marketing"${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, "Marketing") : ssrLooseEqual(formData.value.category, "Marketing")) ? " selected" : ""}>Marketing</option><option value="Sales"${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, "Sales") : ssrLooseEqual(formData.value.category, "Sales")) ? " selected" : ""}>Sales</option><option value="Support"${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, "Support") : ssrLooseEqual(formData.value.category, "Support")) ? " selected" : ""}>Support</option></select></div><div><h3 class="mb-2 font-medium">Question</h3><textarea placeholder="Explain how we can help you" rows="4" class="${ssrRenderClass([{ "border-red-500": errors.value.question }, "w-full rounded-lg border p-3"])}">${ssrInterpolate(formData.value.question)}</textarea>`);
      if (errors.value.question) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.question)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mt-1 text-sm text-gray-500">Your question. Max 255 characters</p></div><div><h3 class="mb-2 font-medium">Checkbox</h3><div class="flex gap-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(formData.value.checkbox) ? ssrLooseContain(formData.value.checkbox, "Lorem") : formData.value.checkbox) ? " checked" : ""} type="checkbox" value="Lorem" class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"> Lorem </label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(formData.value.checkbox) ? ssrLooseContain(formData.value.checkbox, "Ipsum") : formData.value.checkbox) ? " checked" : ""} type="checkbox" value="Ipsum" class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"> Ipsum </label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(formData.value.checkbox) ? ssrLooseContain(formData.value.checkbox, "Dolore") : formData.value.checkbox) ? " checked" : ""} type="checkbox" value="Dolore" class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"> Dolore </label></div></div><div><h3 class="mb-2 font-medium">Radio</h3><div class="flex gap-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(formData.value.radio, "One")) ? " checked" : ""} type="radio" value="One" class="mr-2 h-5 w-5 rounded-full border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"> One </label><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(formData.value.radio, "Two")) ? " checked" : ""} type="radio" value="Two" class="mr-2 h-5 w-5 rounded-full border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"> Two </label></div></div><div><h3 class="mb-2 font-medium">Switch</h3><div class="flex items-center gap-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(formData.value.switch1) ? ssrLooseContain(formData.value.switch1, null) : formData.value.switch1) ? " checked" : ""} type="checkbox" class="sr-only"><div class="${ssrRenderClass([{ "bg-gray-300": !formData.value.switch1 }, "relative h-6 w-12 cursor-pointer rounded-full bg-blue-600 transition-colors"])}"><div class="${ssrRenderClass([{ "translate-x-6 transform": formData.value.switch1 }, "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"])}"></div></div><span class="ml-2">One</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(formData.value.switch2) ? ssrLooseContain(formData.value.switch2, null) : formData.value.switch2) ? " checked" : ""} type="checkbox" class="sr-only"><div class="${ssrRenderClass([{ "bg-blue-600": formData.value.switch2 }, "relative h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition-colors"])}"><div class="${ssrRenderClass([{ "translate-x-6 transform": formData.value.switch2 }, "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"])}"></div></div><span class="ml-2">Two</span></label></div></div><div><button type="button" disabled class="flex cursor-not-allowed items-center gap-2 rounded-lg bg-gray-400 px-4 py-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> Upload (UI only) </button><p class="mt-1 text-sm text-gray-500">* File upload not implemented in this demo</p></div><div class="flex gap-4 pt-4"><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">${ssrInterpolate(loading.value ? "Submitting..." : "Submit")}</button><button type="button" class="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"> Reset </button></div>`);
      if (success.value) {
        _push(`<div class="mt-4 rounded-lg bg-green-100 p-4 text-green-700"> ✅ Form submitted successfully! </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form><div class="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-md"><div class="rounded-t-xl bg-blue-600 p-4 font-semibold text-white">Info state</div><div class="p-4"><h3 class="mb-2 font-medium">Fields</h3><input${ssrRenderAttr("value", formData.value.name)} type="text" class="w-full rounded-lg border p-3"><button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"> Trigger </button></div></div><div class="mt-10 text-sm text-gray-500"> ©2026, JustBoil.me. <a href="#" class="text-blue-600 hover:underline">Buy Premium version</a></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forms/base.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=base-q9Ss8A14.mjs.map
