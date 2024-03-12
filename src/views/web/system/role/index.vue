<template>
  <Row :gutter="8">
    <div class="pos-relative hp100">
      <Card size="small" class="card-left">
        <p slot="title">角色管理</p>
        <Button
          size="small"
          shape="circle"
          type="primary"
          slot="extra"
          class="extra-btn"
          @click="alertType('add')"
          >新建</Button
        >
        <div class="content-menu">
          <div class="scroll-menu-part scroll-auto">
            <template v-for="item in roleData">
              <div
                class="menu-item"
                :class="{ active: currentRoleId == item.id }"
                :key="item.id"
                @click="searchRoleUser(item)"
              >
                <div><i class="iconfont iconjiaose" />{{ item.name }}</div>
                <Poptip placement="bottom-end">
                  <Icon type="ios-more" />
                  <div slot="content">
                    <div class="poptip-item" @click="editRole(item.id)">
                      编辑角色
                    </div>
                    <!-- 超级管理员不可删除 -->
                    <div
                      v-if="item.name !== '超级管理员'"
                      class="poptip-item"
                      @click="trashRole(item.id)"
                    >
                      删除角色
                    </div>
                  </div>
                </Poptip>
              </div>
            </template>
          </div>
        </div>
      </Card>
    </div>
    <Card size="small" class="card-right">
      <p slot="title">{{ currentRole.name }}</p>
      <div>
        <Tabs v-model="activeTab" type="card">
          <TabPane label="角色成员" name="name1">
            <roleUser :roleId="String(currentRoleId)" />
          </TabPane>
          <TabPane label="功能权限" name="name2">
            <functionAuth
              :roleId="String(currentRoleId)"
              :activeTab="activeTab"
            />
          </TabPane>
        </Tabs>
      </div>
    </Card>
    <modalAdd ref="modalAdd" @success="getRoleList" />
  </Row>
</template>

<script>
import auth from "@/api/auth";
import roleUser from "./components/roleUser";
import functionAuth from "./components/functionAuth";
import modalAdd from "./components/modalAdd";
export default {
  components: {
    roleUser,
    modalAdd,
    functionAuth,
  },
  data() {
    return {
      roleData: [],
      currentRoleId: "",
      currentRole: {},
      activeTab: "name1",
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    //获取角色列表
    getRoleList(clear) {
      if (clear) {
        this.currentRoleId = "";
      }
      auth.getRoleList().then((res) => {
        this.roleData = [...res.data];
        if (!this.currentRoleId && this.roleData.length > 0) {
          this.currentRoleId = this.roleData[0].id;
        }
      });
    },
    //删除角色
    trashRole(id) {
      auth.trashRole({ id: id }).then(() => {
        this.$M.success("删除成功");
        this.currentRoleId = "";
        this.currentRole = {};
        this.getRoleList(true);
      });
    },
    //搜索角色信息
    searchRoleUser(ev) {
      this.currentRoleId = ev.id;
      this.currentRole = ev;
    },
    //弹出新增角色框
    alertType(type) {
      this.$refs.modalAdd.alertModal(type);
    },
    //弹出编辑角色框
    editRole(id) {
      this.$refs.modalAdd.alertModal("edit", id);
    },
  },
};
</script>

<style lang="less">
.content-menu {
  font-size: 13px;
  .cont-menu-item {
    padding: 8px 10px;
    color: #000;
    font-weight: 400;
    position: relative;
    &.active,
    &:hover {
      color: #2d8cf0;
      background-color: #f5f8fd;
      cursor: pointer;
    }
  }
  .menu-item {
    position: relative;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    &.active,
    &:hover {
      color: #2d8cf0;
      background-color: #f5f8fd;
      cursor: pointer;
    }
  }
}
.card-left {
  width: 250px;
  position: absolute;
  top: 0;
  bottom: 0;
}
.card-right {
  width: calc(100% - 264px);
  margin-left: 257px;
}
</style>
