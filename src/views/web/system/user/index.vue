<template>
  <div>
    <Card size="small">
      <p slot="title">用户列表</p>
      <div>
        <div class="search-part">
          <Form ref="formSearch" :label-width="80">
            <Row>
              <Col span="6">
                <FormItem label="姓名或工号">
                  <Input
                    v-model="formItem.nameOrSeries"
                    placeholder="请输入姓名或工号"
                    @on-keyup.13="getList(true)"
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="角色名称">
                  <Input
                    v-model="formItem.roleName"
                    placeholder="请输入角色名称"
                    @on-keyup.13="getList(true)"
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="状态">
                  <Select
                    clearable
                    v-model="formItem.status"
                    @on-change="getList(true)"
                  >
                    <Option
                      v-for="item in statusList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="4" class="btn-group">
                <Button type="primary" @click="getList(true)">搜索</Button>
                <Button @click="resetForm">重置</Button>
              </Col>
              <Col span="2" class="btn-group right">
                <Button type="primary" @click="alertType('add')">新增</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <m-table ref="mtable" :config="tableConfig" @getData="getList" />
      </div>
    </Card>
    <modalAdd ref="modalAdd" @success="getList(true)" />
    <passwordModal ref="passwordModal" @success="getList(true)" />
  </div>
</template>
<script>
import auth from "@/api/auth";
import modalAdd from "./components/modalAdd";
import passwordModal from "./components/passwordModal";
export default {
  components: {
    modalAdd,
    passwordModal,
  },
  data() {
    return {
      formItem: {
        nameOrSeries: "",
        roleName: "",
        status: "",
      },
      tableConfig: {
        columns: [
          {
            title: "用户名",
            key: "username",
            minWidth: 100,
          },
          {
            title: "姓名",
            key: "name",
            minWidth: 100,
          },
          {
            title: "部门",
            key: "",
            minWidth: 100,
            render: (h, { row }) => {
              return h("div", row.department && row.department.name);
            },
          },
          {
            title: "角色",
            key: "",
            minWidth: 150,
            render: (h, { row }) => {
              if (row.roleUsers) {
                const string = row.roleUsers
                  .map((item) => item.role && item.role.name)
                  .join(",");
                return h("div", string);
              }
            },
          },
          {
            title: "岗位",
            key: "station",
            minWidth: 100,
          },
          {
            title: "状态",
            key: "",
            width: 100,
            render: (h, { row }) => {
              return h(
                "Tag",
                {
                  props: {
                    color:
                      row.status === this.statusName["enabled"].value
                        ? "success"
                        : "error",
                  },
                },
                this.statusValue[row.status] &&
                  this.statusValue[row.status].name
              );
            },
          },
          {
            title: "手机",
            key: "phone",
            minWidth: 140,
          },
          {
            title: "邮箱",
            key: "email",
            minWidth: 150,
          },
          {
            title: "操作",
            key: "action",
            fixed: "right",
            width: 250,
            render: (h, { row }) => {
              let btns = [];
              btns.push(
                this.$tbUtil.btnRender(h, {
                  text: "编辑",
                  type: "success",
                  clickFun: () => {
                    this.$refs.modalAdd.alertModal("edit", row.id);
                  },
                })
              );
              btns.push(
                this.$tbUtil.btnRender(h, {
                  text: "修改密码",
                  type: "success",
                  clickFun: () => {
                    this.$refs.passwordModal.init(row.id);
                  },
                })
              );
              btns.push(
                this.$tbUtil.btnPopRender(h, {
                  text: "删除",
                  type: "error",
                  clickFun: () => {
                    this.deleteUser(row.id);
                  },
                })
              );

              if (row.status === this.statusName["disabled"].value) {
                btns.push(
                  this.$tbUtil.btnRender(h, {
                    text: "启用",
                    type: "success",
                    clickFun: () => {
                      this.enableUser(row.id);
                    },
                  })
                );
              } else {
                btns.push(
                  this.$tbUtil.btnRender(h, {
                    text: "停用",
                    type: "error",
                    clickFun: () => {
                      this.disableUser(row.id);
                    },
                  })
                );
              }
              return h("div", { class: "table-btns" }, btns);
            },
          },
        ],
      },
    };
  },
  created() {
    this.statusList = this.$getDic()["disabled.enabled"].list;
    this.statusName = this.$getDic()["disabled.enabled"].valueName;
    this.statusValue = this.$getDic()["disabled.enabled"].valueCode;
  },
  mounted() {
    this.getList(true);
  },
  methods: {
    //获取列表
    getList(clear) {
      this.$refs.mtable.loading = true;
      let param = this.$refs.mtable.pageParam;
      if (clear) {
        param.page = 1;
      }
      param = { ...param, ...this.formItem };
      auth.userIndex(param).then((res) => {
        this.$refs.mtable.handleData(res.data);
      });
    },
    //用户删除
    deleteUser(id) {
      auth
        .userTrash({
          id: id,
        })
        .then(() => {
          this.$M.success("删除成功");
          this.getList();
        });
    },
    //启用用户
    enableUser(id) {
      auth
        .userEnable({
          id: id,
        })
        .then(() => {
          this.$M.success("启用成功");
          this.getList();
        });
    },
    //停用用户
    disableUser(id) {
      auth
        .userDisable({
          id: id,
        })
        .then(() => {
          this.$M.success("停用成功");
          this.getList();
        });
    },
    //弹出新增框
    alertType(type) {
      this.$refs.modalAdd.alertModal(type);
    },
    //重置表单
    resetForm() {
      this.formItem = this.$resetData(this).formItem;
      this.getList(true);
    },
  },
};
</script>
