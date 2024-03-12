<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <span class="fblue">{{ name }} ({{ series }})</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="password">修改密码</DropdownItem> -->
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
export default {
  name: "User",
  props: {},
  data() {
    return {
      name: "",
      series: "",
    };
  },
  created() {
    let user = JSON.parse(sessionStorage.user);
    this.name = user.name;
    this.series = user.series;
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    },
    message() {
      this.$router.push({
        name: "message_page",
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
      }
    },
  },
};
</script>
