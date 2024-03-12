<template>
  <!-- 图片上传组件封装 -->
  <div>
    <div
      class="demo-upload-list"
      v-for="(item, index) in uploadList"
      :key="index"
    >
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="demo-upload-list-cover">
          <Icon
            type="ios-eye-outline"
            @click.native="handleView(item.url)"
          ></Icon>
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(index)"
            v-if="type != 'view'"
          ></Icon>
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        ></Progress>
      </template>
    </div>
    <Upload
      v-if="type != 'view'"
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      multiple
      type="drag"
      :action="baseUrl.dev + url"
      style="display: inline-block; width: 58px"
    >
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <div v-else class="fgrey">暂无图片</div>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<script>
import { baseUrl } from "@/config";
export default {
  props: {
    related: {
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
    url: {
      type: String,
      default() {
        return "";
      },
    },
    defaultList: {
      type: Array,
      default() {
        return [];
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
      imgUrl: "",
      visible: false,
      uploadList: [],
      token: "",
      baseUrl,
    };
  },
  created() {
    this.token = sessionStorage.token;
  },
  mounted() {
    if (this.type != "view") {
      this.uploadList = this.$refs.upload.fileList;
    }
  },
  methods: {
    init(fileList) {
      if (this.type != "view") {
        this.$refs.upload.fileList = fileList;
      }
      this.uploadList = fileList;
    },
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleRemove(index) {
      this.$emit("remove", this.$refs.upload.fileList[index]);
      this.$refs.upload.fileList.splice(index, 1);
    },
    handleSuccess(res, file) {
      file.url = baseUrl.dev + res.data.imageUrl + "&token=" + this.token;
      file.id = res.data.fileId;
      this.$emit("success", file);
    },
    handleFormatError(file) {
      this.$M.warn(file.name + "的文件类型不正确，请选择jpg或者png");
    },
    handleMaxSize(file) {
      this.$M.warn(file.name + "文件太大，请不要超过2M");
    },
    getIds() {
      return this.$refs.upload.fileList.map((item) => {
        return item.id;
      });
    },
    clear() {
      this.uploadList = [];
    },
  },
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
