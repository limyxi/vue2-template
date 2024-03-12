<template>
  <div>
    <div class="search-part" v-if="type != 'view'">
      <Row>
        <Col span="12" class="btn-group">
          <Button v-if="!isBatch" class="ml0" type="error" @click="assignBatch"
            >批量删除</Button
          >
          <template v-if="isBatch">
            <Button type="primary" class="ml0" @click="confirmBatch"
              >确定</Button
            >
            <Button @click="cancelAll">取消</Button>
          </template>
        </Col>
        <Col span="12" class="btn-group right">
          <Button type="primary" @click="alertFile('add')">添加文档</Button>
          <!-- <Button type="primary" size="small" @click="alertFolder('add')">添加文件夹</Button> -->
        </Col>
      </Row>
    </div>
    <Table
      size="small"
      ref="folderTable"
      @on-selection-change="getCheckData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      border
    ></Table>
    <folderModal
      ref="folderModal"
      :folderList="folderList"
      :fileTypeList="fileTypeList"
      :related="related"
      :relatedId="relatedId"
      @success="init"
    ></folderModal>
    <documentModal
      ref="documentModal"
      :folderList="folderList"
      :fileTypeList="fileTypeList"
      :related="related"
      :relatedId="relatedId"
      :category="category"
      @success="init"
    ></documentModal>
  </div>
</template>

<script>
import { baseUrl } from "@/config";
import tool from "@/api/tool";
import folderModal from "./folderModal";
import documentModal from "./documentModal";

export default {
  components: {
    folderModal,
    documentModal,
  },
  props: {
    related: {
      type: String,
      default() {
        return "";
      },
    },
    relatedId: {
      type: String,
      default() {
        return "";
      },
    },
    category: {
      type: String,
      default() {
        return "";
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      isBatch: false,
      checkData: [],
      columns: [
        {
          title: "文档名称",
          minWidth: 300,
          tree: true,
          render: (h, params) => {
            let renderObj = [];
            if (params.row.type) {
              let fileName = params.row.file ? params.row.file.name : "";
              let fileIndex = fileName.indexOf(".");
              fileName = fileName.substring(fileIndex);
              if ([".jpg", ".png", ".jpeg"].includes(fileName)) {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                        download: "文件名.jpg",
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconfile-img-fill",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              } else if ([".AVI", ".mp4", ".FLV"].includes(fileName)) {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconfile-video",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              } else if ([".pdf"].includes(fileName)) {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconfile-pdf",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              } else if ([".xlsx", ".xls"].includes(fileName)) {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconfile-xls",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              } else if ([".pptx", ".ppt"].includes(fileName)) {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconfile-ppt",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              } else if ([".doc", ".docx"].includes(fileName)) {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconbxs-file-doc",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              } else {
                renderObj.push(
                  h(
                    "a",
                    {
                      attrs: {
                        href:
                          baseUrl.dev +
                          "/" +
                          params.row.file.path +
                          "/" +
                          params.row.file.name,
                      },
                    },
                    [
                      h("Icon", {
                        props: {
                          custom: "iconfont iconfile1",
                        },
                      }),
                      h("span", params.row.name),
                    ]
                  )
                );
              }
            } else {
              renderObj.push(
                h(
                  "a",
                  {
                    attrs: {
                      href:
                        baseUrl.dev +
                        "/" +
                        params.row.file.path +
                        "/" +
                        params.row.file.name,
                    },
                  },
                  [
                    h("Icon", {
                      props: {
                        custom: "iconfont iconfile",
                      },
                    }),
                    h("span", params.row.name),
                  ]
                )
              );
            }
            return h("span", renderObj);
          },
        },
        {
          title: "文档分类",
          minWidth: 90,
          render: (h, params) => {
            return h(
              "div",
              params.row.type ? this.fileTypeCode[params.row.type].name : ""
            );
          },
        },
        {
          title: "创建人",
          minWidth: 100,
          render: (h, params) => {
            return h("div", params.row.user ? params.row.user.name : "");
          },
        },
        {
          title: "创建时间",
          key: "createdAt",
          minWidth: 150,
        },
      ],
      tableData: [],
      folderList: [],
    };
  },
  created() {
    this.fileTypeCode = this.$getDic()["toolFolder.type"].valueCode;
    this.fileTypeList = this.$getDic()["toolFolder.type"].list;
    this.sysFileTypeList = this.$getDic()["sys.file.type"].list;
  },
  mounted() {
    if (this.type != "view") {
      this.columns.push({
        title: "操作",
        key: "action",
        fixed: "right",
        width: 140,
        render: (h, params) => {
          let btns = [];
          btns.push(
            this.$tbUtil.btnRender(h, {
              text: "编辑",
              type: "primary",
              clickFun: () => {
                if (params.row.type) {
                  this.$refs.documentModal.alertModal("edit", params.row.id);
                } else {
                  this.$refs.folderModal.alertModal("edit", params.row.id);
                }
              },
            })
          );
          btns.push(
            this.$tbUtil.btnPopRender(h, {
              text: "删除",
              type: "error",
              clickFun: () => {
                this.delete(params.row.id);
              },
            })
          );
          return h("div", { class: "table-btns" }, btns);
        },
      });
    }
  },
  methods: {
    init() {
      this.getFolderTree();
      this.getFolderlist();
    },
    getFolderTree() {
      tool
        .toolFolderTree({
          related: this.related,
          relatedId: this.relatedId,
          factoryId: sessionStorage.factoryId,
        })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          this.$M.error(err.message);
        });
    },
    openTree(tree) {
      tree.forEach((item) => {
        if (item.children.length) {
          item._showChildren = true;
          this.openTree(item.children);
        }
      });
    },
    getFolderlist() {
      tool
        .toolFolderListTree({
          related: this.related,
          relatedId: this.relatedId,
          factoryId: sessionStorage.factoryId,
        })
        .then((res) => {
          this.folderList = res.data;
        })
        .catch((err) => {
          this.$M.error(err.message);
        });
    },
    delete(ids) {
      tool
        .toolFolderTrash({
          ids: ids,
        })
        .then(() => {
          this.$M.success("删除成功");
          this.init();
        })
        .catch((err) => {
          this.$M.error(err.message);
        });
    },
    alertFolder(type) {
      if (!this.relatedId) {
        this.$M.warn("请先保存上面的基本信息");
        return "";
      }
      this.$refs.folderModal.alertModal(type);
    },
    alertFile(type) {
      if (!this.relatedId) {
        this.$M.warn("请先保存上面的基本信息");
        return "";
      }
      this.$refs.documentModal.alertModal(type);
    },
    assignBatch() {
      if (!this.isBatch) {
        this.isBatch = true;
        this.columns.unshift({
          type: "selection",
          width: 60,
          align: "center",
        });
      }
    },
    confirmBatch() {
      if (this.checkData.length > 0) {
        let ids = this.checkData
          .map((item) => {
            return item.id;
          })
          .join(",");
        this.$Modal.confirm({
          title: "确定删除吗？",
          content: "<p>确定删除" + this.checkData.length + "个文件夹/文档</p>",
          onOk: () => {
            this.delete(ids);
          },
          onCancel: () => {},
        });
      }
      this.cancelAll();
    },
    cancelAll() {
      this.isBatch = false;
      this.$refs.folderTable.selectAll(false);
      this.columns.splice(0, 1);
      this.checkData = [];
    },
    getCheckData(check) {
      this.checkData = check;
    },
  },
};
</script>

<style scoped></style>
