<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: '',
        items: [
            { label: 'Tài khoản bán', icon: 'pi pi-fw pi-id-card', to: '/seller' },
            { label: 'Tài khoản mua', icon: 'pi pi-fw pi-check-square', to: '/buyer' },
            {
                label: 'Chỉnh sửa hệ thống',
                items: [
                    {
                        label: 'Quản lý Hãng',
                        to: '/brand-car'
                    },
                    {
                        label: 'Quản lý mẫu xe',
                        to: '/model-car'
                    },
                    {
                        label: 'Quản lý Kiểu xe',
                        to: '/style-car'
                    },
                    {
                        label: 'Quản lý Xuất xứ xe',
                        to: '/origin-car'
                    },
                    {
                        label: 'Quản lý loại nhiên liệu',
                        to: '/fuel-car'
                    },
                    {
                        label: 'Quản lý màu xe',
                        to: '/color-car'
                    }
                ]
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
