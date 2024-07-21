<template>
  <div class="layout-wrapper" :class="containerClass">
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
import { computed, ref, watch } from "vue";
import Menu from "../constants/menu";
import AppTopBar from "../views/TopBar.vue";
import AppMenu from "../views/Menu.vue";
import Footer from "../views/Footer.vue";
import { useLayout } from "./composables/layout";

const { layoutConfig, layoutState, isSideBarActive } = useLayout();

const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const outSideClickListener = ref(null);
watch(isSideBarActive, (newVal) => {
  if (newVal) {
    bindOutClickListener();
  } else {
    unBindOutClickListener();
  }
});

const onMenuItemClick = (event: any) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }
};

const bindOutClickListener = () => {
  if (!outSideClickListener.value) {
    outSideClickListener.value = (event: any) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    };
  }
};
const unBindOutClickListener = () => {};

const isOutsideClicked = (event: any) => {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");

  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl?.contains(event.target) ||
    topbarEl?.isSameNode(event.target) ||
    topbarEl?.contains(event.target)
  );
};

const containerClass = computed(() => {
  return {
    "layout-theme-light": !layoutConfig.darkTheme.value,
    "layout-theme-dark": layoutConfig.darkTheme.value,
    "layout-overlay": layoutConfig.menuMode.value === "overlay",
    "layout-static": layoutConfig.menuMode.value === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive.value &&
      layoutConfig.menuMode.value === "static",
    "layout-overlay-active": layoutState.overlayMenuActive.value,
    "layout-mobile-active": layoutState.staticMenuMobileActive.value,
    "p-ripple-disabled": layoutConfig.ripple.value === false,
  };
});
</script>

<style></style>
