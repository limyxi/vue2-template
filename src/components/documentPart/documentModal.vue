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
            label="文件名称"
            class="form-required ivu-form-item-required"
            prop="fileId"
          >
            <Upload
              ref="upload"
              :max-size="10240"
              :on-exceeded-size="handleMaxSize"
              :on-success="handleSuccess"
              :before-upload="handleBeforeUpload"
              :on-remove="removeFile"
              :action="
                baseUrl.dev +
                '/tool/toolFolder/file/upload?related=' +
                related +
                '&category=' +
                category +
                '&token=' +
                token
              "
            >
              <Button icon="ios-cloud-upload-outline">上传文件</Button>
              <span>文件大小不能超过 10M!</span>
            </Upload>
          </FormItem>
        </Col>
        <!-- <Col span="22">
            <FormItem label="文件名称"  class="form-required ivu-form-item-required" prop="name">
              <Input size="small" v-model="folderItem.name" type="text" placeholder="请输入文件名称">
              </Input>
            </FormItem>
          </Col> -->
        <Col span="22">
          <FormItem
            label="文件分类"
            class="form-required ivu-form-item-required"
            prop="type"
          >
            <Select
              v-model="folderItem.type"
              placeholder="请选择文件分类"
              filterable
            >
              <Option
                v-for="item in fileTypeList"
                :value="item.value"
                :key="item.value"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <!-- <Col span="22">
            <FormItem label="所属文件夹">
              <Select size="small" v-model="folderItem.parentId" filterable>
                <Option :value="item.id" :key="item.id" :label="item.name" v-for="item in folderList">
                  <span  :style="{ marginLeft:(basicSpace*item.level)+'px'}">
                    <Icon type="ios-arrow-down" v-show="item.isContainSubset"/>
                  {{item.name}}</span>
                </Option>
              </Select>
            </FormItem>
          </Col> -->
      </Row>
    </Form>
  </n-modal>
</template>

<script>
import { baseUrl } from "@/config";
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
    fileTypeList: {
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
    category: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      //请求变量
      baseUrl,
      ruleCustom: {
        // name:[
        //   { validator:this.$VF.empty, trigger: 'blur' },
        // ],
        fileId: [{ validator: this.$VF.empty, trigger: "change" }],
        type: [{ validator: this.$VF.empty, trigger: "change" }],
        parentId: [{ validator: this.$VF.empty, trigger: "change" }],
      },
      modal: false,
      productConfig: {
        title: "添加文件",
      },
      basicSpace: 15,
      folderItem: {
        name: "",
        parentId: "",
        fileId: "",
        type: "",
        id: "",
      },
      alertType: "",
      token: "",
    };
  },
  created() {
    this.token = sessionStorage.token;
  },
  mounted() {},
  methods: {
    alertModal(type, id) {
      this.alertType = type;
      this.$refs.modal.modal = true;
      if (this.alertType === "add") {
        this.productConfig.title = "添加文件";
        this.folderItem.parentId = this.folderList[0]
          ? this.folderList[0].id
          : "";
      } else {
        this.productConfig.title = "修改文件";
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
          this.folderItem.fileId = res.data.file.id;
          this.folderItem.type = res.data.type;
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
              this.$M.success("添加成功！");
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
    handleMaxSize() {
      this.$M.warn("文件不能大与10M！");
    },
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.folderItem.name = file.name;
        this.folderItem.fileId = res.data;
      } else {
        this.$M.error(res.message);
      }
    },
    handleBeforeUpload() {
      const check = this.$refs.upload.fileList < 2;
      if (!check) {
        this.$M.warn("只能单个上传！");
      }
      return check;
    },
    removeFile() {
      this.folderItem.fileId = "";
    },
    closeModal() {
      this.$refs["folderItem"].resetFields();
      this.$refs.upload.clearFiles();
      this.$refs.modal.modal = false;
    },
  },
};
</script>
