import {
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  routeHasExist,
  routeEqual,
} from "@/libs/util";
import router from "@/router";
import { homeName } from "@/config";

const closeTag = (state, route, jumpToNextRoute) => {
  const index = state.tagNavList.findIndex((item) => routeEqual(item, route));

  if (index === -1) return;

  state.tagNavList.splice(index, 1);

  jumpToNextRoute &&
    router.push(state.tagNavList[index - 1] || state.tagNavList[index + 1]);
};
export default {
  state: {
    tagNavList: [],
    homeRoute: {},
    factoryId: "",
  },
  getters: {},
  mutations: {
    setFactoryId(state, factoryId) {
      state.factoryId = factoryId;
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName);
    },
    addTag(state, { route, type = "unshift" }) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === "push") state.tagNavList.push(route);
        else {
          if (route.name === homeName) state.tagNavList.unshift(route);
          else state.tagNavList.splice(1, 0, route);
        }
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    },
    setTagNavList(state, list) {
      let tagList = [];
      if (list) {
        tagList = [...list];
      } else tagList = getTagNavListFromLocalstorage() || [];
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
      let homeTagIndex = tagList.findIndex((item) => item.name === homeName);
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0];
        tagList.unshift(homeTag);
      }
      state.tagNavList = [...tagList];
      setTagNavListInLocalstorage([...tagList]);
    },
    closeTag(state, route) {
      closeTag(state, route);
    },
    closeTagAndJump(state, route) {
      closeTag(state, route, true);
    },
  },
  actions: {},
};
