<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" src="/images/logo-dark.svg" />
      <span>Prime Vue</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggled()"
    >
      <i class="pi pi-bars"></i>
    </button>
    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul
      class="layout-topbar-menu hidden lg:flex origin-top"
      :class="topbarMenuClasses"
    >
      <li>
        <button
          class="p-link layout-topbar-button"
          @click="onTopBarMenuButton()"
        >
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button" @click="onSettingsClick()">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button
          class="p-link layout-topbar-button"
          @click="onTopBarMenuButton()"
        >
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useLayout } from "../layout/composables/layout";
import { useRouter } from "vue-router";
const { layoutConfig, onMenuToggled } = useLayout();
const router = useRouter();
const topBarMenuActive = ref(false);
const outsideClickListener = ref(false);
onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
  topBarMenuActive.value = !topBarMenuActive.value;
};
const onSettingsClick = () => {
  topBarMenuActive.value = false;
  router.push("/documentation");
};
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topBarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topBarMenuActive.value) return;

  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};

const topbarMenuClasses = computed(() => {
  return { "layout-topbar-menu-mobile-active": topBarMenuActive.value };
});
</script>

<style></style>
