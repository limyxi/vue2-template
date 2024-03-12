<template>
  <n-modal
    ref="modal"
    :modalConfig="productConfig"
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
            label="权限名称"
            class="form-required ivu-form-item-required"
            prop="name"
          >
            <Input v-model="addForm.name" placeholder="请输入权限名称" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="分类"
            class="form-required ivu-form-item-required"
            prop="category"
          >
            <Select v-model="addForm.category" placeholder="请选择">
              <Option
                :value="item.value"
                :key="item.value"
                v-for="item in moduleList"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </n-modal>
</template>

<script>
import admin from "@/api/admin";
export default {
  data() {
    return {
      ruleCustom: {
        category: [{ validator: this.$VF.empty, trigger: "change" }],
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      productConfig: {
        title: "新增权限",
      },
      addForm: {
        id: "",
        name: "",
        sort: "",
        remark: "",
      },
      lineListArray: [],
      alertType: "",
    };
  },
  created() {
    this.moduleList = this.$getDic()["module"].list;
  },
  methods: {
    alertModal(type) {
      this.alertType = type;
      if (type === "add") {
        this.productConfig.title = "新增权限";
      }
      this.$refs.modal.modal = true;
    },
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          const api =
            this.alertType === "edit" ? "editPrivilege" : "addPrivilege";
          admin[api](this.addForm)
            .then(() => {
              this.closeModal();
              this.$M.success(
                this.alertType === "edit" ? "编辑成功" : "新增成功"
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
    closeModal() {
      this.$refs["addForm"].resetFields();
      this.$reset(this.addForm);
      this.$refs.modal.modal = false;
    },
  },
};
</script>
