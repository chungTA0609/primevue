<template>
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 mb-3" style="font-size: 1.5rem">{{
            title
          }}</span>
        </div>
        <div
          class="flex align-items-center justify-content-center bg-blue-100 border-round"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i :class="icon"></i>
        </div>
      </div>
      <p class="text-green-500" style="font-size: 4rem">{{ metric }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      default: "Orders",
    },
    icon: {
      type: String,
      default: "pi pi-shopping-cart text-blue-500 text-xl",
    },
    metric: {
      type: String,
      default: "24",
    },
  });
  </script>
  
  <style></style>
  