<template>
  <div
    class="collapsable-tag-wrapper"
    :class="{ collapse }"
    @click="onWrapperClick"
  >
    <span v-if="showTip">{{ tip }}</span>
    <span class="collapse-btn" @click.stop="switchCollapse">{{
      collapse ? "展开" : "收缩"
    }}</span>
    <Tag
      v-for="(item, index) in data"
      :key="item.id"
      closable
      color="primary"
      @on-close="onTagClose(index)"
    >
      {{ item.name }}
    </Tag>
  </div>
</template>

<script>
/**t
 * 简单的tag容器框，可隐藏超出的tag
 */

export default {
  name: "CollapsableTagWrapper",

  props: {
    // 标签数组，[{id, name}]
    data: Array,
    // 说明文字
    tip: String,
    // 是否显示说明文字
    showTip: Boolean,
  },

  data() {
    return {
      collapse: false,
    };
  },

  methods: {
    onWrapperClick() {
      this.$emit("click-wrapper");
    },
    onTagClose(i) {
      this.$emit("close-tag", i);
    },
    switchCollapse() {
      this.collapse = !this.collapse;
    },
  },
};
</script>

<style lang="less">
.collapsable-tag-wrapper {
  position: relative;
  padding-left: 10px;
  padding-right: 50px;
  min-height: 34px;
  border: 1px solid #dcdee2;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    border: 1px solid #2d8cf0;
  }

  &.collapse {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .collapse-btn {
    position: absolute;
    right: 0;
    width: 50px;
    height: 30px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
