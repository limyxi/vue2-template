import Main from "@/components/main";
import single from "./singlePage.router";
import system from "./system.router";
//按需加载打包，分离
export default [
  ...single,
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        meta: {
          text: "首页",
        },
        component: () => import("@/views/home"),
      },
      ...system,
    ],
  },
];
