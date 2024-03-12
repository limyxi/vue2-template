<template>
  <div>
    <Row>
      <Col span="16">
        <span class="fgrey"
          >设置角色对应的功能操作、应用管理、后台管理权限</span
        >
        <i-switch
          size="large"
          class="n-ml"
          ref="selectAll"
          @on-change="checkAll($event, 'all')"
          v-model="editForm.isAll"
        >
          <span slot="open">全选</span>
          <span slot="close">取消</span>
        </i-switch>
      </Col>
      <Col span="8" class="btn-groups right">
        <Button type="primary" @click="savePrivilegeRole">保存</Button>
      </Col>
    </Row>
    <CheckboxGroup v-model="editForm.checkGroup" class="scroll-part">
      <div
        v-for="(item, index) in moduleList"
        :key="index"
        class="pos-relative"
      >
        <Divider size="small" orientation="left" class="blue-divider">{{
          item.name
        }}</Divider>
        <i-switch
          size="large"
          :ref="'sw' + index"
          class="fix-switch"
          @on-change="checkAll($event, index)"
          v-model="item.isAll"
        >
          <span slot="open">全部</span>
          <span slot="close">取消</span>
        </i-switch>
        <Row>
          <Col
            span="6"
            v-for="leaf in item.children"
            class="n-mb"
            :key="leaf.id"
          >
            <Checkbox :label="leaf.id"
              ><span class="ml5">{{ leaf.name }}</span></Checkbox
            >
          </Col>
        </Row>
      </div>
    </CheckboxGroup>
  </div>
</template>

<script>
import admin from "@/api/admin";
import auth from "@/api/auth";
export default {
  components: {},
  props: {
    roleId: {
      type: String,
    },
    activeTab: {
      type: String,
    },
  },
  data() {
    return {
      editForm: {
        checkGroup: [],
        isAll: false,
      },
      moduleList: [],
    };
  },
  created() {
    this.moduleList = this.$getDic()["module"].list;
    this.moduleList.forEach((item) => {
      this.$set(item, "children", []);
      this.$set(item, "isAll", false);
    });
  },
  mounted() {
    this.getPrivilegeList();
  },
  watch: {
    roleId() {
      if (this.activeTab == "name2") {
        this.getPrivilegeRole(true);
      }
    },
    activeTab() {
      if (this.activeTab == "name2") {
        this.getPrivilegeRole(true);
      }
    },
  },
  methods: {
    //获取权限列表
    getPrivilegeList() {
      admin.getPrivilegeList().then(({ data }) => {
        data.forEach((item) => {
          const findIndex = this.moduleList.findIndex(
            (it) => it.value === item.category
          );
          if (findIndex) {
            this.moduleList[findIndex].children =
              this.moduleList[findIndex].children || [];
            const ifExist = this.moduleList[findIndex].children.find(
              (it) => it.id === item.id
            );
            if (ifExist) {
              this.moduleList[findIndex].children.push(item);
            }
          }
        });
      });
    },
    //获取对应权限角色
    getPrivilegeRole() {
      if (!this.roleId) {
        this.$M.warn("请点击选择对应的角色查看！");
        return;
      }
      auth
        .privilegeRoleList({
          roleId: this.roleId,
        })
        .then((res) => {
          this.editForm.checkGroup = res.data.map((item) => item.privilegeId);
        });
    },
    //保存角色权限
    savePrivilegeRole() {
      if (!this.roleId) {
        this.$M.warn("请点击选择对应的角色保存！");
        return;
      }
      auth.addPrivilegeRole({
        roleId: this.roleId,
        privilegeIds: this.editForm.checkGroup.join(","),
      });
    },
    //全选操作
    checkAll(value, type) {
      if (value) {
        if (type === "all") {
          this.editForm.checkGroup = [];
          this.moduleList.forEach((item) => {
            item.children.forEach((it) => {
              this.editForm.checkGroup.push(it.id);
            });
          });
        } else {
          let collect = this.moduleList[type].children.filter(
            (item) => !this.editForm.checkGroup.includes(item.id)
          );
          this.editForm.checkGroup.push(
            ...collect.map((item) => {
              return item.id;
            })
          );
        }
      } else {
        if (type === "all") {
          this.editForm.checkGroup = [];
        } else {
          this.editForm.checkGroup = this.editForm.checkGroup.filter(
            (item) =>
              this.moduleList[type].children.findIndex((it) => it.id != item) !=
              -1
          );
        }
      }
    },
  },
};
</script>
<style scoped>
.blue-divider {
  color: #2d8cf0 !important;
}
.fix-switch {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
