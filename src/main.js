import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import Directives from "@/libs/directives";
import "view-design/dist/styles/iview.css";
import "@/style/font/iconfont.css";

import "@/style/common.less";
import "@/style/basic.less";
import "@/style/custom.less";
import "@/style/space.less";
import "@/style/common.less";
import "@/style/color.less";
import "@/style/size.less";
import M from "@/libs/message.js";
import { resetJson, resetData, getDictionary } from "@/libs/tools";
import { TbUtil } from "@/libs/tableUtil";
import VF from "@/libs/validateForm";

//树形选择组件
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
//全局组件
import CheckLabel from "@/components/checkLabel";
import Mtable from "@/components/table";
import SubTit from "@/components/divideTitle";
import NModal from "@/components/Modal";
import SearchInput from "@/components/searchInput";

Vue.config.productionTip = false;
//全局注册应用配置
Vue.prototype.$M = M;
Vue.prototype.$VF = VF;
Vue.prototype.$reset = resetJson;
Vue.prototype.$resetData = resetData;
Vue.prototype.$getDic = getDictionary;
Vue.prototype.$tbUtil = TbUtil;

Vue.component("check-label", CheckLabel);
Vue.component("m-table", Mtable);
Vue.component("sub-tit", SubTit);
Vue.component("n-modal", NModal);
Vue.component("tree-select", Treeselect);
Vue.component("search-input", SearchInput);

Vue.use(ViewUI);
Vue.use(Directives);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
