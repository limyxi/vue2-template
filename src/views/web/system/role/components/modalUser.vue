<template>
  <n-modal ref="resourceModal" :modalConfig="modalConfig" @submit="confirmTag">
    <div>
      <div class="search-part">
        <Form ref="formSearch" :label-width="100" @submit.native.prevent>
          <Row>
            <Col span="8">
              <FormItem label="用户姓名或工号">
                <Input
                  v-model="formItem.nameOrSeries"
                  placeholder="请输入用户姓名或工号"
                  @on-keyup.13="searchUserList(true)"
                />
              </FormItem>
            </Col>
            <Col span="6" class="btn-group">
              <Button type="primary" @click="searchUserList(true)">搜索</Button>
              <Button @click="resetForm">重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <choose-table
        ref="chooseTable"
        note="已选用户"
        :config="tableConfig"
        :api="api"
      />
    </div>
  </n-modal>
</template>

<script>
import auth from "@/api/auth";
import { chooseTable } from "@/components/table";
export default {
  components: {
    chooseTable,
  },
  props: {
    roleId: {
      type: String,
    },
  },
  data() {
    return {
      modalConfig: {
        title: "选择用户",
      },
      formItem: {
        nameOrSeries: "",
      },
      tableConfig: {
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center",
          },
          {
            title: "工号",
            key: "username",
            minWidth: 100,
          },
          {
            title: "用户姓名",
            key: "name",
            minWidth: 100,
          },
        ],
      },
      api: auth.userIndexAuthIgnore,
    };
  },
  methods: {
    //打开弹框
    alertSearchModal() {
      this.$refs.chooseTable.choosedLabel = [];
      this.resetForm();
      this.$refs.resourceModal.modal = true;
    },
    //使用子组件里面的搜索用户
    searchUserList(clear) {
      this.$refs.chooseTable.getList(clear, this.formItem);
    },
    //获取选择的用户
    confirmTag() {
      if (this.$refs.chooseTable.choosedLabel.length === 0) {
        this.$M.warn("请至少选择一个人员");
        return;
      }
      let param = {
        userIds: this.$refs.chooseTable.choosedLabel
          .map((item) => item.id)
          .join(","),
        roleId: this.roleId,
      };
      auth.addRoleUser(param).then(() => {
        this.$refs.resourceModal.modal = false;
        this.$emit("success");
      });
    },
    //重置表单
    resetForm() {
      this.$reset(this.formItem);
      this.searchUserList(true);
    },
  },
};
</script>
