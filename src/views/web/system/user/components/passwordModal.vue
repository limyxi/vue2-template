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
            label="旧密码"
            class="form-required ivu-form-item-required"
            prop="password"
          >
            <Input v-model="addForm.password" placeholder="请输入旧密码" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="新密码"
            class="form-required ivu-form-item-required"
            prop="newPassword"
          >
            <Input v-model="addForm.newPassword" placeholder="请输入新密码" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </n-modal>
</template>

<script>
import auth from "@/api/auth";
export default {
  data() {
    return {
      ruleCustom: {
        newPassword: [{ validator: this.$VF.empty, trigger: "blur" }],
        password: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      modalConfig: {
        title: "修改密码",
      },
      addForm: {
        userId: "",
        newPassword: "",
        password: "",
      },
    };
  },
  methods: {
    //初始化数据
    init(id) {
      this.addForm.userId = id;
      this.$refs.modal.modal = true;
    },
    //密码修改提交
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          auth
            .userChangePassword(this.addForm)
            .then(() => {
              this.closeModal();
              this.$M.success("修改成功");
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
