<template>
  <div style="position: relative">
    <Input
      v-model="value"
      :disabled="disabled"
      :placeholder="config.placeholder"
      @on-blur="clickblur"
      @on-focus="clickFocus"
      @on-change="handleReachBottom(true)"
    ></Input>
    <div class="scollClass" v-if="scollshow">
      <Scroll height="120" :on-reach-bottom="handleReachBottom">
        <div
          v-for="item in dataList"
          :key="item[config.key]"
          @mousedown="scollListClick(item)"
          class="scollListClass"
        >
          {{ item[config.label] }}
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import axios from "@/libs/request";
import { baseUrl } from "@/config";
export default {
  name: "NModal",
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    config: {
      type: Object,
      default: () => {
        return {
          url: "",
          //搜索的字段
          searchKey: "name",
          //选中的label
          label: "name",
          //选择的value
          key: "id",
          placeholder: "请选择",
        };
      },
    },
  },
  data() {
    return {
      value: "",
      scollshow: false,
      dataList: [],
      page: 1,
      selectParam: {},
      loadFinish: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.modal = this.showModal;
    });
  },
  methods: {
    //初始赋值
    init(val) {
      this.value = val[this.config.label];
      this.selectParam = val;
    },
    //选中下拉选项
    scollListClick(val) {
      this.scollshow = false;
      this.value = val[this.config.label];
      this.selectParam = val;
      this.$emit("input", this.selectParam[this.config.key]);
    },
    //聚焦输入框
    clickFocus() {
      this.scollshow = true;
      this.handleReachBottom(true);
    },
    //输入框失去焦点
    clickblur() {
      this.scollshow = false;
      if (this.selectParam[this.config.label] != this.value) {
        this.selectParam = {};
        this.value = "";
        this.$emit("input", "");
      }
    },
    //无限加载
    handleReachBottom(clear) {
      if (clear) {
        this.loadFinish = false;
        this.page = 1;
        this.dataList = [];
      }
      if (this.loadFinish === true) {
        return;
      }
      return new Promise((resolve) => {
        axios
          .get(baseUrl.dev + this.config.url, {
            params: {
              ...(this.config.params || {}),
              page: this.page,
              [this.config.searchKey]: this.value,
              limit: 10,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              if (res.data.list.length === 0) {
                this.loadFinish = true;
                return;
              }
              this.dataList = this.dataList.concat(res.data.list);
              this.page = this.page * 1 + 1;
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
        resolve();
      });
    },
    //清除组件数据
    clear() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },
};
</script>
<style lang="less" scoped>
.scollClass {
  position: absolute;
  background: white;
  z-index: 3;
  width: 100%;
  overflow: hidden;
  border: 1px solid #dddee1;
  border-radius: 4px;
  top: 35px;
  ::-webkit-scrollbar {
    width: 6px;
    height: 16px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px #e9eaec;
    border-radius: 3px;
    background-color: #f5f7f9;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    // -webkit-box-shadow: inset 0 0 6px #e9e9e9;
    background-color: #ccc;
  }
}
.scollListClass {
  height: 33px;
  line-height: 33px;
  padding-left: 7px;
  &:hover {
    cursor: pointer;
    background: #f3f3f3;
  }
}
</style>
