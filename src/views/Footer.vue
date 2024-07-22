<template>
  <div class="layout-footer">
    <img alt="Logo" :src="logoUrl" height="20" class="mr-2" />
    by
    <span class="font-medium ml-2">Prime Vue</span>
  </div>
</template>

<script setup>
import { useLayout } from "@/layout/composables/layout";
import { computed } from "vue";

const { layoutConfig } = useLayout();
const logoUrl = computed(() => {
  return `/layout/images/${
    layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
  }.svg`;
});
</script>

<style></style>
