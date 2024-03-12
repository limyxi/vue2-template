<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="margin-top: 4px">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="all">关闭所有</DropdownItem>
          <DropdownItem name="others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div
      class="scroll-outer"
      ref="scrollOuter"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div
        ref="scrollBody"
        class="scroll-body"
        :style="{ left: tagBodyLeft + 'px' }"
      >
        <transition-group name="taglist-moving-animation">
          <Tag
            size="default"
            type="dot"
            v-for="(item, index) in list"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :name="item.name"
            :data-route-item="item"
            @on-close="handleClose(item)"
            @click.native="handleClick(item)"
            :closable="item.name !== homeName"
            :color="isCurrentTag(item) ? 'primary' : 'default'"
            >{{ item.meta.text }}
          </Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { routeEqual } from "@/libs/util";
import { homeName } from "@/config";
import "./tags-nav.less";

export default {
  name: "TagsNav",

  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    this.outerPadding = 4;
    return {
      //默认打开的首页的路由name值
      homeName,
      tagBodyLeft: 0,
    };
  },

  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    },
  },

  watch: {
    value: "getTagElementByRoute",
  },

  methods: {
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft >= -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      }
      // 标签在可视区域左侧
      else if (tag.offsetLeft < -this.tagBodyLeft) {
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      }
      // 标签在可视区域
      else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        );
      }
      // 标签在可视区域右侧
      else {
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        );
      }
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        const refsTag = this.$refs.tagsPageOpened;
        const tag = refsTag.find((i) =>
          routeEqual(i.$attrs["data-route-item"], route)
        );
        tag && this.moveToView(tag.$el);
      });
    },
    handleTagsOption(type) {
      if (type.includes("all")) {
        // 关闭所有，除了home
        let res = this.list.filter((item) => item.name === homeName);
        this.$emit("on-close", res, "all");
      } else if (type.includes("others")) {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(
          (item) =>
            routeEqual(this.currentRouteObj, item) || item.name === homeName
        );
        this.$emit("on-close", res, "others", this.currentRouteObj);
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj);
        }, 100);
      }
    },
    handleClose(current) {
      let res = this.list.filter((item) => !routeEqual(current, item));
      this.$emit("on-close", res, undefined, current);
    },
    handleClick(item) {
      this.$emit("input", item);
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item);
    },
  },
};
</script>
