import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const users = ref([
      { id: 1, name: "Farzana Akter", email: "farzana@example.com", role: "Admin", status: "Active" },
      { id: 2, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
      { id: 3, name: "Sarah Ali", email: "sarah@example.com", role: "Manager", status: "Pending" }
    ]);
    const search = ref("");
    const filteredUsers = computed(() => {
      return users.value.filter(
        (u) => u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase())
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><h1 class="text-2xl font-bold">Users</h1><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Search users..." class="input input-bordered w-64"></div><div class="overflow-x-auto"><table class="table-zebra table w-full"><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th class="text-right">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(filteredUsers.value, (user, index) => {
        _push(`<tr><td>${ssrInterpolate(index + 1)}</td><td class="font-medium">${ssrInterpolate(user.name)}</td><td>${ssrInterpolate(user.email)}</td><td>${ssrInterpolate(user.role)}</td><td><div class="${ssrRenderClass([{
          "badge-success": user.status === "Active",
          "badge-warning": user.status === "Pending"
        }, "badge"])}">${ssrInterpolate(user.status)}</div></td><td class="text-right"><button class="btn btn-sm btn-outline">View</button><button class="btn btn-sm btn-error ml-2">Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=users-pTNNAhmo.mjs.map
