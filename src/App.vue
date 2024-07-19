<script setup lang="ts">
import AppTopBar from "./views/TopBar.vue";
import AppMenu from "./views/Menu.vue";
import Menu from "./constants/menu";
import { ref } from "vue";
const layoutMode = ref("static");
const staticMenuInactive = ref(false);
const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const onMenuItemClick = (event: any) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }
};
</script>

<template>
  <div class="">
    <!-- top bar start-->
    <AppTopBar />
    <div class="layout-sidebar">
      <AppMenu :model="Menu" @menuitem-click="onMenuItemClick" />
    </div>
    <!-- top bar end -->
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
