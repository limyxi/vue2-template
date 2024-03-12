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
            label="部门名称"
            class="form-required ivu-form-item-required"
            prop="name"
          >
            <Input v-model="addForm.name" placeholder="请输入部门名称" />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="上级部门" prop="parentId">
            <tree-select
              v-model="addForm.parentId"
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
          <FormItem label="部门主管">
            <search-input
              ref="searchInput"
              v-model="addForm.supervisorId"
              placeholder="请选择"
              :config="this.supervisorConfig"
            />
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="备注">
            <Input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 8 }"
              v-model="addForm.remark"
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
  props: {
    departmentTree: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      ruleCustom: {
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      alertType: "",
      modalConfig: {
        title: "新增部门",
      },
      addForm: {
        id: "",
        supervisorId: "",
        parentId: "",
        name: "",
        remark: "",
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        };
      },
      supervisorConfig: {
        url: "/auth/user/indexAuthIgnore",
        searchKey: "nameOrSeries",
        label: "name",
        key: "id",
        placeholder: "请选择部门主管",
      },
    };
  },
  methods: {
    //打开弹框
    alertModal(type, id) {
      this.alertType = type;
      if (type === "add") {
        this.modalConfig.title = "新增部门";
      } else {
        this.modalConfig.title = "编辑部门";
        this.getView(id);
      }
      this.$refs.modal.modal = true;
    },
    //获取详情
    getView(id) {
      auth.viewDepartment({ id: id }).then(({ data }) => {
        assignJsonData(this.addForm, data);
        this.$refs.searchInput.init(data.supervisor);
      });
    },
    //新增用户
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          const param = { ...this.addForm };
          console.log(param);
          const api =
            this.alertType === "add" ? "addDepartment" : "editDepartment";
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
        this.$refs.addForm.resetFields();
        this.$refs.searchInput.clear();
      });
      this.$refs.modal.modal = false;
    },
  },
};
</script>
