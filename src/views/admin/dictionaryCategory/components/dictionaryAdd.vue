<template>
  <n-modal
    ref="modal"
    :modalConfig="apiAddressConfig"
    @submit="closeModal"
    @close="closeModal"
  >
    <table class="cus-table" cellspacing="0" cellpadding="0">
      <tr class="cus-thead">
        <th></th>
        <th>名称</th>
        <th>编码</th>
        <th>状态</th>
        <th>码值</th>
        <th></th>
      </tr>
      <tr
        class="cus-tbody"
        v-for="(item, index) in dictionaryList"
        :key="index"
      >
        <td class="w10">
          <Icon
            v-if="!item.id"
            type="md-remove-circle"
            class="red-hover"
            size="20"
            @click="dictionaryList.splice(index, 1)"
          />
        </td>
        <td>
          <Input size="small" v-model="item.name" placeholder="请输入名称" />
        </td>
        <td>
          <span v-if="item.id">{{ item.code }}</span>
          <Input
            size="small"
            v-else
            v-model="item.code"
            placeholder="请输入编码"
          />
        </td>
        <td>
          <i-switch size="small" v-model="item.switch">
            <span :slot="yesNoName['yes'].value">启用</span>
            <span :slot="yesNoName['no'].value">停用</span>
          </i-switch>
        </td>
        <td>
          <span v-if="item.id">{{ item.value }}</span>
          <Input
            size="small"
            v-else
            v-model="item.value"
            placeholder="请输入码值"
          />
        </td>
        <td>
          <Button
            v-if="!item.id"
            type="primary"
            size="small"
            @click="addDictionary(index)"
            >新增保存</Button
          >
          <Button
            v-else
            type="primary"
            size="small"
            @click="editDictionary(index)"
            >编辑保存</Button
          >
        </td>
      </tr>
      <tr class="cus-tbody operate" @click="addRow">
        <td colspan="2">
          <Icon type="md-add-circle" size="20" />
          添加一行
        </td>
      </tr>
    </table>
  </n-modal>
</template>

<script>
import admin from "@/api/admin";
export default {
  data() {
    return {
      ruleCustom: {
        code: [{ validator: this.$VF.empty, trigger: "blur" }],
        name: [{ validator: this.$VF.empty, trigger: "blur" }],
      },
      apiAddressConfig: {
        title: "编辑",
      },
      dictionaryList: [],
      id: "",
    };
  },
  created() {
    this.yesNoName = this.$getDic()["yes.no"].valueName;
  },
  methods: {
    alertModal(id, dictionaryList) {
      this.id = id;
      this.dictionaryList = dictionaryList;
      this.apiAddressConfig.title = "编辑";
      this.$refs.modal.modal = true;
    },
    addDictionary(index) {
      const target = this.dictionaryList[index];
      admin
        .addDictionary({
          name: target.name,
          code: target.code,
          value: target.value,
          status: target.switch
            ? this.yesNoName["yes"].value
            : this.yesNoName["no"].value,
          sort: 0,
          dictionaryCategoryId: this.id,
          factoryId: sessionStorage.factoryId,
        })
        .then((res) => {
          this.$M.success("新增成功");
          this.dictionaryList[index] = res.data;
          this.dictionaryList[index].switch =
            res.data.status === this.yesNoName["yes"].value ? true : false;
        });
    },
    editDictionary(index) {
      const target = this.dictionaryList[index];
      admin
        .dictionaryEdit({
          name: target.name,
          id: target.id,
          status: target.switch
            ? this.yesNoName["yes"].value
            : this.yesNoName["no"].value,
          factoryId: sessionStorage.factoryId,
        })
        .then(() => {
          this.$M.success("编辑成功");
        });
    },
    closeModal() {
      this.$refs.modal.modal = false;
      this.dictionaryList = [];
      this.$emit("success");
    },
    addRow() {
      this.dictionaryList.push({
        id: "",
        name: "",
        code: "",
        status: this.yesNoName["yes"].value,
        value: "",
        switch: true,
      });
    },
  },
};
</script>
