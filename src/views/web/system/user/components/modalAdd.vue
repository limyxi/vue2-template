<template>
  <n-modal
    ref="modal"
    :modalConfig="modalConfig"
    @submit="submitForm"
    @close="closeModal"
  >
    <Form
      :label-width="130"
      class="modal-form"
      :rules="ruleCustom"
      ref="addForm"
      :model="addForm"
      @submit.prevent
    >
      <Row>
        <Col span="22">
          <FormItem
            label="用户名"
            class="form-required ivu-form-item-required"
            prop="username"
          >
            <Input v-model="addForm.username" placeholder="请输入用户名" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="姓名"
            class="form-required ivu-form-item-required"
            prop="name"
          >
            <Input v-model="addForm.name" placeholder="请输入姓名" />
          </FormItem>
        </Col>
        <Col span="22" v-if="!addForm.id">
          <FormItem
            label="密码"
            class="form-required ivu-form-item-required"
            prop="password"
          >
            <Input v-model="addForm.password" placeholder="请输入密码" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="部门"
            class="form-required ivu-form-item-required"
            prop="departmentId"
          >
            <tree-select
              v-model="addForm.departmentId"
              :auto-load-root-options="false"
              placeholder="请选择"
              :multiple="false"
              :normalizer="normalizer"
              :options="departmentTree"
              noChildrenText="没有子节点"
              noOptionsText="没有数据"
            />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="角色"
            class="form-required ivu-form-item-required"
            prop="roleIds"
          >
            <Select
              v-model="addForm.roleIds"
              placeholder="请选择"
              multiple
              filterable
              filter-by-label
            >
              <Option
                :value="item.id"
                :key="item.id"
                v-for="item in roleList"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="岗位"
            class="form-required ivu-form-item-required"
            prop="station"
          >
            <Input
              type="text"
              v-model="addForm.station"
              placeholder="请输入岗位"
            />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="手机">
            <Input
              type="text"
              v-model="addForm.phone"
              placeholder="请输入手机"
            />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="邮箱">
            <Input
              type="text"
              v-model="addForm.email"
              placeholder="请输入邮箱"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </n-modal>
</template>

<script>
import auth from "@/api/auth";
import { assignJsonData } from "@/libs/tools";
export default {
  data() {
    return {
      ruleCustom: {
        username: [{ validator: this.$VF.empty, trigger: "blur" }],
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
        password: [{ validator: this.$VF.empty, trigger: "blur" }],
        departmentId: [{ validator: this.$VF.empty, trigger: "change" }],
        roleIds: [{ validator: this.$VF.empty, trigger: "change" }],
        station: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      modalConfig: {
        title: "新增用户",
      },
      addForm: {
        id: "",
        username: "",
        name: "",
        password: "",
        roleIds: [],
        station: "",
        phone: "",
        email: "",
        departmentId: "",
      },
      roleList: [],
      departmentTree: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        };
      },
      alertType: "",
    };
  },
  mounted() {
    this.getRole();
    this.getDepartmentTree();
  },
  methods: {
    //打开弹框
    alertModal(type, id) {
      this.alertType = type;
      if (type === "add") {
        this.modalConfig.title = "新增用户";
      } else {
        this.modalConfig.title = "编辑用户";
        this.getView(id);
      }
      this.$refs.modal.modal = true;
    },
    //获取部门
    getDepartmentTree() {
      auth.getDepartmentTree().then((res) => {
        this.departmentTree = this.openTree(res.data);
      });
    },
    openTree(tree) {
      return tree.map((item) => {
        if (item.children) {
          item.children = this.openTree(item.children);
        } else {
          item.children = [];
        }
        return item;
      });
    },
    //获取角色
    getRole() {
      auth.getRoleListAuthIgnore().then((res) => {
        this.roleList = res.data;
      });
    },
    //获取详情
    getView(id) {
      auth.userView({ id: id }).then(({ data }) => {
        assignJsonData(this.addForm, data);
        this.addForm.roleIds = data.roleUsers.map((i) => i.roleId);
      });
    },
    //新增用户
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          let param = { ...this.addForm };
          param.roleIds = param.roleIds.join(",");
          const api = this.alertType === "add" ? "userAdd" : "userEdit";
          auth[api](param)
            .then(() => {
              this.closeModal();
              this.$M.success(
                this.alertType === "add" ? "新增成功" : "编辑成功"
              );
              this.$emit("success");
            })
            .catch(() => {
              this.$refs.modal.changeLoad();
            });
        } else {
          this.$refs.modal.changeLoad();
        }
      });
    },
    //关闭弹框
    closeModal() {
      this.$resetData(this);
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
      this.$refs.modal.modal = false;
    },
  },
};
</script>
