<template>
  <!-- 基于iview的表格封装 -->
  <!-- 包含分页，批量操作 -->
  <div>
    <!-- 批量操作的按钮 -->
    <div
      class="btn-groups"
      v-if="config.batchList && config.batchList.length > 0"
    >
      <template v-if="batchEdit">
        <Button type="primary" @click="confirmCheck">确定</Button>
        <Button type="default" @click="cancelAll">取消</Button>
        <span class="check-text"
          >已选<span class="bold">{{ checkedData.length }}</span
          >个结果</span
        >
      </template>
      <Button
        :type="item.color ? item.color : 'primary'"
        @click="editBatchData(item.type)"
        v-for="item in config.batchList"
        :key="item.type"
        v-else
        >{{ item.label }}</Button
      >
    </div>

    <!-- 表格主题 -->
    <Table
      size="small"
      ref="table"
      :columns="config.columns"
      :data="tabledata"
      border
      :loading="loading"
      @on-selection-change="selectChange"
      :row-key="config.rowkey ? config.rowkey : ''"
      @on-row-click="clickRow"
      class="table-common-style"
    ></Table>

    <!-- 分页 -->
    <div class="page-wrap" v-if="pageParam.page">
      <Page
        size="small"
        :total="total"
        :current="pageParam.page"
        :page-size="pageParam.limit"
        show-total
        @on-change="pageChange"
        show-sizer
        @on-page-size-change="pageSizeChange"
        :page-size-opts="pageSizeOpts"
        :placement="placement"
      >
        <slot>共{{ total }}条{{ lastPage }}页</slot>
      </Page>
    </div>
  </div>
</template>
<script>
import { pageSizeOpts, limit } from "@/config";
export default {
  name: "Mtable",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    placement: {
      type: String,
      default: "bottom",
    },
  },
  data() {
    return {
      //表格分页
      pageSizeOpts,

      batchList: [],
      pageParam: {
        page: 1,
        limit: 10,
      },
      total: 0,
      lastPage: 1,
      tabledata: [],
      checkedData: [],
      batchEdit: false,
      batchType: "",
      loading: false,
    };
  },
  mounted() {
    this.pageParam.limit = limit;
  },
  methods: {
    init() {
      this.loading = true;
      this.$emit("getData");
    },
    handleData(param) {
      this.loading = false;
      this.tabledata = param.list;
      this.total = param.total;
      this.pageParam.page = param.pageNum == 0 ? 1 : param.pageNum;
      this.lastPage = param.pages;
    },
    pageChange(page) {
      this.loading = true;
      this.pageParam.page = page;
      this.$emit("getData");
    },
    pageSizeChange(size) {
      this.pageParam.limit = size;
      this.loading = true;
      this.$emit("getData", true);
    },
    editBatchData(type) {
      this.config.columns.unshift({
        type: "selection",
        width: 60,
        align: "center",
      });
      this.batchEdit = true;
      this.batchType = type;
    },
    confirmCheck() {
      if (this.checkedData.length === 0) {
        this.$M.warn("请至少勾选一条数据");
        return "";
      }
      this.$emit("checkData", this.checkedData, this.batchType);
    },
    cancelAll() {
      this.batchEdit = false;
      if (this.config.columns[0].type === "selection") {
        this.$refs.table.selectAll(false);
        this.config.columns.shift();
      }
    },
    clickRow(row) {
      if (this.$listeners["clickRow"]) {
        this.$emit("clickRow", row);
      }
    },
    selectChange(selection) {
      this.checkedData = selection;
      this.$emit("selectChange", selection);
    },
  },
};
</script>
<style lang="less">
.check-btns {
  .ivu-btn:hover {
    color: #19be6b;
    background-color: #fff;
    border-color: #19be6b;
  }
}
.check-text {
  display: inline-block;
  margin-left: 5px;
  line-height: 23px;
}
.table-common-style {
  .ivu-table-tip {
    min-height: 200px;
    table {
      min-height: 200px;
    }
  }
  .ivu-table-body {
    min-height: 200px;
  }
}
</style>
