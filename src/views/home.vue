<template>
  <div>
    <Card size="small">
      <p slot="title">首页</p>
      <a href="#" slot="extra" @click.prevent="">
        <Icon type="ios-loop-strong"></Icon>
        Change
      </a>
      <div>欢迎使用！</div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
