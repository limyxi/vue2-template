<template>
  <!-- 基于iview的表格封装  选择多选表格-->
  <div>
    <m-table
      ref="mtable"
      :config="config"
      @getData="getList"
      @selectChange="select"
    />
    <sub-tit>
      <span slot="title">{{ note }}</span>
    </sub-tit>
    <div>
      <Tag
        color="primary"
        closable
        @on-close="closeTag(index, item)"
        :key="item.id"
        v-for="(item, index) in choosedLabel"
        >{{ labelText ? labelText(item) : item.name }}</Tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "ChooseTable",
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
    note: {
      type: String,
      default: () => {
        return "已选数据";
      },
    },
    labelText: null,
    api: null,
  },
  data() {
    return {
      choosedLabel: [],
    };
  },
  methods: {
    getList(clear, queryParam) {
      this.$refs.mtable.loading = true;
      let param = this.$refs.mtable.pageParam;
      if (clear) {
        param.page = 1;
      }
      param = { ...param, ...queryParam };
      this.api(param).then((res) => {
        this.$refs.mtable.handleData(res.data);
        this.$nextTick(() => {
          this.updateCheck();
        });
      });
    },
    select(selection) {
      this.$refs.mtable.tabledata.forEach((item) => {
        if (selection.find((v) => v.id === item.id)) {
          if (!this.choosedLabel.find((v) => v.id === item.id)) {
            this.choosedLabel.push(item);
          }
        } else {
          const findIndex = this.choosedLabel.findIndex(
            (v) => v.id === item.id
          );
          if (findIndex === -1) return;
          this.choosedLabel.splice(findIndex, 1);
        }
      });
    },
    closeTag(index) {
      this.choosedLabel.splice(index, 1);
      this.updateCheck();
    },
    updateCheck() {
      this.$refs.mtable.tabledata.forEach((item) => {
        if (this.choosedLabel.find((v) => v.id === item.id)) {
          this.$set(item, "_checked", true);
        } else {
          this.$set(item, "_checked", false);
        }
      });
    },
  },
};
</script>
