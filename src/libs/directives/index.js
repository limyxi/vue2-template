import download from "./download";
// 自定义指令
const directives = {
  download,
};
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
