<template>
  <div class="task-wrap">
    <Poptip placement="top" transfer width="250">
      <Badge :count="number">
        <i class="iconfont iconxiaoxi task-icon"></i>
      </Badge>
      <div class="api" slot="content">
        <Tabs size="small" v-model="status" @on-click="changTab">
          <TabPane label="未读" :name="yesNoName['no'].value"></TabPane>
          <TabPane label="已读" :name="yesNoName['yes'].value"></TabPane>
        </Tabs>
        <div id="message-wrap" @scroll="scrollResult">
          <div>
            <div
              class="message-item"
              v-for="(item, index) in resultList"
              :key="index"
            >
              {{ item.title }}
            </div>
          </div>
          <div v-if="resultList.length == 0" class="fgrey">暂无消息</div>
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script>
// import collaboration from "@/api/collaboration";
export default {
  props: {},
  data() {
    return {
      number: 0,
      page: 1,
      resultList: [],
      status: "",
    };
  },
  created() {
    this.yesNoName = this.$getDic()["yes.no"].valueName;
    this.status = this.yesNoName["no"].value;
    // this.getMessage();
  },
  methods: {
    // getMessage(clear) {
    //   if (clear) {
    //     this.page = 1;
    //     this.resultList = [];
    //   }
    //   collaboration
    //     .notificationIndex({
    //       status: this.status,
    //       page: this.page,
    //       factoryId: sessionStorage.factoryId,
    //     })
    //     .then((res) => {
    //       if (res.data.list.length > 0) {
    //         this.resultList = this.resultList.concat(res.data.list);
    //         this.page++;
    //       }
    //       if (this.status === this.yesNoName["no"].value) {
    //         this.number = res.data.total;
    //       }
    //     })
    //     .caruntch((err) => {
    //       this.$M.error(err.message);
    //     });
    // },
    scrollResult() {
      // let height = Number($("#message-wrap").height());
      // let scrollTop = Number($("#message-wrap").scrollTop());
      // let scrollHeight = Number($("#message-wrap").get(0).scrollHeight);
      // if (
      //   height + scrollTop + 1 >= scrollHeight &&
      //   this.page > 1 &&
      //   scrollTop > 0
      // ) {
      //   this.getMessage();
      // }
    },
    changTab(value) {
      this.status = value;
      this.getMessage(true);
    },
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
#message-wrap {
  max-height: 200px;
  overflow-y: auto;
}
.message-item {
  font-size: 12px;
  line-height: 20px;
  border-bottom: 1px solid #ddd;
  padding: 2px 0;
  white-space: pre-wrap;
  &:hover {
  }
}
</style>
