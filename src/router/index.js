const constanst = require("@/libs/constanst");
import Vue from "vue";
import Router from "vue-router";
import webIndex from "./web/index.router";
import adminIndex from "./admin/index.router";
import store from "@/store";

Vue.use(Router);
let routes = [...webIndex, ...adminIndex];
const router = new Router({
  routes,
  mode: "history",
  base: constanst.routeBase,
});
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
//忽略权限的路由
const routesAuthIgnore = ["/login", "/adminlogin"];

router.beforeEach((to, from, next) => {
  // 取消请求
  store.commit("CLAER_CANCEL");
  //路由跳转前判断，若没有token，跳转至login
  if (sessionStorage.token) {
    next();
  } else {
    if (routesAuthIgnore.includes(to.path)) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
  // next();
});
export default router;
