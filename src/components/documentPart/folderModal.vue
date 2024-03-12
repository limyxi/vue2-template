<template>
  <n-modal
    ref="modal"
    :modalConfig="productConfig"
    @submit="submitForm"
    @close="closeModal"
  >
    <Form
      :label-width="130"
      class="modal-form"
      :rules="ruleCustom"
      ref="folderItem"
      :model="folderItem"
      @submit.prevent
    >
      <Row>
        <Col span="22">
          <FormItem
            label="文件夹名称"
            class="form-required ivu-form-item-required"
            prop="name"
          >
            <Input
              v-model="folderItem.name"
              type="text"
              placeholder="请输入文件夹名称"
            >
            </Input>
          </FormItem>
        </Col>
        <Col span="22">
          <FormItem label="父级节点">
            <Select v-model="folderItem.parentId" filterable>
              <Option
                :value="item.id"
                :key="item.id"
                :label="item.name"
                v-for="item in folderList"
              >
                <span :style="{ marginLeft: basicSpace * item.level + 'px' }">
                  <Icon type="ios-arrow-down" v-show="item.isContainSubset" />
                  {{ item.name }}</span
                >
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </n-modal>
</template>

<script>
import tool from "@/api/tool";
export default {
  components: {},
  props: {
    folderList: {
      type: Array,
      default() {
        return [];
      },
    },
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
  },
  data() {
    return {
      ruleCustom: {
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      modal: false,
      productConfig: {
        title: "添加文件夹",
      },
      basicSpace: 15,
      folderItem: {
        name: "",
        parentId: "",
        id: "",
      },
      alertType: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    alertModal(type, id) {
      this.alertType = type;
      this.$refs.modal.modal = true;
      if (this.alertType === "add") {
        this.productConfig.title = "添加文件夹";
        this.folderItem.parentId = this.folderList[0]
          ? this.folderList[0].id
          : "";
      } else {
        this.productConfig.title = "编辑文件夹";
        this.getView(id);
      }
    },
    getView(id) {
      tool
        .toolFoldeView({
          id: id,
        })
        .then((res) => {
          this.folderItem.id = id;
          this.folderItem.name = res.data.name;
          this.folderItem.parentId = res.data.parentId;
        })
        .catch((err) => {
          this.$M.error(err.message);
        });
    },
    submitForm() {
      this.$refs["folderItem"].validate((valid) => {
        if (valid) {
          let param = { ...this.folderItem };
          param.related = this.related;
          param.relatedId = this.relatedId;
          param.factoryId = sessionStorage.factoryId;
          let api;
          if (this.alertType === "edit") {
            api = "toolFolderEdit";
          } else {
            api = "toolFolderAdd";
          }
          tool[api](param)
            .then(() => {
              this.closeModal();
              this.$emit("success");
            })
            .catch((err) => {
              this.$refs.modal.changeLoad();
              this.$M.error(err.message);
            });
        } else {
          this.$refs.modal.changeLoad();
        }
      });
    },
    closeModal() {
      this.$refs["folderItem"].resetFields();
      this.$refs.modal.modal = false;
    },
  },
};
</script>
