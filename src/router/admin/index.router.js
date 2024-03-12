import Main from "@/components/main";
import admin from "./admin.router";
import single from "./singlePage.router";
//按需加载打包，分离
export default [
  ...single,
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/admin",
        name: "adminHome",
        meta: {
          text: "首页",
        },
        component: () => import("@/views/home"),
      },
      ...admin,
    ],
  },
];
