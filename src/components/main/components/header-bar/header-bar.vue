<template>
  <div class="header-bar">
    <a
      @click="handleChange"
      type="text"
      :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"
    >
      <Icon type="md-menu" size="26" />
    </a>
    <div class="custom-content-con">
      <User></User>
      <Task></Task>
      <Message></Message>
    </div>
  </div>
</template>
<script>
import User from "../user";
import Message from "../message";
import Task from "../task";
import "./header-bar.less";
export default {
  name: "HeaderBar",
  components: {
    User,
    Message,
    Task,
  },
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      factoryList: [],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleChange() {
      this.$emit("on-coll-change", !this.collapsed);
    },
  },
};
</script>
