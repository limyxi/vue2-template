<template>
  <div>
    <Card size="small">
      <p slot="title">功能操作列表</p>
      <div>
        <div class="btn-groups right">
          <Button type="primary" @click="$router.push('/admin/function/sync')"
            >功能操作同步</Button
          >
        </div>
        <m-table ref="mtable" :config="tableConfig" @getData="getList" />
      </div>
    </Card>
  </div>
</template>

<script>
import admin from "@/api/admin";
export default {
  data() {
    return {
      tableConfig: {
        columns: [
          {
            title: "模块",
            key: "module",
            minWidth: 100,
          },
          {
            title: "子模块",
            key: "submodule",
            minWidth: 100,
          },
          {
            title: "功能名称",
            key: "name",
            minWidth: 100,
          },
          {
            title: "功能编码",
            key: "code",
            minWidth: 100,
          },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(clear) {
      this.$refs.mtable.loading = true;
      let param = this.$refs.mtable.pageParam;
      if (clear) {
        param.page = 1;
      }
      param.factoryId = sessionStorage.factoryId;
      admin.getActionList(param).then(({ data }) => {
        this.$refs.mtable.handleData(data);
      });
    },
  },
};
</script>
