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
      allMenuList: [
        {
          name: "system",
          icon: "iconfont iconguanli",
          text: "系统管理",
          children: [
            {
              name: "departmentIndex",
              icon: "iconfont iconguanli",
              text: "组织管理",
              auth: "auth.user.index",
            },
            {
              name: "userIndex",
              icon: "iconfont iconguanli",
              text: "用户管理",
              auth: "auth.user.index",
            },
            {
              name: "roleIndex",
              icon: "iconfont iconjiaoseguanli",
              text: "角色管理",
              auth: "auth.role.index",
            },
          ],
        },
      ],
      menuList: [],
    };
  },
  mounted() {
    this.authList = JSON.parse(sessionStorage.authList);
    this.menuList = this.filterAuth(this.allMenuList);
  },
  methods: {
    filterAuth(arr) {
      let project = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].children) {
          let parent = arr[i];
          let childArr = this.filterAuth(arr[i].children);
          if (childArr.length > 0) {
            parent.children = childArr;
            project.push(parent);
          }
        } else {
          project.push(arr[i]);

          // if (this.authList.includes(arr[i].auth)) {
          //   project.push(arr[i]);
          // }
        }
      }
      return project;
    },
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
