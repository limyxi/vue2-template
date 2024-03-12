<template>
  <div>
    <Card size="small">
      <p slot="title">系统字典</p>
      <div>
        <div class="search-part">
          <Form ref="formSearch" :label-width="80">
            <Row>
              <Col span="6">
                <FormItem label="分类名称">
                  <Input
                    v-model="formItem.name"
                    placeholder="请输入分类名称"
                    @on-keyup.13="getList(true)"
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="分类编码">
                  <Input
                    v-model="formItem.code"
                    placeholder="请输入分类编码"
                    @on-keyup.13="getList(true)"
                  />
                </FormItem>
              </Col>
              <Col span="6" class="btn-group">
                <Button type="primary" @click="getList(true)">搜索</Button>
                <Button @click="resetForm">重置</Button>
              </Col>
              <Col span="6" class="btn-group right">
                <Button type="primary" @click="alertType('add')"
                  >新增分类</Button
                >
              </Col>
            </Row>
          </Form>
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

    <dictionaryCategoryAdd
      ref="dictionaryCategoryAdd"
      @success="getList(true)"
    />
    <dictionaryAdd ref="dictionaryAdd" @success="getList(true)" />
  </div>
</template>

<script>
import admin from "@/api/admin";
import dictionaryCategoryAdd from "./components/dictionaryCategoryAdd";
import dictionaryAdd from "./components/dictionaryAdd";
export default {
  components: {
    dictionaryCategoryAdd,
    dictionaryAdd,
  },
  data() {
    return {
      formItem: {
        name: "",
        code: "",
      },
      columns: [
        {
          title: "分类名称",
          key: "name",
          minWidth: 150,
        },
        {
          title: "分类编码",
          key: "code",
          minWidth: 220,
        },
        {
          title: "数据字典",
          key: "",
          minWidth: 600,
          render: (h, { row }) => {
            let project = "";
            row.dictionaries.forEach((item) => {
              project =
                project +
                "<span>" +
                item.name +
                "(" +
                item.value +
                ")-" +
                item.code +
                "-" +
                (item.status == this.yesNoName["yes"].value ? "启用" : "停用") +
                "</span><br/>";
            });
            return h("div", {
              domProps: {
                innerHTML: project,
              },
            });
          },
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 90,
          render: (h, { row }) => {
            let btns = [];
            btns.push(
              this.$tbUtil.btnRender(h, {
                text: "编辑",
                type: "success",
                clickFun: () => {
                  let dictionaryList = row.dictionaries.map((item) => {
                    item.switch =
                      item.status === this.yesNoName["yes"].value
                        ? true
                        : false;
                    return item;
                  });
                  this.$refs.dictionaryAdd.alertModal(
                    row.id,
                    dictionaryList || []
                  );
                },
              })
            );
            return h("div", { class: "table-btns" }, btns);
          },
        },
      ],
      data: [],
      loading: false,
    };
  },
  created() {
    this.yesNoName = this.$getDic()["yes.no"].valueName;
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取数据字典分类
    getList() {
      this.loading = true;
      admin
        .getDictionaryCategory(this.formItem)
        .then(({ data }) => {
          this.loading = false;
          this.data = data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    alertType(type) {
      this.$refs.dictionaryCategoryAdd.alertModal(type);
    },
    resetForm() {
      this.$reset(this.formItem);
      this.getList(true);
    },
  },
};
</script>
