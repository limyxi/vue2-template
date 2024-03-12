<template>
  <div>
    <Card size="small">
      <p slot="title">功能操作同步</p>
      <div>
        <sub-tit>
          <span slot="title">新增功能</span>
        </sub-tit>
        <Table
          size="small"
          border
          :columns="columns"
          :data="data"
          :loading="loading"
          max-height="800"
        />
        <sub-tit>
          <span slot="title">遗弃功能</span>
        </sub-tit>
        <Table
          size="small"
          border
          :columns="columns"
          :data="data1"
          :loading="loading"
          max-height="800"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import admin from "@/api/admin";
export default {
  data() {
    return {
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
      data: [],
      data1: [],
      loading: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //同步功能
    getList() {
      this.loading = true;
      admin
        .syncAction()
        .then(({ data }) => {
          this.loading = false;
          this.data = data.addActions;
          this.data1 = data.deprecatedActions;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
