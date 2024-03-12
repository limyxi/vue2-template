<template>
  <div>
    <Card size="small">
      <p slot="title">权限列表</p>
      <div>
        <div class="btn-groups right">
          <Button type="primary" @click="alertType('add')">新增权限</Button>
        </div>
        <Table
          size="small"
          border
          :columns="columns"
          :data="data"
          :loading="loading"
          max-height="800"
        />
      </div>
    </Card>
    <privilegeAdd ref="privilegeAdd" @success="getList(true)" />
  </div>
</template>

<script>
import admin from "@/api/admin";
import privilegeAdd from "./components/privilegeAdd";
export default {
  components: {
    privilegeAdd,
  },
  data() {
    return {
      columns: [
        {
          title: "权限分类",
          key: "category",
          minWidth: 100,
          render: (h, { row }) => {
            return h("div", this.findData(row.category));
          },
        },
        {
          title: "权限名称",
          key: "name",
          minWidth: 100,
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
                text: "修改",
                type: "primary",
                clickFun: () => {
                  this.$router.push("/admin/privilege/edit?id=" + row.id);
                },
              })
            );
            btns.push(
              this.$tbUtil.btnPopRender(h, {
                text: "删除",
                type: "error",
                clickFun: () => {
                  this.trashPrivilege(row.id);
                },
              })
            );
            return h("div", { class: "table-btns" }, btns);
          },
        },
      ],
      data: [],
      loading: false,
      moduleList: [],
    };
  },
  created() {
    this.moduleList = this.$getDic()["module"].list;
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取权限列表
    getList() {
      this.loading = true;
      admin
        .getPrivilegeList()
        .then(({ data }) => {
          this.loading = false;
          this.data = data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //获取权限分类名称
    findData(val) {
      const code = this.moduleList.find((el) => el.value === val);
      if (code) return code.name;
      else val;
    },
    //删除权限
    trashPrivilege(id) {
      admin
        .trashPrivilege({
          id: id,
        })
        .then(() => {
          this.$M.success("删除成功");
          this.getList();
        });
    },
    alertType() {
      this.$refs.privilegeAdd.alertModal("add");
    },
  },
};
</script>
