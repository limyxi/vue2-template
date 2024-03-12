<template>
  <!-- 按钮组切换的组件封装 -->

  <ButtonGroup shape="circle" class="check-btns">
    <Button
      type="success"
      ghost
      :class="item[match] === config.defaultId && 'active'"
      v-for="(item, index) in showConfigList"
      :key="index"
      @click="changeStatus(item)"
      >{{ item.name }}</Button
    >
  </ButtonGroup>
</template>
<script>
export default {
  name: "CheckLabel",
  props: {
    config: {
      type: Object,
      default: () => {
        return [];
      },
    },
    match: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    showConfigList() {
      let list = this.config.list.filter(
        (item) => !this.config.hidden || !item[this.config.hidden]
      );
      return list;
    },
  },
  methods: {
    changeStatus(param) {
      this.$emit("changeStatus", param);
    },
  },
};
</script>
<style lang="less" scoped>
.check-btns {
  margin-bottom: 10px;
  .ivu-btn {
    &:hover,
    &.active {
      color: white;
      background-color: #19be6b;
    }
  }
  .ivu-btn-success {
    background-color: white;
  }
}
</style>
