export default [
  {
    path: "/system/user/index",
    name: "userIndex",
    meta: {
      text: "用户列表",
    },
    component: () => import("@/views/web/system/user/index"),
  },
  {
    path: "/system/role/index",
    name: "roleIndex",
    meta: {
      text: "角色列表",
    },
    component: () => import("@/views/web/system/role/index"),
  },
  {
    path: "/system/department/index",
    name: "departmentIndex",
    meta: {
      text: "部门列表",
    },
    component: () => import("@/views/web/system/department/index"),
  },
];
