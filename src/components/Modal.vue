<template>
  <!-- 基于iview的表Modal封装 -->
  <Modal
    v-model="modal"
    :title="modalConfig.title"
    @on-ok="submit"
    @on-cancel="close"
    :loading="loading"
    :width="800"
    :ok-text="modalConfig.okText"
    :cancel-text="modalConfig.cancelText"
  >
    <slot></slot>
    <div slot="footer" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </Modal>
</template>
<script>
export default {
  name: "NModal",
  props: {
    showModal: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    modalConfig: {
      type: Object,
      default: () => {
        return {
          okText: "确认",
          cancelText: "取消",
        };
      },
    },
    showFooter: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      loading: true,
      modal: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.modal = this.showModal;
    });
  },
  methods: {
    changeLoad() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    submit() {
      this.$emit("submit");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped></style>
