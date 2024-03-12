<template>
  <!-- 文件上传组件封装 -->
  <div>
    <Modal v-model="importModal" :title="config.title + '导入'" :width="800">
      <Form :label-width="120">
        <Row>
          <Col span="22">
            <FormItem label="选择文件：">
              <Upload
                ref="upload"
                :before-upload="handlePeopleUpload"
                action=""
              >
                <Button
                  icon="ios-cloud-upload-outline"
                  type="primary"
                  >请选择上传文件</Button
                >
              </Upload>
              <div v-if="file !== null">
                上传文件名: {{ file.name }}
                <Button
                  type="primary"
                  class="n-ml"
                  @click="uploadPeople(false)"
                  :loading="loadingStatus"
                >
                  {{ loadingStatus ? "上传中" : "确认上传" }}
                </Button>
                <Button class="n-ml" @click="cancleUpload">取消</Button>
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22">
            <FormItem label>
              <div>
                点击下载
                <a :href="baseUrl.dev + config.fileUrl"
                  >{{ config.title }}导入模板</a
                >
              </div>
              <div>
                {{ config.title }}导入模板。
                <span class="fred">(仅支持{{ format.join(",") }}格式)</span>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>

    <Modal v-model="importResultModal" title="导入任务" :width="800">
      <div>
        <div class="n-mb">
          文件上传成功。共<span>{{ count }}</span
          >条任务，其中更新<span class="fgreen bold">{{ exitCount }}</span
          >条， <span class="fgreen bold">{{ successCount }}</span
          >条可成功导入。
        </div>
        <div class="n-mb">
          发现以下<span class="fred bold">{{ errorCount }}</span
          >条不符合要求的任务，将不会导入
        </div>
        <Table
          size="small"
          border
          :columns="importColumn"
          :data="errorMessages"
        />
      </div>

      <div slot="footer">
        <Button type="primary" class="n-ml" @click="uploadAgain"
          >重新上传</Button
        >
        <Button
          v-show="successCount > 0 || exitCount > 0"
          type="primary"
          :loading="loadingResult"
          @click="uploadPeople(true)"
        >
          确定导入
        </Button>
        <Button
          disabled
          class="n-ml"
          v-show="successCount === 0 && exitCount === 0"
          >确定导入</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "@/config";
export default {
  name: "FileImport",

  props: {
    config: {
      type: Object,
      default() {
        return {
          //标题
          title: "",
          //模板下载fileUrl
          fileUrl: "",
          //文件上传url
          uploadUrl: "",
          //文件上传额外参数
          fileParam: {},
          baseUrl,
        };
      },
    },
    //允许文件格式
    format: {
      type: Array,
      default() {
        return ["xlsx", "xls"];
      },
    },
  },

  data() {
    return {
      file: null,
      loadingResult: false,
      loadingStatus: false,
      importModal: false,
      importResultModal: false,
      successCount: 0,
      exitCount: 0,
      errorCount: 0,
      count: 0,
      importColumn: [
        {
          title: "行号",
          key: "rowNumber",
          minWidth: 100,
        },
        {
          title: "列标题",
          key: "columnTitle",
          minWidth: 100,
        },
        {
          title: "单元格内容",
          key: "cellContent",
          minWidth: 100,
        },
        {
          title: "错误原因",
          key: "errorReason",
          minWidth: 100,
        },
      ],
      errorMessages: [],
    };
  },

  methods: {
    alertUpload() {
      this.file = null;
      this.loadingStatus = false;
      this.importModal = true;
    },
    uploadPeople(param) {
      if (param) {
        this.loadingResult = true;
      }

      this.loadingStatus = true;
      const data = new FormData();
      data.append("file", this.file);
      data.append("factoryId", this.factoryId);
      data.append("token", sessionStorage.token);
      data.append(
        "isForce",
        param ? this.yesNoName["yes"].value : this.yesNoName["no"].value
      );
      this.config.fileParam &&
        Object.entries(this.config.fileParam).forEach(([k, v]) =>
          data.append(k, v)
        );

      axios
        .post(baseUrl.dev + this.config.uploadUrl, data)
        .then((res) => {
          if (res.data.code !== 200) {
            this.$Message.error({
              content: res.data.message,
              duration: 0,
              closable: true,
            });
            return (this.loadingResult = false);
          }

          let data = res.data.data;
          if (data.errorCount === 0) {
            this.$Modal.warning({
              title: "提示",
              content:
                "<div><div>总共" +
                data.count +
                "行，成功插入" +
                data.successCount +
                "条</div>" +
                "<div>成功更新：" +
                data.exitCount +
                "</div>" +
                "<div>错误条数：" +
                data.errorCount +
                "</div></div>",
            });
            this.importModal = false;
            this.$emit("success");
            return;
          }
          //非强制
          if (!param) {
            this.exitCount = data.exitCount;
            this.successCount = data.successCount;
            this.errorCount = data.errorCount;
            this.count = data.count;
            this.errorMessages = data.errorMessages;
            this.importResultModal = true;
          }
          //强制
          else if (param) {
            this.$Modal.warning({
              title: "提示",
              content:
                "<div><div>总共" +
                res.data.data.count +
                "行，成功插入" +
                res.data.data.successCount +
                "条</div>" +
                "<div>成功更新：" +
                res.data.data.exitCount +
                "</div>" +
                "<div>错误条数：" +
                res.data.data.errorCount +
                "</div></div>",
            });
            this.loadingResult = false;
            this.importResultModal = false;
            this.importModal = false;
            this.$emit("success");
          }
        })
        .catch(() =>
          this.$Message.error({
            content: "导入失败！",
            duration: 0,
            closable: true,
          })
        )
        .finally(() => (this.loadingStatus = false));
    },
    handlePeopleUpload(file) {
      let arr = file.name.split(".");
      let suffix = arr[arr.length - 1];
      if (this.format.includes(suffix)) {
        this.file = file;
        return false;
      } else {
        this.file = null;
        this.$M.warn("仅支持" + this.format.join(",") + "格式！");
        return false;
      }
    },
    uploadAgain() {
      this.cancleUpload();
      this.importResultModal = false;
      this.$refs.upload.handleClick();
    },
    cancleUpload() {
      this.file = null;
      this.loadingStatus = false;
    },
  },

  created() {
    this.factoryId = sessionStorage.getItem("factoryId");
    this.yesNoName = this.$getDic()["yes.no"].valueName;
  },
};
</script>
