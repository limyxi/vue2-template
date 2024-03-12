<template>
  <n-modal
    ref="modal"
    :modalConfig="apiAddressConfig"
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
            label="分类名称"
            class="form-required ivu-form-item-required"
            prop="name"
          >
            <Input v-model="addForm.name" placeholder="请输入分类名称" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem
            label="分类编码"
            class="form-required ivu-form-item-required"
            prop="code"
          >
            <Input v-model="addForm.code" placeholder="请输入分类编码" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="备注">
            <Input
              v-model="addForm.remark"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 8 }"
              placeholder="请输入备注"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </n-modal>
</template>

<script>
import admin from "@/api/admin";
export default {
  components: {},
  data() {
    return {
      ruleCustom: {
        code: [{ validator: this.$VF.empty, trigger: "blur" }],
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      apiAddressConfig: {
        title: "新增分类",
      },
      addForm: {
        code: "",
        name: "",
        remark: "",
      },
    };
  },
  methods: {
    alertModal() {
      this.apiAddressConfig.title = "新增分类";
      this.$refs.modal.modal = true;
    },
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          admin
            .addDictionaryCategory(this.addForm)
            .then(() => {
              this.closeModal();
              this.$M.success("新增成功");
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
