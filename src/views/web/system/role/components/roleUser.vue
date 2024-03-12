<template>
  <div>
    <div class="btn-groups right">
      <Button type="primary" @click="alertUser">添加成员</Button>
    </div>
    <m-table
      ref="mtable"
      :config="tableConfig"
      @getData="getList"
      :batchList="tableConfig.batchList"
      @checkData="checkData"
    />
    <modalUser ref="modalUser" :roleId="roleId" @success="getList(true)" />
  </div>
</template>

<script>
import auth from "@/api/auth";
import modalUser from "./modalUser";
export default {
  components: {
    modalUser,
  },
  props: {
    roleId: {
      type: String,
    },
  },
  data() {
    return {
      tableConfig: {
        columns: [
          {
            title: "姓名",
            key: "name",
            minWidth: 100,
            render: (h, { row }) => {
              return h("div", row.user && row.user.name);
            },
          },
          {
            title: "工号",
            key: "",
            minWidth: 100,
            render: (h, { row }) => {
              return h("div", row.user && row.user.username);
            },
          },
          {
            title: "手机号",
            key: "",
            minWidth: 100,
            render: (h, { row }) => {
              return h("div", row.user && row.user.phone);
            },
          },
          {
            title: "邮箱",
            key: "",
            minWidth: 100,
            render: (h, { row }) => {
              return h("div", row.user && row.user.email);
            },
          },
        ],
        batchList: [
          {
            color: "error",
            type: "size",
            label: "批量删除",
          },
        ],
      },
    };
  },
  watch: {
    roleId() {
      this.getList(true);
    },
  },
  methods: {
    //获取列表
    getList(clear) {
      this.$refs.mtable.loading = true;
      let param = this.$refs.mtable.pageParam;
      if (clear) {
        param.page = 1;
      }
      param.roleId = this.roleId;
      auth.getRoleUserIndex(param).then((res) => {
        this.$refs.mtable.handleData(res.data);
      });
    },
    //批量删除角色
    deleteBatchRole(checkData) {
      auth
        .deleteRoleUserBatch({
          userIds: checkData.map((item) => item.userId).join(","),
          roleId: this.roleId,
        })
        .then(() => {
          this.$M.success("移除成功!");
          this.getList(true);
          this.$refs.mtable.cancelAll();
        });
    },
    //获取选中的数据
    checkData(checkData) {
      if (this.checkData.length === 0) {
        this.$M.warn("请先勾选移除项!");
        return;
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确认全部移除？</p>",
        onOk: () => {
          this.deleteBatchRole(checkData);
        },
      });
    },
    //弹出用户选择框
    alertUser() {
      this.$refs.modalUser.alertSearchModal();
    },
  },
};
</script>
