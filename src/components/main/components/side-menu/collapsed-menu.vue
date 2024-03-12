<template>
  <Dropdown
    :class="hideTitle ? '' : 'collased-menu-dropdown'"
    transfer
    :placement="placement"
    @on-click="handleClick"
  >
    <a href="javascript:void(0)" class="drop-menu-a">
      <i :class="parentItem.icon"></i>
      <span class="menu-title" v-if="!hideTitle">{{ parentItem.name }}</span>
      <Icon
        style="float: right"
        v-if="!hideTitle"
        type="ios-arrow-forward"
        :size="16"
      />
    </a>
    <DropdownMenu slot="list">
      <template v-for="child in children">
        <collapsed-menu
          v-if="showChildren(child)"
          :parent-item="child"
          :key="`drop-${child.name}`"
        ></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
          <i :class="parentItem.icon"></i>
          <span class="menu-title">{{ child.text }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import mixin from "./mixin";
import itemMixin from "./item-mixin";
export default {
  name: "CollapsedMenu",
  mixins: [mixin, itemMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      placement: "right-end",
    };
  },
  methods: {
    handleClick(name) {
      this.$emit("on-click", name);
    },
  },
};
</script>
