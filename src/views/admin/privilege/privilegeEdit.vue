<template>
  <div>
    <Card size="small">
      <p slot="title">修改权限</p>
      <div>
        <div class="search-part">
          <Form
            ref="editForm"
            :label-width="80"
            :rules="ruleCustom"
            :model="editForm"
            @submit.prevent
          >
            <Row>
              <Col span="6">
                <FormItem label="权限名称">
                  <Input v-model="editForm.name" placeholder="请输入权限名称" />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="权限分类">
                  <Select v-model="editForm.category">
                    <Option
                      :value="item.value"
                      :label="item.name"
                      :key="item.value"
                      v-for="item in moduleList"
                    >
                      {{ item.name }}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <Tabs type="card" size="small" :value="activeTab" @on-click="changeTab">
          <TabPane
            :label="item.name"
            :name="item.name"
            v-for="item in treeList"
            :key="item.name"
          />
        </Tabs>
        <div>
          <CheckboxGroup v-model="editForm.checkGroup">
            <template v-for="(item, index) in activeTreeList">
              <div v-for="(it, dex) in item.submodule" :key="dex">
                <sub-tit>
                  <span slot="title">{{ it.name }}</span>
                  <span slot="right">
                    <i-switch
                      :ref="'sw' + index + '.' + dex"
                      @on-change="checkAll($event, it.action)"
                    />
                  </span>
                </sub-tit>
                <Row>
                  <Col span="6" v-for="leaf in it.action" :key="leaf.id">
                    <Checkbox :label="leaf.id"
                      ><span class="n-ml">{{ leaf.name }}</span></Checkbox
                    >
                  </Col>
                </Row>
              </div>
            </template>
          </CheckboxGroup>
          <div class="btn-groups right n-mt">
            <Button type="primary" size="small" @click="submit">保存</Button>
            <Button
              size="small"
              @click="$router.push('/production/lineConnectRule/index')"
              >取消</Button
            >
          </div>
        </div>
      </div>
    </Card>
    <Spin size="large" fix v-if="loading" />
  </div>
</template>

<script>
import admin from "@/api/admin";
export default {
  data() {
    return {
      ruleCustom: {
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
        category: [{ validator: this.$VF.empty, trigger: "change" }],
      },
      editForm: {
        name: "",
        category: "",
        checkGroup: [],
      },
      treeList: [],
      activeTab: "",
      loading: false,
    };
  },
  created() {
    this.moduleList = this.$getDic()["module"].list;
  },
  mounted() {
    this.getActionList();
  },
  computed: {
    activeTreeList() {
      const target = this.treeList.find((item) => item.name == this.activeTab);
      return (target && [target]) || [];
    },
  },
  methods: {
    //获取功能树
    getActionList() {
      this.loading = true;
      admin
        .getActionTree()
        .then(({ data }) => {
          this.loading = false;
          this.treeList = data;
          this.activeTab = this.treeList[0].name;
          this.getView();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //获取功能权限
    getView() {
      admin
        .viewPrivilege({
          id: this.$route.query.id,
        })
        .then(({ data }) => {
          this.loading = false;
          this.editForm.name = data.name;
          this.editForm.category = data.category;
          this.editForm.checkGroup = data.actionPrivileges.map(
            (item) => item.actionId
          );
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //提交保存
    submit() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          let params = { ...this.editForm };
          params.actionIds = params.checkGroup.join(",");
          params.id = this.$route.query.id;
          admin
            .editPrivilege(params)
            .then(() => {
              this.loading = false;
              this.$M.success("修改成功！");
              this.$router.push("/admin/privilege/list");
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    checkAll(data, array) {
      if (data) {
        array.forEach((item) => {
          if (!this.editForm.checkGroup.includes(item.id)) {
            this.editForm.checkGroup.push(item.id);
          }
        });
      } else {
        array.map((item) => {
          const findIndex = this.editForm.checkGroup.findIndex(
            (it) => it === item.id
          );
          if (findIndex > -1) {
            this.editForm.checkGroup.splice(findIndex, 1);
          }
        });
      }
    },
    changeTab(name) {
      this.activeTab = name;
    },
  },
};
</script>
