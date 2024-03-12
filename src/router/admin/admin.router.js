export default [
  {
    path: "/admin/log/index",
    name: "logIndex",
    meta: {
      text: "日志管理",
    },
    component: () => import("@/views/admin/log/logIndex"),
  },
  {
    path: "/admin/dictionaryCategory/list",
    name: "dictionaryCategoryList",
    meta: {
      text: "系统字典",
    },
    component: () =>
      import("@/views/admin/dictionaryCategory/dictionaryCategoryList"),
  },
  {
    path: "/admin/function/index",
    name: "functionIndex",
    meta: {
      text: "功能操作列表",
    },
    component: () => import("@/views/admin/function/functionIndex"),
  },
  {
    path: "/admin/function/sync",
    name: "functionSync",
    meta: {
      text: "功能操作同步",
    },
    component: () => import("@/views/admin/function/functionSync"),
  },
  {
    path: "/admin/privilege/list",
    name: "privilegeList",
    meta: {
      text: "权限列表",
    },
    component: () => import("@/views/admin/privilege/privilegeList"),
  },
  {
    path: "/admin/privilege/edit",
    name: "privilegeEdit",
    meta: {
      text: "修改权限",
    },
    component: () => import("@/views/admin/privilege/privilegeEdit"),
  },
];
