export default {
  state: {
    cancelTokenArr: [],
  },
  getters: {},
  mutations: {
    PUSH_CANCEL(state, payload) {
      state.cancelTokenArr.push(payload.cancelToken);
    },
    CLAER_CANCEL(state) {
      state.cancelTokenArr = [];
    },
  },
  actions: {},
};
