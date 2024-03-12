<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      v-show="!collapsed"
      :active-name="activeName"
      accordion
      theme="dark"
      width="auto"
      :open-names="openedNames"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        ></side-menu-item>
        <MenuItem v-else :name="item.name" :key="`menu-${item.name}`">
          <!-- <Icon :type="item.icon"></Icon> -->
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </MenuItem>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length"
          @on-click="handleSelect"
          hide-title
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
        ></collapsed-menu>
        <Tooltip
          transfer
          v-else
          :content="showTitle(item)"
          placement="right"
          :key="`drop-menu-${item.name}`"
        >
          <a
            @click="handleSelect(item.children[0].name)"
            class="drop-menu-a"
            :style="{ textAlign: 'center' }"
          >
            <i
              :class="item.icon || (item.children && item.children[0].icon)"
            ></i>
            <!-- <Icon :type="item.icon|| (item.children && item.children[0].icon)" size="20" color="white"></Icon> -->
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from "./side-menu-item.vue";
import CollapsedMenu from "./collapsed-menu.vue";
import mixin from "./mixin";
// import { homeName } from "@/config";
export default {
  name: "SideMenu",
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
    activeName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      openedNames: [],
      menuList: [
        {
          name: "dictionaryCategoryList",
          icon: "iconfont iconrenwupaicheng",
          text: "系统字典",
        },
        {
          name: "logIndex",
          icon: "iconfont iconrenwupaicheng",
          text: "日志",
        },
        {
          name: "auth",
          icon: "iconfont iconguanli",
          text: "权限管理",
          children: [
            {
              name: "functionIndex",
              icon: "iconfont iconchaxun",
              text: "功能操作列表",
            },
            {
              name: "privilegeList",
              icon: "iconfont iconchaxun",
              text: "权限列表",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map((item) => item.name)
        .filter((item) => item !== name);
    },
    // updateOpenName(name) {
    // if (name === homeName) this.openedNames = []
    // else this.openedNames = this.getOpenedNamesByActiveName(name)
    // },
  },
};
</script>

<style lang="less">
.side-menu-wrapper {
  user-select: none;
  .menu-collapsed {
    padding-top: 10px;

    .ivu-dropdown {
      width: 100%;
      .ivu-dropdown-rel a {
        width: 100%;
      }
    }
    .ivu-tooltip {
      width: 100%;
      .ivu-tooltip-rel {
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content {
        .ivu-tooltip-arrow {
          border-right-color: #fff;
        }
        .ivu-tooltip-inner {
          background: #fff;
          color: #495060;
        }
      }
    }
  }
  a.drop-menu-a {
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
  .iconfont {
    font-size: 17px;
    color: white;
  }
}
</style>
