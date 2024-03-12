<template>
  <!-- 二级标题封装 -->

  <Row class="sub-tit">
    <Col span="12">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <span class="note">
        <slot name="note"></slot>
      </span>
    </Col>
    <Col span="12" class="right">
      <slot name="right"></slot>
    </Col>
  </Row>
</template>
<script>
export default {
  name: "SubTit",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.sub-tit {
  border-bottom: 1px solid #e8eaec;
  margin: 8px 0;
  display: flex;
  align-items: center;
  & > .right {
    text-align: right;
  }
  .title {
    display: inline-block;
    line-height: 30px;
    border-bottom: 3px solid #2d8cf0;
    color: #2d8cf0;
    font-weight: bold;
    font-size: 13px;
  }
  .note {
    color: grey;
    font-size: 12px;
    margin-left: 10px;
  }
}
.sub-tit-span {
  line-height: 34px;
  font-weight: bold;
  color: #3c81bc;
  display: inline-block;
  border-bottom: 3px solid #3c81bc;
}
</style>
