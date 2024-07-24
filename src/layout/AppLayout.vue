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
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import Menu from "../constants/menu";
import AppTopBar from "../views/TopBar.vue";
import AppMenu from "../views/Menu.vue";
import Footer from "../views/Footer.vue";
import { useLayout } from "./composables/layout";

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const outSideClickListener = ref<((event: MouseEvent) => void) | null>(null);

watch(isSidebarActive, (newVal) => {
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
    outSideClickListener.value = (event: MouseEvent) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    };
    document.addEventListener("click", outSideClickListener.value);
  }
};

const unBindOutClickListener = () => {
  if (outSideClickListener.value) {
    document.removeEventListener("click", outSideClickListener.value);
    outSideClickListener.value = null;
  }
};

const isOutsideClicked = (event: MouseEvent): boolean => {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");

  return !(
    sidebarEl?.isSameNode(event.target as Node) ||
    sidebarEl?.contains(event.target as Node) ||
    topbarEl?.isSameNode(event.target as Node) ||
    topbarEl?.contains(event.target as Node)
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

onMounted(() => {
  if (isSidebarActive.value) {
    bindOutClickListener();
  }
});

onBeforeUnmount(() => {
  unBindOutClickListener();
});
</script>

<style scoped>
/* Your styles here */
</style>
