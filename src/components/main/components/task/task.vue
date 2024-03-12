<template>
  <div class="task-wrap">
    <Badge
      :count="number"
      @click.native="
        $router.push('/collaboration/processInstance/indexByReady')
      "
    >
      <i class="iconfont icondaiban task-icon" />
    </Badge>
  </div>
</template>

<script>
// import collaboration from "@/api/collaboration";

export default {
  data() {
    return {
      number: 0,
    };
  },

  methods: {
    // getTask() {
    //   collaboration
    //     .processInstanceIndexByReady({
    //       page: 1,
    //       limit: 1,
    //       factoryId: sessionStorage.factoryId,
    //     })
    //     .then((res) => (this.number = res.data.total))
    //     .catch((err) => this.$M.error(err.message));
    // },
  },

  created() {
    // this.getTask()
  },
};
</script>

<style scoped lang="less">
/deep/ .ivu-badge-count {
  top: 3px;
  right: -3px;
  height: 16px;
  min-width: 16px;
  line-height: 14px;
  padding: 0 5px;
}

.task-icon {
  font-size: 23px;

  &:hover {
    cursor: pointer;
    color: #2d8cf0;
  }
}

.task-wrap {
  margin-right: 35px;
}
</style>
