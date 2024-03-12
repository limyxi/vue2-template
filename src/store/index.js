import Vue from "vue";
import Vuex from "vuex";

import app from "./module/app";
import axios from "./module/axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    axios,
  },
});
