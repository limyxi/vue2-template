const constanst = require("@/libs/constanst");

/** api请求基础路径 **/
export const baseUrl = {
  dev: constanst.baseUrl,
  pro: constanst.baseUrl,
};

/** 默认打开的首页的路由name值，默认为home **/
export const homeName = "home";

/** 文件根路径 **/
export const rootDirect = "constanst.routeBase";

/** table默认的请求条数 **/
export const limit = 10;

/** table分页切换条数 **/
export const pageSizeOpts = [10, 20, 30, 40];
