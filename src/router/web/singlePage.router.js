export default [
  {
    path: "/login",
    name: "login",
    meta: {
      text: "登录",
    },
    component: () => import("@/views/login"),
  },
];
