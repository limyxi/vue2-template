<template>
  <div>
    <Card size="small">
      <p slot="title">部门列表</p>
      <div>
        <div class="search-part">
          <Form ref="formSearch" :label-width="80">
            <Row>
              <Col span="6">
                <FormItem label="部门名称">
                  <Input
                    v-model="formItem.name"
                    placeholder="请输入部门名称"
                    @on-keyup.13="getDepartmentTree"
                  />
                </FormItem>
              </Col>
              <Col span="12" class="btn-group">
                <Button type="primary" @click="getDepartmentTree">搜索</Button>
                <Button @click="resetForm">重置</Button>
              </Col>
              <Col span="6" class="btn-group right">
                <Button type="primary" @click="alertType('add')"
                  >添加部门</Button
                >
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          size="small"
          row-key="id"
          :columns="tableConfig.columns"
          :data="departmentTree"
          border
        ></Table>
      </div>
    </Card>
    <modalAdd
      ref="modalAdd"
      :departmentTree="departmentTree"
      @success="getDepartmentTree"
    />
  </div>
</template>
<script>
import auth from "@/api/auth";
import modalAdd from "./components/modalAdd";
export default {
  components: {
    modalAdd,
  },
  data() {
    return {
      formItem: {
        name: "",
      },
      tableConfig: {
        columns: [
          {
            title: "部门名称",
            key: "name",
            tree: true,
            minWidth: 100,
          },
          {
            title: "部门主管",
            minWidth: 100,
            render: (h, { row }) => {
              return h("div", row.supervisor && row.supervisor.name);
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 150,
          },
          {
            title: "操作",
            key: "action",
            fixed: "right",
            width: 130,
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
                this.$tbUtil.btnPopRender(h, {
                  text: "删除",
                  type: "error",
                  clickFun: () => {
                    this.trashDepartment(row.id);
                  },
                })
              );
              return h("div", { class: "table-btns" }, btns);
            },
          },
        ],
      },
      departmentTree: [],
    };
  },
  mounted() {
    this.getDepartmentTree();
  },
  methods: {
    //获取部门树
    getDepartmentTree() {
      auth.getDepartmentTree({ ...this.formItem }).then(({ data }) => {
        this.departmentTree = this.openTree(data);
      });
    },
    openTree(tree) {
      return tree.map((item) => {
        if (item.children) {
          item.children = this.openTree(item.children);
        } else {
          item.children = [];
        }
        item._showChildren = true;
        return item;
      });
    },
    //删除部门
    trashDepartment(id) {
      auth
        .trashDepartment({
          id: id,
        })
        .then(() => {
          this.$M.success("删除成功");
          this.getDepartmentTree();
        });
    },
    //弹出新增框
    alertType(type) {
      this.$refs.modalAdd.alertModal(type, this.getDepartmentTree);
    },
    //重置表单
    resetForm() {
      this.formItem = this.$resetData(this).formItem;
      this.getDepartmentTree();
    },
  },
};
</script>
