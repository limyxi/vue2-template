<template>
  <div>
    <Card size="small" class="card-r-note">
      <p slot="title">日志管理</p>
      <div>
        <Tabs
          type="card"
          class="search-part"
          size="small"
          :value="activeTab"
          @on-click="changeTab"
        >
          <TabPane label="Info" name="info" />
          <TabPane label="Warning" name="warning" />
          <TabPane label="Error" name="error" />
          <TabPane label="Access" name="access" />
        </Tabs>
        <m-table ref="mtable" :config="tableConfig" @getData="getList" />
      </div>
    </Card>
  </div>
</template>

<script>
import admin from "@/api/admin";
import { baseUrl } from "@/config";
export default {
  data() {
    return {
      baseUrl,
      activeTab: "",
      category: "",
      tableConfig: {
        columns: [
          {
            title: "文件名称",
            key: "fileName",
            minWidth: 150,
          },
          {
            title: "操作",
            key: "action",
            fixed: "right",
            width: 90,
            render: (h, { row }) => {
              return h(
                "div",
                {
                  class: "table-btns",
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        ghost: true,
                        size: "small",
                      },
                    },
                    [
                      h(
                        "a",
                        {
                          attrs: {
                            href:
                              baseUrl.dev +
                              "/admin/log/downLoad?category=" +
                              this.category +
                              "&type=" +
                              this.activeTab +
                              "&fileName=" +
                              row.fileName +
                              "&token=" +
                              sessionStorage.token,
                            download: row.fileName,
                          },
                        },
                        "下载"
                      ),
                    ]
                  ),
                ]
              );
            },
          },
        ],
      },
    };
  },
  created() {
    this.activeTab = "info";
    this.category = "app";
  },
  mounted() {
    this.getList(true);
  },
  methods: {
    //获取日志列表
    getList(clear) {
      this.$refs.mtable.loading = true;
      let param = this.$refs.mtable.pageParam;
      if (clear) {
        param.page = 1;
      }
      param.type = this.activeTab;
      param.category = this.category;
      admin.getLog(param).then(({ data }) => {
        data.list = data.list.map((item) => {
          return {
            fileName: item,
          };
        });
        this.$refs.mtable.handleData(data);
      });
    },
    //切换tab类型
    changeTab(name) {
      this.activeTab = name;
      if (name === "") {
        this.category = "apache";
      } else {
        this.category = "app";
      }
      this.getList(true);
    },
  },
};
</script>
