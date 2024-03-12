import request from "./request";
import { baseUrl } from "@/config";

const http = {
  /**
   * @param url 请求地址
   * @param params 请求参数
   */
  get(url, params) {
    const config = {
      method: "get",
      url: baseUrl.dev + url,
    };
    if (params) config.params = params;
    return request(config);
  },
  post(url, params) {
    const config = {
      method: "post",
      url: baseUrl.dev + url,
    };
    if (params) config.data = params;
    return request(config);
  },
  put(url, params) {
    const config = {
      method: "put",
      url: baseUrl.dev + url,
    };
    if (params) config.params = params;
    return request(config);
  },
  delete(url, params) {
    const config = {
      method: "delete",
      url: baseUrl.dev + url,
    };
    if (params) config.params = params;
    return request(config);
  },
};
export default http;
