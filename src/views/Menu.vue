<template>
  <div class="layout-menu-container">
    <SubMenu
      :model="props.model"
      :root="true"
      class="layout-menu"
      @menuitem-click="onMenuItemClick"
    ></SubMenu>
    <!-- <li v-if="item.separator" class="menu-separator"></li> -->
    <a href="https://www.primefaces.org/primeblocks-vue" class="block mt-3">
      <img
        alt="primeblocks"
        :src="'images/banner-primeblocks-dark.png'"
        class="w-full"
      />
    </a>
  </div>
</template>

<script setup>
import SubMenu from "./SubMenu.vue";

const props = defineProps(["model"]);
const emit = defineEmits(["menuitem-click"]);
const onMenuItemClick = (item) => {
  emit(item);
};
</script>

<style></style>
