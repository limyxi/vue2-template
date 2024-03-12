import axios from "axios";
import qs from "qs";
import { Message } from "view-design";
import store from "@/store";
const service = axios.create({
  timeout: 10000,
});
//请求拦截器
service.interceptors.request.use(
  (config) => {
    //判斷是否有token
    const href = window.location.href;
    if (
      sessionStorage.token ||
      href.includes("/login") ||
      href.includes("/adminlogin")
    ) {
      config.data = qs.stringify(config.data);
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        token: sessionStorage.token,
      };
      // 在发送请求设置cancel token
      config.cancelToken = new axios.CancelToken((cancel) => {
        store.commit("PUSH_CANCEL", {
          cancelToken: cancel,
        });
      });
    } else {
      window.location.href = "/login";
      return false;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    } else {
      Message.error({ background: true, content: response.data.message });
      return Promise.reject(response.data);
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      if (JSON.stringify(error).includes("timeout")) {
        error.message = "服务器响应超时，请刷新当前页";
      } else {
        error.message = "请求失败";
      }
    }
    Message.error({ background: true, content: error.message });
    console.error(error.message);
    throw error;
  }
);
export default service;
