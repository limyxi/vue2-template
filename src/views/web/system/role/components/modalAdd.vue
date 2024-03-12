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
            label="角色名"
            class="form-required ivu-form-item-required"
            prop="name"
          >
            <Input
              v-model="addForm.name"
              type="text"
              placeholder="请输入角色名"
            />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="备注">
            <Input
              v-model="addForm.remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 8 }"
              placeholder="请输入备注"
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
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      productConfig: {
        title: "新增角色",
      },
      addForm: {
        id: "",
        name: "",
        remark: "",
      },
      alertType: "",
    };
  },
  methods: {
    //打开弹框
    alertModal(type, id) {
      this.alertType = type;
      if (type === "add") {
        this.productConfig.title = "新增角色";
      } else {
        this.productConfig.title = "编辑角色";
        this.getView(id);
      }
      this.$refs.modal.modal = true;
    },
    //获取详情
    getView(id) {
      auth
        .viewRole({
          id: id,
        })
        .then(({ data }) => {
          assignJsonData(this.addForm, data);
        });
    },
    //保存角色新增数据
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          let param = { ...this.addForm };
          const api = this.alertType === "edit" ? "editRole" : "addRole";
          auth[api](param)
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
