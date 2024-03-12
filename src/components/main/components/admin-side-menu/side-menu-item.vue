<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <i :class="parentItem.icon"></i>
      <span>{{ parentItem.text }}</span>
    </template>
    <template v-for="item in children">
      <!-- <template v-if="item.children && item.children.length === 1">
 			<side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
 			<MenuItem v-else :name="item.name" :key="`menu-${item.children[0].name}`">
 				<Icon :type="item.children[0].icon"></Icon>
 				<span>{{item.children[0].name}}</span>
 			</MenuItem>
 		</template>
 		<template v-else> -->
      <side-menu-item
        v-if="showChildren(item)"
        :key="`menu-${item.name}`"
        :parent-item="item"
      ></side-menu-item>
      <MenuItem v-else :name="item.name" :key="`menu-${item.name}`">
        <i :class="item.icon"></i>
        <span>{{ item.text }}</span>
      </MenuItem>
      <!-- </template> -->
    </template>
  </Submenu>
</template>
<script>
import mixin from "./mixin";
import itemMixin from "./item-mixin";
export default {
  name: "SideMenuItem",
  mixins: [mixin, itemMixin],
};
</script>
