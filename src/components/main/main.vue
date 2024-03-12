<template>
  <Layout style="height: 100%" class="main">
    <Sider
      hide-trigger
      collapsible
      :width="200"
      :collapsed-width="64"
      v-model="collapsed"
      class="left-sider"
      :style="{
        position: 'relative',
        height: '100vh',
        left: 0,
        overflow: 'hidden',
      }"
    >
      <side-menu
        v-if="userType === 'user'"
        accordion
        ref="sideMenu"
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
      >
        <div class="logo-con">
          <span v-show="!collapsed">后台</span>
          <!-- <img src="@/assets/logo.png" alt v-show="!collapsed" /> -->
          <span v-show="collapsed">A</span>
        </div>
      </side-menu>
      <admin-side-menu
        v-else
        accordion
        ref="sideMenu"
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
      >
        <div class="logo-con">
          <span v-show="!collapsed">超级后台</span>
          <!-- <img src="@/assets/logo.png" alt v-show="!collapsed" /> -->
          <span v-show="collapsed">A</span>
        </div>
      </admin-side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar
          :collapsed="collapsed"
          @on-coll-change="handleCollapsedChange"
          @on-close="handleCloseTag"
        >
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav
              :value="$route"
              @input="handleClick"
              :list="tagNavList"
              @on-close="handleCloseTag"
            />
          </div>
          <Content class="content-wrapper">
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view></router-view>
            </keep-alive>
            <div v-else>
              <router-view v-if="refreshView"></router-view>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from "./components/side-menu";
import AdminSideMenu from "./components/admin-side-menu";
import HeaderBar from "./components/header-bar";
import TagsNav from "./components/tags-nav";
import { mapMutations } from "vuex";
import { getNewTagList, routeEqual, getHomeRoute } from "@/libs/util";
import { homeName } from "@/config";
import routers from "@/router";
import "./main.less";
export default {
  name: "Main",
  components: {
    SideMenu,
    AdminSideMenu,
    HeaderBar,
    TagsNav,
  },
  data() {
    return {
      collapsed: false,
      userType: "",
      refreshView: true,
      selectView: "",
    };
  },
  computed: {
    tagNavList() {
      let tagList = JSON.parse(
        JSON.stringify(this.$store.state.app.tagNavList)
      );
      tagList.forEach((el) => {
        if (el.query && el.query.id) {
          el.meta.text = el.meta.text.replace("新增", "编辑");
        } else {
          el.meta.text = el.meta.text.replace("编辑", "新增");
        }
      });

      return tagList;
    },
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({
        route: { name, query, params, meta },
        type: "push",
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      // this.$refs.sideMenu.updateOpenName(newRoute.name)
    },
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList();
    this.setHomeRoute(routers);
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, params, query, meta },
    });
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find((item) => item.name === this.$route.name)) {
      this.$router.push({
        name: homeName,
      });
    }
    this.userType = sessionStorage.userType;
  },
  methods: {
    ...mapMutations([
      "addTag",
      "setTagNavList",
      "setHomeRoute",
      "closeTagAndJump",
    ]),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(getHomeRoute(routers.options.routes, name).path);
        return;
      }

      this.$router.push({ name, params, query });
      if (this.selectView) {
        if (this.selectView === name) {
          this.refreshView = false;
          this.$nextTick(() => {
            this.refreshView = true;
          });
        } else {
          this.selectView = name;
        }
      } else {
        this.selectView = name;
      }
    },
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    handleClick(item) {
      this.turnToPage(item);
    },
    handleCloseTag(res, type, route) {
      if (type !== "others") {
        if (type === "all") {
          this.turnToPage(homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTagAndJump(route);
          }
        }
      }
      this.setTagNavList(res);
    },
  },
};
</script>
