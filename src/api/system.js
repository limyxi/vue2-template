import http from "../libs/http";
const request = "/system";
export default {
  //数据字典
  getDictionaryCategoryAuthIgnore(params) {
    return http.get(`${request}/dictionaryCategory/listAuthIgnore`, params);
  },
};
