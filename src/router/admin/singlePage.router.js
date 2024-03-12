export default [
  {
    path: "/adminlogin",
    name: "adminlogin",
    meta: {
      text: "登录",
    },
    component: () => import("@/views/adminLogin"),
  },
];
