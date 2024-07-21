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
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "../constants/menu";

const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const onMenuItemClick = (event: any) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }
};
</script>

<style></style>
